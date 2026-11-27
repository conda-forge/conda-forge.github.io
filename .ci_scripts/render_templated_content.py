import re
import shutil
import tarfile
from contextlib import contextmanager
from dataclasses import dataclass
from pathlib import Path
from tempfile import TemporaryDirectory

import requests
import yaml
from jinja2 import Environment

CFEP_REPO_URL = "https://github.com/conda-forge/cfep"
CFEP_REPO_ARCHIVE = "https://github.com/conda-forge/cfep/archive/main.tar.gz"
CFEP_REPO_CONTENTS = "https://api.github.com/repos/conda-forge/cfep/contents/"
GOVERNANCE_REPO_URL = "https://github.com/conda-forge/governance"
GOVERNANCE_REPO_ARCHIVE = (
    f"{GOVERNANCE_REPO_URL}/archive/all-teams.tar.gz"  # TODO: Back to main
)
TITLE_PATTERN = r"<td>\s*Title\s*</td><td>\s*(.*)\s*</td>"
STATUS_PATTERN = r"<td>\s*Status\s*</td><td>\s*(.*)\s*</td>"
REPO_DIR = Path(__file__).parents[1].absolute()
CFEP_INDEX_MD_TMPL = REPO_DIR / "community" / "cfep-index.md.tmpl"
CFEP_INDEX_MD = REPO_DIR / "community" / "cfep-index.md"
GOVERNANCE_MD_TMPL = REPO_DIR / "community" / "governance.md.tmpl"
GOVERNANCE_MD = REPO_DIR / "community" / "governance.md"
CODE_OF_CONDUCT_MD_TMPL = REPO_DIR / "community" / "code-of-conduct.md.tmpl"
CODE_OF_CONDUCT_MD = REPO_DIR / "community" / "code-of-conduct.md"
TEAMS_DIR = REPO_DIR / "community" / "teams"


@dataclass
class Cfep:
    filename: str
    title: str
    status: str
    html_url: str

    @property
    def name(self) -> str:
        return self.filename.replace(".md", "")

    def rst_link(self) -> str:
        clean_title = self.title.replace("`", "")
        return f"`{self.name.upper()}: {clean_title} <{self.html_url}>`_ -- *{self.status}*"

    def md_link(self) -> str:
        return (
            f"[{self.name.upper()}: {self.title}]({self.html_url}) -- *{self.status}*"
        )


def get_cfeps_from_gh_api():
    """Generator that returns all CFEPs from GitHub repo"""
    response = requests.get(
        CFEP_REPO_CONTENTS, headers={"Accept": "application/vnd.github.v3+json"}
    )
    response.raise_for_status()
    for content in response.json():
        if not content["name"].startswith("cfep"):
            continue
        if content["name"] == "cfep-00.md":
            # Hardcode title and status for CFEP-00
            yield Cfep(
                content["name"], "CFEP Template", "Proposed", content["html_url"]
            )
            continue
        cfep_response = requests.get(content["download_url"])
        cfep_response.raise_for_status()
        cfep_text = cfep_response.text
        m = re.search(TITLE_PATTERN, cfep_text)
        title = m.group(1).strip() if m else ""
        m = re.search(STATUS_PATTERN, cfep_text)
        status = m.group(1).strip() if m else ""
        yield Cfep(content["name"], title, status, content["html_url"])


def get_cfeps():
    """Return a generator of CFEPs, by traversing the contents of the repo archive"""
    r = requests.get(CFEP_REPO_ARCHIVE, stream=True)
    r.raise_for_status()
    with TemporaryDirectory() as tmp:
        # Write the tarball to a temporary directory
        tarball = Path(tmp) / "cfep.tar.gz"
        with tarball.open("wb") as f:
            for chunk in r.iter_content(chunk_size=8192):
                f.write(chunk)
        # Extract the tarball
        extracted_dir = Path(tmp) / "cfep"
        extracted_dir.mkdir()
        with tarfile.open(tarball) as tar:
            tar.extractall(extracted_dir)
        # Traverse the extracted directory and return all CFEPs
        for cfep in sorted(extracted_dir.rglob("cfep-*.md")):
            name = cfep.name
            url = f"{CFEP_REPO_URL}/blob/main/{name}"
            if name == "cfep-00.md":
                # Hardcode title and status for CFEP-00
                yield Cfep(name, "CFEP Template", "Proposed", url)
                continue
            cfep_text = cfep.read_text(encoding="utf-8")
            m = re.search(TITLE_PATTERN, cfep_text)
            title = m.group(1).strip() if m else ""
            m = re.search(STATUS_PATTERN, cfep_text)
            status = m.group(1).strip() if m else ""
            yield Cfep(name, title, status, url)


def write_cfep_index():
    contents = CFEP_INDEX_MD_TMPL.read_text()
    md_links = [f"- {cfep.md_link()}" for cfep in get_cfeps()]
    contents = contents.replace("{{ cfep_list }}", "\n".join(md_links))
    CFEP_INDEX_MD.write_text(contents)


@contextmanager
def governance_repo():
    """Download and extract the conda-forge/governance archive; yield its root."""
    with TemporaryDirectory() as tmp:
        tarball = Path(tmp) / "governance.tar.gz"
        if GOVERNANCE_REPO_ARCHIVE.startswith(("http://", "https://")):
            r = requests.get(GOVERNANCE_REPO_ARCHIVE, stream=True, timeout=30)
            r.raise_for_status()
            with tarball.open("wb") as f:
                for chunk in r.iter_content(chunk_size=8192):
                    f.write(chunk)
        else:
            shutil.copy(GOVERNANCE_REPO_ARCHIVE, tarball)
        extracted = Path(tmp) / "governance"
        extracted.mkdir()
        with tarfile.open(tarball) as tar:
            tar.extractall(extracted, filter="data")
        # GitHub archives contain a single top-level directory: <repo>-<ref>/
        (root,) = extracted.iterdir()
        yield root


def _team_yamls(governance: Path) -> dict[str, dict]:
    teams = {}
    for path in sorted((governance / "teams").glob("*.y*ml")):
        if path.name.startswith("__") or path.suffix not in (".yml", ".yaml"):
            continue
        teams[path.stem] = yaml.safe_load(path.read_text(encoding="utf-8"))
    return teams


def _full_name_or_username(username, details):
    if isinstance(details, dict) and details.get("full_name"):
        return f"{details['full_name']} (@{username})"
    return f"@{username}"


def _format_members(members):
    return "\n".join(
        f"- [{_full_name_or_username(username, details)}](https://github.com/{username})"
        for username, details in sorted(
            (members or {}).items(), key=lambda kv: _full_name_or_username(*kv)
        )
    )


def write_code_of_conduct(governance: Path):
    contents = CODE_OF_CONDUCT_MD_TMPL.read_text()
    contents += (governance / "CODE_OF_CONDUCT.md").read_text(encoding="utf-8")
    CODE_OF_CONDUCT_MD.write_text(contents)


def write_governance(governance: Path, teams: dict[str, dict]):
    contents = GOVERNANCE_MD_TMPL.read_text()
    contents += (governance / "README.md").read_text(encoding="utf-8")
    contents = contents.replace(
        "{{ core_members }}", _format_members(teams["core"]["members"])
    )
    contents = contents.replace(
        "{{ emeritus_members }}", _format_members(teams["emeritus-core"]["members"])
    )
    contents = contents.replace("(./CODE_OF_CONDUCT.md)", "(./code-of-conduct.md)")
    GOVERNANCE_MD.write_text(contents)


TEAM_TEMPLATE = """\
---
{{ frontmatter }}
---

# {{ title }}

{{ description }}

<!--
This document is autogenerated with .ci_scripts/render_templated_content.py
from teams/{{ name }}.yml in conda-forge/governance. Do not edit manually!
-->

{% if charter in ("static-subteam", "dynamic-subteam") -%}
This sub-team has a {{ charter.split("-")[0] }} [charter](/community/governance/#sub-teams).
{%- elif charter != "council" -%}
The charter of this team has not been recorded yet.
{%- endif %}
{%- if details %}

{{ details }}
{%- endif %}

## Members
{% if members %}
{% for member, member_data in members | dictsort(case_sensitive=False) -%}
* [{{ member_data.full_name if member_data is mapping and member_data.full_name else "@" ~ member }}](https://github.com/{{ member }})
{% endfor -%}
{% else %}
This team has no members at the moment.
{% endif -%}
{% if name == "core" %}
See also the [emeritus members](/community/teams/emeritus-core/).
{% endif -%}
{% if emeritus %}
### Emeritus

{% for member, member_data in emeritus | dictsort(case_sensitive=False) -%}
* [{{ member_data.full_name if member_data is mapping and member_data.full_name else "@" ~ member }}](https://github.com/{{ member }})
{% endfor -%}
{% endif -%}
{% if resources.teams or resources.repos or resources.other %}
## Resources
{% if resources.teams %}
This team is represented by the following GitHub teams:

{% for team in resources.teams -%}
* `@{{ team }}`
{% endfor -%}
{% endif -%}
{% if resources.repos %}
This team has write access to these repositories:

{% for repo in resources.repos -%}
* [`{{ repo }}`](https://github.com/{{ repo }})
{% endfor -%}
{% endif -%}
{% if resources.other %}
Additionally, it controls these other resources:

{% for other in resources.other -%}
* {{ other }}
{% endfor -%}
{% endif -%}
{% endif -%}
{% if links %}
## Links

{% for link in links -%}
* {{ link }}
{% endfor -%}
{% endif -%}
"""

# Charter (or team name prefix) -> directory under community/teams/
TEAM_CATEGORIES = {
    "council": "council",
    "static-subteam": "static-subteam",
    "dynamic-subteam": "dynamic-subteam",
}
# Core first, then its emeritus members. The rest are sorted alphabetically.
TEAM_SIDEBAR_POSITIONS = {"core": 0, "emeritus-core": 1}


def _team_category(team: dict) -> str:
    if team["name"].startswith("help-"):
        return "help-team"
    return TEAM_CATEGORIES.get(team["charter"], "unknown")


def write_teams(teams: dict[str, dict]):
    for category in {*TEAM_CATEGORIES.values(), "help-team", "unknown"}:
        shutil.rmtree(TEAMS_DIR / category, ignore_errors=True)
    template = Environment(keep_trailing_newline=True).from_string(TEAM_TEMPLATE)
    for name, team in teams.items():
        if team.get("dissolved"):
            continue
        details = (team.get("details") or "").strip()
        title = name
        # Some details start with the full team name as a level-1 heading
        if m := re.match(r"^# (.+)\n+", details):
            title, details = m.group(1).strip(), details[m.end() :]
        sidebar_label = (
            title[: -len(" Sub-Team")] if title.endswith("Sub-Team") else name
        )
        frontmatter = {
            "title": title,
            "sidebar_label": sidebar_label,
            "slug": f"/teams/{name}",
            "description": team["description"],
            "custom_edit_url": f"{GOVERNANCE_REPO_URL}/blob/main/teams/{name}.yml",
        }
        if name in TEAM_SIDEBAR_POSITIONS:
            frontmatter["sidebar_position"] = TEAM_SIDEBAR_POSITIONS[name]
        page = template.render(
            **{**team, "details": details},
            title=title,
            frontmatter=yaml.safe_dump(
                frontmatter, sort_keys=False, allow_unicode=True, width=1000
            ).strip(),
        )
        # Collapse the blank lines left by the template
        page = re.sub(r"\n{3,}", "\n\n", page)
        out = TEAMS_DIR / _team_category(team) / f"{name}.md"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(page, encoding="utf-8")


if __name__ == "__main__":
    write_cfep_index()
    with governance_repo() as governance:
        teams = _team_yamls(governance)
        if not teams:
            raise SystemExit("Could not find any teams YAML files!")
        write_governance(governance, teams)
        write_code_of_conduct(governance)
        write_teams(teams)

import csv
import io
import re
import tarfile
from dataclasses import dataclass
from pathlib import Path
from tempfile import TemporaryDirectory

import requests


CFEP_REPO_URL = "https://github.com/conda-forge/cfep"
CFEP_REPO_ARCHIVE = "https://github.com/conda-forge/cfep/archive/main.tar.gz"
CFEP_REPO_CONTENTS = "https://api.github.com/repos/conda-forge/cfep/contents/"
GOVERNANCE_REPO_URL = "https://github.com/conda-forge/governance"
TITLE_PATTERN = "<td>\s*Title\s*</td><td>\s*(.*)\s*</td>"
STATUS_PATTERN = "<td>\s*Status\s*</td><td>\s*(.*)\s*</td>"
REPO_DIR = Path(__file__).parents[1].absolute()
CFEP_INDEX_MD_TMPL = REPO_DIR / "community" / "cfep-index.md.tmpl"
CFEP_INDEX_MD = REPO_DIR / "community" / "cfep-index.md"
GOVERNANCE_MD_TMPL = REPO_DIR / "community" / "governance.md.tmpl"
GOVERNANCE_MD = REPO_DIR / "community" / "governance.md"
CODE_OF_CONDUCT_MD_TMPL = REPO_DIR / "community" / "code-of-conduct.md.tmpl"
CODE_OF_CONDUCT_MD = REPO_DIR / "community" / "code-of-conduct.md"


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
            cfep_text = cfep.read_text()
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


def _get_formatted_names(csv_contents):
    memfile = io.StringIO(csv_contents)
    dict_csv = csv.DictReader(memfile)
    sorted_csv = sorted(dict_csv, key=lambda d: d["name"])
    return "\n".join(
        f"- [{m['name']} @{m['github_username']}]"
        f"(https://github.com/{m['github_username']})"
        for m in sorted_csv
    )


def write_code_of_conduct():
    r = requests.get(f"{GOVERNANCE_REPO_URL}/raw/main/CODE_OF_CONDUCT.md")
    r.raise_for_status()
    contents = CODE_OF_CONDUCT_MD_TMPL.read_text()
    contents += r.text
    CODE_OF_CONDUCT_MD.write_text(contents)


def write_governance():
    readme = requests.get(f"{GOVERNANCE_REPO_URL}/raw/main/README.md")
    readme.raise_for_status()
    core = requests.get(f"{GOVERNANCE_REPO_URL}/raw/main/teams/core.csv")
    core.raise_for_status()
    emeritus = requests.get(f"{GOVERNANCE_REPO_URL}/raw/main/teams/emeritus.csv")
    emeritus.raise_for_status()
    contents = GOVERNANCE_MD_TMPL.read_text()
    contents += readme.text
    contents = contents.replace("{{ core_members }}", _get_formatted_names(core.text))
    contents = contents.replace(
        "{{ emeritus_members }}", _get_formatted_names(emeritus.text)
    )
    contents = contents.replace("(./CODE_OF_CONDUCT.md)", "(./code-of-conduct.md)")
    GOVERNANCE_MD.write_text(contents)


if __name__ == "__main__":
    write_cfep_index()
    write_governance()
    write_code_of_conduct()

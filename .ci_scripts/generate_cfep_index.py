import re
import requests
from dataclasses import dataclass
from pathlib import Path

REPO_CONTENTS = "https://api.github.com/repos/conda-forge/cfep/contents/"
TITLE_PATTERN = "<td>\s*Title\s*</td><td>\s*(.*)\s*</td>"
STATUS_PATTERN = "<td>\s*Status\s*</td><td>\s*(.*)\s*</td>"
REPO_DIR = Path(__file__).parents[1].absolute()
CFEP_INDEX_RST = REPO_DIR / "src" / "orga" / "cfep-index.rst"


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


def get_cfeps():
    """Generator that returns all CFEPs from GitHub repo"""
    response = requests.get(
        REPO_CONTENTS, headers={"Accept": "application/vnd.github.v3+json"}
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


def write_cfep_index():
    with CFEP_INDEX_RST.open("a") as f:
        for cfep in get_cfeps():
            f.write(f"* {cfep.rst_link()}\n")


if __name__ == "__main__":
    write_cfep_index()

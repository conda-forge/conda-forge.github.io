"""
Given the Markdown output of a sphinx site, place it in the correct place for Docusaurus.
"""
import sys
from pathlib import Path

from ruamel.yaml import YAML

yaml = YAML(typ="safe")
yaml.default_flow_style = False

SIDEBAR_ORDERING = [
    "docs/index.md",
    "docs/user/index.md",
    "docs/user/introduction.md",
    "docs/user/tipsandtricks.md",
    "docs/user/ci-skeleton.md",
    "docs/user/faq.md",
    "docs/user/contributing.md",
    "docs/user/how_to_get_help.md",
    "docs/user/talks.md",
    "docs/maintainer/index.md",
    "docs/maintainer/infrastructure.md",
    "docs/maintainer/adding_pkgs.md",
    "docs/maintainer/updating_pkgs.md",
    "docs/maintainer/pinning_deps.md",
    "docs/maintainer/conda_forge_yml.md",
    "docs/maintainer/knowledge_base.md",
    "docs/maintainer/maintainer_faq.md",
    "docs/orga/index.md",
    "docs/orga/guidelines.md",
    "docs/orga/governance.md",
    "docs/orga/subteams.md",
    "docs/orga/joining-the-team.md",
    "docs/orga/funding",
    "docs/orga/minutes/",
    "docs/orga/cfep-index.md",
    "docs/orga/getting-in-touch.md",
    "docs/orga/funding/index.md",
    "docs/misc/index.md",
    "docs/contracting/index.md",
]


def get_mds(basedir):
    for path in Path(basedir).glob("**/*.md"):
        yield path


def sphinx_md_to_docusaurus_md(basedir, mdpath, targetdir):
    relmd = mdpath.relative_to(basedir)
    target_path = Path(targetdir, relmd)
    target_path.parent.mkdir(parents=True, exist_ok=True)
    text = mdpath.read_text()
    if text.lstrip().startswith("<a"):
        text = "\n".join(text.split("\n")[1:])
    text = text.replace("00_intro.md", "index.md").replace("(/_static/", "(pathname:///_static/")
    try:
        ordering = SIDEBAR_ORDERING.index(f"docs/{relmd}".replace("00_intro.md", "index.md"))
    except ValueError:
        ordering = 1000
    if not text.lstrip().startswith("---"):
        text = f"---\nsidebar_position: {ordering}\n---\n\n{text}"
    if mdpath.name == "00_intro.md":
        target_path = target_path.parent / "index.md"
    target_path.write_text(text)


def main(build_dir, targetdir):
    md_dir = Path(build_dir)
    for path in md_dir.glob("**/*.md"):
        print("Processing MD", path)
        sphinx_md_to_docusaurus_md(md_dir, path, targetdir)


if __name__ == "__main__":
    build_dir, targetdir = sys.argv[1:3]
    main(build_dir, targetdir)

"""
Given the Markdown output of a sphinx site, place it in the correct place for Docusaurus.
"""
import re
import sys
from pathlib import Path

# The ordering of the sidebar is defined here. This is a list of paths to the markdown files
# as they would appear after being moved into /docs. In other words, how Docusaurus would see them.
SIDEBAR_ORDERING = [
    "/docs/index.md",
    "/docs/user/index.md",
    "/docs/user/introduction.md",
    "/docs/user/tipsandtricks.md",
    "/docs/user/ci-skeleton.md",
    "/docs/user/faq.md",
    "/docs/user/contributing.md",
    "/docs/user/how_to_get_help.md",
    "/docs/user/talks.md",
    "/docs/maintainer/index.md",
    "/docs/maintainer/infrastructure.md",
    "/docs/maintainer/adding_pkgs.md",
    "/docs/maintainer/updating_pkgs.md",
    "/docs/maintainer/pinning_deps.md",
    "/docs/maintainer/conda_forge_yml.md",
    "/docs/maintainer/knowledge_base.md",
    "/docs/maintainer/maintainer_faq.md",
    "/docs/orga/index.md",
    "/docs/orga/guidelines.md",
    "/docs/orga/governance.md",
    "/docs/orga/subteams.md",
    "/docs/orga/joining-the-team.md",
    "/docs/orga/funding",
    "/docs/orga/minutes/",
    "/docs/orga/cfep-index.md",
    "/docs/orga/getting-in-touch.md",
    "/docs/orga/funding/index.md",
    "/docs/glossary.md",
    "/docs/contracting/index.md",
]
# Note we also ignore the /minutes/.* files later in the code
SIDEBAR_ORDERING_IGNORED = {
    "/docs/orga/funding/gsod-2023.md",
    "/docs/orga/funding/gsoc-2023.md",
    "/docs/orga/funding/sdg-2023-1.md",
}


def get_mds(basedir):
    for path in Path(basedir).glob("**/*.md"):
        yield path


def sphinx_md_to_docusaurus_md(basedir, mdpath, targetdir, ordering=None):
    relmd = mdpath.relative_to(basedir)
    target_path = Path(targetdir, relmd)
    target_path.parent.mkdir(parents=True, exist_ok=True)
    text = mdpath.read_text()
    text = text.replace("00_intro.md", "index.md")
    text = text.replace("(/_static/", "(pathname:///_static/")
    text = re.sub(r"\]\((/\S+\.\S+)\)", r"](pathname://\1)", text)
    title = next(re.finditer(r"^# (.+)$", text, re.MULTILINE), None)
    if not text.lstrip().startswith("---"):
        frontmatter = []
        if title:
            frontmatter.append(f"title: '{title.group(1)}'")
        if ordering is not None:
            frontmatter.append(f"sidebar_position: {ordering}")
        if frontmatter:
            text = "---\n" + "\n".join(frontmatter) + "\n---\n\n" + text
    if mdpath.name == "00_intro.md":
        target_path = target_path.parent / "index.md"
    target_path.write_text(text)


def main(build_dir, targetdir):
    md_dir = Path(build_dir)
    not_in_sidebar = []
    for path in md_dir.glob("**/*.md"):
        print("Processing MD", path)
        try:
            relmd = path.relative_to(md_dir).as_posix()
            relmd_key = f"/docs/{relmd}".replace("00_intro.md", "index.md")
            ordering = SIDEBAR_ORDERING.index(relmd_key)
        except ValueError:
            if "/minutes/" in relmd_key or relmd_key in SIDEBAR_ORDERING_IGNORED:
                ordering = 1000
            else:
                not_in_sidebar.append(path)
                continue
        sphinx_md_to_docusaurus_md(md_dir, path, targetdir, ordering=ordering)
    if not_in_sidebar:
        print(
            "The following files are not in the sidebar:",
            *not_in_sidebar,
            sep="\n- ",
            file=sys.stderr,
        )
        print(
            "Edit SIDEBAR_ORDERING in .ci_scripts/sphinx_markdown_to_docusaurus.py",
            file=sys.stderr,
        )
        sys.exit(1)


if __name__ == "__main__":
    build_dir, targetdir = sys.argv[1:3]
    main(build_dir, targetdir)

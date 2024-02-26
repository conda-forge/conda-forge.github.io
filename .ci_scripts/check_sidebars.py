import json
from pathlib import Path

REPO_ROOT = Path(__file__).parents[1]
DOCS_SIDEBAR = REPO_ROOT / "docs" / "sidebar.json"
DOCS_DIR = REPO_ROOT / "docs"

def get_all_docs_files():
    files = []
    for ext in (".md", ".mdx", ".jsx", ".md.tmpl"):
        for f in DOCS_DIR.rglob(f"*{ext}"):
            if f.stem.startswith("_"):
                continue
            path = str(f.relative_to(DOCS_DIR))[:-len(ext)]
            if path.startswith("orga/minutes/"):
                continue
            if path.startswith("orga/funding/"):
                continue
            files.append(path)
    return files

def get_sidebar_files():
    sidebar = json.loads(DOCS_SIDEBAR.read_text())
    files = []
    for item in sidebar:
        if isinstance(item, str):
            files.append(item)
        elif isinstance(item, dict):
            if "items" in item:
                for subitem in item["items"]:
                    if isinstance(subitem, str):
                        files.append(subitem)
            index = item.get("link", {}).get("id")
            if index:
                files.append(index)
    return files

def main():
    docs_files = get_all_docs_files()
    sidebar_files = get_sidebar_files()
    missing_files = set(docs_files) - set(sidebar_files)
    if missing_files:
        print("The following files are missing from the docs/ sidebar:")
        for f in sorted(missing_files):
            print(f"  - {f}")
        print("Please add them to docs/sidebar.json")
        exit(1)


if __name__ == "__main__":
    main()

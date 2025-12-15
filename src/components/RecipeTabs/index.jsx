import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

/*
Creates a two-tab container expecting two children, in this order:
- a YAML code block for v0 (meta.yaml)
- a YAML code block for v1 (recipe.yaml)

v1 tab is active by default.
*/
export function RecipeTabs({ children }) {
  if (children.length !== 2) {
    throw new Error(
      `RecipeTabs must have exactly two children, but received ${children.length}.`
    );
  }

  return (
    <Tabs groupId="synced-recipe-tabs">
        <TabItem label="v0 (meta.yaml)" value="v0">
            {children[0]}
        </TabItem>
        <TabItem label="v1 (recipe.yaml)" value="v1" default="True">
            {children[1]}
        </TabItem>
    </Tabs>
  );
}

/*
Creates a two-tab container expecting two children, in this order:
- a bash code block for build.sh
- a batch script block for bld.bat
*/
export function BuildScriptTabs({ children }) {
  if (children.length !== 2) {
    throw new Error(
      `BuildScriptTabs must have exactly two children, but received ${children.length}.`
    );
  }

  return (
    <Tabs groupId="synced-build-script-tabs">
        <TabItem label="build.sh" value="build-sh">
            {children[0]}
        </TabItem>
        <TabItem label="bld.bat" value="bld-bat">
            {children[1]}
        </TabItem>
    </Tabs>
  );
}

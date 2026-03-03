---
tags: [how-to, emergency]
---

# How to update a dependency in published packages

There are cases when you wish to update a dependency in a number of packages that were already built
and published. For example, it may happen that you that you did not pin a dependency as necessary,
or that upstream introduced an incompatibility within the current pin. This approach may also be
used to disallow specific dependency versions, for example when they contain a high-risk security
vulnerability.

## Updating the feedstock

If the change in question applies to one or more feedstock branches that are still maintained (see
[maintaining several versions](https://conda-forge.org/docs/how-to/advanced/several-versions/)), it
is a good idea to update the dependencies in the recipes first. This ensures that any subsequent
packages built will have the correct dependencies.

For example, let's assume that we are changing a dependency in `sympy-feedstock` from:

```yaml title="meta.yaml (old)"
build:
  number: 2
  # ...

requirements:
  run:
    - mpmath >=0.19
```

to:

```yaml title="meta.yaml (new)"
build:
  number: 3
  # ...

requirements:
  run:
    - mpmath >=0.19,<1.4
```

Remember to bump the build number.

## Preparing a repodata update

Updates to the metadata of published packages are done via [repodata
patches](https://github.com/conda-forge/conda-forge-repodata-patches-feedstock/tree/main/recipe).
To add a new update, fork the repository and look for a `.yaml` file in `recipe/patch_yaml/`
corresponding to the package you want to patch. If there is none, create one.

The file contains one or more conditions followed by change instructions. All the possible keys are
listed in the [README
file](https://github.com/conda-forge/conda-forge-repodata-patches-feedstock/blob/main/recipe/README.md).
For example, let's consider the following file:

```yaml title="recipe/patch_yaml/sympy.yaml"
if:
  name: sympy
  version_le: 1.14.0
  timestamp_lt: 1771947801000
then:
  - replace_depends:
      old: mpmath >=0.19
      new: mpmath >=0.19,<1.4
```

This rule specifies that all packages named `sympy`, older than `1.14.0` and created before the
specified timestamp should have their dependencies updated from the old to the new value. When
creating a new rule, remember to update the timestamp. You can use a website such as
[current millis](https://currentmillis.com/), or one of the following commands:

```bash
python -c "import time; print(f'{time.time():.0f}000')"
date +%s000
```

Once ready, test the patch:

```bash
cd recipe/
pixi run diff
```

You need to [install `pixi`](https://pixi.prefix.dev/latest/installation/) beforehand if you don't have it installed yet.

Note that this command may take a few minutes to execute. It will write a `show_diff_result.txt`
file that will list all the changes to package metadata that will be performed. It may also include
the metadata for a few extraneous packages (false positives) if new packages are published while the
process is ongoing.

Once you confirm that the changes look correct, create a branch, commit them and open a pull
request. Remember to include the contents of `show_diff_result.txt` in the pull request.

Alternatively, you can open the pull request first (as draft), let the CI run and then copy the
relevant bits from the logs (using raw logs is recommended).

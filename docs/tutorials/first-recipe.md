---
tags: [tutorial]
---

# Creating and building your first recipe

This tutorial will teach you how to:

- generate your first recipe for a pure Python package
- build the package from the recipe

It assumes that you have a working conda installation, and that you are running Linux or macOS.
In case of Linux, you also need to have a working Docker installation.

## Prepare the development environment

While it is largely possible to work on conda-forge packages using system tools, to provide
consistency we will assume here that all the needed tools are installed in a conda environment.

Start a terminal with your conda installation activated. In that terminal, create a new environment
with the needed packages, then activate it:

```bash
conda create -n conda-forge-dev -y conda-smithy git python rattler-build
conda activate conda-forge-dev
```

This environment will include the following packages:

- `conda-smithy` which is a tool for managing conda-forge feedstocks. We will be using it here to
  lint our recipe.
- `git` is a version control system used by conda-forge. We will be using it to clone feedstocks.
- `python` will be used to run scripts in the recipe directory.
- `rattler-build` is a builder for v1 recipes. We will use it to generate the initial recipe.

## Clone the staged-recipes repository

The [staged-recipes](https://github.com/conda-forge/staged-recipes) repository is where new recipes
for conda-forge are contributed. While we aren't going to be contributing a new recipe, it has a
convenient infrastructure for testing one.

Enter a directory of your choice, clone the repository and then enter it:

```bash
git clone --depth=1 https://github.com/conda-forge/staged-recipes
cd staged-recipes
```

We are using `--depth=1` to reduce the download size and disk space consumption, as we do not need
the repository's history.

## Generate the initial recipe and build it

Let's try to create a recipe for [humanize 4.15.0](https://pypi.org/project/humanize/4.15.0/).
Since it is a PyPI package, we can use rattler-build to generate the initial recipe for us. Enter
the `recipes` directory, create a git branch for your work and generate the recipe:

```
git checkout -b humanize
cd recipes
rattler-build generate-recipe pypi --version 4.15.0 -w humanize
cd ..
```

We are using a specific version to obtain a predictable result here. Rattler-build will create a
`humanize` subdirectory and write the initial `recipe.yaml` there. At this point, we already have a
working recipe and can use it to build a package. We can use the `build-locally.py` script for that:

```
python build-locally.py
```

The script will ask you to select the config appropriate for the system you're running. Once you
type the correct number and push enter, the script will create a build environment and build the
package verbosely. Once the build completes, the new package will be found in
`build_artifacts/noarch` directory, e.g.:

```
-rw------- 1 user user 74K 12-31 13:58 build_artifacts/noarch/humanize-4.15.0-pyh1d6dcf3_0.conda
```

---
tags: [tutorial]
---

# Generating and building your first recipe

In this tutorial, we will generate your first recipe for a pure Python package, use a linter to
verify that it follows the conda-forge best practices and prepare it for initial submission.

The tutorial assumes that you have a working conda installation, and are familiar with using conda
via a terminal.

## Prepare the development environment

While it is largely possible to work on conda-forge packages using system tools, to provide
consistency we will assume here that all the needed tools are installed in a conda environment.

Start a terminal with your conda installation activated. In that terminal, create a new environment
with the needed packages, then activate it:

```bash
conda create -n conda-forge-dev -y conda-smithy git grayskull python
conda activate conda-forge-dev
```

This environment will include the following packages:

- `conda-smithy` which is a tool for managing conda-forge feedstocks. We will be using it here to
  lint our recipe.
- `git` is a version control system used by conda-forge. We will be using it to clone feedstocks.
- `grayskull` is a recipe generator.
- `python` will be used to run scripts in the recipe directory.

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

## Generate the initial recipe

Let's try to create a recipe for [pylast 7.0.1](https://pypi.org/project/pylast/7.0.1/). Since it
is a PyPI package, we can start with an automatically generated recipe. We'll need to:

1. Create a git branch for our work, so that the `main` branch remains intact.
2. Run `grayskull` to create the recipe.

Type in the terminal:

```bash
git checkout -b pylast
grayskull pypi --use-v1-format --strict-conda-forge -o recipes pylast==7.0.1
```

Here's a quick wraparound of the arguments passed:

- `pypi` indicates that a recipe should be generated for a package from PyPI.
- `--use-v1-format` uses v1 recipe format (v0 is the `meta.yaml` format, now considered legacy).
- `--strict-conda-forge` follows conda-forge rules more strictly.
- `-o recipes` causes the recipe to be output into a subdirectory of `recipes` directory.
- `pylast==7.0.1` specifies the package name and version. Normally, you'd only specify a package
  name, but we're using a specific version here to make the results more predictable.

This command will write a `recipes/pylast/recipe.yaml` file. This file is the recipe, containing the
instructions for building a package.

## Look at the recipe file

Now is a good opportunity to take a look at the recipe file we've obtained. Open
`recipes/pylast/recipe.yaml` in your favorite text editor. We will go over the YAML file section by
section:

```yaml
schema_version: 1
```

This preamble indicates that this is a v1 recipe. It will always be present on top of the v1 recipe
files.

```yaml
context:
  version: 7.0.1
  python_min: 3.10
```

This section defines helper variables that can be used elsewhere in the recipe. Here two variables
are declared: `version` that references the current package version, and `python_min` that specifies
the minimal Python version required by it. By defining them here, we can easily update the values
in the future without having to modify multiple sites where they are used.

```yaml
package:
  name: pylast
  version: ${{ version }}
```

This section specifies the name and version for the package that is built from this recipe. Note
that we're using the `version` variable that was defined earlier.

```yaml
source:
  url: https://pypi.org/packages/source/p/pylast/pylast-${{ version }}.tar.gz
  sha256: 319251236ba5c3e907232aacf1d6a7ff831f2243e85ace6ec6623a552ec2e0eb
```

This section specifies how to download the source distribution to build. It specifies the URL and a
SHA256 hash that is used to verify its authenticity. The `version` variable is used again here; when
you change the version, you won't have to update both the package version and the URL.

```yaml
build:
  number: 0
  noarch: python
  script: ${{ PYTHON }} -m pip install . -vv --no-deps --no-build-isolation
```

Here, three important bits of information are specified:

1. The build number, which is a number indicating the recipe revision for a given package version. Whenever you change the recipe
   in a way that the content or metadata of what's being packaged changes (i.e. not just cosmetic things like fixing
   a typo in a comment), you increment it.
2. The `noarch` key that indicates that we're building a pure Python package, and so we do not need
   to build separate packages for different conda-forge platforms and Python versions.
3. The actual build command invocation. We're using the Python package manager `pip` to build
   and install our package into the workspace. We are passing `--no-deps` to stop `pip` from trying
   to automatically install its dependencies (they are already preinstalled in the environment), and
   `--no-build-isolation` to make the build use our build environment rather than creating a new
   one.

```yaml
requirements:
  host:
    - python ${{ python_min }}.*
    - hatch-vcs
    - hatchling >=1.27
    - pip
  run:
    - python >=${{ python_min }}
    - httpx >=0.26
```

This section specifies the package's dependencies. These are split into two parts: `host`
dependencies are needed to build the package, while `run` dependencies are needed to run it once
it's installed. In both cases, we're using the `python_min` variable to use the same version
consistently across the file. Note that while we permit running the software against any Python
no older than `python_min`, we deliberately build it using the oldest supported version to ensure
that it will work with it.

```yaml
tests:
  - python:
      imports:
        - pylast
      pip_check: true
      python_version: ${{ python_min }}.*
```

This section specifies how to test the package. In this case, it performs the absolute minimum
testing expected of Python package: checking if `pylast` can be imported successfully, and running
`pip check` to verify that the needed dependencies were installed. The testing is also done using
the oldest Python version, to ensure that the compatibility with it remains tested.

```yaml
about:
  summary: A Python interface to Last.fm and Libre.fm
  license: Apache-2.0
  license_file:
    - LICENSE.txt
    - COPYING
  homepage: https://github.com/pylast/pylast
  repository: https://github.com/pylast/pylast
```

The `about` section provides additional package information. Notably, it includes a short package
description, its license information along with a list of files containing the license inside the
source archive, and the homepage and repository URLs.

```yaml
extra:
  recipe-maintainers:
    - your-name
```

Finally, the `extra` section specifies the package maintainers. It will normally contain your user
Github user name.

## Lint the recipe

Now let's see if the recipe passes all quality checks. You'd usually be doing this after making and
testing any changes to the recipe. To do this, we're going to use the `conda-smithy` tool. Type the
following:

```bash
conda smithy lint --conda-forge recipes/pylast
```

This will perform all the basic quality checks, plus additional conda-forge quality checks, on the
recipe in `recipes/pylast`. We should get a confirmation:

```
recipes/pylast is in fine form
```

## Commit the changes

Now that everything is ready, let's commit the changes into the repository. To do that, type:

```bash
git add recipes/pylast/recipe.yaml
git commit
```

Git will start a text editor, asking you to provide a commit message for the change. At the very
minimum, let's say what we did:

```
Add a recipe for pylast package
```

At this point, the recipe is ready for submission. Normally, you'd fork the GitHub repository and
create a pull request. However, we aren't going to be doing that now, as `pylast` is already packaged
in conda-forge. The submission process is described in detail in the [contributing packages
how-to](/docs/maintainer/adding_pkgs/).

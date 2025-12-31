---
tags: [tutorial]
---

# Creating and building your first recipe

In this tutorial, we will:

- generate your first recipe for a pure Python package
- build the package from the recipe
- modify the recipe to run the test suite

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

```bash
git checkout -b humanize
cd recipes
rattler-build generate-recipe pypi --version 4.15.0 -w humanize
cd ..
```

We are using a specific version to obtain a predictable result here. Rattler-build will create a
`humanize` subdirectory and write the initial `recipe.yaml` there. At this point, we already have a
working recipe and can use it to build a package. We can use the `build-locally.py` script for that:

```bash
python build-locally.py
```

The script will ask you to select the config appropriate for the system you're running. Once you
type the correct number and push enter, the script will create a build environment and build the
package verbosely. Once the build completes, the new package will be found in
`build_artifacts/noarch` directory, e.g.:

```
-rw------- 1 user user 74K 12-31 13:58 build_artifacts/noarch/humanize-4.15.0-pyh1d6dcf3_0.conda
```

## Look at the recipe file

Now is a good opportunity to take a look at the recipe file we've obtained. Open
`recipes/humanize/reicpe.yaml` in your favorite editor. You should see something along the lines of:

```yaml
context:
  version: 4.15.0

package:
  name: humanize
  version: ${{ version }}

source:
- url: https://pypi.org/packages/source/h/humanize/humanize-${{ version }}.tar.gz
  sha256: 1dd098483eb1c7ee8e32eb2e99ad1910baefa4b75c3aff3a82f4d78688993b10
```

These sections declare a helper variable `${{ version }}`, and then specify the package's name
and version, and the source distribution used to build it. These are going to be pretty standard,
and you'll see them often in recipes for PyPI packages.

```yaml
build:
  script: ${{ PYTHON }} -m pip install .
  noarch: python

requirements:
  host:
  - python >=3.10
  - hatch-vcs
  - hatchling>=1.27
  - pip
  run:
  - python >=3.10
  # - freezegun  # extra == "tests"
  # - pytest  # extra == "tests"
  # - pytest-cov  # extra == "tests"
```

These sections specify the command used to build the package, that it is a pure Python (hence
`noarch`) package and the dependencies needed to build and run it. Note that the generator has left
a few "extra" dependencies commented out, in case you needed them.

```yaml
tests:
- python:
    imports:
    - humanize
    pip_check: true

about:
  summary: Python humanize utilities
  description: |
    ...
```

These sections specify how to test the built package, and provide additional package information.
The default test method involves checking if `humanize` can be imported successfully and that `pip
check` succeeds. Then a lengthy package description is included.

## Run the test suite

The generated recipe includes absolutely minimal level of package testing. Let's see if we can do
better than that.

As noted in the previous section, the package contained a bunch of dependencies marked `tests`.
The build process should have left the source distribution in `build_artifacts/src_cache`. Let's
inspect it:

```
tar -t -f build_artifacts/src_cache/humanize-4_15_0_1dd09848.tar.gz
```

You should be able to see that the source distribution includes a `tests` directory! Let's add a new
`tests` entry that attempts to run the package's tests. We will use the dependencies from the
`tests` extra, and since `pytest` is among them, assume that the tests are run via pytest.

Again, open `recipes/humanize/reicpe.yaml` in your favorite editor. Locate the `tests:` section, and
change it to:

```yaml
tests:
- python:
    imports:
    - humanize
    pip_check: true
- requirements:
    run:
      - freezegun
      - pytest
  script:
    - pytest
  files:
    source:
      - tests
```

The new list entry adds a test run that:

- requires `pytest` and `freezegun` packages, in addition to the tested `humanize` package (we are
  skipping `pytest-cov` dependency, as test coverage isn't significant to us)
- runs `pytest` as the test script
- includes `tests` directory from the sources

Now, try building the package:

```bash
python build-locally.py
```

You may notice a pytest invocation in the middle of the build output:

```
 │ ============================= test session starts ==============================
 │ platform linux -- Python 3.14.2, pytest-9.0.2, pluggy-1.6.0
 │ rootdir: $PREFIX/etc/conda/test-files/humanize/1
 │ collected 737 items
 │ tests/test_filesize.py ................................................. [  6%]
 │ .....................                                                    [  9%]
 │ tests/test_i18n.py ..................................................... [ 16%]
 │ ......                                                                   [ 17%]
 │ tests/test_lists.py .......                                              [ 18%]
 │ tests/test_number.py ................................................... [ 25%]
 │ ........................................................................ [ 35%]
 │ ........................................................................ [ 44%]
 │ ........................                                                 [ 48%]
 │ tests/test_time.py ..................................................... [ 55%]
 │ ........................................................................ [ 65%]
 │ ........................................................................ [ 74%]
 │ ........................................................................ [ 84%]
 │ ........................................................................ [ 94%]
 │ .........................................                                [100%]
 │ ============================= 737 passed in 1.24s ==============================
```

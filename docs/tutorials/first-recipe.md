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

Let's try to create a recipe for [pylast 7.0.1](https://pypi.org/project/pylast/7.0.1/). Since it
is a PyPI package, we can start with an automatically generated recipe. We'll need to:

1. Create a git branch for our work, so that the `main` branch remains intact.
2. Run `rattler-build generate-recipe` in the `recipes` directory.

Type in the terminal:

```bash
git checkout -b pylast
cd recipes
rattler-build generate-recipe pypi -w --version 7.0.1 pylast
cd ..
```

The `pypi` argument tells `rattler-build` to generate a recipe for a PyPI package. `-w` tells it to
write it into a file rather than print. `--version` specifies the version to use; normally you
wouldn't pass it, we use it here so that we get predictable output. The final argument is the
package name.

This command will write a `pylast/recipe.yaml` file. This file is the recipe, containing the
instructions for building a package. It is already working, and we can use the `build-locally.py`
script to build the package:

```bash
python build-locally.py
```

The script will ask you to select the config appropriate for the system you're running. Once you
type the correct number and push enter, the script will create a build environment and build the
package verbosely. Once the build completes, the new package will be found in
`build_artifacts/noarch` directory, e.g.:

```
-rw------- 1 user user  35K 01-01 14:00 pylast-7.0.1-pyh1d6dcf3_0.conda
```

## Look at the recipe file

Now is a good opportunity to take a look at the recipe file we've obtained. Open
`recipes/pylast/recipe.yaml` in your favorite text editor. We will go over the YAML file section by
section:

```yaml
context:
  version: 7.0.1
```

This section defines helper variables that can be used elsewhere in the recipe. Here, a `version` is
declared, so that we can update it in one place, and reference elsewhere in the recipe.

```yaml
package:
  name: pylast
  version: ${{ version }}
```

This section specifies the name and version for the package that is built from this recipe. Note
that the `${{ version }}` variable specified before is used here.

```yaml
source:
- url: https://pypi.org/packages/source/p/pylast/pylast-${{ version }}.tar.gz
  sha256: 319251236ba5c3e907232aacf1d6a7ff831f2243e85ace6ec6623a552ec2e0eb
```

This section specifies how to download the source distribution to build. It specifies the URL, again
using the `${{ version }}` variable to avoid having to constantly update it, and a SHA256 hash used
to verify its authenticity.

```yaml
build:
  script: ${{ PYTHON }} -m pip install .
  noarch: python
```

Here, two important bits are specified: how to build the package, and that we're dealing with a
`noarch`, i.e. a pure Python package that does not need to be built separately for different
platforms. For the former, we're using the special `${{ PYTHON }}` variable that is substituted for
the correct Python version.

```yaml
requirements:
  host:
  - python >=3.10
  - hatch-vcs
  - hatchling>=1.27
  - pip
  run:
  - python >=3.10
  - httpx >=0.26
  # - flaky  # extra == "tests"
  # - pytest-cov  # extra == "tests"
  # - pytest-random-order  # extra == "tests"
  # - pytest-recording  # extra == "tests"
  # - pytest >=9 # extra == "tests"
  # - pyyaml  # extra == "tests"
```

This section specifies the package's dependencies. These are split into two parts: `host`
dependencies are packages that are needed to build the package, while `run` dependencies are needed
to run it once it's installed. Note that the generator also included a number of "extra"
dependencies that are commented out; this is a hint to us that while these dependencies are not
normally installed by `pip`, we may find them useful.

```yaml
tests:
- python:
    imports:
    - pylast
    pip_check: true
```

This section specifies how to test the package. In this case, it performs the absolute minimum
testing expected of Python package: checking if `pylast` can be imported successfully, and running
`pip check` to verify that the needed dependencies were installed.

```yaml
about:
  summary: A Python interface to Last.fm and Libre.fm
  description: |
    ...
```

Finally, the `about` section provides additional package information. Notably, a lengthy
`description` has been copied from PyPI; if we were to actually contribute the recipe to
conda-forge, we'd want to replace it with something shorter.

## Run the test suite

As noted before, the generatede recipe contained absolute minimum level of testing. Let's try if we
can enable additional upstream tests.

The build process should have left the source distribution in `build_artifacts/src_cache`. Let's
inspect it:

```
tar -t -f build_artifacts/src_cache/pylast-7_0_1_31925123.tar.gz
```

There's a fair number of files contained inside the `tests` directory. These are probably the tests
we are looking for. Again, open `recipes/pylast/recipe.yaml` in your favorite editor. Locate the
`tests:` section. We will append a new set of "script tests", i.e. tests consisting of calling
external commands. We will need to specify three keys:

1. Files to include so that the tests can be run. We already found them: the `tests` directory.
2. Dependencies to install for the test suite. These are the `extra == "tests"` dependencies that
   the generator left us as a hint. The tested package (and its `run` dependencies) will be added
   automatically, so we don't need to list it.
3. The command used to run the test suite. From the `pytest` dependency, we can infer that the
   `pytest` runner will be a good choice.

To append these three bits, change the `tests:` section to:

```yaml
tests:
- python:
    imports:
    - pylast
    pip_check: true
- script: pytest
  files:
    source:
      - tests
  requirements:
    run:
      - flaky
      - pytest-recording
      - pytest >=9
      - pyyaml
```

Note two changes in the test dependencies: `pytest-cov` and `pytest-random-order` were removed, as
they are not really necessary to run tests.

Now, try building the package:

```bash
python build-locally.py
```

You may notice a pytest invocation in the middle of the build output:

```
 │ ============================= test session starts ==============================
 │ platform linux -- Python 3.13.11, pytest-9.0.2, pluggy-1.6.0
 │ rootdir: $PREFIX/etc/conda/test-files/pylast/1
 │ plugins: anyio-4.12.0, recording-0.13.4, flaky-3.8.1
 │ collected 147 items
 │ tests/test_album.py ...........                                          [  7%]
 │ tests/test_artist.py .............sssss.....                             [ 23%]
 │ tests/test_country.py ..                                                 [ 24%]
 │ tests/test_library.py .....                                              [ 27%]
 │ tests/test_librefm.py ..                                                 [ 29%]
 │ tests/test_network.py ss............................                     [ 49%]
 │ tests/test_request.py ......                                             [ 53%]
 │ tests/test_tag.py ....                                                   [ 56%]
 │ tests/test_track.py ss.................                                  [ 69%]
 │ tests/test_user.py ..............x.....................                  [ 93%]
 │ tests/unicode_test.py .........                                          [100%]
[...]
 │ ================== 137 passed, 9 skipped, 1 xfailed in 4.85s ===================
```

So the recipe now runs tests and they pass!

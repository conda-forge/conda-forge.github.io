---
tags: [tutorial]
---

# Adding tests to a recipe

In this tutorial, we will demonstrate how to update a recipe, by adding additional tests to an
existing feedstock. While running the tests is not strictly required, it can be helpful in verifying
that the package works as intended.

This tutorial assumes that you have conda, conda-smithy and git installed.

## Clone the feedstock

Let's start by cloning the
[xmltodict-feedstock](https://github.com/conda-forge/xmltodict-feedstock/) repository at a commit
corresponding to version 1.0.4, build 0.

Enter a directory of your choice, clone the repository and then enter it:

```bash
git clone --revision=f3d4a70843abf9b915cdbb20d73eabfb9fed21b7 https://github.com/conda-forge/xmltodict-feedstock/
cd xmltodict-feedstock/
```

## Check the source distribution for tests

If you looked at `recipe/recipe.yaml`, you'd notice that the recipe is using the source distribution
from PyPI to build the package:

```yaml
schema_version: 1

context:
  version: "1.0.4"

# ...

source:
  url: https://pypi.org/packages/source/x/xmltodict/xmltodict-${{ version }}.tar.gz
  sha256: 6d94c9f834dd9e44514162799d344d815a3a4faec913717a9ecbfa5be1bb8e61
```

Let's start by downloading and unpacking the source distribution, then enter the unpacked directory:

```bash
wget https://pypi.org/packages/source/x/xmltodict/xmltodict-1.0.4.tar.gz
tar -x -f xmltodict-1.0.4.tar.gz
cd xmltodict-1.0.4/
```

Now let's see what's inside:

```bash
$ ls -1F
LICENSE
MANIFEST.in
PKG-INFO
pyproject.toml
README.md
setup.cfg
tests/
xmltodict.egg-info/
xmltodict.py*
```

The presence of `tests/` directory is good news; it means that the package includes its test suite
in the source distribution and we can likely run it. Now we just need to figure out how. Let's start
by looking at the `pyproject.toml` file where project metadata may be found. Note the following
block:

```toml
[project.optional-dependencies]
test = [
    "pytest",
    "pytest-cov",
]
```

This block declares a block of extra dependencies under the name `test`. While the extra is of no
real consequence to us, it hints that the package can be tested using `pytest` (we can ignore the
`pytest-cov` dependency here; it is a plugin used to report test coverage which we don't need; but
including it would not be a big issue either).

To test our theory, we can create a new conda environment with `pytest` installed, and try running
them:

```bash
conda create -p ./test -y pytest
conda activate ./test
pytest tests/
```

This will yield output similar to:

```
============================= test session starts ==============================
platform linux -- Python 3.14.3, pytest-9.0.2, pluggy-1.6.0
rootdir: /tmp/xmltodict-feedstock/xmltodict-1.0.4
configfile: pyproject.toml
collected 119 items

tests/test_dicttoxml.py ................................................ [ 40%]
........................                                                 [ 60%]
tests/test_xmltodict.py ...............................................  [100%]

============================= 119 passed in 0.37s ==============================
```

## Add tests to the recipe

Now that we know what to do, let's translate that into the recipe. Open `recipe/recipe.yaml` and
look at the existing `tests` section:

```yaml
tests:
  - python:
      imports:
        - xmltodict
      pip_check: true
      python_version: ${{ python_min }}.*
```

The single set of tests specified there uses Python tests to verify that the package metadata is
correct and that the `xmltodict` module is importable. We are going to add another set of tests,
script-based, that will run our test suite.

Add the following to the `tests:` section:

```yaml
  - script:
      - pytest tests/
    requirements:
      run:
        - pytest
    files:
      source:
        - tests/
```

The `script:` subsection lists commands that are executed to test the package. The `requirements:`
section specifies additional packages that need to be installed to run these commands; we do not add
the package itself, as it will be installed automatically (along with its run dependencies).
Finally, the `files:` subsection specifies which additional files need to be available in the test
environment; in this case, it is the `tests/` directory that contains the test suite itself.

:::note
You should keep an eye on the size of directories included in the `files:`. They will be included in
the built package, and therefore big test suites may increase the package size significantly.
:::

## Bump the build number

After making any significant change to the recipe, it is important to update its build number. This
ensures that the new packages produced once the change is merged are considered newer than the
previous set.

The build number can be found in the `build:` section:

```yaml
build:
  number: 0
  noarch: python
  script: ${{ PYTHON }} -m pip install . -vv --no-deps --no-build-isolation
```

Increase it by one, making it:

```yaml
build:
  number: 1
  noarch: python
  script: ${{ PYTHON }} -m pip install . -vv --no-deps --no-build-isolation
```

Note that in some recipes, the build number will be referenced via a variable rather than directly.
In these cases, you need to find and increment the number in the `context:` section.

## Commit the changes

Let's create a branch and commit the changes we have so far. Type:

```bash
git checkout -b add-tests
git add recipe/recipe.yaml
git commit
```

Git will start a text editor, asking you to provide a commit message for the change. At the very
minimum, let's say what we did:

```
Run package tests
```

## Rerender the recipe

Finally, after every update the recipe needs to be rerendered. This ensures that all the build
scripts and generated configurations are up-to-date. To rerender the feedstock, run:

```
conda smithy rerender -c auto
```

If rerendering results in any changes, `conda-smithy` will commit them to the repository
automatically.

## Test the build

If you are running a Linux or macOS system, and have Docker installed, you can build the recipe
locally to test the changes. Building packages was covered in the
[Building a package locally](/docs/tutorials/building-locally/) tutorial. To recap shortly:

```bash
python build-locally.py
```

You should be able to see the pytest session in the middle of build output.

Alternatively, you could just open a pull request and wait for the CI to test the changes. However,
let's not file practice pull requests against a real repository.

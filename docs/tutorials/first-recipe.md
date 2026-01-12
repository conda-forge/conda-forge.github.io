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

## Generate the initial recipe and build it

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
- `--use-v1-format` uses the modern v1 recipe format.
- `--strict-conda-forge` follows conda-forge rules more strictly.
- `-o recipes` causes the recipe to be output into a subdirectory of `recipes` directory.
- `pylast==7.0.1` specifies the package name and version. Normally, you'd only specify a package
  name, but we're using a specific version here to make the results more predictable.

This command will write a `recipes/pylast/recipe.yaml` file. This file is the recipe, containing the
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
schema_version: 1
```

This preamble indicates that this is a v1 recipe. It will always be present on top of the v1 recipe
files.

```yaml
context:
  name: pylast
  version: 7.0.1
```

This section defines helper variables that can be used elsewhere in the recipe. Here, `name` and
`version` are declared, so that we can update them in one place, and reference elsewhere in the
recipe.

```yaml
package:
  name: ${{ name|lower }}
  version: ${{ version }}
```

This section specifies the name and version for the package that is built from this recipe. Note
that we're using the variables that were defined earlier here. On top of that, a Jinja filter
`lower` is used to lowercase the package name.

```yaml
source:
  url: https://pypi.org/packages/source/${{ name[0] }}/${{ name }}/pylast-${{ version }}.tar.gz
  sha256: 319251236ba5c3e907232aacf1d6a7ff831f2243e85ace6ec6623a552ec2e0eb
```

This section specifies how to download the source distribution to build. It specifies the URL and a
SHA256 hash that is used to verify its authenticity. Again, variables are used to replace some
repeating bits.

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
3. The actual build command invocation. We're using the Python package manager `pip` here to build
   and install our package into the workspace. We are passing `--no-deps` to avoid automatically installing its
   dependencies, and `--no-build-isolation` to make the build use our build environment rather than
   creating a new one.

```yaml
requirements:
  host:
    - python >=3.10
    - hatch-vcs
    - hatchling >=1.27
    - pip
  run:
    - python >=3.10
    - httpx >=0.26
```

This section specifies the package's dependencies. These are split into two parts: `host`
dependencies are needed to build the package, while `run` dependencies are needed to run it once
it's installed.

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
  license: Apache-2.0
  license_file:
    - LICENSE.txt
    - COPYING
  repository: https://github.com/pylast/pylast
```

The `about` section provides additional package information. Notably, it includes a short package
description, its license information along with a list of files containing the license inside the
source archive, and the repository URL.

```yaml
extra:
  recipe-maintainers:
    - your-name
```

Finally, the `extra` section specifies the package maintainers. It will normally contain your user
Github user name.

## Run the test suite

As noted before, the generatede recipe contained absolute minimum level of testing. Let's try if we
can enable additional upstream tests.

The build process should have left the source distribution in `build_artifacts/src_cache`. Let's
inspect it:

```
tar -t -f build_artifacts/src_cache/pylast-7_0_1_31925123.tar.gz
```

There's a fair number of files contained inside the `tests` directory. These are probably the tests
we are looking for. There is also a `pyproject.toml` file containing the project metadata. Let's
unpack it:

```
tar -x -f build_artifacts/src_cache/pylast-7_0_1_31925123.tar.gz pylast-7.0.1/pyproject.toml
```

Again, open `recipes/pylast/recipe.yaml` in your favorite editor, as well as the
`pylast-7.0.1/pyproject.toml` file. Locate the `tests:` section. We will append a new set of "script
tests", i.e. tests consisting of calling external commands. We will need to specify three keys:

1. Files to include so that the tests can be run. We already found them: the `tests` directory.
2. Dependencies to install for the test suite. These are listed in `pyproject.toml` file under
   `optional-dependencies.tests`. The tested package (and its `run` dependencies) will be added
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

Note two changes in the test dependencies: `pytest-cov` and `pytest-random-order` were omitted, as
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

## Lint the recipe

Now let's see if the recipe passes all quality checks. To do this, we're going to use the
`conda-smithy` tool. Type the following:

```bash
conda smithy recipe-lint --conda-forge recipes/pylast
```

This will perform all the basic quality checks, plus additional conda-forge quality checks, on the
recipe in `recipes/pylast`. This is going to yield some suggestions:

```
recipes/pylast has some lint:
  The homepage item is expected in the about section.
recipes/pylast also has some suggestions:
  `noarch: python` recipes should usually follow the syntax in our [documentation](https://conda-forge.org/docs/maintainer/knowledge_base/#noarch-python) for specifying the Python version.
       - For the `host` section of the recipe, you should usually use the pin python ${{ python_min }}.* for the `python` entry.
       - For the `run` section of the recipe, you should usually use the pin python >=${{ python_min }} for the `python` entry.
       - For the `tests[].python.python_version` or `tests[].requirements.run` section of the recipe, you should usually use the pin `python_version: ${{ python_min }}.*` or `python ${{ python_min }}.*` for the `python_version` or `python` entry.
       - If the package requires a newer Python version than the currently supported minimum version on `conda-forge`, you can override the `python_min` variable by adding a Jinja2 `set` statement at the top of your recipe (or using an equivalent `context` variable for v1 recipes).
```

Let's address these one by one. Again, open the recipe file `recipes/pylast/recipe.yaml` in your
favorite text editor.

The first message is pointing out that no `homepage` is defined in the `about:` section. And indeed,
there is none, just the `repository` URL. If we look at [pylast project page on
PyPI](https://pypi.org/project/pylast/), we see that the "Homepage" link points to the GitHub
repository. So we can just copy that, changing the `about:` section to:

```yaml
about:
  summary: A Python interface to Last.fm and Libre.fm
  license: Apache-2.0
  license_file:
    - LICENSE.txt
    - COPYING
  repository: https://github.com/pylast/pylast
  homepage: https://github.com/pylast/pylast
```

The other message is more complex. If you look at our requirements section, you'd notice that it's
listing `python >=3.10`. The conda-forge recommendation is to use a variable rather than inline
version. To resolve that, let's start by adding a new variable to the `context:` section on top.
It will now look like:

```yaml
context:
  name: pylast
  version: 7.0.1
  python_min: "3.10"
```

Note that we're adding double quotes around the version number. This is to prevent the YAML format
from misinterpreting the version string as a floating-point number.

Now, let's modify the `requirements:` section to use the new variable, as recommended in the message
given by the linter. It will now look like:

```yaml
requirements:
  host:
    - python ${{ python_min }}.*
    - hatch-vcs
    - hatchling >=1.27
    - pip
  run:
    - python >=${{ python_min }}
    - httpx >=0.26  #
```

Finally, let's add the dependency to the `tests` section, as suggested by the linter. It will now
look like:

```yaml
tests:
  - python:
      imports:
        - pylast
      pip_check: true
      python_version: ${{ python_min }}.*
  - script: pytest
    files:
      source:
        - tests
    requirements:
      run:
        - python ${{ python_min }}.*
        - flaky
        - pytest-recording
        - pytest >=9
        - pyyaml
```

With these changes applied, let's run the linter again:

```bash
conda-smithy recipe-lint --conda-forge recipes/pylast
```

It should approve of our modifications, saying:

```
recipes/pylast is in fine form
```

Let's build it again, to make sure we did not break anything:

```bash
python build-locally.py
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

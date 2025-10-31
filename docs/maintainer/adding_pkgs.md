---
title: 'Contributing packages'
---

<a id="dev-contribute-pkgs"></a>

<a id="contributing-packages"></a>

# Contributing packages

The contribution process can be broken down into three steps:

- Step 1. Staging process (add recipe and license).

  With the help of [the staging process](#creating-recipes), add a package's recipe and license to the [staged-recipes repository](https://github.com/conda-forge/staged-recipes) and create a PR.

- Step 2. Post staging process.

  Once your PR, has been merged, take a look at our [Post staging process](#post-staging-process) to know what follows.

- Step 3. Maintaining the package.

  Contributing a package to `conda-forge` makes you the maintainer of that package.
  Learn more about the [roles of a maintainer](#maintainer-role).

The sections below will add more details about each step.

<a id="creating-recipes"></a>

<a id="the-staging-process"></a>

## The staging process

The staging process i.e adding a package's recipe has three steps:

1. Generating the recipe
2. Checklist
3. Feedback and revision

<a id="generating-the-recipe"></a>

### Generating the recipe

There are, currently, three ways to generate a recipe:

1. If it is an R package from [CRAN](https://cran.r-project.org/), kindly
   start by using the [conda-forge helper script for R recipes](https://github.com/bgruening/conda_r_skeleton_helper) instead.
   Then if necessary, you can make manual edits to the recipe.
2. If it is a python package, you can generate the recipe as a starting point with `grayskull`.

   :::note

   [Grayskull](https://github.com/conda-incubator/grayskull) is an automatic conda recipe generator. The goal of this project is to generate concise recipes
   for conda-forge and eventually replace conda skeleton. Presently, Grayskull can generate recipes for Python packages available on PyPI and also those not published on PyPI and only available as GitHub repositories.

   Installation and usage of `grayskull`:
   - Create a new environment using : `conda create --name MY_ENV`. Replace `MY_ENV` with the environment name.
   - Activate this new environment : `conda activate MY_ENV`.
   - Run `conda install -c conda-forge grayskull` to install `grayskull`.
   - Followed by `grayskull pypi --strict-conda-forge YOUR_PACKAGE_NAME` to generate the recipe. Replace `YOUR_PACKAGE_NAME` with the package name.

   :::

   You do _not_ necessarily have to use `grayskull`, and the recipes produced by `grayskull` might need to be reviewed and edited.
   Read more about `grayskull` and how to use it [here](https://github.com/conda-incubator/grayskull#introduction).

3. If it's none of the above, generate a recipe with the help of [the example recipe](https://github.com/conda-forge/staged-recipes/tree/main/recipes/example) in the [staged-recipes repository](https://github.com/conda-forge/staged-recipes) and modify it as necessary.

Your final recipe should have no comments (unless they're actually relevant to the recipe, and not generic instruction comments), and follow the order in the example.

:::note

If there are any details you are not sure about please create a pull request anyway. The conda-forge team will review it and help you make changes to it.

:::

In case you are building your first recipe using conda-forge, a step-by-step instruction and checklist that will help you with a successful build is provided below.

<a id="staging-steps"></a>

<a id="step-by-step-instructions"></a>

### Step-by-step Instructions

1. Ensure your source code can be downloaded as a single file. Source code
   should be downloadable as an archive (.tar.gz, .zip, .tar.bz2, .tar.xz)
   or tagged on GitHub, to ensure that it can be verified. (For further
   detail, see [Build from tarballs, not repos](#tarballs-no-repos)).
2. Fork and clone the [staged-recipes](https://github.com/conda-forge/staged-recipes)
   repository from GitHub.
3. Checkout a new branch from the staged-recipes `main` branch.
4. Through CLI, cd inside the ‘staged-recipes/recipes' directory.
5. Within your forked copy, create a new folder in the recipes folder for your package (i.e, `...staged-recipes/recipes/<name-of-package>`)
6. Copy [meta.yaml](https://github.com/conda-forge/staged-recipes/blob/main/recipes/example/meta.yaml) from the example directory.
   All the changes in the following steps will happen in the COPIED meta.yaml (i.e., `...staged-recipes/recipes/<name-of-package>/meta.yaml`).
   Please leave the example directory unchanged!
7. Modify the copied recipe (meta.yml) as needed. To see how to modify meta.yaml, take a look at
   [The recipe meta.yaml](#id4).
8. Generate the SHA256 key for your source code archive, as described in the
   example recipe using the `openssl` tool. As an alternative, you can also
   go to the package description on [PyPi](https://pypi.org) from which you
   can directly copy the SHA256.
9. Be sure to fill in the `test` section. The simplest test will simply
   test that the module can be imported, as described in the example.
10. Remove all irrelevant comments in the `meta.yaml` file.

:::tip

Be sure not to checksum the redirection page. Therefore use, for example,:

```default
curl -sL https://github.com/username/reponame/archive/vX.X.X.tar.gz | openssl sha256
```

:::

<a id="checklist"></a>

#### Checklist

- Ensure that the license and license family descriptors (optional) have the right case and that the license is correct. Note that case sensitive inputs are required (e.g. Apache-2.0 rather than APACHE 2.0). Using SPDX identifiers for license field is recommended. (see [SPDX Identifiers and Expressions](#spdx))
- Ensure that you have included a license file if your license requires one – most do. (see [here](https://github.com/conda-forge/staged-recipes/blob/a504af81c05491bf7b0b018b2fa1efe64767985c/recipes/example/meta.yaml#L52-L55))
- In case your project has tests included, you need to decide if these tests should be executed while building the conda-forge feedstock.
- Make sure that all tests pass successfully at least on your development machine.
- Recommended: run the test locally on your source code to ensure the recipe works locally (see [Running tests locally for staged recipes](#staging-test-locally)).
- Make sure that your changes do not interfere with other recipes that are in the `recipes` folder (e.g. the `example` recipe).

<a id="feedback-and-revision"></a>

### Feedback and revision

Once you finished your PR, all you have to do is wait for feedback from our review team.

The review team will assist you by pointing out improvements and answering questions. Once the package is ready, the reviewers will approve and merge your pull request.

After merging the [PR](../glossary.md#pr), our [CI](../glossary.md#ci) infrastructure will build the package and make it available in the conda-channel.

:::note

If you have questions or have not heard back for a while, you can notify us by including `@conda-forge/staged-recipes` in your GitHub message.

:::

<a id="post-staging-process"></a>

<a id="id1"></a>

## Post staging process

- After the PR is merged, our [CI](../glossary.md#ci) services will create a new git repo automatically. For example, the recipe for a package named `pydstool` will be moved to a new repository [https://github.com/conda-forge/pydstool-feedstock](https://github.com/conda-forge/pydstool-feedstock). This process is automated through a CI job on the `conda-forge/staged-recipes` repo. It sometimes fails due to API rate limits and will automatically retry itself. If your feedstock has not been created after a day or so, please get in touch with the `conda-forge/core` team for help.
- CI services will be enabled automatically and a build will be triggered automatically which will build the conda package and upload to [https://anaconda.org/conda-forge](https://anaconda.org/conda-forge)
- If this is your first contribution, you will be added to the conda-forge [team](https://github.com/orgs/conda-forge/people) and given access to the CI services so that you can stop and restart builds. You will also be given commit rights to the new git repository.
- If you want to make a change to the recipe, send a [PR](../glossary.md#pr) to the git repository from a fork. Branches of the main repository are used for maintaining different versions only.

<a id="feedstock-repository-structure"></a>

<a id="id2"></a>

### Feedstock repository structure

Once the PR containing the recipe for a package is merged in the `staged-recipes` repository, a new repository is created automatically called `<package-name>-feedstock`.
A feedstock is made up of a conda recipe (the instructions on what and how to build the package) and the necessary configuration files for automatic builds using freely available continuous integration (CI) services.

Each feedstock contains various files that are generated automatically using our automated provisioning tool [conda-smithy](https://github.com/conda-forge/conda-smithy/). Broadly every feedstock has the following files:

<a id="recipe"></a>

#### recipe

This folder contains the `meta.yaml` file and any other files/scripts needed to build the package.

<a id="license-txt"></a>

#### LICENSE.txt

This file is the license for the recipe itself. This license is different from the package license, which you define while submitting the package recipe using `license_file` in the `meta.yaml` file.

<a id="ci-files"></a>

#### CI-files

These are the CI configuration files for service providers like Azure.

<a id="conda-forge-yml"></a>

#### conda-forge.yml

This file is used to configure how the feedstock is set up and built. Making any changes in this file usually requires [Rerendering feedstocks](updating_pkgs.md#dev-update-rerender).

<a id="maintainer-role"></a>

<a id="id3"></a>

## Maintainer role

The maintainer's job is to:

- Keep the feedstock updated by merging eventual maintenance [PR](../glossary.md#pr)s from conda-forge's bots.
- Keep the feedstock on par with new releases of the source package by:
  - Bumping the version number and checksum.
  - Making sure that the feedstock's requirements stay accurate.
  - Make sure the test requirements match those of the updated package.
- Answer eventual questions about the package on the feedstock issue tracker.

<a id="adding-multiple-packages-at-once"></a>

### Adding multiple packages at once

If you would like to add more than one related packages, they can be added to
staged-recipes in a single pull request (in separate directories). If the
packages are interdependent (i.e. one package being added lists one or more of
the other packages being added as a requirement), the build script will be able to
locate the dependencies that are only present within staged-recipes as long as
the builds finish in the dependencies order. Using a single pull request
allows you to quickly get packages set up without waiting for each package in a
dependency chain to be reviewed, built, and added to the `conda-forge` channel
before starting the process over with the next recipe in the chain.

:::note

When PRs with multiple interdependent recipes are merged,
there may be an error if a build finishes before its dependency is built. If
this occurs, you can trigger a new build by pushing an empty commit.

```none
git commit --amend --no-edit && git push --force
```

:::

<a id="synchronizing-fork-for-future-use"></a>

### Synchronizing fork for future use

If you would like to add additional packages in the future, you will need to
reset your fork of staged-recipes before creating a new branch on your fork,
adding the new package directory/recipe, and creating a pull request. This
step ensures you have the most recent version of the tools and configuration
files contained in the staged-recipes repository and makes the pull request
much easier to review. The following steps will reset your fork of
staged-recipes and should be executed from within a clone of your forked
staged-recipes directory.

1. Checkout your main branch:
   ```default
   git checkout main
   ```
2. Define the conda-forge/staged-recipes repository as `upstream` (if you have not already done so).:
   ```default
   git remote add upstream https://github.com/conda-forge/staged-recipes.git
   ```
3. Pull all of the upstream commits from the upstream main branch.:
   ```default
   git pull --rebase upstream main
   ```
4. Push all of the changes to your fork on GitHub (make sure there are not any changes on GitHub that you need because they will be overwritten).:
   ```default
   git push origin main --force
   ```

Once these steps are complete, you can continue with the steps in [Step-by-step Instructions](#staging-steps) to stage your new package recipe using your existing staged-recipes fork.

<a id="id4"></a>

<a id="the-recipe-meta-yaml"></a>

## The recipe meta.yaml

The `meta.yaml` file in the recipe directory is at the heart of every conda package.
It defines everything that is required to build and use the package.

`meta.yaml` is in [yaml](https://en.wikipedia.org/wiki/YAML) format, augmented with [Jinja](http://jinja.pocoo.org/) templating.

A full reference of the structure and fields of `meta.yaml` file can be found in the [Defining metadata (meta.yaml)](https://conda.io/projects/conda-build/en/stable/resources/define-metadata.html) section in the conda-build documentation.

In the following, we highlight particularly important and conda-forge specific information and guidelines, ordered by section in `meta.yaml`.

<a id="meta-yaml-source"></a>

<a id="source"></a>

### Source

<a id="tarballs-no-repos"></a>

<a id="build-from-tarballs-not-repos"></a>

#### Build from tarballs, not repos

Packages should be built from tarballs using the `url` key, not from repositories directly by using e.g. `git_url`.

There are several reasons behind this rule:

- Repositories are usually larger than tarballs, draining shared CI time and bandwidth
- Repositories are not checksummed. Thus, using a tarball has a
  stronger guarantee that the download that is obtained to build from is
  in fact the intended package.
- On some systems, it is possible to not have permission to remove a repo once it is created.

<a id="populating-the-hash-field"></a>

#### Populating the `hash` field

If your package is on [PyPi](https://pypi.org), you can get the sha256 hash from your package's page
on PyPI; look for the `SHA256` link next to the download link on your package's
files page, e.g. `https://pypi.org/project/<your-project>/#files`.

You can also generate a hash from the command line on Linux (and Mac if you
install the necessary tools below).

To generate the `sha256` hash: `openssl sha256 your_sdist.tar.gz`

You may need the openssl package, available on conda-forge
`conda install openssl -c conda-forge`.

:::tip

Be sure not to checksum the redirection page. Therefore use, for example,:

```default
curl -sL https://github.com/username/reponame/archive/vX.X.X.tar.gz | openssl sha256
```

:::

<a id="downloading-extra-sources-and-data-files"></a>

#### Downloading extra sources and data files

`conda-build 3` supports multiple sources per recipe. Examples are available [in the conda-build docs](https://docs.conda.io/projects/conda-build/en/stable/resources/define-metadata.html#source-from-multiple-sources).

<a id="build"></a>

### Build

<a id="skipping-builds"></a>

#### Skipping builds

Use the `skip` key in the `build` section along with a selector:

You can e.g. specify not to build …

- on specific architectures:
  ```yaml
  build:
      skip: true  # [win]
  ```
- for specific python versions:
  ```yaml
  build:
      skip: true  # [py<35]
  ```

A full description of selectors is
[in the conda docs](https://docs.conda.io/projects/conda-build/en/stable/resources/define-metadata.html#preprocessing-selectors).

<a id="optional-bld-bat-and-or-build-sh"></a>

#### Optional: `bld.bat` and/or `build.sh`

In many cases, `bld.bat` and/or `build.sh` files are not required.
Pure Python packages almost never need them.

If the build can be executed with one line, you may put this line in the
`script` entry of the `build` section of the `meta.yaml` file with:
`script: "{{ PYTHON }} -m pip install . -vv"`.

Remember to always add `pip` to the host requirements.

<a id="use-pip"></a>

<a id="id6"></a>

#### Use pip

Normally Python packages should use this line:

```yaml
build:
  script: "{{ PYTHON }} -m pip install . -vv"
```

as the installation script in the `meta.yml` file or `bld.bat/build.sh` script files,
while adding `pip` to the host requirements:

```yaml
requirements:
  host:
    - pip
```

`conda-forge` configures `pip` to ensure a clean installation of the package
without its dependencies so no extra flags are required to be passed. This
helps make sure that we're only including this package, and not accidentally
bringing any dependencies along into the conda package.

:::warning
If your package uses `outputs` you may have to manually specify the flags
`--no-deps --no-build-isolation` due to a bug in `conda-build`. See
[conda-build#3993](https://github.com/conda/conda-build/issues/3993).
:::

Usually pure-Python packages only require `python`, `setuptools` and `pip`
as `host` requirements; the real package dependencies are only
`run` requirements.

<a id="requirements"></a>

### Requirements

<a id="build-host-and-run"></a>

#### Build, host and run

Conda-build distinguishes three different kinds of dependencies.
In the following paragraphs, we give a very short overview what packages go where.
For a detailed explanation please refer to the [conda-build documentation](https://docs.conda.io/projects/conda-build/en/stable/resources/define-metadata.html#requirements-section).

<a id="id7"></a>

##### Build

Build dependencies are required in the build environment and contain all tools that are not needed on the host of the package.

Following packages are examples of typical `build` dependencies:

- compilers (see [Compilers](knowledge_base.md#dep-compilers))
- cmake
- make
- pkg-config
- CDT packages (see [Core Dependency Tree Packages (CDTs)](knowledge_base.md#cdt-packages))

<a id="host"></a>

##### Host

Host dependencies are required during build phase, but in contrast to build packages they have to be present on the host.

Following packages are typical examples for `host` dependencies:

- shared libraries (c/c++)
- python/r libraries that link against c libraries (see e.g. [Building Against NumPy](knowledge_base.md#linking-numpy))
- python, r-base
- setuptools, pip (see [Use pip](#use-pip))

<a id="run"></a>

##### Run

Run dependencies are only required during run time of the package. Run dependencies typically include

- most python/r libraries

<a id="no-external-deps"></a>

<a id="avoid-external-dependencies"></a>

#### Avoid external dependencies

As a general rule: all dependencies have to be packaged by conda-forge as well. This is necessary to assure [ABI](../glossary.md#abi) compatibility for all our packages.

There are only a few exceptions to this rule:

1. Some dependencies have to be satisfied with [CDT](../glossary.md#cdt) packages (see [Core Dependency Tree Packages (CDTs)](knowledge_base.md#cdt-packages)).
2. Some packages require root access (e.g. device drivers) that cannot be distributed by conda-forge. These dependencies should be avoided whenever possible.

<a id="pinning"></a>

#### Pinning

Linking shared c/c++ libraries creates dependence on the [ABI](../glossary.md#abi) of the library that was used at build time on the package.
The exposed interface changes when previously existing exposed symbols are deleted or modified in a newer version.

It is therefore crucial to ensure that only library versions with a compatible [ABI](../glossary.md#abi) are used after linking.

In the best case, the shared library you depend on:

- defines a pin in the [list of globally pinned packages](https://github.com/conda-forge/conda-forge-pinning-feedstock/blob/main/recipe/conda_build_config.yaml)
- exports its [ABI](../glossary.md#abi) compatible requirements by defining `run_exports` in it's meta.yaml

In these cases you do not have to worry about version requirements:

```yaml
requirements:
  # [...]
  host:
    - readline
    - libpng
```

In other cases you have to specify [ABI](../glossary.md#abi) compatible versions manually.

```yaml
requirements:
  # [...]
  host:
    - libawesome 1.1.*
```

For more information on pinning, please refer to [Pinned dependencies](pinning_deps.md#pinned-deps).

<a id="constraining-packages-at-runtime"></a>

#### Constraining packages at runtime

The `run_constrained` section allows defining restrictions on packages at runtime without depending on the package. It can be used to restrict allowed versions of optional dependencies and defining incompatible packages.

<a id="defining-non-dependency-restrictions"></a>

##### Defining non-dependency restrictions

Imagine a package can be used together with version 1 of `awesome-software` when present, but does not strictly depend on it.
Therefore you would like to let the user choose whether he/she would like to use the package with or without `awesome-software`. Let's assume further that the package is incompatible to version 2 of `awesome-software`.

In this case `run_constrained` can be used to restrict `awesome-software` to version 1.\*, if the user chooses to install it:

```yaml
requirements:
  # [...]
  run_constrained:
    - awesome-software 1.*
```

Here `run_constrained` acts as a means to protect users from incompatible versions without introducing an unwanted dependency.

<a id="defining-conflicts"></a>

##### Defining conflicts

Sometimes packages interfere with each other and therefore only one of them can be installed at any time.
In combination with an unsatisfiable version, `run_constrained` can define blockers:

```yaml
package:
name: awesome-db

requirements:
  # [...]
  run_constrained:
    - amazing-db ==9999999999
```

In this example, `awesome-db` cannot be installed together with `amazing-db` as there is no package `amazing-db-9999999999`.

<a id="testing-in-recipes"></a>

<a id="test"></a>

### Test

All recipes need tests. Here are some tips, tricks, and justifications.
How you should test depends on the type of package (python, c-lib,
command-line tool, … ), and what tests are available for that package.
But every conda package must have at least _some_ tests.

<a id="simple-existence-tests"></a>

#### Simple existence tests

Sometimes defining tests seems to be hard, e.g. due to:

- tests for the underlying code base may not exist.
- test suites may take too long to run on limited [CI](../glossary.md#ci) infrastructure.
- tests may take too much bandwidth.

In these cases, conda-forge may not be able to execute the prescribed test suite.

However, this is no reason for the recipe to not have tests. At the very least,
we want to verify that the package has installed the desired files in the desired
locations. This is called existence testing.

Existence testing can be accomplished in the `meta.yaml` file in the
`test/commands` block.

On posix systems, use the `test` utility and the `$PREFIX` variable.

On Windows, use the `exist` command. See below for an example.

Simple existence testing example:

```yaml
test:
  commands:
    - test -f $PREFIX/lib/libboost_log$SHLIB_EXT  # [unix]
    - if not exist %LIBRARY_LIB%\\boost_log-vc140-mt.lib exit 1  # [win]
```

<a id="testing-python-packages"></a>

#### Testing python packages

For the best information about testing, see the conda build docs
[test section.](https://docs.conda.io/projects/conda-build/en/stable/resources/define-metadata.html#test-section)

<a id="testing-importing"></a>

##### Testing importing

The minimal test of a python package should make sure that the package
can be successfully imported. This can be accomplished with this
stanza in the `meta.yaml`:

```yaml
test:
  imports:
    - package_name
```

Note that `package_name` is the name imported by python;
not necessarily the name of the conda package (they are sometimes different).

Testing for an import will catch the bulk of the packaging errors, generally
including the presence of dependencies. However, it does not assure that the
package works correctly. In particular, it doesn't test if it works
correctly with the versions of dependencies used. In some cases, the top level
import name does not contain any executable code (e.g. a package with an empty
`__init__.py`, or without any direct imports). This test would always pass!
In these cases, it helps to add more imports explicitly targeting modules
that do contain executable code (e.g. `package_name.core`).

It is good to run some other tests of the code itself (the test suite) if possible.

<a id="pip-check"></a>

<a id="id8"></a>

##### pip check

For PyPI packages, we strongly recommend including `pip check` as part of the `test.commands` section:

```yaml
test:
  commands:
    - pip check
```

This command will check if all the dependencies specified in the Python
metadata are satisfied.

:::note

`pip check` can sometimes fail due to metadata discrepancies between
PyPI and conda-forge (e.g. same package with different names). In these
cases, the reviewer must evaluate whether the error was a false negative.
Tip: use `pip list` to show what `pip check` "sees".

:::

<a id="running-unit-tests"></a>

#### Running unit tests

The trick here is that there are multiple ways to run unit tests in Python,
including nose, pytest, etc.

Also, some packages install the tests with the package, and thus they can be
run in place, while others keep the tests with the source code, and thus can
not be run straight from an installed package.

<a id="test-requirements"></a>

##### Test requirements

Sometimes there are packages required to run the tests that are not required
to simply use the package. This is usually a test-running framework, such as
nose or pytest. You can ensure that it is included by adding it to requirements
in the test stanza:

```yaml
test:
  imports:
    - package_name
...
  requires:
    - pytest
```

<a id="copying-test-files"></a>

##### Copying test files

Often test files are not installed alongside packages. Conda creates a fresh
working copy to execute the test stage of build recipes, which don't contain
the files of source package.

You can include files required for testing with the `source_files` section:

```yaml
test:
  imports:
    - package_name
  requires:
    - pytest
  source_files:
    - tests
    - test_pkg_integration.py
  commands:
    - pytest tests test_pkg_integration.py
```

The `source_files` section works for files and directories.

<a id="built-in-tests"></a>

##### Built-in tests

Some packages have testing built-in. In this case, you can put a test command
directly in the test stanza:

```yaml
test:
  ...
  commands:
     python -c "import package_name; package_name.tests.runall()"
```

Alternatively, you can add a file called `run_test.py` in the recipe that
will be run at test time. This allows an arbitrarily complicated test script.

<a id="pytest-tests"></a>

##### pytest tests

If the tests are installed with the package, pytest can find and run them
for you with the following command:

```yaml
test:
  requires:
    - pytest
  commands:
    - pytest --pyargs package_name
```

<a id="command-line-utilities"></a>

#### Command Line Utilities

If a python package installs command line utilities, you probably want to test that
they were properly installed:

```yaml
test:
  commands:
    - util_1 --help
```

If the utility actually has a test mode, great. Otherwise simply invoking
`--help` or `--version` or something will at least test that it is
installed and can run.

<a id="testing-r-packages"></a>

#### Testing R packages

R packages should be tested for successful library loading. All
recipes for CRAN packages should begin from [conda_r_skeleton_helper](https://github.com/bgruening/conda_r_skeleton_helper) and will
automatically include library loading tests. However, many R packages
also include `testthat` tests that can potentially be run. While
optional, additional testing is encouraged when packages:

- provide interaces to other (compiled) libraries (e.g., `r-curl`,
  `r-xml2`)
- extend functionality of or integrate many other R libraries
  (e.g., `r-vetiver`)
- are cornerstone R packages that provide often-used functions
  (e.g., `r-rmarkdown`)

<a id="testing-r-library-loading"></a>

##### Testing R library loading

The minimal test of an R package should ensure that the delivered library
can be successfully imported. This is accomplished in the `meta.yaml`
with:

```yaml
test:
  commands:
    - $R -e "library('PackageName')"           # [not win]
    - "\"%R%\" -e \"library('PackageName')\""  # [win]
```

Note that `PackageName` is the name imported by R; not necessarily
the name of the conda package (e.g., `r-matrix` delivers `Matrix`).

<a id="running-testthat-tests"></a>

##### Running `testthat` tests

A typical `test` section for an R package with `testthat` testing
will look like

```yaml
test:
  requires:
    - r-testthat
  source_files:
    - tests/
  commands:
    - $R -e "library('PackageName')"                                                  # [not win]
    - $R -e "testthat::test_file('tests/testthat.R', stop_on_failure=TRUE)"           # [not win]
    - "\"%R%\" -e \"library('PackageName')\""                                         # [win]
    - "\"%R%\" -e \"testthat::test_file('tests/testthat.R', stop_on_failure=TRUE)\""  # [win]
```

:::note

We recommend including a library loading check _before_ the `testthat`
tests.

:::

First, one needs to declare that the test environment have `r-testthat`
installed. One may need additional requirements here, especially if a
package has optional functionality that is tested.

:::note

If any `testthat` tests fail due to missing packages, maintainers
are encouraged to communicate this to the upstream repository. Some R
packages have optional functionality that usually involves packages
listed under the `Suggests:` section of the `DESCRIPTION` file.
Developers should be using `testthat::skip_if_not_installed()`
functions to guard against test failures when optional packages are
not installed. Posting an Issue or Pull Request when this is not
done will help improve testing practices in the R ecosystem.

:::

Second, one needs to declare where to source the tests. R package tests will
be found in the `tests/` directory of the tarball. This will typically
include a `tests/testthat.R` file and additional tests under
`tests/testthat/test_*.R`. Auxiliary directories and files may also be
present and needed for specific tests.

The default R build procedure on conda-forge will not include the
`tests/` directory in the final build. While it is possible to do this
(via an `--install-tests` flag), it is preferable to use the
`tests.source_files` in the `meta.yaml` to copy the tests for the
testing phase only.

Finally, one uses the `testthat::test_file()` function to test the
`tests/testthat.R` file, which for most packages serves as the main entry
point for all the other tests. By default, this function does not return
an error value on test failures, so one needs to pass the argument
`stop_on_failure=TRUE` to ensure that test failures propagate to
conda-build.

There are scenarios where the `tests/testthat.R` file does not orchestrate
the individual tests. In that case, one can instead test the
`tests/testthat` directory with

```yaml
test:
  commands:
    - $R -e "testthat::test_dir('tests/testthat/', package='PackageName', load_package='installed')"           # [not win]
    - "\"%R%\" -e \"testthat::test_dir('tests/testthat/', package='PackageName', load_package='installed')\""  # [win]
```

In this case, the function will error on any failures by default. Again,
the `PackageName` here refers to the R library name.

<a id="tests-outside-of-the-package"></a>

#### Tests outside of the package

Note that conda-build runs the tests in an isolated environment after installing
the package – thus, at this point it does not have access to the original source
tarball. This is to ensure that the test environment is as close as possible to
what an end-user will see.

This makes it very hard to run tests that are not installed with the package.

<!-- **NOTE** if anyone has good ideas as to how to do that, please put it here! -->

<a id="staging-test-locally"></a>

<a id="running-tests-locally-for-staged-recipes"></a>

#### Running tests locally for staged recipes

If you want to run and build packages in the staged-recipes repository locally,
go to the root repository directory and run the
`build-locally.py` script (you need Python 3). And then you could follow the prompt to select the variant you'd like to build. This requires that you have Docker
installed on your machine if you are building a package for Linux.
For MacOS, it will prompt you to select a location for the SDK (e.g. `export OSX_SDK_DIR=/opt`) to be downloaded.

```bash
$ cd ~/staged-recipes
$ python build-locally.py
```

If you know which image you want to build, you can specify it as an argument to the script.

```bash
$ cd ~/staged-recipes
$ python build-locally.py <VARIANT>
```

where `<VARIANT>` is one of the file names in the `.ci_support/` directory, e.g. `linux64`, `osx64`, and `linux64_cuda<version>`.

<a id="about"></a>

### About

<a id="packaging-the-license-manually"></a>

#### Packaging the license manually

Sometimes upstream maintainers do not include a license file in their tarball despite being demanded by the license.

If this is the case, you can add the license to the `recipe` directory (here named `LICENSE.txt`) and reference it inside the meta.yaml:

```yaml
about:
  license_file: LICENSE.txt
```

In this case, please also notify the upstream developers that the license file is missing.

:::warning[Important]

The license should only be shipped along with the recipe if there is no license file in the downloaded archive.
If there is a license file in the archive, please set `license_file` to the path of the license file in the archive.

:::

<a id="spdx"></a>

<a id="spdx-identifiers-and-expressions"></a>

#### SPDX Identifiers and Expressions

For the `about: license` entry in the recipe `meta.yaml`, using a SPDX identifier or expression is recommended.

See [SPDX license identifiers](https://spdx.org/licenses/) for the licenses.
See [SPDX license exceptions](https://spdx.org/licenses/exceptions-index.html) for license exceptions.
See [SPDX specification](https://spdx.github.io/spdx-spec/v2.2.2/SPDX-license-expressions/) Annex D
for the specification on expressions. Some examples of these are:

```none
Apache-2.0
Apache-2.0 WITH LLVM-exception
BSD-3-Clause
BSD-3-Clause OR MIT
GPL-2.0-or-later
LGPL-2.0-only OR GPL-2.0-only
LicenseRef-HDF5
MIT
MIT AND BSD-2-Clause
PSF-2.0
Unlicense
```

<a id="third-party-package-licenses"></a>

<a id="licenses-of-included-dependencies"></a>

#### Licenses of included dependencies

For some languages (Go, rust, etc.), the current policy is to include all dependencies and their dependencies in the package.
This presents a problem when packaging the license files as each dependency needs to have its license file included in the recipe.

For some languages, the community provides tools which can automate this process, enabling the automatic inclusion of all needed license files.

<a id="rust"></a>

##### Rust

[cargo-bundle-licenses](https://github.com/sstadick/cargo-bundle-licenses) can be included in the build process of a package and will automatically collect and add the license files of all dependencies of a package.

For a detailed description, please visit the project page but a short example can be found below.

First, include the collection of licenses as a step of the build process.

```yaml
build:
  number: 0
  script:
    - cargo-bundle-licenses --format yaml --output THIRDPARTY.yml
    - build_command_goes_here
```

Then, include the tool as a build time dependency.

```yaml
requirements:
  build:
    - cargo-bundle-licenses
```

Finally, make sure that the generated file is included in the recipe.

```yaml
about:
  license_file:
    - THIRDPARTY.yml
    - package_license.txt
```

<a id="Go"></a>

##### Go

[go-licenses](https://github.com/google/go-licenses) can be included in the build process of a package and will automatically collect and add the license files of all dependencies of a package.

For a detailed description, please visit the project page but a short example can be found below.

First, include the collection of licenses as a step of the build process.

```yaml
build:
  number: 0
  script:
    - go build [...]
    - go-licenses save . --save_path="./license-files/"
```

Then, include the tool as a build time dependency.

```yaml
requirements:
  build:
    - {{ compiler('go') }}
    - go-licenses
```

Finally, make sure that the generated file is included in the recipe.

```yaml
about:
  license_file:
    - LICENSE
    - license-files/
```

:::warning[Important]

We are not lawyers and cannot guarantee that the above advice is correct or that the tools are able to find all license files.
Additionally, we are unable to accept any responsibility or liability.
It is always your responsibility to double-check that all licenses are included and verify that any generated output is correct.

:::

:::note

The correct and automated packaging of dependency licenses is an [ongoing discussion](https://github.com/conda-forge/conda-forge.github.io/issues/1052). Please feel free to add your thoughts.

:::

<a id="extra"></a>

### Extra

<a id="recipe-maintainer"></a>

<a id="id9"></a>

#### Recipe Maintainer

A maintainer is an individual who is responsible for maintaining and updating one or more feedstock repositories and packages as well as their future versions. They have push access to the feedstock repositories of only the packages they maintain and can merge pull requests into it.

Contributing a recipe for package makes you the `maintainer` of that package automatically.
See [Maintainer role](#maintainer-role) and [Maintaining packages](updating_pkgs.md#maintaining-pkgs) to learn more about what are the things that maintainers do.
If you wish to be a maintainer of a certain package, you should contact current maintainers and open an issue in that package's feedstock with the following command:

`@conda-forge-admin, please add user @username`

where username is the GitHub username of the new maintainer to be added. Please refer to [Becoming a maintainer](guidelines.md#becoming-a-maintainer) and [Updating the maintainer list](updating_pkgs.md#maint-updating-maintainers) for detailed instructions.

<a id="feedstock-name"></a>

<a id="id10"></a>

#### Feedstock name

If you want the name of the feedstock to be different from the package name in the staged-recipes, you can use the `feedstock-name` directive in the recipe of that package, like this:

```yaml
extra:
  feedstock-name: <name>
```

Here, `<name>` is the name you would want for the feedstock.
If not specified, the name will be taken from the top-level `name` field in `meta.yaml`.

<a id="miscellaneous"></a>

## Miscellaneous

<a id="activate-scripts"></a>

<a id="id11"></a>

### Activate scripts

Recipes are allowed to have activate scripts, which will be `source`d or
`call`ed when the environment is activated. It is generally recommended to avoid using
activate scripts when another option is possible because people do not always
activate environments the expected way and these packages may then misbehave.

When using them in a recipe, feel free to name them `activate.bat`,
`activate.sh`, `deactivate.bat`, and `deactivate.sh` in the recipe. The
installed scripts are recommended to be prefixed by the package name and a
separating `-`. Below is some sample code for Unix and Windows that will make
this install process easier. Please feel free to lift it.

In `build.sh`:

```bash
# Copy the [de]activate scripts to $PREFIX/etc/conda/[de]activate.d.
# This will allow them to be run on environment activation.
for CHANGE in "activate" "deactivate"
do
    mkdir -p "${PREFIX}/etc/conda/${CHANGE}.d"
    cp "${RECIPE_DIR}/${CHANGE}.sh" "${PREFIX}/etc/conda/${CHANGE}.d/${PKG_NAME}_${CHANGE}.sh"
done
```

In `build.bat`:

```batch
setlocal EnableDelayedExpansion

:: Copy the [de]activate scripts to %PREFIX%\etc\conda\[de]activate.d.
:: This will allow them to be run on environment activation.
for %%F in (activate deactivate) DO (
    if not exist %PREFIX%\etc\conda\%%F.d mkdir %PREFIX%\etc\conda\%%F.d
    copy %RECIPE_DIR%\%%F.bat %PREFIX%\etc\conda\%%F.d\%PKG_NAME%_%%F.bat
    :: Copy unix shell activation scripts, needed by Windows Bash users
    copy %RECIPE_DIR%\%%F.sh %PREFIX%\etc\conda\%%F.d\%PKG_NAME%_%%F.sh
)
```

<a id="jinja-templating"></a>

### Jinja templating

The recipe `meta.yaml` can contain expressions that are evaluated during build time.
These expressions are written in [Jinja](http://jinja.pocoo.org/) syntax.

Jinja expressions serve following purposes in the meta.yaml:

- They allow defining variables to avoid code duplication. Using a variable for the `version` allows changing the version only once with every update.

  ```yaml
  {% set version = "3.7.3" %}

  package:
    name: python
    version: {{ version }}

  source:
    url: https://www.python.org/ftp/python/{{ version }}/Python-{{ version }}.tar.xz
    sha256: da60b54064d4cfcd9c26576f6df2690e62085123826cff2e667e72a91952d318
  ```

- They can call [conda-build functions](https://docs.conda.io/projects/conda-build/en/stable/resources/define-metadata.html#conda-build-specific-jinja2-functions) for automatic code generation. Examples are the compilers, cdt packages or the `pin_compatible` function.

  ```yaml
  requirements:
    build:
      - {{ compiler('c') }}
      - {{ compiler('cxx') }}
      - {{ cdt('xorg-x11-proto-devel') }}  # [linux]
      - {{ cdt('libx11-devel') }}          # [linux]
  ```

  or

  ```yaml
  requirements:
    build:
      - {{ compiler('c') }}
      - {{ compiler('cxx') }}
    host:
      - python
      - numpy
    run:
      - python
  ```

For more information please refer to the [Templating with Jinja](https://docs.conda.io/projects/conda-build/en/stable/resources/define-metadata.html#templating-with-jinja) section in the conda-build docs.

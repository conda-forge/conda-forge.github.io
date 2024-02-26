---
title: 'Using conda-smithy to manage your CI'
sidebar_position: 4
---

<a id="using-conda-smithy-to-manage-your-ci"></a>

# Using conda-smithy to manage your CI

conda-forge, and specifically `conda-smithy` contains a lot of
tools for building and deploying continuous integration (CI)
infrastructure on a variety of different platforms and architectures.
Wouldn't it be nice if you could reuse all of this hard work, so
you don't have to write or manage your own CI configurations?

By adding a `recipe/` directory to your repository, the conda-smithy
command `ci-skeleton` lets you hook into well-tested and robust
CI infrastructure. Using the conda-smithy `rerender` command, you
can then keep your repository up-to-date with any needed changes.

<a id="getting-started"></a>

## Getting Started

The `ci-skeleton` command helps you get started by preparing a repository
to have the proper structure such that the `rerender` command will correctly
add the CI configurations. Let's see an example!

Suppose you have a repository for a project called `myproj`.  In the
root level of the repository, you can run the following command:

```bash
~/repo $ conda smithy ci-skeleton myproj
```

This will produce output like the following:

```bash
Generating ~/repo/conda-forge.yml
Generating ~/repo/recipe/meta.yaml
Updating ~/repo/.gitignore
A CI skeleton has been generated! Please use the following steps
to complete the CI setup process:

1. Fill out recipe/meta.yaml with your install and test code
2. Commit all changes to the repo.

        $ git add . && git commit -m "ran conda smithy skeleton"

3. Remember to register your repo with the CI providers.
4. Rerender this repo to generate the CI configurations files.
   This can be done with:

        $ conda smithy rerender -c auto

At any time in the future, you will be able to automatically update your
CI configuration by re-running the rerender command above. Happy testing!
```

As you can see, this generates and updates a few important files.
The first file it creates is the `conda-forge.yml` file.  This is
specifically constructed to tell `conda smithy rerender` that we are
not running `myproj` CI as a regular feedstock. The `.gitignore` is
modified to not accidentally add unwanted conda-smithy temporary files
to your repository.

Also the steps that the `ci-skeleton` spits out are very important
for wiring everything up properly. Luckily, they are easy to perform!
Let's go through them one-by-one!

<a id="fill-out-recipe-meta-yaml"></a>

### 1. Fill out recipe/meta.yaml

The `ci-skeleton` command emits an example `meta.yaml` file for
building `myproj`, hence the "skeleton" part of the name. If you
don't want the skeleton to be produced in the `recipe/` directory,
you can use the `-r` option to supply an alternative.

The **meta.yaml** looks like:

```yaml
{% set name = "myproj" %}
{% set version = environ.get('GIT_DESCRIBE_TAG', 'untagged')|string|replace('-','_') %}

package:
  name: {{ name|lower }}
  version: {{ version }}

source:
  git_url: {{ environ.get('FEEDSTOCK_ROOT', '..') }}

build:
  # Uncomment the following line if the package is pure Python and the recipe
  # is exactly the same for all platforms. It is okay if the dependencies are
  # not built for all platforms/versions, although selectors are still not allowed.
  # See https://conda-forge.org/docs/maintainer/knowledge_base.html#noarch-python
  # for more details.
  # noarch: python

  number: {{ environ.get('GIT_DESCRIBE_NUMBER', '0') }}
  string: {{ [build_number, ('h' + PKG_HASH), environ.get('GIT_DESCRIBE_HASH', '')]|join('_') }}

  # If the installation is complex, or different between Unix and Windows,
  # use separate bld.bat and build.sh files instead of this key. By default,
  # the package will be built for the Python versions supported by conda-forge
  # and for all major OSs. Add the line "skip: True  # [py<35]" (for example)
  # to limit to Python 3.5 and newer, or "skip: True  # [not win]" to limit
  # to Windows.
  script: "{{ PYTHON }} -m pip install . -vv"

requirements:
  build:
    # If your project compiles code (such as a C extension) then add the required
    # compilers as separate entries here. Compilers are named 'c', 'cxx' and 'fortran'.
    - {{ compiler('c') }}
  host:
    - python
    - pip
  run:
    - python

test:
  # Some packages might need a `test/commands` key to check CLI.
  # List all the packages/modules that `run_test.py` imports.
  imports:
    - myproj
  # Run your test commands here
  commands:
    - myproj --help
    - pytest
  # declare any test-only requirements here
  requires:
    - pytest
  # copy over any needed test files here
  source_files:
    - tests/

# Uncomment and fill in myproj metadata
#about:
#  home: https://github.com/conda-forge/conda-smithy
#  license: BSD-3-Clause
#  license_family: BSD
#  license_file: LICENSE

# Uncomment the following if this will be on a forge
# Remove these lines if this is only be used for CI
#extra:
#  recipe-maintainers:
#    - BobaFett
#    - LisaSimpson
```

This recipe is configured to correctly grab the source code and the version
information from git.  It also stubs out adding any test files that you might
want to have `conda-build` use when it runs the test suite.

:::note

Because you are using conda-forge, conda-build, etc as your CI, it is
important to run the full test suite here.

:::

:::note

Metadata such as licenses and maintainers are likely less important,
because in the default case, packages created here will never be uploaded
to a channel. Feel free to delete or ignore these fields.

:::

<a id="commit-the-changes"></a>

### 2. Commit the changes

Once you have written your recipe, it is important to save the modifications!
Just run the following commands:

```bash
~/repo $ git add . && git commit -m "ran conda smithy skeleton"
```

<a id="register-with-the-ci-providers"></a>

### 3. Register with the CI providers

This is important!  If you haven't done so already, you'll need to go
to the CI providers (Travis, Circle, Azure, etc.) and enable CI
to for your repository. Each CI provider that you use will have
documentation on how to get set up with them.

<a id="rerender"></a>

### 4. Rerender

Last, but certainly not least, we need to generate the CI configuration
scripts! This is based on the content of the recipe as well as the
provider selections made in the `conda-forge.yml` file. (Please
refer to [these docs](../maintainer/conda_forge_yml.md#provider) for a complete list of CI providers.)

In order to generate the CI configuration files, run:

```bash
~/repo $ conda smithy rerender -c auto
```

Pushing those changes up to the repo should now give be building and testing
your package on CI!

<a id="keeping-up-to-date"></a>

## Keeping Up-to-date

A major advantage of using `ci-skeleton` is that once it has been
setup, it is very easy to keep your CI system up-to-date. If you
modify your recipe to enable new architectures, you want to
run on a different provider, or even if the CI system changes out from under you,
getting back up and running is as easy as rerendering.
You just need to repeat step 4, above:

```bash
~/repo $ conda smithy rerender -c auto
```

This will generate and replace the CI configuration files for the
current time and state of the recipe.  It is just that easy!

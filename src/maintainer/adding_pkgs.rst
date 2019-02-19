.. _dev_contribute_pkgs:

Contributing packages
*********************

.. _creating_recipes:

The staging process
===================

This document presents an overview over  how to contribute packages to conda-forge.


Getting Started
---------------

There are multiple ways to get started:

#. Look at `the example recipe <https://github.com/conda-forge/staged-recipes/tree/master/recipes/example>`_ in the staged-recipes repository and modify it as necessary.
#. If it is an R package from `CRAN <https://cran.r-project.org/>`_, please
   instead start by using the `conda-forge helper script for R recipes <https://github.com/bgruening/conda_r_skeleton_helper>`_.
   Then if necessary you can make manual edits to the recipe.
#. If it is a python package you can generate a skeleton as a starting point with
   ``conda skeleton pypi your_package_name``. You do *not* have to use the skeleton, and the
   recipes produced by skeleton will need to be edited.
   In particular, you'll at least need to change the build line to :ref:`use pip <use-pip>`,
   add yourself as a maintainer,
   and specify a ``license_file``.

Your final recipe should have no comments (unless they're actually relevant to the recipe, and not generic instruction comments), and follow the order in the example.

*If there are details you are not sure about please open a pull request. The conda-forge team will be happy to answer your questions.*

In case you are building your first recipe using conda-forge, a step-by-step instruction and checklist that might help you with a successful build is provided in the following.

Step-by-step Instructions
-------------------------

#. Ensure your source code can be downloaded as a single file. Source code
   should be downloadable as an archive (.tar.gz, .zip, .tar.bz2, .tar.xz)
   or tagged on GitHub, to ensure that it can be verified. (For further
   detail, sees :ref:`tarballs_no_repos`).
#. Fork the `example recipes
   <https://github.com/conda-forge/staged-recipes/tree/master/recipes>`_
   repository.
#. Create a new branch from the staged-recipes ``master`` branch.
#. Within your forked copy, generate a new folder in the recipes subdirectory
   and copy the `meta.yml
   <https://github.com/conda-forge/staged-recipes/blob/master/recipes/
   example/meta.yaml>`_
   file from the example directory. Please leave the example directory
   unchanged!
#. Edit the copied recipe (meta.yml) as needed. For details, see
   :ref:`meta_yaml`.
#. Generate the SHA256 key for your source code archive, as described in the
   example recipe using the ``openssl`` tool. As an alternative you can also
   go to the package description on `PyPi <https://pypi.org>`_ from which you
   can directly copy the SHA256.
#. Be sure to fill in the ``tests`` section. The simplest test will simply
   test that the module can be imported, as described in the example.
#. Remove all irrelevant comments in the ``meta.yaml``  file.



Checklist
.........

* Ensure that the license and license family descriptors (optional) have the right case and that the license is correct. Note that case sensitive inputs are required (e.g. Apache 2.0 rather than APACHE 2.0).
* Ensure that you have included a license file if your license requires one -- most do. (see `here <https://github.com/conda-forge/staged-recipes/blob/a504af81c05491bf7b0b018b2fa1efe64767985c/recipes/example/meta.yaml#L52-L55>`_)
* In case your project has tests included, you need to decide if these tests should be executed while building the conda-forge feedstock.
* Make sure that all tests pass successfully at least on your development machine.
* Recommended: run the test locally on your source code to ensure the recipe works locally (see  :ref:`staging_test_locally`).
* Make sure that your changes do not interfere with other recipes that are int the ``recipes`` folder (e.g. the ``example`` recipe).



Post staging process
--------------------

* After the PR is merged, our :term:`CI` services will create a new git repo automatically. For example, the recipe for a package named ``pydstool`` will be moved to a new repository `https://github.com/conda-forge/pydstool-feedstock <https://github.com/conda-forge/pydstool-feedstock>`_.
* CI services will be enabled automatically and a build will be triggered automatically which will build the conda package and upload to `https://anaconda.org/conda-forge <https://anaconda.org/conda-forge>`_
* If this is your first contribution, you will be added to the conda-forge `team <https://github.com/orgs/conda-forge/people>`_ and given access to the CI services so that you can stop and restart builds. You will also be given commit rights to the new git repository.
* If you want to make a change to the recipe, send a :term:`PR` to the git repository from a fork. Branches of the main repository are used for maintaining different versions only.


Maintainer role
---------------

The maintainer's job is to:

- Keep the feedstock updated by merging eventual maintenance :term:`PR`\ s from conda-forge's bots.
- Keep the feedstock on par with new releases of the source package by
  - Bumping the version number and checksum.
  - Making sure that feedstock's requirements stay accurate.
  - Make sure the test requirements match those of the of the updated package.
- Answer eventual question about the package on the feedstock issue tracker.


.. _meta_yaml:

The recipe meta.yaml
====================

Source
------

.. _tarballs_no_repos:

Build from tarballs, not repos
..............................

Packages should be built from tarballs using the ``url`` key, not from repositories directly by using e.g. ``git_url``.

There are several reasons behind this rule:

  - Repositories are usually larger than tarballs, draining shared CI time and bandwidth
  - Repositories are not checksummed.  Thus, using a tarball has a
    stronger guarantee that the download that is obtained to build from is
    in fact the intended package.
  - On some systems it is possible to not have permission to remove a repo once it is created.

Populating the ``hash`` field
.............................

If your package is on PyPi_, you can get the sha256 hash from your package's page
on PyPI; look for the ``SHA256`` link next to the download link on your package's
files page, e.g. ``https://pypi.org/project/<your-project>/#files``.

You can also generate a hash from the command line on Linux (and Mac if you
install the necessary tools below). 

To generate the ``sha256`` hash: ``openssl sha256 your_sdist.tar.gz``

You may need the openssl package, available on conda-forge
``conda install openssl -c conda-forge``.

.. _PyPi: https://pypi.org

Downloading extra sources and data files
........................................

``conda-build 3`` supports multiple sources per recipe. Examples are available `in the conda-build docs <https://conda.io/projects/conda-build/en/latest/source/define-metadata.html#source-from-multiple-sources>`_.


Build
-----

Excluding a platform
....................

Use the ``skip`` key in the ``build`` section along with a selector:

.. code-block:: yaml

    build:
        skip: true  # [win]

A full description of selectors is
`in the conda docs <http://conda.pydata.org/docs/building/meta-yaml.html#preprocessing-selectors>`_.


Optional: ``bld.bat`` and/or ``build.sh``
.........................................

In many cases, ``bld.bat`` and/or ``build.sh`` files are not required.
Pure Python packages almost never need them.

If the build can be executed with one line, you may put this line in the
``script`` entry of the ``build`` section of the ``meta.yaml`` file with:
``script: "{{ PYTHON }} -m pip install . --no-deps -vv"``.

Remember to always add ``pip`` to the host requirements.


.. _use-pip:

Use pip
.......
Normally Python packages should use this line:

.. code-block:: yaml

    build:
      script: "{{ PYTHON }} -m pip install . --no-deps -vv"

as the installation script in the ``meta.yml`` file or ``bld.bat/build.sh`` script files,
while adding ``pip`` to the host requirements:

.. code-block:: yaml

    requirements:
      host:
        - pip

These options should be used to ensure a clean installation of the package without its
dependencies. This helps make sure that we're only including this package,
and not accidentally bringing any dependencies along into the conda package.

Note that the ``--no-deps`` line means that for pure-Python packages,
usually only ``python`` and ``pip`` are needed as ``build`` or ``host`` requirements;
the real package dependencies are only ``run`` requirements.


Requirements
------------

Build, host and run
...................

.. _no_external_deps:

Avoid external dependencies
...........................

As a general rule: all dependencies have to be packaged by conda-forge as well. This is necessary to assure :term:`ABI` compatiblity for all our packages.

There are only few exceptions to this rule:

#. Some dependencies have to be satisfied with :term:`CDT` packages (see :ref:`cdt_packages`).

#. Some packages require root access (e.g. device drivers) that cannot be distributed by conda-forge. These dependencies should be avoided whenever possible.



Pinning
.......


TODO: 
  - Why is pinning needed (ABI)
  - How does pinning work (e.g. pin-max

External dependencies
.....................

TODO: CDT packages & yum_requierements.


.. _testing_in_recipes:

Test
----



All recipes need tests. Here are some tips, tricks, and justifications.
How you shold test depends on the type of package (python, c-lib,
command-line tool, ... ), and what tests are available for that package.
But every conda package must have at least *some* tests.


Simple existence tests
......................

Sometimes defining tests seems to be hard, e.g. due to:

 - tests for the underlying code base may not exist.
 - test suites may take too long to run on limited :term:`CI` infrastructure.
 - tests may take too much bandwidth. 
   
In these cases conda-forge may not be able to execute the prescribed test suite.

However, this is no reason for the recipe to not have tests. At the very least
we want to verify that the package has installed the desired files in the desired
locations. This is called existence testing.

Existence testing can be accomplished in the ``meta.yaml`` file in the
``test/commands`` block.

On posix systems, use the ``test`` utility and the ``$PREFIX`` variable.

On Windows, use the ``exist`` command. See below for an example.

Simple existence testing example:


.. code-block:: yaml

    test:
      commands:
        - test -f $PREFIX/lib/libboost_log$SHLIB_EXT  # [unix]
        - if not exist %LIBRARY_LIB%\\boost_log-vc140-mt.lib exit 1  # [win]


Testing python packages
.......................

For the best information about testing, see the conda build docs
`test section. <https://conda.io/docs/user-guide/tasks/build-packages/define-metadata.html#test-section>`_


Testing importing
^^^^^^^^^^^^^^^^^

The minimal test of a python package should make sure that the package
can be successfully imported. This can be accomplished with this
stanza in the ``meta.yaml``:

.. code-block:: yaml

    test:
      imports:
        - package_name

Note that ``package_name`` is the name imported by python;
not necessarily the name of the conda package (they are sometimes different).

Testing for an import will catch the bulk of the packaging errors, generally
including presence of dependencies. However, it does not assure that the
package works correctly. In particular, it doesn't test if if it works
correctly with the versions of dependencies used.

It is good to run some other tests of the code itself (the test suite) if possible.

Running unit tests
..................

The trick here is that there are multiple ways to run unit tests in Python,
including nose, pytest, etc.

Also, some packages install the tests with the package, and thus they can be
run in place, while others keep the tests with the source code, and thus can
not be run straight from an installed package.

Test requirements
^^^^^^^^^^^^^^^^^

Sometimes there are packages required to run the tests that are not required
to simply use the package. This is usually a test-running framework, such as
nose or pytest. You can ensure that it is included by adding it to requirements
in the the test stanza:

.. code-block:: yaml

    test:
      imports:
        - package_name
    ...
      requires:
        - pytest

Built-in tests
^^^^^^^^^^^^^^

Some packages have testing built-in. In this case, you can put a test command
directly in the test stanza:

.. code-block:: yaml

    test:
      ...
      commands:
         python -c "import package_name; package_name.tests.runall()"

Alternatively, you can add a file called ``run_test.py`` in the recipe that
will be run at test time. This allows an arbitrarily complicated test script.

pytest tests
^^^^^^^^^^^^

If the tests are installed with the package, pytest can find and run them
for you with the following command::

    test:
      requires:
        - pytest
      commands:
        - py.test --pyargs package_name


Command Line Utilities
......................

If a python package installs command line utilities, you probably want to test that
they were properly installed::

    test:
      commands:
        - util_1 --help

If the utility actually has a test mode, great. Otherwise simply invoking
``--help`` or ``--version`` or something will at least test that it is
installed and can run.

Tests outside of the package
............................

Note that conda-build runs the tests in an isolated environment after installing
the package -- thus, at this point it does not have access to the original source
tarball.  This is to ensure that the test environment is as close as possible to
what an end-user will see.

This makes it very hard to run tests that are not installed with the package.

.. **NOTE** if anyone has good ideas as to how to do that, please put it here!


.. _staging_test_locally:

Running tests locally for staged recipes
........................................

If you want to run and build packages in the staged-recipes repository locally,
go to the root repository directory and run the
``.circleci/run_docker_build.sh`` script.

This requires that you have docker installed on your machine.

.. code-block:: sh

    $ cd staged-recipes
    $ ./.circleci/run_docker_build.sh


About
-----

Packaging the licence manually
..............................

Sometimes upstream maintainers do not include a license file in their tarball despite being demanded by the license.

In this case it is possible to add the license to the ``recipe`` directory (here named ``LICENSE.txt``)  and reference it inside the meta.yaml:


.. code-block:: yaml

   about:
     license_file: {{ RECIPE_DIR }}/LICENSE.txt

In this case, please also notify the upstream developers that the license file is missing.


Activate scripts
----------------

Recipes are allowed to have activate scripts, which will be ``sourced``\ d or
``call``\ ed when the environment is activated. It is generally recommended to avoid using
activate scripts when another option is possible because people do not always
activate environments the expected way and these packages may then misbehave.

When using them in a recipe, feel free to name them ``activate.bat``,
``activate.sh``, ``deactivate.bat``, and ``deactivate.sh`` in the recipe. The
installed scripts are recommended to be prefixed by the package name and a
separating ``-``. Below is some sample code for Unix and Windows that will make
this install process easier. Please feel free to lift it.

In ``build.sh``:

.. code-block:: bash

    # Copy the [de]activate scripts to $PREFIX/etc/conda/[de]activate.d.
    # This will allow them to be run on environment activation.
    for CHANGE in "activate" "deactivate"
    do
        mkdir -p "${PREFIX}/etc/conda/${CHANGE}.d"
        cp "${RECIPE_DIR}/${CHANGE}.sh" "${PREFIX}/etc/conda/${CHANGE}.d/${PKG_NAME}_${CHANGE}.sh"
    done

In ``build.bat``:

.. code-block:: batch

    setlocal EnableDelayedExpansion

    :: Copy the [de]activate scripts to %PREFIX%\etc\conda\[de]activate.d.
    :: This will allow them to be run on environment activation.
    for %%F in (activate deactivate) DO (
        if not exist %PREFIX%\etc\conda\%%F.d mkdir %PREFIX%\etc\conda\%%F.d
        copy %RECIPE_DIR%\%%F.bat %PREFIX%\etc\conda\%%F.d\%PKG_NAME%_%%F.bat
    )


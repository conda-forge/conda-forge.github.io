.. _dev_contribute_pkgs:

Contributing packages
*********************

Source
======

Build from tarballs, not repos
------------------------------

Packages should be built from tarballs using the ``url`` key, not from repositories directly by using e.g. ``git_url``.

There are several reasons behind this rule:

  - Repositories are usually larger than tarballs, draining shared CI time and bandwidth
  - Repositories are not checksummed.  Thus, using a tarball has a
    stronger guarantee that the download that is obtained to build from is
    in fact the intended package.
  - On some systems it is possible to not have permission to remove a repo once it is created.

Build
=====

Requirements
============

Build, host and run
-------------------

Pinning
-------


TODO: 
  - Why is pinning needed (ABI)
  - How does pinning work (e.g. pin-max

External dependencies
---------------------

TODO: CDT packages & yum_requierements.


.. _testing_in_recipes:

Test
====



All recipes need tests. Here are some tips, tricks, and justifications.
How you shold test depends on the type of package (python, c-lib,
command-line tool, ... ), and what tests are available for that package.
But every conda package must have at least *some* tests.


Simple existence tests
----------------------

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

Simple existence testing example
................................

.. code-block:: yaml

    test:
      commands:
        - test -f $PREFIX/lib/libboost_log$SHLIB_EXT  # [unix]
        - if not exist %LIBRARY_LIB%\\boost_log-vc140-mt.lib exit 1  # [win]


Testing python packages
-----------------------

For the best information about testing, see the conda build docs
`test section. <https://conda.io/docs/user-guide/tasks/build-packages/define-metadata.html#test-section>`_


Testing importing
.................

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
------------------

The trick here is that there are multiple ways to run unit tests in Python,
including nose, pytest, etc.

Also, some packages install the tests with the package, and thus they can be
run in place, while others keep the tests with the source code, and thus can
not be run straight from an installed package.

Test requirements
.................

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
..............

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
............

If the tests are installed with the package, pytest can find and run them
for you with the following command::

    test:
      requires:
        - pytest
      commands:
        - py.test --pyargs package_name


Command Line Utilities
----------------------

If a python package installs command line utilities, you probably want to test that
they were properly installed::

    test:
      commands:
        - util_1 --help

If the utility actually has a test mode, great. Otherwise simply invoking
``--help`` or ``--version`` or something will at least test that it is
installed and can run.

Tests outside of the package
----------------------------

Note that conda-build runs the tests in an isolated environment after installing
the package -- thus, at this point it does not have access to the original source
tarball.  This is to ensure that the test environment is as close as possible to
what an end-user will see.

This makes it very hard to run tests that are not installed with the package.

.. **NOTE** if anyone has good ideas as to how to do that, please put it here!


Running tests locally for staged recipes
----------------------------------------

If you want to run and build packages in the staged-recipes repository locally,
go to the root repository directory and run the
``.circleci/run_docker_build.sh`` script.

This requires that you have docker installed on your machine.

.. code-block:: sh

    $ cd staged-recipes
    $ ./.circleci/run_docker_build.sh


About
=====

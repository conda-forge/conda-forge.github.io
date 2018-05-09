.. _testing_in_recipes:

Testing in Recipes
==================
All recipes need tests. Here are some tips, tricks, and justifications.
How you shold test depends on the type of package (python, c-lib,
command-line tool, ... ), and what tests are available for that package.
But every conda pacakge must have at least *some* tests.


Simple Existence Tests
----------------------
Sometime tests for the underlying code base don't exist. And sometimes test suites
simply take too long to run on limited CI infrastructure. Or sometimes they take
too much bandwidth. Whatever the reason, conda-forge may not always be able to
execute the prescribed test suite.

However, this is no reason for the recipe to not have tests. At the very least
we want to verify that the package is installed the desired files in the desired
locations. This is called existence testing.

Existence testing can be accomplished in the ``meta.yaml`` file in the ``test/commands``
block. On posix systems, use the ``test`` utility and the ``$PREFIX`` variable.
On Windows, use the ``exist`` command. See below for an example.

**Simple Existence Testing Example:**

.. code-block:: yaml

    test:
      commands:
        - test -f $PREFIX/lib/libboost_log$SHLIB_EXT  # [unix]
        - if not exist %LIBRARY_LIB%\\boost_log-vc140-mt.lib exit 1  # [win and py35]


Testing Python Packages
-----------------------

For the best information about testing, see the conda build docs:

` test section <https://conda.io/docs/user-guide/tasks/build-packages/define-metadata.html#test-section>`_


Testing Importing
.................

The minimal test of a python package should make sure that the package imports. This can be accomplished with this stanza in the yaml:

.. code-block:: yaml

    test:
      imports:
        - package_name

Note that that ``package_name`` is the name that is imported by python,
not necessarily the name of the conda package (they are sometimes different).

Testing for an import will catch the bulk of the packaging errors, generally
including presence of dependencies. However, it does not assure that the
package works correctly -- particularly if it works correctly with the
versions of dependencies used. So it is good to run some other test of
the code itself if possible.

Running Unit Tests
..................

The trick here is that there are multiple ways to run unit tests in Python,
including nose, pytest, etc.

Also, some packages install the tests with the package, and thus they can be
run in place, while others keep the tests with the source code, and thus can
not be run straight from an installed package.

Test Requirements
.................

Sometimes there are packages required to run the tests that are not required
to simply use the package. This is usually a test-running framework, such as
nose or pytest. You can ensure that it is included by adding it to the test
stanza:

.. code-block:: yaml

    test:
      imports:
        - package_name
    ...
      requires:
        - pytest

Built-in Tests
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

pytest Tests
............

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

Tests Outside of The Package
............................

Note that conda-build runs the tests in an isolated environment after installing
the package -- thus, at this point it does not have access to the original source
tarball.  This is to ensure that the test environment is as close as possible to
what an end-user will see.

This makes it very hard to run tests that are not installed with the package.

**NOTE** if anyone has good ideas as to how to do that, please put it here!

Docker Tests
------------

**NOTE** This could use some explanation of what docker tests are, and why
one would want to run them.

Run Docker Tests Locally for Feedstock
.......................................

If you want to run the docker tests for a feedstock locally, go to the root
feedstock directory and run, the ``.circleci/run_docker_build.sh`` script
(or ``ci_support/run_docker_build.sh`` in older feedstocks). One should also
specify the environment variable ``CONFIG``, to select one of the ``*.yaml``
config files in ``.ci_support`` to use for the build (this is not needed for
older feedstocks).

.. code-block:: sh

    $ cd my-feedstock
    $ CONFIG="linux_" ./.circleci/run_docker_build.sh


Run Docker Tests Locally for Staged Recipes
--------------------------------------------
If you want to run the docker tests for the staged-recipes repository locally,
go to the root repository directory and run the
``.circleci/run_docker_build.sh`` script.

.. code-block:: sh

    $ cd staged-recipes
    $ ./.circleci/run_docker_build.sh


Should a Recipe Run All of a Package's Tests?
---------------------------------------------

No. A recipe does not have to run all of a package's unit or integration tests.
Sometimes, this might even be impossible due to timeouts on CI services.
Just test sufficiently to know that the package is in good working order.


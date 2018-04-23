Testing in Recipes
==========================
All recipes need tests. Here are some tips, tricks, and justifications.


Simple Existence Tests
------------------------------
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


Run Docker Tests Locally for Feedstock
--------------------------------------
If you want to run the docker tests for a feedstock locally, go to the root
feedstock directory and run, the ``.circleci/run_docker_build.sh`` script
(or ``ci_support/run_docker_build.sh`` in older feedstocks).

.. code-block:: sh

    $ cd my-feedstock
    $ ./.circleci/run_docker_build.sh


Run Docker Tests Locally for Staged Recipes
--------------------------------------------
If you want to run the docker tests for the staged-recipes repository locally, go to
the root repository directory and run the ``.circleci/run_docker_build.sh`` script.

.. code-block:: sh

    $ cd staged-recipes
    $ ./.circleci/run_docker_build.sh



Should a Recipe Run All of a Package's Tests?
---------------------------------------------
No. A recipe does not have to run all of a package's unit or integration tests.
Sometimes, this might even be impossible due to timeouts on CI services.
Just test sufficiently to know that the package is in good working order.

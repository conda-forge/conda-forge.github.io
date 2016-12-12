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
        - test -f $PREFIX/lib/libboost_log.dylib  # [osx]
        - test -f $PREFIX/lib/libboost_log.so     # [linux]
        - if not exist %PREFIX%\\Library\\lib\\boost_log-vc140-mt.lib exit 1  # [win and py35]

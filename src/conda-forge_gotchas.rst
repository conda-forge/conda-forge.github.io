conda-forge 'gotchas'
=====================

Using multiple channels
-----------------------

It is quite common to install a package from conda-forge and,
when trying to use it,
see an error like (OS X example):

.. code-block:: shell

    ImportError: dlopen(.../site-packages/rpy2/rinterface/_rinterface.so, 2): Library not loaded: @rpath/libicuuc.54.dylib
      Referenced from: .../site-packages/rpy2/rinterface/_rinterface.so
      Reason: image not found

That happens because either the correct version of ``icu``,
or any other package in the error,
is not present or the package is missing altogether.

Once can confirm by issuing the command ``conda list`` and searching for the package in question.

Why that happens?
'''''''''''''''''

The ``conda-forge`` and ``defaults`` are not 100% compatible.
In the example above it is known that ``defaults`` uses ``icu 54.*`` while ``conda-forge`` relies on ``icu 56.*``,
that mismatch can lead to errors when the install environment is mixing packages from multiple channels.

Note: All of conda-forge software pinning can be found at: https://github.com/conda-forge/conda-forge-pinning-feedstock/blob/master/recipe/conda_build_config.yaml

How to fix it?
''''''''''''''

Newer ``conda`` versions introduced a strict channel priority feature.
Type ``conda config --describe channel_priority`` for more information.

The solution is to add the ``conda-forge`` channel on top of ``defaults`` in your ``.condarc`` file when using ``conda-forge`` packages
and activate the strict channel priority with:

.. code-block:: shell
  
    $ conda config --set channel_priority strict

This will ensuring that all the dependencies will come from the ``conda-forge`` channel unless they exist only on ``defaults``.
Here is how a ``.condarc`` file would look like:

.. code-block:: shell

    $ cat .condarc
    channel_priority: strict
    channels:
      - conda-forge
      - defaults

In addition to the channel priority we recommend to always install your packages inside a new environment instead the root environment from anaconda/miniconda.
Using envs make it easier to debug problems with packages and ensure the stability of your root env.


Using a fork vs a branch when updating a recipe
-----------------------------------------------

All maintainers are given push access to the feedstocks that they maintain. This means that a maintainer can create branches in the main repo. For updates, using a branch in the main repo is discouraged because,

1. CI is run on both the branch and the PR.

   This wastes Appveyor and Travis-CI resources.

2. Branches are automatically published.

   This means if you push a version update to a branch and then create a PR, conda packages will be published to anaconda.org before the PR is merged.

For these reasons maintainers are asked to fork the feedstock, push to a branch in the fork and then open a PR to the ``conda-forge`` repo.

Branches in the main repo are used for,

1. Maintaining a LTS branch of a package.

   For eg. ``master`` branch of ``python-feedstock`` builds ``3.6.x``, while ``3.5`` branch builds ``3.5.x`` versions of python.


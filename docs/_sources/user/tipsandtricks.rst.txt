Tips & tricks
*************


.. _multiple_channels: 

Using multiple channels
=======================

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
-----------------

The ``conda-forge`` and ``defaults`` are not 100% compatible.
In the example above it is known that ``defaults`` uses ``icu 54.*`` while ``conda-forge`` relies on ``icu 56.*``,
that mismatch can lead to errors when the install environment is mixing packages from multiple channels.

Note: All of conda-forge software pinning can be found at: https://github.com/conda-forge/conda-forge-pinning-feedstock/blob/master/recipe/conda_build_config.yaml

How to fix it?
--------------

Newer ``conda`` versions introduced a strict channel priority feature.
Type ``conda config --describe channel_priority`` for more information.


The solution is to add the ``conda-forge`` channel on top of ``defaults`` in your ``.condarc`` file when using ``conda-forge`` packages
and activate the strict channel priority with:

.. code-block:: shell

    $ conda config --set channel_priority strict

This will ensure that all the dependencies will come from the ``conda-forge`` channel unless they exist only on ``defaults``.

Here is how a ``.condarc`` file would look like:

.. code-block:: shell

    $ cat .condarc
    channel_priority: strict
    channels:
      - conda-forge
      - defaults

In addition to the channel priority we recommend to always install your packages inside a new environment instead the root environment from anaconda/miniconda.
Using envs make it easier to debug problems with packages and ensure the stability of your root env.

Avoiding the openblas/mkl dance
===============================

When updating packages, it might seem that openblas and mkl keep trying to
overwrite one and other. For example:

.. code-block:: bash

  $ conda install pytest
  Solving environment: done

  [...]

  The following packages will be UPDATED:

  libgcc-ng:      7.2.0-hdf63c60_3                     conda-forge --> 8.2.0-hdf63c60_1
  numpy:          1.15.2-py36_blas_openblashd3ea46f_1  conda-forge [blas_openblas] --> 1.15.2-py36h1d66e8a_1

  The following packages will be DOWNGRADED:

  blas:           1.1-openblas                         conda-forge --> 1.0-mkl
  opencv:         3.4.3-py36_blas_openblash829a850_200 conda-forge [blas_openblas] --> 3.4.1-py36h6fd60c2_1
  scipy:          1.1.0-py36_blas_openblash7943236_201 conda-forge [blas_openblas] --> 1.1.0-py36hc49cb51_0

The problem is that conda really wants to minimize the "features" installed
in the environment. Implicit dependencies, such as openblas in the case of
``numpy`` from conda-forge, behave differently from explicit ones.
Explicitly specifying the dependency on either ``openblas`` or ``mkl`` will
solve this problem. As of writing, conda-forge does not package ``mkl``.

Specifying:

.. code-block:: bash

  conda install "blas=*=openblas"

solves the problem in new environments. The challenge comes if you already
installed ``openblas`` (likely because of ``numpy``) and now need to add a
dependency for ``openblas``. ``conda install`` will tell you it is already
satisfied and not add  it to the list of explicitly specified dependencies.
To work around this problem, execute the following commands:

.. code-block:: bash

  conda uninstall blas --force
  conda install "blas=*=openblas"

Here, we specified ``--force`` so as not to uninstall packages that depend on
``blas`` (e.g. numpy and all dependencies).

It may be helpful to read the `conda documentation <https://conda.io/docs/user-guide/configuration/use-condarc.html#always-add-packages-by-default-create-default-packages>`_ regarding installing
default packages in new environments.

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

Once you can confirm by issuing the command ``conda list`` and searching for the package in question.

Why does that happen?
---------------------

The ``conda-forge`` and ``defaults`` are not 100% compatible.
In the example above it is known that ``defaults`` uses ``icu 54.*`` while ``conda-forge`` relies on ``icu 56.*``,
that mismatch can lead to errors when the install environment is mixing packages from multiple channels.

Note: All of conda-forge software pinning can be found at: https://github.com/conda-forge/conda-forge-pinning-feedstock/blob/master/recipe/conda_build_config.yaml

How to fix it?
--------------

Newer ``conda`` versions (>=4.6) introduced a strict channel priority feature.
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

In addition to the channel priority, we recommend to always install your packages inside a new environment instead of the root environment from anaconda/miniconda.
Using envs make it easier to debug problems with packages and ensure the stability of your root env.

.. note::
  In the past ``conda-forge`` used to vendorize some of ``defaults`` dependencies that were not built in our infrastructure,
  like compilers run-times, to avoid the mixing channel problem.
  However, with the ``strict`` option, we no longer have to vendorize those (this led to its own set of problems),
  instead, we removed everything that is not built in ``conda-forge`` and let ``strict`` pull those from ``defaults``.

  TL;DR if you are experiencing missing compilers run-times like ``libgcc-ng``,
  that is probably because you removed ``defaults``,
  just re-add it and activate ``strict`` for a smooth and stable experience when installing packages.


.. _Using External Message Passing Interface (MPI) Libraries:

Using External Message Passing Interface (MPI) Libraries
========================================================

On some high-performance computing (HPC) systems, users are expected to use the
MPI binaries that are available on the system as opposed to those built by ``conda-forge``.
These binaries are typically specialized for the system and interface properly with job
schedulers, etc. However, this practice creates issues for ``conda-forge`` users. When you install
a package from ``conda-forge`` that relies on MPI, ``conda`` will install the MPI binaries
built by ``conda-forge`` and the package will link to those binaries. This setup often either
does not work at all or functions in unexpected ways on HPC systems.

To solve these issues, ``conda-forge`` has created special dummy builds of the ``mpich`` libraries
that are simply shell packages with no contents. These packages allow the ``conda`` solver to produce
correct environments while avoiding installing MPI binaries from ``conda-forge``. You can install the
dummy package with the following command

.. code-block:: shell

    $ conda install mpich=3.3.*=external_*

As long as you have the local copies of the ``mpich`` library in your linking paths and
the local version matches the ``conda`` version up to the minor version number (e.g., ``3.3.1``
matches ``3.3.2`` but not ``3.4.1``), then this procedure should work. At runtime, the ``conda-forge``
package that depends on MPI should find the local copy of ``mpich`` and link to it.

.. note::

  ``mpich`` has a high degree of ABI compatibility, making this procedure possible.
  We have not currently implemented this procedure with ``openmpi``, but can do so at a later date
  as ABI compatibility allows.

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

You can confirm this by issuing the command ``conda list`` and searching for the package in question.

Why does that happen?
---------------------

The ``conda-forge`` and ``defaults`` are not 100% compatible.
In the example above it is known that ``defaults`` uses ``icu 54.*`` while ``conda-forge`` relies on ``icu 56.*``,
that mismatch can lead to errors when the install environment is mixing packages from multiple channels.

.. note::
   All of conda-forge software pinning can be found at: https://github.com/conda-forge/conda-forge-pinning-feedstock/blob/master/recipe/conda_build_config.yaml

How to fix it?
--------------

Newer ``conda`` versions (>=4.6) introduced a strict channel priority feature.
Type ``conda config --describe channel_priority`` for more information.


The solution is to add the ``conda-forge`` channel on top of ``defaults`` in your ``.condarc`` file when using ``conda-forge`` packages
and activate the strict channel priority with:

.. code-block:: shell

    $ conda config --set channel_priority strict

This will ensure that all the dependencies come from the ``conda-forge`` channel unless they exist only on ``defaults``.

Here is how a ``.condarc`` file would look like:

.. code-block:: shell

    $ cat .condarc
    channel_priority: strict
    channels:
      - conda-forge
      - defaults

In addition to the channel priority, we recommend always installing your packages inside a new environment instead of the ``base`` environment from anaconda/miniconda.
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

To solve these issues, ``conda-forge`` has created special dummy builds of the ``mpich`` and ``openmpi`` 
libraries that are simply shell packages with no contents. These packages allow the ``conda`` solver to produce
correct environments while avoiding installing MPI binaries from ``conda-forge``. You can install the
dummy package with the following command

.. code-block:: shell

    $ conda install "mpich=x.y.z=external_*"
    $ conda install "openmpi=x.y.z=external_*"

As long as you have the local copies of the ``mpich``/``openmpi`` library in your linking paths and
the local version matches the ``conda`` version within the proper ABI range, then this procedure should 
work. At runtime, the ``conda-forge`` package that depends on MPI should find the 
local copy of ``mpich``/``openmpi`` and link to it.

Another point for using your own MPI binaries specialized for the system is that
if you care about ultimate performance, you should build/install your MPI backend yourself,
and not rely on ``conda-forge`` packages (they are built for compatibility rather than performance).
Due to the constrained build environment of ``conda-forge`` packages there might be the lack of such important features
as XPMEM and CMA for ``mpich`` and ``openmpi``, respectively.


.. _apple_silicon_rosetta:

Installing Apple Intel packages on Apple Silicon
================================================

Using `Rosetta 2 <https://support.apple.com/en-us/HT211861>`_, you can install packages originally compiled for Mac computers with Intel processors on Mac computers with Apple silicon processors.

This can be enabled per environment using the following commands:

.. code-block:: shell

    CONDA_SUBDIR=osx-64 conda create -n your_environment_name python   # Create a new environment called your_environment_name with intel packages.
    conda activate your_environment_name
    python -c "import platform;print(platform.machine())"  # Confirm that the correct values are being used.
    conda config --env --set subdir osx-64  # Make sure that conda commands in this environment use intel packages.

To verify that the correct platform is being used, run the following commands after the environment has been activated:

.. code-block:: shell

    python -c "import platform;print(platform.machine())"  # Should print "x86_64"
    echo "CONDA_SUBDIR: $CONDA_SUBDIR"  # Should print "CONDA_SUBDIR: osx-64"


.. _installing_packages_for_GPUs_and_CPUs:

Installing CUDA-enabled packages like TensorFlow and PyTorch 
============================================================

In conda-forge, some packages are available with GPU support. These packages not only take significantly longer to compile and build, but they also result in rather large binaries that users then download. As an effort to maximize accessibility for users with lower connection and/or storage bandwidth, there is an ongoing effort to limit installing packages compiled for GPUs unnecessarily on CPU-only machines by default. This is accomplished by adding a run dependency, ``__cuda``, that detects if the local machine has a GPU. However, this introduces challenges to users who may prefer to still download and use GPU-enabled packages even on a non-GPU machine. For example, login nodes on HPCs often do not have GPUs and their compute counterparts with GPUs often do not have internet access. In this case, a user can override the default setting via the environment variable ``CONDA_OVERRIDE_CUDA`` to install GPU packages on the login node to be used later on the compute node. At the time of writing (February 2022), we have concluded this safe default behavior is best for most of conda-forge users, with an easy override option available and documented. Please let us know if you have thoughts on or issues with this.

In order to override the default behavior, a user can set the environment variable ``CONDA_OVERRIDE_CUDA`` like below to install TensorFlow with GPU support even on a machine with CPU only.

.. code-block:: shell

     CONDA_OVERRIDE_CUDA="11.2" conda install "tensorflow==2.7.0=cuda112*" -c conda-forge
     # OR
     CONDA_OVERRIDE_CUDA="11.2" mamba install "tensorflow==2.7.0=cuda112*" -c conda-forge

.. note::
   
   You should select the cudatoolkit version most appropriate for your GPU; currently, we have "10.2", "11.0", "11.1", and "11.2" builds available, where the "11.2" builds are compatible with all cudatoolkits>=11.2. At the time of writing (Mar 2022), there seems to be a bug in how the CUDA builds are resolved by ``mamba``, defaulting to ``cudatoolkit==10.2``; thus, it is prudent to be as explicit as possible like above or by adding ``cudatoolkit>=11.2`` or similar to the line above. 

For context, installing the TensorFlow 2.7.0 CUDA-enabled variant, ``tensorflow==2.7.0=cuda*``, results in approximately 2 GB of packages to download while the CPU variant, ``tensorflow=2.7.0=cpu*``, results in approximately 200 MB to download. That is a significant bandwidth and storage wasted if one only needs the CPU only variant!

.. _pypy:

Using PyPy as an interpreter
============================
The ``conda-forge`` channel supports creating and installing packages into
environments using the `PyPy interpreter`_. Many packages are already
available. You need to enable the ``conda-forge`` channel and use
the ``pypy`` identifier when creating your environment:

.. code-block:: shell

    $ conda create -c conda-forge -n my-pypy-env pypy python=3.8
    $ conda activate my-pypy-env

Currently supported python versions are 3.8 and 3.9. Support for ``pypy3.7``
has been dropped. While you can still create a python 3.7 environment, you
you will not be getting updates as new package versions are released (including
pypy itself).

.. note::

   As of March 8 2020, if you are using defaults as a low priority channel,
   then you need to use strict channel priority as the metadata in defaults
   has not been patched yet which allows cpython extension packages to be
   installed alongside pypy.

.. code-block:: bash

   $ conda config --set channel_priority strict

.. _`PyPy interpreter`: https://www.pypy.org

Knowledge Base
**************

Using CMake
===========

`CMake <https://cmake.org/>`__ can be used to build more complex projects in ``build.sh``
or ``bld.bat`` scripts.

If you are using cmake, be sure to make it a build requirement in the ``build`` section. You
may also need to include ``make`` or ``ninja`` depending on your platform and build tools.
On Windows, you can also use ``nmake`` to build, but that does not need to be explicitly included.

.. code-block:: yaml

    requirements:
      build:
        - cmake
        - make  # [not win]
        - ninja  # [win]

For CMake projects using the `FindPython <https://cmake.org/cmake/help/git-stage/module/FindPython.html>`__
module, you can tell CMake which Python to use by passing ``-DPython_EXECUTABLE="$PYTHON"``
(macOS or Linux) or ``-DPython_EXECUTABLE="%PYTHON%"`` (Windows) as a command line option.
Older CMake projects may require similar, but slightly different options.

.. tip::

    Don't forget that depending on which CMake module you use you have to use a different command:

    -   `FindPython <https://cmake.org/cmake/help/git-stage/module/FindPython.html>`__:
        ``-DPython_EXECUTABLE=...``.
    -   `FindPython3 <https://cmake.org/cmake/help/git-stage/module/FindPython3.html>`__:
        ``-DPython3_EXECUTABLE=...``.
    -   `FindPython2 <https://cmake.org/cmake/help/git-stage/module/FindPython2.html>`__:
        ``-DPython2_EXECUTABLE=...``.

    or if you are still on the deprecated `FindPythonLibs <https://cmake.org/cmake/help/latest/module/FindPythonLibs.html>`__: ``-DPYTHON_EXECUTABLE=...``.

Some optional, but useful CMake options:

    - ``-DCMAKE_BUILD_TYPE=Release`` Configure as release build. This is better done on the initial
      ``cmake`` call as some packages construct different build configurations depending on this flag.
    - ``-DCMAKE_INSTALL_PREFIX=$PREFIX`` Specify the install location.
    - ``-DCMAKE_INSTALL_LIBDIR=lib`` Libraries will land in $PREFIX/lib, sometimes projects install
      into lib64 or similar but on conda-forge we keep shared libraries in simply lib.
    - ``-DBUILD_SHARED_LIBS=ON`` Instruct CMake to build shared libraries instead of static ones.

Here are some basic commands for you to get started. These are dependent on your source
code layout and aren't intended to be used "as is".

**CMake lines for build.sh (macOS/Linux):**

.. code-block::

    cmake CMakeLists.txt -DPython3_EXECUTABLE="$PYTHON"
    cmake --build . --config Release

**CMake lines for bld.bat (Windows):**

.. code-block::

    cmake -G "NMake Makefiles" -DCMAKE_BUILD_TYPE=Release -DPython3_EXECUTABLE="%PYTHON%"
    if errorlevel 1 exit /b 1
    cmake --build . --config Release
    if errorlevel 1 exit /b 1

See also the ``bld.bat`` in the Windows section below for an additional example.

Other useful ``cmake`` options are ``-B<directory>`` and ``-S<directory>`` to specify build and source
directories.

Moving from an autotools build to a CMake build
-----------------------------------------------

Some packages maintain an autotools build and a cmake build. Some maintainers
would like to switch to a cmake build because that provides windows builds
easily. These builds are mostly not ABI compatible with each other.
Here are some things you should check,

1. Check that both libraries have the same SONAME on linux

   Run ``readelf -d /path/to/lib.so``

2. Check that both libraries have the same install name and have the same
   compatibility and current versions.

   Run ``otool -L /path/to/lib.dylib``. The second line should give you
   the three pieces of information

3. Check that the file list is the same in both.

4. Check that you use the same options as the same autoconf build.

5. Check that the symbols exported are the same.

6. Check that additional packaging information stays the same, e.g. is the same pkg-config information provided.


Particularities on Windows
==========================

This document presents conda-forge and conda-build information and examples
while building on Windows.


Local testing
-------------

The first thing that you should know is that you can locally test Windows
builds of your packages even if you don’t own a Windows machine. Microsoft
makes available free, official Windows virtual machines (VMs) `at this website
<https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/>`_. If you
are unfamiliar with VM systems or have trouble installing Microsoft’s VMs, please
use a general web search to explore — while these topics are beyond the
scope of this documentation, there are ample discussions on them on the broader
Internet.

In order to compile native code (C, C++, etc.) on Windows, you will need to
install Microsoft’s Visual C++ build tools on your VM. You must install
particular versions of these tools — this is to maintain compatibility between
compiled libraries used in Python, `as described on this Python wiki page
<https://wiki.python.org/moin/WindowsCompilers>`_. The current relevant
versions are:

* For Python 2.7: Visual C++ 9.0
* For Python 3.5–3.7: Visual C++ 14.0

While you can obtain these tools by installing the right version of the full
`Visual Studio <https://visualstudio.microsoft.com/>`_ development
environment, you can save a lot of time and bandwidth by installing standalone
“build tools” packages. The links are as follows:

* For Python 2.7: `Microsoft Visual C++ Compiler for Python 2.7
  <https://www.microsoft.com/download/details.aspx?id=44266>`_.
* For Python 3.5–3.7: `Microsoft Build Tools for Visual Studio 2017
  <https://www.visualstudio.com/downloads/#build-tools-for-visual-studio-2017>`_.

If you need more information. Please refer `the Python wiki page on Windows compilers
<https://wiki.python.org/moin/WindowsCompilers>`_.

Simple CMake-Based ``bld.bat``
------------------------------
Some projects provide hooks for CMake to build the project. The following
example ``bld.bat`` file demonstrates how to build a traditional, out-of-core
build for such projects.

**CMake-based bld.bat:**

.. code-block:: bat

    setlocal EnableDelayedExpansion

    :: Make a build folder and change to it.
    mkdir build
    cd build

    :: Configure using the CMakeFiles
    cmake -G "NMake Makefiles" ^
          -DCMAKE_INSTALL_PREFIX:PATH="%LIBRARY_PREFIX%" ^
          -DCMAKE_PREFIX_PATH:PATH="%LIBRARY_PREFIX%" ^
          -DCMAKE_BUILD_TYPE:STRING=Release ^
          ..
    if errorlevel 1 exit 1

    :: Build!
    nmake
    if errorlevel 1 exit 1

    :: Install!
    nmake install
    if errorlevel 1 exit 1

The following feedstocks are examples of this build structure deployed:

* `libpng <https://github.com/conda-forge/libpng-feedstock/blob/master/recipe/bld.bat>`_
* `Pugixml <https://github.com/conda-forge/pugixml-feedstock/blob/master/recipe/bld.bat>`_


Building for different VC versions
----------------------------------

On Windows, different Visual C versions have different ABI and therefore a package needs to be built for different
Visual C versions. Packages are tied to the VC version that they were built with and some packages have specific
requirements of the VC version. For example, python 2.7 requires ``vc 9`` and python 3.5 requires ``vc 14``.

With ``conda-build 3.x``, ``vc`` can be used as a selector when using the ``compiler`` jinja syntax.

.. code-block:: yaml

    requirements:
      build:
        - {{ compiler('cxx') }}

To skip building with a particular ``vc`` version, add a skip statement.

.. code-block:: yaml

    build:
        skip: true  # [win and vc<14]

    requirements:
      build:
        - {{ compiler('cxx') }}

Using vs2019
-------------

To use ``vs2019`` make the following changes:

In conda_build_config.yaml file:

.. code-block:: yaml

    c_compiler:
    - vs2019
    cxx_compiler:
    - vs2019


In conda-forge.yml file:

.. code-block:: yaml

    azure:
      settings_win:
          pool:
              vmImage: windows-2019



For example see the changes made in the ``conda_build_config.yaml`` and ``conda-forge.yml`` files in `this
<https://github.com/conda-forge/libignition-physics-feedstock/commit/c586d765a2f5fd0ecf6da43c53315c898c9bf6bd>`_ PR.

After making these changes don't forget to rerender with ``conda-smithy`` (to rerender manually use ``conda smithy rerender`` from the command line).

Special Dependencies and Packages
=================================

.. _dep_compilers:

Compilers
---------

Compilers are dependencies with a special syntax and are always added to ``requirements/build``.

There are currently three supported compilers:

 - C
 - cxx
 - Fortran

A package that needs all three compilers would define

.. code-block:: yaml

    requirements:
      build:
        - {{ compiler('c') }}
        - {{ compiler('cxx') }}
        - {{ compiler('fortran') }}

.. note::

  Appropriate compiler runtime packages will be automatically added to the package's runtime requirements and therefore
  there's no need to specify ``libgcc`` or ``libgfortran``. There are additional informations about how conda-build 3 treats
  compilers in the `conda docs <https://docs.conda.io/projects/conda-build/en/latest/resources/compiler-tools.html>`_.

.. _cdt_packages:

Core Dependency Tree Packages (CDTs)
------------------------------------

Dependencies outside of the ``conda-forge`` channel should be avoided (see :ref:`no_external_deps`).
However, there are a few exceptions:

Some dependencies are so close to the system that they are not packaged with ``conda-forge``.
These dependencies have to be satisfied with *Core Dependency Tree* (CDT) packages.

A CDT package consists of repackaged CentOS binaries from the appropriate version,
either 6 or 7 depending on user choice and platform. We manage the build of CDT
packages using a centralized repo, `conda-forge/cdt-builds <https://github.com/conda-forge/cdt-builds>`_,
as opposed to generating feedstocks for them. (Note that historically we did use feedstocks but this
practice has been deprecated.) To add a new CDT, make a PR on the
`conda-forge/cdt-builds <https://github.com/conda-forge/cdt-builds>`_ repo.

In ``conda-forge`` the primary usages of CDTs is currently for packages that link against libGL.

libGL
^^^^^

In addition to the required compilers ``{{ compiler('c') }}`` and/or ``{{ compiler('cxx') }}``,
the following CDT packages are required for linking against libGL:

.. code-block:: yaml

  requirements:
    build:
      - {{ cdt('mesa-libgl-devel') }}  # [linux]
      - {{ cdt('mesa-dri-drivers') }}  # [linux]
      - {{ cdt('libselinux') }}  # [linux]
      - {{ cdt('libxdamage') }}  # [linux]
      - {{ cdt('libxxf86vm') }}  # [linux]
      - {{ cdt('libxext') }}     # [linux]
    host:
      - xorg-libxfixes  # [linux]


If you need a fully functional binary in the test phase, you have to also provide the shared
libraries via ``yum_requirements.txt`` (see :ref:`yum_deps`).

.. code-block:: text

  mesa-libGL
  mesa-dri-drivers
  libselinux
  libXdamage
  libXxf86vm
  libXext

You will need to re-render the feedstock after making these changes.

.. _linking_numpy:

Building Against NumPy
----------------------

Packages that link against NumPy need special treatment in the dependency section.
Finding ``numpy.get_include()`` in ``setup.py`` or ``cimport`` statements in ``.pyx`` or ``.pyd`` files are a telltale sign that the package links against NumPy.

In the case of linking, you need to use the ``pin_compatible`` function to ensure having a compatible numpy version at run time:

.. code-block:: yaml

    host:
      - numpy
    run:
      - {{ pin_compatible('numpy') }}


At the time of writing, above is equivalent to the following,

.. code-block:: yaml

    host:
      - numpy 1.14.6
    run:
      - numpy >=1.14.6,<2.0.a0


.. admonition:: Notes

    1. You still need to respect minimum supported version of ``numpy`` for the package!
    That means you cannot use ``numpy 1.9`` if the project requires at least ``numpy 1.12``,
    adjust the minimum version accordingly!

    .. code-block:: yaml

        host:
          - numpy 1.12.*
        run:
          - {{ pin_compatible('numpy') }}


    2. if your package supports ``numpy 1.7``, and you are brave enough :-),
    there are ``numpy`` packages for ``1.7`` available for Python 2.7 in the channel.


.. _jupyterlab_extension:

JupyterLab Extensions
---------------------
A typical JupyterLab extension has both Python and JavaScript components.
These should be packaged together, to prevent node from being needing to
grab the JavaScript side of the package on the user's machine. To package
an extension, the build should have the following ``meta.yaml`` snippet:

.. code-block:: yaml

    build:
      noarch: python


    requirements:
      host:
        - python
        - nodejs
        - pip
      run:
        - python
        - nodejs
        - jupyterlab >=2

Please use the following ``build.sh`` script in your recipe:

.. code-block:: sh

    #!/usr/bin/env bash
    set -ex

    $PYTHON -m pip install . -vv
    npm pack ${PKG_NAME}@${PKG_VERSION}
    mkdir -p ${PREFIX}/share/jupyter/lab/extensions/js
    cp ${PKG_NAME}-${PKG_VERSION}.tgz ${PREFIX}/share/jupyter/lab/extensions/js


Since this is a noarch recipe, the build script only needs to run on ``linux-64``.
Also note that we do not need to run ``jupyter labextension install``  or
``jupyter lab build`` as part of the package build or in any post-link scripts.
This is because JupyterLab will run the build step itself when it is next run.
The ``${PREFIX}/share/jupyter/lab/extensions/js`` directory which JupyterLab
knows to build from when performing this build step.


Message passing interface (MPI)
-------------------------------

.. note::

  This section originates from Min's notes: https://hackmd.io/ry4uI0thTs2q_b4mAQd_qg

MPI Variants in conda-forge
^^^^^^^^^^^^^^^^^^^^^^^^^^^

How are MPI variants best handled in conda-forge?


There are a few broad cases:

- package requires a specific MPI provider (easy!)
- the package works with any MPI provider (e.g. mpich, openmpi)
- the package works with/without MPI

Note that sometimes users want to use packages in ``conda-forge`` built against
our MPI libraries but linked to external MPI libraries at runtime. If you are interested
in this procedure, see :ref:`Using External Message Passing Interface (MPI) Libraries`
for details.

Building MPI variants
^^^^^^^^^^^^^^^^^^^^^

In `conda_build_config.yaml`:

.. code-block:: yaml

  mpi:
    - mpich
    - openmpi


In `meta.yaml`:

.. code-block:: yaml

  requirements:
    host:
      - {{ mpi }}

And rerender with:

.. code-block:: bash

  conda-smithy rerender -c auto

to produce the build matrices.

Including a no-mpi build
^^^^^^^^^^^^^^^^^^^^^^^^

Some packages (e.g. hdf5) may want a no-mpi build, in addition to the mpi builds.
To do this, add `nompi` to the mpi matrix:

.. code-block:: yaml

  mpi:
    - nompi
    - mpich
    - openmpi

and apply the appropriate conditionals in your build:

.. code-block:: yaml

  requirements:
    host:
      - {{ mpi }}  # [mpi != 'nompi']
    run:
      - {{ mpi }}  # [mpi != 'nompi']



Preferring a provider (usually nompi)
"""""""""""""""""""""""""""""""""""""

Up to here, mpi providers have no explicit preference. When choosing an MPI provider, the mutual exclusivity of
the ``mpi`` metapackage allows picking between mpi providers by installing an mpi provider, e.g.

.. code-block:: bash

    conda install mpich ptscotch

or

.. code-block:: bash

    conda install openmpi ptscotch

This doesn't extend to ``nompi``, because there is no ``nompi`` variant of the mpi metapackage. And there probably
shouldn't be, because some packages built with mpi don't preclude other packages in the env that *may* have an mpi variant
from using the no-mpi variant of the library (e.g. for a long time, fenics used mpi with no-mpi hdf5 since there was no
parallel hdf5 yet. This works fine, though some features may not be available).

Typically, if there is a preference it will be for the serial build, such that installers/requirers of the package
only get the mpi build if explicitly requested. We use a higher build number for the ``nompi`` variant in this case.

Here is an example build section:

::

  {% if mpi == 'nompi' %}
  # prioritize nompi variant via build number
  {% set build = build + 100 %}
  {% endif %}
  build:
    number: {{ build }}

    # add build string so packages can depend on
    # mpi or nompi variants explicitly:
    # `pkg * mpi_mpich_*` for mpich
    # `pkg * mpi_*` for any mpi
    # `pkg * nompi_*` for no mpi

    {% set mpi_prefix = "mpi_" + mpi %}
    {% else %}
    {% set mpi_prefix = "nompi" %}
    {% endif %}
    string: "{{ mpi_prefix }}_h{{ PKG_HASH }}_{{ build }}"

.. note::

  ``{{ PKG_HASH }}`` avoids build string collisions on *most* variants,
  but not on packages that are excluded from the default build string,
  e.g. Python itself. If the package is built for multiple Python versions, use:

  .. code-block:: yaml

    string: "{{ mpi_prefix }}_py{{ py }}h{{ PKG_HASH }}_{{ build }}"

  as seen in `mpi4py <https://github.com/conda-forge/h5py-feedstock/pull/49/commits/b08ee9307d16864e775f1a7f9dd10f25c83b5974>`__


This build section creates the following packages:

- ``pkg-x.y.z-mpi_mpich_h12345_0``
- ``pkg-x.y.z-mpi_openmpi_h23456_0``
- ``pkg-x.y.z-nompi_h34567_100``

Which has the following consequences:

- The ``nompi`` variant is preferred, and will be installed by default unless an mpi variant is explicitly requested.
- mpi variants can be explicitly requested with ``pkg=*=mpi_{{ mpi }}_*``
- any mpi variant, ignoring provider, can be requested with ``pkg=*=mpi_*``
- nompi variant can be explicitly requested with ``pkg=*=nompi_*``

If building with this library creates a runtime dependency on the variant, the build string pinning can be added to ``run_exports``.

For example, if building against the nompi variant will work with any installed version, but building with a
given mpi provider requires running with that mpi:


::

  build:
    ...
    {% if mpi != 'nompi' %}
    run_exports:
      - {{ name }} * {{ mpi_prefix }}_*
    {% endif %}

Remove the ``if mpi...`` condition if all variants should create a strict runtime dependency based on the variant
chosen at build time (i.e. if the nompi build cannot be run against the mpich build).

Complete example
""""""""""""""""

Combining all of the above, here is a complete recipe, with:

- nompi, mpich, openmpi variants
- run-exports to apply mpi choice made at build time to runtime where nompi builds can be run with mpi, but not vice versa.
- nompi variant is preferred by default
- only build nompi on Windows

This matches what is done in `hdf5 <https://github.com/conda-forge/hdf5-feedstock/pull/90>`__.


.. code-block:: yaml

  # conda_build_config.yaml
  mpi:
    - nompi
    - mpich  # [not win]
    - openmpi  # [not win]

::

  # meta.yaml
  {% set name = 'pkg' %}
  {% set build = 0 %}

  # ensure mpi is defined (needed for conda-smithy recipe-lint)
  {% set mpi = mpi or 'nompi' %}

  {% if mpi == 'nompi' %}
  # prioritize nompi variant via build number
  {% set build = build + 100 %}
  {% endif %}

  build:
    number: {{ build }}

    # add build string so packages can depend on
    # mpi or nompi variants explicitly:
    # `pkg * mpi_mpich_*` for mpich
    # `pkg * mpi_*` for any mpi
    # `pkg * nompi_*` for no mpi

    {% if mpi != 'nompi' %}
    {% set mpi_prefix = "mpi_" + mpi %}
    {% else %}
    {% set mpi_prefix = "nompi" %}
    {% endif %}
    string: "{{ mpi_prefix }}_h{{ PKG_HASH }}_{{ build }}"

    {% if mpi != 'nompi' %}
    run_exports:
      - {{ name }} * {{ mpi_prefix }}_*
    {% endif %}

  requirements:
    host:
      - {{ mpi }}  # [mpi != 'nompi']
    run:
      - {{ mpi }}  # [mpi != 'nompi']

And then a package that depends on this one can explicitly pick the appropriate mpi builds:

.. code-block:: yaml

  # meta.yaml

  requirements:
    host:
      - {{ mpi }}  # [mpi != 'nompi']
      - pkg
      - pkg * mpi_{{ mpi }}_*  # [mpi != 'nompi']
    run:
      - {{ mpi }}  # [mpi != 'nompi']
      - pkg * mpi_{{ mpi }}_*  # [mpi != 'nompi']

mpi-metapackage exclusivity allows ``mpi_*`` to resolve the same as ``mpi_{{ mpi }}_*``
if ``{{ mpi }}`` is also a direct dependency, though it's probably nicer to be explicit.

Just mpi example
""""""""""""""""

Without a preferred ``nompi`` variant, recipes that require mpi are much simpler. This is all that is needed:

.. code-block:: yaml

  # conda_build_config.yaml
  mpi:
    - mpich
    - openmpi

.. code-block:: yaml

  # meta.yaml
  requirements:
    host:
      - {{ mpi }}
    run:
      - {{ mpi }}



OpenMP
------

You can enable OpenMP on macOS by adding the ``llvm-openmp`` package to the ``build`` section of the ``meta.yaml``.
For Linux OpenMP support is on by default, however it's better to explicitly depend on the `libgomp` package which is the OpenMP
implementation from the GNU project.

 .. code-block:: yaml

  # meta.yaml
  requirements:
    build:
      - llvm-openmp  # [osx]
      - libgomp      # [linux]

Switching OpenMP implementation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

On macOS, only LLVM's OpenMP implementation ``llvm-openmp`` is supported. This implementation is used even in Fortran code compiled
using GNU's gfortran.

On Linux (except aarch64), packages are linked against GNU's ``libgomp.so.1``, but the OpenMP library at install time can be
switched from GNU to LLVM by doing the following.

 .. code-block:: shell

    conda install _openmp_mutex=*=*_llvm

OpenMP library can be switched back to GNU's libgomp by doing the following.

 .. code-block:: shell

    conda install _openmp_mutex=*=*_gnu

.. note::

  OpenMP library switching is possible because LLVM's implementation has the symbol's from GNU in addition to the LLVM
  ones (originally from Intel). An object file generated by ``gcc``, ``g++`` or ``gfortran`` will have GNU's symbols and
  therefore the underlying library can be switched.
  However, an object file generated by ``clang`` or ``clang++`` will have LLVM's symbols and therefore the underlying
  OpenMP library cannot be switched to GNU's library.

  One reason you may wish to switch to LLVM is because the implementation is fork safe. One reason to keep using the
  GNU implementation is that the OpenMP target offloading symbols in ``libgomp`` like ``GOMP_target`` are empty stubs
  in LLVM and therefore does not work.


.. _yum_deps:

yum_requirements.txt
--------------------

Dependencies can be installed into the build container with ``yum``, by listing package names line by line in a file
named ``yum_requirements.txt`` in the ``recipe`` directory of a feedstock.

There are only very few situations where dependencies installed by yum are acceptable. These cases include

  - satisfying the requirements of :term:`CDT` packages during test phase
  - installing packages that are only required for testing

After changing ``yum_requirements.txt``, :ref:`rerender <dev_update_rerender>` to update the configuration.


.. _knowledge:blas:

BLAS
----

If a package needs one of BLAS, CBLAS, LAPACK, LAPACKE, use the following in the
host of the recipe,

.. code-block:: yaml

    requirements:
      host:
        - libblas
        - libcblas
        - liblapack
        - liblapacke

.. note::
  You should specify only the libraries that the package needs. (i.e. if the package
  doesn't need LAPACK, remove liblapack and liblapacke)

  At recipe build time, above requirements would download the NETLIB's reference
  implementations and build your recipe against those.
  At runtime, by default the following packages will be used.

.. code-block:: yaml

    - openblas   # [not win]
    - mkl        # [win]

If a package needs a specific implementation's internal API for more control you can have,

.. code-block:: yaml

    requirements:
      host:
        - {{ blas_impl }}
      run:
        - libblas * *{{ blas_impl }}
        - {{ blas_impl }}

This would give you a matrix builds for different blas implementations. If you only want to support
a specific blas implementation,

.. code-block:: yaml

    requirements:
      host:
        - openblas
      run:
        - libblas * *openblas
        - openblas

.. note::
  ``blas_*`` features should not be used anymore.

Switching BLAS implementation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can switch your BLAS implementation by doing,

.. code-block:: bash

    conda install "libblas=*=*mkl"
    conda install "libblas=*=*openblas"
    conda install "libblas=*=*blis"
    conda install "libblas=*=*netlib"

This would change the BLAS implementation without changing the conda packages depending
on BLAS.

The following legacy commands are also supported as well.

.. code-block:: bash

    conda install "blas=*=mkl"
    conda install "blas=*=openblas"
    conda install "blas=*=blis"
    conda install "blas=*=netlib"

.. note::

  If you want to commit to a specific blas implementation, you can prevent conda from switching back by pinning
  the blas implementation in your environment. To commit to mkl, add ``blas=*=mkl`` to
  ``<conda-root>/envs/<env-name>/conda-meta/pinned``, as described in the
  `conda-docs <https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-pkgs.html#preventing-packages-from-updating-pinning>`__.

How it works
^^^^^^^^^^^^

At recipe build time, the netlib packages are used. This means that the downstream package will
link to ``libblas.so.3`` in the ``libblas=*=*netlib`` and will use only the reference
implementation's symbols.

``libblas`` and ``libcblas`` versioning is based on the Reference LAPACK versioning which at the
time of writing is ``3.8.0``. Since the BLAS API is stable, a downstream package will only pin to
``3.*`` of ``libblas`` and ``libcblas``. On the other hand, ``liblapack`` and ``liblapacke`` pins to
``3.8.*``.

In addition to the above netlib package, there are other variants like ``libblas=*=*openblas``,
which has ``openblas`` as a dependency and has a symlink from ``libblas.so.3`` to ``libopenblas.so``.
``libblas=3.8.0=*openblas`` pins the ``openblas`` dependency to a version that is known to support the
BLAS ``3.8.0`` API.  This means that, at install time, the user can select what BLAS implementation
they like without any knowledge of the version of the BLAS implementation needed.


.. _knowledge:mpl:

Matplotlib
----------

``matplotlib`` on ``conda-forge`` comes in two parts. The core library is in ``matplotlib-base``. The
actual ``matplotlib`` package is this core library plus ``pyqt``. Most, if not all, packages that have
dependence at runtime on ``matplotlib`` should list this dependence as ``matplotlib-base`` unless they
explicitly need ``pyqt``. The idea is that a user installing ``matplotlib`` explicitly would get a full
featured installation with ``pyqt``. However, ``pyqt`` is a rather large package, so not requiring it
indirectly is better for performance. Note that you may need to include a ``yum_requirements.txt`` file
in your recipe with

.. code-block:: bash

    xorg-x11-server-Xorg

if you import parts of ``matplotlib`` that link to ``libX11``.

``pybind11`` ABI Constraints
----------------------------

Sometimes when different python libraries using ``pybind11`` interact via lower-level C++ interfaces,
the underlying ABI between the two libraries has to match. To ease this use case, we have a ``pybind11-abi``
metapackage that can be used in the ``host`` section of a build. Its version is pinned globally and it has a
run export on itself, meaning that builds with this package in ``host`` will have a runtime constraint on it.
Further, the ``pybind11`` has a run constraint on the ABI metapackage to help ensure consistent usage.

To use this package in a build, put it in the host environment like so

.. code-block:: yaml

    requirements:
      host:
        - pybind11-abi


.. _knowledge:empty:

Empty Python packages
----------
For some features introduced in later Python versions, the Python community creates backports, which makes these
features available for earlier versions of Python as well.
One example here is `dataclasses <https://www.python.org/dev/peps/pep-0557/>`__ which was introduced with
Python3.7 but is available as a `backport <https://github.com/ericvsmith/dataclasses>`__ for Python3.6 too.
Therefore, most upstream packages make those backports only mandatory for specific versions of Python and exclude them otherwise.

Implementing this restriction in conda-forge is currently only possible through the use of ``skips``
which restricts the corresponding conda-forge recipes from becoming ``noarch``.

Therefore, some conda-forge recipes only create an actual package on specific Python versions and are otherwise an
empty placeholder. This allows them to be safely installed under all Python versions and makes using ``skips`` unnecessary.

Currently available packages:

+-------------+-------------------+--------------+
| Name        | Available on:     | Empty on:    |
+=============+===================+==============+
| dataclasses | python >=3.6,<3.7 | python >=3.7 |
+-------------+-------------------+--------------+
| typing      |                   | python >=3   |
+-------------+-------------------+--------------+


Noarch builds
=============

Noarch packages are packages that are not architecture specific and therefore only have to be built once.

Declaring these packages as ``noarch`` in the ``build`` section of the meta.yaml, reduces shared CI resources.
Therefore all packages that qualify to be noarch packages, should be declared as such.


.. _noarch:

Noarch python
-------------
The ``noarch: python`` directive, in the ``build`` section, makes pure-Python
packages that only need to be built once.

In order to qualify as a noarch python package, all of the following criteria must be fulfilled:

  - No compiled extensions
  - No post-link or pre-link or pre-unlink scripts
  - No OS-specific build scripts
  - No python version specific requirements
  - No skips except for python version. If the recipe is py3 only, remove skip
    statement and add version constraint on python in ``host`` and ``run``
    section.
  - ``2to3`` is not used
  - Scripts argument in setup.py is not used
  - If ``console_scripts`` ``entry_points`` are defined in ``setup.py`` or ``setup.cfg``, they are also listed in
    the ``build`` section of ``meta.yaml``
  - No activate scripts
  - Not a dependency of conda

.. note::

  While ``noarch: python`` does not work with selectors, it does work with version constraints.
  ``skip: True  # [py2k]`` can be replaced with a constrained python version in the host and run subsections:
  say ``python >=3`` instead of just ``python``.

.. note::

  Only ``console_scripts`` entry points have to be listed in meta.yaml. Other entry points do not conflict
  with ``noarch`` and therefore do not require extra treatment.

.. note::

  ``noarch`` is a statement about the package's source code and not its install environment. A package is still considered
  ``noarch`` even if one of its dependencies is not available on a given platform. If this is the case, conda will
  display a helpful error message describing which dependency couldn't be found when it tries to install the package.
  If the dependency is later made available, your package will be installable on that platform without having to make
  any changes to the feedstock. However, keep in mind that since ``noarch`` packages are built on Linux, all
  dependencies must be available on Linux.


If an existing python package qualifies to be converted to a noarch package, you can request the required changes
by opening a new issue and including ``@conda-forge-admin, please add noarch: python``.


Noarch generic
--------------

.. todo::

  add some information on r packages which make heavy use of ``noarch: generic``


Build matrices
==============

Currently, ``python, vc, r-base`` will create a matrix of jobs for each supported version. If ``python`` is only a
build dependency and not a runtime dependency (eg: build script of the package is written in Python, but the
package is not dependent on Python), use ``build`` section

Following implies that ``python`` is only a build dependency and no Python matrix will be created.

.. code-block:: yaml

    build:
      - python
    host:
      - some_other_package


Note that ``host`` should be non-empty or ``compiler`` jinja syntax used or ``build/merge_build_host`` set to
True for the ``build`` section to be treated as different from ``host``.

Following implies that ``python`` is a runtime dependency and a Python matrix for each supported Python version will be created.

.. code-block:: yaml

    host:
      - python

``conda-forge.yml``'s build matrices is removed in conda-smithy=3. To get a build matrix,
create a ``conda_build_config.yaml`` file inside the recipe folder. For example, the following will give you 2
builds and you can use the selector ``vtk_with_osmesa`` in the ``meta.yaml``

.. code-block:: yaml

    vtk_with_osmesa:
      - False
      - True

You need to rerender the feedstock after this change.


Requiring newer macOS SDKs
==========================

conda-forge uses macOS SDK 10.9 to build software so that they can be deployed to
all macOS versions newer than 10.9. Sometimes, some packages require a newer SDK
to build with. While the default version 10.9 can be overridden using the following
changes to the recipe, it should be done as a last resort. Please consult with
core team if this is something you think you need.

To use a new SDK, add the following in ``recipe/conda_build_config.yaml``

.. code-block:: yaml

    # Please consult conda-forge/core before doing this
    MACOSX_SDK_VERSION:        # [osx and x86_64]
      - "10.12"                # [osx and x86_64]

Note that this should be done if the error you are getting says that a header is not
found or a macro is not defined. This will make your package compile with a newer SDK
but with ``10.9`` as the deployment target.
WARNING: some packages might use features from ``10.12`` if you do the above due to
buggy symbol availability checks. For example packages looking for ``clock_gettime``
will see it as it will be a weak symbol, but the package might not have a codepath
to handle the weak symbol, in that case, you need to update the ``MACOSX_DEPLOYMENT_TARGET``
as described below.

After increasing the SDK version, if you are getting an error that says that a function
is available only for macOS x.x, then do the following in ``recipe/conda_build_config.yaml``,

.. code-block:: yaml

    # Please consult conda-forge/core before doing this
    MACOSX_DEPLOYMENT_TARGET:  # [osx and x86_64]
      - "10.12"                # [osx and x86_64]
    MACOSX_SDK_VERSION:        # [osx and x86_64]
      - "10.12"                # [osx and x86_64]


In ``recipe/meta.yaml``, add the following to ensure that the user's system is compatible.

.. code-block:: yaml

    requirements:
      run:
        - __osx >={{ MACOSX_DEPLOYMENT_TARGET|default("10.9") }}  # [osx and x86_64]

Note that this requires ``conda>=4.8``. If you want to support older conda versions
the requirement should be changed from ``run`` to ``run_constrained``. Note that
``conda<4.8`` will ignore the condition if it's a ``run_constrained`` on ``__osx``.


PyPy builds
===========

To use the PyPy 3.6 or 3.7 builds you can do the following,

.. code-block:: bash

   conda create -n pypy36  pypy python=3.6
   conda create -n pypy37  pypy python=3.7

.. note::

   As of March 8 2020, if you are using defaults as a low priority channel,
   then you need to use strict channel priority as the metadata in defaults
   has not been patched yet which allows cpython extension packages to be
   installed alongside pypy.

.. code-block:: bash

   conda config --set channel_priority strict

To build your python package for pypy, wait for the bot to send a
PR and contact ``conda-forge/bot`` team if a PR is not sent after the
dependencies have been built.

To add a dependency just for pypy or cpython, do,

.. code-block:: yaml

   requirements:
     run:
       - spam           # [python_impl == 'cpython']
       - ham            # [python_impl == 'pypy']

.. note::

   You'll need to rerender the feedstocks after making the above
   change in order for the ``python_impl`` variable to be available to
   conda-build

To skip the pypy builds, do the following,

.. code-block:: yaml

   build:
     skip: True         # [python_impl == 'pypy']


Using setuptools_scm
====================

The Python module `setuptools_scm <https://github.com/pypa/setuptools_scm>`_
can be used to manage a package's version automatically from metadata, such as git tags.
The package's version string is thus not specified anywhere in the package,
but encoded in it at install-time.

For conda-build this means that ``setuptools_scm`` must be included as a ``host`` dependency.
Additionally, some attention because the metadata is often not available in the sources.
There are two options for how to proceed:

*   For Python package also available on PyPI:
    Use the PyPi tarball as a source, as it will have the metadata encoded
    (in such a way that ``setuptools_scm`` knows how to find it).

*   Specify the environment variable ``SETUPTOOLS_SCM_PRETEND_VERSION`` with the version string.
    If specified this environment variable is the principle source for ``setuptools_scm``.
    There are two ways how to do this:

    -   If you are using build scripts, in ``build.sh`` specify:

        .. code-block:: bash

            export SETUPTOOLS_SCM_PRETEND_VERSION="$PKG_VERSION"

        and in ``bld.bat`` specify:

        .. code-block:: bash

            set SETUPTOOLS_SCM_PRETEND_VERSION=%PKG_VERSION%

        Whereby you use that ``PKG_VERSION`` has been set with the version string,
        see `Environment variables <https://docs.conda.io/projects/conda-build/en/latest/user-guide/environment-variables.html#env-vars>`_.

    -   Otherwise, if you are directly building from ``meta.yaml``, use for example:

        .. code-block:: yaml

            build:
              # [...]
              script_env:
                - SETUPTOOLS_SCM_PRETEND_VERSION={{version}}
              script: "{{ PYTHON }} -m pip install . -vv"

.. _centos7:

Using CentOS 7
==============

To use the newer CentOS 7 ``sysroot`` with ``glibc`` ``2.17`` on ``linux-64``,
put the following in your build section.

.. code-block:: yaml

   requirements:
     build:
       - {{ compiler('c') }}
       - sysroot_linux-64 2.17  # [linux64]

You also need to use a newer docker image by setting the following in the ``conda-forge.yml``
of your recipe and rerendering.

.. code-block:: yaml

   os_version:
     linux_64: cos7

Finally, note that the ``aarch64`` and ``ppc64le`` platforms already use CentOS 7.

.. _cuda:

CUDA builds
===========

Although the provisioned CI machines do not feature a GPU, Conda-Forge does provide mechanisms
to build CUDA-enabled packages. These mechanisms involve several packages:

* ``cudatoolkit``: The runtime libraries for the CUDA toolkit. This is what end-users will end
  up installing next to your package.

* ``nvcc``: Nvidia's EULA does not allow the redistribution of compilers and drivers. Instead, we
  provide a wrapper package that locates the CUDA installation in the system. The main role of this
  package is to set some environment variables (``CUDA_HOME``, ``CUDA_PATH``, ``CFLAGS`` and others),
  as well as wrapping the real ``nvcc`` executable to set some extra command line arguments.

In practice, to enable CUDA on your package, add ``{{ compiler('cuda') }}`` to the ``build``
section of your requirements and rerender. The matching ``cudatoolkit`` will be added to the ``run``
requirements automatically.

On Linux, CMake users are required to use ``${CMAKE_ARGS}`` so CMake can find CUDA correctly. For example::

  mkdir build && cd build
  cmake ${CMAKE_ARGS} ${SRC_DIR}
  make


.. note::

  **How is CUDA provided at the system level?**

  * On Linux, Nvidia provides official Docker images, which we then
    `adapt <https://github.com/conda-forge/docker-images>`_ to Conda-Forge's needs.

  * On Windows, the compilers need to be installed for every CI run. This is done through the
    `conda-forge-ci-setup <https://github.com/conda-forge/conda-forge-ci-setup-feedstock/>`_ scripts.
    Do note that the Nvidia executable won't install the drivers because no GPU is present in the machine.

  **How is cudatoolkit selected at install time?**

  Conda exposes the maximum CUDA version supported by the installed Nvidia drivers through a virtual package
  named ``__cuda``. By default, ``conda`` will install the highest version available
  for the packages involved. To override this behaviour, you can define a ``CONDA_OVERRIDE_CUDA`` environment
  variable. More details in the
  `Conda docs <https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-virtual.html#overriding-detected-packages>`_.

  Note that prior to v4.8.4, ``__cuda`` versions would not be part of the constraints, so you would always
  get the latest one, regardless the supported CUDA version.

  If for some reason you want to install a specific version, you can use::

    conda install your-gpu-package cudatoolkit=10.1

Testing the packages
--------------------

Since the CI machines do not feature a GPU, you won't be able to test the built packages as part
of the conda recipe. That does not mean you can't test your package locally. To do so:

1. Enable the Azure artifacts for your feedstock (see :ref:`here <azure-config>`).
2. Include the test files and requirements in the recipe
   `like this <https://github.com/conda-forge/cupy-feedstock/blob/a1e9cdf47775f90d3153a26913068c6df942d54b/recipe/meta.yaml#L51-L61>`_.
3. Provide the test instructions. Take into account that the GPU tests will fail in the CI run,
   so you need to ignore them to get the package built and uploaded as an artifact.
   `Example <https://github.com/conda-forge/cupy-feedstock/blob/a1e9cdf47775f90d3153a26913068c6df942d54b/recipe/run_test.py>`_.
4. Once you have downloaded the artifacts, you will be able to run::

    conda build --test <pkg file>.tar.bz2


Common problems and known issues
--------------------------------

``nvcuda.dll`` cannot be found on Windows
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The `scripts <https://github.com/conda-forge/conda-forge-ci-setup-feedstock/blob/master/recipe/install_cuda.bat>`_
used to install the CUDA Toolkit on Windows cannot provide ``nvcuda.dll``
as part of the installation because no GPU is physically present in the CI machines.
As a result, you might get linking errors in the postprocessing steps of ``conda build``::

  WARNING (arrow-cpp,Library/bin/arrow_cuda.dll): $RPATH/nvcuda.dll not found in packages,
  sysroot(s) nor the missing_dso_whitelist.

  .. is this binary repackaging?

For now, you will have to add ``nvcuda.dll`` to the ``missing_dso_whitelist``::

  build:
    ...
    missing_dso_whitelist:
      - "*/nvcuda.dll"   # [win]


My feedstock is not building old CUDA versions anymore
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

With the `addition of CUDA 11.1 and 11.2 <https://github.com/conda-forge/conda-forge-pinning-feedstock/pull/1162>`_,
the default build matrix for CUDA versions was trimmed down to versions 10.2, 11.0, 11.1, 11.2.

If you really need it, you can re-add support for 9.2, 10.0 and 10.1. However, this is not recommended.
Adding more CUDA versions to the build matrix will dramatically increase the number of jobs and will place a large
burden on our CI resources. Only proceed if there's a known use case for the extra packages.

1. Download this `migration file <https://github.com/conda-forge/conda-forge-pinning-feedstock/blob/master/recipe/migrations/cuda92_100_101.yaml>`_.
2. In your feedstock fork, create a new branch and place the migration file under ``.ci_support/migrations``.
3. Open a PR and re-render. CUDA 9.2, 10.0 and 10.1 will appear in the CI checks now. Merge when ready!


Adding support for a new CUDA version
-------------------------------------

Providing a new CUDA version involves five repositores:

* `cudatoolkit-feedstock <https://github.com/conda-forge/cudatoolkit-feedstock>`_
* `nvcc-feedstock <https://github.com/conda-forge/nvcc-feedstock>`_
* `conda-forge-pinning-feedstock <https://github.com/conda-forge/conda-forge-pinning-feedstock>`_
* `docker-images <https://github.com/conda-forge/docker-images>`_ (Linux only)
* `conda-forge-ci-setup-feedstock <https://github.com/conda-forge/conda-forge-ci-setup-feedstock>`_ (Windows only)

The steps involved are, roughly:

1. Add the ``cudatoolkit`` packages in ``cudatoolkit-feedstock``.
2. Submit the version migrator to ``conda-forge-pinning-feedstock``.
   This will stay open during the following steps.
3. For Linux, add the corresponding Docker images at ``docker-images``.
   Copy the migration file manually to ``.ci_support/migrations``.
   This copy should not specify a timestamp. Comment it out and rerender.
4. For Windows, add the installer URLs and hashes to the ``conda-forge-ci-setup``
   `script <https://github.com/conda-forge/conda-forge-ci-setup-feedstock/blob/master/recipe/install_cuda.bat>`_.
   The migration file must also be manually copied here. Rerender.
5. Create the new ``nvcc`` packages for the new version. Again, manual
   migration must be added. Rerender.
6. When everything else has been merged and testing has taken place,
   consider merging the PR opened at step 2 now so it can apply to all the downstream feedstocks.


.. _osxarm64:

Apple Silicon builds
====================

The new Apple M1 processor is the first Apple Silicon supported by conda-forge
`osx-arm64 <https://github.com/conda-forge/conda-forge.github.io/issues/1126>`_ builds.
For new builds to be available, via cross-compilation, a migration is required for
the package and its dependencies. These builds are experimental as many of them are untested.

To request a migration for a particular package and all its dependencies:

1. Check the feedstock in question to see if there is already an issue or pull request.
   Opening an issue here is fine, as it might take a couple iterations of the below,
   especially if many dependencies need to be built as well.
2. If nothing is under way, look at the current `conda-forge-pinning <https://github.com/conda-forge/conda-forge-pinning-feedstock/blob/master/recipe/migrations/osx_arm64.txt>`_.
3. If the package is not listed there, make a PR, adding the package
   name to the end of ``osx_arm64.txt``. The migration bot should start making automated
   pull requests to the repo and its dependencies.
4. Within a few hours, the `status page <https://conda-forge.org/status/#armosxaddition>`_
   should reflect the progress of the package in question, and help you keep track
   of progress. Help out if you can!
5. The feedstock maintainers (who very likely *do not* have an M1) will work to make
   any changes required to pass continuous intgration. If you have insight into
   the particular package, **please** chime in, but most of all **be patient and polite**.
6. Once the new builds are available from ``anaconda.org``, please help the maintainers
   by testing the packages, and reporting back with any problems... but also successes!


Pre-release builds
==================

Recipe maintainers can make pre-release builds available on
conda-forge by adding them to the ``dev`` or ``rc`` label.

The semantics of these labels should generally follow the
`guidelines <https://docs.python.org/devguide/devcycle.html#stages>`_ that Python
itself follows.

- ``rc``: `Beta <https://docs.python.org/devguide/devcycle.html#beta>`_ and `Release
  Candidate <https://docs.python.org/devguide/devcycle.html#release-candidate-rc>`_
  (RC). No new features. Bugfix only.

- ``dev``: `Pre-Alpha <https://docs.python.org/devguide/devcycle.html#pre-alpha>`_
  and `Alpha <https://docs.python.org/devguide/devcycle.html#alpha>`_. These are
  still packages that could see substantial changes
  between the dev version and the final release.


.. note::

  ``alpha`` and ``beta`` labels aren't used. Given the light usage of labels on the conda-forge
  channel thus far, it seems rather unnecessary to introduce many labels.
  ``dev`` and ``rc`` seem like a nice compromise.

.. note::

  Certain packages (for example `black <https://pypi.org/project/black/#history>`_) follow
  a release cycle in which they have never had a non-beta/alpha release.  In these cases
  the conda packages for those do *not* need to be published to a prerelease label.

Creating a pre-release build
----------------------------

To create a ``dev`` or ``rc`` package, a PR can be issued into the ``dev`` or ``rc`` branch of the
feedstock.
This branch must change the ``recipe/conda_build_config.yaml`` file to point to the ``<package_name>_dev`` or ``<package_name>_rc`` label.

For example, matplotlib rc releases would include:

.. code-block:: yaml

   channel_targets:
     - conda-forge matplotlib_rc

If a pre-release build of B depends on a pre-release build of A, then A should have,

.. code-block:: yaml

   channel_targets:
     - conda-forge A_rc

while B should have,

.. code-block:: yaml

   channel_sources:
     - conda-forge/label/A_rc,conda-forge,defaults
   channel_targets:
     - conda-forge B_rc

in ``recipe/conda_build_config.yaml`` in their respective feedstocks.

.. note::

  A rerender needs to happen for these changes to reflect in CI files.

Installing a pre-release build
------------------------------

Use the following command, but replace ``PACKAGE_NAME`` with the package you want
to install and replace ``LABEL`` with ``rc`` or ``dev``:

.. code-block:: yaml

   conda install -c conda-forge/label/PACKAGE_NAME_LABEL -c conda-forge PACKAGE_NAME

For example, let's install matplotlib from the ``rc`` label:

.. code-block:: yaml

   conda install -c conda-forge/label/matplotlib_rc -c conda-forge matplotlib

Pre-release version sorting
---------------------------

If you wish to add numbers to your ``dev`` or ``rc`` build, you should follow the
`guidelines <https://docs.conda.io/projects/conda/en/latest/user-guide/concepts/pkg-specs.html#version-ordering>`_ put
forth by Continuum regarding version sorting in ``conda``. Also see the `source
code for conda
4.2.13 <https://github.com/conda/conda/blob/4.2.13/conda/version.py#L93-L119>`_.
The tl;dr here is that conda sorts as follows:

.. code-block::

   < 1.0
   < 1.1dev1    # special case 'dev'
   < 1.1.0dev1  # special case 'dev'
   == 1.1.dev1   # 0 is inserted before string
   < 1.1.0rc1
   < 1.1.0


So make sure that you **tag** your package in such a way that the package name
that conda-build spits out will sort the package uploaded with an ``rc`` label
higher than the package uploaded with the ``dev`` label.

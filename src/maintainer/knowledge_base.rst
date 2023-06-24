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
    - ``-DCMAKE_FIND_FRAMEWORK=NEVER`` and ``-DCMAKE_FIND_APPBUNDLE=NEVER`` Prevent CMake from using system-wide macOS packages.
    - ``${CMAKE_ARGS}`` Add variables defined by conda-forge internally. This is required to enable various conda-forge enhancements, like `CUDA builds <https://conda-forge.org/docs/maintainer/knowledge_base.html#cuda-builds>`__.

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
<https://developer.microsoft.com/en-us/windows/downloads/virtual-machines/>`__. If you
are unfamiliar with VM systems or have trouble installing Microsoft’s VMs, please
use a general web search to explore — while these topics are beyond the
scope of this documentation, there are ample discussions on them on the broader
Internet.

In order to compile native code (C, C++, etc.) on Windows, you will need to
install Microsoft’s Visual C++ build tools on your VM. You must install
particular versions of these tools — this is to maintain compatibility between
compiled libraries used in Python, `as described on this Python wiki page
<https://wiki.python.org/moin/WindowsCompilers>`__. The current relevant
versions are:

* For Python 3.5–3.7: Visual C++ 14.0

While you can obtain these tools by installing the right version of the full
`Visual Studio <https://visualstudio.microsoft.com/>`__ development
environment, you can save a lot of time and bandwidth by installing standalone
“build tools” packages. The links are as follows:

* For Python 3.5–3.7: `Microsoft Build Tools for Visual Studio 2017
  <https://visualstudio.microsoft.com/vs/older-downloads/#visual-studio-2017-and-other-products>`__.

If you need more information. Please refer `the Python wiki page on Windows compilers
<https://wiki.python.org/moin/WindowsCompilers>`__.

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

In ``conda_build_config.yaml`` file:

.. code-block:: yaml

    c_compiler:    # [win]
    - vs2019       # [win]
    cxx_compiler:  # [win]
    - vs2019       # [win]


For example see the changes made in the ``conda_build_config.yaml`` files in `this
<https://github.com/conda-forge/libignition-msgs1-feedstock/pull/73/commits/81b5ee0e1d23f7f20427dd80d04cf1f7321b441d>`__ commit.

After making these changes don't forget to rerender with ``conda-smithy`` (to rerender manually use ``conda smithy rerender`` from the command line).


.. _cmd_batch_syntax:

Tips & tricks for CMD/Batch syntax
----------------------------------

Windows recipes rely on CMD/Batch scripts (``.bat``) by default.
Batch syntax is a bit different from Bash and friends on Unix, so we have collected some tips here to help you get started if you are not familiar with this scripting language.

* Check if you need to write a Batch script first!
  Simple recipes might not need shell-specific code and can be written in an agnostic way.
  Use the ``build.script`` item in ``meta.yaml`` (see `conda-build docs <https://docs.conda.io/projects/conda-build/en/stable/resources/define-metadata.html#script>`__).
  This item can take a string or a list of strings (one per line).
* `SS64's CMD howto pages <https://ss64.com/nt/syntax.html>`__ are the best resource for any kind of question regarding CMD/Batch syntax.
* Search conda-forge for existing ``.bat`` scripts and learn with examples.
  See this `example query for all Batchfiles <https://github.com/search?q=org%3Aconda-forge+language%3ABatchfile&type=code&l=Batchfile>`__.
* You can `free trial Windows VMs from Microsoft <https://developer.microsoft.com/en-us/windows/downloads/virtual-machines/>`__.
  Set one up with your favorite virtualization solution to debug your CMD syntax.
  There are also some minimal emulators online that might get you started with the basics, even if not all CMD features are present.
  For example, this `Windows 95 emulator <https://www.pcjs.org/software/pcx86/sys/windows/win95/4.00.950/>`__ features a more or less okay MS-DOS prompt.

Special Dependencies and Packages
=================================

.. _dep_compilers:

Compilers
---------

Compilers are dependencies with a special syntax and are always added to ``requirements/build``.

There are currently five supported compilers:

 - C
 - cxx
 - Fortran
 - Go
 - Rust

A package that needs all five compilers would define

.. code-block:: yaml

    requirements:
      build:
        - {{ compiler('c') }}
        - {{ compiler('cxx') }}
        - {{ compiler('fortran') }}
        - {{ compiler('go') }}
        - {{ compiler('rust') }}

.. note::

  Appropriate compiler runtime packages will be automatically added to the package's runtime requirements and therefore
  there's no need to specify ``libgcc`` or ``libgfortran``. There are additional informations about how conda-build 3 treats
  compilers in the `conda docs <https://docs.conda.io/projects/conda-build/en/stable/resources/compiler-tools.html>`__.

Cross-compilation
-----------------

For some other architectures (like ARM), packages can be built natively on that architecture or they can be cross-compiled.
In other words built on a different common architecture (like x86_64) while still targeting the original architecture (ARM).
This helps one leverage more abundant CI resources in the build architecture (x86_64).

A package needs to make a few changes in their recipe to be compatible with cross-compilation. Here are a few examples.

A simple C library using autotools for cross-compilation might look like this:

.. code-block:: yaml

    requirements:
      build:
        - {{ compiler("c") }}
        - make
        - pkg-config
        - gnuconfig

In the build script, it would need to update the config files and guard any tests when cross-compiling:

.. code-block:: sh

    # Get an updated config.sub and config.guess
    cp $BUILD_PREFIX/share/gnuconfig/config.* .

    # Skip ``make check`` when cross-compiling
    if [[ "${CONDA_BUILD_CROSS_COMPILATION}" != "1" ]]; then
      make check
    fi

A simple Python extension using Cython and NumPy's C API would look like so:

.. code-block:: yaml

    requirements:
      build:
        - {{ compiler("c") }}
        - cross-python_{{ target_platform }}    # [build_platform != target_platform]
        - python                                # [build_platform != target_platform]
        - cython                                # [build_platform != target_platform]
        - numpy                                 # [build_platform != target_platform]
      host:
        - python
        - pip
        - cython
        - numpy
      run:
        - python
        - {{ pin_compatible("numpy") }}

There are more variations of this approach in the wild. So this is not meant to be exhaustive,
but merely to provide a starting point with some guidelines. Please look at `other recipes for more examples`_.

.. _other recipes for more examples: https://github.com/search?q=org%3Aconda-forge+path%3Arecipe%2Fmeta.yaml+%22%5Bbuild_platform+%21%3D+target_platform%5D%22&type=code

Rust Nightly
------------

Many rust packages rely on nightly versions of the rust compiler. Given this fast release cadence, ``conda-forge`` does not yet pull each release.
Instead, rust nightly versions are pulled into the ``dev`` branch of the `conda-forge/rust-feedstock <https://github.com/conda-forge/rust-feedstock/tree/dev>`_ on an as-needed basis.
For a new version, please file an issue on that feedstock.

To enable the rust nightly compiler in your feedstock, follow the section above and then add the ``rust_dev`` channel in the ``conda_build_config.yaml`` file:

.. code-block:: yaml

    channel_sources:
      - conda-forge/label/rust_dev,conda-forge


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
`conda-forge/cdt-builds <https://github.com/conda-forge/cdt-builds>`__ repo.

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


At the time of writing (January 22, 2022), above is equivalent to the following,

.. code-block:: yaml

    host:
      - numpy   1.18   # [py==37]
      - numpy   1.18   # [py==38]
      - numpy   1.19   # [py==39]
    run:
      - numpy >=1.18.5,<2.0.a0   # [py==37]
      - numpy >=1.18.5,<2.0.a0   # [py==38]
      - numpy >=1.19.5,<2.0.a0   # [py==39]

See the pinning repository for what the pinning corresponds to at time of writing
https://github.com/conda-forge/conda-forge-pinning-feedstock/blob/master/recipe/conda_build_config.yaml#L631


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
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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

    {% if mpi != 'nompi' %}
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
^^^^^^^^^^^^^^^^

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
^^^^^^^^^^^^^^^^

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

MPI Compiler Packages
^^^^^^^^^^^^^^^^^^^^^

Do not use the ``[openmpi,mpich]-[mpicc,mpicxx,mpifort]`` metapackages in the ``requirements/build`` section
of a recipe; the MPI compiler wrappers are included in the main ``openmpi``/``mpich`` packages.
As shown above, just add ``openmpi``/``mpich`` to the ``requirements/host`` section and use compiler directives for the
corresponding compilers in ``requirements/build`` as normal.


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
    conda install "libblas=*=*accelerate"
    conda install "libblas=*=*netlib"

This would change the BLAS implementation without changing the conda packages depending
on BLAS.

The following legacy commands are also supported as well.

.. code-block:: bash

    conda install "blas=*=mkl"
    conda install "blas=*=openblas"
    conda install "blas=*=blis"
    conda install "blas=*=accelerate"
    conda install "blas=*=netlib"

.. note::

  If you want to commit to a specific blas implementation, you can prevent conda from switching back by pinning
  the blas implementation in your environment. To commit to mkl, add ``blas=*=mkl`` to
  ``<conda-root>/envs/<env-name>/conda-meta/pinned``, as described in the
  `conda-docs <https://docs.conda.io/projects/conda/en/stable/user-guide/tasks/manage-pkgs.html#preventing-packages-from-updating-pinning>`__.

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
---------------------
For some features introduced in later Python versions, the Python community creates backports, which makes these
features available for earlier versions of Python as well.
One example here is `dataclasses <https://www.python.org/dev/peps/pep-0557/>`__ which was introduced with
Python3.7 but is available as a `backport <https://github.com/ericvsmith/dataclasses>`__ for Python3.6 too.
Therefore, most upstream packages make those backports only mandatory for specific versions of Python and exclude them otherwise.

Implementing this restriction in conda-forge is currently only possible through the use of ``skips``
which restricts the corresponding conda-forge recipes from becoming ``noarch``.

Therefore, some conda-forge recipes only create an actual package on specific Python versions and are otherwise an
empty placeholder. This allows them to be safely installed under all Python versions and makes using ``skips`` unnecessary.

Similarly, some packages are `only` platform-specific dependency of a package, such as ``pywin32``, and have
helper metapackages which can help recipes stay ``noarch``. The version of the `actual` package required
can be controlled with ``run_constrained``, even for packages not available on all platforms.

Currently available packages:

+--------------------+-------------------+--------------+
| Name               | Available on:     | Empty on:    |
+====================+===================+==============+
| dataclasses        | python >=3.6,<3.7 | python >=3.7 |
+--------------------+-------------------+--------------+
| enum34             | python =2.7       | python >=3.4 |
+--------------------+-------------------+--------------+
| typing             |                   | python >=3   |
+--------------------+-------------------+--------------+
| pywin32-on-windows | windows           | unix         |
+--------------------+-------------------+--------------+

.. _knowledge:all-installs:

Non-version-specific Python packages
------------------------------------
For some dependencies, upstream maintainers list Python versions where those packages are needed,
even if the packages can actually be installed under all Python versions.

Implementing this restriction in conda-forge is currently only possible through the use of ``skips``
which restricts the corresponding conda-forge recipes from becoming ``noarch``.

Therefore, the conda-forge community maintains a list of packages that are safe to be installed under all Python versions,
even if the original package only requires it for some versions.

For example, the package `pyquil <https://github.com/rigetti/pyquil>`__ only
`requires <https://github.com/rigetti/pyquil/blob/497791e8108d8780109d75410be786c5f6e590ea/pyproject.toml#L30>`__ ``importlib-metadata`` for ``python <3.8`` but it is actually save to be installed under ``python >=3.8`` as well.

Currently available packages:

  - exceptiongroup
  - importlib-metadata


Noarch builds
=============

Noarch packages are packages that are not architecture specific and therefore only have to be built once.

Declaring these packages as ``noarch`` in the ``build`` section of the meta.yaml, reduces shared CI resources.
Therefore all packages that qualify to be noarch packages `should` be declared as such.


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
  - ``scripts`` argument in ``setup.py`` is not used
  - If ``console_scripts`` ``entry_points`` are defined in ``setup.py`` or ``setup.cfg``, they are also
    `listed <https://conda.io/projects/conda-build/en/stable/resources/define-metadata.html#python-entry-points>`__
    in the ``build`` section of ``meta.yaml``
  - No activate scripts

.. note::

  While ``noarch: python`` does not work with selectors, it does work with version constraints.
  ``skip: True  # [py2k]`` can be replaced with a constrained python version in the host and run subsections:
  say ``python >=3`` instead of just ``python``.

.. note::

  Only ``console_scripts`` entry points have to be listed in ``meta.yaml``. Other entry points do not conflict
  with ``noarch`` and therefore do not require extra treatment.

.. note::

  ``noarch`` is a statement about the package's source code and not its install environment. A package is still considered
  ``noarch`` even if one of its dependencies is not available on a given platform. If this is the case, conda will
  display a helpful error message describing which dependency couldn't be found when it tries to install the package.
  If the dependency is later made available, your package will be installable on that platform without having to make
  any changes to the feedstock.

  By default, ``noarch`` packages are built on Linux, and all dependencies must be available on Linux.

.. hint::

  If a ``noarch`` package `cannot` be built on Linux, one or more ``noarch_platforms`` can be provided in
  ``conda-forge.yml``. One example is `pywin32-on-windows <https://github.com/conda-forge/pywin32-on-windows-feedstock>`_,
  which builds on Linux `and` Windows, with ``build_number`` offsets to create a pair packages, like
  ``dataclasses``.

.. hint::
  
  You can build platform-specific ``noarch`` packages to include runtime requirements depending on the target OS.
  See mini-tutorial below.

If an existing python package qualifies to be converted to a noarch package, you can request the required changes
by opening a new issue and including ``@conda-forge-admin, please add noarch: python``.

.. _os_specific_noarch:

Noarch packages with OS-specific dependencies
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

It is possible to build ``noarch`` packages with runtime requirements that depend on the target OS
(Linux, Windows, MacOS), regardless the architecture (amd64, ARM, PowerPC, etc). This approach
relies on three concepts:

1.  `Virtual packages <https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-virtual.html>`__. 
    Prefixed with a double underscore, they are used by conda to represent system properties as
    constraints for the solver at install-time. We will use ``__linux``, ``__win`` or ``__osx``,
    which are only present when the running platform is Linux, Windows, or MacOS, respectively.
    ``__unix`` is present in both Linux and MacOS. Note that this feature is **only fully available
    on conda 4.10 or above**.
2.  ``conda-forge.yml``'s :ref:`noarch_platforms` option.
3.  **conda-build 3.25.0 or above** changing the build hash depending on virtual packages used.

The idea is to generate different noarch packages for each OS needing different dependencies.
Let's say you have a pure Python package, perfectly eligible for ``noarch: python``, but on Windows
it requires ``windows-only-dependency``. You might have something like:

.. code-block:: yaml
  :caption: recipe/meta.yaml (original)

  name: package
  source:
    # ...
  build:
    number: 0
  requirements:
    # ...
    run:
      - python
      - numpy
      - windows-only-dependency  # [win]

Being non-noarch, this means that the build matrix will include at least 12 outputs: three platforms,
times four Python versions. This gets worse with ``arm64``, ``aarch64`` and ``ppc64le`` in the mix.
We can get it down to two outputs if replace it with this other approach!

.. code-block:: yaml
  :caption: recipe/meta.yaml (modified)

  name: package
  source:
    # ...
  build:
    number: 0
    noarch: python
  requirements:
    host:
      - python >=3.7
      # ...
    run:
      - python >=3.7
      - numpy
      - __unix  # [unix]
      - __win   # [win]
      - windows-only-dependency  # [win]

Do not forget to specify the platform virtual packages with their selectors!
Otherwise, the solver will not be able to choose the variants correctly.

By default, conda-forge will only build ``noarch`` packages on a ``linux_64`` CI runner, so
only the ``# [unix]`` selectors would be true. However, we can change this behaviour using
the ``noarch_platforms`` option in ``conda-forge.yml``:

.. code-block:: yaml
  :caption: conda-forge.yml

  noarch_platforms:
    - linux_64
    - win_64

This will provide two runners per package! Perfect! All these changes require a
feedstock rerender to be applied. See :ref:`dev_update_rerender`.

If you need conditional dependencies on all three operating systems, this is how you do it:

.. code-block:: yaml+jinja
  :caption: recipe/meta.yaml

  name: package
  source:
    # ...
  build:
    number: 0
    noarch: python
  requirements:
    # ...
    run:
      - python
      - numpy
      - __linux  # [linux]
      - __osx    # [osx]
      - __win    # [win]
      - linux-only-dependency    # [linux]
      - osx-only-dependency      # [osx]
      - windows-only-dependency  # [win]

.. code-block:: yaml
  :caption: conda-forge.yml

  noarch_platforms:
    - linux_64
    - osx_64
    - win_64

Again, remember to rerender after adding / modifying these files so the changes are applied.

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

Newer C++ features with old SDK
-------------------------------

The libc++ library uses Clang availability annotations to mark certain symbols as
unavailable when targeting versions of macOS that ship with a system libc++
that do not contain them. Clang always assumes that the system libc++ is used.

The conda-forge build infrastructure targets macOS 10.9 and some newer C++ features
such as ``fs::path`` are marked as unavailable on that platform, so the build aborts:

.. code-block:: sh

  ...
  error: 'path' is unavailable: introduced in macOS 10.15
  ...
  note: 'path' has been explicitly marked unavailable here
  class _LIBCPP_TYPE_VIS path {

However, since conda-forge ships its own (modern) libcxx we can ignore these checks
because these symbols are in fact available. To do so, add
``_LIBCPP_DISABLE_AVAILABILITY`` to the defines. For example

.. code-block:: sh

  CXXFLAGS="${CXXFLAGS} -D_LIBCPP_DISABLE_AVAILABILITY"


PyPy builds
===========

See :ref:`pypy` in the user docs for more info about PyPy and ``conda-forge``.

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

If something is failing the PyPy build when it passes the CPython one, reach
out to @conda-forge/help-pypy.

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
        see `Environment variables <https://docs.conda.io/projects/conda-build/en/stable/user-guide/environment-variables.html#env-vars>`__.

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
    `adapt <https://github.com/conda-forge/docker-images>`__ to Conda-Forge's needs.

  * On Windows, the compilers need to be installed for every CI run. This is done through the
    `conda-forge-ci-setup <https://github.com/conda-forge/conda-forge-ci-setup-feedstock/>`__ scripts.
    Do note that the Nvidia executable won't install the drivers because no GPU is present in the machine.

  **How is cudatoolkit selected at install time?**

  Conda exposes the maximum CUDA version supported by the installed Nvidia drivers through a virtual package
  named ``__cuda``. By default, ``conda`` will install the highest version available
  for the packages involved. To override this behaviour, you can define a ``CONDA_OVERRIDE_CUDA`` environment
  variable. More details in the
  `Conda docs <https://docs.conda.io/projects/conda/en/stable/user-guide/tasks/manage-virtual.html#overriding-detected-packages>`__.

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
   `like this <https://github.com/conda-forge/cupy-feedstock/blob/a1e9cdf47775f90d3153a26913068c6df942d54b/recipe/meta.yaml#L51-L61>`__.
3. Provide the test instructions. Take into account that the GPU tests will fail in the CI run,
   so you need to ignore them to get the package built and uploaded as an artifact.
   `Example <https://github.com/conda-forge/cupy-feedstock/blob/a1e9cdf47775f90d3153a26913068c6df942d54b/recipe/run_test.py>`__.
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

1. Download this `migration file <https://github.com/conda-forge/conda-forge-pinning-feedstock/blob/master/recipe/migrations/cuda92_100_101.yaml>`__.
2. In your feedstock fork, create a new branch and place the migration file under ``.ci_support/migrations``.
3. Open a PR and re-render. CUDA 9.2, 10.0 and 10.1 will appear in the CI checks now. Merge when ready!


Adding support for a new CUDA version
-------------------------------------

Providing a new CUDA version involves five repositores:

* `cudatoolkit-feedstock <https://github.com/conda-forge/cudatoolkit-feedstock>`_
* `nvcc-feedstock <https://github.com/conda-forge/nvcc-feedstock>`_
* `conda-forge-pinning-feedstock <https://github.com/conda-forge/conda-forge-pinning-feedstock>`_
* `docker-images <https://github.com/conda-forge/docker-images>`__ (Linux only)
* `conda-forge-ci-setup-feedstock <https://github.com/conda-forge/conda-forge-ci-setup-feedstock>`__ (Windows only)

The steps involved are, roughly:

1. Add the ``cudatoolkit`` packages in ``cudatoolkit-feedstock``.
2. Submit the version migrator to ``conda-forge-pinning-feedstock``.
   This will stay open during the following steps.
3. For Linux, add the corresponding Docker images at ``docker-images``.
   Copy the migration file manually to ``.ci_support/migrations``.
   This copy should not specify a timestamp. Comment it out and rerender.
4. For Windows, add the installer URLs and hashes to the ``conda-forge-ci-setup``
   `script <https://github.com/conda-forge/conda-forge-ci-setup-feedstock/blob/master/recipe/install_cuda.bat>`__.
   The migration file must also be manually copied here. Rerender.
5. Create the new ``nvcc`` packages for the new version. Again, manual
   migration must be added. Rerender.
6. When everything else has been merged and testing has taken place,
   consider merging the PR opened at step 2 now so it can apply to all the downstream feedstocks.


.. _osxarm64:

Apple Silicon builds
====================

The new Apple M1 processor is the first Apple Silicon supported by conda-forge
`osx-arm64 <https://github.com/conda-forge/conda-forge.github.io/issues/1126>`__ builds.
For new builds to be available, via cross-compilation, a migration is required for
the package and its dependencies. These builds are experimental as many of them are untested.

To request a migration for a particular package and all its dependencies:

1. Check the feedstock in question to see if there is already an issue or pull request.
   Opening an issue here is fine, as it might take a couple iterations of the below,
   especially if many dependencies need to be built as well.
2. If nothing is under way, look at the current `conda-forge-pinning <https://github.com/conda-forge/conda-forge-pinning-feedstock/blob/master/recipe/migrations/osx_arm64.txt>`__.
3. If the package is not listed there, make a PR, adding the package
   name to a random location in ``osx_arm64.txt``.
   The migration bot should start making automated pull requests to the
   repo and its dependencies.
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
`guidelines <https://devguide.python.org/developer-workflow/development-cycle/index.html#stages>`__ that Python
itself follows.

- ``rc``: `Beta <https://devguide.python.org/developer-workflow/development-cycle/index.html#beta>`__ and `Release
  Candidate <https://devguide.python.org/developer-workflow/development-cycle/index.html#release-candidate-rc>`_
  (RC). No new features. Bugfix only.

- ``dev``: `Pre-Alpha <https://devguide.python.org/developer-workflow/development-cycle/index.html#pre-alpha>`_
  and `Alpha <https://devguide.python.org/developer-workflow/development-cycle/index.html#alpha>`__. These are
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
     - conda-forge/label/A_rc,conda-forge
   channel_targets:
     - conda-forge B_rc

in ``recipe/conda_build_config.yaml`` in their respective feedstocks.

.. note::

  A rerender needs to happen for these changes to reflect in CI files. The `channel_targets` entries map
  `- <channel target> <label target>` pairs for use in the post-build upload step.

Installing a pre-release build
------------------------------

Using the `conda` CLI
^^^^^^^^^^^^^^^^^^^^^

Use the following command, but replace ``PACKAGE_NAME`` with the package you want
to install and replace ``LABEL`` with ``rc`` or ``dev``:

.. code-block:: yaml

   conda install -c conda-forge/label/PACKAGE_NAME_LABEL -c conda-forge PACKAGE_NAME

For example, let's install matplotlib from the ``rc`` label:

.. code-block:: yaml

   conda install -c conda-forge/label/matplotlib_rc -c conda-forge matplotlib

Using `environment.yml`
^^^^^^^^^^^^^^^^^^^^^^^

Use `MatchSpec
<https://github.com/conda/conda/blob/c3fb8150ed4c3dabb7ca376ade208095f98ee0b9/conda/models/match_spec.py#L70-L150>`__
to specify your package:

.. code-block:: yaml

   dependencies:
     - conda-forge/label/matplotlib_rc::matplotlib=3.7.0rc1

Alternately, you can use the channels section to enable the `matplotlib_rc` channel:

.. code-block:: yaml

   channels:
     - conda-forge/label/matplotlib_rc
   dependencies:
     - matplotlib=3.7.0.rc1

Pre-release version sorting
---------------------------

If you wish to add numbers to your ``dev`` or ``rc`` build, you should follow the
`guidelines <https://docs.conda.io/projects/conda/en/stable/user-guide/concepts/pkg-specs.html#version-ordering>`__ put
forth by Continuum regarding version sorting in ``conda``. Also see the `source
code for conda
4.2.13 <https://github.com/conda/conda/blob/4.2.13/conda/version.py#L93-L119>`__.
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

How to update your feedstock token?
====================================
To reset your feedstock token and fix issues with uploads, follow these steps:

1. Create a new text file in the ``token_reset`` directory of the ``conda-forge/admin-requests`` repo.
2. Add the name of your feedstock in the text file. While adding the name, don't add "-feedstock" to the end of it. For example: for ``python-feedstock``, just add ``python``.

See `token_reset/example.txt <https://github.com/conda-forge/admin-requests/blob/main/token_reset/example.txt>`__ for an example.

.. _using_arch_rebuild:

Using ``arch_rebuild.txt``
==========================

You can add a feedstock to ``arch-rebuild.txt`` if it requires rebuilding with different architectures/platforms (such as ppc64le or aarch64). To add the feedstock to ``arch_rebuild.txt``, open a PR to the `conda-forge-pinning-feedstock repository <https://github.com/conda-forge/conda-forge-pinning-feedstock>`__.
Once the PR is merged, the migration bot goes through the list of feedstocks in ``arch_rebuild.txt`` and opens a migration PR for any new feedstocks and their dependencies, enabling the aarch64/ppc64le builds.

.. _migrations_and_migrators:

Migrators and Migrations
========================

When any changes are made in the global pinnings of a package, then the entire stack of the packages that need that package on their ``host`` section would need to be updated and rebuilt.
Doing it manually can be quite tedious, and that's where migrations come to help. Migrations automate the process of submitting changes to a feedstock and are an integral part of the ``regro-cf-autotick-bot``'s duties.

There are several kinds of migrations, which you can read about in `Making Migrators <https://regro.github.io/cf-scripts/migrators.html>`__. To generate these migrations, you use migrators, which are bots that automatically create pull requests for the affected packages in conda-forge.
To propose a migration in one or more pins, the migrator issues a PR into the pinning feedstock using a yaml file expressing the changes to the global pinning file in the migrations folder.
Once the PR is merged, the dependency graph is built. After that, the bot walks through the graph, migrates all the nodes (feedstocks) one by one, and issues PRs for those feedstocks.

Usually, the bot generates these migrations automatically. However, when a pin is first made or added, one may need to be added by hand. To do this, you can follow the steps mentioned in `Updating package pins <https://conda-forge.org/docs/maintainer/pinning_deps.html#updating-package-pins>`__.

The way migrations proceed are:

  1. You make a PR into the ``migrations`` folder in the `conda-forge-pinning-feedstock <https://github.com/conda-forge/conda-forge-pinning-feedstock>`__ with a new yaml file representing the migration.
  2. Once the PR is merged, the bot picks it up, builds a migrator graph, and begins the migration process.
  3. A migration PR is issued for a node (a feedstock) only if:

    - The node depends on the changed pinnings.
    - The node has no dependencies that depend on the new pinnings and have not been migrated.

  4. Process 3 continues until the migration is complete and the change is applied to the global pinning file via a final PR. After this step, we say this migration is closed out.

Sometimes, you might get a migration PR for your package that you don’t want to merge. In that case, you should put that PR in draft status but should never close it.
If you close the PR, it makes the bot think that another PR implementing the migration is merged instead, letting the migration continue iterating on the graph; however, the downstream dependents fail because the parent (the one we closed the PR of) didn’t really get rebuilt.
Another reason why it is good to keep the PR open or in draft status is that people might help with it if they want in the future.

In some cases a migration PR may not get opened. Please look for
`the migration on our status page <https://conda-forge.org/status/#current_migrations>`_
to see if there are any issues. This may show there are still dependencies
needing migration, in which case the best approach is to wait (or if possible
offer to help migrate those dependencies). If there is a bot error, there will
be a link to the CI job to provide more details about what may have gone wrong.
In these cases `please raise an issue <http://github.com/regro/cf-scripts/issues/new>`_
and include as much information as possible.

It is worth noting that one also has the option to create a migration PR
themselves. This can be a good option if the bot errored and that is still
being investigated or the migration PR got closed accidentally. To migrate a PR manually:

  1. Fork the feedstock and clone it locally
  2. Create a new branch
  3. Create the directory ``.ci_support/migrations`` in the feedstock (if absent)
  4. Copy the migrator from `conda-forge-pinning's migrators <https://github.com/conda-forge/conda-forge-pinning-feedstock/tree/main/recipe/migrations>`_ to ``.ci_support/migrations`` and commit it
  5. :ref:`Rerender <dev_update_rerender>` the feedstock
  6. Push these changes and open a PR


Security considerations for conda-forge builds
==============================================

All ``conda-forge`` packages are built by strangers on the internet on public cloud infrastructure from source code you likely have not inspected, so you should not use ``conda-forge`` packages if you or your team require a high level of security.
You are also free to download recipes and rebuild them yourself, if you would like at least that much oversight. However, many people use ``conda-forge`` all the time with no issues and here are some things that ``conda-forge`` does to help with security in some ways:

1. `Sources <https://conda-forge.org/docs/maintainer/adding_pkgs.html#source>`_ (where you specify where the package's source code is coming from) can be pulled from GitHub, PyPI, or other sources and sha256 hashes are always used, so moving of tags or uploading of new sdists can not cause automatic package rebuilds.
   Also, once packages are accepted and made into feedstocks, only the maintainers of that feedstock have the right to merge PRs made to that feedstock.
2. Each feedstock can only upload packages for that feedstock. This is enforced by using a cf-staging channel where builds are first sent.
   A bot then assesses that the submitting feedstock has permission to build the package it has submitted, and only then will it relay the build to the conda-forge channel.
   This helps mitigate against a bad actor gaining access to an inconspicuous feedstock and then trying to push a build with malicious code into essential infrastructure packages (e.g., OpenSSL or Python).
3. We have `artifact-validation <https://github.com/conda-forge/artifact-validation>`__ for validating all the ``conda-forge`` artifacts uploaded to ``anaconda.org``. This validation scans for various security-related items, such as artifacts that overwrite key pieces of certain packages.
4. We have a dedicated `Security and Systems Sub-Team <https://conda-forge.org/docs/orga/subteams.html?highlight=security+team#security-and-systems-sub-team>`__ who works hard towards making sure to secure and maintain appropriate access to the credentials and services/systems used by ``conda-forge``.

Significant Changes To Upstream Projects
========================================

From time to time, we make changes in upstream projects so that they better integrate into the ``conda-forge`` ecosystem. We
have listed some, but not all, of those changes here for specific projects along with any associated documentation.

Python
------

We carry an extensive set of python patches that change some core behaviors around search paths, environment isolation
in conda environments, and some operating system limits. See the `python feedstock <https://github.com/conda-forge/python-feedstock>`_ for more details.

Knowledge base
**************

Particularities on Windows
==========================

This document presents conda-forge and conda-build information and examples
when building on Windows.


Local testing
-------------

The first thing that you should know is that you can locally test Windows
builds of your packages even if you don’t own a Windows machine. Microsoft
makes available free, official Windows virtual machines (VMs) `at this website
<https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/>`_. If you
are unfamiliar with VM systems or have trouble installing Microsoft’s, please
use a general web search to investigate — while these topics are beyond the
scope of this documentation, there is ample discussion of them on the broader
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
“build tools” packages. The links are:

* For Python 2.7: `Microsoft Visual C++ Compiler for Python 2.7
  <https://www.microsoft.com/download/details.aspx?id=44266>`_.
* For Python 3.5–3.7: `Microsoft Build Tools for Visual Studio 2017
  <https://www.visualstudio.com/downloads/#build-tools-for-visual-studio-2017>`_.

Please see `the Python wiki page on Windows compilers
<https://wiki.python.org/moin/WindowsCompilers>`_ if you need more
information.


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
* `pugixml <https://github.com/conda-forge/pugixml-feedstock/blob/master/recipe/bld.bat>`_


Building for different VC versions
----------------------------------

On Windows, different Visual C versions have different ABI and therefore a package needs to be built for different Visual C versions. Packages are tied to the VC version that they were built with and some packages have specific requirements of the VC version. For example, python 2.7 requires ``vc 9`` and python 3.5 requires ``vc 14``.

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



Special dependencies
====================

Compilers
---------

Compilers are dependencies with a special syntax and are always added to ``requirements/build``.

There are currently three supported compilers:

 - c
 - cxx
 - fortran

A package that needs all three compilers would define

.. code-block:: yaml

    requirements:
      build:
        - {{ compiler('c') }}
        - {{ compiler('cxx') }}
        - {{ compiler('fortran') }}

.. note::

  Appropriate compiler runtime packages will be automatically added to the package's runtime requirements and therefore there's no need to specify ``libgcc`` or ``libgfortran``.
  There is additional information about how conda-build 3 treats compilers in the `conda docs <https://docs.conda.io/projects/conda-build/en/latest/source/compiler-tools.html>`_.

.. _cdt_packages:

Core dependency tree packages (CDT)
-----------------------------------



libGL
.....

.. _linking_numpy:

Building Against NumPy
----------------------

Packages that link against NumPy need a special treatment in the dependency section.
Finding ``numpy.get_include()`` in ``setup.py`` or ``cimport`` statements in ``.pyx`` or ``.pyd`` fil
es are a telltale sign that the package links against NumPy.

In the case of linking, you need to use the ``pin_compatible`` function to ensure having a compatible
 numpy version at run time:

.. code-block:: yaml

    host:
      - numpy
    run:
      - {{ pin_compatible('numpy') }}


At the time of writing, above is equivalent to the following,

.. code-block:: yaml

    host:
      - numpy 1.9.3              # [unix]
      - numpy 1.11.3             # [win]
    run:
      - numpy >=1.9.3,<2.0.a0    # [unix]
      - numpy >=1.11.3,<2.0.a0   # [win]


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


Message passing interface (MPI)
-------------------------------

.. todo::
  
  Add Min's notes: https://hackmd.io/ry4uI0thTs2q_b4mAQd_qg

OpenMP on macOS
---------------

.. todo::

  Get help from @beckermr

yum_requirements.txt
--------------------

Dependencies can be installed into the build container with ``yum``, by listing package names line by line in a file named ``yum_requirements.txt`` in the ``recipe`` directory of a feedstock.

There are only very few situations where dependencies installed by yum are acceptable. These cases include

  - satisfying the requirements of :term:`CDT` packages
  - installing packages that are only required for testing

Noarch builds
=============

Noarch packages are packages that are not architecture specific and therefore only have to be built once.

Declaring these packages as ``noarch`` in the ``build`` section of the meta.yaml, reduces shared CI resources. Therefore all packages that qualify to be noarch packages, should be declared as such.


.. _noarch:

Noarch python
-------------
The ``noarch: python`` directive, in the ``build`` section, makes pure-Python
packages that only need to be built once.

In order to qualify as a noarch python package, all of the following criteria must be fulfilled:

  - No compiled extensions
  - No post-link or pre-link or pre-unlink scripts
  - No OS specific build scripts
  - No python version specific requirements
  - No skips except for python version. (If the recipe is py3 only, remove skip statement and add version constraint on python)
  - 2to3 is not used
  - Scripts argument in setup.py is not used
  - If entrypoints are in setup.py, they are listed in meta.yaml
  - No activate scripts
  - Not a dependency of `conda`

.. note::
  While ``noarch: python`` does not work with selectors, it does work with version constraints.
  ``skip: True  # [py2k]`` can sometimes be replaced with a constrained python version in the build/run subsections: say ``python >=3`` instead of just ``python``.

If an existing python package qualifies to be converted to a noarch package, you can request the required changes by opening a new issue and including ``@conda-forge-admin, please add noarch: python``.


Noarch generic
--------------

Build matrices
==============

Currently, ``python, vc, r-base`` will create a matrix of jobs for each supported version. If ``python`` is only a build dependency and not a runtime dependency (eg: build script of the package is written in Python, but the package is not dependent on python), use ``build`` section

Following implies that ``python`` is only a build dependency and no Python matrix will be created.

.. code-block:: yaml

    build:
      - python
    host:
      - some_other_package


Note that ``host`` should be non-empty or ``compiler`` jinja syntax used or ``build/merge_build_host`` set to True for the ``build`` section to be treated as different from ``host``.

Following implies that ``python`` is a runtime dependency and a Python matrix for each supported python version will be created.

.. code-block:: yaml

    host:
      - python

``conda-forge.yml``'s build matrices is removed in conda-smithy=3. To get a build matrix, create a ``conda_build_config.yaml`` file inside recipe folder. For example following will give you 2 builds and you can use the selector ``vtk_with_osmesa`` in the ``meta.yaml``

.. code-block:: yaml

    vtk_with_osmesa:
      - False
      - True

You need to rerender the feedstock after this change.


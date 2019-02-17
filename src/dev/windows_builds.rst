Particularities when building for Windows
*****************************************

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
        skip: true  # [vc<14]

    requirements:
      build:
        - {{ compiler('cxx') }}


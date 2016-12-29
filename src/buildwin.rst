Building on Windows
==========================
This document presents conda-forge and conda-build information and examples
when building on Windows.

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
    %LIBRARY_BIN%\cmake -G "NMake Makefiles" -DCMAKE_INSTALL_PREFIX:PATH="%LIBRARY_PREFIX%" -DCMAKE_BUILD_TYPE:STRING=Release ..
    if errorlevel 1 exit 1

    :: Build!
    nmake
    if errorlevel 1 exit 1

    :: Install!
    nmake install
    if errorlevel 1 exit 1

The following feedstocks are examples of this build structure deployed:

* `libping <https://github.com/conda-forge/libpng-feedstock/blob/master/recipe/bld.bat>`_
* `pugixml <https://github.com/conda-forge/pugixml-feedstock/blob/master/recipe/bld.bat>`_

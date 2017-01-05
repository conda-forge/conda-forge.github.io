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

VC features
-----------
Conda builds Windows packages with features as a means of keeping the Visual Studio version (``vc``) used to build packages uniform across a given Python version.

Rule of thumb:

* if it's a shared library that something other than Python will use, you only need python in build to activate features. You need the features block;
* if it is a shared library that is tied to a Python API (e.g. Boost Python), you need BOTH, and the features block;
* if it is a library that has compiled content, but is used only from Python, you need Python in both build and runtime requirements, but you do NOT need the features block.

\* Note that, because PY35 and PY36 use the same `vc` the user can skip py36 (or py35) in the first case above because the `vc14` package created will work on both versions.

To provide features add the following lines to the build section:

.. code-block:: yaml

    build:
      features:
        - vc9   # [win and py27]
        - vc10  # [win and py34]
        - vc14  # [win and py>=35]

Also, add a ``python`` dependency to the build requirements (unless it is already a requirement like NumPy for instance). And the ``vc`` packages for each Python at build and run.

.. code-block:: yaml

    requirements:
      build:
        - python  # [win]
        - vc 9  # [win and py27]
        - vc 10  # [win and py34]
        - vc 14  # [win and py>=35]
      run:
        - vc 9  # [win and py27]
        - vc 10  # [win and py34]
        - vc 14  # [win and py>=35]

For more info see https://github.com/conda/conda/wiki/VC-features

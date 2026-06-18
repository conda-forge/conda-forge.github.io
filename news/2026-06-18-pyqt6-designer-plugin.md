# Qt Designer Python plugin now available in conda-forge PyQt6

After years of being silently missing from conda-forge builds, libpyqt6.so has been added to the conda-forge pyqt6 package.

To install, run:

mamba install -c conda-forge "pyqt6=_=_\_1"

On Linux the plugin is at $CONDA_PREFIX/lib/qt6/plugins/designer/libpyqt6.so.
On macOS it is at $CONDA_PREFIX/lib/qt6/plugins/designer/libpyqt6.dylib.
On Windows it is at %PREFIX%\Library\plugins\designer\libpyqt6.dll.

Platforms: linux-64, linux-aarch64, osx-64, osx-arm64, win-64
Python: 3.10, 3.11, 3.12, 3.13, 3.14

See PR #184 (https://github.com/conda-forge/pyqt-feedstock/pull/184) for details.

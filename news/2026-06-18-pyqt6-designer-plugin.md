# Qt Designer Python plugin now available in conda-forge PyQt6

After years of being silently missing from conda-forge builds, `libpyqt6.so` — the
C++ bridge that lets Qt Designer load custom Python widgets — is now shipped as part
of the official `pyqt6` package.

To install:

```bash
mamba install -c conda-forge "pyqt6=*=*_1"
```

The plugin is automatically installed to
$CONDA_PREFIX/lib/qt6/plugins/designer/ (Linux/macOS) or
%PREFIX%\Library\plugins\designer\ (Windows).

Available platforms: linux-64, linux-aarch64, osx-64, osx-arm64, win-64

Python versions: 3.10, 3.11, 3.12, 3.13, 3.14

This fixes a long-standing issue reported upstream
(#44 (https://github.com/conda-forge/pyqt-feedstock/issues/44)) and enables
projects like Taurus (https://taurus-scada.org) to use Qt Designer with
custom Python widgets in conda environments.

See PR #184 (https://github.com/conda-forge/pyqt-feedstock/pull/184) for
implementation details.

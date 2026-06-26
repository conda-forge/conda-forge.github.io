# Qt6 status in conda-forge

The Qt Designer Python plugin (`libpyqt6.so`) is now shipped with the conda-forge `pyqt6` package, completing the core PyQt6 packaging story. This has been a multi-year community effort; here is where things stand.

The Qt6 migration in conda-forge spans over three years, starting with [qt-main-feedstock#44](https://github.com/conda-forge/qt-main-feedstock/pull/44). Qt 5.15 reached EOL in May 2025, accelerating the push to finalise the transition. The qt6 branch was merged into `main` in August 2025 ([qt-main-feedstock#350](https://github.com/conda-forge/qt-main-feedstock/pull/350)), followed by PyQt6 in February 2026 ([pyqt-feedstock#162](https://github.com/conda-forge/pyqt-feedstock/pull/162)). The Designer plugin was the last piece missing from the PyQt6 packaging.

<!-- truncate -->

## What is available

| Package | Status |
|---------|--------|
| **qt6-main** (Qt 6.11.1) | Default on `main` branch since August 2025 ([qt-main-feedstock#350](https://github.com/conda-forge/qt-main-feedstock/pull/350)) |
| **pyqt6** (PyQt 6.11.0) | Available for Python 3.10–3.14 on linux-64, linux-aarch64, osx-64, osx-arm64, win-64 |
| **pyqt6 Designer plugin** | ✅ Now included ([pyqt-feedstock#184](https://github.com/conda-forge/pyqt-feedstock/pull/184)) |

To install the updated package:

```
mamba install -c conda-forge "pyqt6==6.*=*_1"
```

The plugin can be found at:
- Linux: `$CONDA_PREFIX/lib/qt6/plugins/designer/libpyqt6.so`
- macOS: `$CONDA_PREFIX/lib/qt6/plugins/designer/libpyqt6.dylib`
- Windows: `%PREFIX%\Library\plugins\designer\libpyqt6.dll`

## What remains

- **Qt WebEngine v6** — still missing, which blocks Qt6 adoption for packages that depend on web content (e.g. Spyder).
- **PyQt6 WebEngine** — depends on the above.

## Thanks

Thanks to everyone who has worked on the Qt6 transition over the years: [@hmaarrfk](https://github.com/hmaarrfk), [@jschueller](https://github.com/jschueller), [@h-vetinari](https://github.com/h-vetinari), [@JarrettSJohnson](https://github.com/JarrettSJohnson), [@ccordoba12](https://github.com/ccordoba12), [@ludmilaklenova](https://github.com/ludmilaklenova), and many others.

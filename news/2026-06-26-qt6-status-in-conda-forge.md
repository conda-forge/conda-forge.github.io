# Qt6 status in conda-forge

Qt6 has quietly become a first-class citizen in conda-forge. The recent addition of the Qt Designer Python plugin (`libpyqt6.so`) to the `pyqt6` package closed one of the last gaps in the PyQt6 story, but it is a small piece of a much larger, multi-year community effort. This post takes the opportunity to lay out what the whole Qt6 ecosystem now looks like on conda-forge.

The migration spans more than three years. It started with the first attempts at a 6.x build in [qt-main-feedstock#44](https://github.com/conda-forge/qt-main-feedstock/pull/44) (2022), gathered urgency once Qt 5.15 reached end-of-life in May 2025, and culminated in the "flip" that made Qt6 the default — the `qt6` branch was merged into `main` in August 2025 ([qt-main-feedstock#350](https://github.com/conda-forge/qt-main-feedstock/pull/350)). PyQt6 followed in February 2026 ([pyqt-feedstock#162](https://github.com/conda-forge/pyqt-feedstock/pull/162)), and `qt6-webengine` landed in May 2026 ([qt-webengine-feedstock#90](https://github.com/conda-forge/qt-webengine-feedstock/pull/90)), removing the last major blocker tracked in [qt-main-feedstock#349](https://github.com/conda-forge/qt-main-feedstock/issues/349).

<!-- truncate -->

## A slimmer `qt6-main`

The most important design decision behind this work is invisible to most users: **`qt6-main` was deliberately slimmed down**. Upstream's `qt-everywhere` source bundles dozens of submodules, and the old approach of shipping them all in one package made the base download enormous and pulled heavy, rarely-needed components (a whole Chromium, GPU/3D stacks, multimedia codecs) into _every_ Qt install.

Instead, the modules were **broken out into separate feedstocks**, each producing its own `qt6-*` package version-locked to `qt6-main`. The split was driven as much by **license hygiene** as by size: most of Qt is LGPL, but a few modules (notably Qt Charts, which is GPLv3) would otherwise taint the base package. Keeping `qt6-main` cleanly LGPL is a recurring constraint — even GPL-encumbered optional dependencies like MySQL were pushed out of the base build ([qt-main-feedstock#335](https://github.com/conda-forge/qt-main-feedstock/issues/335), [qt-main-feedstock#78](https://github.com/conda-forge/qt-main-feedstock/issues/78)).

`qt6-main` still bundles the Qt **Essentials** — Core, GUI, Widgets, Network, Qml/Quick, Test, D-Bus, SQL, OpenGL, PrintSupport — plus a handful of small, universally-useful modules (SVG, image formats, shader tools, the developer tools like Designer/Linguist/Assistant, translations, Qt5Compat, WebChannel, and WebSockets). Everything heavier is opt-in.

Because Qt6 promises ABI compatibility across the whole 6.x series, packages only pin `qt6-main` to the major version, which keeps the dependency graph stable across minor releases.

## Qt features (official Qt modules)

These are modules from The Qt Company / the Qt Project, all released in lockstep (currently 6.11.1). Install only the ones you need:

| Package                   | What it provides                                                                                                                                                                 |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **qt6-3d**                | Qt 3D — near-realtime simulation and 3D rendering framework                                                                                                                      |
| **qt6-charts**            | 2D charts (line, bar, pie, scatter, …) — shipped separately partly because it is GPLv3                                                                                           |
| **qt6-datavis3d**         | 3D data visualization (bar, scatter, surface graphs)                                                                                                                             |
| **qt6-graphs**            | Newer unified 2D/3D graphing module                                                                                                                                              |
| **qt6-gtk-platformtheme** | GTK3 platform theme plugin for a native GTK look on Linux                                                                                                                        |
| **qt6-main**              | The Qt Essentials base bundle (Core, GUI, Widgets, Network, Qml/Quick, Test, SQL, OpenGL, …) plus SVG, image formats, dev tools, translations, Qt5Compat, WebChannel, WebSockets |
| **qt6-multimedia**        | Audio/video playback, recording, and camera access                                                                                                                               |
| **qt6-networkauth**       | OAuth-based authorization to online services                                                                                                                                     |
| **qt6-positioning**       | Positioning, satellite info, and area monitoring                                                                                                                                 |
| **qt6-quick3d**           | High-level API for 3D content/UIs on top of Qt Quick                                                                                                                             |
| **qt6-scxml**             | State machines from SCXML files                                                                                                                                                  |
| **qt6-sensors**           | Access to device sensor hardware                                                                                                                                                 |
| **qt6-serialport**        | Hardware and virtual serial port access                                                                                                                                          |
| **qt6-wayland**           | Wayland compositor framework and platform integration (Linux)                                                                                                                    |
| **qt6-webengine**         | Chromium-based web content rendering/embedding (the long-awaited piece, added May 2026)                                                                                          |

## Community features (third-party Qt6 libraries)

These packages also start with `qt6` but are independent open-source projects built _for_ Qt6, not part of an official Qt release:

| Package                         | What it is                                                                                                           |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **qt6-keychain**                | Platform-independent API for securely storing passwords ([QtKeychain](https://github.com/frankosterfeld/qtkeychain)) |
| **qt6-advanced-docking-system** | [Advanced Docking System](https://github.com/githubuser0xFFFF/Qt-Advanced-Docking-System) for dockable UI panels     |
| **qt6molecularnetwork**         | Graph-visualization widgets used by MetGem                                                                           |

## Python bindings

conda-forge ships **three** complementary ways to use Qt6 from Python:

| Package     | What it is                                                                                   |
| ----------- | -------------------------------------------------------------------------------------------- |
| **pyside6** | The Qt Company's _official_ "Qt for Python" bindings                                         |
| **pyqt6**   | Riverbank Computing's PyQt6 bindings (with `pyqt6-sip`, and add-ons such as `pyqt6-charts`)  |
| **qtpy**    | A compatibility shim that lets a single codebase target PyQt5, PySide2, PyQt6, _and_ PySide6 |

Shipping both PySide6 and PyQt6, plus `qtpy` to abstract over them (and their Qt5 predecessors), means downstream projects can pick the binding that fits their licensing and feature needs without rewriting their code. For source-editor components, `qscintilla2` is also available.

The Qt Designer Python plugin that prompted this post is now included in `pyqt6` ([pyqt-feedstock#184](https://github.com/conda-forge/pyqt-feedstock/pull/184)), so PyQt6 widgets show up in Designer's widget box.

## A note on naming

The package names carry history. The original `qt` feedstock now ships a Qt5 metapackage (`qt` → `qt-main` 5.15); `qt-main-feedstock` builds `qt-main` (Qt5) on its `qt5` branch and `qt6-main` (Qt6) on `main`. Encoding the major version into the package name (`qt6-main`) is what lets Qt5 and Qt6 coexist across the ecosystem during the long transition. See [qt-main-feedstock#349](https://github.com/conda-forge/qt-main-feedstock/issues/349) for the wrap-up plan.

## What remains

- **PyQt6 WebEngine** — `qt6-webengine` now exists, but the PyQt6 WebEngine _bindings_ are not yet packaged. PySide6 includes WebEngine support today, so projects needing web content from Python can use PySide6 (or `qt6-webengine` directly).

## Thanks

Thanks to everyone who has worked on the Qt6 transition over the years: [@hmaarrfk](https://github.com/hmaarrfk), [@jschueller](https://github.com/jschueller), [@h-vetinari](https://github.com/h-vetinari), [@traversaro](https://github.com/traversaro), [@andfoy](https://github.com/andfoy), [@Tobias-Fischer](https://github.com/Tobias-Fischer), [@JarrettSJohnson](https://github.com/JarrettSJohnson), [@ccordoba12](https://github.com/ccordoba12), [@ludmilaklenova](https://github.com/ludmilaklenova), and many others.

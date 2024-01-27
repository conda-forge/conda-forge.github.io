# Packages for Qt/PyQt 5.15.2 are now available

After more than six months, the conda-forge team and contributors have
managed to update the Qt5 packages to the latest LTS version, 5.15.2.
Major changes include separating the package for QtWebEngine
(`qt-webengine`) from the rest of Qt (now in a new package called
`qt-main`). This allows recipes that do not use any of the WebEngine
components to depend only on `qt-main`, reducing the total size of the
downloaded binaries. As a result of this, `qt` will be a metapackage
that installs both `qt-main` and `qt-webengine` as dependencies.
With respect to PyQt, the new packages now are in sync with respect to
their corresponding PyPI releases, which means that the `pyqt` package
will only provide the core components of Qt, leaving `pyqtwebengine` and
`pyqtcharts` as optional packages that extend PyQt by providing the
QtWebEngine and QtCharts components, respectively. A migrator will be
put in place to help with the transition.

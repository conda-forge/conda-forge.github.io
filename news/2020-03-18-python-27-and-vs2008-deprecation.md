# Python 2.7 and `vs2008` Deprecation

- Python 2.7 is no longer supported by the upstream developers as of
  2020-01-01. Conda-forge is thus deprecating its Python 2.7 support.
  Conda-forge will provide no ongoing support for Python 2.7 builds and
  any existing builds are provided on an "as-is" basis.
- A `cf202003` label has been applied to the `conda-forge` channel for those who need a
  reference to the package index with Python 2.7.
- We are removing support for `vs2008` on Windows in conjunction with the deprecation of Python 2.7, as it was only supported to build this version of Python.
- We will provide an admin command that will add back Python 2.7 to any
  feedstock. Note that as stated above, we cannot provide support for any
  Python 2.7 builds generated with this admin command. Further, this admin
  command will only work on `osx-64` and `linux-64` platforms.

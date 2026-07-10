---
title: 'The directory structure'
---

Conda packages are installed into environments, whose internal directory structure is something of a
hybrid of Python virtual environment with the equivalent structures used by other packaging systems.
These do not necessarily follow the same conventions as the underlying operating system, and they
differ significantly between Unix and Windows installations.

The directory structure is currently governed by
[CEP 34](https://github.com/conda/ceps/blob/main/cep-0034.md).

:::note
This document describes the directories currently in use by a variety of conda-forge packages. It
is not prescriptive. The use of some of the directories listed here is seen as controversial, and
they may be explicitly discouraged in a future CFEP.
:::

## Unix directory structure

On Unix systems (Linux and macOS), conda-forge packages aim to follow a subset of the [Filesystem
Hierarchy Standard (FHS)](https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard):

- `bin/`: programs and scripts.
  - some packages also use `sbin/` directory, though the distinction between `bin/` and `sbin/`
    is not meaningful for conda-forge.
- `etc/`: configuration files.
- `include/`: header files.
- `lib/`: dynamic and static libraries.
  - subdirectories of `lib/` may also be used to host internal programs of packages, modules for
    Python and other programming languages, and general package-specific data.
  - `lib/cmake` and `lib/pkgconfig` are used to host respectively modules for software that is
    architecture-dependent.
  - conda-forge packages do not use multilib or multiarch suffixes (such as `lib64/`).
- `share/`: other data files.
  - `share/cmake` and `share/pkgconfig` are used to host respectively modules for software that is
    architecture-independent.

Additionally, there may be directories named as [target
triplets](https://www.gnu.org/software/autoconf/manual/autoconf-2.65/html_node/Specifying-Target-Triplets.html)
that contain the relevant compiler executables and sysroots.

Package build systems largely follow these conventions upon detecting a Unix system. However, there
are many discrepancies, often resulting precisely from build system defaults. Some packages split
their executables over `bin/` and `sbin/`, following the traditional Unix distinction. Others
install manpages or documentation into top-level `man/` and `doc/` directories rather than the
subdirectories of `share/`.

The same structure is also used by various scripting languages such as Python, permitting conda
environments to act akin to Python virtual environments.

## Windows directory structure

On Windows, the environment uses a hybrid layout that combines multiple layouts, namely:

- `Library/` top-level directory is used by regular conda-forge packages. Its contents follow the
  Unix layout, with two differences:
  - `Library/bin/` is used for programs (`.exe` files) and dynamically-linked libraries (`.dll`
    files).
  - `Library/lib/` is used for import libraries and static libraries (`.lib` files).
- `Library/usr/` tree is used by MSYS2 packages.
- Python packages use layout similar to virtual environments:
  - `DLLs/`: core Python extensions (`.pyd` files).
  - `include/`: Python development headers.
  - `Lib/`: core Python modules (`.py` files).
    - `Lib/site-packages/`: equivalent to `lib/pythonX.Y/site-packages/` on Unix, contains `.py`
      modules and `.pyd` extensions.
  - `libs/`: Python import libraries (`.lib` files).
  - `Scripts/`: Python entry points (`.exe` trampolines and the corresponding `-script.py` files).
  - `Tools/`: Miscellaneous Python tools.
  - The Python interpeter itself and its DLLs are installed in the top-level directory.
- Other programming languages also interpose their layouts:
  - Node.js places its executables in the root level, and leaves everything else under
    `node_modules/`.
  - R installs to `lib/R/` using a Unix-style directory structure, but also places some executables
    in `Scripts/`.
  - Ruby installs directly to the root level, using a Unix-style directory structure.

## Special conda files

In addition to the files normally installed by software, conda-forge packages install some files for
the internal use of conda clients, namely:

- `conda-meta/`: the metadata for installed packages, including the recipe used to build the
  package, and anything needed to run the test section for the package as defined in the recipe
  (which may include test-specific files that have been requested in the test section).
- `etc/conda/`: conda activation scripts and other files used by conda clients. The same path is
  also used on Windows (not `Library/etc/`).
- `Menu/`: `*.json` files (as defined by [CEP
  11](https://github.com/conda/ceps/blob/main/cep-0011.md)), used to install menu items.

Additionally, packages may install pre/post-link/unlink scripts:

- `bin/.{package_name}-{action}.sh` on Unix.
- `Scripts/.{package_name}-{action}.bat` on Windows.

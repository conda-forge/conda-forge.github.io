---
tags: [how-to, basic]
---

# How to populate package dependencies

Perhaps one of the hardest tasks of package maintenance is ensuring that the recipe specifies
correct dependencies. Missing or incorrect dependencies can have various consequences, such as build
failures, runtime errors, missing features or loss of performance. On the other hand, extraneous
dependencies can unnecessarily increase build time, disk space and bandwidth usage, and in extreme
cases cause dependency conflicts. This guide aims to provide both generic hints, and specific
instructions on how to determine the correct dependencies to list in your recipe.

## Generic instructions

### Where to find dependencies?

Unfortunately, there is no single standard for declaring package dependencies. A few ideas on where
to start:

- Look through upstream documentation. Many projects include sections on building, with detailed
  explanations where to find dependencies.
- Look through build system files. Some of these are covered in other sections of this how-to.
- Inspect the build logs. Build system often output informative messages when they detect missing
  dependencies.
- Look at the recipes used by other distributions. [Repology](https://repology.org/) can be helpful
  in locating these. However, note that they may not be up-to-date.
- If the package is installing binaries, look at the libraries they link to. This is described in
  detail in [checking binary linkage](#checking-binary-linkage) section.
- As a last resort, in some cases you can resort to checking the source code. There are tools that
  can help with this, e.g. [findimports](https://pypi.org/project/findimports/) for Python.

Once you determine the dependency list, you need to map the dependencies into conda-forge packages.
[Conda metadata browser](https://conda-metadata-app.streamlit.app/?q=conda-forge) can be quite
helpful in that. Note that some upstream packages may be split into multiple packages in
conda-forge, and others may be merged into a single package. Search for specific files, and consult
feedstock documentation when in doubt.

### Final dependency lists

The dependency lists specified in recipe files provide only the initial lists of `host` and `run`
dependencies. When packages are built, the builders include additional dependencies from run exports
of `build` and `host` dependencies. To verify the final dependency list, either open the built
package or consult the build logs.

For example, to inspect the `run` dependencies of a `libgit2` package:

```shell
unzip libgit2-1.9.2-hc20babb_0.conda
tar -xf info-libgit2-1.9.2-hc20babb_0.tar.zst
# "depends" in index.json are run dependencies
${EDITOR} info/index.json
```

When building v1 recipes, `rattler-build` outputs finalized run dependencies, along with their
sources, e.g.:

```
 │ │ Finalized run dependencies (libgit2-1.9.2-hc20babb_0):
 │ │ ╭────────────────────┬──────────────────────────────────────────────────╮
 │ │ │ Name               ┆ Spec                                             │
 │ │ ╞════════════════════╪══════════════════════════════════════════════════╡
 │ │ │ Run dependencies   ┆                                                  │
 │ │ │ __glibc            ┆ >=2.17,<3.0.a0 (RE of [build: sysroot_linux-64]) │
 │ │ │ libgcc             ┆ >=14 (RE of [build: gxx_linux-64])               │
 │ │ │                    ┆ >=14 (RE of [build: gcc_linux-64])               │
 │ │ │ libssh2            ┆ >=1.11.1,<2.0a0 (RE of [host: libssh2])          │
 │ │ │ libstdcxx          ┆ >=14 (RE of [build: gxx_linux-64])               │
 │ │ │ libzlib            ┆ >=1.3.1,<2.0a0 (RE of [host: zlib])              │
 │ │ │ openssl            ┆ >=3.5.4,<4.0a0 (RE of [host: openssl])           │
 │ │ │ pcre2              ┆ >=10.47,<10.48.0a0 (RE of [host: pcre2])         │
 │ │ │                    ┆                                                  │
 │ │ │ Run exports (Weak) ┆                                                  │
 │ │ │ libgit2            ┆ >=1.9.2,<1.10.0a0                                │
 │ │ ╰────────────────────┴──────────────────────────────────────────────────╯
```

### Checking binary linkage

When compiled binaries link against shared libraries, the list of these dependencies can be read
from these binaries themselves. Conda-build and rattler-build do this automatically, and map the
dependent libraries into packages. For example, for `libgit2` on Linux:

```
 │ │ [lib/libgit2.so.1.9.2] links against:
 │ │  ├─ lib/libpcre2-8.so.0.15.0 (pcre2)
 │ │  ├─ libc.so.6 (system)
 │ │  ├─ lib/libssl.so.3 (openssl)
 │ │  ├─ lib/libssh2.so.1.0.1 (libssh2)
 │ │  ├─ lib/libz.so.1.3.1 (libzlib)
 │ │  ├─ librt.so.1 (system)
 │ │  ├─ lib/libcrypto.so.3 (openssl)
 │ │  └─ libpthread.so.0 (system)
 │ │
 │ │ [bin/git2] links against:
 │ │  ├─ libpthread.so.0 (system)
 │ │  ├─ lib/libssh2.so.1.0.1 (libssh2)
 │ │  ├─ lib/libpcre2-8.so.0.15.0 (pcre2)
 │ │  ├─ lib/libssl.so.3 (openssl)
 │ │  ├─ lib/libz.so.1.3.1 (libzlib)
 │ │  ├─ librt.so.1 (system)
 │ │  ├─ lib/libcrypto.so.3 (openssl)
 │ │  └─ libc.so.6 (system)
```

These results can be used to verify the final `run` dependency lists. In particular, they may be
helpful in noticing unnecessary dependencies or missing run exports. However, note that they will
not be able to detect dependencies that were missing at build time.

## General-purpose build systems

This section is focused on build systems that are not limited to a specific ecosystem, but include
support for multiple programming languages.

### GNU autoconf

[Autoconf](https://www.gnu.org/software/autoconf/) is a macro-based generator for `configure`
scripts. As these scripts are often used to find package's dependencies, they often serve as a good
starting point for checking dependencies. The input file is called `configure.ac` (or `configure.in`
in very old scripts).

Unfortunately, the methods used to check for dependencies can vary a lot, and in some cases the
checks could be deferred to separate `.m4` files. However, common macros to look for are:

- `PKG_CHECK_MODULES` to search for pkg-config packages
- `AC_CHECK_HEADER` and `AC_CHECK_HEADERS` to search for include files
- `AC_CHECK_LIB` and `AC_SEARCH_LIBS` to search for libraries
- `AC_CHECK_PROG`, `AC_PATH_PROG` and similar, to search for programs (usually indicating `build`
  dependency)

For example:

```
PKG_CHECK_MODULES(LIBXML2_PC, [libxml-2.0])
```

indicates a dependency on `libxml-2.0.pc` file, provided by `libxml2`, whereas:

```
AC_CHECK_LIB(bz2, BZ2_bzDecompressInit)
```

check for `bz2` library (e.g. `libbz2.so`), provided by `bzip2`.

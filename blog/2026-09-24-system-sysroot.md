---
authors:
  - isuruf
tags: [infrastructure]
---

# Using conda-forge compilers with your system's sysroot

conda-forge's Linux compilers have always shipped with their own copy of
glibc and the Linux kernel headers, known as the sysroot. With
[conda-forge/linux-sysroot-feedstock#101](https://github.com/conda-forge/linux-sysroot-feedstock/pull/101)
you can now tell the conda-forge `gcc`, `g++` and `gfortran` compilers (and
`clang`) to use the glibc and kernel headers already installed on your Linux
distribution:

```bash
conda create -n sys-cc \
    -c conda-forge/label/sysroot_dev -c conda-forge \
    gcc gxx gfortran system-linux-sysroot
```

This post covers why the conda-forge compilers carry a sysroot in the
first place, why using the system one makes sense now, and the multi-year
work that was needed before this was possible.

<!-- truncate -->

## Why the conda-forge compilers come with a sysroot

A sysroot is a directory that the compiler and linker treat as the root
filesystem when they look for the C library headers (`stdio.h`,
`pthread.h`, ...), the kernel headers (`linux/*.h`), and the C runtime
objects and libraries (`crt1.o`, `libc.so`, `libm.so`, `libpthread.so`,
...). For conda-forge's Linux compilers it is located at
`$CONDA_PREFIX/<triplet>/sysroot`, for example
`$CONDA_PREFIX/x86_64-conda-linux-gnu/sysroot`, and is provided by the
`sysroot_linux-64` package (and its `aarch64`, `ppc64le`, `riscv64`
and `s390x` equivalents).

The sysroot is only used when compiling and linking. It is never used
when running the executables and libraries created by the compiler. At
run time, the dynamic loader loads the system's `libc.so.6`,
`libm.so.6`, etc., just as it does for any other program on the system.
The sysroot only decides which glibc headers and symbols the compiled
code can use.

conda-forge has always used a vendored sysroot because glibc is
backwards compatible but not forwards compatible. A binary linked against
glibc 2.28 may use symbols that don't exist in glibc 2.17, and would then
fail to load on an older system. Building every package against the same
old glibc, whatever the host OS of the CI machine or the maintainer's
laptop is, makes the resulting binaries run on every system with that glibc
or newer. The `{{ stdlib("c") }}` in a recipe picks the sysroot version,
and its `run_exports` adds the matching `__glibc` constraint to the
package. See
[Requiring newer `glibc` versions](/docs/maintainer/knowledge_base/#requiring-newer-glibc-versions)
for details.

The vendored sysroot also makes the compilers behave the same
way on every distribution, making builds reproducible since the headers
used during compilation do not depend on the host system.
It also makes cross-compiling between different Linux
architectures just a matter of installing another sysroot.

For building conda packages this is exactly what we want, and nothing is
changing there.


## Compilers outside of conda-build

More and more people use the conda-forge compilers outside of conda-build
and rattler-build: in pixi or conda development environments, in CI for
projects that are never packaged, or as a quick way to get a recent GCC on
an old distribution without root access. In these cases the vendored
sysroot is often not what people need:

- A developer building a project for their own machine gains nothing from
  targeting glibc 2.17 and has to make do with the old kernel headers and
  missing newer glibc APIs.
- Libraries from the system (for example a vendor-provided MPI, CUDA
  driver, or other hardware-specific libraries) were built against the
  system glibc and headers. Linking them against an older sysroot glibc
  can fail or give subtle problems.
- The sysroot adds a download of about 40 MB to every environment
  with a compiler.

We have made the vendored sysroot easier to use outside the build tools,
for example in
[linux-sysroot-feedstock#88](https://github.com/conda-forge/linux-sysroot-feedstock/pull/88),
which added builds of the newer sysroots without `track_features` so that
the solver doesn't force the oldest one on you. The next step is to not
use a vendored sysroot at all.

## Splitting the sysroot from the GCC support libraries

Replacing the sysroot with a symlink to `/usr` sounds easy, but for a long
time the sysroot contained more than just glibc and the kernel headers.
When the compilers were built with crosstool-ng, the GCC support libraries
(`libgcc_s`, `libstdc++`, `libgfortran`, `libgomp`, sanitizer libraries,
spec files, ...) were installed or symlinked into
`<triplet>/sysroot/lib`, because that's where crosstool-ng puts
everything. GCC found them there only because they were inside its
sysroot. A different sysroot meant a compiler that couldn't find its own
runtime libraries.

Untangling these took several years:

- In 2021, the compilers stopped using crosstool-ng and are now built
  directly from the GCC sources with `--with-sysroot`
  ([ctng-compilers-feedstock#53](https://github.com/conda-forge/ctng-compilers-feedstock/pull/53)).
  After that, the sysroot's contents came only from the
  `sysroot_linux-*` packages, and the GCC libraries were installed into
  `$PREFIX/lib` and `$PREFIX/<triplet>/lib`.
- In 2023, `libgcc_s.so` and `libstdc++.so`, which were still symlinked
  into the sysroot, moved to `$PREFIX/<triplet>/lib`
  ([ctng-compilers-feedstock#112](https://github.com/conda-forge/ctng-compilers-feedstock/pull/112),
  [#118](https://github.com/conda-forge/ctng-compilers-feedstock/pull/118)).
- In 2025, as part of the macOS support and Unix layout fixes, the GCC
  libraries, spec files and sanitizer objects that the compiler needs
  moved to GCC's own private directory, `$PREFIX/lib/gcc/<triplet>/<version>`
  ([ctng-compilers-feedstock#189](https://github.com/conda-forge/ctng-compilers-feedstock/pull/189)).
  GCC always searches this directory, whatever the sysroot is.
- Finally, the compilers are now configured with `--enable-multiarch`
  ([ctng-compilers-feedstock#233](https://github.com/conda-forge/ctng-compilers-feedstock/pull/233)).
  Debian, Ubuntu and their derivatives put the libraries and some headers
  in `/usr/lib/x86_64-linux-gnu` and `/usr/include/x86_64-linux-gnu`
  instead of `/usr/lib64` and `/usr/include` like RHEL-based
  distributions do, and a multiarch-enabled GCC knows how to look for
  them.

## Making binutils independent of the sysroot

The linker is the other half of the story. conda-forge's `ld` is built
with `--with-sysroot=$PREFIX/<triplet>/sysroot`, so by default it looks
for libraries inside the conda sysroot. A few changes made binutils work
no matter what is in that directory:

- `ld` falls back to `/` instead of failing when its configured sysroot
  directory doesn't exist
  ([binutils-feedstock#52](https://github.com/conda-forge/binutils-feedstock/pull/52)).
- The `binutils_<platform>` activation package used to live in
  ctng-compiler-activation-feedstock, where it depended on the sysroot
  version used by the compilers. It moved to binutils-feedstock
  ([binutils-feedstock#75](https://github.com/conda-forge/binutils-feedstock/pull/75),
  [ctng-compiler-activation-feedstock#133](https://github.com/conda-forge/ctng-compiler-activation-feedstock/pull/133)).
  Now binutils only needs some `sysroot_<platform>` package, with no
  version constraint, and nothing in binutils depends on what that package
  contains. The compilers find `ld`, `as` and the other tools in
  `$PREFIX/bin` and `$PREFIX/<triplet>/bin`, outside the sysroot.
- The sysroot packages write a `<triplet>.cfg` config file into
  `$PREFIX/bin` with the `--sysroot` flag
  ([linux-sysroot-feedstock#81](https://github.com/conda-forge/linux-sysroot-feedstock/pull/81)).
  `clang` reads this file, so the sysroot package, not the compiler, decides
  which sysroot `clang` uses.

## The system sysroot

With the compilers and binutils no longer relying on what's in the sysroot
directory, a system sysroot package is small. The new `sysroot_linux-*`
packages with version `9999` contain only:

- `$PREFIX/<triplet>/sysroot/usr`, a symlink to `/usr`, so that GCC, which
  always looks in its configured sysroot, finds the system headers and
  libraries.
- `$PREFIX/bin/<triplet>.cfg` with `--sysroot=/` for `clang`.

`system-linux-sysroot` is a metapackage that installs the right one for
your platform. Because version `9999` is higher than any real glibc
version, it satisfies the sysroot requirement of the compiler packages.

These packages are uploaded to the `conda-forge/label/sysroot_dev`
label, not the `main` label. They are also down-prioritized, but
down-prioritization alone was not enough to keep empty packages from
being chosen for the system MPI packages.

## How to use it

First, install the glibc development files and kernel headers from your
distribution, if they are not installed already:

```bash
# Debian, Ubuntu
sudo apt install libc6-dev linux-libc-dev
# Fedora, RHEL, AlmaLinux, Rocky Linux
sudo dnf install glibc-devel kernel-headers
```

Then install the compilers together with `system-linux-sysroot`. Put the
`sysroot_dev` label before `conda-forge`. With strict channel priority,
the label has to have a higher priority than `conda-forge` or the solver
will not look at its packages.

```bash
conda create -n sys-cc \
    -c conda-forge/label/sysroot_dev -c conda-forge \
    gcc gxx gfortran system-linux-sysroot
conda activate sys-cc
```

With pixi:

```toml
[workspace]
channels = ["conda-forge/label/sysroot_dev", "conda-forge"]
platforms = ["linux-64"]

[dependencies]
gcc = "*"
gxx = "*"
system-linux-sysroot = "*"
```

To check that the compiler is using the system glibc headers, compare the
`__GLIBC__` and `__GLIBC_MINOR__` macros the compiler sees with the
system's glibc version:

```bash
printf '#include <features.h>\nglibc used by gcc: __GLIBC__.__GLIBC_MINOR__\n' | gcc -E -P - | tail -1 | sed 's/ \. /./'
getconf GNU_LIBC_VERSION
```

The first command prints the glibc version that gcc sees when compiling,
for example `glibc used by gcc: 2.39`, and the second prints the system's
glibc version, for example `glibc 2.39`. With the regular sysroot, the
first command prints the sysroot's glibc version (for example 2.17)
instead of the system's.

A few things to keep in mind:

- Binaries built this way require the glibc version of the machine they
  were built on, or newer. **Don't use the system sysroot to build packages
  that you distribute.** Use the regular `{{ stdlib("c") }}` in your recipes
  instead.
- The system sysroot is meant for native compilation. For cross-compiling,
  keep using the vendored `sysroot_<target>` packages, unless you have a
  sysroot for the target architecture installed in your system.
- Using the system sysroot makes builds less reproducible.

## `conda-gcc-specs`

The `gcc`, `gxx` and `gfortran` packages now install `conda-gcc-specs` by
default ([ctng-compilers-feedstock#172](https://github.com/conda-forge/ctng-compilers-feedstock/pull/172)).
This package adds a `conda.specs` file to
`$CONDA_PREFIX/lib/gcc/<triplet>/<version>`. GCC reads it after its
built-in specs, and it changes the default compile and link commands:

- `-isystem $CONDA_PREFIX/include` is added to compile commands, so
  headers installed in the conda environment are found without any
  extra flags. This used to be `-idirafter`, which searched the
  environment's `include` directory after the system include directories
  ([ctng-compilers-feedstock#234](https://github.com/conda-forge/ctng-compilers-feedstock/pull/234)).
- `-L $CONDA_PREFIX/lib -rpath $CONDA_PREFIX/lib -rpath-link $CONDA_PREFIX/lib`
  (and `-L $CONDA_PREFIX/lib/stubs`) are added to link commands, so
  libraries in the conda environment can be linked with just `-lfoo` and
  the resulting executables find them at run time.
- `--disable-new-dtags` is added to link commands so that the rpath is
  written as `DT_RPATH` instead of `DT_RUNPATH` and has priority over
  `LD_LIBRARY_PATH`. Passing `-Wl,--enable-new-dtags` overrides it.

Together with the system sysroot, this makes the conda-forge `gcc` work
like a system compiler that also knows about the conda environment. You
can use headers and libraries from the system and from conda without
setting `CFLAGS` or `LDFLAGS`. When a header or a library is both in the
conda environment and in the system, the conda one is used, so a library's
headers and the library itself come from the same place. The header search order is:

1. directories passed with `-I`
2. directories passed with `-isystem`
3. `$CONDA_PREFIX/include`
4. `/usr/local/include`
5. `/usr/include/<target>` if it exists (like on Debian)
6. `/usr/include`
7. directories passed with `-idirafter`

`conda-gcc-specs` is meant as a convenience for local use. conda-forge
recipes shouldn't rely on it. Inside conda-build and rattler-build, the
activation scripts of `{{ compiler("c") }}` set the flags explicitly. If you
don't want these defaults, install `gcc-no-conda-specs` along with `gcc`
([ctng-compilers-feedstock#180](https://github.com/conda-forge/ctng-compilers-feedstock/pull/180)):

```bash
conda install gcc gcc-no-conda-specs
```

As always, if you run into problems or have ideas on how to improve this,
please open an issue on
[linux-sysroot-feedstock](https://github.com/conda-forge/linux-sysroot-feedstock/issues)
or reach out on [Zulip](https://conda-forge.zulipchat.com/).

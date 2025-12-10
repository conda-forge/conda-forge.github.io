---
title: 'Cross-compilation'
---

Cross-compilation refers to building binaries for a different platform than the one on which the
compiler is being run. In the most common case, a cross-compiler is used to build for a different
architecture, for example for AArch64 from an x86-64 system. However, cross-compilers can also be
used to target different operating systems, for example to build Windows executables on a Linux
system.

## Platform triplets

Individual platforms are usually identified using triplets. These are strings of the form:

```
{machine}-{vendor}-{operating system}
```

A few examples are:

```
aarch64-conda-linux-gnu
arm64-apple-darwin20.0.0
powerpc64le-conda-linux-gnu
x86_64-w64-mingw32
```

The machine field corresponds to the architecture such as `x86_64`. Note that different operating
systems may be using different identifiers for the same architecture, e.g. `aarch64` on Linux
corresponds to `arm64` on macOS. Sometimes it also includes architecture version (`armv7a`)
or endianness (`ppc64le`).

The vendor field can contain an arbitrary string. Conda-forge uses `conda` on Linux and `apple` on
macOS. Again, sometimes it conveys additional information, for example `w64` is used to indicate
`win-64` target for MinGW.

The operating system field indicates the operating system, optionally followed by its version
(such as `linux-gnu`, `linux-musl` or `darwin20.0.0`). Sometimes it may include additional ABI
indication, such as `linux-gnueabi`, or `linux-gnueabihf` for ARM processors with hardware
floating-point unit.

## Platform types

When discussing toolchains, three types of platform are referenced:

- The build platform, referring to the platform on which the cross-toolchain is being run.
- The host platform, referring to the platform for which the binaries are being produced.
- The target platform, relevant to building a cross-toolchain itself, and referring to the platform
  for which the resulting toolchain will produce binaries.

Toolchain executables are often prefixed by the host platform triplet, e.g.
`x86_64-conda-linux-gnu-gcc` indicates a compiler producing binaries for `x86_64-conda-linux-gnu`
host platform.

The platform designations are relative to the particular build process. For example, when building
a cross-compiler on `x86_64-conda-linux-gnu` platform that will run on the same platform, but
produce code for `aarch64-conda-linux-gnu`, build and host platforms will be
`x86_64-conda-linux-gnu` and target platform will be `aarch64-conda-linux-gnu`. However, when
using that compiler afterwards, `x86_64-conda-linux-gnu` will be the build platform, whereas
`aarch64-conda-linux-gnu` will be the host platform.

## Cross-compilation environment

A cross-compilation environment requires two components:

1. A cross-toolchain, i.e. compiler, linker and other tools that run on the build platform and are
   capable of producing binaries for the host platform. In some cases (such as GCC) a dedicated
   cross-compiler is built for every target, whereas in others, such as Clang, a single compiler is
   capable of producing binaries for multiple targets. The prefix containing these executables
   is designated by the `${BUILD_PREFIX}` variable, and the tools themselves are frequently prefixed
   by the host triplet.
2. The sysroot built for the host platform, including all the libraries and header files needed by
   the built package. This sysroot is designated by the `${PREFIX}` variable. In conda-forge, it is
   also used as the install location for the built package files.

The distinction between the two prefixes is essential while cross-compiling. The build process can
only run programs built for the build platform, and therefore all the tools needed at build time
need to be available in `${BUILD_PREFIX}`, and consequently they are specified as `build`
dependencies. However, the headers, libraries, pkg-config files and other files describing the
characteristics of the host platform need to be used from `${PREFIX}`, and specified as `host`
dependencies.

In conda-forge, the build setup and compiler activation scripts attempt to configure the build
process for correct locations, but in some cases (e.g. when dealing with custom `*-config` tools),
additional effort may be required from feedstock maintainers to point the build system at the
correct locations.

## Limitations of cross-compilation

While performing cross-builds, the build process cannot run executables built by the cross-compiler,
for host platform. This has various implications, such as:

- Programs are unable to run their test suites. Testing is often skipped when cross-compiling, or
  emulators are used to run tests.
- Build-time utility programs have to be built for the build platform rather than the host platform.
  Some build systems handle this automatically by using the build platform compiler in addition to
  the host compiler. In other cases, it may be necessary to build these utilities manually. This
  also implies that their dependencies need to be present in the `build` requirements section.
- Some platform checks cannot be performed. The correct values for the relevant platform
  characteristics need then to be provided directly to the build system.

## Specific cases

### Cross-compiled Python packages

Conda-forge employs a series of workarounds to make cross-compilation work for Python packages.
The problem is discussed in greater detail in [PEP720](https://peps.python.org/pep-0720/) and
[conda-forge.github.io#1841](https://github.com/conda-forge/conda-forge.github.io/issues/1841).

In the terms of the PEP720, the conda-forge setup implements the "faking the target environment"
approach. More specifically, this will result in the following changes before the builds scripts
run:

- A modified `crossenv` installation in `$BUILD_PREFIX/venv`, mimicking the architecture of
  `$PREFIX`.
- Forwarder binaries in `$BUILD_PREFIX/bin` that point to the `crossenv` installation.
- Symlinks that expose the `$BUILD_PREFIX` site-packages in the `crossenv` installation, which
  is also included in `$PYTHONPATH`.
- A copy of all `$PREFIX` site-packages to `$BUILD_PREFIX` (except the compiled libraries).

All in all, this results in a setup where `conda-build` can run a `$BUILD_PREFIX`-architecture
`python` interpreter that can see the packages in `$PREFIX` (with the compiled bits provided by
their corresponding counterparts in `$BUILD_PREFIX`) and sufficiently mimic that target

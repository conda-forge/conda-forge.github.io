---
title: 'Compilation concepts'
---

There are two main models for source code to be executed on a particular system: it can either be
compiled into machine code, or interpreted. Programming languages such as C, C++ and Rust usually
follow the former path, requiring the source code to be compiled into machine code and then linked
into binaries that can be used directly, irrespective of the original sources. On the other hand,
languages such as Python or shell script tend to be run via an interpreter that processes and runs
them directly from the source code. Both approaches have their advantages: compiling into machine
code can produce efficient stand-alone executables, at the cost of portability; on the other hand,
an intepreter can run programs straight from sources and handle code changes immediately, at the
cost of worse performance.

Strictly speaking, programming languages aren't bound into compiler-interpreter dichotomy. There do
exist interpreters for programming languages like C, and there do exist compilers that can turn
Python code into stand-alone native executables. Nevertheless, they primarily follow a single model
and packagers rarely need to be concerned about the alternative possibilities.

Many programming languages fall somewhere across the compiler-interpreter spectrum. Many interpreted
languages use Just-in-Time (JIT) compilation: rather than interpreting the input directly, they
compile it into machine code upon loading, achieving better performance with one-time startup cost.
Python interpreters commonly compile source code into more efficient bytecode upon loading. On the
other hand, Java sources need to be manually compiled into bytecode that is afterwards interpreted
by a Java Virtual Machine.

This document specifically focuses on the concepts related to languages compiled into machine code,
such as C, C++ and Rust.

## The compilation pipeline

A typical pipeline in a C-style language consists of three elements:

1. A preprocessor, that is responsible for performing initial processing of the source code,
   handling `#include` statements and substituting macros. Preprocessing is usually done as part of
   the compilation and is not visible to the user.
2. A compiler backend, that is responsible for processing the source code and outputting object
   files (`.o` on Unix, `.obj` on Windows), containing a compiled machine code or bytecode.
3. A linker (or link editor), that is responsible for combining multiple object files together,
   along with the program's dependent libraries, and outputting the actual binary.

Typically, these programs are not run separately, but rather invoked automatically via the compiler
frontend. Usually, compiler frontends are invoked by build systems, from simple Makefiles to complex
solutions such as CMake or Meson. These often split compilation and linking steps, compiling every
object file separately to enable running multiple compiler processes simultaneously to benefit from
multiple logical CPUs.

## Build systems

While for trivial projects, compiling software manually may be feasible, more realistically software
involves a degree of complexity that justifies using a build system. A build system provides a layer
of automation that takes care of compiling, testing and installing the software, at the same time
providing a degree of configurability for end users and providing support for multiple platforms and
toolchains.

The build system pipeline typically involves four stages:

1. Configuration -- which covers accepting user input as to how the package should be built,
   discovering the necessary tooling and dependencies, and preparing the actual build.
2. Compilation -- which covers compiling all source files into binaries, as well as any other
   necessary processing. Many software packages can be run from the build directory after this
   stage.
3. Testing -- which covers running the package's test suite to verify that is working correctly. In
   some build system, tests are compiled in this stage; in others, they need to be enabled at
   configuration stage and built at compilation stage.
4. Installation -- which covers installing compiled files and package's data files to the actual
   system, or a staging directory.

Projects usually adapt one of the existing build systems, such as GNU autotools, CMake or Meson.
These often are not entirely standalone tools but rather serve the purpose of configuring the build
and generating build scripts for other tools, such as make, ninja or various Integrated Development
Environments. These tools in turn consume the build scripts to perform the actual build.

## Symbols

The code written in C-style languages contains functions, global variables, etc. that are compiled
into what is collectively called symbols. The compiled binaries contain symbol tables that map the
symbol names into their compiled counterpart, and therefore enable programs to reference them across
code units and across different binaries. This enables not only splitting individual programs into
separate code files, but also creating libraries of code that can be used across different projects.

These programming languages split interface and implementation. The compiled objects and binaries
contain the implementation, which is sufficient for already compiled programs to use them. However,
in order to compile a new program, the compiler needs to additionally know the interface; for
example, the function prototype that provides the function name, arguments and return type.

Typically, this split is accomplished through splitting the program code across two types of files:
header files specifying the interface, and source files containing the implementation. The source
files are compiled into the actual binary, while header files are used during the compilation but
also distributed along with the compiled library afterwards.

Note that in some cases the header files may contain implementation in addition to interface. For
example, the implementation of inline functions is provided in header files, so that the compiler
can use it while compiling other programs.

## API and ABI

A C-style library essentially defines two related interfaces: an Application Programming Interface
(API) that is used by the compiler, and an Application Binary Interface (ABI) that is used at
runtime. Generally, the API is defined by the header files, and ABI is inferred from it. Both
concepts are critical for compatibility between libraries and the programs using them.

APi defines the interface that is used in the source code of programs. Conversely, ABI is used by
compiled binaries. For example, consider a library with the following prototype:

```c
void foo(int a);
```

Such a function accepts a single `int` parameter. From programmer's perspective, it can accept any
parameter that can be converted into an `int`. However, from binary perspective the library has a
strict contract with the program that an `int` value must be passed.

Now consider that the library changes prototype into:

```c
void foo(int64_t a);
```

From programmer's perspective this can be fine, as long as the previous `int` input can be converted
into `int64_t`. However, the binary contract changes -- a previously compiled program passes an
`int` type where a wider `int64_t` type is expected now. This is a trivial example of an ABI
breakage. If a program was compiled against the old prototype but used the new library, it could
lead to arbitrary results, from crashes to hard-to-debug bugs affecting other code (so-called
Heisenbugs).

Systems often feature mechanisms to protect against this class of issues. For example, shared
libraries often use various versioning schemes to ensure that the programs remain linked to a single
compatible version, and need to be recompiled to use the ABI from a new version.

Note that ABI incompatibilities are not limited to deliberate changes of program interface. They can
also be caused by using different compilation parameters, different compilers or even compiler
versions.

## Linking to libraries

In order to use a library, the program needs to link to it. It can link either statically or
dynamically. Static linking means that the library code is embedded into the program directly, and
the library _file_ is no longer needed at runtime. Dynamic linking means that the program merely
carries a reference to an external library, and the library file is loaded when the program starts.
Both approaches to linking have their use cases, and their proponents.

Static linking creates a standalone program that is easier to distribute, and may benefit from
additional optimization as the optimizer is able to determine how the library is used exactly.
However, statically linked programs are less space efficient, especially if the same library is used
across multiple programs. Since a specific library version is embedded into the program, the risk of
breakage on updates is minimized. However, this means that in order to update the library, the whole
package needs to be rebuilt, which may negatively impact security response time if the library turns
out to be vulnerable.

Dynamic linking creates programs that reuse a shared copy of the library. As such, the library
either needs to be installed separately or distributed along with the program. However, their main
advantage is that the same library is shared across multiple packages, and can be quickly swapped
for another version as necessary. Unfortunately, this requires one to take special care for different
library versions to be compatible in the Application Binary Interface (ABI) exposed to programs.

In conda-forge, dynamic linking to libraries provided by conda-forge packages is strongly preferred. Many of
the concerns related to dynamic linking do not apply here, as proper packaging practices
ensure that library dependencies are annotated and installed in compatible versions.

## Development files

Building against libraries requires additional development files to be available. In conda-forge,
these files may be distributed as part of the package installing the library itself; or split into
separate "development" packages, depending on criteria such as their complexity, popularity and
size.

The necessary development files include:

- header files and include files, providing function prototypes and inline code from the library,
- static libraries, needed for static linking,
- shared libraries or import libraries, needed for dynamic linking,
- pkg-config files or build system-specific files, used to indicate how to build against the
  library.

Include files are installed into the `include` directory or its subdirectories. They usually use
`.h` or `.inc` suffix for C. For C++, sometimes names without a suffix are used to follow the
standard library `#include` scheme, or `.hpp` suffix.

Static libraries are installed into the `lib` directory and carry an `.a` suffix on Unix, or `.lib`
on Windows. On Unix, shared libraries are used directly for linking, and they are described in the
[binaries](#binaries) section. On Windows, import libraries are used instead. They use `.lib` suffix
like static libraries.

Finally, packages often provide additional files that are used at build time to determine how to compile against
the library in question. For example, these can include pkg-config files, CMake files, autotools
macros. These files are usually used by the build systems.

## Binaries

The primary kind of artifacts produced by compiled programming languages are binaries. In this
context, binaries mean files containing machine code. There are two main kind of binaries:

1. Executables: programs that can be run directly by the user.
2. Shared libraries: collections of compiled code that programs usually link to and therefore they
   are loaded by programs at start time.
3. Loadable modules: collections of compiled code that are loaded by programs at runtime (e.g.
   plugins).

On Unix platforms, executables don't feature any suffix, and common shells only start executables
when their filename matches the specified command exactly. On Windows, executables commonly use
`.exe` suffix, and shells account for that. For example, the Python executable will be named
`python` on Unixes, and `python.exe` on Windows; in both cases, typing `python` will execute it.
Executables are usually installed into the `bin` directory, except on Windows where there may be
installed into a variety of directories, including top-level Prefix directory and `Scripts` tree.

Shared libraries use filenames with a `lib` prefix on Unixes, and `.so` suffix, except for macOS where they use
`.dylib` suffix instead. They are installed into the `lib` directory. They often include a version
string to indicate compatibility between different library versions.

On Windows, shared libraries use `.dll` suffix, and no obligatory prefix. They are installed along
with the executable programs (usually under `bin` directory or equivalent). There is also no
standard filename versioning scheme, though many libraries include a version in the filename. The
`.dll` files are only used at runtime. To build programs against a shared library, an additional
import library of `.lib` format must be used, which essentially describes the (visible) content of a
`.dll` file to use.

On most systems, loadable modules use the same format as shared libraries. macOS is an exception
to that, where loadable modules are "bundles". The recommended suffix for these files is `.bundle`,
though much software (including Python) uses `.so` instead. They are usually installed into
tool-specific directories.

## Shared library versioning

Shared libraries are often versioned to indicate compatibility. Typically, at least two version
components are used: a minor version that is incremented whenever backwards-compatible ABI changes
occur (e.g. new interfaces are added), and a major version that is incremented whenever
backwards-incompatible changes happen. Often additional version components are used to indicate
library updates without ABI changes.

When such a scheme is used, the installed library usually consists of three files:

- the actual library with a full version string, such as `lib{name}.so.1.2.3` or
  `lib{name}.1.2.3.dylib`,
- a symbolic link including only the major version, such as `lib{name}.so.1` or `lib{name}.1.dylib`,
- an unversioned symbolic link, such as `lib{name}.so` or `lib{name}.dylib`.

When building a new program, the linker -- if passed `-l{name}` -- uses the unversioned library
name. If it is a symbolic link, it is resolved to the actual library. That library is used during
the linking process, and dynamic library information is taken from it.

On Linux, this information primarily involves the `DT_SONAME` entry that contains the filename used
to load the library at runtime. Typically, it corresponds to the filename with the major version,
though it can be any filename, and e.g. libraries that do not provide cross-version compatibility at
all often use the full version.

On macOS, library [version
information](https://developer.apple.com/library/archive/documentation/DeveloperTools/Conceptual/DynamicLibraries/100-Articles/DynamicLibraryDesignGuidelines.html#//apple_ref/doc/uid/TP40002013-SW23)
is used instead. It consists of a major version number, a minor (current) version number and a
compatibility version number. The major version number functions much like `DT_SONAME` -- it is used
to construct the "major version" symbolic link and the install name, it can be any string and it
needs to change whenever backwards-incompatible changes occur. The minor version number consists of
one to three version components, and indicates the current library version; it usually starts with
the major number. The compatibility version number indicates the earliest version of the library
that remains compatible with programs compiled against the current version.

When a program is started, the library is loaded based on the major version number. Then, the loader
compares the current version number of the loaded library against the compatibility version of the
library used at link time (stored in the program). If the current version is older than the
compatibility version, the program refuses to start.

For example, a GNU-style `lib{name}.so.1.2.3` would correspond to a major version of `1`, current
version of `1.2.3` and compatibility version of `1.2.0`. Programs compiled against that version
would be compatible with `>=1.2.0,<2`, but the library would also remain compatible with programs
compiled against earlier versions. While Linux technically encodes the equivalent of compatibility
versions in the filename, they aren't strictly enforced.

## Finding shared libraries at runtime

Typically, a binary linked to a shared library does not embed the complete path to the library, but
rather the library name. When a program is started, the dynamic loader is responsible for finding
all the needed libraries, recursively, and loading them. The exact behavior differs from platform to
platform. Appropriately, the ways conda-forge builds binaries account for these differences.

The behavior of GNU/Linux dynamic loader is documented in the
[ld.so(8) manpage](https://manpages.debian.org/testing/manpages/ld.so.8.en.html). The following
directories are searched for dependent libraries (provided they do not specify a full path):

1. The directories specified in the `DT_RPATH` entry of the program, provided `DT_RUNPATH` is not
   present. Specifying `DT_RPATH` is discouraged, since the resulting behavior is suboptimal.
2. The directories specified in the `LD_LIBRARY_PATH` environment variable. This variable is
   typically set locally when library search paths need to be overridden.
3. The directories specified in the `DT_RUNPATH` entry of the binary. Note that these paths do not
   apply recursively -- the program's `DT_RUNPATH` is used for the libraries used directly by the
   program, and these libraries's entries are used for their own dependent libraries, and so on.
4. The standard system search paths.

Furthermore, the paths in `DT_RPATH` and `DT_RUNPATH` can use the `$ORIGIN` placeholder to reference
the directory containing the binary. Conda-forge packages typically ensure that the correct
libraries are used by embedding a `DT_RUNPATH` pointing to the appropriate directory within the
conda-forge environment, usually `$ORIGIN/../lib`. This can be done e.g. by linking with
`-Wl,-rpath,\$ORIGIN/../lib` flag.

On macOS, the equivalent behavior is achieved using [Run-Path Dependent
Libraries](https://developer.apple.com/library/archive/documentation/DeveloperTools/Conceptual/DynamicLibraries/100-Articles/RunpathDependentLibraries.html).
Libraries are created with install names conaining a `@rpath/` path prefix, e.g.
`@rpath/libpython3.15.dylib`, and therefore such names are embedded in the binaries linking to them.
As described in the [library search
process](https://developer.apple.com/library/archive/documentation/DeveloperTools/Conceptual/DynamicLibraries/100-Articles/DynamicLibraryUsageGuidelines.html#//apple_ref/doc/uid/TP40001928-SW21),
the dynamic loader searches in the following directories (since the name contains a slash):

1. The directories specified in the `DYLD_LIBRARY_PATH` environment variable.
2. The specified path, with `@rpath` being substituted for the library's run path.
3. The directories specified in the `DYLD_FALLBACK_LIBRARY_PATH` environment variable, that defaults
   to system library directories.

The run paths in binaries specify the appropriate conda-forge environment directory using a
`@loader_path` placeholder, such as `@loader_path/../lib`.

The [Windows Dynamic-link library search
order](https://learn.microsoft.com/en-us/windows/win32/dlls/dynamic-link-library-search-order) is
quite complex. However, for our purposes it suffices to list the following variants:

1. A number of overrides such as "DLL Redirection" and "Known DLLs".
2. The directory containing the application.
3. A number of system directories.
4. The current directory.
5. The directories listed in the `PATH` environment variable.

Note that steps 2. and 5. specifically focus on program directories. To account for this,
conda-forge generally installs `.dll` libraries into program directories such as the `bin` directory
rather than the `lib` directory used on Unixes.

## Dependencies

Conda splits package dependencies into three classes:

- `build` -- indicating dependencies that need to be available while building the package, and that
  are compatible with the build platform. This primarily involves programs being run at build time,
  but also "sysroot" and CDT packages.
- `host` -- indicating dependencies that need to be available while building the package, and that
  are compatible with the host platform. This primarily involves dependent libraries, but also
  interpreters like `python`.
- `run` -- indicating dependencies that need to be installed in the system along with the package.
  This primarily involves programs and libraries used at runtime.

The build and host platforms are discussed in [cross-compilation
concepts](../cross-compilation/#platform-types).

However, shared library dependencies normally are not added to `run` dependencies in recipes.
Instead, they are exported from `host` dependencies via a mechanism called "run exports". For
example, if your package links to `libgit2`, you list it as a `host` dependency in the recipe, and
an appropriately pinned `run` dependency is automatically added to the built package.

There also exist strong run exports. When packages using them are listed in `build` dependencies,
their exports are added both to `host` and to `run` dependencies. For example, if you use the `gcc`
compiler, it automatically adds `libgcc` to both `host` and `run` dependencies.

There are also cases when run exports are undesirable. For example, if a library is linked
statically or only used to build tests. In these cases, there is also a mechanism to ignore run
exports, and prevent the dependency from being added to `run` dependencies.

When packages are being built, both conda-build and rattler-build perform linkage analysis on the
built binaries. They list all the libraries that every binary links against, and map them to the
respective conda-forge packages. This output can cross-referenced to the final package `run`
dependencies, to check for missing dependencies (usually belonging in `host` class).

## Native builds, cross builds and emulation

Compiling binaries to machine code implies that they can only run on a single platform. In the
simplest case, this is the same platform that the compiler is being run on. Such a case is called a
native build. Naturally, the limitation of native builds is that you can only target platforms that
you have hardware with a suitable build environment on. In some cases, this could be particularly
problematic, for example if the hardware in question is not very performant or has limited memory
available.

Conda-forge provides two options to build packages for another platform that the one being used to
perform the build. These are:

1. [Cross-compilation](../cross-compilation/), which uses a specially built cross-compiler to
   produce machine code for another platform than the one used on the build machine.
2. [Emulation](../../knowledge_base/#emulated-builds), which uses a virtual machine to run an
   emulated system to perform the build on.

In general, cross-compilation is preferable. Emulation could be convenient, as it internally follows
the native build path, but it has significant overhead. On the other hand, cross-compiler and other
build tools are native executables, therefore most of the cross-compilation happens natively, with
no additional overhead (userspace emulation could be used to run host executables, such as tests).
For more information, please see the linked explanation.

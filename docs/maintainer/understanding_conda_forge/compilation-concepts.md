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
These build systems in turn generate Makefiles, Ninja build scripts or project files for IDEs to use
and perform the actual build.

## Libraries

Modern programs almost always link to libraries, that is collections of shared code. This includes
system libraries and compiler runtimes that provide the basic programming language functionality,
and third-party libraries provided by various packages.

Programs link to libraries either statically or dynamically. Static linking means that the library
code is embedded into the program directly, and the library is no longer needed at runtime. Dynamic
linking means that the program merely carries a reference to an external library, and the library is
loaded when the program starts. Both approaches to linking have their use cases, and their
proponents.

Static linking creates a standalone program that is easier to distribute, and may benefit from
additional optimization as the optimizer is able to determine how the library is used exactly.
However, statically linked programs are less space efficient, especially if the same library is used
across multiple programs. Since a specific library version is embedded into the program, the risk of
breakage on updates is minimized. However, this means that in order to update the library, the whole
package needs to be rebuilt, which may negative impact security response time if the library turns
out to be vulnerable.

Dynamic linking creates programs that reuse a shared copy of the library. As such, the library
either needs to be installed separately or distributed along the program. However, their main
advantage is that the same library is shared across multiple packages, and can be quickly swapped
for another version as necessary. However, this requires one to take special care for different
library versions to be compatible in the Application Binary Interface (ABI) exposed to programs.

In conda-forge, dynamic linking to libraries provided by conda-forge packages is preferred. Many of
the concerns related to dynamic linking do not apply here, as packages take care of installing the
library dependencies in compatible versions.

## Development files

Building against libraries requires additional development files to be available. In conda-forge,
these files are usually installed as part of the package installing the library itself; in some
cases they are split to separate "development" packages though.

The necessary development files include:

- header files and include files, providing function prototypes and inline code from the library,
- static libraries, needed for static linking,
- shared libraries or import libraries, needed for dynamic linking,
- pkg-config files or build system-specific files, used to indicate how to build against the
  library.

Include files are installed into the `include` directory or its subdirectories. They usually use
`.h` or `.inc` suffix for C. For C++, sometimes names without a suffix are used to follow the
standard library `#include` scheme.

Static libraries are installed into the `lib` directory and carry an `.a` suffix on Unix, or `.lib`
on Windows. On Unix, shared libraries are used directly for linking, and they are described in the
[binaries](#binaries) section. On Windows, import libraries are used instead. They use `.lib` suffix
like static libraries.

Finally, packages often provide additional files that are used at build time to determine how to use
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
Executables are usually installed into the `bin` directory.

Shared libraries use `lib` prefix on Unixes, and `.so` suffix, except for macOS where they use
`.dylib` suffix instead. They are installed into the `lib` directory. They often include a version
string to indicate compatibility between different library versions.

On Windows, shared libraries use `.dll` suffix, and no obligatory prefix. They are installed into
the `bin` directory, along with programs. There is also no standard filename versioning scheme,
though many libraries include a version in the filename. The `.dll` files are only used at runtime.
To build programs against a shared library, an additional import library of `.lib` format must be
used, which also specifies the `.dll` file to use.

On most systems, loadable modules use the same format as shared libraries. Darwin is an exception
to that, where loadable modules are "bundles". The recommended suffix for these files is `.bundle`,
though much software (including Python) uses `.so` instead. They are usually installed into
tool-specific directories.

## Shared library versioning

When shared library versioning is used on Unix systems, the installed library usually consists of
three files:

- the actual library containing full version string, such as `lib{name}.so.1.2.3` or
  `lib{name}.1.2.3.dylib`,
- a partially versioned symbolic link, such as `lib{name}.so.1` or `lib{name}.1.dylib`,
- an unversioned symbolic link, such as `lib{name}.so` or `lib{name}.dylib`.

When building a new program, the linker -- if passed `-l{name}` -- finds the unversioned symbolic
link, and reaches the actual library through resolving it. From that library, it reads the
`DT_SONAME` entry on Linux, or the install name on macOS. Commonly, it references the partially
versioned name -- and that name is stored in the resulting binary, and therefore used when the
binary is loaded. As a result, the binary is pinned to particular "soversion", and when the library
is upgraded to a newer version that's backwards compatible (i.e. has the same "soversion"), all
programs start using the new version without being rebuilt. Conversely, an upgrade to an
incompatible version (i.e. one having a different "soversion") requires rebuilding binaries.

TODO: research and document macOS version checking

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

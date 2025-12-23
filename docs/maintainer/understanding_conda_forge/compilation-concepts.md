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
macros.

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
string to indicate compatibility between different library versions. If that is the case, the
installed library usually consists of three files:

- the actual library containing full version string, such as `lib{name}.so.1.2.3` or
  `lib{name}.1.2.3.dylib`,
- a partially versioned symbolic link, such as `lib{name}.so.1` or `lib{name}.1.dylib`,
- an unversioned symbolic link, such as `lib{name}.so` or `lib{name}.dylib`.

When building a new program, the linker uses the unversioned symbolic link to select the library
to link to. From it, the linker reads the library `SONAME` (or install name, on macOS) that
corresponds to the partially versioned name, and stores that in the resulting executable. When run,
the executable loads the library using its partially versioned name. When the library is upgraded
to a newer version that is backwards compatible (i.e. has the same partially versioned name), all
executables start using the new version.

On Windows, shared libraries use `.dll` suffix, and no obligatory prefix. They are installed into
the `bin` directory, along with programs. There is also no standard filename versioning scheme,
though many libraries include a version in the filename. The `.dll` files are only used at runtime.
To build programs against a shared library, an additional import library of `.lib` format must be
used, which also specifies the `.dll` file to use.

On most systems, loadable modules use the same format as shared libraries. Darwin is an exception
to that, where loadable modules are "bundles". The recommended suffix for these files is `.bundle`,
though much software (including Python) uses `.so` instead. They are usually installed into
tool-specific directories.

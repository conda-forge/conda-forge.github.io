---
title: 'Knowledge Base'
---

<a id="knowledge-base"></a>

# Knowledge Base

## Finding examples with Github Code Search {#search-github}

Github's [Code Search](https://github.com/features/code-search) is an incredibly useful tool to find examples of recipes in conda-forge.
There are a couple tricks you can use to make the most out of your searches.

- Limit the search to `org:conda-forge`.
- Limit the path to the type of file you want. This usually means:
  - `path:meta.yaml` for the main metadata file.
  - `path:recipe/*.sh` for Unix build scripts.
  - `path:recipe/*.bat` for Windows build scripts.

That's it, with those two modifiers, you can get a lot done! Some examples include:

- [All `noarch: python` recipes](https://github.com/search?type=code&q=org%3Aconda-forge+path%3Ameta.yaml+%22noarch%3A+python%22).
- Recipes that depend on... [`cuda`](https://github.com/search?type=code&q=org%3Aconda-forge+path%3Ameta.yaml+%22-+cuda%22), [`pytorch`](https://github.com/search?type=code&q=org%3Aconda-forge+path%3Ameta.yaml+%22-+pytorch%22), [`__virtual` packages](https://github.com/search?type=code&q=org%3Aconda-forge+path%3Ameta.yaml+%2F-+__%5CS%2B%2F), etc.
- [Scripts that use CMake on Unix](https://github.com/search?type=code&q=org%3Aconda-forge+cmake+path%3Arecipe%2F*.sh).
- [Scripts that use CMake on Windows](https://github.com/search?type=code&q=org%3Aconda-forge+cmake+path%3Arecipe%2F*.bat).
- [Recipes that use cross-compilation](https://github.com/search?type=code&q=org%3Aconda-forge+path%3Ameta.yaml+%22target_platform+%21%3D+build_platform%22+OR+%22build_platform+%21%3D+target_platform%22).

:::tip Configure your browser to have a search shortcut

For example, in Chrome you can go to [`chrome://settings/searchEngines`](chrome://settings/searchEngines) and add a new entry with:

- Name: conda-forge recipes
- Shortcut: `cf`
- URL: `https://github.com/search?type=code&q=org%3Aconda-forge+%s`

And with that you can simply type `cf your-search-here` for super fast queries!
:::

<a id="using-cmake"></a>

## Using CMake

[CMake](https://cmake.org/) can be used to build more complex projects in `build.sh`
or `bld.bat` scripts.

If you are using cmake, be sure to make it a build requirement in the `build` section. You
may also need to include `make` or `ninja` depending on your platform and build tools.
On Windows, you can also use `nmake` to build, but that does not need to be explicitly included.

```yaml
requirements:
  build:
    - cmake
    - make  # [not win]
    - ninja  # [win]
```

For CMake projects using the [FindPython](https://cmake.org/cmake/help/git-stage/module/FindPython.html)
module, you can tell CMake which Python to use by passing `-DPython_EXECUTABLE="$PYTHON"`
(macOS or Linux) or `-DPython_EXECUTABLE="%PYTHON%"` (Windows) as a command line option.
Older CMake projects may require similar, but slightly different options.

:::tip

Don't forget that depending on which CMake module you use you have to use a different command:

- [FindPython](https://cmake.org/cmake/help/git-stage/module/FindPython.html):
  `-DPython_EXECUTABLE=...`.
- [FindPython3](https://cmake.org/cmake/help/git-stage/module/FindPython3.html):
  `-DPython3_EXECUTABLE=...`.
- [FindPython2](https://cmake.org/cmake/help/git-stage/module/FindPython2.html):
  `-DPython2_EXECUTABLE=...`.

or if you are still on the deprecated [FindPythonLibs](https://cmake.org/cmake/help/latest/module/FindPythonLibs.html): `-DPYTHON_EXECUTABLE=...`.

:::

Some optional, but useful CMake options:

- `-DCMAKE_BUILD_TYPE=Release` Configure as release build. This is better done on the initial
  `cmake` call as some packages construct different build configurations depending on this flag.
- `-DCMAKE_INSTALL_PREFIX=$PREFIX` Specify the install location.
- `-DCMAKE_INSTALL_LIBDIR=lib` Libraries will land in $PREFIX/lib, sometimes projects install
  into lib64 or similar but on conda-forge we keep shared libraries in simply lib.
- `-DBUILD_SHARED_LIBS=ON` Instruct CMake to build shared libraries instead of static ones.
- `-DCMAKE_FIND_FRAMEWORK=NEVER` and `-DCMAKE_FIND_APPBUNDLE=NEVER` Prevent CMake from using system-wide macOS packages.
- `${CMAKE_ARGS}` Add variables defined by conda-forge internally. This is required to enable various conda-forge enhancements, like [CUDA builds](#cuda).

Here are some basic commands for you to get started. These are dependent on your source
code layout and aren't intended to be used "as is".

**CMake lines for build.sh (macOS/Linux):**

```default
cmake CMakeLists.txt -DPython3_EXECUTABLE="$PYTHON"
cmake --build . --config Release
```

**CMake lines for bld.bat (Windows):**

```default
cmake -G "NMake Makefiles" -DCMAKE_BUILD_TYPE=Release -DPython3_EXECUTABLE="%PYTHON%"
if errorlevel 1 exit /b 1
cmake --build . --config Release
if errorlevel 1 exit /b 1
```

See also the `bld.bat` in the Windows section below for an additional example.

Other useful `cmake` options are `-B<directory>` and `-S<directory>` to specify build and source
directories.

<a id="moving-from-an-autotools-build-to-a-cmake-build"></a>

### Moving from an autotools build to a CMake build

Some packages maintain an autotools build and a cmake build. Some maintainers
would like to switch to a cmake build because that provides windows builds
easily. These builds are mostly not ABI compatible with each other.
Here are some things you should check,

1. Check that both libraries have the same SONAME on linux

   Run `readelf -d /path/to/lib.so`

2. Check that both libraries have the same install name and have the same
   compatibility and current versions.

   Run `otool -L /path/to/lib.dylib`. The second line should give you
   the three pieces of information

3. Check that the file list is the same in both.
4. Check that you use the same options as the same autoconf build.
5. Check that the symbols exported are the same.
6. Check that additional packaging information stays the same, e.g. is the same pkg-config information provided.

<a id="particularities-on-windows"></a>

## Particularities on Windows

This document presents conda-forge and conda-build information and examples
while building on Windows.

<a id="local-testing"></a>

### Local testing

The first thing that you should know is that you can locally test Windows
builds of your packages even if you don't own a Windows machine. Microsoft
makes available free, official Windows virtual machines (VMs) [at this website](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines/). If you
are unfamiliar with VM systems or have trouble installing Microsoft's VMs, please
use a general web search to explore — while these topics are beyond the
scope of this documentation, there are ample discussions on them on the broader
Internet.

To bootstrap a conda environment and install `conda-build`, consider
[miniforge](https://github.com/conda-forge/miniforge).

<a id="executing-a-build"></a>

#### Executing a build

The `build-locally.py` script does not support Windows (yet, PRs welcome!).
You can use `conda build recipe/ -m .ci_support/choose_your_config.yaml` as
a workaround for now.

<a id="testing-a-local-build"></a>

#### Testing a local build

Because we're using `conda-build` directly instead of `build-locally.py`,
we can use the `local` channel:

```default
conda create -n my-new-env -c local my-package
```

<a id="notes-on-native-code"></a>

### Notes on native code

In order to compile native code (C, C++, etc.) on Windows, you will need to
install Microsoft's Visual C++ build tools on your VM. You must install
particular versions of these tools — this is to maintain compatibility between
compiled libraries used in Python, [as described on this Python wiki page](https://wiki.python.org/moin/WindowsCompilers). The current relevant
versions are:

- For Python 3.5–3.12+: Visual C++ 14.x

While you can obtain these tools by installing the right version of the full
[Visual Studio](https://visualstudio.microsoft.com/) development
environment, you can save a lot of time and bandwidth by installing standalone
"build tools" packages. You can get them from [Visual Studio
Subscriptions](https://visualstudio.microsoft.com/vs/older-downloads/#visual-studio-2019-and-other-products).
To download build tools, you'll need a Microsoft account. Once on the
Visual Studio Subscriptions page, you may also need to join the Dev Essentials
program. Once that's done, you can click the "Download" tab and search for
"Build Tools for Visual Studio 2022". Until conda-forge has completely
[migrated to Visual Studio 2022](https://github.com/conda-forge/conda-forge.github.io/issues/2138),
you may still need to install "Build Tools for Visual Studio 2019" to locally
build a feedstock. Depending on your needs and available hard drive space, you
can either directly install VC-2019 using the
[Visual Studio Build Tools 2019 installer](https://aka.ms/vs/16/release/vs_BuildTools.exe),
or you can install both VC-2022 and VC-2019 using the
[Visual Studio Build Tools 2022 installer](https://aka.ms/vs/17/release/vs_BuildTools.exe),
making sure to check the optional box for "MSVC v142 - VS 2019 C++ x64/x86 build tools (v14.29)".

If you need more information. Please refer [the Python wiki page on Windows compilers](https://wiki.python.org/moin/WindowsCompilers).

<a id="simple-cmake-based-bld-bat"></a>

#### Simple CMake-Based `bld.bat`

Some projects provide hooks for CMake to build the project. The following
example `bld.bat` file demonstrates how to build a traditional, out-of-core
build for such projects.

**CMake-based bld.bat:**

```batch
setlocal EnableDelayedExpansion

:: Make a build folder and change to it.
mkdir build
cd build

:: Configure using the CMakeFiles
cmake -G "NMake Makefiles" ^
      -DCMAKE_INSTALL_PREFIX:PATH="%LIBRARY_PREFIX%" ^
      -DCMAKE_PREFIX_PATH:PATH="%LIBRARY_PREFIX%" ^
      -DCMAKE_BUILD_TYPE:STRING=Release ^
      ..
if errorlevel 1 exit 1

:: Build!
nmake
if errorlevel 1 exit 1

:: Install!
nmake install
if errorlevel 1 exit 1
```

The following feedstocks are examples of this build structure deployed:

- [libpng](https://github.com/conda-forge/libpng-feedstock/blob/master/recipe/bld.bat)
- [Pugixml](https://github.com/conda-forge/pugixml-feedstock/blob/master/recipe/bld.bat)

<a id="building-for-different-vc-versions"></a>

#### Building for different VC versions

On Windows, different Visual C versions have different ABI and therefore a package needs to be built for different
Visual C versions. Packages are tied to the VC version that they were built with and some packages have specific
requirements of the VC version. For example, python 2.7 requires `vc 9` and python 3.5 requires `vc 14`.

With `conda-build 3.x`, `vc` can be used as a selector when using the `compiler` jinja syntax.

```yaml
requirements:
  build:
    - {{ compiler('cxx') }}
```

To skip building with a particular `vc` version, add a skip statement.

```yaml
build:
    skip: true  # [win and vc<14]

requirements:
  build:
    - {{ compiler('cxx') }}
```

<a id="using-vs2022"></a>

#### Using vs2022

In `recipe/conda_build_config.yaml` file:

```yaml
c_compiler:    # [win]
- vs2022       # [win]
cxx_compiler:  # [win]
- vs2022       # [win]
```

You can look at the changes in [this PR](https://github.com/conda-forge/vcpkg-tool-feedstock/pull/41/files).

After making these changes don't forget to rerender with `conda-smithy` (to rerender manually use `conda smithy rerender` from the command line).

<a id="cmd-batch-syntax"></a>

<a id="tips-tricks-for-cmd-batch-syntax"></a>

### Tips & tricks for CMD/Batch syntax

Windows recipes rely on CMD/Batch scripts (`.bat`) by default.
Batch syntax is a bit different from Bash and friends on Unix, so we have collected some tips here to help you get started if you are not familiar with this scripting language.

- Check if you need to write a Batch script first!
  Simple recipes might not need shell-specific code and can be written in an agnostic way.
  Use the `build.script` item in `meta.yaml` (see [conda-build docs](https://docs.conda.io/projects/conda-build/en/stable/resources/define-metadata.html#script)).
  This item can take a string or a list of strings (one per line).
- [SS64's CMD howto pages](https://ss64.com/nt/syntax.html) are the best resource for any kind of question regarding CMD/Batch syntax.
- Search conda-forge for existing `.bat` scripts and learn with examples.
  See this [example query for all Batchfiles](https://github.com/search?q=org%3Aconda-forge+language%3ABatchfile&type=code&l=Batchfile).
- You can [free trial Windows VMs from Microsoft](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines/).
  Set one up with your favorite virtualization solution to debug your CMD syntax.
  There are also some minimal emulators online that might get you started with the basics, even if not all CMD features are present.
  For example, this [Windows 95 emulator](https://www.pcjs.org/software/pcx86/sys/windows/win95/4.00.950/) features a more or less okay MS-DOS prompt.

<a id="special-dependencies-and-packages"></a>

## Special Dependencies and Packages

<a id="dep-compilers"></a>

<a id="compilers"></a>

### Compilers

Compilers are dependencies with a special syntax and are always added to `requirements/build`.

There are currently five supported compilers:

- C
- cxx
- Fortran
- Go
- Rust

A package that needs all five compilers would define

```yaml
requirements:
  build:
    - {{ compiler('c') }}
    - {{ compiler('cxx') }}
    - {{ compiler('fortran') }}
    - {{ compiler('go') }}
    - {{ compiler('rust') }}
```

:::note

Appropriate compiler runtime packages will be automatically added to the package's runtime requirements and therefore
there's no need to specify `libgcc` or `libgfortran`. There are additional informations about how conda-build 3 treats
compilers in the [conda docs](https://docs.conda.io/projects/conda-build/en/stable/resources/compiler-tools.html).

:::

<a id="cross-compilation"></a>

<a id="id1"></a>

### Cross-compilation

conda-forge defaults to native builds of packages for x86_64 on Linux, macOS and Windows, because
that's the architecture powering the default CI runners. Other architectures are supported too,
but they are not guaranteed to have native builds. In those platforms where we can't provide native
CI runners, we can still resort to either cross-compilation or emulation.

Cross-compiling means building a package for a different architecture than the one the build process
is running on. Given how abundant x86_64 runners are, most common cross-compilation setups will target
non-x86_64 architectures from x86_64 runners.

Cross-compilation terminology usually distinguishes between two types of machine:

- Build: The machine running the building process.
- Host: The machine we are building packages for.

:::note

Some cross-compilation documentation might also distinguish between a third type of machine, the
target machine. You can read more about it in [this Stack Overflow question](https://stackoverflow.com/questions/47010422/cross-compilation-terminologies-build-host-and-target).
For the purposes of conda-forge, we'll consider the target machine to be the same as the host.

:::

<a id="cross-compilation-howto"></a>

<a id="how-to-enable-cross-compilation"></a>

#### How to enable cross-compilation

Cross-compilation settings depend on the `build_platform` and `target_platform` conda-build
variables:

- `build_platform`: The platform on which `conda-build` is running, which defines the `build`
  environment in `$BUILD_PREFIX`.
- `target_platform`: The platform on which the package will be installed. Defines the platform of
  the `host` environment in `$PREFIX`. Defaults to the value of `build_platform`.

To change the value of `target_platform` and enable cross-compilation, you must use
the [build_platform](conda_forge_yml.mdx#build-platform) mapping in `conda-forge.yml` and then [rerender](updating_pkgs.md#dev-update-rerender) the feedstock. This will generate the appropriate CI workflows and
conda-build input metadata. See also [test](conda_forge_yml.mdx#test) for how to skip the test phase when
cross-compiling. Provided the requirements metadata and build scripts are written correctly, the
package should just work. However, in some cases, it'll need some adjustments; see examples below
for some common cases.

:::note

The `build_platform` and `target_platform` variables are exposed as environment variables in
the build scripts (e.g. `$build_platform`), and also as Jinja variables in the `meta.yaml`
selectors (e.g. `# [build_platform != target_platform]`).

:::

In addition to these two variables, there are some more environment variables that are set by
conda-forge's automation (e.g. `conda-forge-ci-setup`, compiler activation packages, etc) that
can aid in cross-compilation setups:

- `CONDA_BUILD_CROSS_COMPILATION`: set to `1` when `build_platform` and `target_platform`
  differ.
- `CONDA_TOOLCHAIN_BUILD`: the autoconf triplet expected for build platform.
- `CONDA_TOOLCHAIN_HOST`: the autoconf triplet expected for host platform.
- `CMAKE_ARGS`: arguments needed to cross-compile with CMake. Pass it to `cmake` in your build
  script.
- `MESON_ARGS`: arguments needed to cross-compile with Meson. Pass it to `meson` in your build
  script. Note a [cross build definition file](https://mesonbuild.com/Cross-compilation.html) is
  automatically created for you too.
- `CC_FOR_BUILD`: C compilers targeting the build platform.
- `CXX_FOR_BUILD`: C++ compilers targeting the build platform.
- `CROSSCOMPILING_EMULATOR`: Path to the `qemu` binary for the host platform. Useful for running
  tests when cross-compiling.

This is all supported by two main conda-build features introduced in version 3:

- How [requirements metadata](https://docs.conda.io/projects/conda-build/en/latest/resources/define-metadata.html#requirements-section)
  is expressed in `meta.yaml`, which distinguishes between `build` and `host` platforms.
- The `compiler()` Jinja function and underlying [conventions for the compiler packages](https://docs.conda.io/projects/conda-build/en/latest/resources/compiler-tools.html).

<a id="placing-requirements-in-build-or-host"></a>

#### Placing requirements in build or host

The rule of the thumb is:

- If it needs to run during the build, it goes in `build`.
- If it needs to be available on the target host, it goes in `host`.
- If both conditions are true, it belongs in both.

However, there are some exceptions to this rule; most notably Python cross-compilation
([see below](#python-cross-compilation)).

<a id="cross-compilation-examples"></a>

#### Cross-compilation examples

A package needs to make a few changes in their recipe to be compatible with cross-compilation. Here
are a few examples.

A simple C library using autotools for cross-compilation might look like this:

```yaml
requirements:
  build:
    - {{ compiler("c") }}
    - make
    - pkg-config
    - gnuconfig
```

In the build script, it would need to update the config files and guard any tests when
cross-compiling:

```bash
# Get an updated config.sub and config.guess
cp $BUILD_PREFIX/share/gnuconfig/config.* .

# Skip ``make check`` when cross-compiling
if [[ "${CONDA_BUILD_CROSS_COMPILATION:-}" != "1" || "${CROSSCOMPILING_EMULATOR:-}" != "" ]]; then
  make check
fi
```

A simple C++ library using CMake for cross-compilation might look like this:

```yaml
requirements:
  build:
    - {{ compiler("cxx") }}
    - cmake
    - make
```

In the build script, it would need to update `cmake` call and guard any tests when cross-compiling:

```bash
# Pass ``CMAKE_ARGS`` to ``cmake``
cmake ${CMAKE_ARGS} ..

# Skip ``ctest`` when cross-compiling
if [[ "${CONDA_BUILD_CROSS_COMPILATION:-}" != "1" || "${CROSSCOMPILING_EMULATOR:-}" != "" ]]; then
  ctest
fi
```

Similarly, with Meson, the `meta.yaml` needs:

```yaml
requirements:
  build:
    - {{ compiler("c") }}
    - {{ compiler("cxx") }}
    - meson
    - make
```

And this in `build.sh`:

```bash
# Pass ``MESON_ARGS`` to ``meson``
meson ${MESON_ARGS} builddir/
```

A simple Python extension using Cython and NumPy's C API would look like so:

```yaml
requirements:
  build:
    - {{ compiler("c") }}
    - cross-python_{{ target_platform }}    # [build_platform != target_platform]
    - python                                # [build_platform != target_platform]
    - cython                                # [build_platform != target_platform]
    - numpy                                 # [build_platform != target_platform]
  host:
    - python
    - pip
    - cython
    - numpy
  run:
    - python
    - {{ pin_compatible("numpy") }}
```

With MPI, openmpi is required for the build platform as the compiler wrappers are binaries, but mpich is not required as the compiler wrappers are scripts (see [example](https://github.com/conda-forge/mpi4py-feedstock/blob/743d379c4a04/recipe/meta.yaml#L37)):

```yaml
requirements:
  build:
    - {{ mpi }}                             # [build_platform != target_platform and mpi == "openmpi"]
  host:
    - {{ mpi }}
  run:
    - {{ mpi }}
```

In the build script, openmpi compiler wrappers can use host libraries by setting the environmental variable `OPAL_PREFIX` to `$PREFIX`.

```sh
if [[ "$CONDA_BUILD_CROSS_COMPILATION" == "1" && "${mpi}" == "openmpi" ]]; then
  export OPAL_PREFIX="$PREFIX"
fi
```

There are more variations of this approach in the wild. So this is not meant to be exhaustive,
but merely to provide a starting point with some guidelines. Please look at [other recipes for more examples](https://github.com/search?q=org%3Aconda-forge+path%3Arecipe%2Fmeta.yaml+%22%5Bbuild_platform+%21%3D+target_platform%5D%22&type=code).

#### Finding NumPy in cross-compiled Python packages using CMake

If you are building a Python extension via CMake with NumPy and you want it work in cross-compilation, you need to prepend to the CMake invocation in your build script the following lines:

```sh
Python_INCLUDE_DIR="$(python -c 'import sysconfig; print(sysconfig.get_path("include"))')"
Python_NumPy_INCLUDE_DIR="$(python -c 'import numpy;print(numpy.get_include())')"
CMAKE_ARGS="${CMAKE_ARGS} -DPython_EXECUTABLE:PATH=${PYTHON}"
CMAKE_ARGS="${CMAKE_ARGS} -DPython_INCLUDE_DIR:PATH=${Python_INCLUDE_DIR}"
CMAKE_ARGS="${CMAKE_ARGS} -DPython_NumPy_INCLUDE_DIR=${Python_NumPy_INCLUDE_DIR}"
CMAKE_ARGS="${CMAKE_ARGS} -DPython3_EXECUTABLE:PATH=${PYTHON}"
CMAKE_ARGS="${CMAKE_ARGS} -DPython3_INCLUDE_DIR:PATH=${Python_INCLUDE_DIR}"
CMAKE_ARGS="${CMAKE_ARGS} -DPython3_NumPy_INCLUDE_DIR=${Python_NumPy_INCLUDE_DIR}"
```

<a id="python-cross-compilation"></a>

<a id="details-about-cross-compiled-python-packages"></a>

#### Details about cross-compiled Python packages

Cross-compiling Python packages is a bit more involved than other packages. The main pain point is
that we need an executable Python interpreter (i.e. `python` in `build`) that knows how to
provide accurate information about the target platform. Since this is not officially supported, a
series of workarounds are required to make it work. Refer to [PEP720](https://peps.python.org/pep-0720/) or [the discussion in this issue](https://github.com/conda-forge/conda-forge.github.io/issues/1841) for more information.

In practical terms, for conda-forge, this results into two extra metadata bits that are needed in
`meta.yaml`:

- Adding `cross-python_{{ target_platform }}` in `build` requirements, provided by the
  [cross-python-feedstock](https://github.com/conda-forge/cross-python-feedstock). This is a
  wrapper for the `crossenv` Python interpreters with [some activation logic that adjust some of
  the crossenv workarounds](https://github.com/conda-forge/cross-python-feedstock/blob/main/recipe/activate-cross-python.sh)
  so they work better with the conda-build setup.
- Copying some Python-related packages from `host` to `build` with a `[build_platform !=
target_platform]` selector:
  - `python` itself, to support `crossenv`.
  - Non-pure Python packages (i.e. they ship compiled libraries) that need to be present while the
    package is being built, like `cython` and `numpy`.

In the terms of the [PEP720](https://peps.python.org/pep-0720/), the conda-forge setup
implements the "faking the target environment" approach. More specifically, this will result in the
following changes before the builds scripts run:

- A modified `crossenv` installation in `$BUILD_PREFIX/venv`, mimicking the architecture of
  `$PREFIX`.
- Forwarder binaries in `$BUILD_PREFIX/bin` that point to the `crossenv` installation.
- Symlinks that expose the `$BUILD_PREFIX` site-packages in the `crossenv` installation, which
  is also included in `$PYTHONPATH`.
- A copy of all `$PREFIX` site-packages to `$BUILD_PREFIX` (except the compiled libraries).

All in all, this results in a setup where `conda-build` can run a `$BUILD_PREFIX`-architecture
`python` interpreter that can see the packages in `$PREFIX` (with the compiled bits provided by
their corresponding counterparts in `$BUILD_PREFIX`) and sufficiently mimic that target
architecture.

<a id="emulation"></a>

<a id="emulated-builds"></a>

### Emulated builds

When cross-compilation is not possible, one can resort to emulation. This is a technique that uses
a virtual machine ([QEMU](https://www.qemu.org/)) to emulate the target platform, which has a
significant overhead. However, `conda-build` will see the target platform as native, so very
little changes are usually needed in the recipe.

To enable emulated builds, you must use the [provider](conda_forge_yml.mdx#provider) mapping in `conda-forge.yml`.
This key maps a `build_platform` to a `provider` that will be used to emulate the platform.
`conda-smithy` will know how to detect whether the provider supports that platform natively or
requires emulation, and will adjust the appropriate CI steps to ensure that QEMU runs the process.
Ensure changes are applied by [rerendering](updating_pkgs.md#dev-update-rerender) the feedstock.

Note that only Linux architectures are currently supported via emulation.

:::warning

Emulated builds are very slow and incur an additional strain on conda-forge CI resources.
Whenever possible, please consider cross-compilation instead. Only use emulated builds as a last
resort.

:::

<a id="emulation-examples"></a>

#### Emulation examples

Configure `conda-forge.yml` to emulate `linux-ppc64le`, but use native runners for `linux-64`
and `linux-aarch64`. This works because `linux-ppc64le` is not natively supported by Azure, so
`conda-smithy` will add QEMU steps to emulate it. However, `linux-64` and `linux-aarch64` are
natively supported by Azure and Travis CI, respectively, so no emulation is needed.

```yaml
provider:
  linux_aarch64: travis
  linux_ppc64le: azure
  linux_64: azure
```

<a id="rust-nightly"></a>

### Rust Nightly

Many rust packages rely on nightly versions of the rust compiler. Given this fast release cadence, conda-forge does not yet pull each release.
Instead, rust nightly versions are pulled into the `dev` branch of the [conda-forge/rust-feedstock](https://github.com/conda-forge/rust-feedstock/tree/dev) on an as-needed basis.
For a new version, please file an issue on that feedstock.

To enable the rust nightly compiler in your feedstock, follow the section above and then add the `rust_dev` channel in the `conda_build_config.yaml` file:

```yaml
channel_sources:
  - conda-forge/label/rust_dev,conda-forge
```

<a id="cdt-packages"></a>

<a id="core-dependency-tree-packages-cdts"></a>

### Core Dependency Tree Packages (CDTs)

Dependencies outside of the `conda-forge` channel should be avoided (see [Avoid external dependencies](adding_pkgs.md#no-external-deps)).
However, there are a few exceptions:

Some dependencies are so close to the system that they are not packaged with conda-forge.
These dependencies have to be satisfied with _Core Dependency Tree_ (CDT) packages.

A CDT package consists of repackaged CentOS/AlmaLinux binaries from the appropriate version,
either 7, 8 or 9 depending on user choice and platform. We manage the build of CDT
packages using a centralized repo, [conda-forge/cdt-builds](https://github.com/conda-forge/cdt-builds),
as opposed to generating feedstocks for them. (Note that historically we did use feedstocks but this
practice has been deprecated). To add a new CDT, make a PR on the
[conda-forge/cdt-builds](https://github.com/conda-forge/cdt-builds) repo.

<a id="why-are-cdts-bad"></a>

#### Why are CDTs bad?

1. CDTs repackage old versions of the library.
2. As a result, newer functionality in the packages won't be used by downstream conda packages
   which check for the version of the library being built against.
   For example: OpenGL functionality from the CentOS 7 packaged library is available, but
   any newer functionality cannot be used.
3. We have no guarantees that the version provided by the user's system is compatible.
   We only have the `__glibc>=2.17` constraint and we assume that CentOS 7's
   lower bound of GLIBC and its corresponding lower bound of the CDT are equivalent.
4. We have no guarantee that the library is provided by the user's system at all.

<a id="when-should-cdts-be-used"></a>

#### When should CDTs be used?

1. When there are system specific configurations are used by the library.
   Some examples include:
   1. linux-pam: This is a library that allows pluggable authentication modules and the
      configuration files for these modules usually live in `/etc/pam.d`. The issue is that
      the pluggable modules live in a distro specific location. For example:
      `/usr/lib/x86_64-linux-gnu/security/`. The default modules are built into the
      conda package in `$CONDA_PREFIX/lib/security`, but custom ones for
      system-wide configuration are installed into `/usr/lib/x86_64-linux-gnu/security/`.
      So, we would need to patch the module to look into both, but the directory
      `/usr/lib/x86_64-linux-gnu/security/` is distro specific and will be hard to
      detect.
2. When a conda packaged library will not work properly.
   For example: a new `glibc` package means we would have to edit the elf interpreter of
   all the conda package binaries.

<a id="what-s-are-some-good-examples"></a>

#### What's are some good examples?

1. The OpenCL loader (`ocl-icd` together with `ocl-icd-system`) provides an OpenCL
   loading library. The loader will look at OpenCL implementations given in
   `$CONDA_PREFIX/etc/OpenCL/vendors`.
   For example: Pocl is a conda packaged implementation that runs OpenCL on the CPU. Vendor
   specific implementations like the NVIDIA OpenCL or ROCm OpenCL are not conda packaged, so we
   have to rely on the system. By installing `ocl-icd-system` we enable the loader to look at
   the configuration in `/etc/OpenCL/vendors`, which is the configuration directory for all linux
   distributions. This gives us the best of both worlds. You don't need a system level package to
   run OpenCL because we have a conda packaged installation, but if there is a system wide
   implementation that is accelerated by specific hardware, we can use those.

<a id="libgl"></a>

### libGL

Note that packages dependent on OpenGL and/or libGL should no longer use CDTs. Instead, use the host dependency `libgl-devel` from the [libglvnd-feedstock](https://github.com/conda-forge/libglvnd-feedstock).

```yaml
requirements:
  host:
    - libgl-devel  # [linux]
```

Other OpenGL API variants such as `libegl-devel`, `libgles-devel`, `libglx-devel`, and `libopengl-devel` are also available, and will automatically add non-development `run_exports` dependencies.

<a id="linking-numpy"></a>

<a id="building-against-numpy"></a>

### Building Against NumPy

Packages that link against NumPy need special treatment in the dependency section.
Finding `numpy.get_include()` in `setup.py` or `cimport` statements in `.pyx` or `.pyd` files are a telltale sign that the package links against NumPy.

In the case of linking, you need to use the `pin_compatible` function to ensure having a compatible numpy version at run time:

```yaml
host:
  - numpy
```

At the time of writing (January, 2025), above is equivalent to the following,

```yaml
host:
  - numpy   1.22   # [py==39]
  - numpy   1.22   # [py==310]
  - numpy   1.23   # [py==311]
  - numpy   1.26   # [py==312]
```

though the ongoing migration for numpy 2.0 has already been applied to many
feedstocks, in which case the pinning looks like

```yaml
host:
  - numpy   2.0    # [py==39]
  - numpy   2.0    # [py==310]
  - numpy   2.0    # [py==311]
  - numpy   2.0    # [py==312]
```

See the pinning repository for what the pinning corresponds to at time of writing
[https://github.com/conda-forge/conda-forge-pinning-feedstock/blob/main/recipe/conda_build_config.yaml#L742](https://github.com/conda-forge/conda-forge-pinning-feedstock/blob/main/recipe/conda_build_config.yaml#L742)

In either case, the actual runtime requirements are determined through numpy's
run-export, which is:

- `>=1.2x,<2` if you're building against numpy 1.2x
- `>=1.19,<3` if you're building against numpy 2.0
- `>=1.21,<3` if you're building against numpy 2.1 or 2.2

If the package you are building has a higher minimum requirement for numpy, please add this under `run`:

```yaml
host:
  # leave this unpinned!
  - numpy
run:
  - numpy >={{ the_lower_bound_your_package_needs }}
```

<a id="jupyterlab-extension"></a>

<a id="jupyterlab-extensions"></a>

### JupyterLab Extensions

A typical JupyterLab extension has both Python and JavaScript components.
These should be packaged together, to prevent node from being needing to
grab the JavaScript side of the package on the user's machine. To package
an extension, the build should have the following `meta.yaml` snippet:

```yaml
build:
  noarch: python


requirements:
  host:
    - python {{ python_min }}.*
    - nodejs
    - pip
  run:
    - python >={{ python_min }}
    - nodejs
    - jupyterlab >=2
```

Please use the following `build.sh` script in your recipe:

```bash
#!/usr/bin/env bash
set -ex

$PYTHON -m pip install . -vv
npm pack ${PKG_NAME}@${PKG_VERSION}
mkdir -p ${PREFIX}/share/jupyter/lab/extensions/js
cp ${PKG_NAME}-${PKG_VERSION}.tgz ${PREFIX}/share/jupyter/lab/extensions/js
```

Since this is a noarch recipe, the build script only needs to run on `linux-64`.
Also note that we do not need to run `jupyter labextension install` or
`jupyter lab build` as part of the package build or in any post-link scripts.
This is because JupyterLab will run the build step itself when it is next run.
The `${PREFIX}/share/jupyter/lab/extensions/js` directory which JupyterLab
knows to build from when performing this build step.

<a id="message-passing-interface-mpi"></a>

### Message passing interface (MPI)

:::note

This section originates from Min's notes: [https://hackmd.io/ry4uI0thTs2q_b4mAQd_qg](https://hackmd.io/ry4uI0thTs2q_b4mAQd_qg)

:::

<a id="mpi-variants-in-conda-forge"></a>

#### MPI Variants in conda-forge

How are MPI variants best handled in conda-forge?

There are a few broad cases:

- package requires a specific MPI provider (easy!)
- the package works with any MPI provider (e.g. mpich, openmpi)
- the package works with/without MPI

Note that sometimes users want to use packages in conda-forge built against
our MPI libraries but linked to external MPI libraries at runtime. If you are interested
in this procedure, see [Using External Message Passing Interface (MPI) Libraries](../user/tipsandtricks.md#using-external-message-passing-interface-mpi-libraries)
for details.

<a id="building-mpi-variants"></a>

#### Building MPI variants

In conda_build_config.yaml:

```yaml
mpi:
  - mpich
  - openmpi
```

In meta.yaml:

```yaml
requirements:
  host:
    - {{ mpi }}
```

And rerender with:

```bash
conda-smithy rerender -c auto
```

to produce the build matrices.

<a id="including-a-no-mpi-build"></a>

#### Including a no-mpi build

Some packages (e.g. hdf5) may want a no-mpi build, in addition to the mpi builds.
To do this, add nompi to the mpi matrix:

```yaml
mpi:
  - nompi
  - mpich
  - openmpi
```

and apply the appropriate conditionals in your build:

```yaml
requirements:
  host:
    - {{ mpi }}  # [mpi != 'nompi']
  run:
    - {{ mpi }}  # [mpi != 'nompi']
```

<a id="preferring-a-provider-usually-nompi"></a>

#### Preferring a provider (usually nompi)

Up to here, mpi providers have no explicit preference. When choosing an MPI provider, the mutual exclusivity of
the `mpi` metapackage allows picking between mpi providers by installing an mpi provider, e.g.

```bash
conda install mpich ptscotch
```

or

```bash
conda install openmpi ptscotch
```

This doesn't extend to `nompi`, because there is no `nompi` variant of the mpi metapackage. And there probably
shouldn't be, because some packages built with mpi don't preclude other packages in the env that _may_ have an mpi variant
from using the no-mpi variant of the library (e.g. for a long time, fenics used mpi with no-mpi hdf5 since there was no
parallel hdf5 yet. This works fine, though some features may not be available).

Typically, if there is a preference it will be for the serial build, such that installers/requirers of the package
only get the mpi build if explicitly requested. We use a higher build number for the `nompi` variant in this case.

Here is an example build section:

```yaml
{% if mpi == 'nompi' %}
# prioritize nompi variant via build number
{% set build = build + 100 %}
{% endif %}
build:
  number: {{ build }}

  # add build string so packages can depend on
  # mpi or nompi variants explicitly:
  # `pkg * mpi_mpich_*` for mpich
  # `pkg * mpi_*` for any mpi
  # `pkg * nompi_*` for no mpi

  {% if mpi != 'nompi' %}
  {% set mpi_prefix = "mpi_" + mpi %}
  {% else %}
  {% set mpi_prefix = "nompi" %}
  {% endif %}
  string: "{{ mpi_prefix }}_h{{ PKG_HASH }}_{{ build }}"
```

:::note

`{{ PKG_HASH }}` avoids build string collisions on _most_ variants,
but not on packages that are excluded from the default build string,
e.g. Python itself. If the package is built for multiple Python versions, use:

```yaml
string: "{{ mpi_prefix }}_py{{ py }}h{{ PKG_HASH }}_{{ build }}"
```

as seen in [mpi4py](https://github.com/conda-forge/h5py-feedstock/pull/49/commits/b08ee9307d16864e775f1a7f9dd10f25c83b5974)

:::

This build section creates the following packages:

- `pkg-x.y.z-mpi_mpich_h12345_0`
- `pkg-x.y.z-mpi_openmpi_h23456_0`
- `pkg-x.y.z-nompi_h34567_100`

Which has the following consequences:

- The `nompi` variant is preferred, and will be installed by default unless an mpi variant is explicitly requested.
- mpi variants can be explicitly requested with `pkg=*=mpi_{{ mpi }}_*`
- any mpi variant, ignoring provider, can be requested with `pkg=*=mpi_*`
- nompi variant can be explicitly requested with `pkg=*=nompi_*`

If building with this library creates a runtime dependency on the variant, the build string pinning can be added to `run_exports`.

For example, if building against the nompi variant will work with any installed version, but building with a
given mpi provider requires running with that mpi:

```yaml
build:
  ...
  {% if mpi != 'nompi' %}
  run_exports:
    - {{ name }} * {{ mpi_prefix }}_*
  {% endif %}
```

Remove the `if mpi...` condition if all variants should create a strict runtime dependency based on the variant
chosen at build time (i.e. if the nompi build cannot be run against the mpich build).

<a id="complete-example"></a>

#### Complete example

Combining all of the above, here is a complete recipe, with:

- nompi, mpich, openmpi variants
- run-exports to apply mpi choice made at build time to runtime where nompi builds can be run with mpi, but not vice versa.
- nompi variant is preferred by default
- only build nompi on Windows

This matches what is done in [hdf5](https://github.com/conda-forge/hdf5-feedstock/pull/90).

```yaml
# conda_build_config.yaml
mpi:
  - nompi
  - mpich  # [not win]
  - openmpi  # [not win]
```

```yaml
# meta.yaml
{% set name = 'pkg' %}
{% set build = 0 %}

# ensure mpi is defined (needed for conda-smithy recipe-lint)
{% set mpi = mpi or 'nompi' %}

{% if mpi == 'nompi' %}
# prioritize nompi variant via build number
{% set build = build + 100 %}
{% endif %}

build:
  number: {{ build }}

  # add build string so packages can depend on
  # mpi or nompi variants explicitly:
  # `pkg * mpi_mpich_*` for mpich
  # `pkg * mpi_*` for any mpi
  # `pkg * nompi_*` for no mpi

  {% if mpi != 'nompi' %}
  {% set mpi_prefix = "mpi_" + mpi %}
  {% else %}
  {% set mpi_prefix = "nompi" %}
  {% endif %}
  string: "{{ mpi_prefix }}_h{{ PKG_HASH }}_{{ build }}"

  {% if mpi != 'nompi' %}
  run_exports:
    - {{ name }} * {{ mpi_prefix }}_*
  {% endif %}

requirements:
  host:
    - {{ mpi }}  # [mpi != 'nompi']
  run:
    - {{ mpi }}  # [mpi != 'nompi']
```

And then a package that depends on this one can explicitly pick the appropriate mpi builds:

```yaml
# meta.yaml

requirements:
  host:
    - {{ mpi }}  # [mpi != 'nompi']
    - pkg
    - pkg * mpi_{{ mpi }}_*  # [mpi != 'nompi']
  run:
    - {{ mpi }}  # [mpi != 'nompi']
    - pkg * mpi_{{ mpi }}_*  # [mpi != 'nompi']
```

mpi-metapackage exclusivity allows `mpi_*` to resolve the same as `mpi_{{ mpi }}_*`
if `{{ mpi }}` is also a direct dependency, though it's probably nicer to be explicit.

<a id="just-mpi-example"></a>

#### Just mpi example

Without a preferred `nompi` variant, recipes that require mpi are much simpler. This is all that is needed:

```yaml
# conda_build_config.yaml
mpi:
  - mpich
  - openmpi
```

```yaml
# meta.yaml
requirements:
  host:
    - {{ mpi }}
  run:
    - {{ mpi }}
```

<a id="mpi-compiler-packages"></a>

#### MPI Compiler Packages

Do not use the `[openmpi,mpich]-[mpicc,mpicxx,mpifort]` metapackages in the `requirements/build` section
of a recipe; the MPI compiler wrappers are included in the main `openmpi`/`mpich` packages.
As shown above, just add `openmpi`/`mpich` to the `requirements/host` section and use compiler directives for the
corresponding compilers in `requirements/build` as normal.

<a id="openmp"></a>

### OpenMP

You can enable OpenMP on macOS by adding the `llvm-openmp` package to the `build` section of the `meta.yaml`.
For Linux OpenMP support is on by default, however it's better to explicitly depend on the libgomp package which is the OpenMP
implementation from the GNU project.

```yaml
# meta.yaml
requirements:
  build:
    - llvm-openmp  # [osx]
    - libgomp      # [linux]
```

<a id="switching-openmp-implementation"></a>

#### Switching OpenMP implementation

On macOS, only LLVM's OpenMP implementation `llvm-openmp` is supported. This implementation is used even in Fortran code compiled
using GNU's gfortran.

On Linux (except aarch64), packages are linked against GNU's `libgomp.so.1`, but the OpenMP library at install time can be
switched from GNU to LLVM by doing the following.

```shell-session
conda install _openmp_mutex=*=*_llvm
```

OpenMP library can be switched back to GNU's libgomp by doing the following.

```shell-session
conda install _openmp_mutex=*=*_gnu
```

:::note

OpenMP library switching is possible because LLVM's implementation has the symbol's from GNU in addition to the LLVM
ones (originally from Intel). An object file generated by `gcc`, `g++` or `gfortran` will have GNU's symbols and
therefore the underlying library can be switched.
However, an object file generated by `clang` or `clang++` will have LLVM's symbols and therefore the underlying
OpenMP library cannot be switched to GNU's library.

One reason you may wish to switch to LLVM is because the implementation is fork safe. One reason to keep using the
GNU implementation is that the OpenMP target offloading symbols in `libgomp` like `GOMP_target` are empty stubs
in LLVM and therefore does not work.

:::

<a id="yum-deps"></a>

<a id="yum-requirements-txt"></a>

### yum_requirements.txt

Dependencies can be installed into the build container with `yum`, by listing package names line by line in a file
named `yum_requirements.txt` in the `recipe` directory of a feedstock.

There are only very few situations where dependencies installed by yum are acceptable. These cases include

- satisfying the requirements of [CDT](../glossary.md#cdt) packages during test phase
- installing packages that are only required for testing

After changing `yum_requirements.txt`, [rerender](updating_pkgs.md#dev-update-rerender) to update the configuration.

<a id="knowledge-blas"></a>

<a id="blas"></a>

### BLAS

If a package needs one of BLAS, CBLAS, LAPACK, LAPACKE, use the following in the
host of the recipe,

```yaml
requirements:
  host:
    - libblas
    - libcblas
    - liblapack
    - liblapacke
```

:::note

You should specify only the libraries that the package needs. (i.e. if the package
doesn't need LAPACK, remove liblapack and liblapacke)

At recipe build time, above requirements would download the NETLIB's reference
implementations and build your recipe against those.
At runtime, by default the following packages will be used.

:::

```yaml
- openblas   # [not win]
- mkl        # [win]
```

If a package needs a specific implementation's internal API for more control you can have,

```yaml
requirements:
  host:
    # Keep mkl-devel here for pinning
    - mkl-devel         {{ blas_impl == "mkl" }}
    - {{ blas_impl }}   {{ blas_impl != "mkl" }}
  run:
    - libblas * *{{ blas_impl }}
    - {{ blas_impl }}
```

This would give you a matrix builds for different blas implementations. If you only want to support
a specific blas implementation,

```yaml
requirements:
  host:
    - openblas
  run:
    - libblas * *openblas
    - openblas
```

:::note

`blas_*` features should not be used anymore.

:::

<a id="switching-blas-implementation"></a>

#### Switching BLAS implementation

You can switch your BLAS implementation by doing,

```bash
conda install "libblas=*=*mkl"
conda install "libblas=*=*openblas"
conda install "libblas=*=*blis"
conda install "libblas=*=*accelerate"
conda install "libblas=*=*netlib"
```

This would change the BLAS implementation without changing the conda packages depending
on BLAS.

The following legacy commands are also supported as well.

```bash
conda install "blas=*=mkl"
conda install "blas=*=openblas"
conda install "blas=*=blis"
conda install "blas=*=accelerate"
conda install "blas=*=netlib"
```

:::note

If you want to commit to a specific blas implementation, you can prevent conda from switching back by pinning
the blas implementation in your environment. To commit to mkl, add `blas=*=mkl` to
`<conda-root>/envs/<env-name>/conda-meta/pinned`, as described in the
[conda-docs](https://docs.conda.io/projects/conda/en/stable/user-guide/tasks/manage-pkgs.html#preventing-packages-from-updating-pinning).

:::

<a id="how-it-works"></a>

#### How it works

At recipe build time, the netlib packages are used. This means that the downstream package will
link to `libblas.so.3` in the `libblas=*=*netlib` and will use only the reference
implementation's symbols.

`libblas` and `libcblas` versioning is based on the Reference LAPACK versioning which at the
time of writing is `3.8.0`. Since the BLAS API is stable, a downstream package will only pin to
`3.*` of `libblas` and `libcblas`. On the other hand, `liblapack` and `liblapacke` pins to
`3.8.*`.

In addition to the above netlib package, there are other variants like `libblas=*=*openblas`,
which has `openblas` as a dependency and has a symlink from `libblas.so.3` to `libopenblas.so`.
`libblas=3.8.0=*openblas` pins the `openblas` dependency to a version that is known to support the
BLAS `3.8.0` API. This means that, at install time, the user can select what BLAS implementation
they like without any knowledge of the version of the BLAS implementation needed.

### Microarchitecture-optimized builds {#microarch}

conda [virtual packages](../glossary.md#virtual-package) include `__archspec`, which expose the processor architecture to the solver. However, `__archspec` should not be used directly in recipes; instead, users should rely on the [`microarch-level`](https://github.com/conda-forge/microarch-level-feedstock) helper packages (contributed in [staged-recipes#24306](https://github.com/conda-forge/staged-recipes/pull/24306)).

Before learning how to use it, please read these considerations:

- Adding microarchitecture variants can result in too many entries in the build matrix. Do not overuse it.
- These optimized builds should only be used when the performance improvements are significant.
- Preferably, the project should rely on runtime dispatch for arch-specific optimizations.
- If the package is already too large, consider using smaller outputs for the arch-optimized variants.

To implement microarchitecture-optimized builds in your feedstock, you'll end up with something like:

```yaml title="recipe/conda_build_config.yaml"
microarch_level:
  - 1
  - 3  # [unix and x86_64]
  - 4  # [unix and x86_64]
```

```yaml title="recipe/meta.yaml"
# ...
{% set build = 0 %}

build:
  number: {{ build }}          # [not (unix and x86_64)]
  number: {{ build + 100 }}    # [unix and x86_64 and microarch_level == 1]
  number: {{ build + 300 }}    # [unix and x86_64 and microarch_level == 3]
  number: {{ build + 400 }}    # [unix and x86_64 and microarch_level == 4]

requirements:
  build:
    - x86_64-microarch-level {{ microarch_level }}  # [unix and x86_64]
    - {{ compiler('c') }}
    # ...
# ...
```

:::note[Prioritize your preferred microarchitecture]
The `run_exports` metadata is only set up with lower bounds to allow in-CI testing.
This means that `level=2` package can be installed in a `level=3` machine. Make sure
to assign a higher build number to the preferred microarchitecture (usually the highest level).
:::

That's it! The activation scripts behind the `microarch-level` packages are already injecting the necessary compiler flags for you. Since they also have `run_exports` entries, your
package will have the necessary runtime requirements to ensure the most adequate variant gets installed. Refer to [this comment](https://github.com/conda-forge/staged-recipes/pull/24306#issuecomment-1800095471) and the [`microarch-level-feedstock` README](https://github.com/conda-forge/microarch-level-feedstock) for more information.

<a id="knowledge-mpl"></a>

<a id="matplotlib"></a>

### Matplotlib

`matplotlib` on conda-forge comes in two parts. The core library is in `matplotlib-base`. The
actual `matplotlib` package is this core library plus `pyqt`. Most, if not all, packages that have
dependence at runtime on `matplotlib` should list this dependence as `matplotlib-base` unless they
explicitly need `pyqt`. The idea is that a user installing `matplotlib` explicitly would get a full
featured installation with `pyqt`. However, `pyqt` is a rather large package, so not requiring it
indirectly is better for performance. Note that you may need to include a `yum_requirements.txt` file
in your recipe with

```bash
xorg-x11-server-Xorg
```

if you import parts of `matplotlib` that link to `libX11`.

<a id="pybind11-abi-constraints"></a>

### `pybind11` ABI Constraints

Sometimes when different python libraries using `pybind11` interact via lower-level C++ interfaces,
the underlying ABI between the two libraries has to match. To ease this use case, we have a `pybind11-abi`
metapackage that can be used in the `host` section of a build. Its version is pinned globally and it has a
run export on itself, meaning that builds with this package in `host` will have a runtime constraint on it.
Further, the `pybind11` has a run constraint on the ABI metapackage to help ensure consistent usage.

To use this package in a build, put it in the host environment like so

```yaml
requirements:
  host:
    - pybind11-abi
```

<a id="knowledge-empty"></a>

<a id="empty-python-packages"></a>

### Empty Python packages

For some features introduced in later Python versions, the Python community creates backports, which makes these
features available for earlier versions of Python as well.
One example here is [dataclasses](https://www.python.org/dev/peps/pep-0557/) which was introduced with
Python3.7 but is available as a [backport](https://github.com/ericvsmith/dataclasses) for Python3.6 too.
Therefore, most upstream packages make those backports only mandatory for specific versions of Python and exclude them otherwise.

Implementing this restriction in conda-forge is currently only possible through the use of `skips`
which restricts the corresponding conda-forge recipes from becoming `noarch`.

Therefore, some conda-forge recipes only create an actual package on specific Python versions and are otherwise an
empty placeholder. This allows them to be safely installed under all Python versions and makes using `skips` unnecessary.

Similarly, some packages are only platform-specific dependency of a package, such as `pywin32`, and have
helper metapackages which can help recipes stay `noarch`. The version of the actual package required
can be controlled with `run_constrained`, even for packages not available on all platforms.

Currently available packages:

| Name               | Available on:      | Empty on:     |
| ------------------ | ------------------ | ------------- |
| backports.strenum  | python >=3.8,<3.11 | python >=3.12 |
| dataclasses        | python >=3.6,<3.7  | python >=3.7  |
| enum34             | python =2.7        | python >=3.4  |
| pywin32-on-windows | windows            | unix          |
| typing             |                    | python >=3    |

<a id="knowledge-all-installs"></a>

<a id="non-version-specific-python-packages"></a>

### Non-version-specific Python packages

For some dependencies, upstream maintainers list Python versions where those packages are needed,
even if the packages can actually be installed under all Python versions.

Implementing this restriction in conda-forge is currently only possible through the use of `skips`
which restricts the corresponding conda-forge recipes from becoming `noarch`.

Therefore, the conda-forge community maintains a list of packages that are safe to be installed under all Python versions,
even if the original package only requires it for some versions.

For example, the package [pyquil](https://github.com/rigetti/pyquil) only
[requires](https://github.com/rigetti/pyquil/blob/497791e8108d8780109d75410be786c5f6e590ea/pyproject.toml#L30) `importlib-metadata` for `python <3.8` but it is actually safe to be installed under `python >=3.8` as well.

Currently available packages:

- exceptiongroup
- importlib-metadata

<a id="noarch-builds"></a>

## Noarch builds

Noarch packages are packages that are not architecture specific and therefore only have to be built once.

Declaring these packages as `noarch` in the `build` section of the meta.yaml, reduces shared CI resources.
Therefore all packages that qualify to be noarch packages should be declared as such.

<a id="noarch"></a>

<a id="noarch-python"></a>

### Noarch python

The `noarch: python` directive, in the `build` section, makes pure-Python
packages that only need to be built once.

In order to qualify as a noarch python package, all of the following criteria must be fulfilled:

- No compiled extensions
- No post-link or pre-link or pre-unlink scripts
- No OS-specific build scripts
- No python version specific requirements
- No skips except for python version. If the recipe is py3 only, remove skip
  statement and add version constraint on python in `host` and `run`
  section.
- `2to3` is not used
- `scripts` argument in `setup.py` is not used
- If `console_scripts` `entry_points` are defined in `setup.py` or `setup.cfg`, they are also
  [listed](https://conda.io/projects/conda-build/en/stable/resources/define-metadata.html#python-entry-points)
  in the `build` section of `meta.yaml`
- No activate scripts

All recipes employing `noarch: python` should usually use the `python_min` variable per the following example:

```yaml title="recipe/meta.yaml"
name: package
source:
  # ...
build:
  noarch: python
  # ...
requirements:
  host:
    - python {{ python_min }}
    # ...
  run:
    - python >={{ python_min }}
    # ...

test:
  requires:
    - python {{ python_min }}
    # ...
```

See [CFEP-25](https://github.com/conda-forge/cfep/blob/main/cfep-25.md) for more details on this syntax. If you
need to override this syntax, you can add a Jinja2 `set` statement (or equivalent `context` variable for v1 recipes)
at the top of your recipe like this

```yaml title="recipe/meta.yaml"
{% set python_min = "3.10" %}
```

It also possible to achieve the same effect by adding a `conda_build_config.yaml` file to your recipe that
contains a map like

```yaml title="recipe/conda_build_config.yaml"
python_min:
- "3.10"
```

If you go that route, you will need to [rerender the feedstock](../infrastructure/#conda-forge-admin-please-rerender)
after adding the `conda_build_config.yaml` file.

Using `noarch: python` packages, with `python {{ python_min }}` pins in their `test.requires` section, as
`downstream` tests can cause failures for the `upstream` package if the Python version required for the test
conflicts with `upstream` package's Python version. There are two fixes, depending on what is more important.

1. Constrain the `downstream` tests in the `upstream` package to only run on `python_min`.
2. Remove the `python_min` requirement from the `downstream` package's test requirements.

More or less, you prefer the first solution when testing the `downstream` package on `python_min` is the most important thing. You prefer the second solution when testing all Python versions of the `upstream` package with the `downstream` package is the most important thing.

:::tip[Hint]

Adding an explicit `python_min` to your `noarch: python` recipe can be an effective way to ensure the required
Python in your package's metadata is enforced at `conda-build` time, as the build will fail if the package's
required Python version is newer than `python_min`.

:::

:::note

While `noarch: python` does not work with selectors, it does work with version constraints.
`skip: True  # [py2k]` can be replaced with a constrained python version in the host and run subsections:
say `python >=3` instead of just `python`.

:::

:::note

Only `console_scripts` entry points have to be listed in `meta.yaml`. Other entry points do not conflict
with `noarch` and therefore do not require extra treatment.

:::

:::note

`noarch` is a statement about the package's source code and not its install environment. A package is still considered
`noarch` even if one of its dependencies is not available on a given platform. If this is the case, conda will
display a helpful error message describing which dependency couldn't be found when it tries to install the package.
If the dependency is later made available, your package will be installable on that platform without having to make
any changes to the feedstock.

By default, `noarch` packages are built on Linux, and all dependencies must be available on Linux.

:::

:::tip[Hint]

If a `noarch` package cannot be built on Linux, one or more `noarch_platforms` can be provided in
`conda-forge.yml`. One example is [pywin32-on-windows](https://github.com/conda-forge/pywin32-on-windows-feedstock),
which builds on Linux and Windows, with `build_number` offsets to create a pair packages, like
`dataclasses`.

:::

:::tip[Hint]

You can build platform-specific `noarch` packages to include runtime requirements depending on the target OS.
See mini-tutorial below.

:::

If an existing python package qualifies to be converted to a noarch package, you can request the required changes
by opening a new issue and including `@conda-forge-admin, please add noarch: python`.

<a id="os-specific-noarch"></a>

<a id="noarch-packages-with-os-specific-dependencies"></a>

#### Noarch packages with OS-specific dependencies

It is possible to build `noarch` packages with runtime requirements that depend on the target OS
(Linux, Windows, MacOS), regardless the architecture (amd64, ARM, PowerPC, etc). This approach
relies on three concepts:

1. [Virtual packages](https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-virtual.html).
   Prefixed with a double underscore, they are used by conda to represent system properties as
   constraints for the solver at install-time. We will use `__linux`, `__win` or `__osx`,
   which are only present when the running platform is Linux, Windows, or MacOS, respectively.
   `__unix` is present in both Linux and MacOS. Note that this feature is **only fully available
   on conda 4.10 or above**.
2. `conda-forge.yml`'s [noarch_platforms](conda_forge_yml.mdx#noarch-platforms) option.
3. **conda-build 3.25.0 or above** changing the build hash depending on virtual packages used.

The idea is to generate different noarch packages for each OS needing different dependencies.
Let's say you have a pure Python package, perfectly eligible for `noarch: python`, but on Windows
it requires `windows-only-dependency`. You might have something like:

```yaml title="recipe/meta.yaml (original)"
name: package
source:
  # ...
build:
  number: 0
requirements:
  # ...
  run:
    - python
    - numpy
    - windows-only-dependency  # [win]
```

Being non-noarch, this means that the build matrix will include at least 12 outputs: three platforms,
times four Python versions. This gets worse with `arm64`, `aarch64` and `ppc64le` in the mix.
We can get it down to two outputs if replace it with this other approach!

```yaml title="recipe/meta.yaml (modified)"
name: package
source:
  # ...
build:
  number: 0
  noarch: python
requirements:
  host:
    - python {{ python_min }}.*
    # ...
  run:
    - python >={{ python_min }}
    - numpy
    - __unix  # [unix]
    - __win   # [win]
    - windows-only-dependency  # [win]
```

Do not forget to specify the platform virtual packages with their selectors!
Otherwise, the solver will not be able to choose the variants correctly.

By default, conda-forge will only build `noarch` packages on a `linux_64` CI runner, so
only the `# [unix]` selectors would be true. However, we can change this behaviour using
the `noarch_platforms` option in `conda-forge.yml`:

```yaml title="conda-forge.yml"
noarch_platforms:
  - linux_64
  - win_64
```

This will provide two runners per package! Perfect! All these changes require a
feedstock rerender to be applied. See [Rerendering feedstocks](updating_pkgs.md#dev-update-rerender).

If you need conditional dependencies on all three operating systems, this is how you do it:

```yaml title="recipe/meta.yaml"
name: package
source:
  # ...
build:
  number: 0
  noarch: python
requirements:
  # ...
  run:
    - python >={{ python_min }}
    - numpy
    - __linux  # [linux]
    - __osx    # [osx]
    - __win    # [win]
    - linux-only-dependency    # [linux]
    - osx-only-dependency      # [osx]
    - windows-only-dependency  # [win]
```

```yaml title="conda-forge.yml"
noarch_platforms:
  - linux_64
  - osx_64
  - win_64
```

Again, remember to rerender after adding / modifying these files so the changes are applied.

<a id="noarch-generic"></a>

### Noarch generic

:::info[Todo]

add some information on r packages which make heavy use of `noarch: generic`

:::

## Multi-output recipes

`conda-build` has the ability to create multiple package artifacts from a single recipe via the `outputs` section in `meta.yaml`. This is useful in several scenarios, including:

- Distributing a project (which share the same source code) in separate artifacts. For example:
  - A compiled C++ library and its Python bindings:
    - [mamba-feedstock](https://github.com/conda-forge/mamba-feedstock/blob/main/recipe/meta.yaml)
  - A runtime library and its headers:
    - [cpp-opentelemetry-sdk](https://github.com/conda-forge/cpp-opentelemetry-sdk-feedstock/blob/main/recipe/meta.yaml)
  - A dynamic library and a static version:
    - [libarchive](https://github.com/conda-forge/libarchive-feedstock/blob/main/recipe/meta.yaml)
- Distributing the same project with different sets of dependencies. For example:
  - The project with the minimal dependencies to run, and a separate output that extends that list:
    - [geopandas-base and geopandas](https://github.com/conda-forge/geopandas-feedstock/blob/main/recipe/meta.yaml)
    - [matplotlib-base and matplotlib](https://github.com/conda-forge/matplotlib-feedstock/blob/main/recipe/meta.yaml)
  - CPU vs GPU versions of a package (this can also be done with package variants):
    - [pytorch-cpu, pytorch-gpu and pytorch](https://github.com/conda-forge/pytorch-cpu-feedstock/blob/main/recipe/meta.yaml)
  - A package with different strictness levels for its dependencies:
    - [opencv](https://github.com/conda-forge/opencv-feedstock/blob/main/recipe/meta.yaml)
- Distributing the same project under two different names (alias packags). For example:
  - A package that changed names but wants to keep existing users up-to-date:
  - A package that uses dashes and underscores and expects users to use either:
    - [importlib_metadata and importlib-metadata](https://github.com/conda-forge/importlib_metadata-feedstock/blob/main/recipe/meta.yaml)
    - [typing_extensions and typing-extensions](https://github.com/conda-forge/typing_extensions-feedstock/blob/main/recipe/meta.yaml)

### Common pitfalls with `outputs`

This is a non-exhaustive list of common pitfalls when using `outputs`.

- It's usually simpler to use a top-level name that does not match any output names. If the top-level name is different than the feedstock name, make sure to set the `extra.feedstock-name` in `meta.yaml`. See [rich-feedstock](https://github.com/conda-forge/rich-feedstock/blob/0d745692c1bcf/recipe/meta.yaml#L110-L111). Note how the top-level name is `rich-split`, the feedstock name is `rich` and the main output is `rich` too.
- The `build.sh` and `bld.bat` scripts are only automatically used for the top-level package. Consider using other file names for the scripts in the outputs. See [gdal-feedstock](https://github.com/conda-forge/gdal-feedstock/blob/66ba0a2284476/recipe/meta.yaml#L70-L73) for an example.
- The `outputs[].script` field can only be set to a script name. If you prefer passing shell commands, you have to use `outputs[].build.script`. Compare [geopandas-feedstock](https://github.com/conda-forge/geopandas-feedstock/blob/8b985635a8538af1ee213900bd563085e3cdbd92/recipe/meta.yaml#L17) to [gym-feedstock](https://github.com/conda-forge/gym-feedstock/blob/2b47e0479923b7d49a39e9860ba30a28e263480b/recipe/meta.yaml#L31), respectively.
- Some `PIP_*` environment variables that are usually set for the top-level scripts are not automatically set for the outputs. If you are invoking `pip` in an output, you may need to pass additional flags. See [napari-feedstock](https://github.com/conda-forge/napari-feedstock/blob/32a4eb04ca7b6ccd2c4e146bde204f1dd5425a17/recipe/meta.yaml#L26). This issue is tracked in [conda/conda-build#3993](https://github.com/conda/conda-build/issues/3993).

<a id="build-matrices"></a>

## Build matrices

Currently, `python, vc, r-base` will create a matrix of jobs for each supported version. If `python` is only a
build dependency and not a runtime dependency (eg: build script of the package is written in Python, but the
package is not dependent on Python), use `build` section

Following implies that `python` is only a build dependency and no Python matrix will be created.

```yaml
build:
  - python
host:
  - some_other_package
```

Note that `host` should be non-empty or `compiler` jinja syntax used or `build/merge_build_host` set to
True for the `build` section to be treated as different from `host`.

Following implies that `python` is a runtime dependency and a Python matrix for each supported Python version will be created.

```yaml
host:
  - python
```

`conda-forge.yml`'s build matrices is removed in conda-smithy=3. To get a build matrix,
create a `conda_build_config.yaml` file inside the recipe folder. For example, the following will give you 2
builds and you can use the selector `vtk_with_osmesa` in the `meta.yaml`

```yaml
vtk_with_osmesa:
  - False
  - True
```

You need to rerender the feedstock after this change.

<a id="requiring-newer-macos-sdks"></a>

## Requiring newer macOS SDKs

conda-forge uses macOS SDK 10.13 to build software so that they can be deployed to
all macOS versions newer than 10.13. Sometimes, some packages require a newer SDK
to build with. While the default version 10.13 can be overridden using the following
changes to the recipe, it should be done as a last resort. Please consult with
core team if this is something you think you need.

To use a new SDK, add the following in `recipe/conda_build_config.yaml`

```yaml
# Please consult conda-forge/core before doing this
MACOSX_SDK_VERSION:        # [osx and x86_64]
  - "10.15"                # [osx and x86_64]
```

Note that this should be done if the error you are getting says that a header is not
found or a macro is not defined. This will make your package compile with a newer SDK
but with `10.13` as the deployment target.
WARNING: some packages might use features from `10.15` if you do the above due to
buggy symbol availability checks. For example packages looking for `clock_gettime`
will see it as it will be a weak symbol, but the package might not have a codepath
to handle the weak symbol, in that case, you need to update the `c_stdlib_version`
(previously `MACOSX_DEPLOYMENT_TARGET`) as described below.

After increasing the SDK version, if you are getting an error that says that a function
is available only for macOS x.x, then do the following in `recipe/conda_build_config.yaml`,

```yaml
# Please consult conda-forge/core before doing this
c_stdlib_version:          # [osx and x86_64]
  - "10.15"                # [osx and x86_64]
MACOSX_SDK_VERSION:        # [osx and x86_64]
  - "10.15"                # [osx and x86_64]
```

In `recipe/meta.yaml`, add the following to ensure that the user's system is compatible.

```yaml
requirements:
  build:
    - {{ stdlib("c") }}
```

Note that the run-export on `__osx` that's produced by the stdlib metapackages
requires `conda>=4.8`.

<a id="newer-c-features-with-old-sdk"></a>

### Newer C++ features with old SDK

The libc++ library uses Clang availability annotations to mark certain symbols as
unavailable when targeting versions of macOS that ship with a system libc++
that do not contain them. Clang always assumes that the system libc++ is used.

The conda-forge build infrastructure targets macOS 10.13 and some newer C++ features
such as `fs::path` are marked as unavailable on that platform, so the build aborts:

```bash
...
error: 'path' is unavailable: introduced in macOS 10.15
...
note: 'path' has been explicitly marked unavailable here
class _LIBCPP_TYPE_VIS path {
```

However, since conda-forge ships its own (modern) libcxx we can ignore these checks
because these symbols are in fact available. To do so, add
`_LIBCPP_DISABLE_AVAILABILITY` to the defines. For example

```bash
CXXFLAGS="${CXXFLAGS} -D_LIBCPP_DISABLE_AVAILABILITY"
```

<a id="pypy-builds"></a>

## PyPy builds

See [Using PyPy as an interpreter](../user/tipsandtricks.md#pypy) in the user docs for more info about PyPy and conda-forge.

To build your python package for pypy, wait for the bot to send a
PR and contact `conda-forge/bot` team if a PR is not sent after the
dependencies have been built.

To add a dependency just for pypy or cpython, do,

```yaml
requirements:
  run:
    - spam           # [python_impl == 'cpython']
    - ham            # [python_impl == 'pypy']
```

:::note

You'll need to rerender the feedstocks after making the above
change in order for the `python_impl` variable to be available to
conda-build

:::

To skip the pypy builds, do the following,

```yaml
build:
  skip: True         # [python_impl == 'pypy']
```

If something is failing the PyPy build when it passes the CPython one, reach
out to @conda-forge/help-pypy.

<a id="using-setuptools-scm"></a>

## Using setuptools_scm

The Python module [setuptools_scm](https://github.com/pypa/setuptools_scm)
can be used to manage a package's version automatically from metadata, such as git tags.
The package's version string is thus not specified anywhere in the package,
but encoded in it at install-time.

For conda-build this means that `setuptools_scm` must be included as a `host` dependency.
Additionally, some attention because the metadata is often not available in the sources.
There are two options for how to proceed:

- For Python package also available on PyPI:
  Use the PyPi tarball as a source, as it will have the metadata encoded
  (in such a way that `setuptools_scm` knows how to find it).
- Specify the environment variable `SETUPTOOLS_SCM_PRETEND_VERSION` with the version string.
  If specified this environment variable is the principle source for `setuptools_scm`.
  There are two ways how to do this:

  - If you are using build scripts, in `build.sh` specify:

    ```bash
    export SETUPTOOLS_SCM_PRETEND_VERSION="$PKG_VERSION"
    ```

    and in `bld.bat` specify:

    ```bash
    set SETUPTOOLS_SCM_PRETEND_VERSION=%PKG_VERSION%
    ```

    Whereby you use that `PKG_VERSION` has been set with the version string,
    see [Environment variables](https://docs.conda.io/projects/conda-build/en/stable/user-guide/environment-variables.html#env-vars).

  - Otherwise, if you are directly building from `meta.yaml`, use for example:
    ```yaml
    build:
      # [...]
      script_env:
        - SETUPTOOLS_SCM_PRETEND_VERSION={{version}}
      script: "{{ PYTHON }} -m pip install . -vv"
    ```

<a id="centos7"></a>

<a id="using-centos-7"></a>

## Requiring newer `glibc` versions

Conda-forge aims to build for as many users as possible, which means
that we target `glibc 2.17` from CentOS 7, which allows packages to be
installed on essentially any linux system (newer than 2014).

However, some feedstocks may already require newer `glibc` versions.
To use the newer `sysroot` with `glibc` `2.28` or `2.34` on `linux`,
put the following in your build section.

```yaml
requirements:
  build:
    - {{ compiler('c') }}
    - {{ stdlib('c') }}
```

and add the following to `recipe/conda_build_config.yaml`:

```yaml
c_stdlib_version:          # [linux]
  - "2.28"                 # [linux]
```

This covers the headers/library present at build-time, and will also create
a corresponding run-export on the `__glibc` virtual package.

By default, conda-forge build infrastructure uses old sysroots on new images, meaning that
the `glibc` present in the docker image is not what we compile against. This has
several advantages, and also means that generally you don't have to concern
yourself with changing the image manually.

However, if for some reason you want to override the image versions, you can do so
by setting the following in the `conda-forge.yml` of your recipe and rerendering.

```yaml
os_version:             # example of possible values
  linux_64: cos7
  linux_aarch64: alma8
  linux_ppc64le: alma9
```

In the exceptional case that a feedstock does _binary repackaging_ (i.e. no
compilation from source), please ensure that you use the oldest-possible image,
matching the `c_stdlib_version` of your recipe. For example, if you use the
default `c_stdlib_version` of `2.17`, then set `os_version: linux_*: cos7`;
if you're using a `c_stdlib_version` of `2.28`, set it to `alma8`.

<a id="cuda"></a>

<a id="cuda-builds"></a>

## CUDA builds

Although the provisioned CI machines do not feature a GPU, conda-forge does provide mechanisms
to build CUDA-enabled packages.
See the [guide for maintainers of recipes that use CUDA](https://github.com/conda-forge/cuda-feedstock/blob/main/recipe/doc/recipe_guide.md)
for more information.
If a feedstock does need access to additional resources (like GPUs), please see the following
[section](#packages-that-require-a-gpu-or-long-running-builds).

<a id="common-problems-and-known-issues"></a>

### Common problems and known issues

<a id="nvcuda-dll-cannot-be-found-on-windows"></a>

#### `nvcuda.dll` cannot be found on Windows

The [scripts](https://github.com/conda-forge/conda-forge-ci-setup-feedstock/blob/master/recipe/install_cuda.bat)
used to install the CUDA Toolkit on Windows cannot provide `nvcuda.dll`
as part of the installation because no GPU is physically present in the CI machines.
As a result, you might get linking errors in the postprocessing steps of `conda build`:

```default
WARNING (arrow-cpp,Library/bin/arrow_cuda.dll): $RPATH/nvcuda.dll not found in packages,
sysroot(s) nor the missing_dso_whitelist.

.. is this binary repackaging?
```

For now, you will have to add `nvcuda.dll` to the `missing_dso_whitelist`

```yaml
build:
  ...
  missing_dso_whitelist:
    - "*/nvcuda.dll"   # [win]
```

<a id="my-feedstock-is-not-building-old-cuda-versions-anymore"></a>

#### My feedstock is not building old CUDA versions anymore

As new CUDA versions come out regularly, periodically conda-forge needs to
decide how many versions will be supported within resource constraints.
As of January 2025, conda-forge supports CUDA 11 and 12.

To update to the latest supported versions [rerender the feedstock](updating_pkgs.md#dev-update-rerender).
There may be other fixes needed for the feedstock depending on when it was last updated.

<a id="opengpuserver"></a>

<a id="packages-that-require-a-gpu-or-long-running-builds"></a>

## Packages that require a GPU or long-running builds

conda-forge has access to [an OpenStack server](https://github.com/Quansight/open-gpu-server) that provides GPU builds and long-running builds (beyond the usual 6h limit).
If your package needs a GPU to be built or tested, or its compilation times are so long that they are currently done manually off-CI, you can request access to these runners.
To do so:

1. Open a PR in [conda-forge/admin-requests](https://github.com/conda-forge/admin-requests). Follow the instructions in the repository README.
   Note you need to request the type of resource you want access to (e.g. GPU runners, or long-running CPU builds)
   Once merged, this will enable the self-hosted Github Actions runners for your feedstock.
2. In order to trigger jobs for these runners, the maintainer must have read and agreed to the open-gpu-server [terms of use](https://github.com/Quansight/open-gpu-server/blob/main/TOS.md).
   You will need to open a PR in the open-gpu-server repository, as instructed in their README.
   You only need to do this once per maintainer (e.g. if you maintain multiple feedstocks).
3. Finally, you can configure your feedstock to use the self-hosted runners. A PR will have been created by admin-requests after the PR in step (1) is merged.
   However, due to security measurements imposed by Github, automated re-rendering is not possible when they modify Github Actions workflows.
   You will need to rerender it manually by running `conda-smithy rerender` in your machine and then commit and push the result.

:::note

Due to some technical and legal limitations, some of the usual automation infrastructure is not available for these runners.
As mentioned above, the conda-forge bots won't be able to rerender your feedstock automatically anymore.
Automerge will not function properly either. Also note that the conda-forge bots won't be able to trigger the self-hosted runners.
Closing and reopening the PR won't work, but a maintainer with sufficient permissions can trigger it manually by pushing an empty commit.

:::

<a id="osxarm64"></a>

<a id="apple-silicon-builds"></a>

## Apple Silicon builds

The new Apple M1 processor is the first Apple Silicon supported by conda-forge
[osx-arm64](https://github.com/conda-forge/conda-forge.github.io/issues/1126) builds.
For new builds to be available, via [cross-compilation](#cross-compilation), a migration is required for
the package and its dependencies. These builds are experimental as many of them are untested.

To request a migration for a particular package and all its dependencies:

1. It may be that your package is already in the process of being migrated. Please check
   the status of the
   [arm osx addition migration](https://conda-forge.org/status/#armosxaddition).
   If your package is already in the process of being migrated, it will appear
   under the appropriate heading (done, in-pr, awaiting-parents, etc.).
2. Check the feedstock in question to see if there is already an issue or pull request.
   Opening an issue here is fine, as it might take a couple iterations of the below,
   especially if many dependencies need to be built as well.
3. If nothing is under way, look at the current [conda-forge-pinning](https://github.com/conda-forge/conda-forge-pinning-feedstock/blob/master/recipe/migrations/osx_arm64.txt).
4. If the package is not listed there, make a PR, adding the package
   name to a random location in `osx_arm64.txt`.
   The migration bot should start making automated pull requests to the
   repo and its dependencies.
5. Within a few hours, the [status page](https://conda-forge.org/status/#armosxaddition)
   should reflect the progress of the package in question, and help you keep track
   of progress. Help out if you can!
6. The feedstock maintainers (who might not have an M1) will work to make
   any changes required to pass continuous integration. If you have insight into
   the particular package, **please** chime in, but most of all **be patient and polite**.
7. Once the new builds are available from `anaconda.org`, please help the maintainers
   by testing the packages, and reporting back with any problems… but also successes!

<a id="pre-release-builds"></a>

## Pre-release builds

Recipe maintainers can make pre-release builds available on
conda-forge by adding them to the `dev` or `rc` label.

The semantics of these labels should generally follow the
[guidelines](https://devguide.python.org/developer-workflow/development-cycle/index.html#stages) that Python
itself follows.

- `rc`: [Beta](https://devguide.python.org/developer-workflow/development-cycle/index.html#beta) and [Release
  Candidate](https://devguide.python.org/developer-workflow/development-cycle/index.html#release-candidate-rc)
  (RC). No new features. Bugfix only.
- `dev`: [Pre-Alpha](https://devguide.python.org/developer-workflow/development-cycle/index.html#pre-alpha)
  and [Alpha](https://devguide.python.org/developer-workflow/development-cycle/index.html#alpha). These are
  still packages that could see substantial changes
  between the dev version and the final release.

:::note

`alpha` and `beta` labels aren't used. Given the light usage of labels on the conda-forge
channel thus far, it seems rather unnecessary to introduce many labels.
`dev` and `rc` seem like a nice compromise.

:::

:::note

Certain packages (for example [black](https://pypi.org/project/black/#history)) follow
a release cycle in which they have never had a non-beta/alpha release. In these cases
the conda packages for those do _not_ need to be published to a prerelease label.

:::

<a id="creating-a-pre-release-build"></a>

### Creating a pre-release build

To create a `dev` or `rc` package, a PR can be issued into the `dev` or `rc` branch of the
feedstock.
This branch must change the `recipe/conda_build_config.yaml` file to point to the `<package_name>_dev` or `<package_name>_rc` label.

For example, matplotlib rc releases would include:

```yaml
channel_targets:
  - conda-forge matplotlib_rc
```

If a pre-release build of B depends on a pre-release build of A, then A should have,

```yaml
channel_targets:
  - conda-forge A_rc
```

while B should have,

```yaml
channel_sources:
  - conda-forge/label/A_rc,conda-forge
channel_targets:
  - conda-forge B_rc
```

in `recipe/conda_build_config.yaml` in their respective feedstocks.

:::note

A rerender needs to happen for these changes to reflect in CI files. The channel_targets entries map

- <channel target> <label target> pairs for use in the post-build upload step.

:::

<a id="installing-a-pre-release-build"></a>

### Installing a pre-release build

<a id="using-the-conda-cli"></a>

#### Using the conda CLI

Use the following command, but replace `PACKAGE_NAME` with the package you want
to install and replace `LABEL` with `rc` or `dev`:

```yaml
conda install -c conda-forge/label/PACKAGE_NAME_LABEL -c conda-forge PACKAGE_NAME
```

For example, let's install matplotlib from the `rc` label:

```yaml
conda install -c conda-forge/label/matplotlib_rc -c conda-forge matplotlib
```

<a id="using-environment-yml"></a>

#### Using environment.yml

Use [MatchSpec](https://github.com/conda/conda/blob/c3fb8150ed4c3dabb7ca376ade208095f98ee0b9/conda/models/match_spec.py#L70-L150)
to specify your package:

```yaml
dependencies:
  - conda-forge/label/matplotlib_rc::matplotlib=3.7.0rc1
```

Alternately, you can use the channels section to enable the matplotlib_rc channel:

```yaml
channels:
  - conda-forge/label/matplotlib_rc
dependencies:
  - matplotlib=3.7.0.rc1
```

<a id="pre-release-version-sorting"></a>

### Pre-release version sorting

If you wish to add numbers to your `dev` or `rc` build, you should follow the
[guidelines](https://docs.conda.io/projects/conda/en/stable/user-guide/concepts/pkg-specs.html#version-ordering) put
forth by Continuum regarding version sorting in `conda`. Also see the [source
code for conda
4.2.13](https://github.com/conda/conda/blob/4.2.13/conda/version.py#L93-L119).
The tl;dr here is that conda sorts as follows:

```default
< 1.0
< 1.1dev1    # special case 'dev'
< 1.1.0dev1  # special case 'dev'
== 1.1.dev1   # 0 is inserted before string
< 1.1.0rc1
< 1.1.0
```

So make sure that you **tag** your package in such a way that the package name
that conda-build spits out will sort the package uploaded with an `rc` label
higher than the package uploaded with the `dev` label.

<a id="how-to-update-your-feedstock-token"></a>

## How to update your feedstock token?

To reset your feedstock token and fix issues with uploads, follow these steps:

1. Go to the `conda-forge/admin-requests` repo and copy [examples/example-token-reset.yml](https://github.com/conda-forge/admin-requests/blob/main/examples/example-token-reset.yml) to the `requests/` folder.
2. Add the name of your feedstock in the YML file. While adding the name, don't add "-feedstock" to the end of it. For example: for `python-feedstock`, just add `python`.

<a id="using-arch-rebuild"></a>

<a id="using-arch-rebuild-txt"></a>

## Using `arch_rebuild.txt`

You can add a feedstock to `arch_rebuild.txt` if it requires rebuilding with different architectures/platforms (such as `ppc64le` or `aarch64`).
Check the [migration status](https://conda-forge.org/status/#aarch64andppc64leaddition) to see if your package is already in the queue to get migrated.
If not, you can add the feedstock to `arch_rebuild.txt` by opening a PR to the [conda-forge-pinning-feedstock repository](https://github.com/conda-forge/conda-forge-pinning-feedstock).
Once the PR is merged, the migration bot goes through the list of feedstocks in `arch_rebuild.txt` and opens a migration PR for any new feedstocks and their dependencies, enabling the aarch64/ppc64le builds.

<a id="migrations-and-migrators"></a>

<a id="migrators-and-migrations"></a>

## Migrators and Migrations

When any changes are made in the global pinnings of a package, then the entire stack of the packages that need that package on their `host` section would need to be updated and rebuilt.
Doing it manually can be quite tedious, and that's where migrations come to help. Migrations automate the process of submitting changes to a feedstock and are an integral part of the `regro-cf-autotick-bot`'s duties.

There are several kinds of migrations, which you can read about in [Making Migrators](https://github.com/regro/cf-scripts/blob/master/README.md#making-migrators). To generate these migrations, you use migrators, which are bots that automatically create pull requests for the affected packages in conda-forge.
To propose a migration in one or more pins, the migrator issues a PR into the pinning feedstock using a yaml file expressing the changes to the global pinning file in the migrations folder.
Once the PR is merged, the dependency graph is built. After that, the bot walks through the graph, migrates all the nodes (feedstocks) one by one, and issues PRs for those feedstocks.

Usually, the bot generates these migrations automatically. However, when a pin is first made or added, one may need to be added by hand. To do this, you can follow the steps mentioned in [Updating package pins](pinning_deps.md#update-pins).

The way migrations proceed are:

> 1. You make a PR into the `migrations` folder in the [conda-forge-pinning-feedstock](https://github.com/conda-forge/conda-forge-pinning-feedstock) with a new yaml file representing the migration.
> 2. Once the PR is merged, the bot picks it up, builds a migrator graph, and begins the migration process.
> 3. A migration PR is issued for a node (a feedstock) only if:

>     - The node depends on the changed pinnings.
>     - The node has no dependencies that depend on the new pinnings and have not been migrated.
>
> 1. Process 3 continues until the migration is complete and the change is applied to the global pinning file via a final PR. After this step, we say this migration is closed out.

Sometimes, you might get a migration PR for your package that you don't want to merge. In that case, you should put that PR in draft status but should never close it.
If you close the PR, it makes the bot think that another PR implementing the migration is merged instead, letting the migration continue iterating on the graph; however, the downstream dependents fail because the parent (the one we closed the PR of) didn't really get rebuilt.
Another reason why it is good to keep the PR open or in draft status is that people might help with it if they want in the future.

In some cases a migration PR may not get opened. Please look for
[the migration on our status page](https://conda-forge.org/status/#big_migrations)
to see if there are any issues. This may show there are still dependencies
needing migration, in which case the best approach is to wait (or if possible
offer to help migrate those dependencies). If there is a bot error, there will
be a link to the CI job to provide more details about what may have gone wrong.
In these cases [please raise an issue](http://github.com/regro/cf-scripts/issues/new)
and include as much information as possible.

It is worth noting that one also has the option to create a migration PR
themselves. This can be a good option if the bot errored and that is still
being investigated or the migration PR got closed accidentally. To migrate a PR manually:

> 1. Fork the feedstock and clone it locally
> 2. Create a new branch
> 3. Create the directory `.ci_support/migrations` in the feedstock (if absent)
> 4. Copy the migrator from [conda-forge-pinning's migrators](https://github.com/conda-forge/conda-forge-pinning-feedstock/tree/main/recipe/migrations) to `.ci_support/migrations` and commit it
> 5. [Rerender](updating_pkgs.md#dev-update-rerender) the feedstock
> 6. Push these changes and open a PR

<a id="security-considerations-for-conda-forge-builds"></a>

## Security considerations for conda-forge builds

All conda-forge packages are built by strangers on the internet on public cloud infrastructure from source code you likely have not inspected, so you should not use conda-forge packages if you or your team require a high level of security.
You are also free to download recipes and rebuild them yourself, if you would like at least that much oversight. However, many people use conda-forge all the time with no issues and here are some things that conda-forge does to help with security in some ways:

1. [Sources](adding_pkgs.md#meta-yaml-source) (where you specify where the package's source code is coming from) can be pulled from GitHub, PyPI, or other sources and sha256 hashes are always used, so moving of tags or uploading of new sdists can not cause automatic package rebuilds.
   Also, once packages are accepted and made into feedstocks, only the maintainers of that feedstock have the right to merge PRs made to that feedstock.
2. Each feedstock can only upload packages for that feedstock. This is enforced by using a cf-staging channel where builds are first sent.
   A bot then assesses that the submitting feedstock has permission to build the package it has submitted, and only then will it relay the build to the `conda-forge` channel.
   This helps mitigate against a bad actor gaining access to an inconspicuous feedstock and then trying to push a build with malicious code into essential infrastructure packages (e.g., OpenSSL or Python).
3. We have [artifact-validation](https://github.com/conda-forge/artifact-validation) for validating all the conda-forge artifacts uploaded to `anaconda.org`. This validation scans for various security-related items, such as artifacts that overwrite key pieces of certain packages.
4. We have a dedicated [Security and Systems Sub-Team](/community/subteams/#security-subteam) who works hard towards making sure to secure and maintain appropriate access to the credentials and services/systems used by conda-forge.

If you have found a security-related issue with conda-forge, please check our [Security Policy](https://github.com/conda-forge/conda-forge.github.io/security/policy)
to learn how to report it responsibly.

<a id="significant-changes-to-upstream-projects"></a>

## Significant Changes To Upstream Projects

From time to time, we make changes in upstream projects so that they better integrate into the conda-forge ecosystem. We
have listed some, but not all, of those changes here for specific projects along with any associated documentation.

<a id="python"></a>

### Python

We carry an extensive set of python patches that change some core behaviors around search paths, environment isolation
in conda environments, and some operating system limits. See the [python feedstock](https://github.com/conda-forge/python-feedstock) for more details.

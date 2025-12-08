---
title: 'Cross-compilation'
---

Cross-compiling means building a package for a different architecture than the one the build process
is running on. It is a common way of obtaining packages for an architecture that conda-forge does
not provide any runners for (the other available technique is
[emulation](/docs/maintainer/knowledge_base/#emulated-builds)). Given how abundant x86_64 runners
are, most common cross-compilation setups will target non-x86_64 architectures from x86_64 runners.

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
conda-build input metadata.

For example, to cross-compile `linux-aarch64` and `linux-ppc64le` from `linux-64`:

```yaml
build_platform:
  linux_aarch64: linux_64
  linux_ppc64le: linux_64
```

See also [test](conda_forge_yml.mdx#test) for how to skip the test phase when
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
```

For more details about numpy see the dedicated [section](#building-against-numpy).

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

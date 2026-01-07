---
title: 'Tips & tricks'
---

<a id="tips-tricks"></a>

# Tips & tricks

<a id="multiple-channels"></a>

<a id="using-multiple-channels"></a>

## Using multiple channels

It is quite common to install a package from conda-forge and,
when trying to use it,
see an error like (OS X example):

```shell-session
ImportError: dlopen(.../site-packages/rpy2/rinterface/_rinterface.so, 2): Library not loaded: @rpath/libicuuc.54.dylib
  Referenced from: .../site-packages/rpy2/rinterface/_rinterface.so
  Reason: image not found
```

That happens because either the correct version of `icu`,
or any other package in the error,
is not present or the package is missing altogether.

You can confirm this by issuing the command `conda list` and searching for the package in question.

<a id="why-does-that-happen"></a>

### Why does that happen?

The conda-forge and `defaults` are not 100% compatible.
In the example above it is known that `defaults` uses `icu 54.*` while conda-forge relies on `icu 56.*`,
that mismatch can lead to errors when the install environment is mixing packages from multiple channels.

:::note

All of conda-forge software pinning can be found at:
[https://github.com/conda-forge/conda-forge-pinning-feedstock/blob/main/recipe/conda_build_config.yaml](https://github.com/conda-forge/conda-forge-pinning-feedstock/blob/main/recipe/conda_build_config.yaml)

:::

<a id="how-to-fix-it"></a>

### How to fix it?

Newer `conda` versions (>=4.6) introduced a strict channel priority feature.
Type `conda config --describe channel_priority` for more information.

The solution is to add the `conda-forge` channel on top of `defaults` in your `.condarc` file when using conda-forge packages
and activate the strict channel priority with:

```shell-session
$ conda config --set channel_priority strict
```

This will ensure that all the dependencies come from the `conda-forge` channel unless they exist only on `defaults`.

Here is how a `.condarc` file would look like:

```shell-session
$ cat .condarc
channel_priority: strict
channels:
  - conda-forge
  - defaults
```

In addition to the channel priority, we recommend always installing your packages inside a new environment instead of the `base` environment from anaconda/miniconda.
Using envs make it easier to debug problems with packages and ensure the stability of your root env.

:::

<a id="using-external-message-passing-interface-mpi-libraries"></a>

<a id="id1"></a>

## Using External Message Passing Interface (MPI) Libraries

On some high-performance computing (HPC) systems, users are expected to use the
MPI binaries that are available on the system as opposed to those built by conda-forge.
These binaries are typically specialized for the system and interface properly with job
schedulers, etc. However, this practice creates issues for conda-forge users. When you install
a package from conda-forge that relies on MPI, `conda` will install the MPI binaries
built by conda-forge and the package will link to those binaries. This setup often either
does not work at all or functions in unexpected ways on HPC systems.

To solve these issues, conda-forge has created special dummy builds of the `mpich` and `openmpi`
libraries that are simply shell packages with no contents. These packages allow the `conda` solver to produce
correct environments while avoiding installing MPI binaries from conda-forge. You can install the
dummy package with the following command

```shell-session
$ conda install "mpich=x.y.z=external_*"
$ conda install "openmpi=x.y.z=external_*"
```

As long as you have the local copies of the `mpich`/`openmpi` library in your linking paths and
the local version matches the `conda` version within the proper ABI range, then this procedure should
work. At runtime, the conda-forge package that depends on MPI should find the
local copy of `mpich`/`openmpi` and link to it.

Another point for using your own MPI binaries specialized for the system is that
if you care about ultimate performance, you should build/install your MPI backend yourself,
and not rely on conda-forge packages (they are built for compatibility rather than performance).
Due to the constrained build environment of conda-forge packages there might be the lack of such important features
as XPMEM and CMA for `mpich` and `openmpi`, respectively.

<a id="apple-silicon-rosetta"></a>

<a id="installing-apple-intel-packages-on-apple-silicon"></a>

## Installing Apple Intel packages on Apple Silicon

Using [Rosetta 2](https://support.apple.com/en-us/HT211861), you can install packages originally compiled for Mac computers with Intel processors on Mac computers with Apple silicon processors.

This can be enabled per environment using the following commands:

```shell-session
CONDA_SUBDIR=osx-64 conda create -n your_environment_name python   # Create a new environment called your_environment_name with intel packages.
conda activate your_environment_name
python -c "import platform;print(platform.machine())"  # Confirm that the correct values are being used.
conda config --env --set subdir osx-64  # Make sure that conda commands in this environment use intel packages.
```

To verify that the correct platform is being used, run the following commands after the environment has been activated:

```shell-session
python -c "import platform;print(platform.machine())"  # Should print "x86_64"
echo "CONDA_SUBDIR: $CONDA_SUBDIR"  # Should print "CONDA_SUBDIR: osx-64"
```

<a id="installing-packages-for-gpus-and-cpus"></a>

<a id="installing-cuda-enabled-packages-like-tensorflow-and-pytorch"></a>

## Installing CUDA-enabled packages like TensorFlow and PyTorch

In conda-forge, some packages are available with GPU support. These packages not only take significantly longer to compile and build, but they also result in rather large binaries that users then download. As an effort to maximize accessibility for users with lower connection and/or storage bandwidth, there is an ongoing effort to limit installing packages compiled for GPUs unnecessarily on CPU-only machines by default. This is accomplished by adding a [virtual package](https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-virtual.html) run dependency, `__cuda`, that detects if the local machine has a GPU. However, this introduces challenges to users who may prefer to still download and use GPU-enabled packages even on a non-GPU machine. For example, login nodes on HPCs often do not have GPUs and their compute counterparts with GPUs often do not have internet access. In this case, a user can override the default setting via the environment variable `CONDA_OVERRIDE_CUDA` to install GPU packages on the login node to be used later on the compute node. At the time of writing (February 2022), we have concluded this safe default behavior is best for most of conda-forge users, with an easy override option available and documented. Please let us know if you have thoughts on or issues with this.

In order to override the default behavior, a user can set the environment variable `CONDA_OVERRIDE_CUDA` like below to install TensorFlow with GPU support even on a machine with CPU only.

```shell-session
CONDA_OVERRIDE_CUDA="<CUDA version>" conda install tensorflow -c conda-forge
# OR
CONDA_OVERRIDE_CUDA="<CUDA version>" mamba install tensorflow -c conda-forge
```

:::note

See the [relevant CUDA user guides](https://github.com/conda-forge/cuda-feedstock/blob/main/recipe/README.md) for more information.

:::

For context, installing the TensorFlow 2.7.0 CUDA-enabled variant, `tensorflow=2.7.0=cuda*`, results in approximately 2 GB of packages to download while the CPU variant, `tensorflow=2.7.0=cpu*`, results in approximately 200 MB to download. That is a significant bandwidth and storage wasted if one only needs the CPU only variant!

<a id="pypy"></a>

<a id="using-pypy-as-an-interpreter"></a>

## Using PyPy as an interpreter

:::warning

As of August 2024, [PyPy support in conda-forge has been sunset](/news/2024/08/14/sunsetting-pypy/).
It still may be possible to create an environment using an old version of PyPy, but (with the
exception of noarch packages still compatible with python 3.9), you will be constrained to the
packages that were built for PyPy until mid-2024.

:::

The `conda-forge` channel supports creating and installing packages into
environments using the [PyPy interpreter](https://www.pypy.org). Many packages are already
available. You need to enable the `conda-forge` channel and use
the `pypy` identifier when creating your environment:

```shell-session
$ conda create -c conda-forge -n my-pypy-env pypy python=3.8
$ conda activate my-pypy-env
```

:::note

As of March 8 2020, if you are using defaults as a low priority channel,
then you need to use strict channel priority as the metadata in defaults
has not been patched yet which allows cpython extension packages to be
installed alongside pypy.

:::

```bash
$ conda config --set channel_priority strict
```

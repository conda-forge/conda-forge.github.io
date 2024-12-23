---
title: 'FAQ'
---

<a id="faq"></a>

# FAQ

<a id="faq-pkg-not-available"></a>

<a id="a-package-i-am-looking-for-is-not-on-conda-forge-what-can-i-do"></a>

## A package I am looking for is not on conda-forge, what can I do?

We have an overview and step-by-step instruction on contributing packages in the section [Contributing packages](../maintainer/adding_pkgs.md#dev-contribute-pkgs).

<a id="faq-pkg-update"></a>

<a id="the-feedstock-for-a-package-from-conda-forge-is-updated-how-long-should-it-take-to-update-on-anaconda-cloud"></a>

## The feedstock for a package from conda-forge is updated, how long should it take to update on Anaconda Cloud?

It depends on the queue, but a good rule of thumb is to wait at least 30 mins - 2 hours. If you don't see it after 24 hrs, please raise an issue.

<a id="faq-report-issue"></a>

<a id="a-package-from-conda-forge-is-outdated-or-broken-where-can-i-report-the-issue"></a>

## A package from conda-forge is outdated or broken, where can I report the issue?

You can open an issue in the packages feedstock repository on GitHub. Search for the repository `conda-forge/<package-name>-feedstock`. There you can also suggest fixes or even become a maintainer. Please refer to [Maintaining packages](../maintainer/updating_pkgs.md#maintaining-pkgs) for details.

<a id="faq-contact"></a>

<a id="i-have-a-question-suggestion-how-can-i-contact-you"></a>

## I have a question/suggestion. How can I contact you?

Please join us on our [Zulip chatroom](https://conda-forge.zulipchat.com/). We are always happy to answer questions and help beginners.

<a id="faq-teams"></a>

<a id="i-have-a-set-of-related-packages-how-do-i-create-a-conda-forge-team"></a>

## I have a set of related packages, how do I create a conda-forge team?

conda-forge github teams are very useful means of adding common maintainers to a set of related packages. For example, most R packages are co-maintained by the conda-forge/R team.
To create a new team, you can just use one of the existing feedstocks from your packages. Each feedstock has automatically a team assigned (formed from the maintainers of that feedstock).
For example, the conda-forge R team is coming from the [r-feedstock](https://github.com/conda-forge/r-feedstock). Then you can just add - conda-forge/r in the maintainers section to
make all maintainers of the r-feedstock also maintainers of the new package.

<a id="faq-solver-speed"></a>

<a id="installing-and-updating-takes-a-long-time-what-can-i-do"></a>

## Installing and updating takes a long time, what can I do?

Enabling strict channel priority may help. You can do this via

```bash
conda config --set channel_priority strict
```

You can also try using a package called [mamba](https://github.com/mamba-org/mamba).
`mamba` is an `conda`-compatible package that can be used in place of `conda`. It
employs a faster solver implemented in `C`. It can be installed via

```bash
conda install mamba
```

<a id="faq-travis-ci"></a>

<a id="why-is-travis-ci-failing-on-my-feedstock"></a>

## Why is Travis-CI failing on my feedstock?

Travis CI builds should be enabled or disabled via the `conda-forge.yml` configuration.
Nevertheless, sometimes Travis CI ignores this for whatever reason (probably a bug somewhere).
In such a case, please disregard failing builds.
Note that `travis-ci.org` builds are soon being phased out and replaced by `travis-ci.com`.

<a id="faq-compiler-metapkg"></a>

<a id="how-can-i-install-a-c-c-compiler-in-my-environment"></a>

## How can I install a C/C++ compiler in my environment?

You can use our convenient meta-packages `c-compiler` and `cxx-compiler` to install a compiler stack that fits your platform. Error messages such as

```default
x86_64-apple-darwin13.4.0-clang: No such file or directory
```

are a telltale sign that you are lacking compilers.

Depending on the specific tools that you use for building C/C++ code, you may need some additional tools, for example:

```
cxx-compiler cmake pkg-config make ninja meson
```

<a id="faq-compiler-required-options"></a>

<a id="why-don-t-the-c-c-compilers-automatically-know-how-to-find-libraries-installed-by-conda"></a>

## Why don't the C/C++ compilers automatically know how to find libraries installed by conda?

All of our toolchains are built as cross-compilers (even when they are built to run on the same
architecture that they are targeting). We do this because it makes it possible to then install
them anywhere like any other conda package. As a result, the builtin search path for the
compilers only contains the sysroot they were built with. The compiler binary names are also
‘prefixed' with more complete information about the architecture and [ABI](../glossary.md#abi) they target. So, instead
of `gcc`, the actual binary will be named something like `x86_64-conda-linux-gnu-cc`.

The conda-forge infrastructure provides [activation scripts](../maintainer/adding_pkgs.md#activate-scripts) which are run when
you `conda activate` an environment that contains the compiler toolchain. Those scripts set
many environment variables that are typically used by GNU `autotools` and `make` in the
`standard` (i.e. builtin) build rules. For example, you would see the variable `CC` set to
the long compiler name `x86_64-conda-linux-gnu-cc`. The activation scripts also set a
`CMAKE_ARGS` variable with many arguments the conda-forge community finds helpful for
configuring cmake build flows. Of particular note, the activation scripts add the
`CONDA_PREFIX/include` and `CONDA_PREFIX/lib` paths to the appropriate `FLAGS` environment
variables (`CLAGS`, `CPPFLAGS`, `LDFLAGS`, etc) so that many build systems will pick them up correctly.

What do you do if you have custom `FLAGS` that your project requires for it's build or you can't
build with some of the flags supplied by conda-forge? What if you are building something that
is setup for cross-compiling and expects `CC` to contain the name of the target toolchain but
wants to be able to build some things for the build-host to use during the build by just calling
`gcc`?

The [compiler metapackages mentioned above](#faq-compiler-metapkg) also install packages that
create symlinks of the short names (like `gcc`) to the actual toolchain binary names (like
`x86_64-conda-linux-gnu-cc`) for toolchains that are targeting the system they are running on.

A new optional package called `conda-gcc-specs` can also be installed that adds:
<br />_ `-include $CONDA_PREFIX/include` to compile commands
_ `-rpath $CONDA_PREFIX/lib -rpath-link $CONDA_PREFIX/lib -disable-new-dtags -L $CONDA_PREFIX/lib` to link
commands

Using the compiler metapackage with `conda-gcc-specs` you can incude and link libraries installed
in `CONDA_PREFIX` without having to provide any conda-specific cmdline arguments.

<a id="faq-compiler-use-system-libs"></a>

<a id="how-can-i-make-conda-gcc-use-my-system-libraries"></a>

## How can I make conda gcc use my system libraries?

First, the conda-forge infrastructure tries very hard to avoid using any of the system-provided
libraries, otherwise the dependencies betweeen packages quickly become incomplete and nothing works.

However, as an end user, when not building something that will be packaged and distributed via
conda-forge, you may need to link against libraries on your system instead of libraries in your
conda environment. This can be accomplished (for gcc) by passing `-sysroot=/` on the cmdline.

<a id="faq-cuda-compiler-header"></a>

<a id="how-can-i-compile-cuda-host-or-device-codes-in-my-environment"></a>

## How can I compile CUDA (host or device) codes in my environment?

Unfortunately, this is not possible with conda-forge's current infrastructure (`nvcc`, `cudatoolkit`, etc) if there is no local CUDA Toolkit installation. In particular, the `nvcc` package provided on conda-forge is a _wrapper package_ that exposes the actual `nvcc` compiler to our CI infrastructure in a `conda`-friendly way; it does not contain the full `nvcc` compiler toolchain. One of the reasons is that CUDA headers like `cuda.h`, `cuda_runtime.h`, etc, which are needed at compile time, are not redistributable according to NVIDIA's EULA. Likewise, the `cudatoolkit` package only contains CUDA runtime libraries and not the compiler toolchain.

If you need to compile CUDA code, even if it involves only CUDA host APIs, you will still need a valid CUDA Toolkit installed locally and use it. Please refer to [NVCC's documentation](https://docs.nvidia.com/cuda/cuda-compiler-driver-nvcc/index.html) for the CUDA compiler usage and [CUDA Programming Guide](https://docs.nvidia.com/cuda/cuda-c-programming-guide/index.html) for general CUDA programming.

<a id="faq-abi-incompatibility"></a>

<a id="how-to-handle-breaking-of-a-package-due-to-abi-incompatibility"></a>

## How to handle breaking of a package due to ABI incompatibility?

If your package breaks ABI with a version bump, here are a few steps you can take to fix it:

- Rebuild the new version with corrected `run_exports`.
- Rebuild the old version with corrected `run_exports`.
- Hot-fix the repodata of dependencies to include corrected pinnings for the package.
- Add a PR to pin the old version in `conda-forge-pinning` (if not already present)
- Open a migrator following [CFEP-09](https://github.com/conda-forge/cfep/blob/main/cfep-09.md)

To read more on how to specify `run_exports`, see [Specifying run_exports](../maintainer/pinning_deps.md#run-exports).
Some of the examples you can see for reference, where broken packages are fixed by:

- [Replacing an existing pin that was incorrect](https://github.com/conda-forge/conda-forge-repodata-patches-feedstock/pull/217).
- [Pinning packages loosely to rely on their ABI compatibility](https://github.com/conda-forge/conda-forge-repodata-patches-feedstock/pull/132).
- [Pinning packages strictly](https://github.com/conda-forge/conda-forge-repodata-patches-feedstock/pull/154).

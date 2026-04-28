---
title: "What is conda-forge?"
---

# Why conda-forge as a software distribution?

Conda-forge's mission is to make software easily distributable and usable by the world.

conda-forge solves problem of distributing scientific software properly and consistently for many applications and platforms.

conda-forge is much more than `python` and `conda`, and it covers much more than scientific software applications: conda-forge distributes all the dependencies chain for anyone to be able to run their projects.

## Encompassing ecosystems' across languages

Projects are using differents languages, and languages' ecosystem do not exist in isolation: Python, C++, R, Fortran, and potentially assets (like model weights) live all together in end-users applications.

conda-forge distributes all of them so that they can be used consistently altogether in end-users projects.

:::info Benefits
conda-forge provides plethora of packages from different ecosystems, making sure they can be used all together.
:::

## Build on an open package format, with no Terms of single entity attached

conda packages originated from maintainers of Scientific Python projects at Anaconda who wanted to properly solve distributing their projects given their complexity (mixture of Python, C, Fortran, Cython, C++ code; interface with external C and Fortran libraries) compared to normal python-only projects.

Anaconda came up with a package format which could meet the needs of distributing Python projects with native extensions: the conda package.

While Anaconda's distribution is linked to specific legal Terms of Services, conda-forge reuse this package format but without any specific legal terms, but the original projects' license.

:::info Benefits
conda-forge's users aren't technically constrained by the operations of a single entity, and aren't legally constrained more than by the license of projects they use.
:::

## Open, automated, distributed and transparent maintenance of projects' distribution

Anaconda distribution was really popular, but also was faced with a tremondous number of requests to add or modify packages' that people decided to create a distributed alternative that could scale: conda-forge.

Contrarily to other distributions which are only managed by a few number of people without any potential understanding of the process of publishing packages for outsiders, conda-forge adopted a model where each project distribution is managed by a repository on GitHub called feedstock.

Feedstocks make the recipes of the distribution of package inspectable by anyone. Moreover, people can contribute to the distribution as they would contribute to a repository and also can maintain the distribution, integrating changes from contributors.

Contributors and maintainers of feedstocks aren't necessarily the ones of the original projects: this empowers anyone to adapt the distribution for new needs.

Furthermore, a significant part of the maintenance burden (such as version updates, and testing packages) are handled by bots and the CI, easing publishing new builds of packages.

:::info Benefits
conda-forge makes new versions of packages available promptly, automate the maintenance of the distribution of packages which is shared among people so that bottlenecks are minimized. Anyone can contribute to project's distributions and is welcome to.
:::

## Managing the entire dependencies tree of packages

Projects on high-level languages do not depend solely on other high-level languages projects, they also depend (for instance) on C/C++ projects at compile time and at runtime.

Most notably popular projects in the Scientific Python ecosystem like NumPy, SciPy, scikit-learn and pyarrow depends on C/C++ code (e.g. implementation of BLAS, implementations of OpenMP, `libarrow`, ...), yet some popular distributions and packages do not keep track of those dependencies properly: this is for instance the case of python wheels, causing many problems at runtime (such as duplication of shared objects like NumPy's and SciPy's distributions of an implementation of BLAS, which causes undefined behaviors such as dispatch failure or race conditions in shared thread pools).

Tracking all the dependencies has the benefits of having the entire chain be managed for the users, and to avoid them trying to fidget with their system's distribution.

More information about it is provided on the [`pypackaging-native` website](https://pypackaging-native.github.io/).

:::info Benefits
conda-forge users do not need to perfom ad-hoc potentially hacky modifications of their environment at all to obtain something consistent and usable.
:::

## Moving the entire ecosystem forward

Some core dependencies are being used by a large number of packages at compile time.

When a new version of them is being released, all the packages depending on this core dependencies have to be rebuilt for it to be usable with them in end-users environment.

For the entire process to be correct, they have to be rebuilt in a particular order whilst the previous version still must be the reference one for the entire ecosystem. This is done by a global pinning system and migration system.

The global pinning system specifies which version of the main dependencies feedstocks have to use. This guarantees that all packages built at a given time are compatible with one another.

Migrations rebuild, via bots, packages for new version of project in the direct acyclic order of the updated project dependencies by opening Pull Request on their feedstock, overriding the version in the global pinning for this new one.

:::info Benefits
conda-forge users do not need to care about managing the release of their projects' new dependencies and the entire ecosystem move forward together.
:::

## Supporting numerous machine configurations

Many platforms exist out there in the world, most of them being combinations of:

- an operating system, notably Linux, macOS, and Windows
- an architecture, most notably `x86_64`, `arm64`, `ppc64`

conda-forge supports all those combinations, and even microarchitectures instructions for `x86_64` (v1, v2, v3, v4).

CUDA is also supported, and builds of packages for CUDA are pulled when possible.

:::info Benefits
conda-forge distributes packages which makes best use of the users' machines' hardware.
:::

## Unified toolchain across the distribution

Toolchains (consisting of the compilers, linkers, and implementations of standard libraries) for each targeted platform exist.

Each of those toolchains and standard library implementations are specific to the targeted platforms.

conda-forge makes educated and conservative choices for each platform and for the versions of the C standard library used, to make sure that packages can run on a wide breadth of systems, in particular LTS Linux distributions (such as CentOS).

:::info Benefits
conda-forge use of an uniform toolchan guarantees that almost surely no problem exist at compile time when projects are built, that problems at runtime are minimized, and that a wide range of an operating system versions are covered.
:::

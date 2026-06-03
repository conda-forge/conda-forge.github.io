---
title: "What is conda-forge?"
---

# Why conda-forge as a software distribution?

Conda-forge's goal is to make software easily installable and usable by the world.

Conda-forge grew out of the intersection between Python and the scientific software ecosystem, not least because it solves many problems in this space that had not been solved elsewhere. Scientific computing is still a core constituency of conda-forge, but over the last 10+ years, the ecosystem has grown to encompass packages from essentially all programming languages, across all major platforms and architectures. See also [key issues in native Python packaging](https://pypackaging-native.github.io/#key-issues).

In other words, conda-forge is much more than `python` and `conda`: it distributes the entire dependency chain (including the compilers!) for pretty much anyone to be able to run their projects.

## Encompassing ecosystems across languages

Projects use different languages, and language ecosystems do not exist in isolation: Python, C++, R, Fortran, and potentially assets (like model weights) live all together in end-users applications, and conda-forge distributes all of them so that they can be used consistently altogether in end-users projects.

:::info Benefits
conda-forge provides a plethora of packages from different ecosystems, making sure they can be used all together.
:::

## Built on an open package format, with community-managed artifacts

The conda package manager and format were created to address packaging challenges for the NumPy stack and other software with native extensions—projects that mix Python with C, Fortran, Cython, C++, and interfaces to external libraries, and that are harder to ship with tools aimed at pure-Python packages alone.

At the first PyData meetup, several developers asked Guido van Rossum how to fix Python packaging for the NumPy stack; his answer was to "solve the problem ourselves." Engineers at Continuum (now Anaconda, Inc.) took that seriously: they studied dpkg, rpm, pip/virtualenv, Homebrew, Nix, and other systems, drew on experience with Enthought Python Distribution (EPD), and created the conda package manager and conda environments. A fuller account of this history is in progress in the [conda-forge history article](https://github.com/conda-forge/conda-forge.github.io/pull/2298) (see also [this talk](https://www.youtube.com/watch?v=U2oa_RLbTVA) and [this talk](https://www.youtube.com/watch?v=gFEE3w7F0ww)).

While Anaconda's distribution is linked to specific legal Terms of Service, conda-forge reuses this package format in a community-run distribution where artifacts are published under BSD-3-Clause, alongside the original projects' licenses.

:::info Benefits
conda-forge's users aren't technically constrained by the operations of a single entity, and package usage is governed by artifact and upstream project licenses.
:::

## Open, automated, distributed and transparent maintenance of projects' distribution

Anaconda distribution was really popular, but it was also faced with a tremendous number of requests to add or modify packages, so people decided to create a distributed alternative that could scale: conda-forge.

Contrary to other distributions that are only managed by a small number of people without any potential understanding of the process of publishing packages for outsiders, conda-forge adopted a model where each project distribution is managed by a repository on GitHub called a feedstock.

Feedstocks make package distribution recipes inspectable by anyone. Moreover, people can contribute to the distribution as they would contribute to a repository and also can maintain the distribution, integrating changes from contributors.

Contributors and maintainers of feedstocks aren't necessarily the ones of the original projects: this empowers anyone to adapt the distribution for new needs.

Furthermore, a significant part of the maintenance burden (such as version updates, and testing packages) are handled by bots and the CI, easing publishing new builds of packages.

:::info Benefits
conda-forge makes new versions of packages available promptly, automates package distribution maintenance shared among people so that bottlenecks are minimized. Anyone can contribute to projects' distributions and is welcome to.
:::

## Managing the entire dependencies tree of packages

Projects on high-level languages do not depend solely on other high-level languages projects, they also depend (for instance) on C/C++ projects at compile time and at runtime.

Most notably, popular projects in the Scientific Python ecosystem like NumPy, SciPy, scikit-learn, and pyarrow depend on C/C++ code (e.g. implementation of BLAS, implementations of OpenMP, `libarrow`, ...), yet some popular distributions and packages do not keep track of those dependencies properly: this is for instance the case of Python wheels, causing many problems at runtime (such as duplication of shared objects like NumPy's and SciPy's distributions of an implementation of BLAS, which causes undefined behaviors such as dispatch failure or race conditions in shared thread pools).

Tracking all the dependencies has the benefits of having the entire chain be managed for the users, and to avoid them trying to fidget with their system's distribution.

More information about it is provided on the [`pypackaging-native` website](https://pypackaging-native.github.io/).

:::info Benefits
conda-forge users do not need to perform ad-hoc potentially hacky modifications of their environment at all to obtain something consistent and usable.
:::

## Moving the entire ecosystem forward

Some core dependencies are being used by a large number of packages at compile time.

When a new version of them is released, all the packages depending on these core dependencies have to be rebuilt for it to be usable with them in end-users environments.

For the entire process to be correct, they have to be rebuilt in a particular order whilst the previous version still must be the reference one for the entire ecosystem. This is done by a global pinning system and migration system.

The global pinning system specifies which version of the main dependencies feedstocks have to use. This guarantees that all packages built at a given time are compatible with one another.

Migrations rebuild, via bots, packages for a new version of a project in the directed acyclic order of the updated project dependencies by opening Pull Requests on their feedstocks, overriding the version in the global pinning for the new one.

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
conda-forge distributes packages that make best use of users' machine hardware.
:::

## Unified toolchain across the distribution

Toolchains (consisting of the compilers, linkers, and implementations of standard libraries) for each targeted platform exist.

Each of those toolchains and standard library implementations are specific to the targeted platforms.

conda-forge makes educated and conservative choices for each platform and for the versions of the C standard library used, to make sure that packages can run on a wide breadth of systems, in particular LTS Linux distributions (such as CentOS).

:::info Benefits
conda-forge's use of a uniform toolchain guarantees that almost surely no problems exist at compile time when projects are built, that problems at runtime are minimized, and that a wide range of operating system versions are covered.
:::

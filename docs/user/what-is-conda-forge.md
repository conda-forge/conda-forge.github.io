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

As [Travis Oliphant recounts](https://technicaldiscovery.blogspot.com/2013/12/why-i-promote-conda.html):

> This was confirmed for me at the first PyData meetup at Google HQ, where several of us asked Guido what we can do to fix Python packaging for the NumPy stack. Guido's answer was to "solve the problem ourselves". We at Continuum took him at his word. We looked at dpkg, rpm, pip/virtualenv, brew, nixos, and 0installer, and used our past experience with EPD. We thought hard about the fundamental issues, and created the conda package manager and conda environments.

A fuller account of this history is in progress in the [conda-forge history article](https://github.com/conda-forge/conda-forge.github.io/pull/2298) (see also [this talk](https://www.youtube.com/watch?v=U2oa_RLbTVA) and [this talk](https://www.youtube.com/watch?v=gFEE3w7F0ww)).

Condensing a lot of history, it's important to distinguish different meanings of the word "conda":

- the packaging paradigm that grew out of the above-mentioned efforts
- `conda`, the CLI tool used to interact with packages in this format
- Anaconda, the company where this was initially developed, which maintains curated channels of packages that may be subject to licensing fees (subject to the size of the organisation that users belong to)
- the conda ecosystem, which has outgrown the control of Anaconda, and nowadays is a [standards-based](https://github.com/conda/ceps/blob/main/cep-1.md) [effort](https://conda.org/blog/2024-08-14-conda-ecosystem-explained), under multi-stakeholder [governance](https://github.com/conda/governance).

To relate conda-forge to all this: it is the community-driven channel of packages which are _not_ subject to Anaconda's Terms of Service, all the while still being hosted on Anaconda infrastructure (i.e. https://anaconda.org/conda-forge), which can be installed through `conda` as well as other installers like `mamba` and `pixi`, and which forms a key part of the wider conda ecosystem, in addition to being (broadly, but not fully) the "upstream" of Anaconda's own curated channels (roughly comparable for example to the dynamic between CentOS Stream and Red Hat Enterprise Linux). Artifacts published on conda-forge are licensed under BSD-3-Clause, alongside the original projects' licenses.

:::info Benefits
conda-forge's users aren't technically constrained by the operations of a single entity, and package usage is governed by artifact and upstream project licenses.
:::

## Open, automated, distributed and transparent maintenance of projects' distribution

Under conda's packaging paradigm, libraries need to be "packaged" according to a declarative recipe that describes how the sources are processed, which tools and other libraries need to be present before running the build scripts, etc. These recipes form the backbone of the conda ecosystem.

The flipside however, is that in order to benefit from the advantages of conda's paradigm, such a recipe needs to be created initially and then maintained as new versions of the library get released.

Given the success of conda's approach, this meant that users very soon wanted to consume a vast variety of packages through conda, and given the scope (not just Python, but many more languages) of the task, as well as the very high rate of change, no single entity — not even Anaconda — could keep up with packaging everything users wanted, and keeping it up to date.

What ended up happening is that the volunteer-driven conda-forge channel could absorb contributions much more quickly and easily than an enterprise distribution, and eventually ended up becoming the place where thousands of contributors of varying degrees of involvement and expertise come together in a way that's proven most scalable in dealing with the vast breadth and depth and pace of the wider software ecosystem.

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

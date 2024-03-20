---
title: 'Infrastructure'
---

<a id="infrastructure"></a>

<a id="id1"></a>

# Infrastructure

<a id="repositories"></a>

## Repositories

<a id="staging-area-for-recipes"></a>

### Staging area for recipes

[conda-forge/staged-recipes](https://github.com/conda-forge/staged-recipes) is the entry point for new packages to join the conda-forge package collection.
You can find the detailed guide for submitting new package recipes in [The staging process](adding_pkgs.md#creating-recipes).

<a id="smithy"></a>

### Smithy

Smithy contains maintenance code for conda-forge, which is used by the `conda-smithy` command line tool and the [Admin web services](#dev-admservice). Smithy lives in the repository [conda-forge/conda-smithy](https://github.com/conda-forge/conda-smithy).

`conda-forge/conda-smithy` is the right repository to report bugs for

- The rerendering process
- The recipe linter
- [CI](../glossary.md#term-CI) support utils

`conda-smithy` also contains the command line tool that you should use if you rerender manually from the command line (see [Rerendering feedstocks](updating_pkgs.md#dev-update-rerender)).

Smithy can be used beyond conda-forge's purposes. For example, it can be used to set up self-hosted Azure agents <azure-config> for non-conda-forge infrastructures.
(You could also consider using [Azure virtual machine scale set agents](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/scale-set-agents?view=azure-devops),
which could be less expensive to run than permanently active agents.)

<a id="web-services"></a>

### Web services

The Heroku app providing the conda-forge web services lives in [conda-forge/conda-forge-webservices](https://github.com/conda-forge/conda-forge-webservices).
Please note that the code logic provided by the app is in the `Smithy` repository.

Bugs or suggestions regarding the service functionality should therefore be opened in `conda-forge/conda-smithy`'s [bug tracker](https://github.com/conda-forge/conda-smithy/issues).

<a id="conda-forge-pinning"></a>

### conda-forge pinning

Package-wide dependency pins are defined in [conda_build_config.yaml](https://github.com/conda-forge/conda-forge-pinning-feedstock/blob/master/recipe/conda_build_config.yaml) in the [conda-forge/conda-forge-pinning-feedstock](https://github.com/conda-forge/conda-forge-pinning-feedstock).

For more information on conda-forge wide package pins, please refer to [Globally pinned packages](pinning_deps.md#globally-pinned-packages).

Please open a [PR](../glossary.md#term-PR) and/or an issue there, if you think a pin needs to be advanced. For more information on updating globally pinned packages, please refer to [Updating package pins](pinning_deps.md#update-pins).

<a id="documentation"></a>

### Documentation

The documentation website lives in [conda-forge/conda-forge.github.io](https://github.com/conda-forge/conda-forge.github.io/), and is automatically deployed to our [online version](https://conda-forge.org/).

The documentation is built with Docusaurus and the sources files are located in the [`docs/`](https://github.com/conda-forge/conda-forge.github.io/tree/main/docs) directory of the repository.

If you found any typo error, unclear explanations or new topics that can be covered, you can suggest changes to the documentation. For more details, please refer to [Improve the documentation](../user/contributing.md#improve-docs).

<a id="dev-admservice"></a>

<a id="admin-web-services"></a>

## Admin web services

conda-forge is running a webservice on Heroku called [conda-forge-webservices](https://github.com/conda-forge/conda-forge-webservices).

The following services are run by default on a feedstock:

- It will lint the recipes in the PRs and report back whether the recipe is in excellent condition or not.
- When maintainers are added to a recipe, each of the maintainers will be added to the team and given push access to the feedstock.

The webservice also listens to issues and PR comments, so that you can ask for the following services to be done:

<a id="conda-forge-admin-please-rerender"></a>

### @conda-forge-admin, please rerender

Entering the above phrase in a PR of a feedstock will rerender the feedstock and push the changes to your PR.
Make sure to tick the `Allow edits from maintainers` button located at the bottom of the right side bar of
the PR. If you enter this phrase in the comment for an issue, the bot will create a new pull request, with the requested
re-rendering being completed.

<a id="conda-forge-admin-please-add-noarch-python"></a>

### @conda-forge-admin, please add noarch: python

Entering the above phrase in a PR or an issue of a feedstock will add `noarch: python` to the build and rerender the feedstock
for you.

<a id="conda-forge-admin-please-lint"></a>

### @conda-forge-admin, please lint

Entering the above phrase in a PR of a feedstock will lint the PR again.

<a id="conda-forge-admin-please-update-team"></a>

### @conda-forge-admin, please update team

Entering the above phrase in an issue will update the team for the feedstock. This is usually done automatically.

<a id="conda-forge-admin-please-restart-ci"></a>

### @conda-forge-admin, please restart ci

Entering this command in the PR of a feedstock or staged-recipes will close and then open the PR, causing
all of the CI builds to restart.

<a id="cfa-please-ping-team"></a>

<a id="conda-forge-admin-please-ping-team"></a>

### @conda-forge-admin, please ping team

Entering this command in the PR of a feedstock or staged-recipes will have the admin bot @-mention the team
associated with the repo. This command can be useful for people who are not yet members of conda-forge and
so cannot @-mention the `staged-recipes` team for PR reviews.

<a id="cfa-please-ping-cf-team"></a>

<a id="conda-forge-admin-please-ping-conda-forge-team"></a>

### @conda-forge-admin, please ping conda-forge/<team>

Entering this command in the PR of a feedstock or staged-recipes will have the admin bot @-mention the respective team.
This command can be useful for people who are not yet members of conda-forge and
so cannot @-mention someone due to the general GitHub limitations.

<a id="conda-forge-admin-please-rerun-bot"></a>

### @conda-forge-admin, please rerun bot

Entering this command in a PR comment will add the `bot-rerun` label to that PR. This label will cause
the `auto-tick` bot that issues migration and version updates to close the current PR and reissue it.
Adding this label to non-bot issued PRs will have no effect.

<a id="conda-forge-admin-please-add-bot-automerge"></a>

### @conda-forge-admin, please add bot automerge

Entering this command in the title or comment of an issue will instruct the admin bot to
open a PR enabling the automatic merging of passing PRs from the `auto-tick`
bot. This functionality is currently experimental. You can find more details
[here](#automerge).
Please open issue on `regro/cf-scripts` for any feedback, bugs, and/or questions!

<a id="conda-forge-admin-please-remove-bot-automerge"></a>

### @conda-forge-admin, please remove bot automerge

Entering this command in the title or comment of an issue will instruct the admin bot to
open a PR to disable automerge, undoing the `please add bot automerge` command.

<a id="cfa-please-add-user"></a>

<a id="conda-forge-admin-please-add-user-username"></a>

### @conda-forge-admin, please add user @username

Entering the above phrase in the title of an issue on a feedstock will make a PR
that adds the given user to the feedstock. A maintainer or member of `core` can then merge
this PR to add the user. Please do not modify this PR or adjust the commit message. This
PR is designed to skip building the package.

<a id="conda-forge-admin-please-update-version"></a>

### @conda-forge-admin, please update version

Entering the above phrase in the title of an issue on a feedstock will request the bot
to check if there are any new versions available. If there are, it will open a PR with
with the needed changes. Note that the bot might start by opening a PR with only partial
changes. The rest of the contents will be added in a subsequent commit after a few minutes.

<a id="ci-build-services"></a>

## CI build services

Here we describe common issues with the CI Services that conda-forge builds.

<a id="azure-pipelines"></a>

### Azure Pipelines

Azure is used to build packages for OSX, Linux (x86_64, native), Linux (ARMv8, emulated) and Linux (IBM Power8+, emulated).
The build queue on Azure is substantially larger than on all the other providers.
Azure builds have a maximum duration of 6 hours.

To see all builds on Azure, visit [https://dev.azure.com/conda-forge/feedstock-builds/\_build](https://dev.azure.com/conda-forge/feedstock-builds/_build).

<a id="restarting-builds"></a>

#### Restarting builds

Presently Azure does not sync GitHub users. In order to restart a build you can restart it from the GitHub checks interface.
If that doesn't work, a close/open will kick off a new build. You can also use the web services command `@conda-forge-admin, please restart ci`.

<a id="using-azure-for-everything"></a>

#### Using Azure for _everything_

Azure is the default provider for Linux and OSX. To use Azure for everything, add the following to `conda-forge.yml` in the root
of the feedstock.

```yaml
provider:
  win: azure
```

:::note

Presently Azure has some issues building libraries using cmake on Windows. Azure does not have a VS2008 installation, so building
certain very old packages that require VC9 will fail.

:::

<a id="travisci-ibm-power-8-arm"></a>

### TravisCI (IBM Power 8+, ARM)

TravisCI is used to build packages for IBM Power 8+ and ARM. After merging a staged-recipes pull request, it might be necessary to
force sync your repositories in TravisCI to see the reload and cancel buttons. To do this please visit [https://app.travis-ci.com/account/repositories](https://app.travis-ci.com/account/repositories)
and click the "Sync accounts" button.

<a id="enabling-travis"></a>

#### Enabling Travis

TravisCI should only be needed to build recipes on OSX, if there is a strange failure on Azure.

Enable a build by adding the following to `conda-forge.yml` in the root of the feedstock.

```yaml
provider:
  osx: travis
```

For IBM Power 8+ and/or ARM builds, add the name of your feedstock to the list [here](https://github.com/conda-forge/conda-forge-pinning-feedstock/blob/master/recipe/migrations/arch_rebuild.txt)
via a pull request.

<a id="github-actions"></a>

### GitHub Actions

We use GitHub actions to rerender feedstocks and also run our pull request automerge service. We do not currently support builds on
GitHub Actions.

<a id="automerge"></a>

<a id="id2"></a>

#### Automerge

The automerge service uses the GitHub action in this [repo](https://github.com/conda-forge/automerge-action). This action runs out of a
Docker [container](https://hub.docker.com/repository/docker/condaforge/automerge-action) on the `prod` tag. See the
repo [README.md](https://github.com/conda-forge/automerge-action#) for more details. PRs are automatically merged if they satisfy either
of the two following sets of conditions:

1. are from the `regro-cf-autotick-bot`, have `[bot-automerge]` in the title, all statuses are passing, and the feedstock allows automerge
2. have the `automerge` label and all statuses are passing.

For PRs from the `regro-cf-autotick-bot`, it can be useful to remove the `[bot-automerge]` slug from the PR title if you are making
edits to the PR.

<a id="rerendering"></a>

#### Rerendering

The rerendering service is triggered by the Heroku app. It uses the GitHub action in this [repo](https://github.com/conda-forge/webservices-dispatch-action).
This action runs out of a Docker [container](https://hub.docker.com/repository/docker/condaforge/webservices-dispatch-action) on the `prod` tag. See the
repo [README.md](https://github.com/conda-forge/webservices-dispatch-action) for more details.

<a id="skipping-ci-builds"></a>

### Skipping CI builds

To skip a CI build for a given commit, put `[ci skip] ***NO_CI***` in the commit message.

:::note[Related links]

- **Abort builds with [skip ci]/etc** [(conda-forge.github.io/#629)](https://github.com/conda-forge/conda-forge.github.io/issues/629)
- **Skip CI requests** [(staged-recipes/#1148)](https://github.com/conda-forge/staged-recipes/issues/1148)

:::

<a id="third-party-use-of-our-ci-services"></a>

### Third-party Use of Our CI Services

Due to its stature in the open-source community, conda-forge has enhanced access to certain CI services. This access is a community
resource entrusted to conda-forge for use in building packages. We thus cannot support third-party or "off-label" CI jobs in our
feedstocks on any of our CI services. If we find such use, we will politely ask the maintainers to rectify the situation. We may
take more serious actions, including archiving feedstocks or removing maintainers from the organization, if the situation cannot be rectified.

<a id="compilers-and-runtimes"></a>

## Compilers and Runtimes

conda-forge builds and maintains its own set of compilers for various languages
and/or systems (e.g., `C`, `FORTRAN`, `C++`, `CUDA`, etc.). These are used
in all of our CI builds to build essentially all artefacts published by conda-forge.

This compiler infrastructure has a critical role beyond building everything, which
is to ensure that packages stay compatible with each other. This is due to how compiled
packages have a so-called [Application Binary Interface](../glossary.md#abi)
(ABI), and how changes in the compiler infrastructure may break this ABI, leading
to crashes, miscalculations, etc. Generally speaking, using a consistent compiler
version greatly reduces the risk of ABI breaks.

In the past, changes in the compiler upgrades in conda-forge sometimes required a
full rebuild of basically all compiled packages, to avoid breakage between packages
that have been compiled to different ABIs. Compilers also have different policies in
this regard: GCC promises to never break ABI, while MSVC changed (=broke) ABI with
every compiler release (although this is not the case anymore for the `vc14` series
currently covering VS2015-VS2022).

While it is likely that large-scale ABI breaks will happen again which require
a full rebuild of conda-forge (e.g. MSVC is planning a vNext after `vc14`), in recent
years we have managed to use more targetted rebuilds with less disruptive roll-outs.

We keep our policies for full rebuilds in place for the next time it will occur.
While we do not have any promises of support for a generation of ABI-compatible
compilers, we have historically maintained them according to the following (non-binding)
principles.

- The authoritative source of the current compilers and versions for various languages
  and platforms is the [conda_build_config.yaml](https://github.com/conda-forge/conda-forge-pinning-feedstock/blob/master/recipe/conda_build_config.yaml)
  in the [conda-forge/conda-forge-pinning-feedstock](https://github.com/conda-forge/conda-forge-pinning-feedstock)
  as described in [Globally pinned packages](pinning_deps.md#globally-pinned-packages).
- We provide no support of any kind in terms of the long-term stability/support of a given compiler generation.
- We upgrade them in an ad-hoc manner on a periodic basis as we have the time and energy to do so.
  Note that because of the way we enforce runtime constraints, these compiler upgrades will not break
  existing packages. However, if you are using the compilers outside of `conda`, then you may find issues.
- We generally provide notice in the form of an announcement when an ABI-incompatible compiler change is going to happen.
  Note that these changes take a bit of time to complete, so you will generally have time
  to prepare should you need to.
- Some of the criteria we think about when considering a compiler migration include:
  - the degree of disruption to the ecosystem,
  - the amount of work for the `core` team,
  - the amount of time it will cost our (volunteer) feedstock maintainers.

These compiler generations may or may not have some unofficial names for our
internal use (e.g. `comp7`). We note again that the existence of these names
does not imply any level of support or stability for the compilers
that form the given stack.

For the cases that do not require a complete rebuild of conda-forge (i.e. if the ABI
of a new compiler remains compatible), we can just increase the version in our global
pinning, and it will slowly roll out to the ecosystem as feedstocks get rerendered.

For such ABI-compatible upgrades, similar but looser principles apply:

- The pins are similarly defined in the global pinning, see [Globally Pinned Packages](pinning_deps.md#globally-pinned-packages).
- We provide no support of any kind in terms of the long-term availability of a given compiler version.
- We generally provide notice in the form of an announcement when a compiler is going to be upgraded.
- Without promising any timelines, our compilers on Linux and OSX are normally
  very recent; on Windows, we generally use the last supported VS version.

Despite the lack of explicit support, we try to keep the compilers in their various versions
working also outside of conda-forge, and even provide an easy way to install them
(through the [compilers feedstock](https://github.com/conda-forge/compilers-feedstock)).

More specifically, each compiler uses an _activation_ package that makes the difference
between it being merely present in a build environment, and it being used by default.
These will be installed when using `{{ compiler('xyz') }}` in `meta.yaml`, where
`'xyz'` is one of `'c', 'cxx', 'fortran', 'cuda', 'rust', 'go-cgo', 'go-nocgo'`.

Our default compiler stack is made up very differently on each platform; each platform
has its own default compiler, with its own set of feedstocks that provide them. Due to historical
reasons (the way compilers are integrated with their OS, and the amount of
software written in them, etc.), the most impactful languages are C & C++ (though
Fortran is considered part of the default, not least because GCC compiles all three).

Linux (GCC):

- [C, C++, Fortran] Activation: https://github.com/conda-forge/ctng-compiler-activation-feedstock/
- [C, C++, Fortran] Implementation: https://github.com/conda-forge/ctng-compilers-feedstock
- Note that when used in conjunction with CUDA, compiler versions are restricted by the
  maximum GCC version supported by nvcc (which is also reflected in the global pinning).

OSX (Clang):

- [C, C++] Activation: https://github.com/conda-forge/clang-compiler-activation-feedstock/
- [C, C++] Required feedstocks:
  [llvmdev](https://github.com/conda-forge/llvmdev-feedstock),
  [clangdev](https://github.com/conda-forge/clangdev-feedstock),
  [compiler-rt](https://github.com/conda-forge/compiler-rt-feedstock),
  [libcxx](https://github.com/conda-forge/libcxx-feedstock),
  [openmp](https://github.com/conda-forge/openmp-feedstock),
  [lld](https://github.com/conda-forge/lld-feedstock),
  [cctools](https://github.com/conda-forge/cctools-and-ld64-feedstock)
- [Fortran] Activation: https://github.com/conda-forge/gfortran_osx-64-feedstock/
- [Fortran] Implementation: https://github.com/conda-forge/gfortran_impl_osx-64-feedstock/

Windows (MSVC):

- [C, C++] Activation: https://github.com/conda-forge/vc-feedstock
  (we cannot redistribute the actual MSVC compilers due to licensing constraints)
- [Fortran] Activation & Implementation: https://github.com/conda-forge/flang-feedstock

There exists an alternative, MinGW-based, compiler stack on Windows, which is available
with a `m2w64_` prefix (e.g. `{{ compiler('m2w64_c') }}`). However, it is falling out
of use now that most projects will natively support compilation also with MSVC, in addition
to several complications arising from mixing compiler stacks.

Additionally, there is a possibility to use `clang` as a compiler on Linux & Windows:

- Activation (Linux): https://github.com/conda-forge/ctng-compiler-activation-feedstock/
- Activation (Windows): https://github.com/conda-forge/clang-win-activation-feedstock/

Aside from the main C/C++/Fortran compilers, these are the feedstocks for the other compilers:

- [CUDA] https://github.com/conda-forge/nvcc-feedstock (CUDA infra currently being overhauled)
- [Rust] [Activation](https://github.com/conda-forge/rust-activation-feedstock)
  and [Implementation](https://github.com/conda-forge/rust-feedstock)
- [Go] [Activation](https://github.com/conda-forge/go-activation-feedstock)
  and [Implementation](https://github.com/conda-forge/go-feedstock)

To upgrade the compiler version of our default compilers in the global pinning for
Linux or OSX, ensure that the respective above-mentioned feedstocks have been rebuilt
for the new major version, that all interrelated versions are lifted at the same time,
and obviously that the compilers work (e.g. by testing them on some feedstocks by
specifying the new version through the feedstock-local `conda_build_config.yaml`).
You should also check the compiler release notes for warnings about ABI incompatibilities,
and mention any such notices in the discussion about the upgrade.

For Windows, we stay on older compilers for longer, because using a newer toolchain
would force everyone wanting to locally develop with conda-forge artefacts to use
a toolchain that's at least as new. You can find more details about this topic in this
[issue about updating to the vc142 toolchain](https://github.com/conda-forge/conda-forge.github.io/issues/1732).

<a id="centos-sysroot-for-linux-platforms"></a>

### CentOS `sysroot` for `linux-*` Platforms

We currently repackage the `sysroot` from the appropriate version of CentOS for use
with our compilers. These `sysroot` files are available in the `sysroot_linux-*` packages.
These packages have version numbers that match the version of `glibc` they package. These
versions are `2.12` for CentOS 6 and `2.17` for CentOS 7.

For `gcc`/`gxx`/`gfortran` versions prior to `8.4.0` on `ppc64le` and `7.5.0`
on `aarch64`/`x86_64`, we had been building our own versions of `glibc`. This practice
is now deprecated in favor of the CentOS-based `sysroots`. Additionally, as of the same
compiler versions above, we have removed the `cos*` part of the `sysroot` path. The new
`sysroot` path has in it simply `conda` as opposed to `conda_cos6` or `conda_cos7`.

<a id="output-validation"></a>

<a id="output-validation-and-feedstock-tokens"></a>

## Output Validation and Feedstock Tokens

As of writing, `anaconda.org` does not support generating API tokens that are scoped
to allow uploads for some packages but not others. In order to secure feedstock uploads,
so that, e.g., the maintainers of the `numpy` feedstock cannot push a `python` package,
we use a package staging process and issue secret tokens, unique to each feedback. This process
works as follows.

1. When a CI job on a feedstock is building packages to be uploaded to `anaconda.org`, it
   first uploads them to a staging channel, `cf-staging`.
2. Then the feedback CI job makes an API call to our admin webservices server with its secret token
   and some information about the package it is trying to upload.
3. The webservices server validates the secret token, the integrity of the package, and
   that the package is allowed for the given feedstock.
4. If all of the validation passes, the package is then copied to the `conda-forge`
   channel.

We attempt to report errors in this process to users via comments on commits/issues in the feedstocks.
Note however that sometimes these fail. If you think you are having trouble with uploads, make
sure `conda_forge_output_validation: true` is set in your `conda-forge.yml` and rerender
your feedstock with the latest version of `conda-smithy`. Finally, new packages that are added to
feedstocks are registered automatically and once uploaded successfully, no other feedstock
will be able to upload packages with the same name.

Sometimes, however, it might make better sense to generate a package from a different
feedstock, say, due to package renaming or re-structuring. In this case, you may need
to add the new feedstock to the [feedstock-outputs](https://github.com/conda-forge/feedstock-outputs) map.
If this is not done, then the output validation process will block the package from being
uploaded from the new feedstock, by design.
Once this is done correctly and the package is uploaded,
you can then request the conda-forge core devs to archive the old feedstock.

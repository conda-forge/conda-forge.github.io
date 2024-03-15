---
title: 'Infrastructure'
---

# Infrastructure

## Repositories

### Staged-recipes

This repository is the gateway to conda-forge and where users can submit new recipes which, once reviewed and accepted, will generate a new feedstock and team.
You can find the detailed guide for submitting new package recipes in [The staging process](adding_pkgs.md#creating-recipes).

- ⚙️ Deployed in [`conda-forge/staged-recipes`](https://github.com/conda-forge/staged-recipes)
- 🔒 Has access to Anaconda.org (cf-staging)
- 🤖 Integrated with [`webservices`](#webservices)

#### Anatomy of staged-recipes

`recipes/` contains one or more _subdirectories_ with user-submitted recipes.
Most cases will only submit one recipe at a time, but if several subdirectories are present, the `build_all.py` script will build them in the right order so dependencies are satisfied.

`.ci_support` contains the conda-build YAML configuration files, but in this case (if compared to feedstocks), you will also find some scripts:

- `build_all.py`: Calls conda-build in the right (topographically sorted) order.
- `compute_build_graph.py`: Supports `build_all.py` by providing the job graph with all the submitted recipes.

The YAML files included in `.ci_support` are minimal and not rendered like the ones you find in feedstocks.
Instead, conda-build will take these and combine them with the pinnings from `conda-forge-pinning` at runtime.
Also note that `staged-recipes` only builds for x64. Support for additional architectures can only be done once a feedstock has been provided.

- Linux: `linux64.yaml` plus the CUDA (10.2, 11.0, 11.1 and 11.2) variants.
- macOS: `osx64.yaml`.
- Windows `win64.yaml`.

The directory `.scripts` contains roughly the same shell scripts that would be used in a feedstock for the CI pipelines.
However, since `staged-recipes` does not support rerendering, these are kept in sync manually and it is common to see some differences.

#### Workflows

The main job run on `staged-recipes` is the `conda-build` job that runs on every PR (and push to `main`) to check whether the recipes build packages correctly.
These jobs run on Azure Pipelines defined in [`.azure-pipelines/`](https://github.com/conda-forge/staged-recipes/tree/main/.azure-pipelines).

The actual creation of the feedstock is run in [conda-forge/admin-requests](#admin-requests).

Additional workflows help users set up their recipes correctly. They react to events in PRs:

- [`automate-review-labels`](https://github.com/conda-forge/staged-recipes/blob/main/.github/workflows/automate-review-labels.yml): Updates PR labels to streamline reviews and requests for help.
- [`correct_directory`](https://github.com/conda-forge/staged-recipes/blob/main/.github/workflows/correct_directory.yml): Posts a PR comment if `meta.yaml` and friends were not added in a `recipes/` subdirectory.
- [`do_not_edit_example`](https://github.com/conda-forge/staged-recipes/blob/main/.github/workflows/do_not_edit_example.yml): Posts a PR comment if the `recipes/example/` recipe was edited.

External services connect to `staged-recipes` too:

- The `@conda-forge-linter` bot (deployed at [`webservices`](#webservices)) will lint and provide hints in PRs based on the contents of the recipe.

### Website

The current [conda-forge.org](https://conda-forge.org) is a statically generated website published to Github Pages.

- 📜 Source at [conda-forge/conda-forge.github.io](https://github.com/conda-forge/conda-forge.github.io/)
- ⚙️ Deployed in [conda-forge.org](https://conda-forge.org/)
- 🤖 to enhance the utility of the documentation we also use
  - PR previews at [Netlify](https://app.netlify.com/sites/conda-forge-previews)
  - Statistics at [GoatCounter](https://conda-forge.goatcounter.com/)
  - Search powered by [Algolia](https://dashboard.algolia.com/apps/KB43FQOB7U/dashboard)

The documentation is built with Docusaurus and the source files are located in the [`docs/`](https://github.com/conda-forge/conda-forge.github.io/tree/main/docs) directory of the repository.

If you find any typos, errors, unclear explanations, or new topics that can be covered, you can suggest changes to the documentation. For more details, please refer to [Improve the documentation](../user/contributing.md#improve-docs).

In addition to the static documentation, the website also offers information on the current status of conda-forge as well as a mapping of packages to feedstocks.

- Status: [conda-forge.org/status](https://conda-forge.org/status)
- Packages-to-feedstock mapping: [conda-forge.org/feedstock-outputs](https://conda-forge.org/feedstock-outputs)

### Smithy

This is the main feedstock creation and maintenance tool.

- 📜 Source at [`conda-forge/conda-smithy`](https://github.com/conda-forge/conda-smithy)
- 📦 Packaged at [`conda-forge/conda-smithy-feedstock`](https://github.com/conda-forge/conda-smithy-feedstock)
- 📖 [Documentation](https://github.com/conda-forge/conda-smithy/blob/main/README.md)

Most of its usage is automated by our infrastructure:

- Feedstock creation and services registration at [`staged-recipes`](#staged-recipes)
- Regeneration (rerendering), linting and hinting in PRs done by `conda-forge-linter` on [`webservices`](#web-services)

However, you can also use it locally or on your forge-like deployments. For local debugging, you will find these commands useful:

- `conda-smithy rerender`
- `conda-smithy recipe-lint`

Smithy contains maintenance code for conda-forge, which is used by the `conda-smithy` command line tool and the [Admin web services](#admin-web-services).

`conda-forge/conda-smithy` is the right repository to report bugs for

- The rerendering process
- The recipe linter
- [CI](../glossary.md#term-CI) support utils

`conda-smithy` also contains the command line tool that you should use if you rerender manually from the command line (see [Rerendering feedstocks](updating_pkgs.md#dev-update-rerender)).

Smithy can be used beyond conda-forge's purposes. For example, it can be used to set up self-hosted Azure agents for non-conda-forge infrastructures.
(You could also consider using [Azure virtual machine scale set agents](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/scale-set-agents?view=azure-devops),
which could be less expensive to run than permanently active agents.)

### Web services

The Heroku app providing the conda-forge web services lives in [conda-forge/conda-forge-webservices](https://github.com/conda-forge/conda-forge-webservices).
Please note that the code logic provided by the app is in the `Smithy` repository.

Bugs or suggestions regarding the service functionality should therefore be opened in `conda-forge/conda-smithy`'s [bug tracker](https://github.com/conda-forge/conda-smithy/issues).

### conda-forge pinning

Hosts the global pinnings for conda-forge, and the ongoing migrations.

- ⚙️ Deployed in [Anaconda.org](https://anaconda.org/conda-forge/conda-forge-pinning) via [`conda-forge/conda-forge-pinning-feedstock`](https://github.com/conda-forge/conda-forge-pinning-feedstock)
- 🔒 Has access to Azure, Anaconda.org (cf-staging)

Package-wide dependency pins are defined in [conda_build_config.yaml](https://github.com/conda-forge/conda-forge-pinning-feedstock/blob/master/recipe/conda_build_config.yaml) in the [conda-forge/conda-forge-pinning-feedstock](https://github.com/conda-forge/conda-forge-pinning-feedstock).

For more information on conda-forge wide package pins, please refer to [Globally pinned packages](pinning_deps.md#globally-pinned-packages).

Please open a [PR](../glossary.md#term-PR) and/or an issue there, if you think a pin needs to be advanced. For more information on updating globally pinned packages, please refer to [Updating package pins](pinning_deps.md#update-pins).

### conda-forge-repodata-patches

This repository creates the `repodata.json` patches used by the Anaconda.org to amend the metadata coming from the published packages.

- ⚙️ Deployed in [Anaconda.org](https://anaconda.org/conda-forge/conda-forge-repodata-patches) via [`conda-forge/conda-forge-repodata-patches-feedstock`](https://github.com/conda-forge/conda-forge-repodata-patches-feedstock)
- 🔒 Has access to Azure, Anaconda.org (cf-staging)

### conda-forge-ci-setup

This special feedstock provides a package that defines the logic to install and configure a common CI setup across providers.

- ⚙️ Deployed in [Anaconda.org](https://anaconda.org/conda-forge/conda-forge-ci-setup) via [`conda-forge/conda-forge-ci-setup-feedstock`](https://github.com/conda-forge/conda-forge-ci-setup-feedstock)
- 🔒 Has access to Azure, Anaconda.org (cf-staging)

### docker-images

This repository builds the Docker images used to provide a unified system on all Linux builds.

- ⚙️ Deployed in [`conda-forge/docker-images`](https://github.com/conda-forge/docker-images)
- 🔒 Has access to [DockerHub](#docker-hub) and [Quay.io](#quay)
- ⛓ Needed by `staged-recipes`, feedstocks.

### regro/cf-scripts

The code and logic behind [`autotick-bot`](#autotick-bot).

- 📜 Source at [`regro/cf-scripts`](https://github.com/regro/cf-scripts)
- 📖 [Documentation](https://regro.github.io/cf-scripts/)

### regro/cf-graph-countyfair

This is the graph data used by [`autotick-bot`](#autotick-bot).

- ⚙️ Deployed in [Github Actions via `regro/cf-graph-countyfair`](https://github.com/regro/cf-graph-countyfair)
- ⛓ Needs [`regro/cf-scripts`](#regrocf-scripts), [`conda-forge/conda-forge-pinning-feedstock`](#conda-forge-pinning)
- 🤖 Uses [`@regro-cf-autotick-bot`](#bot-accounts)
- 🔒 Has access to Github API

The logic to build the graph is provided by [`cf-scripts`](#regrocf-scripts).

### Others

- [`regro/conda-suggest-conda-forge`](https://github.com/regro/conda-suggest-conda-forge) provides [`conda-suggest`](https://github.com/conda-incubator/conda-suggest) files that map executables to package names.

### Automated maintenance

These components perform actions in automated ways, either triggered by a specific event or continuously as part of a loop.

#### admin-migrations

- ⚙️ Deployed in [Github Actions via `conda-forge/admin-migrations`](https://github.com/conda-forge/admin-migrations)
- 🤖 Uses [`@conda-forge-curator`](https://github.com/apps/conda-forge-curator)
- 🔒 Has access to Github API, Anaconda.org (conda-forge and cf-staging), Circle, Travis, Azure

This repository hosts workflows that are running 24/7.
Its job is to procure an automation loop where some maintenance tasks are added.
Its main user is the core team.

#### admin-requests

- ⚙️ Deployed in [Github Actions via `conda-forge/admin-requests`](https://github.com/conda-forge/admin-requests)
- 🤖 Uses [`@conda-forge-curator`](https://github.com/apps/conda-forge-curator)
- 🔒 Has access to Github API, Anaconda.org (conda-forge and cf-staging), Circle, Travis, Azure

This repository hosts workflows that mainly run when triggered by a user-initiated action.
This is usually done via a PR that, once approved, is merged and triggers the requested action (mark a package as broken, archive a feedstock, etc).

It also does the job of creating new feedstocks for recipes that have been merged in [`conda-forge/staged-recipes`](#staged-recipes).
The [`create_feedstocks` workflow](https://github.com/conda-forge/admin-requests/blob/main/.github/workflows/create_feedstocks.yml) runs every 10 minutes to create the new feedstock repositories on the `conda-forge` organization.
The core logic is defined in the Python script [`.github/workflows/scripts/create_feedstocks.py`](https://github.com/conda-forge/staged-recipes/blob/main/.github/workflows/scripts/create_feedstocks.py).

#### autotick-bot

- ⚙️ Deployed in [`regro/cf-scripts`](https://github.com/regro/cf-scripts)
- ⛓ Needs [`regro/cf-scripts`](https://github.com/regro/cf-scripts), [`regro/cf-graph-countyfair`](https://github.com/regro/cf-graph-countyfair), [`conda-forge/conda-forge-pinning-feedstock`](https://github.com/conda-forge/conda-forge-pinning-feedstock)
- 🤖 Uses [`@regro-cf-autotick-bot`](https://github.com/regro-cf-autotick-bot)

:::note
The older repo [`regro/autotick-bot`](https://github.com/regro/autotick-bot) is no longer in use;
the bot now runs directly in `regro/cf-scripts`.
:::

#### webservices

- ⚙️ Deployed in Heroku Dyno (`conda-forge.herokuapp.com`)
- ⛓ Needs [`conda-forge/conda-forge-webservices`](https://github.com/conda-forge/conda-forge-webservices)
- 🤖 Uses [`@conda-forge-webservices`](https://github.com/apps/conda-forge-webservices), [`@conda-forge-admin`](https://github.com/conda-forge-admin), [`@conda-forge-linter`](https://github.com/conda-forge-linter)
- 🔒 Has access to Github API, Anaconda.org (cf-staging and conda-forge), Heroku

This web application powers several services, like:

- the `@conda-forge-admin, please ...` commands
- the `@conda-forge-linter` bot
- the `cf-staging` to `conda-forge` validation (plus copy)
- status monitoring

## Admin web services

conda-forge is running a webservice on Heroku called [conda-forge-webservices](https://github.com/conda-forge/conda-forge-webservices).

The following services are run by default on a feedstock:

- It will lint the recipes in the PRs and report back whether the recipe is in excellent condition or not.
- When maintainers are added to a recipe, each of the maintainers will be added to the team and given push access to the feedstock.

The webservice also listens to issues and PR comments, so that you can ask for the following services to be done:

### @conda-forge-admin, please rerender

Entering the above phrase in a PR of a feedstock will rerender the feedstock and push the changes to your PR.
Make sure to tick the `Allow edits from maintainers` button located at the bottom of the right side bar of
the PR. If you enter this phrase in the comment for an issue, the bot will create a new pull request, with the requested
re-rendering being completed.

### @conda-forge-admin, please add noarch: python

Entering the above phrase in a PR or an issue of a feedstock will add `noarch: python` to the build and rerender the feedstock
for you.

### @conda-forge-admin, please lint

Entering the above phrase in a PR of a feedstock will lint the PR again.

### @conda-forge-admin, please update team

Entering the above phrase in an issue will update the team for the feedstock. This is usually done automatically.

### @conda-forge-admin, please restart ci

Entering this command in the PR of a feedstock or staged-recipes will close and then open the PR, causing
all of the CI builds to restart.

### @conda-forge-admin, please ping team

Entering this command in the PR of a feedstock or staged-recipes will have the admin bot @-mention the team
associated with the repo. This command can be useful for people who are not yet members of conda-forge and
so cannot @-mention the `staged-recipes` team for PR reviews.

### @conda-forge-admin, please ping conda-forge/<team>

Entering this command in the PR of a feedstock or staged-recipes will have the admin bot @-mention the respective team.
This command can be useful for people who are not yet members of conda-forge and
so cannot @-mention someone due to the general GitHub limitations.

### @conda-forge-admin, please rerun bot

Entering this command in a PR comment will add the `bot-rerun` label to that PR. This label will cause
the `auto-tick` bot that issues migration and version updates to close the current PR and reissue it.
Adding this label to non-bot issued PRs will have no effect.

### @conda-forge-admin, please add bot automerge

Entering this command in the title or comment of an issue will instruct the admin bot to
open a PR enabling the automatic merging of passing PRs from the `auto-tick`
bot. This functionality is currently experimental. You can find more details
[here](#automerge).
Please open issue on `regro/cf-scripts` for any feedback, bugs, and/or questions!

### @conda-forge-admin, please remove bot automerge

Entering this command in the title or comment of an issue will instruct the admin bot to
open a PR to disable automerge, undoing the `please add bot automerge` command.

### @conda-forge-admin, please add user @username

Entering the above phrase in the title of an issue on a feedstock will make a PR
that adds the given user to the feedstock. A maintainer or member of `core` can then merge
this PR to add the user. Please do not modify this PR or adjust the commit message. This
PR is designed to skip building the package.

### @conda-forge-admin, please update version

Entering the above phrase in the title of an issue on a feedstock will request the bot
to check if there are any new versions available. If there are, it will open a PR with
with the needed changes. Note that the bot might start by opening a PR with only partial
changes. The rest of the contents will be added in a subsequent commit after a few minutes.

## CI build services

Here we describe common issues with the CI Services that conda-forge builds.

### Azure Pipelines

Azure is used to build packages for OSX, Linux (x86_64, native), Linux (ARMv8, emulated) and Linux (IBM Power8+, emulated).
The build queue on Azure is substantially larger than on all the other providers.
Azure builds have a maximum duration of 6 hours.

To see all builds on Azure, visit [https://dev.azure.com/conda-forge/feedstock-builds/\_build](https://dev.azure.com/conda-forge/feedstock-builds/_build).

#### Restarting builds

Presently Azure does not sync GitHub users. In order to restart a build you can restart it from the GitHub checks interface.
If that doesn't work, a close/open will kick off a new build. You can also use the web services command `@conda-forge-admin, please restart ci`.

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

### TravisCI (IBM Power 8+, ARM)

TravisCI is used to build packages for IBM Power 8+ and ARM. After merging a staged-recipes pull request, it might be necessary to
force sync your repositories in TravisCI to see the reload and cancel buttons. To do this please visit [https://app.travis-ci.com/account/repositories](https://app.travis-ci.com/account/repositories)
and click the "Sync accounts" button.

#### Enabling Travis

TravisCI should only be needed to build recipes on OSX, if there is a strange failure on Azure.

Enable a build by adding the following to `conda-forge.yml` in the root of the feedstock.

```yaml
provider:
  osx: travis
```

For IBM Power 8+ and/or ARM builds, add the name of your feedstock to the list [here](https://github.com/conda-forge/conda-forge-pinning-feedstock/blob/master/recipe/migrations/arch_rebuild.txt)
via a pull request.

### GitHub Actions

We use GitHub actions to rerender feedstocks and also run our pull request automerge service. We do not currently support builds on
GitHub Actions.

#### Automerge

The automerge service uses the GitHub action in this [repo](https://github.com/conda-forge/automerge-action). This action runs out of a
Docker [container](https://hub.docker.com/repository/docker/condaforge/automerge-action) on the `prod` tag. See the
repo [README.md](https://github.com/conda-forge/automerge-action#) for more details. PRs are automatically merged if they satisfy either
of the two following sets of conditions:

1. are from the `regro-cf-autotick-bot`, have `[bot-automerge]` in the title, all statuses are passing, and the feedstock allows automerge
2. have the `automerge` label and all statuses are passing.

For PRs from the `regro-cf-autotick-bot`, it can be useful to remove the `[bot-automerge]` slug from the PR title if you are making
edits to the PR.

#### Rerendering

The rerendering service is triggered by the Heroku app. It uses the GitHub action in this [repo](https://github.com/conda-forge/webservices-dispatch-action).
This action runs out of a Docker [container](https://hub.docker.com/repository/docker/condaforge/webservices-dispatch-action) on the `prod` tag. See the
repo [README.md](https://github.com/conda-forge/webservices-dispatch-action) for more details.

### Skipping CI builds

To skip a CI build for a given commit, put `[ci skip] ***NO_CI***` in the commit message.

:::note[Related links]

- **Abort builds with [skip ci]/etc** [(conda-forge.github.io/#629)](https://github.com/conda-forge/conda-forge.github.io/issues/629)
- **Skip CI requests** [(staged-recipes/#1148)](https://github.com/conda-forge/staged-recipes/issues/1148)

:::

### Third-party Use of Our CI Services

Due to its stature in the open-source community, conda-forge has enhanced access to certain CI services. This access is a community
resource entrusted to conda-forge for use in building packages. We thus cannot support third-party or "off-label" CI jobs in our
feedstocks on any of our CI services. If we find such use, we will politely ask the maintainers to rectify the situation. We may
take more serious actions, including archiving feedstocks or removing maintainers from the organization, if the situation cannot be rectified.

## Compilers and Runtimes

conda-forge builds and maintains its own set of compilers for various languages
and/or systems (e.g., `C`, `FORTRAN`, `C++`, `CUDA`, etc.). These are used
in all of our CI builds to build both core dependencies (e.g., `Python`) and maintainer-contributed
packages. While we do not have any formal policies or promises of support for these
compilers, we have historically maintained them according to the following (non-binding)
principles.

- The authoritative source of the current compilers and versions for various languages
  and platforms is the [conda_build_config.yaml](https://github.com/conda-forge/conda-forge-pinning-feedstock/blob/master/recipe/conda_build_config.yaml)
  in the [conda-forge/conda-forge-pinning-feedstock](https://github.com/conda-forge/conda-forge-pinning-feedstock)
  as described in [Globally pinned packages](pinning_deps.md#globally-pinned-packages).
- We provide no support of any kind in terms of the long-term stability of these pinnings.
- We upgrade them in an ad-hoc manner on a periodic basis as we have the time and energy to do so.
  Note that because of the way we enforce runtime constraints, these compiler upgrades will not break
  existing packages. However, if you are using the compilers outside of `conda`, then you may find issues.
- We generally provide notice in the form of an announcement when a compiler is going to be upgraded.
  Note that these changes take a bit of time to complete, so you will generally have time
  to prepare should you need to.
- Some of the criteria we think about when considering a compiler migration include:
  - the degree of disruption to the ecosystem,
  - the amount of work for the `core` team,
  - the amount of time it will cost our (volunteer) feedstock maintainers.

We do use some unofficial names for our compiler stack internally. Note however that
the existence of these names does not imply any level of support or stability for the compilers
that form the given stack.

- Our current compiler stack is referred to internally as `comp7`.
- The previous compiler stack based in part on the various `toolchain_*` packages
  was sometimes referred to as `comp4`. On linux the `toolchain_*` compilers were
  GCC 4.8.2 as packaged in the devtoolset-2 software collection. On osx, we use clang from
  Apple's Xcode in the `toolchain_*` packages.

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

## Services & providers

### Github resources

In addition to the thousands of repositories, conda-forge uses several other Github services.

#### Organizations

- [`conda-forge`](https://github.com/conda-forge): the main organization
- [`regro`](https://github.com/regro): hosts the `autotick-bot` machinery
- [`channel-mirrors`](https://github.com/channel-mirrors): OCI mirror of the conda-forge channel

:::info
These organizations exist but they are not in active use anymore:

- [`conda-forge-abandoned`](https://github.com/conda-forge-abandoned)
- [`conda-forge-woodpecker-admins`](https://github.com/conda-forge-woodpecker-admins)

:::

#### Teams

The `conda-forge` Github organization has thousands of teams.
Most of them are associated with a feedstock, but there are a few special ones that are not!

- [`Core`](https://github.com/orgs/conda-forge/teams/Core)
- [`staged-recipes`](https://github.com/orgs/conda-forge/teams/staged-recipes)
- [`help-c-cpp`](https://github.com/orgs/conda-forge/teams/help-c-cpp)
- [`help-cdts`](https://github.com/orgs/conda-forge/teams/help-cdts)
- [`help-go`](https://github.com/orgs/conda-forge/teams/help-go)
- [`help-java`](https://github.com/orgs/conda-forge/teams/help-java)
- [`help-julia`](https://github.com/orgs/conda-forge/teams/help-julia)
- [`help-nodejs`](https://github.com/orgs/conda-forge/teams/help-nodejs)
- [`help-osx-arm64`](https://github.com/orgs/conda-forge/teams/help-osx-arm64)
- [`help-perl`](https://github.com/orgs/conda-forge/teams/help-perl)
- [`help-ppc64le`](https://github.com/orgs/conda-forge/teams/help-ppc64le)
- [`help-pypy`](https://github.com/orgs/conda-forge/teams/help-pypy)
- [`help-python`](https://github.com/orgs/conda-forge/teams/help-python)
- [`help-python-c`](https://github.com/orgs/conda-forge/teams/help-python-c)
- [`help-r`](https://github.com/orgs/conda-forge/teams/help-r)
- [`help-ruby`](https://github.com/orgs/conda-forge/teams/help-ruby)
- [`miniforge`](https://github.com/orgs/conda-forge/teams/miniforge)
- [`all-members`](https://github.com/orgs/conda-forge/teams/all-members)

#### Configuration

- [`conda-forge/.github`](https://github.com/conda-forge/.github): Organization-wide configuration, profile information, etc.
- [`conda-forge/.cirun`](https://github.com/conda-forge/.cirun): Organization-wide configuration for special ci runners (e.g. GPU), c.f. [Cirun](#cirun).

#### Bot accounts

- [`conda-forge-admin`](https://github.com/conda-forge-admin)
- [`conda-forge-bot`](https://github.com/conda-forge-bot)
- [`conda-forge-coordinator`](https://github.com/conda-forge-coordinator)
- [`conda-forge-daemon`](https://github.com/conda-forge-daemon)
- [`conda-forge-linter`](https://github.com/conda-forge-linter)
- [`conda-forge-manager`](https://github.com/conda-forge-manager)
- [`conda-forge-status`](https://github.com/conda-forge-status)
- [`regro-cf-autotick-bot`](https://github.com/regro-cf-autotick-bot)

:::info
These accounts exist but are not in active usage anymore:

- [`conda-forge-drone-ci`](https://github.com/conda-forge-drone-ci)

:::

#### Apps

- `conda-forge-curator`
- `conda-forge-webservices`

:::info
These apps exist but are not in active usage anymore:

- `conda-forge drone instance`

:::

#### Workflows

- [`beckermr/turnstyle-python`](https://github.com/beckermr/turnstyle-python): Prevents multiple CI jobs from running in parallel to avoid race conditions.
- [`conda-forge/automerge-action`](https://github.com/conda-forge/automerge-action)
- [`conda-forge/github-app-token`](https://github.com/conda-forge/github-app-token) (fork)
- [`conda-forge/webservices-dispatch-action`](https://github.com/conda-forge/webservices-dispatch-action)

### Continuous integration

:::tip See also
Refer to the [`conda-forge.yml` documentation](/docs/maintainer/conda_forge_yml/) to learn how to configure your CI providers.
:::

#### Azure Pipelines

- 🌐 https://dev.azure.com/conda-forge/feedstock-builds/_build
- 📍 Available on all feedstocks
- 🛠 Provides [Microsoft-hosted runners](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/hosted?view=azure-devops&tabs=yaml) (x64 Linux, macOS and Windows)
- 🔒 Needs access to Anaconda.org (cf-staging)

conda-forge benefits from the generously offered Microsoft-hosted runners.

#### Travis CI

- 🌐 https://app.travis-ci.com/github/conda-forge
- 📍 Available on all feedstocks
- 🛠 Provides [native Linux aarch64 and ppc64le runners](https://docs.travis-ci.com/user/reference/overview/)
- 🔒 Needs access to Anaconda.org (cf-staging)

#### Cirun

- 🌐 https://cirun.io
- 📍 Available on selected feedstocks only
- 🛠 Provides several architectures (depending on feedstock configuration)
- 🔒 Needs access to Anaconda.org (cf-staging) and the configured backend

Configured with `@conda-forge-daemon`.

Organization-wide configuration can be found in the [`.cirun` repository](https://github.com/conda-forge/.cirun).

:::info
This allows, for example, access to GPU enabled runners for selected feedstocks as described in https://github.com/Quansight/open-gpu-server.
:::

#### Github Actions

- 🌐 https://github.com/features/actions
- 📍 Not available in feedstocks (only admin tasks)
- 🛠 Provides [GitHub-hosted runners](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners) (x64 Linux, macOS and Windows)
- 🔒 Has access to Github API

#### Retired services

- [AppVeyor](https://ci.appveyor.com/account/conda-forge/projects)
- Circle CI
- Drone.io

### Delivery and distribution

#### Anaconda.org

- 🌐 Channels/organizations: [`cf-staging`](https://anaconda.org/cf-staging/dashboard), [`conda-forge`](https://anaconda.org/conda-forge/dashboard)
- ⛓ Used by feedstocks

#### Docker Hub

- 🌐 https://hub.docker.com/u/condaforge/
- ⛓ Used by [`conda-forge/docker-images`](#docker-images), [`conda-forge/miniforge-images`](https://github.com/conda-forge/miniforge-images)

#### Github Packages

- 🌐 https://github.com/orgs/channel-mirrors/packages
- ⛓ Used by [`channel-mirrors/conda-oci-mirror`](https://github.com/channel-mirrors/conda-oci-mirror)

#### Github Releases

- 🌐 https://github.com/conda-forge/miniforge/releases
- ⛓ Used by [`conda-forge/miniforge`](https://github.com/conda-forge/miniforge)

#### Quay

- 🌐 https://quay.io/organization/condaforge
- ⛓ Used by [`conda-forge/docker-images`](#docker-images)

### Servers

#### Heroku

- 🌐 https://conda-forge.herokuapp.com/status-monitor
- ⛓ Used by [`webservices`](#webservices)

### Other services

- Google: `condaforge@gmail.com`
- Google Groups: [conda-forge](https://groups.google.com/g/conda-forge) (retired)
- HackMD: [conda-forge](https://hackmd.io/team/conda-forge)
- Open Collective: [conda-forge](https://opencollective.com/conda-forge/)
- Namecheap (conda-forge.org)
- Twitter: [@condaforge](https://twitter.com/condaforge)
- YouTube: [Conda Forge](https://www.youtube.com/@condaforge3075)

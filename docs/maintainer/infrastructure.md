---
title: 'Infrastructure'
---

# Infrastructure

This page gives an overview of the conda-forge infrastructure, that is, an account of the various pieces maintained by the conda-forge contributors as well as third-party providers that collectively form the basis for the operation of conda-forge.

We start with the different Github [repositories](#repositories) maintained by conda-forge itself, then describe the administrative commands available for use in those repositories, the so-called [Admin web services](#admin-web-services), followed by [the CI services](#ci-build-services), i.e. the third-party providers used for building and maintaining packages together.
After that, we turn to a description of some aspects of the build environment for packages in [Compilers and Runtimes](#compilers-and-runtimes), together with [details about the upload to the package server](#output-validation-and-feedstock-tokens).

[Then](#stages-of-package-building-and-involved-infrastructure), we see how the process of building a package interacts with different parts of the infrastructure.

We close out with a brief [listing of involved entities](#inventory-of-services--providers).

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

- Linux: `linux64.yaml` plus the CUDA variants.
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
- [`linter`](https://github.com/conda-forge/staged-recipes/blob/main/.github/workflows/linter.yml): General recipe linting plus some staged-recipes specific checks, like not editing the examples.

External services connect to `staged-recipes` too:

- The `@conda-forge-admin` bot (deployed at [`webservices`](#webservices)) will lint and provide hints in PRs based on the contents of the recipe.

### Feedstocks

- ⚙️ Deployed in Github repositories
- 🔒 Has access to Azure Pipelines, Github Actions, Anaconda.org (cf-staging)
- 🔐 Might have access to Travis CI, Cirun via `admin-requests` (WIP)
- 🤖 Integrated with [`admin-migrations`](#admin-migrations), [`admin-requests`](#admin-requests), the [`autotick-bot`](#autotick-bot), and [`webservices`](#webservices).

Conda-forge has thousands of feedstocks.
Each feedstock hosts a recipe plus the required pipelines, supporting scripts and configuration metadata.

The contents of a feedstock are well specified. Only two locations are user-managed:

- `recipe/`: Contains the conda-build instructions to build packages. It needs, at least, a `meta.yaml` file, and this is also where the optional `conda_build_config.yaml` usually goes.
- `conda-forge.yml`: This is the feedstock configuration file.

:::warning
You should never manually edit files _not_ listed above! Changes will be overridden in the next feedstock rerender.
:::

Combining these two sources with some external components, `conda-smithy` will generate (render) the contents of the feedstock. Many of the directories are named like that because it is what the external service (e.g. Azure) requests. However, some `conda-smithy`-unique directories are worth discussing:

- `.ci_support/`: Contains the rendered `conda_build_config.yaml` files, passed to `conda-build` via the `-m` flag. Each file here corresponds to one job in the CI build matrix.
- `.ci_support/migrations/`: Special YAML files that instruct `conda-smithy` how to update the `.ci_support/*.yaml` files. These migration files are usually put here by the [`autotick-bot`](#autotick-bot) infrastructure, and removed once the migration is considered finished.
- `.scripts/`: Common logic and code supporting the steps you can find in the CI pipelines and local debugging tools.
- `build-locally.py`: A Python script to debug recipes in your machine, roughly equivalent to what's done in the CI pipelines.

:::info Learn more (WIP)

- Rerendering a feedstock
- Recommended workflow

:::

#### feedstocks monorepo

A single repository containing all feedstocks as submodules.

- ⚙️ Deployed in [`conda-forge/feedstocks`](https://github.com/conda-forge/feedstocks)

#### feedstock-outputs

This repository is a registry of feedstock names and the packages (artifacts) they produce.

- ⚙️ Deployed in [Github Actions via `conda-forge/feedstock-outputs`](https://github.com/conda-forge/feedstock-outputs)
- 🔒 Has access to Azure, Anaconda.org (cf-staging)

Its main purpose is to provide an allow-list for the validation server to prevent malicious cross-feedstock builds, although it's also an informative map of `feedstocks <-> packages` that is exposed in the [packages section of the website](https://conda-forge.org/feedstock-outputs/).

### cdt-builds

- ⚙️ Deployed in [Azure Pipelines](https://dev.azure.com/conda-forge/cdt-builds/_build) via [`conda-forge/cdt-builds`](https://github.com/conda-forge/cdt-builds)
- 🔒 Has access to Azure Pipelines, Anaconda.org (cf-staging)

This special repository builds Core Dependency Tree packages for conda-forge (Linux only).
It doesn't use the feedstock automated machinery.
Instead, it has its own Azure Pipelines workflow and a well-documented README.

### msys2-recipes

- ⚙️ Deployed manually from [`conda-forge/msys2-recipes`](https://github.com/conda-forge/msys2-recipes)

This is a fork of the old community recipes repository at Anaconda, which includes the `msys2` recipes under the [`msys2/`](https://github.com/conda-forge/msys2-recipes/tree/master/msys2) directory.
Note also the supporting scripts in the [`common-scripts/`](https://github.com/conda-forge/msys2-recipes/tree/master/common-scripts) folder.

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

### Metadata repositories

These are repositories that primarily hold metadata used by other parts of the conda-forge ecosystem.

#### conda-forge pinning

Hosts the global pinnings for conda-forge, and the ongoing migrations.

- ⚙️ Deployed in [Anaconda.org](https://anaconda.org/conda-forge/conda-forge-pinning) via [`conda-forge/conda-forge-pinning-feedstock`](https://github.com/conda-forge/conda-forge-pinning-feedstock)
- 🔒 Has access to Azure, Anaconda.org (cf-staging)

Package-wide dependency pins are defined in [conda_build_config.yaml](https://github.com/conda-forge/conda-forge-pinning-feedstock/blob/master/recipe/conda_build_config.yaml) in the [conda-forge/conda-forge-pinning-feedstock](https://github.com/conda-forge/conda-forge-pinning-feedstock).

For more information on conda-forge wide package pins, please refer to [Globally pinned packages](pinning_deps.md#globally-pinned-packages).

Please open a [PR](../glossary.md#pr) and/or an issue there, if you think a pin needs to be advanced. For more information on updating globally pinned packages, please refer to [Updating package pins](pinning_deps.md#update-pins).

#### conda-forge-repodata-patches

This repository creates the `repodata.json` patches used by the Anaconda.org to amend the metadata coming from the published packages.

- ⚙️ Deployed in [Anaconda.org](https://anaconda.org/conda-forge/conda-forge-repodata-patches) via [`conda-forge/conda-forge-repodata-patches-feedstock`](https://github.com/conda-forge/conda-forge-repodata-patches-feedstock)
- 🔒 Has access to Azure, Anaconda.org (cf-staging)

#### conda-forge-ci-setup

This special feedstock provides a package that defines the logic to install and configure a common CI setup across providers.

- ⚙️ Deployed in [Anaconda.org](https://anaconda.org/conda-forge/conda-forge-ci-setup) via [`conda-forge/conda-forge-ci-setup-feedstock`](https://github.com/conda-forge/conda-forge-ci-setup-feedstock)
- 🔒 Has access to Azure, Anaconda.org (cf-staging)

#### regro/cf-graph-countyfair

This is the graph data used by [`autotick-bot`](#autotick-bot).

- ⚙️ Deployed in [Github Actions via `regro/cf-graph-countyfair`](https://github.com/regro/cf-graph-countyfair)
- ⛓ Needs [`regro/cf-scripts`](#regrocf-scripts), [`conda-forge/conda-forge-pinning-feedstock`](#conda-forge-pinning)
- 🤖 Uses [`@regro-cf-autotick-bot`](#bot-accounts)
- 🔒 Has access to Github API

The logic to build the graph is provided by [`cf-scripts`](#regrocf-scripts).

#### docker-images

This repository builds the Docker images used to provide a unified system on all Linux builds.

- ⚙️ Deployed in [`conda-forge/docker-images`](https://github.com/conda-forge/docker-images)
- 🔒 Has access to [DockerHub](#docker-hub) and [Quay.io](#quay)
- ⛓ Needed by `staged-recipes`, feedstocks.

### Code repositories

These are repositories that hold programs and other codes that define behavior.
However, their actions are often not triggered here, but rather used by other parts of the conda-forge ecosystem.

#### Smithy

This is the main feedstock creation and maintenance tool.

- 📜 Source at [`conda-forge/conda-smithy`](https://github.com/conda-forge/conda-smithy)
- 📦 Packaged at [`conda-forge/conda-smithy-feedstock`](https://github.com/conda-forge/conda-smithy-feedstock)
- 📖 [Documentation](https://github.com/conda-forge/conda-smithy/blob/main/README.md)
- 📖 [conda-forge.yml Documentation](https://conda-forge.org/docs/maintainer/conda_forge_yml/)

Most of its usage is automated by our infrastructure:

- Feedstock creation and services registration at [`staged-recipes`](#staged-recipes)
- Regeneration (rerendering), linting and hinting in PRs done by `conda-forge-admin` on [`webservices`](#web-services)

However, you can also use it locally or on your forge-like deployments. For local debugging, you will find these commands useful:

- `conda-smithy rerender`
- `conda-smithy recipe-lint`

Smithy contains maintenance code for conda-forge, which is used by the `conda-smithy` command line tool and the [Admin web services](#admin-web-services).

`conda-forge/conda-smithy` is the right repository to report bugs for

- The rerendering process
- The recipe linter
- [CI](../glossary.md#ci) support utils

`conda-smithy` also contains the command line tool that you should use if you rerender manually from the command line (see [Rerendering feedstocks](updating_pkgs.md#dev-update-rerender)).

Smithy can be used beyond conda-forge's purposes. For example, it can be used to set up self-hosted Azure agents for non-conda-forge infrastructures.
(You could also consider using [Azure virtual machine scale set agents](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/scale-set-agents?view=azure-devops),
which could be less expensive to run than permanently active agents.)

#### Web services

The Heroku app providing the conda-forge web services lives in [conda-forge/conda-forge-webservices](https://github.com/conda-forge/conda-forge-webservices).
Please note that the code logic provided by the app is in the `Smithy` repository.

Bugs or suggestions regarding the service functionality should therefore be opened in `conda-forge/conda-smithy`'s [bug tracker](https://github.com/conda-forge/conda-smithy/issues).

#### regro/cf-scripts

The code and logic behind [`autotick-bot`](#autotick-bot).

- 📜 Source at [`regro/cf-scripts`](https://github.com/regro/cf-scripts)
- 📖 [Documentation](https://github.com/regro/cf-scripts/blob/master/README.md)

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
The [`create_feedstocks` workflow](https://github.com/conda-forge/admin-requests/blob/main/.github/workflows/create_feedstocks.yml) runs several times per hour to create the new feedstock repositories on the `conda-forge` organization.
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
- 🤖 Uses [`@conda-forge-webservices`](https://github.com/apps/conda-forge-webservices), [`@conda-forge-admin`](https://github.com/conda-forge-admin)
- 🔒 Has access to Github API, Anaconda.org (cf-staging and conda-forge), Heroku

This web application powers several services, like:

- the `@conda-forge-admin` bot and its `@conda-forge-admin, please ...` commands
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

:::note[Using this command]

This is not the recommended way to start to help with a feedstock.
If you are interested in helping with a particular recipe, it is better to start by
submitting a PR with a new version or a fix. This way, you can get feedback on your
work and learn about some of the historical context of the feedstock.

Once you have established a working relationship with the maintainers, you can ask
them to add you to the feedstock team. They can then use this command
to add you to the team. There isn't any official requirement for how to add new
maintainers so it may take a while for consensus to be reached
on when to add new maintainers. Do not let this discourage you from contributing!

PRs are free to be opened by anyone!!! Thank you for your time and effort!!!

:::

### @conda-forge-admin, please update version

Entering the above phrase in the title of an issue on a feedstock will request the bot
to check if there are any new versions available. If there are, it will open a PR with
with the needed changes. Note that the bot might start by opening a PR with only partial
changes. The rest of the contents will be added in a subsequent commit after a few minutes.

## CI build services

Here we describe common issues with the CI Services that conda-forge builds.

### Azure Pipelines

Azure is used to build packages for Windows (native x86_64), macOS (native x86_64), Linux (native x86_64, emulated ARMv8 and IBM Power8+).
The build queue on Azure is substantially larger than on all the other providers.
Azure builds have a maximum duration of 6 hours.

To see all builds on Azure, visit [https://dev.azure.com/conda-forge/feedstock-builds/\_build](https://dev.azure.com/conda-forge/feedstock-builds/_build).

#### Restarting builds

Presently Azure does not sync GitHub users. In order to restart a build you can restart it from the GitHub checks interface.
If that doesn't work, a close/open will kick off a new build. You can also use the web services command `@conda-forge-admin, please restart ci`.

### TravisCI (IBM Power 8+, ARM)

TravisCI is used to build packages for IBM Power 8+ and ARM. After merging a staged-recipes pull request, it might be necessary to
force sync your repositories in TravisCI to see the reload and cancel buttons. To do this please visit [https://app.travis-ci.com/account/repositories](https://app.travis-ci.com/account/repositories)
and click the "Sync accounts" button.

#### Enabling Travis

TravisCI should only be needed to build recipes on native Linux aarch64 and ppc64le.

Enable a build by adding the corresponding line from the following to `conda-forge.yml` in the root of the feedstock.

```yaml
provider:
  osx: travis
  linux_ppc64le: travis
  linux_aarch64: travis
```

For IBM Power 8+ and/or ARM builds, add the name of your feedstock to the list [here](https://github.com/conda-forge/conda-forge-pinning-feedstock/blob/master/recipe/migrations/arch_rebuild.txt)
via a pull request.

### GitHub Actions

We use GitHub actions to rerender feedstocks and also run our pull request automerge service. We do not currently support builds on
GitHub Actions.

#### Webservices Background Jobs

The webservices Heroku app dispatches to GitHub Actions to run compute-intensive background jobs, including rerendering, version updates,
and automerge jobs. The GitHub actions runs happen on the [conda-forge-webservices repo](https://github.com/conda-forge/conda-forge-webservices).
These runs use the [webservices-dispatch-action Docker container](https://hub.docker.com/r/condaforge/webservices-dispatch-action) for some
operations. This container is tagged with the latest webservices version.

#### Automerge

Our automerge service runs via GitHub Actions in the [conda-forge-webservices repo](https://github.com/conda-forge/conda-forge-webservices).

PRs are automatically merged if they satisfy either of the two following sets of conditions:

1. are from the `regro-cf-autotick-bot`, have `[bot-automerge]` in the title, all statuses are passing, and the feedstock allows automerge
2. have the `automerge` label and all statuses are passing.

For PRs from the `regro-cf-autotick-bot`, it can be useful to remove the `[bot-automerge]` slug from the PR title if you are making
edits to the PR.

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

### External Runners (for GitHub Actions)

conda-forge provides feedstock maintainers a way to contribute/sponsor external runners via [Cirun](#cirun), when
their CI needs are not fulfilled with the current infrastructure. These external runners (i.e. specialized runners)
can be used for building packages on one or more feedstocks, depending on the maintainer. They are runners on a particular
cloud or a set of clouds, i.e. facilitating provisioning of external runners is basically committing sponsoring of
provisioning of ephemeral virtual machines on a [supported cloud](https://docs.cirun.io/cloud/). The process for the
same is described below:

- Get in touch with `conda-forge/core` to discuss your use case. This can be done with an issue in the relevant feedstock or via [Zulip](https://conda-forge.zulipchat.com).
- Once discussed, share credentials for a supported cloud with a `conda-forge/core` member, so that it can be added to conda-forge's Cirun account, alternatively
  the user can sponsor cloud credits for an existing conda-forge's cloud account.
- Add configuration for the runner's virtual machine in [`conda-forge/.cirun`](https://github.com/conda-forge/.cirun/blob/master/.cirun.global.yml)
  add a policy entry in [`.access.yml`](https://github.com/conda-forge/.cirun/blob/master/.access.yml) to allow access to the runner for
  a feedstock.
- Add the labels defined above in your `<package-feedstock>/recipe/conda_build_config.yaml`, under `github_actions_labels` and re-render the
  feedstock. See links below for some examples.

After the above steps are complete, the feedstock maintainer's should be able to use the defined runner for feedstock
repository's CI jobs.

#### External runner usage example

Pytorch currently uses a custom windows runner on Azure provisioned via [cirun](https://cirun.io) to build on windows.
This was sponsored by Prefix.dev. Below are the relevant pull requests for the same:

- https://github.com/conda-forge/.cirun/pull/14
- https://github.com/conda-forge/pytorch-cpu-feedstock/pull/231

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

Compilers generally strive to maintain ABI-compatibility across versions, meaning that
combining artefacts for the same target produced by different versions of the same
compiler will work together without issue. Due to the nature of the ABI (i.e. a vast
interface between software and hardware, with innumerable corner cases), it still
happens that unintentional changes for some specific aspect are introduced across
compiler versions, though in practice this does not lead to wide-spread issues.

In contrast, when compilers do intentionally change the ABI (as MSVC did with each
release before the `vc14` series currently covering VS2015-VS2022), _every_ compiled
package needs to be rebuilt for that new ABI, and cannot be mixed with builds for the
old ABI. While less likely nowadays, in principle it's also possible that a major
infrastructural overhaul in the compiler stack similarly forces a complete rebuild.

Such large-scale changes – requiring +/- all of conda-forge to be rebuilt – take a
lot of effort, though thankfully, in recent years such full rebuilds have not been
necessary and we managed to do less disruptive compiler upgrades.

However, large-scale ABI breaks remain a possibility (e.g. MSVC is planning a vNext
after `vc14`), and so we keep our policies for such a scenario in place.
While we do not have any formal promises of support for a generation of ABI-compatible
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
of a new compiler remains compatible, up to rare corner cases), we can just increase
the version in our global pinning, and it will slowly roll out to the ecosystem as
feedstocks get rerendered.

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

- [CUDA] [CUDA 12.0+](https://github.com/conda-forge/cuda-nvcc-feedstock) & [CUDA <12](https://github.com/conda-forge/nvcc-feedstock) (legacy)
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

### CentOS `sysroot` for `linux-*` Platforms

We currently repackage the `sysroot` from the appropriate version of CentOS/AlmaLinux for use
with our compilers. These `sysroot` files are available in the `sysroot_linux-*` packages.
These packages have version numbers that match the version of `glibc` they package. These
versions are `2.17` for CentOS 7, `2.27` for AlmaLinux 8 and `2.34` for AlmaLinux 9.

## Output Validation and Feedstock Tokens

As of writing, `anaconda.org` does not support generating API tokens that are scoped
to allow uploads for some packages but not others. In order to secure feedstock uploads,
so that, e.g., the maintainers of the `numpy` feedstock cannot push a `python` package,
we use a package staging process and issue secret tokens, unique to each feedstock. This process
works as follows.

1. When a CI job on a feedstock is building packages to be uploaded to `anaconda.org`, it
   first uploads them to a staging channel, `cf-staging`.
2. Then the feedstock CI job makes an API call to our admin webservices server with its secret token
   and some information about the package it is trying to upload.
3. The webservices server validates the secret token, the integrity of the package, and
   that the package is allowed for the given feedstock. As a part of the validation process, the
   package is copied from `cf-staging` to a secured, intermediate staging channel, `cf-post-staging`.
   This step prevents changes to the package while it is being validated.
4. If all of the validation passes, the package is then copied from `cf-post-staging` to the
   `conda-forge` channel.

There are two scenarios we consider:

### Package validation failed for a new output name

New packages that are added to existing feedstocks are not registered automatically in order to prevent
typo squatting and other malicious activities. Package outputs are added during feedstock creation.
If you move a package from one feedstock to another, add an output package, or change the name of a package,
you will need to request that the new package name be added to your feedstock via the
[admin-requests repo](https://github.com/conda-forge/admin-requests?tab=readme-ov-file#add-a-package-output-to-a-feedstock).

In rare cases, the package name may change regularly in a well-defined way (e.g., `libllvm18`, `libllvm19`, etc.).
In this case, you can use our [admin-requests repo](https://github.com/conda-forge/admin-requests?tab=readme-ov-file#add-a-package-output-to-a-feedstock)
to add a glob pattern that matches the new package name pattern. We use the Python `fnmatch` module syntax.
Output packages that match these patterns will be automatically registered for your feedstock.

### Package validation failed for an existing output name

We attempt to report errors in this process to users via comments on commits/issues in the feedstocks.
Sometimes these reports fail. If you think you are having trouble with uploads, make sure to check/try
the following things:

- Ensure that `conda_forge_output_validation: true` is set in your `conda-forge.yml`.
- Retry the package build and upload by pushing an empty commit to the feedstock.
- Rerender the feedstock in a PR from a fork of the feedstock and merge.
- Request a feedstock token reset via our [admin-requests repo](https://github.com/conda-forge/admin-requests?tab=readme-ov-file#reset-your-feedstock-token).

## Stages of package building and involved infrastructure

Packages in conda-forge are almost[^manual-builds] always built through CI.
However, when a new package enters conda-forge for the first time, it does so via a pull request in the [`staged-recipes` repository](#staged-recipes), whereas every new build of the package after that is built in its repository, the so-called feedstock.
Both places use slightly different CI setups and interact with the infrastructure accordingly.
Hence, we first describe the interaction at the start of a new package and then for existing packages in their respective feedstocks.

[^manual-builds]:
    Very few packages cannot be built through CI due to special resource
    requirements. These packages may be built and uploaded manually following the rules
    laid out in [CFEP-3](https://github.com/conda-forge/cfep/blob/main/cfep-03.md).

### Initial submission to staged-recipes

The `conda-forge/staged-recipes` repository uses several pieces of infrastructure.

On pull requests:

- Package building pipelines. These are slightly different than the ones running in feedstocks (they are not automatically generated by `conda-smithy`, but they do use the same underlying components).
- The linter is provided by `conda-smithy recipe-lint`, run by `@conda-forge-admin`.
- Auto-labeling logic, run by Github Actions workflows.

Authenticated services involved:

- Github, with permissions for:
  - PR labeling
- Azure Pipelines

The conversion of new recipes in `staged-recipes` to their respective feedstocks
happens in a cron job run by `admin-requests`. For more details see [admin-requests](#admin-requests).
As part of the feedstock creation, the new feedstock receives a webhook connecting it with the [webservices](#admin-web-services).

### Feedstock changes

A feedstock can receive changes for several reasons.

Pushes to `main` or other branches:

- The automated initialization commits following approval in `staged-recipes`.
  These are generated by `conda-smithy` and pushed by the automation in `admin-requests`.
- Automated maintenance commits triggered from `admin-migrations`.
- Rerender requests are handled by instances of `conda-forge/webservices-dispatch-action` and triggered by the [webservices](#admin-web-services).

Automatic pull requests can be opened by...

- `@conda-forge-admin`, responding to some issues with titles like `@conda-forge-admin, please...`.
- `@regro-cf-autotick-bot`, handling migrations and new versions being available.

...and closed by:

- `conda-forge/automerge-action`, if labeled accordingly.

On an open pull request:

- The building pipelines (more [below](#package-building)).
- The linter is provided by `conda-smithy recipe-lint`, run by `@conda-forge-admin`.
- The `@conda-forge-admin, please...` command comments, answered by `@conda-forge-admin`.

On issues:

- `@conda-forge-admin, please...` command issues, handled by `@conda-forge-admin`.

### Package building {#package-building}

The pipelines that build conda packages are used for both pull requests and push events in `main` and other branches.
The only difference is that the packages built during a pull request are not uploaded to the staging channel.
Maintaining these up-to-date across all feedstocks involves several repositories:

- `conda-smithy` is in charge of generating the CI pipelines themselves, together with the supporting scripts and configuration files.
  These pipelines and scripts can rely on code and data defined in the repositories below.
- `conda-forge-ci-setup-feedstock` provides the code needed to prepare and homogenize the CI runners across providers.
  It also does some checks before the artifacts are uploaded to `cf-staging`.
- `conda-forge-pinning-feedstock` defines which versions are supported for a number of runtimes and libraries, as well as the compilers used for certain languages and platforms.
- `docker-images` builds the standardized container images for Linux runners.
  This repository has additional authentication needs for Docker Hub, Quay.io.

The pipelines can run on several CI providers supported by `conda-smithy`, including:

- Azure DevOps Pipelines
- Travis CI
- Circle CI
- Appveyor
- Self-hosted Github Actions runners

Registration of hooks and triggers is also done by the `conda-smithy` app.

:::tip
`conda-smithy` supports more CI providers.
Check [its repository](https://github.com/conda-forge/conda-smithy) for more details.
:::

Authenticated services involved:

- Anaconda.org uploads to `cf-staging`

### Package validation and publication

Once built on `main` (or other branches), the conda packages are uploaded to an intermediary channel named `cf-staging`.
The CI job then makes a copy request to the webservices with the feedstock token and other metadata about the package.
From there, our webservices (`conda-forge/conda-forge-webservices`) does the following:

1. The webservices validates the package and copy request by
   - using the feedstock token to authenticate the copy request by the CI job
   - checking that the hash sum of the package on `cf-staging` from the `anaconda.org` API
     is the same as the value sent in the copy request by the CI job
   - checking that the feedstock is allowed to push the package using the
     `conda-forge/feedstock-outputs` repo
2. If all three check pass, the webservices copies the package to a secured, intermediate
   staging channel, `cf-post-staging` in order to ensure the package is not changed further during validation.
3. The webservices repeats the check of the package hash sum on `cf-post-staging` to ensure no changes were made
   during the initial validation step.
4. If the second hash sum check passes, the webservices copies the package to the `conda-forge` channel.

Authenticated services involved:

- Anaconda.org uploads to `conda-forge`, `cf-post-staging`, and `cf-staging`
- The `conda-forge-webservices` app deployment itself (currently at Heroku)

### Post-publication

Once uploaded to anaconda.org/conda-forge, packages are not immediately available to CLI clients.
They have to be replicated in the Content Distribution Network (CDN).
This step should ideally take around 15 minutes. In some circumstances, longer delays are possible. Check [conda-forge.org/status](https://conda-forge.org/status) in case of doubt.

After CDN replication, most packages available on anaconda.org/conda-forge won't suffer any further modifications.
However, in some cases, maintainers might need to perform some actions on the published packages:

- Patching their repodata
- Marking them as broken

#### Repodata patch

The metadata for `conda` packages is initially contained in each package archive (under `info/`).
`conda index` iterates over the published `conda` packages, extracts the metadata and consolidates all the found JSON blobs into a single JSON file: `repodata.json`.
This is where the hashes and file sizes are added too.
This is the metadata file that the CLI clients download initially to _solve_ the environment.

Since the metadata is external to the package files, some details can be modified without rebuilding packages, which simplifies some maintenance tasks notably.

Repodata patches are created in `conda-forge/conda-forge-repodata-patches-feedstock`, which generates (and uploads) a regular `conda` package as a result:
[`conda-forge-repodata-patches`](https://anaconda.org/conda-forge/conda-forge-repodata-patches/files).
Each of these timestamped packages contains the patch instructions for each channel subdir on conda-forge.
The Anaconda infrastructure takes the JSON files from these packages and applies them on top of the vanilla `repodata.json` (which remains available for download as `repodata_from_packages.json`).

Since `conda-forge-repodata-patches-feedstock` operates as a regular feedstock for package publication, there are no further infrastructural details to cover.

#### Mark a package as broken

Sometimes a package is faulty in ways that a repodata patch cannot amend (e.g. bad binary).
In these cases, conda-forge does not remove packages from Anaconda.org.
Instead, it marks them with the `broken` label, which has a special meaning:
packages labeled as such will be removed from the repodata via automated patches.
This action is reversible and doesn't change the direct URL of the artifact, which
can always be downloaded from e.g. a lockfile.

The main repository handling this is `conda-forge/admin-requests`, which features different
Github Actions workflows running every 15 minutes.

For this task, the Github Action workflow needs access to:

- Anaconda.org, to add (or remove) labels
- Github, to modify and commit the input files after success

## Inventory of services & providers

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

<!-- TODO: The following list is prone to getting out of date. We should generate it automatically. -->

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
- [`help-rust`](https://github.com/orgs/conda-forge/teams/help-rust)
- [`miniforge`](https://github.com/orgs/conda-forge/teams/miniforge)
- [`all-members`](https://github.com/orgs/conda-forge/teams/all-members)
- [`bot`](https://github.com/orgs/conda-forge/teams/bot)

#### Configuration

- [`conda-forge/.github`](https://github.com/conda-forge/.github): Organization-wide configuration, profile information, etc.
- [`conda-forge/.cirun`](https://github.com/conda-forge/.cirun): Organization-wide configuration for special ci runners (e.g. GPU), c.f. [Cirun](#cirun).

#### Bot accounts

- [`conda-forge-admin`](https://github.com/conda-forge-admin)
- [`conda-forge-daemon`](https://github.com/conda-forge-daemon)
- [`regro-cf-autotick-bot`](https://github.com/regro-cf-autotick-bot)

:::info
These accounts exist but are not in active usage anymore:

- [`conda-forge-bot`](https://github.com/conda-forge-bot)
- [`conda-forge-coordinator`](https://github.com/conda-forge-coordinator)
- [`conda-forge-drone-ci`](https://github.com/conda-forge-drone-ci)
- [`conda-forge-linter`](https://github.com/conda-forge-linter)
- [`conda-forge-manager`](https://github.com/conda-forge-manager)
- [`conda-forge-status`](https://github.com/conda-forge-status)

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

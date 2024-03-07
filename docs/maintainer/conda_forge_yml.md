---
title: 'Configuring conda-forge.yml'
---

<a id="configuring-conda-forge-yml"></a>

# Configuring conda-forge.yml

You can configure how conda-forge is set up and built via the `conda-forge.yml`
file that is present in the root directory of a feedstock.

Rerendering the feedstock after you modify this file is usually required and always a good idea (see [Rerendering feedstocks](updating_pkgs.md#dev-update-rerender)).

The next section describes in detail the top-level fields in  `conda-forge.yml`.

Note that each top-level CI provider field supports the `upload_packages` option.
When set to False this will override the default behaviour of attempting to
upload packages to anaconda.org, which can be useful for testing. For example:

```yaml
azure:
  upload_packages: False
```

<a id="top-level-fields"></a>

## Top-level fields

* [appveyor](#appveyor)
* [azure](#azure-config)
* [build_platform](#build-platform)
* [build_with_mambabuild](#build-with-mambabuild)
* [bot](#bot)
* [channel_priority](#channel-priority)
* [channels](#channels)
* [choco](#choco)
* [circle](#circle)
* [conda_build](#conda-build)
* [conda_build_tool](#conda-build-tool)
* [conda_forge_output_validation](#conda-forge-output-validation)
* [conda_install_tool](#conda-install-tool)
* [conda_solver](#conda-solver)
* [docker](#docker)
* [github](#github)
* [github_actions](#github-actions)
* [idle_timeout_minutes](#idle-timeout-minutes)
* [linux](#linux)
* [linux_aarch64](#linux-aarch64)
* [linux_ppc64le](#linux-ppc64le)
* [noarch_platforms](#noarch-platforms)
* [os_version](#os-version)
* [osx](#osx)
* [provider](#provider)
* [recipe_dir](#recipe-dir)
* [remote_ci_setup](#remote-ci-setup)
* [shellcheck](#shellcheck)
* [skip_render](#skip-render)
* [templates](#templates)
* [test_on_native_only](#test-on-native-only)
* [test](#test)
* [travis](#travis)
* [upload_on_branch](#upload-on-branch)
* [win](#win)

<a id="appveyor"></a>

<a id="id1"></a>

### appveyor

The top-level `appveyor` key specifies configurations for the Appveyor
CI service.  This is usually **read-only** and should not normally be manually
modified. Tools like conda-smithy may modify this, as needed.

<a id="azure-config"></a>

<a id="azure"></a>

### azure

This dictates the behavior of the Azure Pipelines CI service. It is a
mapping for Azure-specific configuration options. For example:

```yaml
azure:
  # flag for forcing the building all supported providers
  force: False
  # toggle for storing the conda build_artifacts directory (including the
  # built packages) as an Azure pipeline artifact that can be downloaded
  store_build_artifacts: False
  # toggle for freeing up some extra space on the default Azure Pipelines
  # linux image before running the Docker container for building
  free_disk_space: False
  # limit the amount of CI jobs running concurrently at a given time
  # each OS will get its proportional share of the configured value
  max_parallel: 25
  # set the timeoutInMinutes field for jobs in the azure pipeline.
  # jobs that take longer than this will be cancelled.
  # default: 360 (6 hours)
  timeout_minutes: 360
  # can also be set per-platform via
  # settings_linux:
  #   timeoutInMinutes: 360
```

<a id="self-hosted-azure-config"></a>

Below is an example configuration for setting up a self-hosted Azure agent for Linux:

```yaml
azure:
  settings_linux:
    pool:
      name: your_local_pool_name
      demands:
        - some_key -equals some_value
    workspace:
      clean: all
    strategy:
      maxParallel: 1
    timeoutInMinutes: 360
```

<a id="azure-swapfile"></a>

Below is an example configuration for adding a swapfile on an Azure agent for Linux:

```yaml
azure:
  settings_linux:
    swapfile_size: 10GiB
```

<a id="azure-pagefile"></a>

To increase the pagefile size on Windows, use this block:

```yaml
azure:
  settings_win:
    variables:
      SET_PAGEFILE: 'True'
```

<a id="bot"></a>

<a id="id2"></a>

### bot

This field controls the behavior of the `auto-tick` bot which issues
automatic version updates/migrations for feedstocks. The current options are

```yaml
bot:
  # can the bot automerge PRs it makes on this feedstock
  automerge: true
  # only automerge on successful version PRs, migrations are not automerged
  automerge: 'version'
  # only automerge on successful migration PRs, versions are not automerged
  automerge: 'migration'

  # only open PRs if resulting environment is solvable, useful for tightly coupled packages
  check_solvable: true

  # The bot.inspection key in the conda-forge.yml can have one of six possible values:
  inspection: hint  # generate hints using source code (backwards compatible)
  inspection: hint-all  # generate hints using all methods
  inspection: hint-source  # generate hints using only source code
  inspection: hint-grayskull  # generate hints using only grayskull
  inspection: update-all  # update recipe using all methods
  inspection: update-source  # update recipe using only source code
  inspection: update-grayskull  # update recipe using only grayskull

  # any branches listed in this section will get bot migration PRs in addition
  # to the default branch
  abi_migration_branches:
    - v1.10.x

  version_updates:
    # use this for packages that are updated too frequently
    random_fraction_to_keep: 0.1  # keeps 10% of versions at random
```

The `abi_migration_branches` feature is useful to, for example, add a
long-term support (LTS) branch for a package.

<a id="build-platform"></a>

<a id="id3"></a>

### build_platform

This is a mapping from the target platform to the build platform for the package
to be built. e.g. the following builds a `osx-64` package on the `linux-64`
build platform using cross-compiling.

```yaml
build_platform:
  osx_64: linux_64
```

Leaving this field empty implicitly requests to build a package natively. i.e.

```yaml
build_platform:
  linux_64: linux_64
  linux_ppc64le: linux_ppc64le
  linux_aarch64: linux_aarch64
  osx_64: osx_64
  osx_arm64: osx_arm64
  win_64: win_64
```

<a id="build-with-mambabuild"></a>

<a id="id4"></a>

### build_with_mambabuild

:::warning

This option has been deprecated. See [conda_build_tool](#conda-build-tool) for more information.

:::

<a id="channel-priority"></a>

<a id="id5"></a>

### channel_priority

This value sets the `conda` solver channel priority for feedstock builds.
The default is `strict`. Any valid value for the same setting in the `.condarc` is
allowed here.

<a id="channels"></a>

<a id="id6"></a>

### channels

:::warning
This parameter has been deprecated. Instead, specify channels in `recipe/conda_build_config.yaml`
using `channel_sources` and `channel_targets`. Note that all channels go on a single
line because each line represents a build variant.

```yaml title="recipe/conda_build_config.yaml"
channel_sources:
  - mysourcechannel1,mysourcechannel2,conda-forge,defaults
channel_targets:
  - target_channel target_label
```
:::

<a id="choco"></a>

<a id="id7"></a>

### choco

This parameter allows for conda-smithy to run chocoloatey installs on Windows
when additional system packages are needed. This is a list of strings that
represent package names and any additional parameters. For example,

```yaml
choco:
  # install a package
  - nvidia-display-driver

  # install a package with a specific version
  - cuda --version=11.0.3
```

This is currently only implemented for Azure Pipelines. The command that is run is
`choco install {entry} -fdv -y --debug`.  That is, `choco install` is executed
with a standard set of additional flags that are useful on CI.

<a id="circle"></a>

<a id="id8"></a>

### circle

The top-level `circle` key specifies configurations for the Circle
CI service.  This is usually **read-only** and should not normally be manually
modified.  Tools like conda-smithy may modify this, as needed.

<a id="conda-build"></a>

<a id="id9"></a>

### conda_build

Settings in this block are used to control how conda build runs and produces
artifacts. The currently supported options are

```yaml
conda_build:
  pkg_format: 2    # makes .conda artifacts
  pkg_format: None # makes .tar.bz2 artifacts
  # controls the compression level for .conda artifacts
  # conda-forge uses a default value of 16 since its artifacts
  # can be large. conda-build has a default of 22.
  zstd_compression_level: 16
```

<a id="conda-build-tool"></a>

<a id="id10"></a>

### conda_build_tool

Use this option to choose which tool is used to build your recipe. Currently allowed options are:

- `conda-build`: Vanilla `conda build ...` with no explicit solver configuration. Note that it will still respect the value configured in [conda_solver](#conda-solver), if any.
- `conda-build+classic`: `conda build ...` with the `classic` solver enforced.
- `conda-build+conda-libmamba-solver`: `conda build ...` with the `conda-libmamba-solver` solver enforced.
- `mambabuild`: `conda mambabuild ...` as provided by `boa`.

<a id="conda-forge-output-validation"></a>

<a id="id11"></a>

### conda_forge_output_validation

This field must be set to `True` for feedstocks in the `conda-forge` GitHub
organization. It enables the required feedstock artifact validation as described
in [Output Validation and Feedstock Tokens](infrastructure.md#output-validation).

<a id="conda-install-tool"></a>

<a id="id12"></a>

### conda_install_tool

Use this option to choose which tool is used to provision the tooling in your feedstock.
Currently allowed options are:

- `conda`: `conda install ...`. You can change which solver to use via [conda_solver](#conda-solver).
- `mamba`: `mamba install ...` as provided by the [mamba project](https://github.com/mamba-org/mamba). `conda_solver` has no effect here.

<a id="conda-solver"></a>

<a id="id13"></a>

### conda_solver

Choose which `conda` solver plugin to use for feedstock builds.
Note this configuration might affect [conda_build_tool](#conda-build-tool) (e.g. when set to `conda-build`)
and [conda_install_tool](#conda-install-tool) (e.g. when set to `conda`).

<a id="docker"></a>

<a id="id14"></a>

### docker

This is a mapping to docker configuration options. These are relatively
self-explanatory. The defaults are as follows:

```yaml
docker:
  executable: docker
  image: "condaforge/linux-anvil-comp7"
  command: "bash"
  interactive: True
```

<a id="github"></a>

<a id="id15"></a>

### github

This is mapping of configuration variables for GitHub. The
defaults are as follows:

```yaml
github:
  # name of the github organization
  user_or_org: conda-forge
  # repository name, usually filled in automatically
  repo_name: ""
  # branch name to execute on
  branch_name: main
  # branch name to use for rerender+webservices github actions and
  # conda-forge-ci-setup-feedstock references
  tooling_branch_name: main
```

<a id="github-actions"></a>

<a id="id16"></a>

### github_actions

This dictates the behavior of the Github Actions CI service. It is a
mapping for GHA-specific configuration options. For example:

```yaml
github_actions:
  # Is the job using Microsoft hosted free runners or 'self-hosted'.
  self_hosted: false
  # triggers for actions. Defaults to `['push', 'pull_request']` for
  # Microsoft hosted free runners and `['push']` for self-hosted
  triggers: []
  # Timeout for CI jobs
  timeout_minutes: 360
  # Cancel in progress builds. Defaults to false for Microsoft hosted
  # free runner and true for self-hosted
  cancel_in_progress: None
  # Maximum number of parallel jobs per build.
  max_parallel: None
  # Retain build artifacts for inspection
  store_build_artifacts: false
  # Retention period for built artifacts
  artifact_retention_days: 14
```

For self-hosted runners `recipe/conda_build_config.yaml` is used for
specifying labels for the runners.

```yaml
github_actions_labels:
  # use Microsoft free runners
  - hosted                                   # [osx or win]
  # Use self-hosted runner with custom label
  - - self-hosted                            # [linux and aarch64]
    - custom-label                           # [linux and aarch64]
  # Use self-hosted runner from cirun
  - cirun-openstack-cpu-large                # [linux and ppc64le]
  # Use self-hosted gpu runner from cirun
  - cirun-openstack-gpu-large                # [linux and x86_64]
```

<a id="idle-timeout-minutes"></a>

<a id="id17"></a>

### idle_timeout_minutes

Configurable idle timeout that is either an int or None.  Used for packages that
don't have chatty enough builds. Currently only implemented in Travis and Circle.

```yaml
idle_timeout_minutes: 60
```

<a id="linux"></a>

<a id="id18"></a>

### linux

The Linux-specific configuration options. This is largely an internal setting.
Currently only:

```yaml
linux:
  enabled: False
```

<a id="linux-aarch64"></a>

<a id="id19"></a>

### linux_aarch64

The ARM-specific configuration options. This is largely an internal setting.
Currently only:

```yaml
linux_aarch64:
  enabled: False
```

<a id="linux-ppc64le"></a>

<a id="id20"></a>

### linux_ppc64le

The PPC-specific configuration options. This is largely an internal setting.
Currently only:

```yaml
linux_ppc64le:
  enabled: False
```

<a id="noarch-platforms"></a>

<a id="id21"></a>

### noarch_platforms

Platforms on which to build noarch packages. The preferred default is a
single build on `linux_64`.

```yaml
noarch_platforms: linux_64
```

To build on multiple platforms, e.g. for simple packages with platform-specific
dependencies, provide a list.

```yaml
noarch_platforms:
  - linux_64
  - win_64
```

<a id="os-version"></a>

<a id="id22"></a>

### os_version

This key is used to set the OS versions for `linux_*` platforms. Valid entries map a linux platform and arch to either `cos6`
or `cos7`. Currently `cos6` is the default for `linux-64`. All other linux architectures use CentOS 7. Here is an example that enables CentOS 7 on `linux-64` builds

```yaml
os_version:
  linux_64: cos7
```

<a id="osx"></a>

<a id="id23"></a>

### osx

The macOSX-specific configuration options. This is largely an internal setting.
Currently only:

```yaml
osx:
  enabled: False
```

<a id="provider"></a>

<a id="id24"></a>

### provider

:::warning

Feedstocks in conda-forge do not allow using self-hosted runners of other
GitHub organisations.

:::

The `provider` field is a mapping from build platform (not target platform) to CI service.
It determines which service handles each build platform. The following are available as
build platforms:

* `linux_64`
* `osx_64`
* `win_64`
* `linux_aarch64`
* `linux_ppc64le`

The following CI services are available:

* `azure`
* `circle`
* `travis`
* `appveyor`
* `github_actions`
* `None` or `False` to disable a build platform.
* `default` to choose an appropriate CI (only if available)
* `native` to choose an appropriate CI for native compiling (only for `linux_aarch64` and `linux_ppc64le`)

Note that `github_actions` is not available for the conda-forge github organization
except for self-hosted runs to avoid a denial of service due to other critical
infrastructure running on Github actions. Other github organizations may use
`github_actions` as a CI provider.

For example, switching linux_64 & osx_64 to build on Travis CI, with win_64 on Appveyor:

```yaml
provider:
  linux_64: travis
  osx_64: travis
  win_64: appveyor
```

Currently, x86_64 platforms are enabled, but other build platforms are disabled by default. i.e. an empty
provider entry is equivalent to the following:

```yaml
provider:
  linux_64: azure
  osx_64: azure
  win_64: azure
  linux_ppc64le: None
  linux_aarch64: None
```

To enable `linux_ppc64le` and `linux_aarch64` add the following:

```yaml
provider:
  linux_ppc64le: default
  linux_aarch64: default
```

If a desired build platform is not available with a selected provider
(either natively or with emulation), the build will be disabled. Use the `build_platform`
field to manually specify cross-compilation when no providers offer a desired build platform.

<a id="recipe-dir"></a>

<a id="id25"></a>

### recipe_dir

The relative path to the recipe directory. The default is:

```yaml
recipe_dir: recipe
```

<a id="remote-ci-setup"></a>

<a id="id26"></a>

### remote_ci_setup

This option can be used to override the default `conda-forge-ci-setup` package.
Can be given with `${url or channel_alias}::package_name`, defaults to conda-forge
channel_alias if no prefix is given.

```yaml
remote_ci_setup: "conda-forge-ci-setup=3"
```

<a id="shellcheck"></a>

<a id="id27"></a>

### shellcheck

Shell scripts used for builds or activation scripts can be linted with shellcheck. This is not enabled by default, but can be enabled like so:

```yaml
shellcheck:
  enabled: True
```

<a id="skip-render"></a>

<a id="id28"></a>

### skip_render

This option specifies a list of files which conda smithy will skip rendering.
The possible values can be a subset of `.gitignore`, `.gitattributes`, `README.md`, `LICENSE.txt`.
The default value is an empty list [ ], i.e. all these four files will be generated by conda smithy.
For example, if you want to customize .gitignore and LICENSE.txt files on your own, you should have the following configuration.

```yaml
skip_render:
  - .gitignore
  - LICENSE.txt
```

<a id="templates"></a>

<a id="id29"></a>

### templates

This is mostly an internal field for specifying where templates files live.
You shouldn't need it.

<a id="test-on-native-only"></a>

<a id="id30"></a>

### test_on_native_only

This is used for disabling testing for cross compiling. Default is `false`

```yaml
test_on_native_only: True
```

:::note

This has been deprecated in favor of the [test](#test) top-level field. It is now mapped to `test: native_and_emulated`.

:::

<a id="test"></a>

<a id="id31"></a>

### test

This is used to configure on which platforms a recipe is tested. Default is `all`.

```yaml
test: native_and_emulated
```

Will do testing only if the platform is native or if there is an emulator.

```yaml
test: native
```

Will do testing only if the platform is native.

<a id="travis"></a>

<a id="id32"></a>

### travis

The top-level `travis` key specifies configurations for the Travis
CI service.  This is usually **read-only** and should not normally be manually
modified.  Tools like conda-smithy may modify this, as needed.

<a id="upload-on-branch"></a>

<a id="id33"></a>

### upload_on_branch

This parameter restricts uploading access on work from certain branches of the
same repo. Only the branch listed in `upload_on_branch` will trigger uploading
of packages to the target channel. The default is to skip this check if the key
`upload_on_branch` is not in `conda-forge.yml`. To restrict uploads to the
main branch:

```yaml
upload_on_branch: main
```

<a id="win"></a>

<a id="id34"></a>

### win

The Windows-specific configuration options. This is largely an internal setting.
Currently only:

```yaml
win:
  enabled: False
```

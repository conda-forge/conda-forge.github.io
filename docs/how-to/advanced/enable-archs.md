---
tags: [how-to, advanced]
---

# How to enable additional architectures

By default, feedstocks are created with support for the main platforms (e.g. `linux-64`, `osx-64`, `win-64`). New architectures can be added by changing the default configuration in `conda-forge.yml` and rerendering. However, since building a new architecture requires that your dependencies are also available for that architecture, this is usually controlled by migrations triggered by changes on specific files available in the `conda-forge-pinning-feedstock` repository.

Before submitting a build request for a new architecure, check whether:

1. The package is already built for that architecture. Consult the package page in anaconda.org: `https://anaconda.org/conda-forge/<package-name>`.
2. Your package is already in the process of being migrated in the [corresponding migration status page](https://conda-forge.org/status/).
3. The feedstock in question has already an issue or pull request for that architecture, which may contain information why the package is not yet available.

If you do see an open PR (or once a PR is submitted by the migration), you can help the feedstock maintainers make the build pass. If you have insight into the particular package, **please** chime in, but most of all **be patient and polite**.

Once the new builds are available from `anaconda.org`, please help the maintainers by testing the packages, and reporting back with any problems… but also successes!

## General steps

Adding a new architecture usually means following the same steps, but targeting different configuration files, which are listed in the sections below.

1. Fork `conda-forge-pinning-feedstock` and create a fresh new branch. See [How to fork your feedstock](../basics/fork-sync.md) for more details.
2. Edit the migration file for your architecture (see sections below) to add the name of your feedstock, sans the `-feedstock` suffix. Make sure to insert it in the right position to respect alphabetical order, or run `pre-commit run -a`.
3. Commit the changes, push the branch to your fork (`origin`) and open the pull request.
4. Wait for a member of `@conda-forge/core` to review and merge your pull request.

Once merged, the feedstock will be added to the corresponding migration, which can be tracked in its status page (see below for the relevant links). When all dependencies are available, the bot will open a new PR with the necessary changes.

## Enable osx-arm64

- Migration file: [`osx_arm64.txt`](https://github.com/conda-forge/conda-forge-pinning-feedstock/blob/main/recipe/migration_support/osx_arm64.txt).
- Status page: [`armosxaddition`](https://conda-forge.org/status/migration/?name=armosxaddition).

Note that this migration involves cross-compiled builds, which may get tricky if the build system has not been configured with those options in mind. Emulation is not available on this platform.

## Enable linux-aarch64 and linux-ppc64le

- Migration file: [`arch_rebuild.txt`](https://github.com/conda-forge/conda-forge-pinning-feedstock/blob/main/recipe/migration_support/arch_rebuild.txt).
- Status page: [`aarch64andppc64leaddition`](https://conda-forge.org/status/migration/?name=aarch64andppc64leaddition).

Note that this migration will enable both architectures in your feedstock. If you only need one, you can push one of these changes to the bot PR:

- Remove the corresponding line from `conda-forge.yml` and rerender.
- Add a `skip:` directive to your recipe by matching the non-desired platform, and rerender.

## Enable win-arm64

- Migration file: [`win_arm64.txt`](https://github.com/conda-forge/conda-forge-pinning-feedstock/blob/main/recipe/migration_support/win_arm64.txt).
- Status page: [`supportwindowsarm64platform`](https://conda-forge.org/status/migration/?name=supportwindowsarm64platform).

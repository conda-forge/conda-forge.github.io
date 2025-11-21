---
tags: [how-to, advanced]
---

# How to enable additional architectures

By default, feedstocks are created with support for the main platforms (e.g. `linux-64`, `osx-64`, `win-64`). New architectures can be added by changing the default configuration in `conda-forge.yml` and rerendering. However, since building a new architecture requires that your dependencies are also available for that architecture, this is usually controlled by migrations triggered by changes on specific files available in the `conda-forge-pinning-feedstock` repository.

## Enable osx-arm64

1. Fork `conda-forge-pinning-feedstock` and create a fresh new branch.
2. Edit `recipe/migrations/osx_arm64.txt` to add the name of your feedstock, sans the `-feedstock` suffix. Make sure to insert in the right position to respect alphabetical order, or run `pre-commit run -a`.
3. Commit the changes, push the branch and open the pull request.
4. Wait for a member of `@conda-forge/core` to review and merge your pull request.

Once merged, the feedstock will be added to the corresponding migration, which can be tracked in [`osxarm64`](https://conda-forge.org/status/migrations/?name=osxarm64). When all dependencies are available, the bot will open a new PR with the necessary changes.

Note that this migration involves cross-compiled builds, which may get tricky if the build system has not been configured with those options in mind. Emulation is not available on this platform.

## Enable linux-aarch64 and linux-ppc64le

The process is the same as `osx-arm64`. The file to edit is `recipe/migrations/arch_rebuild.txt`, and the status page is [`aarch64andppc64leaddition`](https://conda-forge.org/status/migration/?name=aarch64andppc64leaddition).

Note that this migration will enable both architectures in your feedstock. If you only need one, you can push one of these changes to the bot PR:

- Remove the corresponding line from `conda-forge.yml` and rerender.
- Add a `skip:` directive to your recipe by matching the non-desired platform, and rerender.

<!--
## Enable win-arm64

The process is the same as `osx-arm64`. The file to edit is `recipe/migrations/win_arm64.txt`, and the status page is [`win_arm64`](https://conda-forge.org/status/migrations/?name=win_arm64).
--->
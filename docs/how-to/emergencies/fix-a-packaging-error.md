---
tags: [how-to, emergency]
---

# How to fix a packaging error

Sometimes a serious packaging error may be discovered once the packages are built and published.
For example, some necessary files may be missing, and part of the functionality may stop working
correctly after an upgrade. Besides publishing a fixed version, it may be desirable to remove the
broken packages to prevent users from installing them.

## Pushing a fixed version

Ideally, the issue should be fixed in the same version and the build number incremented. Once
pushed, new packages will be built and the next upgrade will ensure that the fixed version is
installed.

## Removing the broken version

To prevent the broken packages from being downloaded, they can be marked broken. This requires
marking all the artifacts broken artifacts appropriately, following the guide to [removing broken
packages](/docs/maintainer/updating_pkgs/#removing-broken-packages).

Once the packages are marked broken, they are no longer available from the `conda-forge` channel. Users
will no longer be able to install them by default. However, it will still be possible to download
them directly via URL in lockfiles, manually from [anaconda.org
packages](https://anaconda.org/channels/conda-forge/), or by requesting the `broken` label.

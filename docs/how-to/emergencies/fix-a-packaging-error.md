---
tags: [how-to, emergency]
---

# How to fix a packaging error

Sometimes a serious packaging error may be discovered once the packages are built and published.
For example, some necessary files may be missing, and part of the functionality may stop working
correctly after an upgrade. Provided this is not a problem with the source code itself, but a
problem in the recipe, it can be fixed by publishing a new build using the same upstream archive
and version. Besides publishing the fix, it may be desirable to remove the
broken packages to prevent users from installing them.

## Pushing a fixed version

Ideally, the issue should be fixed by issuing a new build for the same release version. By bumping the build number only (and not the version), a new set of artifacts will be made available with the packaging issue corrected. This way, end-users will be able to reinstall the affected package and the new (fixed) builds will be picked.

## Removing the broken version

To prevent the broken packages from being downloaded, they can be marked broken. This requires
marking all the artifacts broken artifacts appropriately, following the guide to [removing broken
packages](/docs/how-to/emergencies/remove-broken-packages/).

Once the packages are marked broken, they are no longer available from the `conda-forge` channel. Users
will no longer be able to install them by default. However, it will still be possible to download
them directly via URL in lockfiles, manually from [anaconda.org
packages](https://anaconda.org/channels/conda-forge/), or by requesting the `broken` label.

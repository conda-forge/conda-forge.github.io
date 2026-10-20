---
title: 'Removing broken packages'
---

Sometimes mistakes happen and a broken package ends up being uploaded to the `conda-forge` channel.

If the only issue is in the package metadata, we can directly patch it via repodata patching.
Refer to the [`conda-forge-repodata-patches-feedstock` documentation](https://github.com/conda-forge/conda-forge-repodata-patches-feedstock/tree/main/recipe) for specific instructions.
We also provide a specific how-to on [updating a dependency in published packages](/docs/how-to/emergencies/update-a-dependency-in-published-packages/).

If instead the actual contents of the package are broken, follows the steps outlined in the [README of the `admin-requests` repository](https://github.com/conda-forge/admin-requests/?tab=readme-ov-file#mark-packages-as-broken-on-conda-forge).

Once merged, a bot will label all listed files as broken, thus effectively removing them from the channel.
Users will no longer be able to install them by default.
However, it will still be possible to download them directly via URL in lockfiles, manually from [anaconda.org packages](https://anaconda.org/channels/conda-forge/), or by requesting the `broken` label.

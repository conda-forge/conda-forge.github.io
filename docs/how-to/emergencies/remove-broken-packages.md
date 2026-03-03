---
title: 'Removing broken packages'
---

Sometimes mistakes happen and a broken package ends up being uploaded to the `conda-forge` channel.

If the only issue is in the package metadata, we can directly patch it via repodata patching.
Refer to [repodata-patches-feedstock documentation](https://github.com/conda-forge/conda-forge-repodata-patches-feedstock/tree/main/recipe) for specific instructions.
We also provide a specific how-to on [updating a dependency in published packages](/docs/how-to/emergencies/update-a-dependency-in-published-packages/).

If instead the actual contents of the package are broken, the following steps will
remove broken packages from the `main` channel:

1. Locate the paths to broken files on [anaconda.org](https://anaconda.org), by searching for the conda-forge package and switching to the files tab.
2. Fork [conda-forge/admin-requests](https://github.com/conda-forge/admin-requests) and add a new YML file in the `requests` directory.
3. Add the broken files to the new YML document.See [examples/example-broken.yml](https://github.com/conda-forge/admin-requests/blob/main/examples/example-broken.yml) for an example file.
4. Open a new PR. Once merged, a bot will label all listed files as broken, thus effectively removing them from the channel.

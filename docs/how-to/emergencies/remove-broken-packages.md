---
title: 'Removing broken packages'
---

Sometimes mistakes happen and a broken package ends up being uploaded to the `conda-forge` channel.

If the only issue is in the package metadata, we can directly patch it using
the [repo data patches feedstock](https://github.com/conda-forge/conda-forge-repodata-patches-feedstock).
If this is the case, the following general guidelines should be followed:

1. Update the feedstocks recipe to ensure future builds do not propagate the issue with a new build number.
2. Please make a PR there to add a patch. The patch should specify as much has possible the versions and times when the packages were generated. It may use the following information

> - The current timestamp, you may generate it with `python -c "import time; print(f'{time.time():.0f}000')"`.
> - The problematic version and build numbers of the packages to affect.

If instead the actual contents of the package are broken, the following steps will
remove broken packages from the `main` channel:

1. Locate the paths to broken files on [anaconda.org](https://anaconda.org), by searching for the conda-forge package and switching to the files tab.
2. Fork [conda-forge/admin-requests](https://github.com/conda-forge/admin-requests) and add a new YML file in the `requests` directory.
3. Add the broken files to the new YML document.See [examples/example-broken.yml](https://github.com/conda-forge/admin-requests/blob/main/examples/example-broken.yml) for an example file.
4. Open a new PR. Once merged, a bot will label all listed files as broken, thus effectively removing them from the channel.

---
authors:
  - core
tags: [security]
---
# Security updates to our installers

In June 2023, software engineers from
[Anaconda](https://www.anaconda.com) have reported a security issue in
the uninstallers that are included in the Windows versions of the
[miniforge and mambaforge
installers](https://github.com/conda-forge/miniforge), one of the main
ways to bootstrap conda-forge based conda and mamba distributions.

<!--truncate -->

The issue could, under specific conditions, unintentionally delete files
from your system during the uninstallation process. Anaconda has
published more details in the related
[blogpost](https://www.anaconda.com/blog/windows-installer-security-fix)
about the security fix for the miniconda and Anaconda Distribution
Windows installers as well.

conda-forge is committed to fix the miniforge and mambaforge installers
equally to reduce the possible impact on conda-forge users and has
worked with Anaconda to mitigate the issue.

-   As such, we are strongly recommending all users of miniforge and
    mambaforge to **update immediately** to the latest versions of
    miniforge and mambaforge. Please download them from the [miniforge
    repository's main page](https://github.com/conda-forge/miniforge)
    or the [release specific
    page](https://github.com/conda-forge/miniforge/releases/tag/23.1.0-4).
-   For older versions, we are providing a **security patch for already
    installed miniforge and mambaforge installations**. You can download
    these from [release specific
    page](https://github.com/conda-forge/miniforge/releases/tag/23.1.0-4)
    as well, under the names
    `Miniforge3-uninstaller-patch-Windows-x86_64.exe` and
    `Mambaforge-uninstaller-patch-Windows-x86_64.exe`.

:::note
To uninstall older versions of miniforge and mambaforge released before
July 1, 2023, please download the security patch fix prior to
uninstallation.
:::

In order for this flaw to be triggered, a specific combination of
factors must align, including uninstallation permissions, system access,
usage of Windows, and an existing installation of miniforge or
mambaforge.

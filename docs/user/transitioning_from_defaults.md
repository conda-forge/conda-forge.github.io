---
title: Transitioning from defaults
---

# Transitioning from Anaconda's `defaults` channels

Users wishing to transition from Anaconda's `defaults` (i.e. those hosted under
https://repo.anaconda.com/pkgs) channels should do so with care so as not to
break their working environments. The first thing to realize
is that in 2024 conda-forge is incompatible with the packages provided in
`defaults`. Often, the packages on conda-forge will require
newer versions of a particular package, or, may simply be organized in a
different fashion. The only workflow we can support as a community is one where
the conda-forge channel takes priority over all other channels.

If you were using Miniconda or Anaconda Distribution and wish to move to use
conda-forge, we outline two workflows. The first allows you to try packages from
conda-forge without uninstalling your previous installation, the second
involves uninstalling Miniconda or Anaconda Distribution, and then installing
Miniforge.

## Trying conda-forge in an isolated environment

1. Create a conda environment with very few dependencies. The following
   command will only use packages from `conda-forge` to install Python 3.11. You
   may adjust the version of Python to the one of your liking:

   ```bash
   conda create --name conda-forge-env python=3 --channel conda-forge --override-channels
   ```

2. Activate your environment and add `conda-forge` with strict priority to
   that particular environment:

   ```bash
   conda activate conda-forge-env
   conda config --env --add channels conda-forge
   # optional:
   # conda config --env --remove channels defaults
   conda config --env --set channel_priority strict
   ```

3. Check the configuration of your conda environment:

   ```bash
   conda config --show
   ```

   This should report that `conda-forge` is the top most channel in your list.

4. You are now in a position to use command like:

   ```bash
   conda install my_desired_package_from_conda_forge
   ```

## Uninstalling Anaconda and installing Miniforge

If you are ready to fully switch to conda-forge, we recommend uninstalling
Anaconda / Miniconda and then installing [Miniforge](/download). The following steps
are guidelines on how to go about this, while backing up your work and your environments.

1. Clean your existing conda installation. This should remove unused files from
   your Anaconda / Miniconda installation and make for smaller sized backup.

   ```shell
   # The conda build purge command may fail if you don't have conda-build installed.
   # this is expected
   conda build purge
   conda clean --all
   ```

2. Create a zip archive of your conda installation. Use your favorite graphical tool
   to right click on the Anaconda / Miniconda installation folder. Check if you have
   created additional environments outside the installation root by running
   `conda info --envs`. Back those up too, if necessary.

   - Alternatively, you can also export lockfiles for all your environments, if preferred:

     ```shell
     conda list --explicit --md5 --prefix /path/to/environment-name > environment-name.txt
     ```

     Note these lockfiles will only include the conda packages. If you `pip install`ed packages
     on top, those won't be captured. Check [`conda-lock`](https://conda.github.io/conda-lock/)
     for those use cases.

   - Another useful file to create is the input `environment.yml` for each environment:
     ```shell
     conda env export --from-history --prefix --prefix /path/to/environment-name > environment-name.yml
     ```
     This file won't capture the exact same state you had in your environment. Instead it
     will tell `conda` what packages to look for and then find a solution that satisfies
     the request.

3. On Windows, use the uninstaller suggested by the system control panel.
   On Linux and macOS, you can delete the folder called `anaconda3`, or `miniconda3`
   (usually located in your home directory).

4. Find the file called `.condarc` in your home directory, and back it up somewhere safe.
   Then, delete your old `.condarc` file. A new one specific to conda-forge will be
   created when we install Miniforge.

5. On Linux and macOS, your shell profile (`~/.bashrc`) might contain initialization code
   from the previous installation. Locate the block guarded by `# >>> conda initialize >>>`
   comments and delete it.

6. Download and install the Miniforge installer that matches your platform from
   the [Miniforge download](/download) page.

7. Once installed, you should be able to use the `Miniforge3 Prompt` on
   Windows, or the terminal on Linux and macOS, to run the command:

   ```shell
   conda info
   ```

Notice that the conda-forge is the channel with the topmost priority.

You should now be in a position to use conda-forge packages.

## A historical note

Until roughly 2021, conda-forge held strong compatibility with Anaconda's
default channel. However, as [announced in September 2021][defaults-announcement],
we decided toultimately move away from dependency on Anaconda's `defaults` packages.
Over the years, this has led for more divergence between package versions, and names
between conda-forge and Anaconda's `defaults` channel.

In 2024, the workflow that has packages co-installed from Anaconda's channel and
conda-forge is no longer supported.

To check if you have packages installed from both sources, use the command

```bash
conda list --show-channel-urls
```

All packages should specify that they have been installed from the conda-forge
channel. In 2024, there still exist a few bugs where conda packages will
claim that they have been installed from PyPI even though they have been
installed from conda-forge.

[defaults-announcement]: /news/2021/09/30/defaults-channel-is-now-dropped-when-building-conda-forge-packages/

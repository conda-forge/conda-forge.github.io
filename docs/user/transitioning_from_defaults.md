# Transitioning from Anaconda's default packages

Users wishing to transition from Anaconda's default channel should do so with
care so as not to break their working environments. The first thing to realize
is that conda-forge is incompatible with the packages provided in Anaconda's
default channel. Often, the packages on conda-forge will require newer versions
of a particular package, or, may simply be organized in a different fashion.
The only workflow we can support as a community is one where the conda-forge
channel takes priority over all other channels.

If you were using `miniconda3` or `Anaconda3` and wish to move to use
conda-forge, we outline two workflow. The first allows you to try packages from
conda-forge without uninstalling your previous installation, the second
involves uninstalling `miniconda3` or `Anaconda3`, and only using conda-forge
channels.

## Trying conda-forge in an isolated environment

1. Create a conda-environment with very dependencies. The following command
   will only use packages from conda-forge to install Python 3.11. In March
   2024, Python 3.11, was chosen due to the fact that it has broad
   compatibility with many packages in the conda-forge ecosystem.
   You may adjust the version of python to the one of your liking.

```bash
conda create --name new_cf python=3.11 --channel conda-forge --override-channels
```

2. Activate your environment and add conda-forge with strict dependencies to
   that particular environment.

```bash
    conda activate new_cf
    conda config --env --add channels conda-forge
    conda config --env --set channel_priority strict
```

3. Check the configuration of your conda environment.

```bash
conda config --show
```

   Should list out that conda-forge is the top most channel in your list.

4. You are now in a position to use command likes

```bash
conda install my_desired_package_from_conda_forge
```

## Uninstalling Anaconda3 and installing miniforge3

If you are ready to fully switch to conda-forge, we recommend uninstalling
Anaconda3 and installing miniforge3. The following steps are guidelines on how
to go about this, while backing up your work and your environments.

1. Clean your existing conda installation. This should remove unused files from
   your anaconda folder and make for smaller sized backup.

```
# The conda build purge command may fail if you don't have conda-build installed.
# this is expected
conda build purge
conda clean --all
```

2. Create a zip archive of your conda installation. Use your favorite graphical tool
   to right click on the miniconda3 installation folder

3. On windows, following the system uninstalling installation prompts to
   uninstall Anaconda prompts to uninstall Anaconda3. On linux and mac, delete
   the folder called `anaconda3`, or `miniconda3`.

4. Find the file called `.condarc` in your home directory, and back it up somewhere safe.

5. Delete your old `.condarc` file. A new one specific to conda-forge will be
   created when we install `miniforge3`.

6. Download and install the Miniforge3 installer that matches your platform from
   https://github.com/conda-forge/miniforge

7. Once installed, you should be able to use the `Miniforge3 Prompt` on
   Windows, or the terminal on linux and mac, to run the command:

```bash
conda info
```

   and notice that the conda-forge is the channel with the topmost priority.


You should now be in a position to use conda-forge packages.

## A historical note

Until 2021????, conda-forge held strong compatibility with Anaconda's default
channel. However, due to the reasons outlined in XXXXXX, we decided to
ultimately move away from dependency on Anaconda's default packages. Over the
years, this has lead for more divergence between package versions, and names
between conda-forge and Anaconda's default channel.

In 2024, the workflow that has packages co-installed from Anaconda's channel and
conda-forge is no longer supported.

To check if you have packages installed from both sources, use the command

```bash
conda list --show-channel-urls
```

All packages should specify that they have been installed from the conda-forge
channel.


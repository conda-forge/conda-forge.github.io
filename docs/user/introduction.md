---
title: 'A brief introduction'
---

<a id="a-brief-introduction"></a>

# A brief introduction

<a id="what-is-conda-forge"></a>

## What is conda-forge?

conda-forge is a community effort that provides conda packages for a wide range of software.

**Missing a package that you would love to install with conda?** - Chances are we have already packaged it for you!

You can [search](https://anaconda.org/) for packages online. Look out for packages provided by our conda-forge organization.

**Cannot find a package or only outdated versions of a package?** - Everybody is welcome to contribute to our package stack! Please refer to [Becoming involved](contributing.md#becoming-involved), for an overview on how to start contributing.

<a id="why-conda-forge"></a>

## Why conda-forge?

The packaging team from [Anaconda, Inc.](https://anaconda.org/), packages a multitude of packages and provides them to all users free of charge in their `defaults` channel.

But what if a package you are looking for is not in the `defaults` channel?
In the past users only had the option to create an [Anaconda Cloud](https://anaconda.org/) account and create their own channel.

This came with a list of disadvantages:

- Locating packages was difficult due to them being scattered over many channels.
- Combining packages across channels was not always possible due to binary incompatibilities.
- Packages were only available for architectures the developer was interested in or had access to.
- Channels were often abandoned, updating required locating new channels.

conda-forge is a community effort that tackles these issues:

- All packages are shared in a single channel named conda-forge.
- Care is taken that all packages are up-to-date.
- Common standards ensure that all packages have compatible versions.
- By default, we build packages for macOS, Linux AMD64 and Windows AMD64.
  Other architectures are also available on request (e.g. Apple Silicon, PowerPC, Linux ARM).
- Many packages are updated by multiple maintainers with an easy option to become a maintainer.
- An active core developer team is trying to also maintain abandoned packages.

You can refer to the glossary [Glossary](../glossary.md#misc-glossary).

<a id="how-to-install"></a>

<a id="how-can-i-install-packages-from-conda-forge"></a>

## How can I install packages from conda-forge?

Using conda-forge is easy!

- Make sure you have `conda >=4.9`.
  ```bash
  conda --version
  conda update conda
  ```
- Add conda-forge as the highest priority channel.
  ```bash
  conda config --add channels conda-forge
  ```
- Activate `strict` channel priority (`strict` will be activated by default in conda 5.0).
  ```bash
  conda config --set channel_priority strict
  ```

From now on using `conda install <package-name>` will also find packages in our conda-forge channels.

:::note

In addition to the channel priority,
we recommend always installing your packages inside a new environment instead of the `base` (formerly known as `root`) environment,
and we also recommend the use of [`miniforge`](https://github.com/conda-forge/miniforge) instead of the Anaconda Distribution.
Using environments make it easier to debug problems with packages and ensure the stability of your `base` environment.
Avoiding the Anaconda Distribution reduces chances of unsolvable/conflicting installations, it is also a smaller download.

:::

:::note

Please be aware that the order of your conda package channels is important, especially when you combine conda-forge with other channels, e.g. `bioconda`.

:::

:::note

[Miniforge](https://github.com/conda-forge/miniforge) is a community
effort to provide Miniconda-like installers, with the added feature that
conda-forge is the default channel.
Miniforge is the easiest way to get started with conda-forge!

Please refer to [Using multiple channels](tipsandtricks.md#multiple-channels) for pitfalls and more information.

:::

<a id="can-i-contribute-packages-to-conda-forge"></a>

## Can I contribute packages to conda-forge?

Anyone can contribute packages to the `conda-forge` channel.
You don't have to be the upstream maintainer of a package in order to contribute it to conda-forge.
To learn how to contribute your first package read [the staging process](../maintainer/adding_pkgs.md#creating-recipes).

<a id="how-can-i-give-credit-to-conda-forge"></a>

## How can I give credit to conda-forge?

If you'd like to credit conda-forge in your work, please cite our [Zenodo entry](https://doi.org/10.5281/zenodo.4774216). This citation is

```default
conda-forge community. (2015). The conda-forge Project: Community-based
Software Distribution Built on the conda Package Format and Ecosystem.
Zenodo. http://doi.org/10.5281/zenodo.4774216
```

or in bibtex it is

```default
@misc{conda_forge_community_2015_4774216,
  author       = {conda-forge community},
  title        = {{The conda-forge Project: Community-based Software
       Distribution Built on the conda Package Format and
       Ecosystem}},
  month        = jul,
  year         = 2015,
  publisher    = {Zenodo},
  doi          = {10.5281/zenodo.4774216},
  url          = {https://doi.org/10.5281/zenodo.4774216}
}
```

<a id="display-conda-forge-packages-in-anaconda-navigator"></a>

## Display conda-forge packages in Anaconda Navigator

1. Open **Anaconda Navigator** by running `anaconda-navigator`
2. Go to the **Environments** tab.
3. Click the **Channels** button.
4. Click the **Add** button.
5. Enter the channel url: [https://conda.anaconda.org/conda-forge/](https://conda.anaconda.org/conda-forge/)
6. Press the **Enter key** on your keyboard.
7. Click the **Update channels** button.

From now on, whenever the **package filter** is set to **All** on the Environments tab, all conda-forge packages will be displayed.

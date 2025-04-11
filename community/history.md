---
title: History
---

# History of conda-forge

conda-forge's origins cannot be explained without understanding the context of Python packaging back in the early 2010s. Back then, the installation of Python packages across operating systems was very challenging, specially on Windows, as it often meant compiling dependencies from source.

Python 2.x was the norm. To install it, you'd get the official installers from Python.org, stick to the system provided one in Linux, or resort to options like Python(x,y) [^pythonxy], ActiveState ActivePython [^activepython] or Enthought's distributions [^enthought] in macOS and Windows [^legacy-python-downloads].

If you wanted to install additional packages, you would find that the community was transitioning from `easy_install` to `pip`, and there was no easy way to ship or install pre-compiled Python packages. There wouldn't be an alternative for Python eggs [^eggs] until 2013, when wheels are formalized [^wheels]. These were useful for Windows, where Christoph Gohlke's wheels [^cgohlke]<sup>,</sup>[^cgohlke-shutdown] were your only choice.

However, for Linux, you would have to wait until 2016, when `manylinux` wheels were introduced. Before then PyPI wouldn't even allow compiled Linux wheels and your only alternative was to compile every package from source.

As an example, take a look at the [PyPI download page for `numpy` 1.7.0](https://pypi.org/project/numpy/1.7.0/#files), released in Feb 2013. The build distributions section only shows a few `.exe` files for Windows (!), and some `manylinux1` wheels. But if you pay attention, the `manylinux1` wheels were not uploaded until Apr 2016. No mention whatsoever of macOS. Now compare it to [`numpy` 1.11.0](https://pypi.org/project/numpy/1.11.0/#files), released in March 2016: wheels for all platforms!

## The origins of `conda`

In 2012, Continuum Analytics announces Anaconda 0.8 in the SciPy conference [^anaconda-history]. Later that year, in September, Continuum would release `conda` 1.0, the cross-platform, language-agnostic package manager for pre-compiled artifacts [^conda-changelog-1.0]. The motivation behind these efforts was to provide an easy way to ship all the compiled libraries and Python packages that users of the SciPy and numpy stacks neede [^packaging-and-deployment-with-conda]<sup>,</sup>[^lex-fridman-podcast]:

Travis Oliphant, on [Why I promote conda](https://technicaldiscovery.blogspot.com/2013/12/why-i-promote-conda.html) (2013):

> [...] at the first PyData meetup at Google HQ, where several of us asked Guido what we can do to fix Python packaging for the NumPy stack. Guido's answer was to "solve the problem ourselves". We at Continuum took him at his word. We looked at dpkg, rpm, pip/virtualenv, brew, nixos, and 0installer, and used our past experience with EPD. We thought hard about the fundamental issues, and created the conda package manager and conda environments.

Conda packages were not only able to ship pre-compiled Python packages across platforms. They were agnostic enough to ship Python itself, as well as the underlying shared libraries without having to statically vendor them. This was particularly convenient for projects that relied on both compiled dependencies (e.g. C++ or Fortran libraries) and Python "glue code".

By June 2013, conda is using a SAT solver and includes the `conda build` subcommand [^new-advances-in-conda]. This is also when the first Miniconda release and Binstar.org [^binstar], the predecessor of the Anaconda.org channels, are announced. This meant that now any user could build their software stack as conda packages and redistribute them online at no cost.

With `conda build` came along the concept of recipes [^early-conda-build-docs]. The [`ContinuumIO/conda-recipes`](https://github.com/conda-archive/conda-recipes) repository was _the_
place where people would contribute their conda recipes. It was really successful, but the recipes were of various quality, and typically only worked on one or two platforms. There was a high chance that a recipe you found there would no longer build, and you had to tweak it to get it to work.

In 2015, Binstar.org became Anaconda.org, and in 2017 Continuum Analytics rebranded as Anaconda Inc [^anaconda-rebrand].

## How conda-forge came to be

By 2015, several institutes and groups were using Binstar/Anaconda.org to distribute software packages they used daily: the [Omnia Molecular Dynamics](https://github.com/omnia-md) project started as early as March 2014 [^binstar-omnia], UK Met Office supported [SciTools project](https://scitools.org.uk/) joined in June 2014 [^binstar-scitools], the [US Integrated Ocean Observing System (IOOS)](http://www.ioos.noaa.gov/) started using it in July 2014 [^binstar-ioos].

In 2014, Filipe Fernandes ([@ocefpaf](https://github.com/ocefpaf)) and Phil Elson ([@pelson](https://github.com/pelson)) are maintaining the Binstar channels for IOOS and SciTools, respectively. Phil had [implemented CI pipelines](https://github.com/SciTools/conda-recipes-scitools/blob/995fc231967719db0dd6321ba8a502390a2f192c/.travis.yml) and [special tooling](https://github.com/conda-tools/conda-build-all) to build conda packages for SciTools efficiently, and Filipe borrowed it for IOOS. There was also a healthy exchange of recipes between the two groups, very often with the assistance of folks in other communities. For example, Christophe Gohlke and David Cournapeau were instrumental to get Windows builds of the whole SciPy stack working on AppVeyor.

It was a successful collaborative effort, but it was inefficient since they were working in separate repos, duplicated recipes, etc. Given the success of the `ContinuumIO/conda-recipes` repository, it was obvious there was a demand for high quality conda recipes and more efficient collaboration under a single umbrella. On April 11th, 2015, `conda-forge` is registered as a Github organization [^github-api-conda-forge] and an Anaconda.org channel [^binstar-conda-forge].

<!-- to be continued -->

## References

[^activepython]: https://www.activestate.com/platform/supported-languages/python/
[^anaconda-history]: [The Early History of the Anaconda Distribution](http://ilan.schnell-web.net/prog/anaconda-history/), Ilan Schnell, 2018.
[^anaconda-rebrand]: https://www.anaconda.com/blog/continuum-analytics-officially-becomes-anaconda, 2017.
[^binstar-conda-forge]: https://anaconda.org/conda-forge, 2015.
[^binstar-ioos]: https://anaconda.org/ioos, 2014.
[^binstar-omnia]: https://anaconda.org/omnia, 2014.
[^binstar-scitools]: https://anaconda.org/scitools, 2014.
[^binstar]: [SciPy 2013 Lightning Talks, Thu June 27](https://youtu.be/ywHqIEv3xXg?list=PLYx7XA2nY5GeTWcUQTbXVdllyp-Ie3r-y&t=850).
[^cgohlke-shutdown]: [What to do when Gohlke's python wheel service shuts down?](https://stackoverflow.com/questions/72581592/what-to-do-when-gohlkes-python-wheel-service-shuts-down), 2022.
[^cgohlke]: https://www.cgohlke.com/, 2025.
[^chatting-ocefpaf]: [Filipe Fernandes on the Evolution of conda-forge](https://www.youtube.com/watch?v=U2oa_RLbTVA), Chatting with the Conda Community #1, 2024.
[^conda-changelog-1.0]: [`conda` 1.0 release notes](https://github.com/conda/conda/blob/24.7.1/CHANGELOG.md#100-2012-09-06), 2012.
[^conda-recipes-repo]: [ContinuumIO/conda-recipes](https://github.com/conda-archive/conda-recipes)
[^early-conda-build-docs]: [Conda build framework documentation](https://web.archive.org/web/20141006141927/http://conda.pydata.org/docs/build.html), 2014.
[^eggs]: [The Internal Structure of Python Eggs](https://setuptools.pypa.io/en/latest/deprecated/python_eggs.html).
[^enthought]: https://docs.enthought.com/canopy/
[^github-api-conda-forge]: https://api.github.com/orgs/conda-forge
[^legacy-python-downloads]: [Download Python for Windows (legacy docs)](https://legacy.python.org/download/windows/).
[^lex-fridman-podcast]: [Travis Oliphant: NumPy, SciPy, Anaconda, Python & Scientific Programming](https://www.youtube.com/watch?v=gFEE3w7F0ww&t=7596s), Lex Fridman Podcast #224, 2022.
[^new-advances-in-conda]: [New Advances in Conda](https://web.archive.org/web/20140331190645/http://continuum.io/blog/new-advances-in-conda), Ilan Schnell, 2013.
[^packaging-and-deployment-with-conda]: [Packaging and deployment with conda](https://speakerdeck.com/teoliphant/packaging-and-deployment-with-conda), Travis Oliphant, 2013.
[^pythonxy]: https://python-xy.github.io/, 2015.
[^technical-discovery]: https://technicaldiscovery.blogspot.com/2013/12/why-i-promote-conda.html, 2013.
[^wheels]: [PEP 427 – The Wheel Binary Package Format 1.0](https://peps.python.org/pep-0427/)

---
title: History
---

# History of conda-forge

conda-forge's origins cannot be explained without understanding the context of Python packaging back in the early 2010s. Back then, the installation of Python packages across operating systems was very challenging, specially on Windows, as it often meant compiling dependencies from source.

Python 2.x was the norm. To install it, you'd get the official installers from Python.org, stick to the system provided one in Linux, or resort to options like Python(x,y) [^pythonxy], ActiveState ActivePython [^activepython] or Enthought's distributions [^enthought] in macOS and Windows [^legacy-python-downloads].

If you wanted to install additional packages, you would find that the community was transitioning from `easy_install` to `pip`, and there wouldn't be an alternative for Python eggs [^eggs] until 2013, when wheels are formalized [^wheels].
Realistically, you would have to wait until 2016, when `manylinux` wheels were introduced. For Windows, 

Before then, there was no easy way to ship pre-compiled Python packages: you would need to compile from source. If you were on Windows, Christoph Gohlke's wheels [^cgohlke]<sup>,</sup>[^cgohlke-shutdown] were your only choice.

## The origins of `conda`

In 2012, Continuum Analytics announces Anaconda 0.8 in the SciPy conference [^anaconda-history]. Later that year, in September, Continuum would release `conda` 1.0, the cross-platform, language-agnostic package manager for pre-compiled artifacts [^conda-changelog-1.0]. The motivation behind these efforts was to provide an easy way to ship all the compiled libraries and Python packages that users of the SciPy and numpy stacks neede [^packaging-and-deployment-with-conda]<sup>,</sup>[^lex-fridman-podcast]:

Travis Oliphant, on [Why I promote conda](https://technicaldiscovery.blogspot.com/2013/12/why-i-promote-conda.html) (2013):

> [...] at the first PyData meetup at Google HQ, where several of us asked Guido what we can do to fix Python packaging for the NumPy stack. Guido's answer was to "solve the problem ourselves". We at Continuum took him at his word. We looked at dpkg, rpm, pip/virtualenv, brew, nixos, and 0installer, and used our past experience with EPD. We thought hard about the fundamental issues, and created the conda package manager and conda environments.

Conda packages were not only able to ship pre-compiled Python packages across platforms. They were agnostic enough to ship Python itself, as well as the underlying shared libraries without having to statically vendor them. This was particularly convenient for projects that relied on both compiled dependencies (e.g. C++ or Fortran libraries) and Python "glue code".

By June 2013, conda is using a SAT solver and includes the `conda build` subcommand [^new-advances-in-conda], along with the concept of recipes [^conda-recipes-repo] [^early-conda-build-docs]. This is also when the first Miniconda release and Binstar.org [^binstar], the predecessor of the Anaconda.org channels, are announced. This meant that now any user could build their software stack as conda packages and redistribute them online at no cost.

By 2015, several institutes and groups were using Binstar to distribute software packages they used daily: the [Omnia Molecular Dynamics](https://github.com/omnia-md) project started as early as March 2014 [^binstar-omnia], UK Met Office supported [SciTools project](https://scitools.org.uk/) joined in June 2014 [^binstar-scitools], the [US Integrated Ocean Observing System (IOOS)](http://www.ioos.noaa.gov/) started using it in July 2014 [^binstar-ioos]. The channel for conda-forge was not created until April 2015 [^binstar-conda-forge], and [Bioconda](https://anaconda.org/bioconda) waited until September of the same year.

In 2015, Binstar.org became Anaconda.org, and in 2017 Continuum Analytics rebranded as Anaconda Inc [^anaconda-rebrand].

## How conda-forge came to be

In 2014, Filipe Fernandes ([@ocefpaf](https://github.com/ocefpaf)) and Phil Elson ([@pelson](https://github.com/pelson)) get in touch [^chatting-ocefpaf]. They are maintaining the Binstar channels for IOOS and Scitools, respectively.

<!-- to be continued -->

## References

[^cgohlke]: https://www.cgohlke.com/, 2025.
[^cgohlke-shutdown]: [What to do when Gohlke's python wheel service shuts down?](https://stackoverflow.com/questions/72581592/what-to-do-when-gohlkes-python-wheel-service-shuts-down), 2022.
[^anaconda-history]: [The Early History of the Anaconda Distribution](http://ilan.schnell-web.net/prog/anaconda-history/), Ilan Schnell, 2018.
[^lex-fridman-podcast]: [Travis Oliphant: NumPy, SciPy, Anaconda, Python & Scientific Programming](https://www.youtube.com/watch?v=gFEE3w7F0ww&t=7596s), Lex Fridman Podcast #224, 2022.
[^conda-changelog-1.0]: [`conda` 1.0 release notes](https://github.com/conda/conda/blob/24.7.1/CHANGELOG.md#100-2012-09-06), 2012.
[^early-conda-build-docs]: [Conda build framework documentation](https://web.archive.org/web/20141006141927/http://conda.pydata.org/docs/build.html), 2014.
[^conda-recipes-repo]: [ContinuumIO/conda-recipes](https://github.com/conda-archive/conda-recipes)
[^packaging-and-deployment-with-conda]: [Packaging and deployment with conda](https://speakerdeck.com/teoliphant/packaging-and-deployment-with-conda), Travis Oliphant, 2013.
[^new-advances-in-conda]: [New Advances in Conda](https://web.archive.org/web/20140331190645/http://continuum.io/blog/new-advances-in-conda), Ilan Schnell, 2013.
[^binstar-scitools]: https://anaconda.org/scitools, 2014.
[^binstar-ioos]: https://anaconda.org/ioos, 2014.
[^binstar-omnia]: https://anaconda.org/omnia, 2014.
[^binstar-conda-forge]: https://anaconda.org/conda-forge, 2015.
[^chatting-ocefpaf]: [Filipe Fernandes on the Evolution of conda-forge](https://www.youtube.com/watch?v=U2oa_RLbTVA), Chatting with the Conda Community #1, 2024.
[^wheels]: [PEP 427 – The Wheel Binary Package Format 1.0](https://peps.python.org/pep-0427/)
[^eggs]: [The Internal Structure of Python Eggs](https://setuptools.pypa.io/en/latest/deprecated/python_eggs.html).
[^legacy-python-downloads]: [Download Python for Windows (legacy docs)](https://legacy.python.org/download/windows/).
[^pythonxy]: https://python-xy.github.io/, 2015.
[^activepython]: https://www.activestate.com/platform/supported-languages/python/
[^enthought]: https://docs.enthought.com/canopy/
[^anaconda-rebrand]: https://www.anaconda.com/blog/continuum-analytics-officially-becomes-anaconda, 2017.
[^technical-discovery]: https://technicaldiscovery.blogspot.com/2013/12/why-i-promote-conda.html, 2013.
[^binstar]: [SciPy 2013 Lightning Talks, Thu June 27](https://youtu.be/ywHqIEv3xXg?list=PLYx7XA2nY5GeTWcUQTbXVdllyp-Ie3r-y&t=850).

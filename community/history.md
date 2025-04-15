---
title: History
---

# History of conda-forge

<!-- TODO: Add a little introduction -->

## Context of binary packaging for Python

conda-forge's origins are best understood in the context of Python packaging back in the early 2010s. Back then, the installation of Python packages across operating systems was very challenging, especially on Windows, as it often meant compiling dependencies from source.

Python 2.x was the norm. To install it, you'd get the official installers from Python.org, use the system-provided interpreter in Linux, or resort to options like Python(x,y) [^pythonxy], ActiveState ActivePython [^activepython] or Enthought's distributions (EPD, later Canopy) [^enthought] in macOS and Windows [^legacy-python-downloads].

If you wanted to install additional packages, the community was transitioning from `easy_install` to `pip`, and there was no easy way to ship or install pre-compiled Python packages. An alternative to the Python eggs [^eggs] used by `easy_install` wouldn't emerge until 2013 with the formalization of wheels [^wheels]. These were useful for Windows, where Christoph Gohlke's exes and wheels [^cgohlke]<sup>,</sup>[^cgohlke-shutdown] were your only choice.

However, for Linux, you would have to wait until 2016, when [`manylinux` wheels were introduced](https://peps.python.org/pep-0513/). Before then, PyPI wouldn't even allow compiled Linux wheels and your only alternative was to compile every package from source.

As an example, take a look at the [PyPI download page for `numpy` 1.7.0](https://pypi.org/project/numpy/1.7.0/#files), released in Feb 2013. The "Built Distributions" section only shows a few `.exe` files for Windows (!), and some `manylinux1` wheels. However, the `manylinux1` wheels were not uploaded until April 2016. There was no mention whatsoever of macOS. Now compare it to [`numpy` 1.11.0](https://pypi.org/project/numpy/1.11.0/#files), released in March 2016: wheels for all platforms!

The reason why it is hard to find packages for a specific system, and why compilation was the preferred option for many, is [binary compatibility][abi]. Binary compatibility is a window of compatibility where each combination of compiler version, core libraries such as `glibc`, and dependency libraries present on the build machine are compatible on destination systems. Linux distributions achieve this by freezing compiler versions and library versions for a particular release cycle. Windows achieves this relatively easily because Python standardized on particular Visual Studio compiler versions for each Python release. Where a Windows package executable was reliably redistributable across versions of Windows, so long as Python version was the same, Linux presented a more difficult target because it was (and is) so much harder to account for all of the little details that must line up.

## The origins of `conda`

In 2012, Continuum Analytics announced Anaconda 0.8 at the SciPy conference [^anaconda-history]. Anaconda was a distribution of scientifically-oriented packages, but did not yet have tools for managing individual packages. Later that year, in September, Continuum released `conda` 1.0, the cross-platform, language-agnostic package manager for pre-compiled artifacts [^conda-changelog-1.0]. The motivation behind these efforts was to provide an easy way to ship all the compiled libraries and Python packages that users of the SciPy and NumPy stacks needed [^packaging-and-deployment-with-conda]<sup>,</sup>[^lex-fridman-podcast].

Travis Oliphant, on [Why I promote conda](https://technicaldiscovery.blogspot.com/2013/12/why-i-promote-conda.html) (2013):

> [...] at the first PyData meetup at Google HQ, where several of us asked Guido what we can do to fix Python packaging for the NumPy stack. Guido's answer was to "solve the problem ourselves". We at Continuum took him at his word. We looked at dpkg, rpm, pip/virtualenv, brew, nixos, and 0installer, and used our past experience with EPD [Enthought Python Distribution]. We thought hard about the fundamental issues, and created the conda package manager and conda environments.

Conda packages could not only ship pre-compiled Python packages across platforms but were also agnostic enough to ship Python itself, as well as the underlying shared libraries without having to statically vendor them. This was particularly convenient for projects that relied on both compiled dependencies (e.g. C++ or Fortran libraries) and Python "glue code".

By June 2013, conda was using a SAT solver and included the `conda build` tool [^new-advances-in-conda] for community users outside of Continuum to build their own conda packages. This is also when the first Miniconda release and Binstar.org [^binstar], a site for hosting arbitrary user-built conda packages, were announced. Miniconda provided a minimal base environment that users could populate themselves, and Binstar.org gave any user an easy platform for redistributing their packages. All of the conda tools have been free (BSD 3-clause) and Binstar/Anaconda.org was also free (as in beer, not open source), with some paid options on Binstar/Anaconda.org for more storage.

With `conda build` came along the concept of recipes [^early-conda-build-docs]. The [`ContinuumIO/conda-recipes`](https://github.com/conda-archive/conda-recipes) repository became _the_ central
place where people would contribute their conda recipes. This was separate from Anaconda's package recipes, which were private at this point. While successful, the recipes varied in quality, and typically only worked on one or two platforms. There was no CI for any recipes to help keep them working. It was common to find recipes that would no longer build, and you had to tweak it to get it to work.

In 2015, Binstar.org became Anaconda.org, and in 2017 Continuum Analytics rebranded as Anaconda Inc [^anaconda-rebrand].

## How conda-forge came to be

By 2015, several institutes and groups were using Binstar/Anaconda.org to distribute software packages they used daily: the [Omnia Molecular Dynamics](https://github.com/omnia-md) project started as early as March 2014 [^binstar-omnia], the UK Met Office supported [SciTools project](https://scitools.org.uk/) joined in June 2014 [^binstar-scitools], the [US Integrated Ocean Observing System (IOOS)](http://www.ioos.noaa.gov/) started using it in July 2014 [^binstar-ioos]. Although each channel was building conda packages, the binary compatibility between channels was unpredictable.

In 2014, Filipe Fernandes ([@ocefpaf](https://github.com/ocefpaf)) and Phil Elson ([@pelson](https://github.com/pelson)) were maintaining the Binstar channels for IOOS and SciTools, respectively. Phil had [implemented CI pipelines](https://github.com/SciTools/conda-recipes-scitools/blob/995fc231967719db0dd6321ba8a502390a2f192c/.travis.yml) and [special tooling](https://github.com/conda-tools/conda-build-all) to build conda packages for SciTools efficiently, and Filipe borrowed it for IOOS. There was also a healthy exchange of recipes between the two groups, often assisted by members of other communities. For example, Christophe Gohlke and David Cournapeau were instrumental in getting Windows builds of the whole SciPy stack to work on AppVeyor.

There was a lot of cross-pollination between projects/channels, but projects were still working in separate repos, duplicating recipes, and with differing build toolchains (so mixing channels was unpredictable). Given the success of the `ContinuumIO/conda-recipes` repository, it became clear there was a demand for high quality conda recipes and more efficient community-driven collaboration under a single umbrella [^talkpython-conda]. On April 11th, 2015, `conda-forge` was registered as a Github organization [^github-api-conda-forge] and an Anaconda.org channel [^binstar-conda-forge].

## Meanwhile at Continuum

> Reminder: Continuum Analytics is now Anaconda, but this article tries to keep the company name contemporaneous with the state of the world.

It's a little strange to describe Continuum's history here, but the company history is so deeply intertwined with conda-forge that it is essential for a complete story. During this time, Continuum (especially Ilan Schnell ([@ilanschnell](https://github.com/ilanschnell))) was developing its own internal recipes for packages. Continuum's Linux toolchain at the time was based on CentOS 5 and GCC 4.8. These details matter, because they effectively set the compatibility bounds of the entire conda package ecosystem. The packages made from these internal recipes were available on the `free` channel, which in turn was part of a metachannel named `defaults`. The `defaults` channel made up the initial channel configuration for the Miniconda and Anaconda installers. Concurrently, Aaron Meurer ([@asmeurer](https://github.com/asmeurer)) led the `conda` and `conda-build` projects, contributed many recipes to the `conda-recipes` repository and built many packages on his `asmeurer` binstar.org channel. Aaron left Continuum in late 2015, leaving the community side of the projects in need of new leadership. Continuum hired Kale Franz ([@kalefranz](https://github.com/kalefranz)) to fill this role. Kale had huge ambitions for conda, but `conda-build` was not as much of a priority for him. Michael Sarahan ([@msarahan](https://github.com/msarahan)) stepped in to maintain `conda-build`.

In 2016, Rich Signell at USGS connected Filipe and Phil with Travis Oliphant at Continuum, who assigned Michael Sarahan to be Continuum's representative in `conda-forge`. Ray Donnelly ([@mingwandroid](https://github.com/mingwandroid)) joined the team at Continuum soon afterwards, bringing extensive experience in package managers and toolchains from his involvement in the MSYS2 project. There was a period of time where conda-forge and Continuum worked together closely, with conda-forge relying on Continuum to supply several core libraries. In its infancy, the `conda-forge` channel had far fewer packages than the `defaults` channel. conda-forge's reliance on `defaults` was partly to lower conda-forge's maintenance burden and reduce duplicate work, but it also helped keep mixtures of conda-forge and `defaults` channel packages working by reducing possibility of divergence. Just as there were binary compatibility issues with mixing packages from among the many Binstar channels, mixing packages from `defaults` with `conda-forge` could be fragile and frustrating.


The result of this overhaul crystallized in the `compiler(...)` Jinja function in `conda-build` 3.x and the publication of the GCC 7 toolchain built from source in `defaults` [^anaconda-compilers].


Here around 2017, Continuum renamed itself to Anaconda, so let's switch those names from here out.

As more and more conflicts with `free` channel packages occurred, conda-forge gradually added more and more of their own core dependency packages to avoid those breakages. At the same time, Anaconda was working on two contracts that would prove revolutionary. Samsung wanted to use conda packages to manage their internal toolchains, and Ray suggested that this was complementary to our own internal needs to update our toolchain. Samsung's contract supported development to conda-build that greatly expanded its ability to support explicit variants of recipes. Intel was working on developing their own Python distribution at the time, which they based on Anaconda and added their accelerated math libraries and patches to. Part of the Intel contract was that Anaconda would move all of their internal recipes into public-facing GitHub repositories. Rather than putting another set of repositories (another set of changes to merge) in between internal and external sources, such as conda-forge, Michael and Ray pushed for a design where conda-forge would be the reference source of recipes. Anaconda would only carry local changes if they were not able to be incorporated into the conda-forge recipe for social, licensing, or technical reasons. The combination of these conda-forge based recipes and the new toolchain are what made up the `main` channel, which was also part of `defaults`. The `main` channel represented a major step forward in keeping conda-forge and Anaconda aligned, which equates to smooth operation and happy users. The joined recipe base and toolchain has sometimes been contentious, with conda-forge wanting to move faster than Anaconda or vice-versa. The end result has been a compromise between cutting-edge development and slower enterprise-focused development.

<!-- miniforge -->

<!-- autotick bot -->

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

[^talkpython-conda]: [Guaranteed packages via Conda and Conda-Forge](https://talkpython.fm/episodes/show/94/guarenteed-packages-via-conda-and-conda-forge), 2016.

[^technical-discovery]: https://technicaldiscovery.blogspot.com/2013/12/why-i-promote-conda.html, 2013.

[^wheels]: [PEP 427 – The Wheel Binary Package Format 1.0](https://peps.python.org/pep-0427/)

<!-- links -->

[abi]: https://pypackaging-native.github.io/background/binary_interface/
[free-channel]: https://anaconda.org/free
[gcc-5]: https://gcc.gnu.org/gcc-5/changes.html

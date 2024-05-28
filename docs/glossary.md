---
title: 'Glossary'
---

<a id="miscellaneous"></a>

<a id="misc-glossary"></a>

<a id="glossary"></a>

# Glossary

List of frequently used terms and acronyms.

<a id="term-ABI"></a>

## ABI

Application Binary Interface. ABI is a document that comprehensively defines the binary system interface between applications and the operating system on which they run.

Learn More at [Wikipedia](https://en.wikipedia.org/wiki/Application_binary_interface) or [pypackaging-native](https://pypackaging-native.github.io/background/binary_interface).

<a id="term-CDN"></a>

## CDN

Content Delivery Network. CDNs are geographically distributed networks of servers that mirror the contents of a primary source. Having multiple servers offering the same content increases performance (reduced latency, higher download speeds) and availability.

[Learn more](https://en.wikipedia.org/wiki/Content_delivery_network).

<a id="term-CDT"></a>

## CDT

Core Dependency Tree. Core Dependency Tree packages take care of the dependencies that are so close to the system that they are not packaged with conda-forge. A CDT package consists of repackaged CentOS binaries from the appropriate version, either 6 or 7 depending on user choice and platform.

[Learn more](https://conda-forge.org/docs/maintainer/knowledge_base.html#cdt-packages).

<a id="term-CFEP"></a>

## CFEP

Conda Forge Enhancement Proposal. A CFEP is a document that outlines a suggested change to how the conda-forge project operates, from a technical standpoint as well as to address social topics such as governance and expected conduct.

[Learn More](https://github.com/conda-forge/cfep/blob/main/cfep-01.md/).

<a id="term-CI"></a>

## CI

Continuous Integration. Continuous integration is the practice of automating the integration of code changes from multiple contributors into a single software project.

[Learn More](https://en.wikipedia.org/wiki/Continuous_integration).

<a id="term-CLI"></a>

## CLI

Command Line Interface. A program in which commands are entered as text, one line at a time, for a computer to execute. This is done in the Miniforge Prompt in Windows, and in a terminal in macOS and Linux. `conda` is executed in a CLI.

[Learn More](https://en.wikipedia.org/wiki/Command-line_interface).

<a id="term-Conda-channel"></a>

## Conda channel

Conda channels are the locations where packages are stored. They serve as the base for hosting and managing packages. `conda-forge` is one example of a conda channel.

[Learn More](https://docs.conda.io/projects/conda/en/latest/user-guide/concepts/channels.html).

<a id="term-Conda-package"></a>

## Conda package

A conda package is a `.tar.bz2` or `.conda` archive that contains libraries, executable programs, data files and other components, as well as metadata under the `info/` directory. Its contents are unpacked in the installation prefix.

[Learn More](<https://en.wikipedia.org/wiki/Conda_(package_manager)>).

<a id="term-CRAN"></a>

## CRAN

Comprehensive R Archive Network. CRAN is a network of FTP and web servers around the world that store identical, up-to-date versions of code and documentation for R.

[Learn More](https://cran.r-project.org/).

<a id="term-Environment"></a>

## Environment

An environment is a tool that helps to keep dependencies required by different projects separate by creating isolated spaces where these dependencies are installed.

[Learn More](https://docs.conda.io/projects/conda/en/latest/user-guide/concepts/environments.html).

<a id="term-ICU"></a>

## ICU

International Components for Unicode. ICU is an open-source project of mature C/C++ and Java libraries for Unicode support, software internationalization, and software globalization.

[Learn More](https://icu.unicode.org/).

<a id="term-PR"></a>

## PR

Pull Request. A Pull Request is a workflow method to submit contributions to an open development project in which the developer asks for changes committed to an external repository to be considered for inclusion in a project's main repository.

[Learn More](https://help.github.com/articles/about-pull-requests/).

<a id="term-Recipe"></a>

## Recipe

A recipe is a collection of files required to build a conda package. This includes, at minimum, a [`meta.yaml`](maintainer/adding_pkgs.md#the-recipe-meta-yaml) file, but can also include license files, patches, build scripts, test scripts etc.

[Learn More](https://docs.conda.io/projects/conda-build/en/stable/resources/define-metadata.html).

<a id="term-Virtual-package"></a>

## Virtual package

Virtual packages are not real packages that can be downloaded. They are injected by the conda clients at runtime so the solver can consider that metadata as part of the constraints of the problem. By convention, they always start with a double underscore (`__`). Some examples include the type of operating system (Linux, Windows, macOS), or the CUDA version supported by the system (if any).

[Learn More](https://conda.io/projects/conda/en/latest/user-guide/tasks/manage-virtual.html).

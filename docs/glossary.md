---
title: 'Glossary'
sidebar_position: 27
---

<a id="miscellaneous"></a>

<a id="misc-glossary"></a>

<a id="glossary"></a>

# Glossary

<a id="term-ABI"></a>

## ABI

**A**pplication **B**inary **I**nterface. ABI is a document that comprehensively defines the binary system interface between applications and the operating system on which they run. [Learn More](https://en.wikipedia.org/wiki/Application_binary_interface).

<a id="term-CDT"></a>

## CDT

**C**ore **D**ependency **T**ree. Core Dependency Tree packages take care of the dependencies which are so close to the system that they are not packaged with conda-forge. A CDT package consists of repackaged CentOS binaries from the appropriate version, either 6 or 7 depending on user choice and platform. [Learn more](maintainer/knowledge_base.md#cdt-packages).

## CLI

**C**ommand **L**ine **I**nterface. A program in which commands are entered as text, one line at a time, for a computer to execute. This is done in the Miniforge Prompt in Windows, and in a terminal in macOS and Linux. `conda` is executed in a CLI. [Learn More](https://en.wikipedia.org/wiki/Command-line_interface).

<a id="term-CI"></a>

## CI

**C**ontinuous **I**ntegration. Continuous integration is the practice of automating the integration of code changes from multiple contributors into a single software project. [Learn More](https://en.wikipedia.org/wiki/Continuous_integration).

<a id="term-CFEP"></a>

## CFEP

**C**onda **F**orge **E**nhancement **P**roposal. A CFEP is a document which outlines a suggested change to how the conda-forge project operates, from a technical standpoint as well as to address social topics such as governance and expected conduct. [Learn More](https://github.com/conda-forge/cfep/blob/main/cfep-01.md/).

<a id="term-Conda-channel"></a>

## Conda channel

Conda channels are the locations where packages are stored. They serve as the base for hosting and managing packages. `conda-forge` is one example of a conda channel. [Learn More](https://docs.conda.io/projects/conda/en/latest/user-guide/concepts/channels.html).

<a id="term-Conda-package"></a>

## Conda package

A conda package is a `.tar.bz2` or `.conda` archive that contains libraries, executable programs, data files and other components, as well as metadata under the `info/` directory. Its contents are unpacked in the installation prefix. [Learn More](https://en.wikipedia.org/wiki/Conda_(package_manager)).

<a id="term-CRAN"></a>

## CRAN

**C**omprehensive **R** **A**rchive **N**etwork. CRAN is a network of FTP and web servers around the world that store identical, up-to-date, versions of code and documentation for R. [Learn More](https://cran.r-project.org/).

<a id="term-Environment"></a>

## Environment

An environment is a tool that helps to keep dependencies required by different projects separate by creating isolated spaces where these dependencies are installed. [Learn More](https://docs.conda.io/projects/conda/en/latest/user-guide/concepts/environments.html).

<a id="term-ICU"></a>

## ICU

**I**nternational **C**omponents for **U**nicode. ICU is an open-source project of mature C/C++ and Java libraries for Unicode support, software internationalization, and software globalization. [Learn More](https://icu.unicode.org/).

<a id="term-PR"></a>

## PR

**P**ull **R**equest. Pull Request is a workflow method to submit contributions to an open development project in which the developer asks for changes committed to an external repository to be considered for inclusion in a project's main repository. [Learn More](https://help.github.com/articles/about-pull-requests/).

## Recipe

A recipe is a collection of files required to build a conda package. This includes, at minimum, a [`meta.yaml`](maintainer/adding_pkgs.md#the-recipe-meta-yaml) file, but can also include license files, patches, build scripts, test scripts etc. [Learn More](https://docs.conda.io/projects/conda-build/en/stable/resources/define-metadata.html).

## Virtual package

Virtual packages are not real packages that can be downloaded. They are injected by the conda clients at runtime so the solver can consider that metadata as part of the constraints of the problem. By convention, they always start with a double underscore (`__`). Some examples include the type of operating system (Linux, Windows, macOS), or the CUDA version supported by the system (if any). [Learn More](https://conda.io/projects/conda/en/latest/user-guide/tasks/manage-virtual.html).

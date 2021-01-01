# [conda-forge.org](https://conda-forge.org)
[![deploy](https://github.com/conda-forge/conda-forge.github.io/workflows/deploy/badge.svg)](https://github.com/conda-forge/conda-forge.github.io/actions?query=workflow%3Adeploy)

## Overview
This repository
- is the home of the source code of conda-forge's documentation.
- provides an [issue tracker](https://github.com/conda-forge/conda-forge.github.io/issues) for conda-forge related questions and issues that are **not specific to individual feedstocks**.

If you have questions or need help, please check out our documentation for a [list of ways to interact with us](https://conda-forge.org/docs/user/how_to_get_help.html).

## Building the docs

The docs are built on GitHub Actions and run the `.ci_scripts/update_docs` script.
To build the docs locally, you should do the following:
1. `conda env create -f ./.ci_scripts/environment.yml`
2. `conda activate conda-forge-docs`
3. `cd src`
4. `make html`

## Improving the docs

We are constantly improving our documentation and are very grateful for feedback and contributions. If you would like to help, please be aware that the html documentation in the `docs` folder is automatically generated from the source files in the `src` folder. Therefore please always edit the files in `src` and never in `docs`.

## conda-forge dev meetings

Our documentation contains a section with [minutes from previous dev meetings]([https://conda-forge.org/docs/minutes/00_intro.html]). These meetings occur every two weeks on Wednesday from 17:00-18:00 UTC.
A link to the google calendar item can be found [here](https://calendar.google.com/event?action=TEMPLATE&tmeid=Z2lraDk2a205cGUxdDkxYmNybXQxMGIxMGtfMjAxOTA3MjRUMTcwMDAwWiBzY29wYXR6QG0&tmsrc=scopatz%40gmail.com&scp=ALL).

We use https://hackmd.io/ for taking meeting minutes and will upload the resultant markdown file after the meeting has concluded.

There is a template provided in [`misc/DEV_MEETING_TEMPLATE.md`](https://github.com/conda-forge/conda-forge.github.io/tree/master/misc/DEV_MEETING_TEMPLATE.md) that you should use to create a new hackmd document.

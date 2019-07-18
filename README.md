# [conda-forge.org](https://conda-forge.org)
Documentation for conda-forge.

[![Build Status](https://travis-ci.org/conda-forge/conda-forge.github.io.svg?branch=master)](https://travis-ci.org/conda-forge/conda-forge.github.io)

## Building the docs

The docs are built on travis ci with the `.travis.yml` file at the root of this repository.
`.travis.yml` uses [conda-execute](https://github.com/conda-tools/conda-execute) to run the `.ci_scripts/update_docs` script.
To build the docs locally, you should do the following:
1. `conda env create -f ./.ci_support/environment.yml`
2. `conda activate conda-forge-docs`
3. `cd src`
4. `make html`

## conda-forge dev meetings

A directory containing the minutes from previous dev meetings can be found in /src/minutes or on our website at **insert website link here**.
These meetings occur every two weeks on Wednesday from 17:30-18:00 UTC.
A link to the google calendar item can be found [here](https://calendar.google.com/event?action=TEMPLATE&tmeid=Z2lraDk2a205cGUxdDkxYmNybXQxMGIxMGtfMjAxOTA3MjRUMTcwMDAwWiBzY29wYXR6QG0&tmsrc=scopatz%40gmail.com&scp=ALL).

We use https://hackmd.io/ for taking meeting minutes and will upload the resultant markdown file to this "./minutes" folder after the meeting has concluded.

There is a template provided in /src/minutes/TEMPLATE.md that you should use to create a new hackmd document.

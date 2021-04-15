# [conda-forge.org](https://conda-forge.org)
[![deploy](https://github.com/conda-forge/conda-forge.github.io/workflows/deploy/badge.svg)](https://github.com/conda-forge/conda-forge.github.io/actions?query=workflow%3Adeploy)

## Overview
This repository
- is the home of the source code of conda-forge's documentation.
- provides an [issue tracker](https://github.com/conda-forge/conda-forge.github.io/issues) for conda-forge related questions and issues that are **not specific to individual feedstocks**.

If you have questions or need help, please check out our documentation for a [list of ways to interact with us](https://conda-forge.org/docs/user/how_to_get_help.html).

## Improving the docs

- You can help to improve the documentation! It is version-controlled in the [conda-forge.github.io repository on GitHub](https://github.com/conda-forge/conda-forge.github.io).   The source text is stored in the src/ subdirectory and is formatted using Python’s [reStructuredText system](https://docutils.sourceforge.io/rst.html).

- The docs are built on GitHub Actions and run the `.ci_scripts/update_docs` script.
  We are glad to know that you would like to contribute. To build the docs locally, follow the steps mentioned below:
1.  [Fork](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo) the [conda-forge.github.io](https://github.com/conda-forge/conda-forge.github.io)        repository to your own GitHub user account.
2.  [Clone](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) this fork onto your computer.
3.  Go into the main folder. </br>
    Run the following commands.  
      *  `conda env create -f ./.ci_scripts/environment.yml`
      *  `conda activate conda-forge-docs`
      *  `cd newsfeed && pip install --no-deps .`
      *  `cd ../src`
      *  `make html`
4.  Make and commit your changes.
5.  Submit a [pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests) to the main repository proposing your changes.

**Note: "All changes must be made in the `/src` folder and NOT in the `/docs` folder. Html files in the ./docs folder are auto generated "**

## conda-forge dev meetings

Our documentation contains a section with [minutes from previous dev meetings]([https://conda-forge.org/docs/minutes/00_intro.html]). These meetings occur every two weeks on Wednesday from 17:00-18:00 UTC.
A link to the google calendar item can be found [here](https://calendar.google.com/event?action=TEMPLATE&tmeid=Z2lraDk2a205cGUxdDkxYmNybXQxMGIxMGtfMjAxOTA3MjRUMTcwMDAwWiBzY29wYXR6QG0&tmsrc=scopatz%40gmail.com&scp=ALL).

We use https://hackmd.io/ for taking meeting minutes and will upload the resultant markdown file after the meeting has concluded.

There is a template provided in [`misc/DEV_MEETING_TEMPLATE.md`](https://github.com/conda-forge/conda-forge.github.io/tree/master/misc/DEV_MEETING_TEMPLATE.md) that you should use to create a new hackmd document.

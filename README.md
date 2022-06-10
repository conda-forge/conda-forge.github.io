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
A link to the google calendar item can be found [here](https://calendar.google.com/event?action=TEMPLATE&tmeid=bTk5ZzBoMDEzaW11cmZiNWJnNmNkbThocDRfMjAyMjA1MThUMTcwMDAwWiBlcmljQHZvbHRyb25kYXRhLmNvbQ&tmsrc=eric%40voltrondata.com&scp=ALL).

We use https://hackmd.io/ for taking meeting minutes and will (eventually) upload the resultant markdown file after the meeting has concluded.

There is a template provided in [`misc/DEV_MEETING_TEMPLATE.md`](https://github.com/conda-forge/conda-forge.github.io/tree/main/misc/DEV_MEETING_TEMPLATE.md) that you should use to create a new hackmd document.

## Code Of Conduct
Everyone is welcome to participate in conda-forge community (including the dev meetings) as long as the tenets of this Code of Conduct are adhered to:
* Treat one another with dignity and respect.
* Respect and treat others fairly, regardless of race, skin color, ethnicity, ancestry, place of origin, national origin, citizenship, religion, gender, sexual orientation, age, or disability.
* Behave professionally and patiently; respect everyone else's time and commitment. 
* Harassment and sexist, racist, or exclusionary jokes are unacceptable under any circumstance.


### Reporting Guidelines
* We at conda-forge takes reports of misconduct very seriously and is committed to preserving and maintaining the welcoming nature of our community.
* If you have experienced or witnessed behavior that violates the conda-forge Code of Conduct, please report this in a timely manner and complete the [form](https://numfocus.typeform.com/to/ynjGdT) to make a report. </br>
ATTRIBUTION : This Code of Conduct was based on the [NumFOCUS Code of Conduct](https://numfocus.org/code-of-conduct).



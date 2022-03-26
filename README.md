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

## Code of conduct

We at conda-forge adhere to the [NumFOCUS Code of Conduct](https://numfocus.org/code-of-conduct).

Be kind to others. Do not insult or put down others. Behave professionally. Remember that harassment and sexist, racist, or exclusionary jokes are not appropriate for conda-forge.

All communication should be appropriate for a professional audience including people of many different backgrounds. Sexual language and imagery is not appropriate.

conda-forge is dedicated to providing a harassment-free community for everyone, regardless of gender, sexual orientation, gender identity and expression, disability, physical appearance, body size, race, or religion. We do not tolerate harassment of community members in any form.

Thank you for helping make this a welcoming, friendly community for all.

## Reporting Guidelines

If you believe someone is violating the code of conduct, please report this in a timely manner. Code of conduct violations reduce the value of the community for everyone. The team at conda-forge takes reports of misconduct very seriously and is committed to preserving and maintaining the welcoming nature of our community.

All reports will be kept confidential. Please have a look at the [Reporting Guidelines](https://numfocus.org/code-of-conduct#reporting-guidelines).

## Enforcement: What Happens After a Report is Filed?

conda-forge and/or our event staff will attempt to ensure your safety and help with any immediate needs, particularly at an in-person event. conda-forge will make every effort to acknowledge receipt within 24 hours (and we’ll aim for much more quickly than that). Have a look at the process of [What Happens After a Report is Filed?](https://numfocus.org/code-of-conduct#enforcement).

## conda-forge dev meetings

Our documentation contains a section with [minutes from previous dev meetings](https://conda-forge.org/docs/minutes/00_intro.html). These meetings occur every two weeks on Wednesday from 17:00-18:00 UTC.
A link to the google calendar item can be found [here](https://calendar.google.com/event?action=TEMPLATE&tmeid=Z2lraDk2a205cGUxdDkxYmNybXQxMGIxMGtfMjAxOTA3MjRUMTcwMDAwWiBzY29wYXR6QG0&tmsrc=scopatz%40gmail.com&scp=ALL).

We use https://hackmd.io/ for taking meeting minutes and will upload the resultant markdown file after the meeting has concluded.

There is a template provided in [`misc/DEV_MEETING_TEMPLATE.md`](https://github.com/conda-forge/conda-forge.github.io/tree/main/misc/DEV_MEETING_TEMPLATE.md) that you should use to create a new hackmd document.

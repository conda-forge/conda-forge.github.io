CI Services
==========================
Here we describe common issues with the CI Services that conda-forge builds.


CircleCI (Linux)
------------------------------
Circle CI is a container-based CI service that conda-forge uses to build
linux packages.

Enabling Circle on your Fork
.............................
If for some reason Circle CI is not triggering build from forks,
Circle can be manually added for each fork. Circle calls this "Adding a Project" and
`the official Circle's documentation is available here <https://circleci.com/docs/getting-started/#add-and-follow-more-projects>`_.
This effectively amount to going to the `Add Projects <https://circleci.com/add-projects>`_
page, finding the fork that you wish to enable, and clicking the "Build Project" button.
This is not normally needed.
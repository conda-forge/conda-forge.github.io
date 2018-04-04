CI Services
==========================
Here we describe common issues with the CI Services that conda-forge builds.

Travis CI (OS X)
------------------------------
Travis CI is used to build packages for OS X. After merging a staged-recipes pull request, it might be necessary to
force sync your repositories in Travis CI to see the reload and cancel buttons. To do this please visit `<https://travis-ci.org/profile>`_ and click "Sync accounts".


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

Another issue is that Circle sometimes does not have permission to checkout the source code. You'll see a messsage like this::

    Cloning into '.'...
    Warning: Permanently added the RSA host key for IP address '192.30.253.113' to the list of known hosts.
    Permission denied (publickey).
    fatal: Could not read from remote repository.

There does not seem to be a reproducable way to fix this, but here's a list of things that you can try:

* Log in and out of Circle CI.
* Revoke Circle CI's access and then enable it again.
* In the  "Checkout SSH keys" section of your Circle CI project settings, press "add user key".

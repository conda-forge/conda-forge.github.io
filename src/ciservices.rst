CI Services
==========================
Here we describe common issues with the CI Services that conda-forge builds.

Travis CI (OS X)
------------------------------
Travis CI is used to build packages for OS X. After merging a staged-recipes pull request, it might be necessary to
force sync your repositories in Travis CI to see the reload and cancel buttons. To do this please visit `<https://travis-ci.org/profile>`_ and click "Sync accounts".


CircleCI (Linux, OSX)
------------------------------
Circle CI is a container-based CI service that conda-forge uses to build
linux packages. It can optionally build OSX packages.


Using Circle for both Linux and OSX
...................................

To use CircleCI for OSX, add the following to ``conda-forge.yml`` in the root of the feedstock.

.. code-block:: yaml

    provider:
      osx: circle

CircleCI for OSX should be used for OSX only when Travis-CI resources (50 minutes of build time per job) is not enough as CircleCI gives more resources (2 hours of build time per job).

Note that you need to rerender the feedstock once this change has been made.


Enabling Circle on your Fork
.............................
If for some reason Circle CI is not triggering build from forks,
Circle can be manually added for each fork. Circle calls this "Adding a Project" and
`the official Circle's documentation is available here <https://circleci.com/docs/getting-started/#add-and-follow-more-projects>`_.
This effectively amount to going to the `Add Projects <https://circleci.com/add-projects>`_
page, finding the fork that you wish to enable, and clicking the "Build Project" button.
This is not normally needed.

If CircleCI lacks permissions to checkout the source code, it will produce an error like follows::

    Cloning into '.'...
    Warning: Permanently added the RSA host key for IP address '192.30.253.113' to the list of known hosts.
    Permission denied (publickey).
    fatal: Could not read from remote repository.

When this happens for a feedstock, it can be fixed using the `webservice <https://conda-forge.org/docs/webservice.html#conda-forge-admin-please-update-circle>`_, by posting the following comment::
  
  @conda-forge-admin-please-update-circle

Otherwise (e.g. in a PR to staged-recipes), here are some things you can try:

* Log in and out of Circle CI.
* Revoke Circle CI's access and then enable it again.
* In the  "Checkout SSH keys" section of your Circle CI project settings, press "add user key".

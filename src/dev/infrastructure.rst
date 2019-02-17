Infrastructure
**************

Repositories
============

Staging area for recipes
------------------------

Smithy
------

conda-forge  uses ``conda-smithy`` to re-render the feedstock and update the feedstock configuration.
This action updates the ``README``, CI configuration, the build matrix,
fixes problems with the feedstock configuration, etc.

See :ref:`dev_update_rerender` for detailed description how feedstocks can be rerendered.

Web services
------------

conda-forge pinning
-------------------

Documentation
-------------




.. _dev_admservice:

Admin web services
==================

conda-forge is running a webservice on heroku called `conda-forge-webservices <https://github.com/conda-forge/conda-forge-webservices>`_.

The following services are run by default on a feedstock:

- It will lint the recipes in the PRs and report back whether recipe is in excellent condition or not.
- When maintainers are added to a recipe, the maintainer will be added to the team and given push access.

The webservice also listens to issue and PR comments so that you can ask for the following services to be done.

@conda-forge-admin, please rerender
-----------------------------------

Entering the above phrase in a PR of a feedstock will rerender the feedstock and push the changes to your PR.
Make sure to tick the ``Allow edits from maintainers.`` button locate at the bottom of the right side bar of
the PR. If you say this phrase in an issue comment, the bot will create a new pull request with the requested
re-rendering completed.


@conda-forge-admin, please add noarch: python
---------------------------------------------

Entering the above phrase in a PR or issue of a feedstock will add ``noarch: python`` to the build and rerender the feedstock
for you.


@conda-forge-admin, please update for conda-build 3
---------------------------------------------------

This command will attempt to update a recipe to the new conda-build 3 format. It can be sent either in an issue or a PR.

Note that this update command is kind of a hack, and things might go wrong. Make sure to look over the changes, and ask for help if you're not sure about something.


@conda-forge-admin, please lint
-------------------------------

Entering the above phrase in a PR of a feedstock will lint the PR again.


@conda-forge-admin, please update circle
----------------------------------------

Entering the above phrase in an issue of a feedstock will update the Circle-CI SSH deploy key. This will fix the
``permission denied (public key)`` issue in Circle-CI checkout phase; it shouldn't be needed otherwise.


@conda-forge-admin, please update team
--------------------------------------

Entering the above phrase in an issue will update the team for the feedstock. This is usually done automatically.



CI build services
=================

Here we describe common issues with the CI Services that conda-forge builds.

Travis CI (OS X)
----------------
Travis CI is used to build packages for OS X. After merging a staged-recipes pull request, it might be necessary to
force sync your repositories in Travis CI to see the reload and cancel buttons. To do this please visit `<https://travis-ci.org/profile>`_ and click "Sync accounts".


CircleCI (Linux, OSX)
---------------------
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
............................

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

  @conda-forge-admin, please update circle

Otherwise (e.g. in a PR to staged-recipes), here are some things you can try:

* Log in and out of Circle CI.
* Revoke Circle CI's access and then enable it again.
* In the  "Checkout SSH keys" section of your Circle CI project settings, press "add user key".




Skipping CI builds
------------------


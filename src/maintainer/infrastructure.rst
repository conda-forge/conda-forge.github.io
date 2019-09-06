.. _infrastructure:

Infrastructure
**************

Repositories
============

Staging area for recipes
------------------------

`conda-forge/staged-recipes <https://github.com/conda-forge/staged-recipes>`_ is the entry point for new packages to join the conda-forge package collection.
You can find a detailed guide to submitting new package recipes in :ref:`creating_recipes`.

Smithy
------

Smithy contains maintenance code for conda-forge, which is used by the ``conda smithy`` command line tool and the :ref:`dev_admservice`. Smithy lives in the repository `conda-forge/conda-smithy <https://github.com/conda-forge/conda-smithy>`_.

``conda-forge/conda-smithy`` is the right repository to report bugs for

 - the rerendering process
 - the recipe linter
 - :term:`CI` support utils

``conda-smithy`` also contains the command line tool that you will use if you rerender manually from the command line (see :ref:`dev_update_rerender`).


Web services
------------

The Heroku app providing the conda-forge web services lives in `conda-forge/conda-forge-webservices <https://github.com/conda-forge/conda-forge-webservices>`_.
Please note that the code logic provided by the app is in the ``Smithy`` repository.

Bugs or suggestions regarding the service functionality should therefore be opened in ``conda-forge/conda-smithy``'s `bug tracker <https://github.com/conda-forge/conda-smithy/issues>`_.

conda-forge pinning
-------------------

Package-wide dependency pins are defined in `conda_build_config.yaml <https://github.com/conda-forge/conda-forge-pinning-feedstock/blob/master/recipe/conda_build_config.yaml>`_  in the `conda-forge/conda-forge-pinning-feedstock <https://github.com/conda-forge/conda-forge-pinning-feedstock>`_.

For more information on conda-forge wide package pins, please refer to :ref:`globally_pinned_packages`.

Please open a :term:`PR` and/or issues there if you think a pin needs to be advanced. For more information on updating globally pinned packages, please refer to :ref:`update_pins`.

Documentation
-------------

The documentation lives in `conda-forge/conda-forge.github.io <https://github.com/conda-forge/conda-forge.github.io/>`__ and is automatically deployed to our `online version <https://conda-forge.org/docs/>`__.

The documentation is built with ``Sphinx`` and the sources files are located in the `src <https://github.com/conda-forge/conda-forge.github.io/tree/master/src>`__ directory of the repository.

If you found a typo, unclear explanations or new topics that could be covered, you can suggest changes to the documentation. For more details, please refer to :ref:`improve_docs`.



.. _dev_admservice:

Admin web services
==================

conda-forge is running a webservice on Heroku called `conda-forge-webservices <https://github.com/conda-forge/conda-forge-webservices>`_.

The following services are run by default on a feedstock:

- It will lint the recipes in the PRs and report back whether the recipe is in excellent condition or not.
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

.. _ci_update_circle:

@conda-forge-admin, please update circle
----------------------------------------

Entering the above phrase in an issue of a feedstock will update the Circle-CI SSH deploy key. This will fix the
``permission denied (public key)`` issue in Circle-CI's checkout phase; it shouldn't be needed otherwise.


@conda-forge-admin, please update team
--------------------------------------

Entering the above phrase in an issue will update the team for the feedstock. This is usually done automatically.

@conda-forge-admin, please restart ci
-------------------------------------

Entering this command in the PR of a feedstock or staged-recipes will close and then open the PR, causing 
all of the CI builds to restart.

CI build services
=================

Here we describe common issues with the CI Services that conda-forge builds.

Azure Pipelines
---------------
Azure is used to build packages for OS X, Linux, Linux (ARMv8) and Linux (IBM Power8+).  The build queue on Azure is substantially larger
than on all the other providers.  Azure builds have a maximum duration of 6 hours.

To see all builds on Azure go to `<https://dev.azure.com/conda-forge/feedstock-builds/_build>`_.

Restarting builds
.................

Presently Azure does not sync GitHub users. In order to restart a build you can restart it from the GitHub checks interface.
If that doesn't work, a close/open will kick off a new build. You can also use the web services command ``@conda-forge-admin, please restart ci``.

Using Azure for *everything*
............................

Azure is the default provider for Linux and OS X.  To use Azure for everything add the following to ``conda-forge.yml`` in the root
of the feedstock.

.. code-block:: yaml

    provider:
      win: azure

.. note::

  Presently Azure has some issues building libraries using cmake on Windows.  Azure does not have a VS2008 installation so building
  certain very old packages that require VC9 will fail.


Travis CI (OS X)
----------------

Travis CI is used to build packages for OS X. After merging a staged-recipes pull request, it might be necessary to
force sync your repositories in Travis CI to see the reload and cancel buttons. To do this please visit `<https://travis-ci.org/profile>`_ and click "Sync accounts".

Enabling Travis
...............

TravisCI should only be needed to build recipes on OS X if there is a strange failure on Azure.

Enable a build by adding the following to ``conda-forge.yml`` in the root
of the feedstock.

.. code-block:: yaml

    provider:
      osx: travis


CircleCI (Linux, OS X)
----------------------
Circle CI is a container-based CI service that conda-forge uses to build
Linux packages. It can optionally build OS X packages.

Linux builds are identical to those on Azure as both are built inside Docker containers.


Using Circle for both Linux and OS X
....................................

To use CircleCI for OS X, add the following to ``conda-forge.yml`` in the root of the feedstock.

.. code-block:: yaml

    provider:
      osx: circle
      linux: circle

CircleCI for OS X should be used for OS X only when Travis-CI resources (50 minutes of build time per job) are not enough as CircleCI gives more resources (2 hours of build time per job).

Note that you need to rerender the feedstock once this change has been made.


Enabling Circle on your Fork
............................

If for some reason Circle CI is not triggering build from forks,
Circle can be manually added for each fork. Circle calls this "Adding a Project" and
`the official Circle's documentation is available here <https://circleci.com/docs/getting-started/#add-and-follow-more-projects>`_.
This effectively amounts to going to the `Add Projects <https://circleci.com/add-projects>`_
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
* In the "Checkout SSH keys" section of your Circle CI project settings, press "add user key".

Appveyor
--------

Appveyor is used to build Windows packages.  It is the only provider that can build recipes that require Visual Studio 2008.


Skipping CI builds
------------------

.. todo::

  - add information regarding [ci skip] for all CIs.

.. admonition:: Related links

  - **abort builds with [skip ci]/etc** `(conda-forge.github.io/#629) <https://github.com/conda-forge/conda-forge.github.io/issues/629>`__
  - **Skip CI requests** `(staged-recipes/#1148) <https://github.com/conda-forge/staged-recipes/issues/1148>`__

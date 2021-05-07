.. _infrastructure:

Infrastructure
**************

Repositories
============

Staging area for recipes
------------------------

`conda-forge/staged-recipes <https://github.com/conda-forge/staged-recipes>`_ is the entry point for new packages to join the conda-forge package collection.
You can find the detailed guide for submitting new package recipes in :ref:`creating_recipes`.

Smithy
------

Smithy contains maintenance code for conda-forge, which is used by the ``conda-smithy`` command line tool and the :ref:`dev_admservice`. Smithy lives in the repository `conda-forge/conda-smithy <https://github.com/conda-forge/conda-smithy>`_.

``conda-forge/conda-smithy`` is the right repository to report bugs for

 - The rerendering process
 - The recipe linter
 - :term:`CI` support utils

``conda-smithy`` also contains the command line tool that you should use if you rerender manually from the command line (see :ref:`dev_update_rerender`).

Smithy can be used beyond Conda-Forge's purposes. For example, it can be used to `set up self-hosted Azure agents <self-hosted_azure-config>`_ for non-Conda-Forge infrastructures.
(You could also consider using `Azure virtual machine scale set agents <https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/scale-set-agents?view=azure-devops>`_,
which could be less expensive to run than permanently active agents.)


Web services
------------

The Heroku app providing the conda-forge web services lives in `conda-forge/conda-forge-webservices <https://github.com/conda-forge/conda-forge-webservices>`_.
Please note that the code logic provided by the app is in the ``Smithy`` repository.

Bugs or suggestions regarding the service functionality should therefore be opened in ``conda-forge/conda-smithy``'s `bug tracker <https://github.com/conda-forge/conda-smithy/issues>`_.

conda-forge pinning
-------------------

Package-wide dependency pins are defined in `conda_build_config.yaml <https://github.com/conda-forge/conda-forge-pinning-feedstock/blob/master/recipe/conda_build_config.yaml>`_  in the `conda-forge/conda-forge-pinning-feedstock <https://github.com/conda-forge/conda-forge-pinning-feedstock>`_.

For more information on conda-forge wide package pins, please refer to :ref:`globally_pinned_packages`.

Please open a :term:`PR` and/or an issue there, if you think a pin needs to be advanced. For more information on updating globally pinned packages, please refer to :ref:`update_pins`.

Documentation
-------------

The documentation lives in `conda-forge/conda-forge.github.io <https://github.com/conda-forge/conda-forge.github.io/>`__, and is automatically deployed to our `online version <https://conda-forge.org/docs/>`__.

The documentation is built with ``Sphinx`` and the sources files are located in the `src <https://github.com/conda-forge/conda-forge.github.io/tree/master/src>`__ directory of the repository.

If you found any typo error, unclear explanations or new topics that can be covered, you can suggest changes to the documentation. For more details, please refer to :ref:`improve_docs`.



.. _dev_admservice:

Admin web services
==================

Conda-forge is running a webservice on Heroku called `conda-forge-webservices <https://github.com/conda-forge/conda-forge-webservices>`_.

The following services are run by default on a feedstock:

- It will lint the recipes in the PRs and report back whether the recipe is in excellent condition or not.
- When maintainers are added to a recipe, each of the maintainers will be added to the team and given push access to the feedstock.

The webservice also listens to issues and PR comments, so that you can ask for the following services to be done:

@conda-forge-admin, please rerender
-----------------------------------

Entering the above phrase in a PR of a feedstock will rerender the feedstock and push the changes to your PR.
Make sure to tick the ``Allow edits from maintainers`` button located at the bottom of the right side bar of
the PR. If you enter this phrase in the comment for an issue, the bot will create a new pull request, with the requested
re-rendering being completed.


@conda-forge-admin, please add noarch: python
---------------------------------------------

Entering the above phrase in a PR or an issue of a feedstock will add ``noarch: python`` to the build and rerender the feedstock
for you.


@conda-forge-admin, please update for conda-build 3
---------------------------------------------------

This command will attempt to update a recipe to the new ``conda-build 3`` format. It can be sent either in an issue or a PR.

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

@conda-forge-admin, please ping team
------------------------------------

Entering this command in the PR of a feedstock or staged-recipes will have the admin bot @-mention the team
associated with the repo. This command can be useful for people who are not yet members of conda-forge and
so cannot @-mention the ``staged-recipes`` team for PR reviews.

@conda-forge-admin, please rerun bot
------------------------------------

Entering this command in a PR comment will add the ``bot-rerun`` label to that PR. This label will cause
the ``auto-tick`` bot that issues migration and version updates to close the current PR and reissue it.
Adding this label to non-bot issued PRs will have no effect.

@conda-forge-admin, please add bot automerge
--------------------------------------------

Entering this command in the title or comment of an issue will instruct the admin bot to
open a PR enabling the automatic merging of passing PRs from the ``auto-tick``
bot. This functionality is currently experimental. You can find more details
`here <https://regro.github.io/cf-scripts/github_actions_infrastructure.html#automerging-prs>`_.
Please open issue on ``regro/cf-scripts`` for any feedback, bugs, and/or questions!

@conda-forge-admin, please add python 2.7
-----------------------------------------

Entering this command in the title of an issue will instruct the admin bot to
add Python 2.7 back to a feedstock. Note that this command will remove any other
Python versions and any ``win``, ``aarch64`` or ``ppc64le`` builds. Thus you should
merge the PR into a separate branch on your feedstock if you want to keep these
other builds. **Python 2.7 support is deprecated and any feedstocks on Python 2.7 will 
not be properly handled by our bots.**


CI build services
=================

Here we describe common issues with the CI Services that conda-forge builds.

Azure Pipelines
---------------
Azure is used to build packages for OSX, Linux (x86_64, native), Linux (ARMv8, emulated) and Linux (IBM Power8+, emulated). 
The build queue on Azure is substantially larger than on all the other providers. 
Azure builds have a maximum duration of 6 hours.

To see all builds on Azure, visit `<https://dev.azure.com/conda-forge/feedstock-builds/_build>`_.

Restarting builds
.................

Presently Azure does not sync GitHub users. In order to restart a build you can restart it from the GitHub checks interface.
If that doesn't work, a close/open will kick off a new build. You can also use the web services command ``@conda-forge-admin, please restart ci``.

Using Azure for *everything*
............................

Azure is the default provider for Linux and OSX.  To use Azure for everything, add the following to ``conda-forge.yml`` in the root
of the feedstock.

.. code-block:: yaml

    provider:
      win: azure

.. note::

  Presently Azure has some issues building libraries using cmake on Windows. Azure does not have a VS2008 installation, so building
  certain very old packages that require VC9 will fail.


TravisCI (OSX, IBM Power 8+)
------------------------------

TravisCI is used to build packages for IBM Power 8+. After merging a staged-recipes pull request, it might be necessary to
force sync your repositories in TravisCI to see the reload and cancel buttons. To do this please visit `<https://travis-ci.com/profile>`_ 
and click "Sync accounts".

Enabling Travis
...............

TravisCI should only be needed to build recipes on OSX, if there is a strange failure on Azure.

Enable a build by adding the following to ``conda-forge.yml`` in the root of the feedstock.

.. code-block:: yaml

    provider:
      osx: travis
      
For IBM Power 8+ builds, add the name of your feedstock to the list `here
<https://github.com/conda-forge/conda-forge-pinning-feedstock/blob/master/recipe/migrations/arch_rebuild.txt>`_
via a pull request.


CircleCI (Linux, OSX)
----------------------
CircleCI is a container-based CI service that conda-forge uses to build
Linux packages. It can optionally build OSX packages.

Linux builds are identical to those on Azure as both are built inside Docker containers.


Using Circle for both Linux and OSX
....................................

To use CircleCI for OSX, add the following to ``conda-forge.yml`` in the root of the feedstock.

.. code-block:: yaml

    provider:
      osx: circle
      linux: circle

CircleCI for OSX should be used for OSX, only when TravisCI resources (50 minutes of build time per job) are not enough as CircleCI gives more resources (2 hours of build time per job).

Note that you need to rerender the feedstock, once this change has been made.


Enabling Circle on your Fork
............................

If for some reason CircleCI is not triggering build from forks,
Circle can be manually added for each fork. Circle calls this "Adding a Project" and
`the official CircleCI documentation is available here <https://circleci.com/docs/getting-started/#add-and-follow-more-projects>`_.
This effectively amounts to going to the `Add Projects <https://circleci.com/add-projects>`_
page, finding the fork that you wish to enable, and clicking the "Build Project" button.
This is not normally needed.

If CircleCI lacks permissions to checkout the source code, it will produce an error as follows::

    Cloning into '.'...
    Warning: Permanently added the RSA host key for IP address '192.30.253.113' to the list of known hosts.
    Permission denied (publickey).
    fatal: Could not read from remote repository.

When this happens for a feedstock, it can be fixed using the `webservice <https://conda-forge.org/docs/webservice.html#conda-forge-admin-please-update-circle>`_, by posting the following comment::

  @conda-forge-admin, please update circle

Otherwise (e.g. in a PR to staged-recipes), here are some things you can try:

* Log in and out of Circle CI.
* Revoke CircleCI's access and then enable it again.
* In the "Checkout SSH keys" section of your Circle CI project settings, press "add user key".


Drone.io
--------

We use `Drone.io <https://drone.io>`_ for Linux ARMv8 builds. To enable these builds on your feedstock, make a pull request to add your feedstock to the list 
here `<https://github.com/conda-forge/conda-forge-pinning-feedstock/blob/master/recipe/migrations/arch_rebuild.txt>`_.


GitHub Actions
--------------

We use GitHub actions to rerender feedstocks and also run our pull request automerge service. We do not currently support builds on 
GitHub Actions. 


Skipping CI builds
------------------

To skip a CI build for a given commit, put ``[ci skip] ***NO_CI***`` in the commit message.

.. admonition:: Related links

  - **Abort builds with [skip ci]/etc** `(conda-forge.github.io/#629) <https://github.com/conda-forge/conda-forge.github.io/issues/629>`__
  - **Skip CI requests** `(staged-recipes/#1148) <https://github.com/conda-forge/staged-recipes/issues/1148>`__


Third-party Use of Our CI Services
----------------------------------

Due to its stature in the open-source community, conda-forge has enhanced access to certain CI services. This access is a community 
resource entrusted to conda-forge for use in building packages. We thus cannot support third-party or "off-label" CI jobs in our 
feedstocks on any of our CI services. If we find such use, we will politely ask the maintainers to rectify the situation. We may 
take more serious actions, including archiving feedstocks or removing maintainers from the organization, if the situation cannot be rectified.


Compilers and Runtimes
======================

Conda-forge builds and maintains its own set of compilers for various languages
and/or systems (e.g., ``C``, ``FORTRAN``, ``C++``, ``CUDA``, etc.). These are used
in all of our CI builds to build both core dependencies (e.g., ``Python``) and maintainer-contributed
packages. While we do not have any formal policies or promises of support for these
compilers, we have historically maintained them according to the following (non-binding)
principles.

* The authoritative source of the current compilers and versions for various languages
  and platforms is the `conda_build_config.yaml <https://github.com/conda-forge/conda-forge-pinning-feedstock/blob/master/recipe/conda_build_config.yaml>`_
  in the `conda-forge/conda-forge-pinning-feedstock <https://github.com/conda-forge/conda-forge-pinning-feedstock>`_
  as described in :ref:`globally_pinned_packages`.
* We provide no support of any kind in terms of the long-term stability of these pinnings.
* We upgrade them in an ad-hoc manner on a periodic basis as we have the time and energy to do so.
  Note that because of the way we enforce runtime constraints, these compiler upgrades will not break
  existing packages. However, if you are using the compilers outside of ``conda``, then you may find issues.
* We generally provide notice in the form of an announcement when a compiler is going to be upgraded.
  Note that these changes take a bit of time to complete, so you will generally have time
  to prepare should you need to.
* Some of the criteria we think about when considering a compiler migration include
  1) the degree of disruption to the ecosystem, 2) the amount of work for the ``core`` team,
  and 3) the amount of time it will cost our (volunteer) feedstock maintainers.

We do use some unofficial names for our compiler stack internally. Note however that
the existence of these names does not imply any level of support or stability for the compilers
that form the given stack.

* Our current compiler stack is referred to internally as ``comp7``.
* The previous compiler stack based in part on the various ``toolchain_*`` packages
  was sometimes referred to as ``comp4``. On linux the ``toolchain_*`` compilers were
  GCC 4.8.2 as packaged in the devtoolset-2 software collection. On osx, we use clang from
  Apple's Xcode in the ``toolchain_*`` packages.

CentOS ``sysroot`` for ``linux-*`` Platforms
---------------------------------------------

We currently repackage the ``sysroot`` from the appropriate version of CentOS for use
with our compilers. These ``sysroot`` files are available in the ``sysroot_linux-*`` packages.
These packages have version numbers that match the version of ``glibc`` they package. These
versions are ``2.12`` for CentOS 6 and ``2.17`` for CentOS 7.

For ``gcc``/``gxx``/``gfortran`` versions prior to ``8.4.0`` on ``ppc64le and ``7.5.0``
on ``aarch64``/``x86_64``, we had been building our own versions of ``glibc``. This practice
is now deprecated in favor of the CentOS-based ``sysroots``. Additionally, as of the same
compiler versions above, we have removed the ``cos*`` part of the ``sysroot`` path. The new
``sysroot`` path has in it simply ``conda`` as opposed to ``conda_cos6`` or ``conda_cos7``.


.. _output_validation:

Output Validation and Feedstock Tokens
======================================

As of writing, ``anaconda.org`` does not support generating API tokens that are scoped
to allow uploads for some packages but not others. In order to secure feedstock uploads,
so that, e.g., the maintainers of the ``numpy`` feedstock cannot push a ``python`` version,
we use a package staging process and issue secret tokens, unique to each feedback. This process
works as follows.

1. When a CI job on a feedstock is building packages to be uploaded to ``anaconda.org``, it
   first uploads them to a staging channel, ``cf-staging``.
2. Then the feedback CI job makes an API call to our admin webservices server with its secret token
   and some information about the package it is trying to upload.
3. The webservices server validates the secret token, the integrity of the package, and
   that the package is allowed for the given feedstock.
4. If all of the validation passes, the package is then copied to the ``conda-forge``
   channel.

We attempt to report errors in this process to users via comments on commits/issues in the feedstocks.
Note however that sometimes these fail. If you think you are having trouble with uploads, make
sure ``conda_forge_output_validation: true`` is set in your ``conda-forge.yml`` and rerender
your feedstock with the latest version of ``conda-smithy``. Finally, new packages that are added to
feedstocks are registered automatically and once uploaded successfully, no other feedstock
will be able to upload packages with the same name.

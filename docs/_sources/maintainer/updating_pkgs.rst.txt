.. _maintaining_pkgs:

Maintaining packages
********************

Important notes
===============

Forking and pull requests
-------------------------

All maintainers are given push access to the feedstocks that they maintain.
This means that a maintainer can create branches in the main repo.
For updates, using a branch in the main repo is discouraged because,

1. :term:`CI` is run on both the branch and the PR.

   This wastes :term:`CI` resources

2. Branches are automatically published.

   This means if you push a version update to a branch and then create a :term:`PR`, conda packages will be published to anaconda.org before the PR is merged.

.. important::
  For these reasons, maintainers are asked to fork the feedstock to their personal account, push to a branch in the fork and then open a PR to the ``conda-forge`` repo.

Pushing to regro-cf-autotick-bot branch
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

When a new version of a package is released on PyPI/CRAN/.., we have a bot that automatically creates version updates for the feedstock. In most cases you can simply merge this PR and it should include all changes. When certain things have changed upstream, e.g. the dependencies, you will still have to do changes to the created PR. As feedstock maintainer, you don't have to create a new PR for that but can simply push to the branch the bot created. There are two alternatives to push to the branch of the bot:

#. Manually setting up git remotes:

   - Clone the conda-forge feedstock repository
   - Add the remote of the bot: ``git remote add regro-cf-autotick-bot git@github.com:regro-cf-autotick-bot/<package>-feedstock.git``

     .. important::
        It is not possible to push to a GitHub repository using the
        ``git://`` protocol.  See `Which remote URL should I use?
        <https://help.github.com/en/github/using-git/which-remote-url-should-i-use>`_
        for instructions on using the ``https://`` protocol if you have
        enabled `two-factor authentication
        <https://help.github.com/en/articles/securing-your-account-with-two-factor-authentication-2fa>`_.
   - Fetch the remote: ``git fetch regro-cf-autotick-bot``
   - Checkout the branch of the PR, git should automatically link it to the `regro-cf-autotick-bot` remote if this is the only remote with a branch of that name.
   - If there are multiple remotes with this branch name, you need to first checkout the remote branch and then turn it into a local branch: ``git checkout regro-cf-autotick-bot/<branch> && git checkout -b <branch>``
   - Commit and push on that branch, if the remote was not correctly setup, use ``git push -u regro-cf-autotick-bot <branch>``.

#. Using Github's `hub <https://github.com/github/hub>`_ tool (which conda-forge ships! ``conda install hub -c conda-forge``):

   - Clone the conda-forge feedstock repository
   - Checkout the correct branch with remote: ``hub pr checkout 12`` where ``12`` is the ID of the PR.
   - Commit and push on this branch, the remote is automatically set up to push to regro-cf-autotick-bot's fork.

Example workflow for updating a package
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Here we assume that you would like to update the feedstock ``<feedstock>``. Feedstock is a placeholder and can e.g. be replaced by ``numpy-feedstock``.

#. Forking the feedstock

   Before you can submit your first PR, you have to fork conda-forge's feedstock.

   - Navigate to https://github.com/conda-forge/<feedstock> in your favorite web browser and click the ``fork`` button.
   - You now have a clone of the feedstock in ``https://github.com/<your-github-id>/<feedstock>`` under your control.
   - Connect to the feedstock from your computer by using ``git clone https://github.com/<your-github-id>/<feedstock>``.

#. Syncing your fork with conda-forges feedstock

   This step is only required if you have forked some time ago and your fork is missing commits from the feedstock at conda-forge.

   - Make sure you are on the master branch: ``git checkout master``
   - Register conda-forge's feedstock with ``git remote add upstream https://github.com/conda-forge/<feedstock>``
   - Fetch the latest updates with ``git fetch upstream``
   - Pull in the latest changes into your master branch: ``git rebase upstream/master``

#. Creating your changes in a new branch

   Now you are ready to update the recipe

   - Create and switch to a new branch: ``git checkout -b <branch-name>``. ``<branch-name>`` can be e.g. ``update_1_0_1``.
   - Make your changes locally
   - Review your changes then use ``git add <changed-files>``. Where ``<changed-files>`` are a whitespace separated list of filenames you changed.
   - Create a commit by ``git commit -m <commit-msg>``, where ``<commit-msg>`` can be ``updated feedstock to version 1.0.1``

#. Pushing your changes to GitHub and propose a PR

   - Push the branch with changes to your fork on GitHub:  ``git push origin <branch-name>``
   - Create a pull request via the web interface by navigating to ``https://github.com/<your-github-id>/<feedstock>`` with your web browser and clicking the button ``create pull request``.


Updating recipes
================

Updating version and hash
-------------------------

Checking the dependencies
-------------------------

Bumping the build number
------------------------

The build number is increased when the source code for the package has not changed but you
need to make a new build.
As a rule of thumb, the build number is increased whenever a new package with the same version needs to be uploaded to the conda-forge channel.

Examples for needing to increase the build number are

 - updating the pinned dependencies after a rerendering
 - Fixing wrong dependencies

When the package version changes you should reset the build number back to ``0``.

.. _dev_update_rerender:

Rerendering feedstocks
======================

Rerendering is conda-forge's way to update the files common to all feedstocks (e.g. README, :term:`CI` configuration, pinned dependencies)

Rerendering can be done in two ways:

 #. Using the webservice to run conda-smithy on the cloud by adding the comment ``@conda-forge-admin please rerender`` (see :ref:`dev_admservice`).

 #. Run conda-smithy locally on your machine (see :ref:`dev_rerender_local`).

.. _dev_rerender_local:

Rerendering with conda-smithy locally
-------------------------------------

The first step is to install ``conda-smithy`` in your root environment

.. code-block:: shell

    conda install -c conda-forge conda-smithy


Commit all changes and from the root directory of the feedstock, type:

.. code-block:: shell

    conda smithy rerender -c auto


Optionally one can commit the changes manually.
To do this drop ``-c auto`` from the command.

When to rerender
----------------

We need to re-render when there are changes to the following parts of the feedstock:

- the platform configuration (``skip`` sections);
- the ``yum_requirements.txt``;
- updates in the build matrix due to new versions of Python, NumPy, PERL, R, etc.
- updates in conda-forge pinning that affect the feedstock
- build issues that a feedstock configuration update will fix (follow us on `gitter <https://gitter.im/conda-forge/conda-forge.github.io>`_ to know about those);






Testing changes locally
=======================

If you have docker installed on your system, you can test builds locally on your machine under the same settings as it is built by our :term:`CI`.

If you want to build and test updates to a feedstock locally, go to the root
feedstock directory and run:

.. code-block:: shell

    python build-locally.py


This will prompt you to choose one of the ``*.yaml`` config files in ``.ci_support/``.

Alternatively, you can specify ahead which config to use with e.g. (assuming you wish to build and test python 3.6 on Linux, and such a config file exists at ``.ci_support/linux_python3.6.yaml``):

.. code-block:: shell

    python build-locally.py linux_python3.6


Note that for long build logs one can do

.. code-block:: shell

    python build-locally.py 2>&1 | tee log.txt

to save it in a text file for future inspection.


Removing broken packages
========================

Sometimes mistakes happen and a broken package ends up being uploaded to the conda-forge channel. In this case, core can help you (see :ref:`fix_broken_packages`)


Archiving feedstocks
====================

If a package is no longer maintained ``conda-forge`` will *archive*
the repository. An archived repository can no longer accept PRs and issues, which prevents people and ``regro-cf-autotick-bot`` from updating the
package (an example would be to re-render the feedstock to support new Python versions). Note that this **does not** remove the existing packages, those will still be available.

If you believe a feedstock should be archived, please contact `@conda-forge/core <https://github.com/orgs/conda-forge/teams/core>`__.


Maintaining several versions
============================

TODO: LTS branch

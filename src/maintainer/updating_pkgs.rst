.. _maintaining_pkgs:

Maintaining packages
********************

Important notes
===============

Packages on ``conda-forge`` are immutable
-----------------------------------------

As a matter of policy, we do not allow edits or the deletion of packages on ``conda-forge``. This
policy is very important as it increases the reliability and reproducibility of ``conda`` environments
made with the ``conda-forge`` channel. Note that because of this policy, our upload scripts will refuse to
upload packages which already exist on the ``conda-forge`` channel.

If you need to remove a package, please see the :ref:`section <maint_fix_broken_packages>` on marking packages broken.


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

Please follow the following guidelines while updating recipes:

1. Always use a fork of the feedstock while updating the recipe.
2. When a package's version is not changed, but other metadata or parts of the recipe are changed, increase the build number by ``1``.
3. While shipping a new version of your package, reset the build number to ``0``.


.. _dev_update_rerender:

Rerendering feedstocks
======================

Rerendering is conda-forge's way to update the files common to all feedstocks (e.g. README, :term:`CI` configuration, pinned dependencies).

Rerendering can be done in two ways:

 #. Using the webservice to run conda-smithy on the cloud by adding the comment ``@conda-forge-admin please rerender`` (See :ref:`dev_admservice`).

 #. Run conda-smithy locally on your machine (See :ref:`dev_rerender_local`).

.. _dev_rerender_local:

Rerendering with conda-smithy locally
-------------------------------------

The first step is to install ``conda-smithy`` in your root environment.

.. code-block:: shell

    conda install -c conda-forge conda-smithy


Commit all changes and from the root directory of the feedstock, type:

.. code-block:: shell

    conda smithy rerender -c auto


Optionally one can commit the changes manually.
To do this drop ``-c auto`` from the command.

When to rerender
----------------

We need to re-render when there are changes in the following parts of the feedstock:

- Platform configuration (``skip`` sections).
- ``yum_requirements.txt`` or ``conda-forge.yml``.
- Updates in the build matrix due to new versions of Python, NumPy, PERL, R, etc.
- Updates in conda-forge pinning that affect the feedstock.
- Build issues that a feedstock configuration update will fix (follow us on `gitter <https://gitter.im/conda-forge/conda-forge.github.io>`_ to know about those).


Testing changes locally
=======================

If you have docker installed on your system, you can test builds locally on your machine under the same settings as it is built by our :term:`CI`.

If you want to build and test updates to a feedstock locally, go to the root
feedstock directory and run:

.. code-block:: shell

    python build-locally.py


This will prompt you to choose one of the ``*.yaml`` config files in ``.ci_support/``. Note that ``shyaml`` is needed to parse the ``docker_image`` from these files. Otherwise the build will use the default ``docker_image``.

Alternatively, you can specify ahead which config to use with e.g. (assuming you wish to build and test python 3.6 on Linux, and such a config file exists at ``.ci_support/linux_python3.6.yaml``):

.. code-block:: shell

    python build-locally.py linux_python3.6


Note that for long build logs one can do

.. code-block:: shell

    python build-locally.py 2>&1 | tee log.txt

to save it in a text file for future inspection.


.. _maint_fix_broken_packages:

Removing broken packages
========================

Sometimes mistakes happen and a broken package ends up being uploaded to the conda-forge channel.

If the only issue is in the package metadata, we can directly patch it using
the `repo data patches feedstock <https://github.com/conda-forge/conda-forge-repodata-patches-feedstock>`__.
Please make a PR there to add a patch. In order to ensure future versions have the required changes, you also
need to change the recipe to reflect the metadata changes.

If instead the actual contents of the package are broken, the following steps will
remove broken packages from the ``main`` channel:

1. Locate the paths to broken files on `anaconda.org <https://anaconda.org>`__, by searching for the conda-forge package and switching to the files tab.
2. Fork `conda-forge/admin-requests <https://github.com/conda-forge/admin-requests>`__ and add a new text file in the ``broken`` directory.
3. Add the broken files to the new text file, one path per line. See `broken/example.txt <https://github.com/conda-forge/admin-requests/blob/master/broken/example.txt>`__ for an example file.
4. Open a new PR. Once merged, a bot will label all listed files as broken, thus effectively removing them from the channel.


Archiving feedstocks
====================

If a package is no longer maintained ``conda-forge`` will *archive*
the repository. An archived repository can no longer accept PRs and issues, which prevents people and ``regro-cf-autotick-bot`` from updating the
package (an example would be to re-render the feedstock to support new Python versions). Note that this **does not** remove the existing packages, those will still be available.

If you believe a feedstock should be archived, please contact `@conda-forge/core <https://github.com/orgs/conda-forge/teams/core>`__.

.. _maint_updating_maintainers:

Updating the maintainer list
============================

The list of maintainers of a feedstock is recorded in the recipe itself. The list of maintainers can be updated with following steps:

1. Add your github-id to the ``recipe-maintainers`` section at the bottom of the ``recipe/meta.yaml`` file in the feedstock:

  .. code-block:: yaml

    extra:
      recipe-maintainers:
        - current-maintainer
        - your-github-id

2. Commit and push the change to your fork and open a :term:`PR` against the feedstock you want to become a maintainer of.

3. :ref:`Rerender<dev_update_rerender>` the feedstock by posting ``@conda-forge-admin, please rerender`` as a new comment in the :term:`PR`.

4. Wait until the :term:`PR` is merged. If the current maintainer is no longer active, you can ping ``@conda-forge/core`` and ask for a merge.

Once the PR is merged, our infrastructure will grant and revoke maintainer permissions.


Maintaining several versions
============================

If you'd like to maintain more than one version of your package, you can use branches on the feedstock. To do this,
fork your feedstock and make a meaningful branch name (e.g., `v1.X` or `v1.0`).
Make the required changes to the recipe and rerender the feedstock. Then push this branch
from your fork to the upstream feedstock. Our CI services will automatically build any
branches in addition to the default branch.

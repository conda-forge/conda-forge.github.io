Automatic services
==================

conda-forge is running a webservice on heroku called `conda-forge-webservices <https://github.com/conda-forge/conda-forge-webservices>`_

Following services are run by default on a feedstock

- It will lint the recipes in the PRs and report back whether recipe is in excellent condition or not.
- When maintainers are added to a recipe, the maintainer will be added to the team and given push access

The webservice also listens to issue and PR comments so that you can ask for the following services to be done.

@conda-forge-admin, please rerender
-----------------------------------

Entering the above phrase in a PR of a feedstock will rerender the feedstock and push the changes to your PR.
Make sure to tick the ``Allow edits from maintainers.`` button locate at the bottom of the right side bar of the PR.


@conda-forge-admin, please add noarch: python
---------------------------------------------

Entering the above phrase in a PR of a feedstock will add ``noarch: python`` to the build and rerender the feedstock
for you.


@conda-forge-admin, please lint
-------------------------------

Entering the above phrase in a PR of a feedstock will lint the PR (if it hasn't
already).


@conda-forge-admin, please relint
---------------------------------

Entering the above phrase in a PR of a feedstock will lint the PR again.


@conda-forge-admin, please update circle
----------------------------------------

Entering the above phrase in an issue of a feedstock will update the Circle-CI SSH deploy key. This will fix the
``permission denied (public key)`` issue in Circle-CI checkout phase


@conda-forge-admin, please update team
--------------------------------------

Entering the above phrase in an issue will update the team for the feedstock.

Guidelines
**********

Transferring to conda-forge
===========================

This document intends to layout some guidelines on the transfer of
`conda-recipes <https://github.com/conda/conda-recipes>`__ and
`anaconda-recipes <https://github.com/ContinuumIO/anaconda-recipes>`__
to conda-forge. These aren't hard and fast rules and are open reasonable
interpretation and reviewer judgement.

It is the aspiration that almost all recipes from those repos shall be
proposed for addition here, though it may be decided that a few don't
actually belong or should not be supported anymore.

When adding a package from either location, inspect the commit history
to see who has made changes to the recipe in the past. Anyone who has
touched the recipe should be pinged about it getting added here. They
should also be consulted with regards to whether the recipe needs any
tweaks before being added. Also, they should be asked if they would
like to be added as maintainers. Only if they give express permission
to be adding as a maintainer should they be added to the maintainer list.
In all cases when porting a recipe, you should add yourself as a
maintainer. Some contributors to these repos were quite prolific, but may
not be as actively engaged. If they specify they only want to be contacted
for certain recipes or none at all, please respect their wishes also add
make note of what recipes (if any) they would like to be notified for. If
they are no longer interested in any conda recipes, make that note here
as well. Before contacting anyone please consult the list in this
`issue <https://github.com/conda-forge/staged-recipes/issues/139>`__
to see if that contributor has restrictions.

When porting make sure the recipe follows the linting specifications.
The section order should go ``package``, ``source``, ``build``,
``requirements``, ``test``, ``about``, ``extra/recipe-maintainers``. It
is recommended to add a ``build`` section with the ``number`` set to
``0`` explicitly even if the rest is unneeded. If there is no build for
Windows, make sure to add ``skip: True  # [win]`` to the ``build``
section. The ``about`` section must have the ``home`` URL (verify the
URL is still correct), ``license`` (verify the correct license is present),
and a one sentence (or few word) ``summary``. When specifying the version it
is strongly recommended that jinja templating be used to set the version
at the top (e.g. ``{% set version = "0.10.1" %}``) and then replace all
uses of the version with ``{{ version }}``. Preference should be given to
compressed source balls as opposed to version control checkouts. Make sure
all links to compressed source balls allow for easy changing of the version
(using latest is not acceptable). Also, a checksum should be included with
all compressed source balls to allow for verification of downloads.

It is required to add tests with all packages. These can include but are
not limited to checking libraries are installed, python imports, simple
code snippet to compile or run a basic test, command line usage (checking
help or version). It is suggested that compiled code run all tests (e.g.
``make check``) to ensure it was built properly. This normally should
happen in the build.

It is possible, though not recommended, to include multiple recipes into a
single pull request on staged-recipes. conda-build-all is used to determine
the build order and the necessary build matrix (e.g. which python versions to
build against). From a practical perspective, there are limitations on the
continuous integration resources and also on what reviewers are able/willing
to review in a single pull request.
A large pull request with many recipes makes it more difficult to review.
If the recipes make it through these two constraints and are merged, race
conditions amongst the different feedstocks may require work by you and/or
core maintainers to restart them in such a way to build everything in a
suitable order.
None of this is to say that one can't add multiple recipes in a single
pull request. One certainly can do this and it can work, but the
recommendation is to open a PR with one recipe first, and to ping
@conda-forge/core to ask for agreement about adding one or two additional
recipes.


Intended Usage
==============

Maintainers' time and CI resources are what enable conda-forge. They are as scarce as they are valuable. conda-forge has enough capacity to support releasing packages, but not developing them.

Publishing a package to conda-forge signals it is suitable for users not involved with development. However, publishing does not always happen error-free. Multiple commits are acceptable when debugging issues with the release process itself.

Fortunately, there are options for optimizing the development of a package.
  - `conda-smithy <https://github.com/conda-forge/conda-smithy>`__ is a tool used by conda-forge itself to manage feedstocks. conda-smithy can be used to create an internal development feedstock that is separate from conda-forge.
  - `ci-helpers <https://github.com/astropy/ci-helpers>`__ is a set of scripts that drive various CI services using environment variables.

Renaming Packages
=================

Sometimes packages are misnamed.
To correct the name of the package, please submit a PR into staged-recipes with the correct name.
During the review process please make certain to note that the package is a rename and contact a member of conda-forge/core to remove the old feedstock (and potentially package if needed).
Occasionally the .gitmodules file in the `feedstocks <https://github.com/conda-forge/feedstocks/blob/master/.gitmodules>`__ needs to be updated to remove the old feedstock.
It's not entirely clear what those circumstances are.
See `conda-forge.github.io#1070 <https://github.com/conda-forge/conda-forge.github.io/issues/1070>`__.

.. _fix_broken_packages:

Fixing Broken Packages
======================

Sometimes you need to remove a package from the conda-forge channel on Anaconda.org. The reasons
for this are many, but the ones that immediately come to mind are:

* incorrect pinnings or metadata
* packages being renamed
* broken package contents

We prefer to not remove packages for the following reasons:

1. Unaffected users are unable to get the broken package.
2. Unable to reverse (what if we were incorrect to remove it).
3. Loss of reproducibility (unable to create an old environment).
4. Not as community friendly (leaves no opportunity to review decision).
5. Blocks anyone from inspecting the broken packages.

Instead, if possible, we prefer to take one of the following actions.

1. If the only issue is in the package metadata, we can directly patch it using
   the `repo data patches feedstock <https://github.com/conda-forge/conda-forge-repodata-patches-feedstock>`__.
   To change the repo data for your package, make a PR on the feedstock.

2. If the the package contents themselves are broken, we add an extra label ``broken``
   to the package. Packages with this extra label are removed from the repo data on the
   ``main`` label. Thus they are not considered by the solver
   but their binaries are still available on Anaconda.org. To get the ``broken`` label
   added to your package, please refer to :ref:`maint_fix_broken_packages`.

Adding the ``broken`` label to a package is more destructive than patching the repo data
and thus we prefer repo data patches over labeling things as ``broken``.


Becoming a maintainer
=====================

Conda-forge is a community project and it can therefore happen that feedstocks become temporarily abandoned.
You can join the maintainer team of a feedstock by adding your github-id to the ``recipe-maintainers`` section in the recipe's ``meta.yaml``.
Please refer to :ref:`maint_updating_maintainers` for detailed instructions.


Language versions
=================

Conda-forge contains packages from a number of languages including Python and R, among many others.
Each of these language-specific packaging sub-ecosystems needs to keep cadence with the language itself, making it challenging to have a blanket policy for how long to keep older versions of the language around.
As it comes up, each group should be able to define their own policy on how long to keep older versions of their language around.

Python
------
For the Python language, conda-forge aims to keep package builds active and available for the current version and at least two preceding minor versions.
Whenever Python 4.0 comes out we'll need to figure out if this policy should change to support multiple versions of 3.x and 4.x simultaneously. 
Fortunately, we can punt on that for now.
The question of when to decide to drop an older language version remains.
The guidance that we can provide here is two fold:

1. We will move with the community. 
   When our core libraries stop supporting an old version, so too will conda forge.
   The (nonexhaustive) list of core libraries that we consider when making the decision to drop an older version are:
   * matplotlib
   * numpy
   * scipy
   * pypy
2. The core team can decide to keep an old version around temporarily until some specific criteria is met.
   For example, we're holding off on turning off py36 until pypy comes out with pypy3.7.
3. If there are lots of people in the community relying on older versions, core team can decide to keep an old version around
   For example, we held off turning off py27 even after numpy, scipy dropped support as there were many in the community interested in keeping support until the end of life of that version.

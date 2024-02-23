---
title: 'Guidelines'
sidebar_position: 18
---

<a id="guidelines"></a>

# Guidelines

<a id="transferring-to-conda-forge"></a>

## Transferring to conda-forge

This document intends to layout some guidelines on the transfer of
[conda-recipes](https://github.com/conda/conda-recipes) and
[anaconda-recipes](https://github.com/ContinuumIO/anaconda-recipes)
to conda-forge. These aren't hard and fast rules, instead are open to reasonable
interpretation and reviewer's judgement.

It is anticipated that almost all recipes from those repos shall be
proposed for addition here, though it may be decided that a few don't
actually belong or should not be supported anymore.

While adding a package from either location, inspect the commit history
to see who had made changes to the recipe in the past. Anyone who has
touched the recipe should be pinged about it, so that they can be added here. They
should also be consulted with regards, if the recipe needs any
tweaks before being added. Also, they should be asked if they would
like to be added as maintainers. If they give their consent
to take up the role as a maintainer, only then they should be added in the maintainer list.

In all cases while porting a recipe, you should add yourself as a
maintainer. Some contributors to these repos might be quite prolific, but may
not be as actively engaged. If they specify they only want to be contacted
for certain recipes or none at all, please respect their wishes and add them too.
Make note of what recipes (if any) they would like to be notified for. If
they are no longer interested in any conda recipes, make that note here
as well. Before contacting anyone, please consult the list in this
[issue](https://github.com/conda-forge/staged-recipes/issues/139)
to see if that contributor has restrictions.

While porting make sure the recipe follows the linting specifications.
The section order should go `package`, `source`, `build`,
`requirements`, `test`, `about`, `extra/recipe-maintainers`. It
is recommended to add a `build` section with the `number` set to
`0` explicitly even if the rest is unneeded. If there is no build for
Windows, make sure to add `skip: True  # [win]` to the `build`
section. The `about` section must have the `home` URL (verify if the
URL is still correct), `license` (verify if the correct license is present),
and a one sentence (or few words) `summary`. When specifying the version, it
is strongly recommended that jinja templating be used to set the version
at the top (e.g. `{% set version = "0.10.1" %}`) and then replace all
uses of the version with `{{ version }}`. Preference should be given to
compressed source balls as opposed to version control checkouts. Make sure
all links to compressed source balls allow for easy changing of the version
(using latest is not acceptable). Also, a checksum should be included with
all compressed source balls to allow for verification of downloads.

It is required to add tests with all packages. These can include, but are
not limited to, checking if libraries are installed, python imports, simple
code snippet to compile or run a basic test, command line usage (checking
help or version). It is suggested to get the compiled code to run all tests (e.g.
`make check`) to ensure it was built properly. This normally should
happen in the build.

It is possible, though not recommended, to include multiple recipes into a
single pull request on [staged-recipes](https://github.com/conda-forge/staged-recipes). `conda-build-all` is used to determine
the build order and the necessary build matrix (e.g. which python versions to
build against). From a practical perspective, there are limitations on the
continuous integration resources and also on what reviewers are able/willing
to review in a single pull request.
A large pull request with numerous recipes makes it more difficult to review.
If the recipes make it through these two constraints and are merged, race
conditions amongst the different feedstocks may require work by you and/or
core maintainers to restart them in such a way to build everything in a
suitable order.
None of this is to say that one can't add multiple recipes in a single
pull request. One certainly can do this and it can work, but the
recommendation is to open a PR with one recipe first, and to ping
**@conda-forge/core** to ask for agreement about adding one or two additional
recipes.

<a id="intended-usage"></a>

## Intended Usage

Maintainers' time and CI resources are what enable conda-forge. They are just as scarce as valuable. conda-forge has enough capacity to support releasing packages, but not developing them.

Publishing a package to conda-forge signals it is suitable for users not involved with development. However, publishing does not always happen error-free. Multiple commits are acceptable when debugging issues with the release process itself.

Fortunately, there are options for optimizing the development of a package.

- [conda-smithy](https://github.com/conda-forge/conda-smithy) is a tool used by conda-forge itself to manage feedstocks. conda-smithy can be used to create an internal development feedstock that is separate from conda-forge.
- [ci-helpers](https://github.com/astropy/ci-helpers) is a set of scripts that drive various CI services using environment variables.

<a id="renaming-packages"></a>

## Renaming Packages

Sometimes, packages are misnamed.
To correct the name of the package, please submit a PR into [staged-recipes](https://github.com/conda-forge/staged-recipes) with the correct name.
During the review process, please make certain to note that the package is renamed and contact a member of conda-forge/core to remove the old feedstock (and potentially package, if needed).

Occasionally, the .gitmodules file in the [feedstocks](https://github.com/conda-forge/feedstocks/blob/master/.gitmodules) needs to be updated to remove the old feedstock.
It's not entirely clear what those circumstances are.
See [conda-forge.github.io#1070](https://github.com/conda-forge/conda-forge.github.io/issues/1070).

If an existing feedstock has already created a package of the same name,
then you may need to add the new feedstock to the [feedstock-outputs](https://github.com/conda-forge/feedstock-outputs) map.

<a id="fix-broken-packages"></a>

<a id="fixing-broken-packages"></a>

## Fixing Broken Packages

Sometimes, you need to remove a package from the `conda-forge` channel on Anaconda.org.
There can be many reasons for this, but the ones that immediately come to mind are:

* Incorrect pinnings or metadata
* Packages being renamed
* Broken package contents

We prefer to not remove packages for the following reasons:

1. Unaffected users are unable to get the broken package.
2. Unable to reverse (what if we were incorrect to remove it).
3. Loss of reproducibility (unable to create an old environment).
4. Not as community friendly (leaves no opportunity to review decision).
5. Blocks anyone from inspecting the broken packages.

Instead, if possible, we prefer to take one of the following actions:

1. If the only issue is in the package metadata, we can directly patch it using
   the [repo data patches feedstock](https://github.com/conda-forge/conda-forge-repodata-patches-feedstock).
   To change the repo data for your package, make a PR on the feedstock.
2. If the the package contents themselves are broken, we add an extra label `broken`
   to the package. Packages with this extra label are removed from the repo data on the
   `main` label. Thus they are not considered by the solver
   but their binaries are still available on Anaconda.org. To get the `broken` label
   added to your package, please refer to [Removing broken packages](../maintainer/updating_pkgs.md#maint-fix-broken-packages).

Adding the `broken` label to a package is more destructive than patching the repo data
and thus we prefer repo data patches over labeling things as `broken`.

<a id="becoming-a-maintainer"></a>

<a id="id1"></a>

## Becoming a maintainer

conda-forge is a community project and it can therefore happen that feedstocks become temporarily abandoned.
You can join the maintainer team of a feedstock by adding your github-id to the `recipe-maintainers` section in the recipe's `meta.yaml`.
Please refer to [Updating the maintainer list](../maintainer/updating_pkgs.md#maint-updating-maintainers) for detailed instructions.

<a id="language-versions"></a>

## Language versions

conda-forge contains packages from a number of languages including Python and R, among many others.
Each of these language-specific packaging sub-ecosystems needs to keep cadence with the language itself, making it challenging to have a blanket policy for how long to keep older versions of the language around.
As it comes up, each group should be able to define their own policy on how long to keep older versions of their language around.

<a id="python"></a>

### Python

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
3. If there are lots of people in the community relying on older versions, core team can decide to keep an old version around.
   For example, we held off turning off py27 even after numpy, scipy dropped support as there were many in the community interested in keeping support until the end of life of that version.

<a id="reviewer-guidelines"></a>

<a id="reviewing-recipes"></a>

## Reviewing recipes

To add new packages to conda-forge, users can submit a PR to `staged-recipes` (see [Contributing packages](../maintainer/adding_pkgs.md#dev-contribute-pkgs) for more details),
where it will undergo a series of automated checks and a code review.
Any conda-forge member can perform a code review, but the final merge can only be done by the `staged-recipes` or `core` teams.
The following sections suggest guidelines on how to perform a successful code review.
We distinguish between “Required” and “Recommended” as follows:

- Required: These guidelines are very important and a requisite for PR acceptance. Exceptions are rare and usually require  `core` approval.
- Recommended: These are considered “nice to have” features. Ideally, all recipes should abide by them, but exceptions are tolerated as long as justifiable reasons are provided.

<a id="generalities"></a>

### Generalities

Required:

1. All interactions in the review adhere to our [Code of Conduct](governance.md#code-of-conduct).
2. `conda-forge-linter` [checks](https://github.com/conda-forge/conda-smithy/blob/main/conda_smithy/lint_recipe.py) pass successfully.
   Sometimes the linter will also suggest modifications considered optional (hints); even if recommended, these are not required to accept the submission.
3. The CI checks pass successfully in the required platforms. Exceptions:
   - `noarch: python` can fail in platforms other than Linux (e.g. missing dependency). For non-noarch packages, the failing platform should be skipped via `skip: true  # [<platform selector>]`
   - CI times out or runs out of storage because it tries to build all Python versions in the same job. As long as one version passes, that's ok, since they will run individually in the resulting feedstock.
4. The submission fulfills the [pull request template checklist](https://github.com/conda-forge/staged-recipes/blob/main/.github/pull_request_template.md).
5. The license has been correctly identified and allows redistribution.
6. The source should not contain vendored code. If it does:
   - Package the vendored project separately and specify the needed dependency in the `requirements` section. Preferred if the vendored code is needed at runtime.
   - Allow the vendored code, but make sure the license files are included in the `about.license` field. Usually ok if it's only a build-time dependency (e.g. headers-only library)

Recommended:

1. Source should be obtained from a URL that provides a stable tarball (same SHA over time).
   Git or other SVC repositories should only be used as a last resort.
2. Host requirements contained in the [conda-forge pinnings](../maintainer/pinning_deps.md#pinned-deps) should be *name-only*; i.e. they do not specify a separate version.
3. Runtime requirements are not pinned too strictly without justification.
   Thanks to repodata patches, we can afford to be optimistic about lower or upper bounds instead of single-version pins: `>=1.4.2,<1.5` is better than `==1.4.2`.
4. The package should place its files under standard locations (e.g. executables under `$PREFIX/bin`), unless justification is provided.

<a id="python-specific-details"></a>

### Python-specific details

Required:

1. `noarch: python` packages fulfill the [required criteria](../maintainer/knowledge_base.md#noarch) to be considered as such.

Recommended:

1. The package does not accidentally include a `tests` (also `test`, `_tests`, or similar) top-level package.
   The list of files is usually printed by `pip install` after the `adding license file` message.
   If this happens, upstream should modify their `setuptools.find_packages()` usage accordingly.
   Alternatively, a patch can be applied. See [example](https://github.com/conda-forge/staged-recipes/pull/19166/commits/0284fc6da273031a4f93a1fea4533822cd4b385d).
2. The modules checked by `test.imports` are not empty (this can happen with placeholder `__init__.py` files in top-level packages).
3. The versions reported by `pip list` and `conda build` logs match.
4. `pip check` passes. See [pip check](../maintainer/adding_pkgs.md#pip-check) for more details.
5. If a project can be considered `noarch` (see [criteria](../maintainer/knowledge_base.md#noarch)), it should be packaged as such.

<a id="compiled-objects"></a>

### Compiled objects

Required:

1. The source does not include compiled files.
   In principle, all compiled objects need to be generated in the CI, from source.
   Exceptions to this rule (e.g. binary repackaging) need to be approved explicitly.

Recommended:

1. SONAMEs follow naming recommendations given by upstream.
2. If ABI compatibility is important for the package, `run_exports` are set accordingly.
   See [Pinned dependencies](../maintainer/pinning_deps.md#pinned-deps) and the [conda-build docs](https://docs.conda.io/projects/conda-build/en/stable/resources/define-metadata.html#export-runtime-requirements) for more information.

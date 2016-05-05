This document intends to layout some guidelines on the transfer of
[conda-recipes]( https://github.com/conda/conda-recipes ) and
[anaconda-recipes]( https://github.com/ContinuumIO/anaconda-recipes ) to
conda-forge. These aren't hard and fast rules. They are certainly up for
discussion. However, it would be good to come up with a consensus going forward.

Eventually all recipes from those repos should be proposed for addition here.
It may be decided that a few don't actually belong or should not be supported
anymore.

When adding a package from either location, inspect the commit history to see
who has made changes to the recipe in the past. Anyone who has touched the recipe
should be pinged about it getting added here. They should also be consulted with
regards to whether the recipe needs any tweaks before being added. Also, they
should be asked if they would like to be added as maintainers. Only if they give
express permission to be adding as a maintainer should they be added to the
maintainer list. In all cases when porting a recipe, you should add yourself as a
maintainer. Some contributors to these repos were quite prolific, but may not be
as actively engaged. If they specify they only want to be contacted for certain
recipes or none at all, please respect their wishes also add make note of what
recipes (if any) they would like to be notified for. If they are no longer
interested in any conda recipes, make that note here as well. Before contacting
anyone please consult the list in this
[issue]( https://github.com/conda-forge/staged-recipes/issues/139 )
to see if that contributor has restrictions.

When porting make sure the recipe follows the linting specifications. The
section order should go `package`, `source`, `build`, `requirements`, `test`,
`about`, `extra/recipe-maintainers`. It is recommended to add a `build` section
with the `number` set to `0` explicitly even if the rest is unneeded. If there
is no build for Windows, make sure to add `skip: True  # [win]` to the `build`
section. The `about` section must have the `home` URL (verify the URL is still
correct), `license` (verify the correct license is present), and a one sentence
(or few word) `summary`. When specifying the version it is strongly recommend
that jinja templating be used to set the version at the top (e.g. `{% set
version = "0.10.1" %}`) and then replace all uses of the version with `{{
version }}`. Preference should be given to compressed source balls as opposed to
version control checkouts. Make sure all links to compressed source balls allow
for easy changing of the version (using latest is not acceptable). Also, a
checksum should be included with all compressed source balls to allow for
verification of downloads.

It is required to add tests with all packages. These can included but are not
limited to checking libraries are installed, python imports, simple code snippet
to compile or run a basic test, command line usage (checking help or version).
It is suggested that compiled code run all tests (e.g. `make check`) to ensure
it was built properly. This normally should happen in the build.

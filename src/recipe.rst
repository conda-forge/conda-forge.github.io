

What happens after the PR to staged-recipes is merged
-----------------------------------------------------

* After the PR is merged, travis-ci will create a new git repo automatically. For example, the recipe for a package named ``pydstool`` will be moved to a new repository `https://github.com/conda-forge/pydstool-feedstock <https://github.com/conda-forge/pydstool-feedstock>`_.
* CI services (travis-ci, circleci, appveyor) will be enabled automatically and a build will be triggered automatically which will build the conda package and upload to `https://anaconda.org/conda-forge <https://anaconda.org/conda-forge>`_
* If this is your first contribution, you will be added to the conda-forge `team <https://github.com/orgs/conda-forge/people>`_ and given access to the CI services so that you can stop and restart builds. You will also be given commit rights to the new git repository.
* If you want to make a change to the recipe, send a PR to the git repository from a fork. Branches of the main repository are used for maintaining different versions only.



Avoid Dependencies Outside of Conda-Forge
-----------------------------------------

*Do all of my package's dependencies have to be in conda(-forge) already?*

Short answer: yes.

Long answer: In principle, as long as your dependencies are in at least one of
your user's conda channels they will be able to install your package. In practice,
that is difficult to manage, and we strive to have all dependencies built in conda-forge.

Building all of the dependencies in conda-forge allow us greater assurance
of ABI compatibility for the conda-forge packages.
**Only in extreme cases should you rely on a dependency outside of conda-forge.**
In these cases, the basic heirarchy for dependencies, in order of preference, is,

1. Make or use a conda-forge package for the dependency
2. Use a defaults package for a dependency
3. Use a `CDT <https://conda.io/docs/user-guide/tasks/build-packages/compiler-tools.html#cdt-packages>`_ for a dependency
4. Use a ``yum_requirements.txt`` for a dependency (deprecated)
5. Require the package to exist implicitly on the user's system outside of conda managing the package 
   in any way, shape, or form. This is obviously a terrible option and should never
   be purposefully used. The only exceptions are packages such as device drivers
   that **need** root or sys admin permissions and kernel access. For example, 
   GPU code usually requires that a graphics card driver be installed for the
   code to execute. Avoid these implicit dependencies at all costs.

If your dependencies do not change with the Python version, or with the
platform, consider making your build :ref:`noarch <noarch>`, this will
allow the recipe to build faster, and free some CI resources for other projects.


Maintainer Role
---------------

The maintainer's job is to:

- Keep the feedstock updated by merging eventual maintenance PRs from conda-forge's bots.
- Keep the feedstock on par with new releases of the source package by
  - Bumping the version number and checksum.
  - Making sure that feedstock's ``install`` and ``run`` requirements stay accurate.
  - Make sure the test requirements match those of the of the updated package.
- Answer eventual question about the package on the feedstock issue tracker.


Other Recipes in ``staged-recipes``
-----------------------------------

When a PR of a recipe to the ``staged-recipes`` repo is ready to go, it is merged
into ``master``. This will trigger a CI build specially designed to convert the
recipe. However, for any number of reasons, the recipe may not be converted
right away. In the interim, the recipe will remain in ``master`` until they can be
converted.

There is no action required on the part of recipe contributors to resolve this.
It should have no impact on any other PRs being proposed. If any recipes
pending conversion do cause issues for your submission, please ping
``@conda-forge/core`` for help.



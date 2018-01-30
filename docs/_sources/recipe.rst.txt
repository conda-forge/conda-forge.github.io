Creating Conda Recipes
==========================
This document presents conda-forge information about creating recipes overall.
Details of modifying files inside of a recipe are present on other pages in
this documentation.

Getting Started
------------------------------
There are two ways to get started:

a. If it is a python package you can generate a skeleton as a starting point with
   ``conda skeleton pypi your_package_name``. You do *not* have to use skeleton, and the
   recipes produced by skeleton will need to be edited.
b. Look at one of `these examples <https://github.com/conda-forge/staged-recipes/tree/master/recipes>`_
   in this repository and modify it as necessary.

Your final recipe should have no comments and follow the order in the example.

*If there are details you are not sure about please open a pull request. The conda-forge team will be happy to answer your questions.*

In case you are building your first recipe using conda-forge, a step-by-step instruction and checklist that might help you with a successful build is provided in the following.

Step-by-step instructions
~~~~~~~~~~~~~~~~~~~~~~~~~

1. Fork the `example recipes <https://github.com/conda-forge/staged-recipes/tree/master/recipes>`_
2. Within your forked copy, generate a new folder in the recipes subdirectory and copy `meta.yml <https://github.com/conda-forge/staged-recipes/blob/master/recipes/example/meta.yaml>`_ from the example directory. Please leave the example directory unchanged!
3. Edit the copied recipe (meta.yml) as you need it
4. Generate the sha-256 key like described in the example recipe using the `openssl` tool. As an alternative you can also go to the package description on `PyPi <https://pypi.org>`_ where you can directly copy the sha-256 key from.
5. Ensure to fill in the `tests` section. Simple tests would just import your modulei and are described in the example.
6. Remove all comments in the `meta.yml <https://github.com/conda-forge/staged-recipes/blob/master/recipes/example/meta.yaml>`_


Checklist
~~~~~~~~~

* Ensure that the license and license family descriptors (optional) have the right case and that the license is correct. Note that case sensitive inputs are required (e.g. Apache 2.0 and not APACHE 2.0).
* Ensure that you have included a license file if your license requires (see `here <https://github.com/conda-forge/staged-recipes/blob/a504af81c05491bf7b0b018b2fa1efe64767985c/recipes/example/meta.yaml#L52-L55>`_)
* In case your project has tests included, you need to decide if these tests should be exectuted while building the conda-forge feedstock.
* Make sure that all tests pass sucessfully at least on your
  development machine
  
  
What happens after the PR to staged-recipes is merged
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* After the PR is merged, travis-ci will create a new git repo automatically. For example, the recipe for a package named `pydstool` will be moved to a new repository `https://github.com/conda-forge/pydstool-feedstock <https://github.com/conda-forge/pydstool-feedstock>`_.
* CI services (travis-ci, circleci, appveyor) will be enabled automatically and a build will be triggered automatically which will build the conda package and upload to `https://anaconda.org/conda-forge <https://anaconda.org/conda-forge>`_
* If this is your first contribution, you will be added to the conda-forge `team <https://github.com/orgs/conda-forge/teams/all-members>`_ and given access to the CI services so that you can stop and restart builds. You will also be given commit rights to the new git repository.
* If you want to make a change to the recipe, send a PR to the git repository from a fork. Branches of the main repository are used for maintaining different versions only.



Avoid Dependencies Outside of Conda-Forge
-----------------------------------------
*Do all of my package's dependencies have to be in conda(-forge) already?*

Short answer: yes. Long answer: In principle, as long as your dependencies are in at least one of
your user's conda channels they will be able to install your package. In practice, that is difficult
to manage, and we strive to have all dependencies built in conda-forge.

Building all of the dependencies in conda-forge allow us greater assurance of ABI compatibility
for the conda-forge packages. Only in extreme cases should you rely on a dependency outside of
conda-forge.

If your dependencies do not change with the python version, or with the
platform, consider making your build `noarch <noarch>`_, for them to be much
faster, and free some resource for other project.


Optional: ``bld.bat`` and/or ``build.sh``
------------------------------------------
In many cases, ``bld.bat`` and/or ``build.sh`` files are not required. Pure Python packages almost never need them.
If the build can be executed with one line, you may put this line in the ``script`` entry of the ``build`` section of
the ``meta.yaml`` file. (For instance, if a file uses `setuptools`, try ``script: python setup.py install --single-version-externally-managed --record=record.txt``.)


Maintainer Role
---------------
The maintainer's job is to:

- keep the feedstock updated by merging eventual maintenance PRs from conda-forge's bots;
- keep the feedstock on par with new releases of the source package by
  - bumping the version number and checksum;
  - making sure that feedstock's ``install`` and ``run`` requirements stay accurate;
  - make sure the test requirements match those of the of the updated package;
- answer eventual question about the package on the feedstock issue tracker.


Other Recipes in ``staged-recipes``
-----------------------------------
When a PR of a recipe to the ``staged-recipes`` repo is ready to go, it is merged into ``master``. This will trigger
a CI build specially designed to convert the recipe. However, for any number of reasons, the recipe may not be converted
right away. In the interim, the recipe will remain in ``master`` until they can be converted.
There is no action required on the part of recipe contributors to resolve this. Also it should have no impact on any other
PRs being proposed. If these recipe pending conversion do cause issues for your submission, please ping ``@conda-forge/core``
for help.

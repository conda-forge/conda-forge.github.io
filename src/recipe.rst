.. _creating_recipes:

Creating Conda Recipes
======================

This document presents conda-forge information about creating recipes overall.
Details of modifying files inside of a recipe are present on other pages in
this documentation.

Getting Started
---------------

There are multiple ways to get started:

a. Look at `the example recipe <https://github.com/conda-forge/staged-recipes/tree/master/recipes/example>`_ in the staged-recipes repository and modify it as necessary.
b. If it is an R package from `CRAN <https://cran.r-project.org/>`_, please
   instead start by using the `conda-forge helper script for R recipes <https://github.com/bgruening/conda_r_skeleton_helper>`_.
   Then if necessary you can make manual edits to the recipe.
c. If it is a python package you can generate a skeleton as a starting point with
   ``conda skeleton pypi your_package_name``. You do *not* have to use the skeleton, and the
   recipes produced by skeleton will need to be edited.
   In particular, you'll at least need to change the build line to :ref:`use pip <use-pip>`,
   add yourself as a maintainer,
   and specify a ``license_file``.

Your final recipe should have no comments (unless they're actually relevant to the recipe, and not generic instruction comments), and follow the order in the example.

*If there are details you are not sure about please open a pull request. The conda-forge team will be happy to answer your questions.*

In case you are building your first recipe using conda-forge, a step-by-step instruction and checklist that might help you with a successful build is provided in the following.

Step-by-step Instructions
-------------------------

0. Ensure your source code can be downloaded as a single file. Source code 
   should be downloadable as an archive (.tar.gz, .zip, .tar.bz2, .tar.xz) 
   or tagged on GitHub, to ensure that it can be verified. (For further 
   detail, see `Build from Tarballs, Not Repos 
   <https://conda-forge.org/docs/meta.html#build-from-tarballs-not-repos>`_). 
1. Fork the `example recipes
   <https://github.com/conda-forge/staged-recipes/tree/master/recipes>`_
   repository.
2. Create a new branch from the staged-recipes ``master`` branch.
3. Within your forked copy, generate a new folder in the recipes subdirectory
   and copy the `meta.yml
   <https://github.com/conda-forge/staged-recipes/blob/master/recipes/
   example/meta.yaml>`_
   file from the example directory. Please leave the example directory
   unchanged!
4. Edit the copied recipe (meta.yml) as needed. For details, see 
   `Writing the "meta.yml" <https://conda-forge.org/docs/meta.html>`_
5. Generate the SHA256 key for your source code archive, as described in the 
   example recipe using the ``openssl`` tool. As an alternative you can also 
   go to the package description on `PyPi <https://pypi.org>`_ from which you 
   can directly copy the SHA256.
6. Be sure to fill in the ``tests`` section. The simplest test will simply
   test that the module can be imported, as described in the example.
7. Remove all irrelevant comments in the ``meta.yaml``  file.


Checklist
.........

* Ensure that the license and license family descriptors (optional) have the right case and that the license is correct. Note that case sensitive inputs are required (e.g. Apache 2.0 rather than APACHE 2.0).
* Ensure that you have included a license file if your license requires one -- most do. (see `here <https://github.com/conda-forge/staged-recipes/blob/a504af81c05491bf7b0b018b2fa1efe64767985c/recipes/example/meta.yaml#L52-L55>`_)
* In case your project has tests included, you need to decide if these tests should be executed while building the conda-forge feedstock.
* Make sure that all tests pass sucessfully at least on your development machine.
* Recommended: run ``conda-build`` on your source code to ensure the recipe works locally.


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
your user's conda channels they will be able to install your package. In practice, that is difficult to manage, and we strive to have all dependencies built in conda-forge.

Building all of the dependencies in conda-forge allow us greater assurance
of ABI compatibility for the conda-forge packages. Only in extreme cases
should you rely on a dependency outside of conda-forge.

If your dependencies do not change with the python version, or with the
platform, consider making your build :ref:`noarch <noarch>`, this will allow the recipe to build faster, and free some CI resources for other projects.



Optional: ``bld.bat`` and/or ``build.sh``
-----------------------------------------

In many cases, ``bld.bat`` and/or ``build.sh`` files are not required.
Pure Python packages almost never need them.

If the build can be executed with one line, you may put this line in the
``script`` entry of the ``build`` section of the ``meta.yaml`` file with:
``script: "{{ PYTHON }} -m pip install . -vv"``.

Remember to always add ``pip`` to the host requirements.


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


Activate scripts
----------------

Recipes are allowed to have activate scripts, which will be ``sourced``\ d or
``call``\ ed as appropriate. It is generally recommended to avoid using
activate scripts when another option is possible because people don't always
activate environments the expected way and these packages may then misbehave.
However when there is no other option, these are a reasonable option to use.
When using them in a recipe, feel free to name them ``activate.bat``,
``activate.sh``, ``deactivate.bat``, and ``deactivate.sh`` in the recipe. The
installed scripts are recommended to be prefixed by the package name and a
separating ``-``. Below is some sample code for Unix and Windows that will make
this install process easier. Please feel free to lift it.

In ``build.sh``:

.. code-block:: bash

    # Copy the [de]activate scripts to $PREFIX/etc/conda/[de]activate.d.
    # This will allow them to be run on environment activation.
    for CHANGE in "activate" "deactivate"
    do
        mkdir -p "${PREFIX}/etc/conda/${CHANGE}.d"
        cp "${RECIPE_DIR}/${CHANGE}.sh" "${PREFIX}/etc/conda/${CHANGE}.d/${PKG_NAME}_${CHANGE}.sh"
    done

In ``build.bat``:

.. code-block:: batch

    setlocal EnableDelayedExpansion

    :: Copy the [de]activate scripts to %PREFIX%\etc\conda\[de]activate.d.
    :: This will allow them to be run on environment activation.
    for %%F in (activate deactivate) DO (
        if not exist %PREFIX%\etc\conda\%%F.d mkdir %PREFIX%\etc\conda\%%F.d
        copy %RECIPE_DIR%\%%F.bat %PREFIX%\etc\conda\%%F.d\%PKG_NAME%_%%F.bat
    )

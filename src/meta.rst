
Writing the ``meta.yaml``
==========================

This document presents conda-forge rules, guidelines, and justifications
about writing the ``meta.yaml`` file.




Compilers
---------

``conda-build=3`` gives the ability to use Anaconda 5 compilers, ``conda-forge`` is not using these compilers yet. Reason for holding out on using the Anaconda 5 compilers is that the packages built by them are sometimes incompatible with the packages built with the older compilers in CI platforms conda-forge has been using. All the dependencies of a package should be compiled (This is not true for all cases, but it's better to be cautious) with the new compilers before using the new compiler in a package. This presents a problem in that rebuilding a package will break the dependent packages. Therefore, ``conda-forge`` has decided to rebuild all of the packages and upload them all at once. More details on how this is done will be communicated in the future.

However, using the ``{{ compiler('cxx') }}`` is supported in ``conda-forge``, but it installs the ``toolchain`` package which activates the compilers in the CI environment. If you were using ``toolchain`` or ``gcc`` build deps, consider using the following,

.. code-block:: yaml

    requirements:
      build:
        - {{ compiler('c') }}
        - {{ compiler('cxx') }}
        - {{ compiler('fortran') }}


Note that appropriate compiler runtime packages will be automatically added to the package's runtime requirements and therefore there's no need to specify ``libgcc`` or ``libgfortran``.  There is additional information about how conda-build 3 treats compilers in the `conda docs <https://docs.conda.io/projects/conda-build/en/latest/source/compiler-tools.html>`_.


.. _noarch:

Building ``noarch`` packages
----------------------------

The ``noarch: python`` directive, in the ``build`` section, makes pure-Python
packages that only need to be built once. This drastically reduces the CI usage,
since it's only built once (on CircleCI), making your build much faster and
freeing resources for other packages.

``noarch: python`` can be used to build pure Python packages that:

* Do not perform any Python version specific code translation at install time (i.e. 2to3).

* Have fixed requirements; that is to say no conditional dependencies
  depending on the Python version, or the platform ran. (If you have for example
  ``backports # [py27])`` in the ``run`` section of ``meta.yml``, your package
  can't be noarch, yet.)

* Do not use selectors to ``skip`` building the recipe on a specific platform or
  for a specific version of python (e.g. ``skip: True  # [py2k]``).

Note that while ``noarch: python`` does not work with selectors, it does work
with version constraints, so ``skip: True  # [py2k]`` can sometimes be replaced
with a constrained python version in the build/run subsections:
say ``python >=3`` instead of just ``python``.

``noarch: python`` can also work with recipes that would work on a given platform
except that we don't have one of its dependencies available.
If this is the case, when the install runs ``conda`` will fail with an error
message describing which dependency couldn't be found.
If the dependency is later made available, your package will start working
without having to change anything.
Note though that since ``noarch`` packages are built on Linux, currently the
package must be installable on Linux.

To use it, just add ``noarch: python`` in the build section like,

.. code-block:: yaml

    build:
      noarch: python

If you're submitting a new recipe to ``staged-recipes``, that's all you need.
In an existing feedstock, you'll also need to :doc:`re-render the feedstock </conda_smithy>`,
or you can just ask :doc:`the webservice </webservice>` to add it for you and rerender:
say ``@conda-forge-admin, please add noarch: python`` in an open PR.

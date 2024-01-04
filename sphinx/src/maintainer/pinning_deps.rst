.. _pinned_deps:

Pinned dependencies
*******************

.. _globally_pinned_packages:

Globally pinned packages
========================

Maintaining a large collection of packages with different requirements poses the danger of producing islands of packages with mutually exclusive dependencies.
Especially widely used libraries with restricted version compatibilities increase the danger of fractioning the package space.
By fixing crucial libraries to specific dependency version shared by all packages in conda-forge, we avoid fractioning of our packages in incompatible islands.
The following paragraphs give a short introduction about how this global version pinning is realized in conda-forge.

The current versions of globally pinned packages are defined in the `conda_build_config.yaml <https://github.com/conda-forge/conda-forge-pinning-feedstock/blob/master/recipe/conda_build_config.yaml>`_ file located in the ``conda-forge-pinning`` feedstock.
These pinned versions represent the ABIs that conda-forge is currently supporting, with almost all available packages built against that version.

When a rerendering happens, conda-smithy will render the recipe using conda-build and output configuration files for each job and save them in a yaml file in ``.ci_support`` folder. For example, there's an output configuration file for each OS, each python version, etc.

These output configuration files are stripped to options that are used in the build and therefore a change in the config files in ``.ci_support`` folder implies that a new build is needed there.

Pinning of packages are handled by the same configuration file and conda-build. This means that packages need not be pinned manually.

E.g.

.. code-block:: yaml

    requirements:
      host:
        - gmp 6.1.*
      run:
        - gmp 6.1.*

Should be replaced by

.. code-block:: yaml

    requirements:
      host:
        - gmp
      run:
        - gmp

When there's a new ABI version of gmp (say 7.0), then conda-forge-pinning will be updated. A re-rendering of a package using gmp will change. Therefore to check that a recipe needs to be rebuilt for updated pinnings, you only need to check if the package needs a rerender.

.. note::

  ``NumPy`` is an exception to this (See :ref:`linking_numpy`).

If a package is not pinned in `conda-forge-pinning <https://github.com/conda-forge/conda-forge-pinning-feedstock/blob/master/recipe/conda_build_config.yaml>`_, then the pinning needs to be done manually. If the package is a ``C/C++`` library with a ``C/C++`` API that is consumed and linked to by other libraries, then that package is a candidate to be added to ``conda-forge-pinning``. Please open an issue in `conda-forge-pinning-feedstock <https://github.com/conda-forge/conda-forge-pinning-feedstock>`_ for discussion.

.. note::

  If the constraints in ``conda-forge-pinning`` are not strict enough, you can override them by changing back to pinning the package with a version manually. You can make a pinning stricter by adding ``{{ pin_compatible('gmp', max_pin='x.x.x') }}`` to run requirements.

.. note::

  If you need to remove a pinning in rare cases like linking the package statically or if the package is used with ``dlopen`` instead of linking, then you can do,

  .. code-block:: yaml

    build:
      ignore_run_exports:
        - gmp

There is additional documentation on this pinning scheme in `the conda docs <https://docs.conda.io/projects/conda-build/en/stable/resources/variants.html#build-variants>`_.


Specifying run_exports
======================

The ``run_exports`` feature can be used to specify the versions that are :term:`ABI` compatible with the built version. This leads to higher flexibility of choosable packages, without breakages due to incompatibilities.

Packages that depend on a package with ``run_exports`` can choose to overwrite this behavior using the ``build/ignore_run_exports`` key.

.. note::

  It is not always completely clear how a given package is going to be used.
  For example, numpy may be used either as a python package, and it also has a C library that can be linked against.
  The former usage would not require ``run_exports``, but the latter would.

  In this scenario, it may be advantageous to split the package into distinct metapackages that may share a common parent containing the actual files, but with each metapackage defining different pinning behavior.
  Anaconda does this for numpy (see the `recipe <https://github.com/AnacondaRecipes/numpy-feedstock/blob/master/recipe/meta.yaml>`_).

  The general idea is that the ``numpy-devel`` package should be used when a package is building against the C interface (i.e. it needs the compatibility bound), and the numpy package should be used when a package is using only the python interface.

  In general, it is not necessary to split up packages. At conda-forge, we only advise it when it greatly reduces package size, or when it helps remove dependencies that would otherwise be unnecessarily included.

The global pins and ``run_exports`` are two sides of the same coin.
If there is an ABI break, as determined by the ``run_exports``, then the global pins *may* need to be updated. It is possible that conda-forge skips that ABI.
Once the pins are updated, via a migration yaml, then all the packages that are linked are rebuilt.


.. _update_pins:

Updating package pins
=====================

Changing global pins requires rerendering all packages that depend on the package with the changed pin. Doing this manually
can be tedious, especially when many packages are involved. Migrators are used to automatically generate pull requests
for the affected packages in conda-forge.

Usually, the bot will generate these migrations automatically. However, when a pin is first made or added, one may need to
be added by hand. To do this, follow these steps:

#. Create a new migration yaml by copying `example.exyaml <https://github.com/conda-forge/conda-forge-pinning-feedstock/blob/master/recipe/migrations/example.exyaml>`__ in the ``conda-forge/conda-forge-pinning`` repository.
#. Change the migration yaml to reflect the package and version to be migrated
#. Write a migrator for propagating the pin changes.
#. Propose the changes as a :term:`PR` to `conda-forge/conda-forge-pinning-feedstock`_.
#. Once accepted the migration will begin. The migration status can be monitored at https://conda-forge.org/status.
#. After the migration is complete, a new PR can be issued to `conda-forge/conda-forge-pinning-feedstock`_ to:

   - Remove the migrator yaml for the completed migration
   - If the version of the package is pinned in the global conda_build_config.yaml, this PR should also:

     - Update the version in conda_build_config.yaml
     - Bump the version in meta.yaml to the current date

Details of how the migration yaml is setup are provided in an `example <https://github.com/conda-forge/conda-forge-pinning-feedstock/tree/master/recipe/migrations/example.exyaml>`__
and documentation `here <https://regro.github.io/cf-scripts/migrators.html#making-migrators>`_.

.. _conda-forge/conda-forge-pinning-feedstock: https://github.com/conda-forge/conda-forge-pinning-feedstock

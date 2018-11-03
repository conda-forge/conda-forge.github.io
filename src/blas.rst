BLAS & Numpy & Friends
======================

-  BLAS metapackage

   -  Version will have two values X.Y

      -  X represents changes to the metapackage.
      -  Y represents priority of BLAS (if we change priorities BLASes X
         must be bumped, if we want to prioritize something new over
         OpenBLAS we do not need to change X)

         -  1 is OpenBLAS
         -  0 is None (no BLAS whatsoever)

   -  needs to have version stay the same across all variants.
   -  build number cannot be touched (it won't be in the string anyways)
   -  no pinning of BLAS inside the metapackages (dependencies can pin
      this)
   -  to preserve a BLAS in an environment it is recommend to add
      ``pinned`` to ``conda-meta`` and specify down to the build string
      what is the expected BLAS
   -  To install a specific variant, ``conda install blas=1.0=none`` /
      ``conda install blas=1.0=openblas``. It is hoped the syntax will be
      improved in conda.

      -  In the future, with some fixes to ``conda`` will allow for syntax
         like ``conda install blas=*=openblas``. We should keep an eye on
         this. (maybe even ``conda install blas:openblas``)

   -  There will be two variants initially:

      -  openblas
      -  noblas - no BLAS optimisations (e.g. for reasons of smaller
         installations)

-  Numpy package

   -  "version + build number" must always be greater than or equal to that
      in defaults. If not, defaults "numpy" will be chosen, complete with
      mkl

      -  to make this simple we can pick a high build number so this is
         prioritized 100 and then bump from there

         -  Should make the build number ranges tied to BLAS X version above.
         -  Build number should start at ``(X+1)*100``.

            -  Means OpenBLAS starts at 200.
            -  No BLAS starts at 100.

         -  Unfortunately the 1.11.0 release breaks this rule so we will have
            No BLAS at 101.

      -  if defaults gains a newer version and build without conda-forge
         updating, users will be prompted to upgrade to the defaults numpy.
         Even if a user does this, as soon as an equivalent build is
         available on conda-forge, they will be prompted to update to their
         previous variant

   -  will track the blas\_{{ variant }} feature enabled by the BLAS
      metapackage
   -  will pin the specific blas package versions (e.g. openblas .)

-  SciPy, scikit-learn, etc. package

   -  Same thing as NumPy
   -  Add numpy dependency as if linking occurs

openblas mkl dance
------------------

When updating packages, it might seem that openblas and mkl keep trying to
overwrite one and other. For example:

.. code-block:: bash

  $ conda install pytest
  Solving environment: done

  [...]

  The following packages will be UPDATED:

  libgcc-ng:      7.2.0-hdf63c60_3                     conda-forge --> 8.2.0-hdf63c60_1
  numpy:          1.15.2-py36_blas_openblashd3ea46f_1  conda-forge [blas_openblas] --> 1.15.2-py36h1d66e8a_1

  The following packages will be DOWNGRADED:

  blas:           1.1-openblas                         conda-forge --> 1.0-mkl
  opencv:         3.4.3-py36_blas_openblash829a850_200 conda-forge [blas_openblas] --> 3.4.1-py36h6fd60c2_1
  scipy:          1.1.0-py36_blas_openblash7943236_201 conda-forge [blas_openblas] --> 1.1.0-py36hc49cb51_0

The problem is that conda really wants to minimize the "features" installed
in the environment. Implicit dependencies, such as openblas in the case of
``numpy`` from conda-forge, behave differently from explicit ones.
Explicitly specifying the dependency on either ``openblas`` or ``mkl`` will
solve this problem. As of writing, conda-forge does not package ``mkl``.

Specifying:

.. code-block:: bash

  conda install blas=*=openblas

solves the problem in new environments. The challenge comes if you already
installed ``openblas`` (likely because of ``numpy``) and now need to add a
dependency for ``openblas``. ``conda install`` will tell you it is already
satisfied and not add  it to the list of explicitly specified dependencies.
To work around this problem, execute the following commands:

.. code-block:: bash

  conda uninstall blas --force
  conda install blas=*=openblas

Here, we specified ``--force`` so as not to uninstall packages that depend on
``blas`` (e.g. numpy and all dependencies).

It may be helpful to read the conda documentation regarding installing
default packages in new environments
<https://conda.io/docs/user-guide/configuration/use-condarc.html#always-add-packages-by-default-create-default-packages>`_

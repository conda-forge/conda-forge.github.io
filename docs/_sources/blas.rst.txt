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

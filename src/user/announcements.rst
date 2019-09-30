Announcements
=============

2019
----

:2019-09-30: Clang 9.0.0 and gfortran 7.3.0 as default compilers in OSX.

   - If you maintain a feedstock which require a C/C++ compiler, no changes necessary. A rerender
     should be done next time the feedstock is updated to use the new compiler.
   - If you maintain a feedstock with a Fortran compiler, a PR to upgrade to gfortran 7.3.0 was
     already issued. If that PR was merged, there's nothing to do. If not, contact core if you
     need help migrating.

:2019-03-28: We overhauled the blas support in conda-forge.

   - Our packages now build against NETLIB’s reference implementation.
   - You as a user can now choose the implementation available at runtime.

  For more information please refer to the :ref:`documentation <knowledge:blas>`.


:2019‑01‑22: It has happened! Conda-forge has migrated to the latest compilers 🎉.

    If you:
      * maintain a compiled feedstock, it will likely need to be rerender
      * need to roll back to the old compilers, you can use the "cf201901" label

2018
----

:2018‑10‑12: The rebuild is moving along nicely with almost a third of packages completed.

    Recently completed are numpy and openblas which should open up much of the python numeric stack.
    We're only about 5 feedstocks away from opening up all of R as well.

:2018‑09‑24: A minimal python 3.7 build is now available across all platforms and both compilers!

:2018‑09‑24:  Deprecation notice for Python 3.5

    As we start building out more of the python 3.7 stack, we will no longer be building
    python 3.5 packages.

    No new python 3.5 packages will be built after 2018-10-01.

:2018‑09‑20:  The compiler migration is in full swing.  The bot will be making the rounds and
    modernizing more than 4000 packages.  This is going to take a few months to get done so
    bear with us.

:2018‑09‑10: Conda forge now has a magical status bar for tracking the progress of migrations.

    You can find this at `conda-forge.org/status <https://conda-forge.org/status>`_.

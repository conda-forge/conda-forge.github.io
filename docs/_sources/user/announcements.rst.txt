Announcements
=============

2020
----

:2020-03-24: ``vs2015`` to ``vs2017`` Transition

    We are formally deprecating ``vs2015`` in two weeks on 2020-04-07 and will move to 
    ``vs2017``. This change will enable us to support the usage of ``msbuild`` on Azure for the 
    ``win`` platform and will provide additional support for ``C++``.
    Most packages built with ``vs2015`` can be linked with ``vs2017`` toolchain (but not vice-versa).
    An exception is static libraries compiled with whole program optimization (/GL flag) which may be
    incompatible with the ``vs2017`` toolchain. These static libraries will need to be rebuilt
    using ``vs2017``.

:2020-03-23: Appveyor Deprecation

    We are now starting to formally deprecate Appveyor in favor of Azure for builds on the 
    ``win`` platform. Note that we have not been adding appveyor to new feedstocks 
    for a while, so this is not a completely new change in policy. We will now, however, begin to 
    actively disable Appveyor builds on feedstocks not using it by turning off builds for 
    GitHub ``push`` events. Additionally, we have been issuing PRs to any remaining 
    feedstocks to move them to Azure. We are aware that some packages built with ``msbuild``
    cannot yet be moved to Azure and so are leaving Appveyor on for those feedstocks for
    now.

:2020-03-21: Python 2.7 Admin Command Available

    A webservices admin command is now available to add Python 2.7 back to 
    feedstocks. Put ``@conda-forge-admin add python 2.7`` in the title on an 
    issue in your feedstock. The admin webservices bot will then issue a PR
    adding back Python 2.7. Note that this PR will remove other Python builds
    and any ``win``, ``aarch64``, or ``ppc64le`` builds. If you want to keep 
    those, merge the PR into a separate branch on your feedstock.

:2020-03-18: Python 2.7 and ``vs2008`` Deprecation

   - Python 2.7 is no longer supported by the upstream developers as of 2020-01-01.
     Conda-forge is thus deprecating its Python 2.7 support. Conda-forge will provide
     no ongoing support for Python 2.7 builds and any existing builds are provided on an "as-is" basis.
   - A ``cf202003`` label has been applied to the ``conda-forge`` channel for those
     who need a reference to the package index with Python 2.7.
   - We are removing support for ``vs2008`` on Windows conjunction with the deprecation
     of Python 2.7, as it was only supported to build this version of Python.
   - We will provide an admin command that will add back Python 2.7 to any feedstock.
     Note that as stated above, we cannot provide support for any Python 2.7 builds
     generated with this admin command. Further, this admin command will only work on 
     ``osx-64`` and ``linux-64`` platforms.

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

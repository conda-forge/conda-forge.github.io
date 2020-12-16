.. _news:

Announcements
=============

Our announcements are published to an RSS feed `here <https://conda-forge.org/docs/news.rss>`_.

2020
----

:2020-12-16: Moving to CentOS 7 and CentOS 6 End-of-Life

    ``conda-forge``'s compiler stack uses repackaged libraries from CentOS 6
    to supply certain libraries, notably ``glibc`` when building recipes. We currently
    default to using CentOS 6 with the ``glibc`` 2.12 ABI. However, CentOS 6 reached
    end-of-life in November 2020 and increasingly software packages require at
    least CentOS 7 with the ``glibc`` 2.17 ABI. We also realize that due to recent
    events, some communities that may have been planning to skip CentOS 7
    and move straight to CentOS 8 might be reconsidering those plans. Further, they
    may not be ready for a full-scale switch to CentOS 7. Thus the
    ``conda-forge`` core team has decided to delay moving to CentOS 7 until sometime
    early next year, likely the end of January 2021 at the earliest. We are actively
    looking for feedback from our users on this issue. Please do :ref:`get in touch <getintouch>`
    if you have comments or concerns!

:2020-12-02: Artifact Validation

    In an effort to better secure ``conda-forge``, we are developing a process to
    validate artifacts before they are uploaded to ``anaconda.org``. This validation
    will look for various security related items, such as artifacts which overwrite
    key pieces of certain packages. While this process is in development, we will not
    be rejecting uploads. However, we will start scanning our current artifacts and
    working with the maintainers of those artifacts to mark broken any which we deem
    a security risk. We will also be running validation on new artifacts being upload
    and will report any issues back to feedstocks. At a future date, artifacts which
    do not pass validation will not be uploaded.

:2020-10-08: Compiler Upgrade to ``GCC`` ``9.3.0``

    We will be upgrading all ``GCC``-based compilers to version
    ``9.3.0`` on all platforms. This upgrade will not affect ``C`` or
    ``C++`` code, but will require a rebuild of all feedstocks that use
    ``FORTRAN`` due to a change in the ``SONAME``. During this rebuild,
    we will keep the old compiler versions in production, temporarily
    doubling the build matrix. Once the migration is deemed complete,
    these old compiler versions will be removed.

:2020-08-07: Completed New Staging Process for ``anaconda.org`` Uploads

    We have now completed rolling out the new staging process for uploads
    to anaconda.org. Direct uploads to the ``conda-forge`` channel will no
    longer work. If you are having trouble with package uploads, please
    rerender your feedstock with the latest version of ``conda-smithy``.
    As always, if you need help, bump us on gitter or GitHub!

:2020-08-06: Fixed Maintenance Process for Feedstock Teams

    We have fixed a bug where the maintainers of feedstocks listed in the
    ``meta.yaml`` did not match those listed in the GitHub team. Due to this
    change, you may notice emails from GitHub informing you that you have been
    removed from a GitHub team if you have recently removed yourself from a
    feedstock via changing the ``meta.yaml``. A similar fix has been applied
    for maintenance teams as well, though you will not see emails from this
    fix.

:2020-07-23: CentOS 7 ``sysroot`` Now Available for ``linux-64`` Builds

    We are very excited to announce that new compilers based on repackaged
    ``sysroot``'s from CentOS 7 are now available for all ``linux-*`` platforms.
    These compilers will be the default going forward for any ``gcc``, ``gxx``,
    and ``gfortran`` versions past ``8.4.0`` on ``ppc64le`` and ``7.5.0`` on
    ``x86_64``/``aarch64``.

    On the ``linux-64`` platform, we have also built the CentOS 6 ``sysroot``
    and set it as the default, consistent with our current compilers. To use the
    CentOS 7 ``sysroot`` on ``linux-64``, add a requirement of ``sysroot_linux-64 2.17``
    to the build section of your recipe. You also need to set the proper Docker
    image in your ``conda_build_config.yaml``. See :ref:`Using CentOS 7 <centos7>` for details.

:2020-07-23: Strict channel priority in builds for OSX and Linux

    We have changed the OSX and Linux platforms to enforce strict channel priority
    in package builds. This change means that if a package is available in the ``conda-forge``
    channels, the ``conda`` solver will not consider any versions of the package from other
    channels. Users can disable this by setting ``channel_priority: flexible`` in their
    ``conda-forge.yml``.

:2020-07-23: NumPy 1.16 as the minimal NumPy version on all platforms.

    In accordance with `NEP-29 <https://numpy.org/neps/nep-0029-deprecation_policy.html>`_,
    we have switched to have ``numpy 1.16`` as the minimal supported version on all
    platforms.

:2020-07-17: Conda-forge is building openblas with both pthreads and openmp on Linux

    The main change is that ``openblas`` will use pthreads for threading by default on Linux
    instead of the previous ``openmp`` default.
    The ``openmp`` builds can be recovered by installing ``libopenblas=*=*openmp*``.

:2020-07-16: Core Dependency Tree Package Changes

    ``conda-forge`` is moving to a new system for generating Core Dependency Tree (CDT)
    packages. These changes include

     * CDT packages will no longer be built using feedstocks and this
       practice is officially deprecated.
     * Any current CDT packages in feedstocks will be moved to the new
       `conda-forge/cdt-builds <https://github.com/conda-forge/cdt-builds>`_
       repo and the feedstock will be archived. Members of core will be doing this slowly
       on an as-needed basis, so it may not happen right away.
     * Requests for new CDTs should be submitted as PRs to the
       `conda-forge/cdt-builds <https://github.com/conda-forge/cdt-builds>`_ repo.

    These changes are being made so that ``conda-forge`` can provide access to
    CentOS 7 / glibc 2.17 for ``linux-64`` builds. They will also move more of the
    packages needed for ``conda-forge`` builds into the ``conda-forge`` channels making
    builds more reliable.

:2020-07-16: Moving from clang 9 to clang 10

    conda-forge is moving to clang 10 on macOS!
    Check the release `notes <https://releases.llvm.org/10.0.0/tools/clang/docs/ReleaseNotes.html#what-s-new-in-clang-10-0-0>`_
    for what is new, breaking, or deprecated.

:2020-07-15: ``CFEP-18:`` Removing static libraries from the main build

    With `CFEP-18 <https://github.com/conda-forge/cfep/blob/master/cfep-18.md>`_
    we now have a policy on how to deal with static packages. The most important
    change here is that we will be removing static libraries from the main packages
    and moving them to ``-static`` suffixed packages. ``-static`` packages will not
    be built by default but only on request.

:2020-07-03: ``cf-mark-broken`` renamed to ``admin-requests``

    The ``cf-mark-broken`` repo has been renamed to ``admin-requests``. It still
    serves the same purpose. However, we have expanded the capabilities of the repo
    to be able to mark packages as not broken.

:2020-05-28: New Process for Marking Packages as Broken

    We are changing the way we mark packages as ``broken`` to
    better match the ``defaults`` channel and to better enable
    reproducible environments that depended on broken packages.
    We will now be adding the ``broken`` label to packages but leaving
    them on the ``main`` channel. In order to make sure they do not
    appear in the ``repodata.json`` for the ``main`` channel, we will
    be patching the repo data to remove them using the ``removals``
    feature.

    Users will notice the following changes

     * The packages on ``anaconda.org`` will now have both the ``main``
       and the ``broken`` labels.
     * All requests to mark packages as broken must be sent to the
       ``cf-mark-broken`` repo.
     * Members of ``core`` can no longer mark things as broken by
       hand since the repo data patching must be done as well.
     * The package metadata for broken packages may differ slightly
       from when they were on the ``main`` channel.
     * The only correct source of package metadata is now the ``repodata.json``
       etc on ``anaconda.org``. Any other sources may be missing critical changes.

:2020-05-09: New Staging Process for ``anaconda.org`` Uploads

    Starting this week, we are changing the way we upload packages to ``anaconda.org``.
    We will move from direct uploads to the ``conda-forge`` ``main`` channel to using a
    staging organization/channel combined with a copy request from the staging channel to
    the production channel. This new process will allow us to perform some validation on
    the outputs of feedstocks before they are released.

    What will you see as a feedstock maintainer?

     * Starting this week, the ``admin-migrations`` service will be making commits to all
       feedstocks to provision them with the necessary configuration, API keys, and tokens.
     * Each feedstock will now be provisioned with a secret token. This token should not be
       shared or taken out of the CI services. It is used to identify the feedstock during
       the upload process.
     * The ``admin-migrations`` service will be setting a new top-level key in the ``conda-forge.yml``,
       ``conda_forge_output_validation: true``. This key indicates to ``conda-smithy`` that it
       should include the output validation calls in the feedstock CI scripts.
     * Currently open PRs will need to have this key added by hand and then rerendered.
     * When PRs are running the CI scripts, they will do some initial validation of the
       feedstock outputs. If this validation fails, the CI job will fail. Please see the
       CI logs for the error message which is printed after ``conda-build`` runs.
     * Once a PR is merged to master, the copy from the staging channel to the production
       channel will happen automatically.
     * Should a copy request fail, you will get a notification via a comment on the commit
       to master.
     * As part of this process, uploads from ``appveyor`` will no longer be allowed unless there is
       a significant barrier to using ``azure``. We have recently upgraded the compiler infrastructure
       on ``azure`` to support this change in policy.

    Despite our extensive testing, we do not expect this change to be completely smooth,
    so please bear with us. As always, if you have any questions, concerns, or trouble, you
    can find us on gitter or bump us directly on github!

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


:2019-01-22: It has happened! Conda-forge has migrated to the latest compilers 🎉.

    If you:
      * maintain a compiled feedstock, it will likely need to be rerender
      * need to roll back to the old compilers, you can use the "cf201901" label

2018
----

:2018-10-12: The rebuild is moving along nicely with almost a third of packages completed.

    Recently completed are numpy and openblas which should open up much of the python numeric stack.
    We're only about 5 feedstocks away from opening up all of R as well.

:2018-09-24: A minimal python 3.7 build is now available across all platforms and both compilers!

:2018-09-24:  Deprecation notice for Python 3.5

    As we start building out more of the python 3.7 stack, we will no longer be building
    python 3.5 packages.

    No new python 3.5 packages will be built after 2018-10-01.

:2018-09-20:  The compiler migration is in full swing.  The bot will be making the rounds and
    modernizing more than 4000 packages.  This is going to take a few months to get done so
    bear with us.

:2018-09-10: Conda forge now has a magical status bar for tracking the progress of migrations.

    You can find this at `conda-forge.org/status <https://conda-forge.org/status>`_.

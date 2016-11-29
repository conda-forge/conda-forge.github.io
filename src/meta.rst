Writing the ``meta.yaml``
==========================
This document presents conda-forge rules, guidelines, and justifications
about writing the ``meta.yaml`` file.


Build from Tarballs, Not Repos
------------------------------
Conda-forge requires that building from tarballs using the
``url`` and ``fn`` keys in the ``build`` section. A recipe
should not use the ``git_url``, ``git_ver``, and similar
keys. There are three main reasons for this:

* Downloading the whole repo when you only need a single snapshot wastes
  the precious, constrained, and shared CI time and bandwidth.
* Repositories are not checksummed. Thus, using a tarball has a
  stronger guarantee that the download that is obtained to build from is
  in fact the intended package.
* On some systems (such as Windows), it is possible to not have permissions
  to remove a repo once it is created. This can be avoided by using a tarball.

If a package does not have the ability to build from a tarball, this is
considered a bug and should be reported upstream. In the worst case,
the source can be patched in include the relevant build information.

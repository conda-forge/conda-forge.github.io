FAQ
===

.. _mfaq_update_circle:

:ref:`(Q) <mfaq_update_circle>` **How to address** ``permission denied (publickey)`` **in circle builds?**

  When you see this error in a circle build:
  ::

    Permission denied (publickey).

    fatal: Could not read from remote repository.

    Please make sure you have the correct access rights
    and the repository exists.
    Exited with code 128

  open a new issue with a comment :ref:`ci_update_circle`.
  Once our web services updated the circle configuration, restart the build. 


.. _mfaq_py37_selector:

:ref:`(Q) <mfaq_py37_selector>` **Why does conda-build ignore the** ``py37`` **selector in meta.yaml?**

  TL;DR: replace ``py37`` with ``py==37``.

  conda-build has changed the selector syntax.
  You are now encouraged to use ``py==<version>``, instead of ``py<version>``.
  While the legacy selectors ``py27`` and ``py36`` are still valid, ``py37`` and higher are not available anymore.

  Please use the new syntax ``py==27``, ``py==36`` and ``py==37`` to avoid confusion.

  .. admonition:: Related links

    - **Selectors in conda-build documentation** (`Preprocessing selectors <https://docs.conda.io/projects/conda-build/en/latest/resources/define-metadata.html#preprocessing-selectors>`__)
    - **Linter: deprecate the use of py27, py36** (`conda-smithy/#1026 <https://github.com/conda-forge/conda-smithy/issues/1026>`__)

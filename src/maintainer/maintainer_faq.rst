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

FAQ
***

.. _faq_pkg_not_available:

:ref:`(Q) <faq_pkg_not_available>` **A package I am looking for is not on conda-forge, what can I do?**

  We have an overview and step-by-step instruction on contributing packages in the section :ref:`dev_contribute_pkgs`.

.. _faq_pkg_update:

:ref:`(Q) <faq_pkg_update>` **The feedstock for a package from conda-forge is updated, how long should it take to update on Anaconda Cloud?**

  It depends on the queue, but a good rule of thumb is to wait at least 30 mins - 2 hours.  If you don't see it after 24 hrs, please raise an issue.

.. _faq_report_issue:

:ref:`(Q) <faq_report_issue>` **A package from conda-forge is outdated or broken, where can I report the issue?**

  You can open an issue in the packages feedstock repository on GitHub. Search for the repository ``conda-forge/<package-name>-feedstock``. There you can also suggest fixes or even become a maintainer. Please refer to :ref:`maintaining_pkgs` for details.

.. _faq_contact:

:ref:`(Q) <faq_contact>` **I have a question/suggestion. How can I contact you?**

  Please join us in our `gitter channel <https://gitter.im/conda-forge/conda-forge.github.io>`__! We are always happy to answer questions and help beginners! 

.. _faq_teams:

:ref:`(Q) <faq_teams>` **I have a set of related packages, how do I create a conda-forge team?**

  Conda-forge github teams are very useful means of adding common maintainers to a set of related packages. For example, most R packages are co-maintained by the conda-forge/R team.
  To create a new team, you can just use one of the existing feedstocks from your packages. Each feedstock has automatically a team assigned (formed from the maintainers of that feedstock).
  For example, the conda-forge R team is coming from the `r-feedstock <https://github.com/conda-forge/r-feedstock>`_. Then you can just add `- conda-forge/r` in the maintainers section to 
  make all maintainers of the r-feedstock also maintainers of the new package.

.. _faq_solver_speed:

:ref:`(Q) <faq_solver_speed>` **Installing and updating takes a long time, what can I do?**

  .. todo:: 

    - Add information on strict channel priorities here.
    - Add information on conda-metachannel here.


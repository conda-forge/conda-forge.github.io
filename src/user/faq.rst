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

  Please join us on our `Gitter channel <https://gitter.im/conda-forge/conda-forge.github.io>`__. We are always happy to answer questions and help beginners.

.. _faq_teams:

:ref:`(Q) <faq_teams>` **I have a set of related packages, how do I create a conda-forge team?**

  Conda-forge github teams are very useful means of adding common maintainers to a set of related packages. For example, most R packages are co-maintained by the conda-forge/R team.
  To create a new team, you can just use one of the existing feedstocks from your packages. Each feedstock has automatically a team assigned (formed from the maintainers of that feedstock).
  For example, the conda-forge R team is coming from the `r-feedstock <https://github.com/conda-forge/r-feedstock>`_. Then you can just add `- conda-forge/r` in the maintainers section to
  make all maintainers of the r-feedstock also maintainers of the new package.

.. _faq_solver_speed:

:ref:`(Q) <faq_solver_speed>` **Installing and updating takes a long time, what can I do?**

  Enabling strict channel priority may help. You can do this via

  .. code-block:: bash

    conda config --set channel_priority strict

  You can also try using a package called `mamba <https://github.com/mamba-org/mamba>`__.
  ``mamba`` is an ``conda``-compatible package that can be used in place of ``conda``. It
  employs a faster solver implemented in ``C``. It can be installed via

  .. code-block:: bash

    conda install mamba

.. _faq_travis_ci:

:ref:`(Q) <faq_travis_ci>` **Why is Travis-CI failing on my feedstock?**

  Travis CI builds should be enabled or disabled via the ``conda-forge.yml`` configuration.
  Nevertheless, sometimes Travis CI ignores this for whatever reason (probably a bug somewhere).
  In such a case, please disregard failing builds.
  Note that ``travis-ci.org`` builds are soon being phased out and replaced by ``travis-ci.com``.

.. _faq_compiler_metapkg:

:ref:`(Q) <faq_compiler_metapkg>` **How can I install a C/C++ compiler in my environment?**

  You can use our convenient meta-packages ``c-compiler`` and ``cxx-compiler`` to install a compiler stack that fits your platform. Error messages such as 
  
  .. code-block::

    x86_64-apple-darwin13.4.0-clang: No such file or directory
    
  are a telltale sign that you are lacking compilers.

.. _faq_cuda_compiler_header:

:ref:`(Q) <faq_cuda_compiler_header>` **How can I compile CUDA (host or device) codes in my environment?**

  Unfortunately, this is not possible with conda-forge's current infrastructure (``nvcc``, ``cudatoolkit``, etc) if there is no local CUDA Toolkit installation. In particular, the ``nvcc`` package provided on conda-forge is a *wrapper package* that exposes the actual ``nvcc`` compiler to our CI infrastructure in a ``conda``-friendly way; it does not contain the full ``nvcc`` compiler toolchain. One of the reasons is that CUDA headers like ``cuda.h``, ``cuda_runtime.h``, etc, which are needed at compile time, are not redistributable according to NVIDIA's EULA. Likewise, the ``cudatoolkit`` package only contains CUDA runtime libraries and not the compiler toolchain.
  
  If you need to compile CUDA code, even if it involves only CUDA host APIs, you will still need a valid CUDA Toolkit installed locally and use it. Please refer to `NVCC's documentation <https://docs.nvidia.com/cuda/cuda-compiler-driver-nvcc/index.html>`_ for the CUDA compiler usage and `CUDA Programming Guide <https://docs.nvidia.com/cuda/cuda-c-programming-guide/index.html>`_ for general CUDA programming.

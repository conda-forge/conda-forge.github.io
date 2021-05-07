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
  Once our web services have updated the circle configuration, restart the build.


.. _mfaq_py37_selector:

:ref:`(Q) <mfaq_py37_selector>` **Why does conda-build ignore the** ``py37`` **selector in meta.yaml?**

  TL;DR: replace ``py37`` with ``py==37``.

  conda-build has changed the selector syntax.
  You are now encouraged to use ``py==<version>``, instead of ``py<version>``.
  While the legacy selectors ``py27`` and ``py36`` are still valid, selectors ``py37`` and higher are no longer valid.

  Please use the new syntax ``py==27``, ``py==36`` and ``py==37`` to avoid confusion.

  .. admonition:: Related links

    - **Selectors in conda-build documentation** (`Preprocessing selectors <https://docs.conda.io/projects/conda-build/en/latest/resources/define-metadata.html#preprocessing-selectors>`__)
    - **Linter: deprecate the use of py27, py36** (`conda-smithy/#1026 <https://github.com/conda-forge/conda-smithy/issues/1026>`__)


.. _mfaq_build_number_1000:

:ref:`(Q) <mfaq_build_number_1000>` **What do build numbers above 1000 signify? How do I treat them?**

  TL;DR: there is no need for build numbers larger than 1000 anymore.

  When you update a feedstock that still uses build numbers > 1000, the following rules apply:

    - when you increase the version, reset the build number back to 0 (e.g. ``1005 -> 0``).
    - when the version stays the same and you need to upload a new package, increase the build number by 1 (e.g. ``1005 -> 1006``).


  **Backstory:** Build numbers of 1000 and larger are a relic from the compiler migration, where a build number offset of 1000 signified that a package was migrated to the new compilers.
  Since the completion of the compiler migration, this offsetting is not needed anymore.
  However, we cannot simply subtract the offset without updating the version, due to higher build numbers being preferred by the solver.
  Therefore build numbers above 1000 will gradually vanish as packages get updated to newer versions.

.. _mfaq_windows_cmake:

:ref:`(Q) <mfaq_windows_cmake>` **How to fix CMake not finding MSBuild.exe on Azure Windows builds?**

   TL;DR: Use ``Ninja`` or ``NMake Makefiles JOM`` as the CMake generator (``cmake -G"Ninja"``), and add ``build`` requirements for ``ninja`` or ``jom``.

   Sadly in the Azure Windows images, `MSBuild.exe` is not correctly setup for CMake builds with the ``Visual Studio`` generators. To work around this, you can use a different CMake generator, e.g. ``cmake -GNinja`` or ``cmake -G"NMake Makefiles JOM"``. These two are preferred because they allow for concurrent builds in contrast to e.g. only using ``cmake -G"NMake Makefiles"``

.. _mfaq_anaconda_delay:

:ref:`(Q) <mfaq_anaconda_delay>` **Why does my new version appear on Anaconda Cloud, but is not installable with conda?**

   For certain, high-traffic channels (main & conda-forge), Anaconda uses a `CDN <https://cloudflare.com/learning/cdn/what-is-a-cdn/>`_ to decrease costs. The CDN is only reindexed every 20 minutes, however `Anaconda.org https://anaconda.org>`_ uses the original channel that the CDN mirrors.  Therefore, packages will show up on the `Anaconda Cloud https://anaconda.org>`_ about 20 to 40 minutes before they are downloadable via conda.  You can use ``conda search <pkg>``  to see if the package is installable, because this command reads from the CDN.

.. _mfaq_mamba_local:

:ref:`(Q) <mfaq_mamba_local>` **How can I make debugging solver failures on the CI faster?**

    An alternative to the conda solver is the mamba solver. The mamba solver has a faster solve speed and prints better error messages that make debugging simpler.
    
    You can configure the conda-forge CI to run a debug build using the mamba solver with the following changes:
    
      - Set ``build_with_mambabuild: True`` in ``conda-forge.yaml`` file
      - Rerender with ``conda-smithy`` (to rerender manually use ``conda smithy rerender`` from the command line)
    [Note: Builds made with ``mambabuild`` won't be uploaded to ``conda-forge``. These builds are purely for debugging purposes.]

    You can also do this locally by using: 
    
      - ``conda install boa -c conda-forge``
      - ``conda mambabuild myrecipe``
    For more details visit `this <https://boa-build.readthedocs.io/en/latest/mambabuild.html>`_ page. 
    
    .. _mfaq_conda_verify:

:ref:`(Q) <mfaq_conda_verify>` **I am seeing** ``Importing conda-verify failed`` **error message during build. What do I do?**

  ::
    
    Importing conda-verify failed. Please be sure to test your packages. conda install conda-verify to make this message go away.
    
You are seeing this error message because by default, conda-build uses conda-verify to ensure that your recipe and package meet some minimum sanity checks. 
This message can be safely ignored as conda-forge doesn't use conda-verify. 

  
  

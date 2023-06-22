.. _Becoming_involved:

Becoming involved
*****************

conda-forge is a community-driven effort of cross-platform packaging and relies on volunteers to sustain and improve.

We encourage you to contribute to conda-forge. You can do so in several ways:

 - `Contribute new packages <https://conda-forge.org/docs/maintainer/adding_pkgs.html>`_.
 - Help update and `maintain packages <https://conda-forge.org/docs/maintainer/updating_pkgs.html#maintaining-pkgs>`_.
 - Suggest or implement improvements for our `infrastructure <https://conda-forge.org/docs/maintainer/infrastructure.html#infrastructure>`_.
 - Help `improve the documentation <https://conda-forge.org/docs/user/contributing.html#improve-docs>`_.


.. _improve_docs:

Improve the documentation
===========================

The ``conda-forge`` documentation is version-controlled in the
`conda-forge.github.io repository
<https://github.com/conda-forge/conda-forge.github.io>`_ on GitHub. The source
text is stored in `the src/ subdirectory
<https://github.com/conda-forge/conda-forge.github.io/tree/main/src>`_ of this repository
(**not** the docs/ subdirectory) and
is formatted using Python’s `reStructuredText
<http://docutils.sourceforge.net/rst.html>`_ system.

You can propose quick edits directly through the GitHub website if you have
a GitHub account — for instance, `this link
<https://github.com/conda-forge/conda-forge.github.io/edit/main/src/user/contributing.rst>`_
will take you directly to a web-based editor for this very webpage. In
general, the file corresponding to each page in the GitHub browser has a
little pencil icon in its top-right corner that lets you open it up for editing.

We are glad to know that you would like to contribute to the ``conda-forge`` documentation. If you are new to the conda-forge community, follow the steps below to make your first contribution:

1. `Fork <https://help.github.com/articles/fork-a-repo/>`_ the
   `conda-forge.github.io repository
   <https://github.com/conda-forge/conda-forge.github.io>`_.

2. Clone this fork onto your local machine:

 - ``git clone https://github.com/<your-username>/conda-forge.github.io.git``

3. Create a new branch deriving from ``main`` to do your work:

 - ``git checkout -b <new-branch-name>``

4. Run the following commands:

 - ``conda env create -f ./.ci_scripts/environment.yml``
 - ``conda activate conda-forge-docs``
 - ``cd newsfeed && pip install --no-deps .``
 - ``cd ../src``

5. Make your changes and run the following command to check them:

 - ``make html``

 You can check the changes locally by opening the html files in ``src/_build/html``.

6. Add and commit your changes:

 - ``git add .``
 - ``git commit -m "your commit message"``

7. Submit a `pull request <https://help.github.com/articles/about-pull-requests/>`_ to the main repository proposing your changes.

Happy contributing!

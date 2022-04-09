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
2. `Clone <https://help.github.com/articles/cloning-a-repository/>`_ this fork onto your computer.
3. `Check out
   <https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging>`_
   a new branch deriving from ``master`` to do your work.
4. Make and `commit
   <https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository>`_
   your changes.
5. Submit a `pull request
   <https://help.github.com/articles/about-pull-requests/>`_ to the main repository proposing your changes.


.. _Guidelines:

Writing Guidelines
===========================

Follow these guidelines for contributing or amending conda-forge documentation:

1. For submitting or updating conda-build documentation, follow these rules.
2. Determine who your target audience is, their level of expertise, and how they will use the content.
3. Match the technical jargon to the audience's degree of understanding. It's preferable to underestimate rather than overestimate your readers' knowledge. Limit the usage of technical phrases to those that the user is likely to encounter. Use a glossary to augment definitions in the text if you need to define a large number of terms.
4. Use the active voice (e.g., click this) and speak directly to your audience (write "you" rather than "the user"). Use the "command" form of the verb to describe an action: "Choose an option from the menu and press Enter."
5. The format can be found in the `tutorial template <https://docs.conda.io/projects/conda-build/en/latest/resources/tutorial-template.html>`_. Do not number headings and use descriptive task and subtask names.

Happy contributing!

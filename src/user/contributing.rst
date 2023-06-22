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
<https://github.com/conda-forge/conda-forge.github.io>`__ on GitHub. The source
text is stored in `the src/ subdirectory
<https://github.com/conda-forge/conda-forge.github.io/tree/main/src>`__ of this repository and
is formatted using Python's `reStructuredText
<http://docutils.sourceforge.net/rst.html>`__ system.

Editing the documentation directly through Github
-------------------------------------------------

You can propose quick edits directly through the GitHub website if you have
a GitHub account — for instance, `this link
<https://github.com/conda-forge/conda-forge.github.io/edit/main/src/user/contributing.rst>`__
will take you directly to a web-based editor for this very webpage. In
general, the file corresponding to each page in the GitHub browser has a
little pencil icon in its top-right corner that lets you open it up for editing.

Editing the documentation locally
---------------------------------

We are glad to know that you would like to contribute to the ``conda-forge`` documentation. 
If you are new to the conda-forge community, follow the steps below to make your first contribution:

1. `Fork <https://help.github.com/articles/fork-a-repo/>`__ the
   `conda-forge.github.io repository
   <https://github.com/conda-forge/conda-forge.github.io>`__.

2. Clone this fork onto your local machine:

 - ``git clone https://github.com/<your-username>/conda-forge.github.io.git``
 - ``cd conda-forge.github.io``

3. Create a new branch deriving from ``main`` to do your work:

 - ``git checkout -b <new-branch-name>``

4. Run the following commands:

 - ``conda env create -f ./.ci_scripts/environment.yml``
 - ``conda activate conda-forge-docs``
 - ``cd newsfeed && pip install --no-deps .``
 - ``cd ../src``

5. Make your changes and run the following command to check them:

 - ``make html``

 You can check the changes locally by opening the html files in ``src/_build/html`` or running:
 
 - ``python -m http.server --directory src/_build/html``

6. Add and commit your changes:

 - ``git add .``
 - ``git commit -m "your commit message"``

7. Submit a `pull request <https://help.github.com/articles/about-pull-requests/>`__ to the main repository proposing your changes.

Happy contributing!

Writing guidelines
------------------
   
Some basic writing guidelines should be kept in mind before you start contributing:

1. Identify your audience and understand their skill level.
2. Match the technical language with the audience's skill level proficiency.
3. Try to keep it simple. In case you have to use a lot of complicated terms, provide a glossary of key terms.
4. Address the audience directly as the user(s).
5. While mentioning an action, use the "command" form of the verb: "Choose an option from the menu and press Enter."   
6. For references, provide links to related content. 
7. Use headings and bullet points, which makes it easier to read.
8. Avoid ambiguous titles. The title should include a clear description of the page's subject.
9. Check your spellings and grammar.

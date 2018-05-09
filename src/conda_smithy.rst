conda-smithy rerender
=====================

conda-forge  uses ``conda-smithy`` to re-render the feedstock and update the feedstock configuration.
This action updates the ``README``, CI configuration, the build matrix,
fix problems with the feedstock configuration, etc.

The bot issues re-rendering PRs every now and then,
but sometimes the users may need to issue them manually instead waiting for the bot.
Here is how, and when, to re-render.

How to re-render?
-----------------

There are 2 options,

    1. Using the webservice to run conda-smithy on the cloud. See `Automatic services <webservice.html>`_

    2. Run conda-smithy locally on your machine. To do this,

First step is to install ``conda-smithy`` in your root environment

.. code-block:: shell

    conda install -c conda-forge conda-smithy


now, from the root directory of the feedstock, type:

.. code-block:: shell

    conda smithy rerender [--commit {edit|auto}]


and commit the changes!

Optionally one can commit the changes automatically.
To do this use the ``--commit``/``-c`` option. By default, conda-smithy
will have git open an editor to write the commit message.
It will also provide a default commit message and
show the changes to be added. If you wish to do this automatically,
please just use ``--commit auto``/``-c auto`` and it will commit with
the stock re-rendering message.

Note that you may get a warning message regarding the tokens.
It is safe to ignore that as they are not needed for re-rendering.

When should we re-render?
-------------------------

We need to re-render when there are changes the following parts of the feedstock:

- the ``yum_requirements.txt``;
- the platform configuration (``skip`` sections);
- build issues that a feedstock configuration update will fix (follow us on `gitter <https://gitter.im/conda-forge/conda-forge.github.io>`_ to know about those);
- updates in the build matrix due to new versions of Python, NumPy, PERL, R, etc.

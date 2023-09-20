.. currentmodule:: conda_smithy.schema.models

Configuring conda-forge.yml
***************************

You can configure how conda-forge is set up and built via the ``conda-forge.yml``
file that is present in the root directory of a feedstock.

Rerendering the feedstock after you modify this file is usually required and always a good idea (see :ref:`dev_update_rerender`).

The next section describes in detail the top-level fields in  ``conda-forge.yml``.

Note that each top-level CI provider field supports the ``upload_packages`` option.
When set to False this will override the default behaviour of attempting to
upload packages to anaconda.org, which can be useful for testing. For example:

.. code-block:: yaml

    azure:
      upload_packages: False

.. _conda_forge_configuration:

Conda-forge model schema reference
==================================

.. autopydantic_model:: ConfigModel
    :members:
    :undoc-members:
    :show-inheritance:

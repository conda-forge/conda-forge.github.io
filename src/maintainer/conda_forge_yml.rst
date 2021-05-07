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


Top-level fields
================

* :ref:`appveyor`
* :ref:`azure-config`
* :ref:`build_platform`
* :ref:`build_with_mamba`
* :ref:`bot`
* :ref:`channel_priority`
* :ref:`channels`
* :ref:`choco`
* :ref:`circle`
* :ref:`conda_forge_output_validation`
* :ref:`docker`
* :ref:`github`
* :ref:`idle_timeout_minutes`
* :ref:`linux`
* :ref:`linux_aarch64`
* :ref:`linux_ppc64le`
* :ref:`os_version`
* :ref:`osx`
* :ref:`provider`
* :ref:`recipe_dir`
* :ref:`remote_ci_setup`
* :ref:`skip_render`
* :ref:`templates`
* :ref:`test_on_native_only`
* :ref:`travis`
* :ref:`upload_on_branch`
* :ref:`win`

.. _appveyor:

appveyor
--------
The top-level ``appveyor`` key specifies configurations for the Appveyor
CI service.  This is usually **read-only** and should not normally be manually
modified.  Tools like conda-smithy may modify this, as need.  It has a single
``secure`` field which contains the binstar token.  For example:

.. code-block:: yaml

    appveyor:
      secure:
        BINSTAR_TOKEN: <some big hash>

.. _azure-config:

azure
-----
This dictates the behavior of the Azure Pipelines CI service. It is a
mapping for Azure-specific configuration options. For example:

.. code-block:: yaml

    azure:
      # flag for forcing the building all supported providers
      force: False
      # toggle for storing the conda build_artifacts directory (including the
      # built packages) as an Azure pipeline artifact that can be downloaded
      store_build_artifacts: False

.. _self-hosted_azure-config:

Below is an example configuration for setting up a self-hosted Azure agent for Linux:

.. code-block:: yaml

      azure:
        settings_linux:
          pool:
            name: your_local_pool_name
            demands:
              - some_key -equals some_value
          workspace:
            clean: all
          strategy:
            maxParallel: 1


.. _bot:

bot
---
This field controls the behavior of the ``auto-tick`` bot which issues
automatic version updates/migrations for feedstocks. The current options are

.. code-block:: yaml

    bot:
      # can the bot automerge PRs it makes on this feedstock
      automerge: true
      # only automerge on successful version PRs, migrations are not automerged
      automerge: 'version'
      # only automerge on successful migration PRs, versions are not automerged
      automerge: 'migration'

      # only open PRs if resulting environment is solvable, useful for tightly coupled packages
      check_solvable: true

      # any branches listed in this section will get bot migration PRs in addition
      # to the default branch
      abi_migration_branches:
        - v1.10.x

.. _build_platform:

build_platform
--------------
This is a mapping from the build platform to the host platform of the package
to be built. For eg: following builds a ``osx-64`` platform from ``linux-64``
build platform using cross-compiling.

.. code-block:: yaml

    build_platform:
      osx_64: linux_64
      
.. _build_with_mamba:

build_with_mamba
--------------
This option, when enabled, configures the conda-forge CI to run a debug build using the ``mamba`` solver. Check `this <https://conda-forge.org/docs/maintainer/maintainer_faq.html#mfaq-mamba-local>`__ to know more.  

.. code-block:: yaml

    build_with_mamba:
      True   
          
.. _channel_priority:

channel_priority
----------------

This value sets the ``conda`` solver channel priority for feedstock builds. 
The default is ``strict``. Any valid value for the same setting in the ``.condarc`` is
allowed here.

.. _channels:

channels
--------
This represents the channels to grab packages from during builds and
which channels/labels to push to on anaconda.org after a package
has been built.  The ``channels`` variable is a mapping with
``sources`` and ``targets``, as follows:

.. code-block:: yaml

    channels:
      # sources selects the channels to pull packages from, in order.
      sources:
        - conda-forge
        - defaults
      # targets is a list of 2-lists, where the first element is the
      # channel to push to and the second element is the label on that channel
      targets:
        - ["conda-forge", "main"]

.. _choco:

choco
-----
This parameter allows for conda-smithy to run chocoloatey installs on Windows
when additional system packages are needed. This is a list of strings that
represent package names and any additional parameters. For example,

.. code-block:: yaml

    choco:
      # install a package
      - nvidia-display-driver

      # install a package with a specific version
      - cuda --version=11.0.3

This is currently only implemented for Azure Pipelines. The command that is run is
``choco install {entry} -fdv -y --debug``.  That is, ``choco install`` is executed
with a standard set of additional flags that are useful on CI.

.. _circle:

circle
--------
The top-level ``circle`` key specifies configurations for the Circle
CI service.  This is usually **read-only** and should not normally be manually
modified.  Tools like conda-smithy may modify this, as needed.  It has a single
``secure`` field which contains the binstar token.  For example:

.. code-block:: yaml

    appveyor:
      secure:
        BINSTAR_TOKEN: <some big hash>

.. _conda_forge_output_validation:

conda_forge_output_validation
-----------------------------

This field must be set to ``True`` for feedstocks in the ``conda-forge`` GitHub
organization. It enables the required feedstock artifact validation as described
in :ref:`output_validation`.

.. _docker:

docker
------
This is a mapping to docker configuration options. These are relatively
self-explanatory. The defaults are as follows:

.. code-block:: yaml

    docker:
      executable: docker
      image: "condaforge/linux-anvil-comp7"
      command: "bash"
      interactive: True

.. _github:

github
------
This is mapping of configuration variables for GitHub. The
defaults are as follows:

.. code-block:: yaml

    github:
      # name of the github organization
      user_or_org: conda-forge
      # repository name, usually filled in automatically
      repo_name: ""
      # branch name to execute on
      branch_name: master

.. _idle_timeout_minutes:

idle_timeout_minutes
--------------------
Configurable idle timeout that is either an int or None.  Used for packages that
don't have chatty enough builds. Currently only implemented in Travis and Circle.

.. code-block:: yaml

    idle_timeout_minutes: 60

.. _linux:

linux
-----
The Linux-specific configuration options. This is largely an internal setting.
Currently only:

.. code-block:: yaml

    linux:
      enabled: False

.. _linux_aarch64:

linux_aarch64
-------------
The ARM-specific configuration options. This is largely an internal setting.
Currently only:

.. code-block:: yaml

    linux_aarch64:
      enabled: False

.. _linux_ppc64le:

linux_ppc64le
-------------
The PPC-specific configuration options. This is largely an internal setting.
Currently only:

.. code-block:: yaml

    linux_ppc64le:
      enabled: False

.. _os_version:

os_version
----------
This key is used to set the OS versions for ``linux_*`` platforms. Valid entries map a linux platform and arch to either ``cos6``
or ``cos7``. Currently ``cos6`` is the default for ``linux-64``. All other linux architectures use CentOS 7. Here is an example that enables CentOS 7 on ``linux-64`` builds

.. code-block:: yaml

    os_version:
      linux_64: cos7

.. _osx:

osx
---
The macOSX-specific configuration options. This is largely an internal setting.
Currently only:

.. code-block:: yaml

    osx:
      enabled: False

.. _provider:

provider
--------
The ``provider`` field is a mapping from arch (operating system) to CI service.
This thus controls where a package is built. The following are available as
arches:

* ``linux``
* ``osx``
* ``win``
* ``linux_aarch64``
* ``linux_ppc64le``

The following CI services are available:

* ``azure``
* ``circle``
* ``travis``
* ``appveyor``
* ``None`` or ``False`` to disable a platform.
* ``default`` to enable a platform and choose an appropriate CI

For example, switching linux & osx to build on Travis Ci, with win on Appveyor:

.. code-block:: yaml

    provider:
      linux: travis
      osx: travis
      win: appveyor

Currently, x86_64 are enabled, but other arches are disabled by default. i.e. an empty
provider entry is equivalent to the following:

.. code-block:: yaml

    provider:
      linux: azure
      osx: azure
      win: azure
      linux_ppc64le: None
      linux_aarch64: None

To enable ``linux_ppc64le`` and ``linux_aarch64`` and the following:

.. code-block:: yaml

    provider:
      linux_ppc64le: default
      linux_aarch64: default

.. _recipe_dir:

recipe_dir
----------
The relative path to the recipe directory. The default is:

.. code-block:: yaml

    recipe_dir: recipe

.. _remote_ci_setup:

remote_ci_setup
---------------
This option can be used to override the default ``conda-forge-ci-setup`` package.
Can be given with ``${url or channel_alias}::package_name``, defaults to conda-forge
channel_alias if no prefix is given.

.. code-block:: yaml

    remote_ci_setup: "conda-forge-ci-setup=3"

.. _skip_render:

skip_render
-----------
This option specifies a list of files which conda smithy will skip rendering.
The possible values can be a subset of ``.gitignore``, ``.gitattributes``, ``README.md``, ``LICENSE.txt``.
The default value is an empty list [ ], i.e. all these four files will be generated by conda smithy.
For example, if you want to customize .gitignore and LICENSE.txt files on your own, you should have the following configuration.

.. code-block:: yaml

    skip_render:
      - .gitignore
      - LICENSE.txt

.. _templates:

templates
---------
This is mostly an internal field for specifying where templates files live.
You shouldn't need it.

.. _test_on_native_only:

test_on_native_only
-------------------
This is used for disabling testing for cross compiling. Default is ``false``

.. code-block:: yaml

    test_on_native_only: True

.. _travis:

travis
------
The top-level ``travis`` key specifies configurations for the Travis
CI service.  This is usually **read-only** and should not normally be manually
modified.  Tools like conda-smithy may modify this, as needed.  It has a single
``secure`` field which contains the binstar token.  For example:

.. code-block:: yaml

    travis:
      secure:
        BINSTAR_TOKEN: <some big hash>

.. _upload_on_branch:

upload_on_branch
----------------
This parameter restricts uploading access on work from certain branches of the
same repo. Only the branch listed in ``upload_on_branch`` will trigger uploading
of packages to the target channel. The default is to skip this check if the key
``upload_on_branch`` is not in ``conda-forge.yml``. To restrict uploads to the
master branch:

.. code-block:: yaml

    upload_on_branch: master

.. _win:

win
---
The Windows-specific configuration options. This is largely an internal setting.
Currently only:

.. code-block:: yaml

    win:
      enabled: False

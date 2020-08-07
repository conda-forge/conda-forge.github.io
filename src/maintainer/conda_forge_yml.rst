Configuring conda-forge.yml
***************************

You can configure how conda-forge is setup and builds via the ``conda-forge.yml``
file that is present in the root directory of a feedstock.

Rerendering the feedstock after you modify this file is usually required and always a good idea (see :ref:`dev_update_rerender`).

The next section describes in detail the top-level fields in  ``conda-forge.yml``.

Top-level fields
================

* appveyor
* azure
* build_platform
* bot
* channels
* circle
* compiler_stack
* docker
* github
* idle_timeout_minutes
* linux
* linux_aarch64
* linux_ppc64le
* max_py_ver
* max_r_ver
* min_py_ver
* min_r_ver
* osx
* provider
* recipe_dir
* skip_render
* templates
* test_on_native_only
* travis
* upload_on_branch
* win
* channel_priority


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

azure
-----
This dictates the behavior of the Azure Pipelines CI service. It is a
mapping for Azure-specific configuration options. For example:

.. code-block:: yaml

    azure:
      # flag for whether or not Azure should upload the packages
      # it builds to anaconda.org
      upload_packages: False
      # flag for forcing the building all supported providers
      force: False
      # toggle for storing the conda build_artifacts directory (including the
      # built packages) as an Azure pipeline artifact that can be downloaded
      store_build_artifacts: False

bot
---
This field controls the behavior of the ``auto-tick`` bot which issues
automatic version updates/migrations for feedstocks. The current options are

.. code-block:: yaml

    bot:
      # can the bot automerge PRs it makes on this feedstock
      automerge: True

build_platform
--------------
This is a mapping from the build platform to the host platform of the package
to be built. For eg: following builds a ``osx-64`` platform from ``linux-64``
build platform using cross-compiling.

.. code-block:: yaml

    build_platform:
      osx_64: linux_64

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


circle
--------
The top-level ``circle`` key specifies configurations for the Circle
CI service.  This is usually **read-only** and should not normally be manually
modified.  Tools like conda-smithy may modify this, as need.  It has a single
``secure`` field which contains the binstar token.  For example:

.. code-block:: yaml

    appveyor:
      secure:
        BINSTAR_TOKEN: <some big hash>

compiler_stack
--------------
Sets the compiler stack environment variable. The default is:

.. code-block:: yaml

    compiler_stack: "comp7"

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


idle_timeout_minutes
--------------------
Configurable idle timeout that is either an int or None.  Used for packages that
don't have chatty enough builds. Currently only implemented in Travis and Circle.

.. code-block:: yaml

    idle_timeout_minutes: 60


linux
-----
The Linux-specific configuration options. This is largely an internal setting.
Currently only:

.. code-block:: yaml

    linux:
      enabled: False


linux_aarch64
-------------
The ARM-specific configuration options. This is largely an internal setting.
Currently only:

.. code-block:: yaml

    linux_aarch64:
      enabled: False


linux_ppc64le
-------------
The PPC-specific configuration options. This is largely an internal setting.
Currently only:

.. code-block:: yaml

    linux_ppc64le:
      enabled: False

max_py_ver
----------
The maximum Python version to be built. The current default is:

.. code-block:: yaml

    max_py_ver: "37"

max_r_ver
----------
The maximum R version to be built. The current default is:

.. code-block:: yaml

    max_r_ver: "34"

min_py_ver
----------
The minimum Python version to be built. The current default is:

.. code-block:: yaml

    min_py_ver: "27"

min_r_ver
----------
The minimum R version to be built. The current default is:

.. code-block:: yaml

    min_r_ver: "34"

osx
---
The macOSX-specific configuration options. This is largely an internal setting.
Currently only:

.. code-block:: yaml

    osx:
      enabled: False

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

recipe_dir
----------
The relative path to the recipe directory. The default is:

.. code-block:: yaml

    recipe_dir: recipe

skip_render
-----------
This option specifies a list of files which conda smithy will skip rendering.
The possible values can be a subset of ``.gitignore``, ``.gitattributes``, ``README.md``, ``LICENSE.txt``.
The default value is an empty list [ ], i.e. all these four files will be generated by conda smithy.
For example, if you want to customize .gitignore and LICENSE.txt file by your own, you should have the following configuration.

.. code-block:: yaml

    skip_render:
      - .gitignore
      - LICENSE.txt

templates
---------
This is mostly an internal field for specifying where templates files live.
You shouldn't need it.

test_on_native_only
-------------------
This is used for disabling testing for cross compiling. Default is ``false``

.. code-block:: yaml

    test_on_native_only: True

travis
------
The top-level ``travis`` key specifies configurations for the Travis
CI service.  This is usually **read-only** and should not normally be manually
modified.  Tools like conda-smithy may modify this, as need.  It has a single
``secure`` field which contains the binstar token.  For example:

.. code-block:: yaml

    travis:
      secure:
        BINSTAR_TOKEN: <some big hash>

upload_on_branch
----------------
This parameter restricts uploading access on work from certain branches of the
same repo. Only the branch listed in ``upload_on_branch`` will trigger uploading
of packages to the target channel. The default is to skip this check if the key
``upload_on_branch`` is not in ``conda-forge.yml``. To restrict uploads to the
master branch:

.. code-block:: yaml

    upload_on_branch: master

win
---
The Windows-specific configuration options. This is largely an internal setting.
Currently only:

.. code-block:: yaml

    win:
      enabled: False

channel_priority
----------------

This value sets the ``conda`` solver channel priority for feedstock builds. On
OSX and Liunx, it defaults to ``strict``. On Windows, it defaults to the default in
``conda`` (``flexible`` at the time of writing). Any valid value for the same setting
in the ``.condarc`` is allowed here.

Writing the ``meta.yaml``
==========================
This document presents conda-forge rules, guidelines, and justifications
about writing the ``meta.yaml`` file.


Build from Tarballs, Not Repos
------------------------------
Conda-forge requires that building from tarballs using the
``url`` and ``fn`` keys in the ``build`` section. A recipe
should not use the ``git_url``, ``git_ver``, and similar
keys. There are three main reasons for this:

* Downloading the whole repo when you only need a single snapshot wastes
  the precious, constrained, and shared CI time and bandwidth.
* Repositories are not checksummed. Thus, using a tarball has a
  stronger guarantee that the download that is obtained to build from is
  in fact the intended package.
* On some systems (such as Windows), it is possible to not have permissions
  to remove a repo once it is created. This can be avoided by using a tarball.

If a package does not have the ability to build from a tarball, this is
considered a bug and should be reported upstream. In the worst case,
the source can be patched to include the relevant build information.


Packaging the License Manually
------------------------------
Certain software licenses, such as those in the GPL and Apache families,
require that the text of the license be distributed with the package.
This means that the ``about/license_file`` entry *must* be included in the
``meta.yaml``. Unfortunately, the license isn't always included in the
tarball of the source code.

To get around this, the licence should be put in the recipe directory.
It can then be refered to in the ``meta.yaml`` via,

.. code-block:: yaml

    about:
      license_file: '{{ environ["RECIPE_DIR"] }}/LICENSE'


Populating the ``hash`` Field
-----------------------------
If your package is on PyPI, you can get the md5 hash from your package's page
on PyPI; look for the ``md5`` link next to the download link for your package.

You can also generate a hash from the command line on Linux (and Mac if you
install the necessary tools below). If you go this route, the ``sha256`` hash
is preferable to the ``md5`` hash.

To generate the ``md5`` hash: ``md5 your_sdist.tar.gz``

To generate the ``sha256`` hash: ``openssl sha256 your_sdist.tar.gz``

You may need the openssl package, available on conda-forge
``conda install openssl -c conda-forge``.


Excluding a Platform
--------------------
Use the ``skip`` key in the ``build`` section along with a selector:

.. code-block:: yaml

    build:
        skip: true  # [win]

A full description of selectors is
`in the conda docs <http://conda.pydata.org/docs/building/meta-yaml.html#preprocessing-selectors>`_.


Pinning packages
----------------

Conda-smithy 3.0.0 switches to ``conda-build=3``. In conda-smithy 3.0.0, we use a central configuration file from conda-forge-pinning for the build matrices and versions of specific packages.

When a rerendering happens, conda-smithy will render the recipe using conda-build and output configuration files for each job and save them in a yaml file in ``.ci_support`` folder. For example there's a output configuration file for each OS, each python version, etc.

These output configuration files are stripped to options that are used in the build and therefore a change in the config files in ``.ci_support`` folder implies that there needs to be a new build.

Pinning of packages are handled by the same configuration file and conda-build. This means that packages need not be pinned manually. For eg:

.. code-block:: yaml

    requirements:
      host:
        - gmp 6.1.*
      run:
        - gmp 6.1.*

can be replaced by

.. code-block:: yaml

    requirements:
      host:
        - gmp

Note that gmp need not be in ``run`` requirements as ``run_exports`` feature of conda-build will add it automatically.

When there's a new ABI version of gmp (say 7.0), then conda-forge-pinning will be updated. A rerendering of a package using gmp will change. Therefore to check that a recipe needs to be rebuilt for updated pinnings, you only need to check if the package needs a rerender.

Note that ``boost`` and ``numpy`` are exceptions to this. See ``Building Against NumPy`` section.


Build matrices
---------------------

``conda-forge.yml``'s build matrices is removed in conda-smithy=3. To get a build matrix, create a ``conda_build_config.yaml`` file inside recipe folder. For example following will give you 2 builds and you can use the selector ``vtk_with_osmesa`` in the ``meta.yaml``

.. code-block:: yaml

    vtk_with_osmesa:
      - False
      - True

You need to rerender the feedstock after this change.

Currently, ``python, vc, r-base`` will create a matrix of jobs for each supported version. If ``python`` is only a build dependency and not a runtime dependency (eg: build script of the package is written in Python, but the package is not dependent on python), use ``build`` section

Following implies that ``python`` is only a build dependency and no Python matrix will be created.

.. code-block:: yaml

    build:
      - python
    host:


Following implies that ``python`` is a runtime dependency and a Python matrix for each supported python version will be created.

.. code-block:: yaml

    build:
      - python



Compilers
---------

Although ``conda-build=3`` gives the ability to use Anaconda 5 compilers, they should be used only on Windows as packages built with them are incompatible with conda-forge packages built using the CI compilers. All the packages in conda-forge needs to be rebuilt using the compilers and released simultaneously to avoid package incompatibility.

Following is suggested presently,

.. code-block:: yaml

    requirements:
      build:
        - {{ compiler('cxx') }}     # [win]
        - toolchain                 # [unix]

but in the future you should switch to ``{{`compiler('cxx') }}``. An announcement will be made when this should be done.

Reason for holding out using the Anaconda 5 compilers is that the packages built by them are sometimes incompatible with the packages built with the older compilers in CI platforms conda-forge has been using. All the dependencies of a package should be compiled (This is not true for all cases, but it's better to be cautious) with the new compilers before using the new compiler in a package. This presents a problem in that rebuilding a package will break the dependent packages. Therefore, ``conda-forge`` has decided to rebuild all of the packages and upload them all at once. More details on how this is done will be communicated in the future.


Building Against NumPy
----------------------
If you have a package which links\* against ``numpy`` you can build against the oldest possible version of ``numpy`` that is forwards compatible.
That can be achieved by pinning the host requirements and letting "free" the run requirements.
If you don't want to make things complicated you can use

.. code-block:: yaml

    host:
      - numpy
    run:
      - {{ pin_compatible('numpy', min_pin='x.x') }}


At the time of writing, above is equivalent to the following,

.. code-block:: yaml

    host:
      - numpy 1.9.3              # [unix]
      - numpy 1.11.3             # [win]
    run:
      - numpy >=1.9.3,<2.0.a0    # [unix]
      - numpy >=1.11.3,<2.0.a0   # [win]


However, these are not the oldest available ``numpy`` versions in conda-forge that you can use, if you need to support older versions,

.. code-block:: yaml

    host:
      - numpy 1.8.*  # [not (win and (py35 or py36))]
      - numpy 1.9.*  # [win and py35]
      - numpy 1.11.*  # [win and py36]
    run:
      - {{ pin_compatible('numpy', min_pin='x.x') }}


\* In order to know if your package links against ``numpy`` check for things like ``numpy.get_include()`` in your ``setup.py``,
or if the package uses ``cimport``.


.. admonition:: Notes

    1. you still need to respect minimum supported version of ``numpy`` for the package!
    That means you cannot use ``numpy 1.8`` if the project requires at least ``numpy 1.9``,
    adjust the minimum version accordingly!

    2. if your package supports ``numpy 1.7``, and you are brave enough :-),
    there are ``numpy`` packages for ``1.7`` available for Python 3.4 and 2.7 in the channel.


.. admonition:: Deprecated

    Adding ``numpy x.x`` to the host and run sections translates to a matrix pinned to all
    available numpy versions (e.g. 1.11, 1.12 and 1.13). In order to optimize CI ressources
    usage this option is now deprecated in favour of the apporach described above.

.. _noarch:

Building ``noarch`` packages
----------------------------

The ``noarch: python`` directive, in the ``build`` section, makes pure-Python
packages that only need to be built once. This drastically reduces the CI usage,
since it's only built once (on CircleCI), making your build much faster and
freeing resources for other packages.

``noarch: python`` can be used to build pure Python packages that:

* Do not perform any Python version specific code translation at install time (i.e. 2to3).

* Have fixed requirements; that is to say no conditional dependencies
  depending on the Python version, or the platform ran. (If you have for example
  ``backports # [py27])`` in the ``run`` section of ``meta.yml``, your package
  can't be noarch, yet.)

* Do not use selectors to ``skip`` building the recipe on a specific platform or
  for a specific version of python (e.g. ``skip: True  # [py2k]``).

Note that while ``noarch: python`` does not work with selectors, it does work
with version constraints, so ``skip: True  # [py2k]`` can sometimes be replaced
with a constrained python version in the build/run subsections:
say ``python >=3`` instead of just ``python``.

``noarch: python`` can also work with recipes that would work on a given platform
except that we don't have one of its dependencies available.
If this is the case, when the install runs ``conda`` will fail with an error
message describing which dependency couldn't be found.
If the dependency is later made available, your package will start working
without having to change anything.
Note though that since ``noarch`` packages are built on Linux, currently the
package must be installable on Linux.

To use it, just add ``noarch: python`` in the build section like,

.. code-block:: yaml

    build:
      noarch: python

If you're submitting a new recipe to ``staged-recipes``, that's all you need.
In an existing feedstock, you'll also need to :doc:`re-render the feedstock </conda_smithy>`,
or you can just ask :doc:`the webservice </webservice>` to add it for you and rerender:
say ``@conda-forge-admin, please add noarch: python`` in an open PR.


Build Number
------------
The build number is used when the source code for the package has not changed but you
need to make a new build. For example, if one of the dependencies of the package was
not properly specified the first time you build a package, then when you fix the
dependency and rebuild the package you should increase the build number.

When the package version changes you should reset the build number to ``0``.

.. _use-pip:

Use pip
-------
Normally Python packages should use this line:

.. code-block:: yaml

    build:
      script: python -m pip install --no-deps --ignore-installed .

as the installation script in the ``meta.yml`` file or ``bld.bat/build.sh`` script files,
while adding ``pip`` to the build requirements:

.. code-block:: yaml

    requirements:
      build:
        - pip

These options should be used to ensure a clean installation of the package without its
dependencies. This helps make sure that we're only including this package,
and not accidentally bringing any dependencies along into the conda package.

Note that the ``--no-deps`` line means that for pure-Python packages,
usually only ``python`` and ``pip`` are needed as ``build`` or ``host`` requirements;
the real package dependencies are only ``run`` requirements.


Downloading extra sources and data files
----------------------------------------
``conda-build 3`` supports multiple sources per recipe. Examples are available `in the conda-build docs <https://conda.io/docs/user-guide/tasks/build-packages/define-metadata.html#source-from-multiple-sources>`_.


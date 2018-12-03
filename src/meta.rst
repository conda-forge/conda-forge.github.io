
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

If your package is on PyPi_, you can get the sha256 hash from your package's page
on PyPI; look for the ``SHA256`` link next to the download link on your package's
files page, e.g. ``https://pypi.org/project/<your-project>/#files``.

You can also generate a hash from the command line on Linux (and Mac if you
install the necessary tools below). If you go this route, the ``sha256`` hash
is preferable to the ``md5`` hash.

To generate the ``sha256`` hash: ``openssl sha256 your_sdist.tar.gz``

You may need the openssl package, available on conda-forge
``conda install openssl -c conda-forge``.

.. _PyPi: https://pypi.org

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

Conda-smithy 3.0.0 switches to ``conda-build=3``. In conda-smithy 3.0.0, we use a central configuration file from
`conda-forge-pinning <https://github.com/conda-forge/conda-forge-pinning-feedstock/blob/master/recipe/conda_build_config.yaml>`_. for the build matrices and versions of specific packages.

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
      run:
        - gmp

When there's a new ABI version of gmp (say 7.0), then conda-forge-pinning will be updated. A rerendering of a package using gmp will change. Therefore to check that a recipe needs to be rebuilt for updated pinnings, you only need to check if the package needs a rerender.

Note that ``numpy`` is an exception to this. See ``Building Against NumPy`` section.

If a package is not in `conda-forge-pinning <https://github.com/conda-forge/conda-forge-pinning-feedstock/blob/master/recipe/conda_build_config.yaml>`_, then the pinning needs to be done manually. If the package is a ``C/C++`` library with a ``C/C++`` API that is consumed and linked to by other libraries, then that package is a candidate to be added to ``conda-forge-pinning``. Please open an issue in `conda-forge-pinning-feedstock <https://github.com/conda-forge/conda-forge-pinning-feedstock>`_ for discussion.

If the constraints in ``conda-forge-pinning`` are not strict enough, you can override them by changing back to pinning the package with a version manually. You can make a pinning stricter by adding ``{{ pin_compatible('gmp', max_pin='x.x.x') }}`` to run requirements.

If you need to remove a pinning in rare cases like linking the package statically or if the package is used with ``dlopen`` instead of linking, then you can do,

.. code-block:: yaml

    build:
      ignore_run_exports:
        - gmp

There is additional documentation on this pinning scheme in `the conda docs <https://conda.io/docs/user-guide/tasks/build-packages/variants.html#build-variants>`_.

Using conda-build's run_exports feature
---------------------------------------

Conda-build has a feature called "run_exports" that allows recipe builders to
specify what downstream consumers of their package need as runtime dependencies
when a given package is used as a build-time (host) dependency. There's
documentation on run_exports in `conda-build's documentation
<https://conda.io/docs/user-guide/tasks/build-packages/define-metadata.html#export-runtime-requirements>`_.
For conda-forge specifically, we encourage the use of run_exports, as it places
the burden of understanding binary compatibilty bounds on the upstream package
maintainers, rather than the downstream package consumers. We feel that the
upstream maintainers are more likely to understand the compatibility bounds of
their package. Downstream maintainers are still free to override any run_exports
entries, using the build/ignore_run_exports key, as documented in the
conda-build documentation.

When should you think about using run_exports for your package?

* Does your package produce a shared library that other people will link against?
* Does the version of your package used at build time determine which version of your package is required at run time?

If these are true, you should use run_exports. You can refer to your package
with the pin_subpackage jinja2 function, again described in conda-build's
documentation.

It is not always completely clear how a given package is going to be used. For
example, numpy may be used either as a python package, and it also has a C
library that can be linked against. The former usage would not require
run_exports, but the latter would. In this scenario, it may be advantageous to
split the package into distinct metapackages that may share a common parent
containing the actual files, but with each metapackage defining different
pinning behavior. Anaconda does this for numpy. You can see the recipe at
https://github.com/AnacondaRecipes/numpy-feedstock/blob/master/recipe/meta.yaml -
the general idea is that the numpy-devel package should be used when a package
is building against the C interface (i.e. it needs the compatibility bound), and
the numpy package should be used when a package is using only the python
interface.

In general, it is not necessary to split up packages. At conda-forge, we only
advise it when it greatly reduces package size, or when it helps remove
dependencies that would otherwise be unnecessarily included.

Build matrices
--------------

Currently, ``python, vc, r-base`` will create a matrix of jobs for each supported version. If ``python`` is only a build dependency and not a runtime dependency (eg: build script of the package is written in Python, but the package is not dependent on python), use ``build`` section

Following implies that ``python`` is only a build dependency and no Python matrix will be created.

.. code-block:: yaml

    build:
      - python
    host:
      - some_other_package


Note that ``host`` should be non-empty or ``compiler`` jinja syntax used or ``build/merge_build_host`` set to True for the ``build`` section to be treated as different from ``host``.

Following implies that ``python`` is a runtime dependency and a Python matrix for each supported python version will be created.

.. code-block:: yaml

    host:
      - python



``conda-forge.yml``'s build matrices is removed in conda-smithy=3. To get a build matrix, create a ``conda_build_config.yaml`` file inside recipe folder. For example following will give you 2 builds and you can use the selector ``vtk_with_osmesa`` in the ``meta.yaml``

.. code-block:: yaml

    vtk_with_osmesa:
      - False
      - True

You need to rerender the feedstock after this change.




Compilers
---------

``conda-build=3`` gives the ability to use Anaconda 5 compilers, ``conda-forge`` is not using these compilers yet. Reason for holding out on using the Anaconda 5 compilers is that the packages built by them are sometimes incompatible with the packages built with the older compilers in CI platforms conda-forge has been using. All the dependencies of a package should be compiled (This is not true for all cases, but it's better to be cautious) with the new compilers before using the new compiler in a package. This presents a problem in that rebuilding a package will break the dependent packages. Therefore, ``conda-forge`` has decided to rebuild all of the packages and upload them all at once. More details on how this is done will be communicated in the future.

However, using the ``{{ compiler('cxx') }}`` is supported in ``conda-forge``, but it installs the ``toolchain`` package which activates the compilers in the CI environment. If you were using ``toolchain`` or ``gcc`` build deps, consider using the following,

.. code-block:: yaml

    requirements:
      build:
        - {{ compiler('c') }}
        - {{ compiler('cxx') }}
        - {{ compiler('fortran') }}


Note that appropriate compiler runtime packages will be automatically added to the package's runtime requirements and therefore there's no need to specify ``libgcc`` or ``libgfortran``.  There is additional information about how conda-build 3 treats compilers in the `conda docs <https://conda.io/docs/user-guide/tasks/build-packages/compiler-tools.html>`_.


Building Against NumPy
----------------------
If you have a package which links\* against ``numpy`` you can build against the oldest possible version of ``numpy`` that is forwards compatible.
With conda-build 3, we can leave the pin empty for build-time, and conda-build will use the numpy key from conda_build_config.yaml. We can also utilize conda-build's dynamic pinning with its pin_compatible function to evaluate the numpy pin based on the version that actually gets used at build time.
If you don't want to make things complicated you can use

.. code-block:: yaml

    host:
      - numpy
    run:
      - {{ pin_compatible('numpy') }}


At the time of writing, above is equivalent to the following,

.. code-block:: yaml

    host:
      - numpy 1.9.3              # [unix]
      - numpy 1.11.3             # [win]
    run:
      - numpy >=1.9.3,<2.0.a0    # [unix]
      - numpy >=1.11.3,<2.0.a0   # [win]


\* In order to know if your package links against ``numpy`` check for things like ``numpy.get_include()`` in your ``setup.py``,
or if the package uses ``cimport``.


.. admonition:: Notes

    1. you still need to respect minimum supported version of ``numpy`` for the package!
    That means you cannot use ``numpy 1.9`` if the project requires at least ``numpy 1.12``,
    adjust the minimum version accordingly!

    .. code-block:: yaml

        host:
          - numpy 1.12.*
        run:
          - {{ pin_compatible('numpy') }}


    At the time of writing, above is equivalent to the following,

    .. code-block:: yaml

        host:
          - numpy 1.12.3
        run:
          - numpy >=1.12.3,<2.0.a0


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
      script: "{{ PYTHON }} -m pip install . -vv"

as the installation script in the ``meta.yml`` file or ``bld.bat/build.sh`` script files,
while adding ``pip`` to the host requirements:

.. code-block:: yaml

    requirements:
      host:
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


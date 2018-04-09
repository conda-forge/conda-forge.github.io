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


Using the Compilation ``toolchain``
-----------------------------------
Packages that need to compile code should add the ``toolchain`` package as a build dependency. This helps set up environment variables to instruct the compilers to do the right thing (e.g. building against the right version of the MacOS SDK).


Building Against NumPy
----------------------
If you have a package which links\* against ``numpy`` you can build against the oldest possible version of ``numpy`` that is forwards compatible.
That can be achieved by pinning the build requirements and letting "free" the run requirements.
If you don't want to make things complicated you can use

.. code-block:: yaml

    build:
      - numpy 1.11.*
    run:
      - numpy >=1.11

However, these are the oldest available ``numpy`` versions in conda-forge that you can use, if you need to support older versions than ``numpy 1.11``.

.. code-block:: yaml

    build:
      - numpy 1.8.*  # [not (win and (py35 or py36))]
      - numpy 1.9.*  # [win and py35]
      - numpy 1.11.*  # [win and py36]
    run:
      - numpy >=1.8  # [not (win and (py35 or py36))]
      - numpy >=1.9  # [win and py35]
      - numpy >=1.11  # [win and py36]

We will add older versions for ``Python 3.6`` on Windows soon.
That will allow us to simplify the minimum ``numpy`` to ``1.8`` across all platforms and Python versions.


\* In order to know if your package links against ``numpy`` check for things like ``numpy.get_include()`` in your ``setup.py``,
or if the package uses ``cimport``.


.. admonition:: Notes

    1. you still need to respect minimum supported version of ``numpy`` for the package!
    That means you cannot use ``numpy 1.8`` if the project requires at least ``numpy 1.9``,
    adjust the minimum version accordingly!

    2. if your package supports ``numpy 1.7``, and you are brave enough :-),
    there are ``numpy`` packages for ``1.7`` available for Python 3.4 and 2.7 in the channel.


.. admonition:: Deprecated

    Adding ``numpy x.x`` to the build and run sections translates to a matrix pinned to all
    available numpy versions (e.g. 1.11, 1.12 and 1.13). In order to optimize CI ressources
    usage this option is now deprecated in favour of the apporach described above.

.. _noarch:

Building ``noarch`` packages
----------------------------

The ``noarch: python`` can be used to build pure Python packages:

* that do not perform any Python version specific code translation at install time (i.e. 2to3);

* and have fixed requirements; that is to say no conditional dependencies
  depending on the Python version, or the platform ran. (If you have for example
  ``backports # [py27])`` in the ``run`` section of ``meta.yml``, your package
  can't be noarch, yet).

* and do not use selectors to ``skip`` building the recipe on a specific platform or
  for a specific version of python (e.g. ``skip: True  # [py2k]``).

The use of ``noarch: python`` will drastically reduce the CI usage as the
package will be built only once on ``CircleCI``, which will make your build much
faster, and free resources for other packages!

To use that just add ``noarch: python`` in the build section like,

.. code-block:: yaml

    build:
      noarch: python

and re-render with the feedstock with ``conda-smithy`` >=2.4.0


Build Number
------------
The build number is used when the source code for the package has not changed but you
need to make a new build. For example, if one of the dependencies of the package was
not properly specified the first time you build a package, then when you fix the
dependency and rebuild the package you should increase the build number.

When the package version changes you should reset the build number to ``0``.


Use pip
-------
Normally packages should use this line:

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
dependencies, which do not interact well with conda.


Downloading extra sources and data files
----------------------------------------
If you need additional source/data files for the build, download them using curl in the build script
and verify the checksum using openssl. Add curl and openssl to the build requirements and then you
can use curl to download and openssl to verify.

Example recipe is
`here <https://github.com/conda-forge/pari-feedstock/blob/187bb3bdd0a5e35b2ecaa73ed2ceddc4ca0c2f5a/recipe/build.sh#L27-L35>`_.

Upstream issue for allowing multiple source is
`here <https://github.com/conda/conda-build/issues/1466>`_.

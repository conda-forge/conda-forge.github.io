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


Building Against NumPy
----------------------
If you have a package which links against numpy you need to build and run against
the same version of numpy. Putting ``numpy x.x`` in the build and run requirements
ensures that a separate package will be built for each version of numpy that
conda-forge builds against.


Build Number
------------
The build number is used when the source code for the package has not changed but you
need to make a new build. For example, if one of the dependencies of the package was
not properly specified the first time you build a package, then when you fix the
dependency and rebuild the package you should increase the build number.

When the package version changes you should reset the build number to ``0``.


Single Verion, Externally Managed
---------------------------------
Many packages use ``python setup.py install --single-version-externally-managed --record record.txt``

These options should be added to setup.py if a project uses setuptools. The goal is to prevent ``setuptools``
from creating an ``egg-info`` directory because it does not interact well with conda.


Downloading extra sources and data files
----------------------------------------
If you need additional source/data files for the build, download them using curl in the build script
and verify the checksum using openssl. Add curl and openssl to the build requirements and then you
can use curl to download and openssl to verify.

Example recipe is 
`here <https://github.com/conda-forge/pari-feedstock/blob/187bb3bdd0a5e35b2ecaa73ed2ceddc4ca0c2f5a/recipe/build.sh#L27-L35>`_.

Upstream issue for allowing multiple source is 
`here <https://github.com/conda/conda-build/issues/1466>`_.

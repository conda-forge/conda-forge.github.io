# Core Dependency Tree Package Changes

conda-forge is moving to a new system for generating Core Dependency
Tree (CDT) packages. These changes include:

* CDT packages will no longer be built using feedstocks and this
practice is officially deprecated. 
* Any current CDT packages in
feedstocks will be moved to the new
[conda-forge/cdt-builds](https://github.com/conda-forge/cdt-builds) repo
and the feedstock will be archived. Members of core will be doing this
slowly on an as-needed basis, so it may not happen right away. 
* Requests for new CDTs should be submitted as PRs to the
[conda-forge/cdt-builds](https://github.com/conda-forge/cdt-builds)
repo.

These changes are being made so that conda-forge can provide access to
CentOS 7 / glibc 2.17 for `linux-64` builds. They will also move more of
the packages needed for conda-forge builds into the conda-forge channels
making builds more reliable.

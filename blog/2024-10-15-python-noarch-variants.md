---
authors:
  - isuruf
tags: [infrastructure]
---

# Noarch variant packages for Python packages on conda-forge

We introduce noarch variants for python packages on conda-forge
that have compiled extensions but with pure python reference
implementations to make life easier for early adopters of
new python variants.

<!-- truncate -->

conda-forge packages have always been batteries included. When
a package has some build options turned off by default to reduce
dependencies, we have enabled these options to give the most
functionality and performance to our users.

In the Python world, some packages are written in C/C++/Cython
to get the most performance out of a package. However these packages
sometimes have a reference implementation written in Python. The Python
reference implementation is a good way to check the C/C++/Cython
code against a much simpler python implementation and is also
useful for platforms like PyPy where the C/C++/Cython implementation
can be slower than the Python reference implementation due to the
emulation of the Python C/C++ API by PyPy. For eg: for the Cython
package, setting `CYTHON_NO_COMPILE` environment variable
when building the Cython wheel itself, it will use the Python reference
implementation. The only way to figure out if a package has a Python
reference implementation is to look at `setup.py` on packages that
provide such a file to see if `extensions` are built always or
with a switch.

To support platforms like PyPy, Some packages build wheels with
compiled extensions for the platforms that are
known to be more performant with the compiled extension, but also
provide a universal pure Python wheel for the other platforms.
This also provides a way for new Python versions and variants
like the free-threading Python build to use these packages by the
early adopters of these Python versions.

On conda-forge we usually have compiled Python packages, but provide
no reference implementation. This makes early adopters of new Python
versions to wait for the conda-forge bot managed by @conda-forge/bot
team to start the migration and rebuild the packages. For eg: the
free-threading Python 3.13 build is still not under way because
conda-forge has decided to wait until the default (GIL enabled)
Python 3.13 build has migrated enough and upstream packages have added
support for free-threading builds.
Another issue is that some packages have cyclic dependencies at build
or test time and this requires manual handling to reduce dependencies
before the migration and add the dependencies later on.

We have been adding `noarch: python` variants for some feedstocks
so that the compiled extension has higher priority and the pure
Python extension has lower priority which makes the conda solver
use the `noarch: python` variant. One issue is that the linter
might not like selectors on noarch recipes. We added an option

```yaml
linter:
  skip:
    - lint_noarch_selectors
```

to `conda-forge.yml` that will make the linter skip this warning/error.

We list some PRs here as a reference for conda-forge maintainers who
want to help out with this effort.

- [coverage](https://github.com/conda-forge/coverage-feedstock/pull/123)
- [cython](https://github.com/conda-forge/cython-feedstock/pull/147)
- [aiohttp](https://github.com/conda-forge/aiohttp-feedstock/pull/99)

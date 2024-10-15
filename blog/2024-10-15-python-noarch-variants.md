---
authors:
  - isuruf
tags: [infrastructure]
---

# Noarch variant packages for python packages on conda-forge

conda-forge packages have always been batteries included. When
a package has some build options by default to reduce dependencies
we have enabled these options to give the most functionality and
and performance to our users.

In the python world, some packages are written in C/C++/Cython
to get the most performance out of a package. However these packages
have reference implementation written in python. The python
reference implementation is a good way to check the C/C++/Cython
code against a much simpler python implementation and is also
useful for platforms like PyPy where the C/C++/Cython implementation
can be slower than the python reference implementation due to the
emulation of the Python C/C++ API by PyPy. For eg: for the Cython
package, setting ``CYTHON_NO_COMPILE`` environment variable
when building the cython wheel itself, it will use the python reference
implementation.

To support platforms like PyPy, Some packages build wheels with
compiled extensions for the platforms that are
known to be more performant with the compiled extension, but also
provide a universal pure python wheel for the other platforms.
This also provides a way for new python versions and variants
like the freethreading python build to use these packages by the
early adpoters of these python versions.

On conda-forge we usually have compiled python packages, but provide
no reference implementation. This makes early adpoters of new python
versions to wait for the conda-forge bot managed by @conda-forge/bot
team to start the migration and rebuild the packages. For eg: the
freethreading python 3.13 build is still not under way because
conda-forge has decided to wait until the default (GIL enabled)
python 3.13 build has migrated enough and upstream packages have added
support for freethreading builds.
Another issue is that some packages have cyclic dependencies at build
or test time and this requires manual handling to reduce dependencies
before the migration and add the dependencies later on.

We have been adding ``noarch: python`` variants for some feedstocks
so that the compiled extension has higher priority and the pure
python extension has lower priority which makes the conda solver
use the ``noarch: python`` variant. One issue is that the linter
might not like selectors on noarch recipes. We added an option

```yaml
linter:
  skip:
    - lint_noarch_selectors
```
to ``conda-forge.yml`` that will make the linter skip this warning/error.

We list some PRs here as a reference for conda-forge maintainers who
want to help out with this effort.

- [coverage](https://github.com/conda-forge/coverage-feedstock/pull/123)
- [cython](https://github.com/conda-forge/cython-feedstock/pull/147)
- [aiohttp](https://github.com/conda-forge/aiohttp-feedstock/pull/99)

# Compiler Upgrade to `GCC` `9.3.0`

We will be upgrading all `GCC`-based compilers to version `9.3.0` on all
platforms. This upgrade will not affect `C` or `C++` code, but will
require a rebuild of all feedstocks that use `FORTRAN` due to a change
in the `SONAME`. During this rebuild, we will keep the old compiler
versions in production, temporarily doubling the build matrix. Once the
migration is deemed complete, these old compiler versions will be
removed.

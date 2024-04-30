# Clang now available as compiler for all platforms

Our compiler stack per platform generally uses the "default" compiler for that
platform, see e.g. [here](https://conda-forge.org/docs/maintainer/infrastructure/#compilers-and-runtimes).

In practice, this meant that

```yaml
c_compiler:
  - gcc         # [linux]
  - clang       # [osx]
  - vs2019      # [win]
cxx_compiler:
  - gxx         # [linux]
  - clangxx     # [osx]
  - vs2019      # [win]
```

was the only possible choice for C/C++ compilers.

Recently, we finished adding preliminary support `clang` / `clangxx` as
C/C++ compilers also on osx and windows, starting from clang 18.
This is still very fresh, so bugs are possible, and we ask not to change
the default compilers on feedstocks unless there are compelling reasons.

In any case, it is now possible to use the following configuration in
`recipe/conda_build_config.yaml` (note the lack of platform selectors):

```yaml
c_compiler:
  - clang
c_compiler_version:
  - 18
cxx_compiler:
  - clangxx
cxx_compiler_version:
  - 18
```

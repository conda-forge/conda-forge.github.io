# Upcoming migration for `{{ stdlib("c") }}`

Almost since the inception of conda-forge, the baseline version of our standard
library ("stdlib") for C has not changed. This library comes with extra
complications because it is an essential part of the operating system, and one
of the few things that conda/mamba/etc. cannot ship safely.

As the ecosystem has moved on and many packages are starting to require newer
baseline versions, we need to follow suit at some point. However, to avoid
breaking users on older systems, we need to have infrastructure in place that
allows our packages to have sufficiently accurate metadata, such that conda can
avoid the installation of a package requiring a newer stdlib on an old system.

After many discussions across conda-forge stakeholders, the solution we arrived
at is the introduction of a new Jinja2-function `{{ stdlib("c") }}`, which
reflects that a given recipe requires a C stdlib. Making this relationship
explicit will make it easy to correctly reflect the requirement for newer
stdlib versions per feedstock, as well as in our global pinning.

Up until now, the stdlib was handled implicitly as part of the compiler stack.
In order to allow this transition to happen, we need to introduce this function
to essentially all compiled (i.e. not pure-Python) packages. This will be done
in stages, first for a single migration, and then attached to _all_ ongoing
migrations in conda-forge.

The logic of the piggyback migrator tries to correctly handle most scenarios,
but it is impossible to cover all corner cases. As for some general rules that
all feedstock maintainers are free to apply independently:

- if a feedstock uses a `- {{ compiler(...) }}` jinja in the build section,
  add a line with `- {{ stdlib("c") }}` to the build environment.
- if a feedstock uses `- sysroot_linux-64 2.17  # [linux64]` (or a variation),
  remove this line and add the following to your `conda_build_config.yaml`:
  ```
  c_stdlib_version:              # [linux]
    - 2.17                       # [linux]
  ```
- if a feedstock sets `MACOSX_DEPLOYMENT_TARGET` in `conda_build_config.yaml`,
  for example to 10.13 for `x86_64`, replace that section with the following
  (note, this does _not_ apply to `MACOSX_SDK_VERSION`!):
  ```
  c_stdlib_version:              # [osx and x86_64]
    - 10.13                      # [osx and x86_64]
  ```
  You should then also remove any line involving `__osx` from `meta.yaml`.

For more details, see this [issue](https://github.com/conda-forge/conda-forge.github.io/issues/2102).

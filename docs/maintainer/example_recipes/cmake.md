---
title: 'CMake packages'
---

If you want to package a CMake library to conda-forge, you can use this recipe template:

```yaml
context:
  version: "1.2.3"

package:
  name: example-package
  version: ${{ version }}

source:
  url: https://github.com/example-package/example-package/archive/refs/tags/v${{ version }}.tar.gz
  sha256: 0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef

build:
  number: 0
  script:
    content:
      - if: unix
        then:
          - cmake -B build -GNinja $CMAKE_ARGS .
          - cmake --build build --parallel ${CPU_COUNT}
        else:
          - cmake -B build -GNinja %CMAKE_ARGS% .
          - cmake --build build --parallel %CPU_COUNT%
      - ctest --test-dir build --output-on-failure
      - cmake --install build

requirements:
  build:
    - ${{ stdlib('c') }}
    - ${{ compiler('c') }}
    - ${{ compiler('cxx') }} # optional
    - cmake
    - ninja
  host:
    # put any dependencies here
  run_exports:
    - ${{ pin_subpackage('example-package', upper_bound='x.x.x') }}

tests:
  - package_contents:
      lib:
        - example_package

about:
  homepage: https://github.com/example-package/example-package
  summary: Summary of the package.
  description: |
    Description of the package
  license: LGPL-3.0-or-later
  license_file:
    - COPYING
  documentation: https://github.com/example-package/example-package
  repository: https://github.com/example-package/example-package

extra:
  recipe-maintainers:
    - LandoCalrissian
```

This recipe template supports different features:

- `$CMAKE_ARGS` (or `%CMAKE_ARGS%` on Windows) is set by conda-forge and contains flags needed for cross-compilation, installation prefix, and other platform-specific settings. Always pass it to the `cmake` configure step.
- `-GNinja` selects the Ninja build system generator, which is faster than the default Make generator.
- `--parallel ${CPU_COUNT}` passes the number of available CPUs to the build step to enable parallel compilation.
- `ctest --test-dir build --output-on-failure` runs the project's test suite during the build phase (while the build directory is still available) and prints output from any failing tests.
- `run_exports` with `pin_subpackage` ensures that downstream packages that depend on this library automatically get a compatible version pinned at build time.

If your project is a standalone executable rather than a library, you can remove the `run_exports` section and adjust the `package_contents` test to check `bin` instead of `lib`.

If your project does not use C++, you can remove the `${{ compiler('cxx') }}` line from the build requirements.

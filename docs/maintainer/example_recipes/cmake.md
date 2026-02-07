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
        else:
          - cmake -B build -GNinja %CMAKE_ARGS% .
      - cmake --build build
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

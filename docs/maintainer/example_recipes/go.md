---
title: 'Go packages'
---

If you want to package a Go package to conda-forge, you can use this recipe template:

```yaml
context:
  name: example-package
  version: "0.1.0"

package:
  name: ${{ name|lower }}
  version: ${{ version }}

source:
  url: https://github.com/example-package/${{ name }}/archive/refs/tags/v${{ version }}.tar.gz
  sha256: 0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef
  target_directory: src

build:
  number: 0
  script:
    - cd src
    - go-licenses save . --save_path ../library_licenses
    - if: unix
      then: go build -v -o $PREFIX/bin/example-package -ldflags="-s -w"
      else: go build -v -o %LIBRARY_BIN%\example-package.exe -ldflags="-s"

requirements:
  build:
    - ${{ compiler("go-nocgo") }}
    - go-licenses

tests:
  - script: example-package -help
  - package_contents:
    bin:
      - example-package
    strict: true

about:
  homepage: https://github.com/example-package/example-package
  summary: Summary of the package.
  description: |
    Description of the package
  license: MIT
  license_file:
    - src/LICENSE
    - library_licenses/
  documentation: https://pkg.go.dev/github.com/example-package/example-package
  repository: https://github.com/example-package/example-package

extra:
  recipe-maintainers:
    - LandoCalrissian
```

This recipe template supports different features:

- Package licenses of statically linked libraries.
- Ensure only binary is created by using `strict: true` in the `package_contents` tests.

If your package requires `cgo` instead of `go-nocgo`, you can use `${{ compiler("go-cgo") }}` instead to build the package. By default, the `go-nocgo` compiler [is used](https://github.com/conda-forge/staged-recipes/blob/main/.ci_support/linux64.yaml).

Sometimes, `go-licenses` might fail to detect licenses for some packages. In such cases, you can manually download the license file from the official source and add `--ignore github.com/bad-package/bad-package` to the `go-licenses` invokation. See [here](https://github.com/conda-forge/k9s-feedstock/blob/7929e0d86c829ba2ca172f08926f9fb7e6398247/recipe/recipe.yaml) for an example.

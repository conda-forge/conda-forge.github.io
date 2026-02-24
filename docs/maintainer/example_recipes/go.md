---
title: 'Go packages'
---

If you want to package a Go package to conda-forge, you can use this recipe template:

```yaml
context:
  version: "0.1.0"

package:
  name: example-package
  version: ${{ version }}

source:
  url: https://github.com/example-package/example-package/archive/refs/tags/v${{ version }}.tar.gz
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
    - if: unix
      then:
        - mkdir -p $PREFIX/share/zsh/site-functions $PREFIX/share/bash-completion/completions $PREFIX/share/fish/vendor_completions.d
        - $PREFIX/bin/example-package completion --shell zsh > $PREFIX/share/zsh/site-functions/_example-package
        - $PREFIX/bin/example-package completion --shell bash > $PREFIX/share/bash-completion/completions/example-package
        - $PREFIX/bin/example-package completion --shell fish > $PREFIX/share/fish/vendor_completions.d/example-package.fish

requirements:
  build:
    - ${{ compiler("go-nocgo") }}
    - go-licenses

tests:
  - script: example-package -help
  - package_contents:
      bin:
        - example-package
      files:
        - if: unix
          then:
            - share/bash-completion/completions/example-package
            - share/fish/vendor_completions.d/example-package.fish
            - share/zsh/site-functions/_example-package
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
- Generate shell completions for bash, zsh, and fish on Unix platforms. This assumes the binary supports a `completion --shell <shell>` subcommand.
  The completion files are installed to the [standard locations](https://pixi.sh/latest/global_tools/introduction/#shell-completions) under `$PREFIX/share/`.
  If your tool does not support generating completions, you can remove those build and test lines.
- Verify that both the binary and the shell completion files are present using `package_contents` tests, with `strict: true` to ensure no unexpected files are installed.

If your package requires `cgo` instead of `go-nocgo`, you can use `${{ compiler("go-cgo") }}` instead to build the package. By default, the `go-nocgo` compiler [is used](https://github.com/conda-forge/staged-recipes/blob/main/.ci_support/linux64.yaml). Using `${{ compiler("go-cgo")) }}` also requires `${{ compiler("c") }}` and `${{ stdlib("c") }}` and may require `${{ compiler("cxx") }}` if C++ code is compiled. C/C++ build tools such as `make`, `autoconf`, `automake`, `libtool` or `cmake` may also be needed.

Sometimes, `go-licenses` might fail to detect licenses for some packages. In such cases, you can manually download the license file from the official source and add `--ignore github.com/bad-package/bad-package` to the `go-licenses` invokation. See [here](https://github.com/conda-forge/k9s-feedstock/blob/7929e0d86c829ba2ca172f08926f9fb7e6398247/recipe/recipe.yaml) for an example.

Some packages ship multiple binaries, in which case the `go build` command needs to be run separately for each binary.
It is increasingly common for the go build command to require specifying a subdirectory, in which case the build steps would be slightly modified as shown below:

```bash
go-licenses save ./cmd/example-package --save-path ../library_licenses
go build -v -o ${PREFIX}/bin/example-package -ldflags="-s -w" ./cmd/example-package
```

Some older Go packages that are not using Go modules yet can be converted by using:

```bash
go mod init
go mod tidy
```

Additional steps maybe required depending on which Go dependency manager the project has been using.

Until [native macOS Arm runners are the default for conda-forge](https://github.com/conda-forge/conda-forge.github.io/issues/1781), you might need to set the following in `conda-forge.yml` to ensure that the `$PREFIX/bin/example-package completion --shell ...` steps work:

```yml
provider:
  osx_arm64: azure
```

Generating the completions only works when running the native binary which doesn't work with `osx-64 -> osx-arm64` cross-compilation.

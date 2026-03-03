---
title: 'Rust packages'
---

If you want to package a Rust package to conda-forge, you can use this recipe template:

```yaml
context:
  version: "0.1.0"

package:
  name: example-package
  version: ${{ version }}

source:
  url: https://github.com/example-package/example-package/archive/refs/tags/v${{ version }}.tar.gz
  sha256: 0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef

build:
  number: 0
  script:
    env:
      CARGO_PROFILE_RELEASE_STRIP: symbols
      CARGO_PROFILE_RELEASE_LTO: fat
    content:
      - if: unix
        then:
          - cargo auditable install --locked --no-track --bins --root ${{ PREFIX }} --path .
        else:
          - cargo auditable install --locked --no-track --bins --root %LIBRARY_PREFIX% --path .
      - cargo-bundle-licenses --format yaml --output ./THIRDPARTY.yml
      - if: unix
        then:
          - mkdir -p $PREFIX/share/zsh/site-functions $PREFIX/share/bash-completion/completions $PREFIX/share/fish/vendor_completions.d
          - $PREFIX/bin/example-package completion --shell zsh > $PREFIX/share/zsh/site-functions/_example-package
          - $PREFIX/bin/example-package completion --shell bash > $PREFIX/share/bash-completion/completions/example-package
          - $PREFIX/bin/example-package completion --shell fish > $PREFIX/share/fish/vendor_completions.d/example-package.fish

requirements:
  build:
    - ${{ stdlib('c') }}
    - ${{ compiler('c') }}
    - ${{ compiler('rust') }}
    - cargo-bundle-licenses
    - cargo-auditable

tests:
  - script: example-package --help
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
  license: MIT OR Apache-2.0
  license_file:
    - LICENSE-APACHE
    - LICENSE-MIT
    - THIRDPARTY.yml
  documentation: https://docs.rs/example-package
  repository: https://github.com/example-package/example-package

extra:
  recipe-maintainers:
    - LandoCalrissian
```

This recipe template supports different features:

- `CARGO_PROFILE_RELEASE_STRIP=symbols` in order to reduce the size of the package by removing unnecessary symbols.
- `CARGO_PROFILE_RELEASE_LTO=fat` in order to optimize the binary for better performance.
- `cargo auditable install` in order to ensure the package is auditable.
- Bundle licenses of statically linked libraries.
- Use `--no-track` to not create `$PREFIX/.crates.toml` and `$PREFIX/.crates2.json`.
- Generate shell completions for bash, zsh, and fish on Unix platforms. This assumes the binary supports a `completion --shell <shell>` subcommand.
  The completion files are installed to the [standard locations](https://pixi.sh/latest/global_tools/introduction/#shell-completions) under `$PREFIX/share/`.
  If your tool does not support generating completions, you can remove those build and test lines.
- Verify that both the binary and the shell completion files are present using `package_contents` tests, with `strict: true` to ensure no unexpected files are installed.

Until [native macOS Arm runners are the default for conda-forge](https://github.com/conda-forge/conda-forge.github.io/issues/1781), you might need to set the following in `conda-forge.yml` to ensure that the `$PREFIX/bin/example-package completion --shell ...` steps work:

```yml
provider:
  osx_arm64: azure
```

Generating the completions only works when running the native binary which doesn't work with `osx-64 -> osx-arm64` cross-compilation.

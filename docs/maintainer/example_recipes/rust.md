---
title: 'Rust packages'
---

If you want to package a Rust package to conda-forge, you can use this recipe template:

```yaml
context:
  name: example-package
  version: "0.1.0"

package:
  name: {{ name|lower }}
  version: {{ version }}

source:
  url: https://github.com/example-package/{{ name }}/archive/refs/tags/v{{ version }}.tar.gz
  sha256: 0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef

build:
  number: 0
  script:
    env:
      CARGO_PROFILE_RELEASE_STRIP: symbols
      CARGO_PROFILE_RELEASE_LTO: fat
    content:
      - cargo auditable install --locked --no-track --bins --root {{ PREFIX }} --path .
      - cargo-bundle-licenses --format yaml --output ./THIRDPARTY.yml

requirements:
  build:
    - {{ stdlib('c') }}
    - {{ compiler('c') }}
    - {{ compiler('rust') }}
    - cargo-bundle-licenses
    - cargo-auditable

tests:
  - script: example-package --help

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

---
title: 'maturin abi3 packages'
---

This guide shows you how to create a conda-forge recipe for a Python package with a
compiled Rust extension built with [maturin](https://maturin.rs/) using CPython's
stable [`abi3` ABI](https://docs.python.org/3/c-api/stable.html).

Building against the stable ABI means a single compiled artifact works across many Python
versions, so the package can be shipped as a
[Python version-independent](https://docs.conda.io/projects/conda-build/en/stable/resources/define-metadata.html#python-version-independent-packages)
package. Instead of one build per Python version, you build once against the minimum
supported Python and reuse it everywhere.

For more general information on abi3 packages, see the
[knowledge base](../knowledge_base.mdx#abi3).

## Recipe template

```yaml title="recipe.yaml"
context:
  version: "1.2.3"

package:
  name: example-package
  version: ${{ version }}

source:
  url: https://pypi.org/packages/source/e/example-package/example_package-${{ version }}.tar.gz
  sha256: 9899b001e26a6d9c0930cd4138a7c7c9d23629dc949b39ae42c25e2d05c2145d

build:
  number: 1
  skip: is_abi3 and not is_python_min
  python:
    version_independent: ${{ is_abi3 }}
  script:
    env:
      CARGO_PROFILE_RELEASE_STRIP: symbols
      CARGO_PROFILE_RELEASE_LTO: fat
    content:
      # Remove this wrapper once https://github.com/conda-forge/rust-activation-feedstock/pull/79 is merged
      - if: unix
        then:
          - mkdir -p "${BUILD_PREFIX}/bin"
          - cp "${RECIPE_DIR}/cargo-auditable-wrapper.sh" "${BUILD_PREFIX}/bin/cargo-auditable-wrapper"
          - export CARGO="cargo-auditable-wrapper"
        else:
          - copy "%RECIPE_DIR%\cargo-auditable-wrapper.bat" "%BUILD_PREFIX%\Library\bin\cargo-auditable-wrapper.bat" || exit 1
          - set CARGO=cargo-auditable-wrapper.bat
      - cargo-bundle-licenses --format yaml --output THIRDPARTY.yml
      - python -m pip install . --no-deps --ignore-installed -vv --no-build-isolation --disable-pip-version-check

requirements:
  build:
    - ${{ compiler('rust') }}
    - ${{ stdlib('c') }}
    - cargo-bundle-licenses
    - cargo-auditable
  host:
    - python
    - if: is_abi3
      then: python-abi3
    - pip
    - maturin
  run:
    - python

tests:
  - python:
      python_version:
        - ${{ python_min }}.*
        - '*'
      imports:
        - example_package
      pip_check: true
  - if: is_abi3
    then:
      script:
        - if: win
          then: abi3audit %PREFIX%/Lib/site-packages/example_package/_native.pyd -s -v --assume-minimum-abi3 ${{ python_min }}
          else: abi3audit $SP_DIR/example_package/_native.abi3.so -s -v --assume-minimum-abi3 ${{ python_min }}
      requirements:
        run:
          - abi3audit

about:
  homepage: https://github.com/example/example-package
  summary: Single-line summary of the package.
  license: MIT
  license_file:
    - LICENSE
    - THIRDPARTY.yml
  documentation: https://example.com/example-package-docs/
  repository: https://github.com/example/example-package

extra:
  recipe-maintainers:
    - LandoCalrissian
```

Both `is_abi3` and `is_python_min` are provided by conda-forge's build matrix. This lets the
same recipe fall back to a regular per-Python build if abi3 is ever disabled, without
further changes.

`python-abi3` (when `is_abi3`): Ensures the extension is built and linked against the stable ABI.
This package pins the abi3 toolchain so the resulting artifact is compatible across Python versions.

:::note

If your package doesn't support abi3, remove all abi3-related things from the recipe to build it.

### The `cargo-auditable-wrapper`

`cargo-auditable` embeds a dependency manifest into the compiled artifact so it can later be
audited. The plain `cargo auditable install` used for standalone binaries does not fit the
maturin flow, because maturin invokes `cargo` itself. Instead, point the `CARGO` environment
variable at a small wrapper that transparently forwards every invocation through
`cargo auditable`. Add both wrapper scripts next to `recipe.yaml`:

```sh title="cargo-auditable-wrapper.sh"
#!/bin/sh
exec cargo auditable $*
```

```bat title="cargo-auditable-wrapper.bat"
@echo off
cargo auditable %*
```

:::note

These wrappers are a temporary workaround. Once
[rust-activation-feedstock#79](https://github.com/conda-forge/rust-activation-feedstock/pull/79)
is merged, `cargo auditable` will be wired up automatically and the wrappers can be removed.

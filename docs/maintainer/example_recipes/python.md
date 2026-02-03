---
title: 'Python packages'
---

If you want to package a pure-Python package to conda-forge, you can use this recipe template:

You can also use `rattler-build generate-recipe pypi <package-name> --write` to generate a similar recipe automatically.
This is not guaranteed to be perfect, but it can be a helpful starting point.
Compare it with this example recipe to ensure everything is correct.

Rattler-build documentation for the v1 recipe format can be found [here](https://rattler-build.prefix.dev/latest/tutorials/python/).

```yaml
schema_version: 1

context:
  version: 1.2.3
  python_min: "3.10"

package:
  name: example-package
  version: ${{ version }}

source:
  url: https://pypi.org/packages/source/e/example-package/example_package-${{ version }}.tar.gz
  # Run `openssl sha256 <artifact>` to get its hash
  sha256: 12ff4785d337a1bb490bb7e9c2b1ee5da3112e94a8622f26a6c77f5d2fc6842a

build:
  noarch: python
  number: 0
  # The build script is a minimal pip install command.
  # `${{ PYTHON }} -m`: ensures the correct python interpreter is used.
  # `--no-deps`: dependencies need to be specified in the `requirements.run` section. This avoids vendoring dependencies.
  # `--no-build-isolation`: ensures that the `host` environment is used to build the package (instead of creating a new virtualenv).  
  script: ${{ PYTHON }} -m pip install . -vv --no-deps --no-build-isolation
  # When you package has a command line interface, you can also add entry points here.
  # entry_points:
  #   - example-cli=example_package.cli:main


requirements:
  # Note that there is no `build` section here, as pure-Python packages do not need a compiler.
  host:
    # Use python_min to build against the minimum supported python version
    - python ${{ python_min }}.*
    # Define the build backend dependencies (hatchling, flint, setuptools, poetry-core, uv-build, etc.)
    - hatchling
    # Add pip to be able to run the pip install command in the build script
    - pip
  run:
    # Define the python version dependency as minimum version and higher
    # Don't specify an upper bound unless absolutely necessary to avoid future conflicts.
    - python >=${{ python_min }}
    # Add the dependencies of your package here e.g.:
    - click >=7.0
    - requests
    - numpy

tests:
  # Use the default python testing framework
  - python:
      # Test import works
      imports:
        - example-package
      # Test against the minimum supported python version
      python_version: ${{ python_min }}.*
      # Run `pip check` to ensure all dependencies are satisfied
      pip_check: true
  # Optionally, add command line tests if your package provides CLI tools
  # - script: example-package --help

about:
  homepage: https://example.com/example-package
  license: BSD-3-Clause
  license_file: LICENSE
  summary: Single-line summary of the package.
  description: |
    One or two paragraphs with more information about the package.
  repository: https://github.com/example/example-package/
  documentation: https://example.com/example-package-docs/
  
extra:
  recipe-maintainers:
    - you
    - the-package-maintainer
    - another-maintainer
```


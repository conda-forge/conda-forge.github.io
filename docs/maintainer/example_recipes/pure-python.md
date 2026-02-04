---
title: 'pure-Python packages'
---

This guide shows you how to create a conda-forge recipe for a pure-Python package (a package that contains only Python code and no compiled extensions).

## Auto-generate the recipe

Using `rattler-build generate-recipe` (generates v1 format):

```bash
rattler-build generate-recipe pypi <package-name> --write
```

For more information about the v1 recipe format, see the [rattler-build documentation](https://rattler-build.prefix.dev/latest/tutorials/python/).
Note that the generated recipe is a starting point and may need adjustments based on the package's specific requirements.

## Recipe template

```yaml title="recipe.yaml"
schema_version: 1

context:
  version: 1.2.3
  python_min: "3.10"

package:
  name: example-package
  version: ${{ version }}

source:
  url: https://pypi.org/packages/source/e/example-package/example_package-${{ version }}.tar.gz
  sha256: 12ff4785d337a1bb490bb7e9c2b1ee5da3112e94a8622f26a6c77f5d2fc6842a

build:
  noarch: python
  number: 0
  script: ${{ PYTHON }} -m pip install . -vv --no-deps --no-build-isolation

requirements:
  host:
    - python ${{ python_min }}.*
    - hatchling
    - pip
  run:
    - python >=${{ python_min }}
    - click >=7.0
    - requests
    - numpy

tests:
  - python:
      imports:
        - example-package
      python_version:
        - ${{ python_min }}.*
        - *
      pip_check: true

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

### The source section

```yaml
source:
  url: https://pypi.org/packages/source/e/example-package/example_package-${{ version }}.tar.gz
  sha256: 12ff4785d337a1bb490bb7e9c2b1ee5da3112e94a8622f26a6c77f5d2fc6842a
```

- `url`: The PyPI source URL follows the pattern `https://pypi.org/packages/source/<first-letter>/<package-name>/<package-name>-<version>.tar.gz`. Note that the package name in the URL may use underscores instead of hyphens (e.g., `example_package` vs `example-package`).
- `sha256`: The SHA256 hash of the source archive. Run `openssl sha256 <artifact>` to get its hash after downloading the source file.

### The build section

```yaml
build:
  noarch: python
  number: 0
  script: ${{ PYTHON }} -m pip install . -vv --no-deps --no-build-isolation
```

- `noarch: python`: Indicates that this is a pure-Python package and can be installed on any architecture.
- `number`: The build number, starting at 0. Increment this when rebuilding the same version with recipe changes.
- `script`: The build script uses pip to install the package:
  - `${{ PYTHON }} -m pip install`: Ensures the correct Python interpreter is used.
  - `-vv`: Verbose output for debugging build issues.
  - `--no-deps`: Prevents pip from installing dependencies itself, as these are specified in the `requirements.run` section.
  - `--no-build-isolation`: Ensures that the `host` environment is used to build the package (instead of creating a new virtualenv).

#### Entry points

If your package has a command line interface, you can add entry points to the build section:

```yaml
build:
  entry_points:
    - example-cli=example_package.cli:main
```

This creates a `example-cli` command that calls the `main` function from `example_package.cli`.

### The requirements section

```yaml
requirements:
  host:
    - python ${{ python_min }}.*
    - hatchling
    - pip
  run:
    - python >=${{ python_min }}
    - click >=7.0
    - requests
    - numpy
```

Pure-Python packages typically only need `host` and `run` requirements. There is no `build` section needed, as pure-Python packages do not require a compiler.

#### Host requirements

- `python ${{ python_min }}.*`: Use `python_min` to build against the minimum supported Python version.
- Build backend dependencies: Specify the build system your package uses (e.g., `hatchling`, `flit`, `setuptools`, `poetry-core`, `uv-build`). Check your package's `pyproject.toml` to see which build backend is specified in the `[build-system]` section.
- `pip`: Required to run the pip install command in the build script.

#### Run requirements

Add your package's runtime dependencies here. These should match what's specified in your package's `pyproject.toml` or `setup.py`.

- `python >=${{ python_min }}`: Define the Python version dependency as minimum version and higher. Don't specify an upper bound unless absolutely necessary to avoid future conflicts.

### The tests section

```yaml
tests:
  - python:
      imports:
        - example-package
      python_version: ${{ python_min }}.*
      pip_check: true
```

- `imports`: List the Python modules to import to verify the package installed correctly. This ensures basic functionality.
- `python_version`: Test against the minimum supported Python version to ensure compatibility.
- `pip_check`: Runs `pip check` to ensure all dependencies are satisfied and there are no conflicts.

#### Command line tests

If your package provides CLI tools, you can add command line tests:

```yaml
tests:
  - script:
      - example-cli --help
      - example-cli --version
```

## More information

- Rattler-build Python tutorial: https://rattler-build.prefix.dev/latest/tutorials/python/
- Examples of Python recipes on conda-forge:
  - [attrs](https://github.com/conda-forge/attrs-feedstock/blob/main/recipe/recipe.yaml)
  - [click](https://github.com/conda-forge/click-feedstock/blob/main/recipe/recipe.yaml)
  - [requests](https://github.com/conda-forge/requests-feedstock/blob/main/recipe/recipe.yaml)
  - [rich](https://github.com/conda-forge/rich-feedstock/blob/main/recipe/recipe.yaml): Multi output example

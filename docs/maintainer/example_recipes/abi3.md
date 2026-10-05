---
title: 'Python abi3 packages'
---

Packages built against Python's [stable ABI (`abi3`)](https://docs.python.org/3/c-api/stable.html) are compiled once and run on every supported Python version, so a single build covers them all.

conda-forge keeps full example recipes in the [`python-abi3-feedstock`](https://github.com/conda-forge/python-abi3-feedstock) repository:

- [`example-recipe.yaml`](https://github.com/conda-forge/python-abi3-feedstock/blob/main/recipe/example-recipe.yaml) (v1 format)
- [`example-meta.yaml`](https://github.com/conda-forge/python-abi3-feedstock/blob/main/recipe/example-meta.yaml) (v0 format)

# Removing `wheel` and `setuptools` as Dependencies for `pip`

Starting with Python 3.13, `pip` on Python 3.13 will no longer have `setuptools` and `wheel` as dependencies
by default. While this default made sense at the time `conda-forge` was started (over 8 years ago!),
with the advent of Python packaging build backends (e.g., `flit`, `poetry`, `hatchling`, etc.),
this default is no longer correct. Instead, you will need to specify `wheel` and/or `setuptools` explicitly in the `host`
section of your recipe if you need them. At first, `pip` for versions of Python before 3.13 will be unaffected.
However, after the completion of the Python 3.13 migration, we will remove these dependencies from `pip` for all
versions of Python. Follow GitHub issue [#2252](https://github.com/conda-forge/conda-forge.github.io/issues/2252)
for more information and updates.

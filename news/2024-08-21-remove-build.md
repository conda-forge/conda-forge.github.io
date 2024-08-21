# Removing `build` in favor of `python-build`

For nearly two years now, we have favored the use `python-build` as the package name for the PyPA [`build`](https://github.com/pypa/build)
project over `build`. In fact, the `build` package on `conda-forge` is archived and has not had its version
updated. To complete this transition, we are going to mark all existing `build` packages as broken, provide
a more detailed linter hint, and turn off the migration infrastructure we've been using to help move feedstocks.
Any questions or comments can be directed to the [GitHub issue](https://github.com/conda-forge/conda-forge.github.io/issues/2269) on this work.

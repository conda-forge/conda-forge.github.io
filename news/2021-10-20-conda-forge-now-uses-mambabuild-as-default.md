# conda-forge now uses mambabuild as default

conda-forge now uses [mamba](https://github.com/mamba-org/mamba) during
the build process (via `conda mambabuild` of the
[boa](https://github.com/mamba-org/boa) project). This was changed in
[conda-smithy
3.13.0](https://github.com/conda-forge/conda-smithy/blob/main/CHANGELOG.rst#v3130)
and should automatically apply when re-rendering.

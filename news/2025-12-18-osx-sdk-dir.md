# macOS SDK directory changed

Starting with conda-smithy 3.54.0, the generated build scripts for macOS
will no longer use the system SDK directory for downloading the SDK versions
we require, but will use a dedicated `/opt/conda-sdks` directory instead.
Users performing local builds will need to choose a writable directory,
and provide the path to it via the environment variable `OSX_SDK_DIR`.

This change may result in some build systems, particularly CMake,
storing paths to this temporary build directory in installed metadata.
Feedstocks will need to substitute the stored paths with path-agnostic
solutions (for example, see [substitutions in
openpmd-api-feedstock](https://github.com/conda-forge/openpmd-api-feedstock/blob/15f9b3648f087d3e06331d6ec9ddff0710300593/recipe/build.sh#L100-L107))
or the correct sysroot paths (for example, see [substitutions in
cartographer-feedstock](https://github.com/conda-forge/cartographer-feedstock/blob/1812f8c13bccbad20daf6ba079f7722cace93a15/recipe/conda_build_config.yaml#L19-L23)).

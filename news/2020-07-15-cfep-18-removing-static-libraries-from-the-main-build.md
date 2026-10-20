# `CFEP-18:` Removing static libraries from the main build

With [CFEP-18](https://github.com/conda-forge/cfep/blob/main/cfep-18.md)
we now have a policy on how to deal with static packages. The most
important change here is that we will be removing static libraries from
the main packages and moving them to `-static` suffixed packages.
`-static` packages will not be built by default but only on request.

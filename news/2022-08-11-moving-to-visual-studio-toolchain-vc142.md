# Moving to Visual Studio toolchain `vc142`

Microsoft has deprecated the Visual Studio (VS) 2017 compiler and
removed it from all the CI they control (notably Azure Pipelines &
Github Actions). This means that the default toolchain (== C/C++
compiler, linker, standard libraries, and related utilities) of that VS
version - vc141 - is getting less and less use in upstream libraries
(because public hosted CI doesn't use it anymore by default), and
therefore support for it is bitrotting at an accelerating pace. We are
therefore
[planning](https://github.com/conda-forge/conda-forge-pinning-feedstock/pull/3167)
to move our toolchain on windows to vc142 (the default in VS2019) in two
weeks, on 2022-08-25.

This will not affect you as a general user of conda-forge packages on
windows; the only impact is that if you are locally compiling against
artefacts produced by conda-forge and are still using VS2017 yourself,
you will need to upgrade your compiler (VS2019 is a drop-in replacement
& ABI-compatible).

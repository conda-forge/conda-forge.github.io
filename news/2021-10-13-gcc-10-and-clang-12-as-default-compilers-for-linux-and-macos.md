# GCC 10 and clang 12 as default compilers for Linux and macOS

These compilers will become the default for building packages in
conda-forge. One notable change in gcc 10 is that the `-fopenmp`` flag in
`FFLAGS` is dropped. In clang 12, `-std=c++14` explicit flag has been
dropped from `CXXFLAGS`, as it is the default compilation mode for clang
12. In gcc 11, the default is `-std=gnu++17`. In clang>=12 and gcc>=11,
we will not provide an explicit C++ standard, and will defer to the
compiler default.

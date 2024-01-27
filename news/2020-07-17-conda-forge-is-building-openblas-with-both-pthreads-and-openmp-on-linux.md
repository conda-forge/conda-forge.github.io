# Conda-forge is building openblas with both pthreads and openmp on Linux

The main change is that `openblas` will use pthreads for threading by
default on Linux instead of the previous `openmp` default. The `openmp`
builds can be recovered by installing `libopenblas=*=*openmp*`.

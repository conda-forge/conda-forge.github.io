# New Accelerate support for macOS 13.3+

conda-forge by default uses `OpenBLAS` as its BLAS and LAPACK
provider on macOS as it was updated regularly and is the least
buggiest performant BLAS/LAPACK implementation.

macOS 13.3 updated the Accelerate framework after a long time with
improved support for LAPACK APIs and has fixes for long-time known
bugs in the older Accelerate's BLAS and LAPACK APIs.
conda-forge has added support for this
new Accelerate framework by using a shim library to expose its
functionality to most conda-forge packages including `numpy`,
`scipy` and `pytorch`.

You can use it by doing

    conda install libblas=*=*_newaccelerate

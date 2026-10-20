# Dropping CUDA 11.2 on 2024 April 22

Conda-forge is dropping support for CUDA 11.2.

The latest version of the CUDA 11 series is CUDA 11.8. At this point CUDA 11.8+
is well-supported in conda-forge. This is a result of running extensive
migration efforts to upgrade conda-forge feedstocks to newer CUDA versions.

CUDA 11.8 packages can be installed and run on the same hardware that CUDA 11.2
supports. Also CUDA 11.8 packages have optimizations for newer hardware that
CUDA 11.2 packages do not. So there is a benefit to users to upgrade to CUDA
11.8.

A very small number of feedstocks that appear unmaintained have not been
migrated. Issues have been raised on those feedstock to make maintainers aware
of this deprecation plan. Until they are updated users can still install the
CUDA 11.2 packages they produced previously. These should continue to work.
However there will be no way to rebuild these packages without also updating to
CUDA 11.8.

To upgrade an older feedstock to CUDA 11.8, simply re-render. If the recipe has
a `skip` or other logic that blocks this from happening, simply remove this
logic and re-render to add CUDA 11.8.

The date has been sent to ensure 1 full work week for maintainers to do any
remaining updates to move to CUDA 11.8+. In 2024 May, [NVIDIA plans to delete
the CUDA 11.2 Docker image](https://gitlab.com/nvidia/container-images/cuda/-/issues/209#note_1641845842)
that conda-forge has been using to build for CUDA 11.2. So it will not be
possible for conda-forge to update the CUDA 11.2 Docker image, which will make
it much harder to maintain. Feedstock maintainers are encouraged to update
before then (if they have not already done so).

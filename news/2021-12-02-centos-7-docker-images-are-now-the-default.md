# CentOS 7 docker images are now the default

We are moving all conda-forge `linux-64` jobs to use CentOS 7-based
docker images. This will help users avoid `conda/mamba` solver errors
where dependencies that need CentOS 7 cannot be installed. Importantly,
our compiler stack will still default to using a CentOS 6 sysroot unless
the recipe explicitly lists the CentoOS 7 sysroot package. This build
configuration means that our core system ABI on linux will remain
largely CentOS 6-compatible, keeping support for older systems largely
intact. We will reconsider moving the default ABI to CentOS 7 at a later
date.

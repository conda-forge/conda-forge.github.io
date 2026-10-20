# CentOS 7 `sysroot` Now Available for `linux-64` Builds

We are very excited to announce that new compilers based on repackaged
`sysroot`'s from CentOS 7 are now available for all `linux-*` platforms.
These compilers will be the default going forward for any `gcc`, `gxx`,
and `gfortran` versions past `8.4.0` on `ppc64le` and `7.5.0` on
`x86_64`/`aarch64`.

On the `linux-64` platform, we have also built the CentOS 6 `sysroot`
and set it as the default, consistent with our current compilers. To use
the CentOS 7 `sysroot` on `linux-64`, add a requirement of
`sysroot_linux-64 2.17` to the build section of your recipe. You also
need to set the proper Docker image in your `conda_build_config.yaml`.
See `Using CentOS 7 <centos7>` for details.

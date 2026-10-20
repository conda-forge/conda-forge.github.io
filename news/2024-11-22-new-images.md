# Updating our default docker images

TL;DR: We have made some updates to our Docker images and build time GLIBC selection.

1. We've updated our default docker images to be based on alma9
2. It is now easier to override `c_stdlib_version` (especially for CUDA-enabled feedstocks), though our baseline of 2.17 hasn't changed.
3. Where necessary, you can more easily switch images by setting `os_version: ...` (see below).
4. We've consolidated our image names to follow a consistent pattern:

```
linux-anvil-{x86_64,aarch64,ppc64le}:{cos7,alma8,alma9}
```

In general, it won't be necessary in the vast majority of cases to override the
docker-image, but if you need to do so, you can add the following to `conda-forge.yml`

```
os_version:             # just to demo different values;
  linux_64: cos7        # whenever possible, please use
  linux_aarch64: alma8  # homogeneous distro versions
  linux_ppc64le: alma9  # across platforms
```

<!-- truncate -->

Linux builds in conda-forge run on infrastructure derived from RHEL and its clones
-- previously CentOS, now AlmaLinux. Primarily we need this for four different
interrelated but distinct pieces:

- the docker images (containing the OS which will execute our builds)
- the sysroot (mainly the C standard library, `glibc`)
- the CDTs (pieces from the distribution we cannot package ourselves)
- feedstock usage of `yum_requirements.txt`

A first key observation is that the glibc appears twice -- once explicitly in the
sysroot we package (and compile against!), and once implicitly in the image that
our CI runs on. This setup is essential to provide highly compatible packages by
default (by compiling against a cos7 baseline), while avoiding constant hassles
for feedstocks where _any_ of the build/host/run dependencies requires a newer
glibc than the baseline.

This is because, for packages requiring a newer `c_stdlib_version` (and thus compiling
against a newer sysroot through the `{{ stdlib("c") }}` infrastructure), will inherit
a runtime-requirement of `__glibc >=c_stdlib_version`, which would be unsatisfiable on
docker-images with a too-old glibc present at runtime.

We've already had this setup since 2021 (when our glibc baseline was 2.12 from cos6,
yet we already used cos7 images), but after increasing the glibc baseline to 2.17, our
images had lost their lead again. This is mostly related due to the third component from
above, the CDTs (core dependency trees). These represent packages from the distribution
itself that are hard or impossible for us to provide, yet need a systematic way to
interact with. You can read more about _why we want to avoid them as much as possible_
[here](https://conda-forge.org/docs/maintainer/knowledge_base/#why-are-cdts-bad).

Due to the end of CentOS-as-we-knew it, we already had to rewrite a lot of the logic
there in any case to switch to Alma, which we took as an opportunity to pare down the
set of CDTs we provide going forward. In a large majority of cases, we have regular
conda packages for some things that only used to be available as CDTs.

CDTs and packages in `yum_requirements.txt` are closely related; in many ways it can
be considered a similar compilation-vs.-runtime split as is the case with our sysroot
(that we compile against) vs. the glibc in the image at runtime. The split here being
that CDTs are what we use to compile against a given distro package, and `yum_requirements.txt`
are how we tell the infrastructure to install them into the image, if they're also
necessary at runtime (which is not always the case).

In other words, using our own packages generally allows feedstocks to avoid _both_ use
of CDTs and `yum_requirements.txt`. You can check out the CDTs we removed
[here](https://github.com/conda-forge/cdt-builds/issues/66#issuecomment-1833417828)
and how `yum_requirements.txt` translate from CentOS to Alma (resp. our own packages)
[here](https://github.com/conda-forge/conda-forge-pinning-feedstock/issues/6283#issuecomment-2440281086).

The change of the image might mean that CDTs we have not repackaged for Alma do not
match what's actually in the image anymore, or -- in rare cases -- that a package name
under `yum_requirements.txt` needs to be updated. Please let us know if you run into
problems there (after checking out the two links above how to transition a given package).

Finally, there is one rare case where we explicitly ask feedstock authors to opt out
of the newest images: for any feedstocks doing binary repackaging on linux (i.e. not
compiling the package from source), please ensure that your image version (as specified
in `conda-forge.yml`, see above) matches the `c_stdlib_version` that you are using.
By default this is 2.17, which means you'd have to do

```
os_version:
  linux_64: cos7
  linux_aarch64: cos7
  linux_ppc64le: cos7
```

If you require a `c_stdlib_version` of 2.28 for a given platform, then set `alma8`.

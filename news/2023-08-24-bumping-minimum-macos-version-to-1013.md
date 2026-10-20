# Bumping Minimum MacOS version to 10.13

We will bump the minimum MacOS version from 10.9 (released in Oct. 2013,
end-of-life since Dec. 2016) to 10.13 (released Sept. 2017, end-of-life
since Dec. 2020). The main reason we managed to support 10.9 this long
at all, is that conda-forge is able to ship an up-to-date C++ standard
library for OSX, `libcxx`, superseding the old one present in the MacOS
SDK on the system (at least from the point-of-view of the respective
conda environments).

However, several core packages in the ecosystem now require at least
10.13 (or will very soon), in a way that we cannot be circumvent. These
packages include `libcxx`,
[starting](https://discourse.llvm.org/t/libc-bumping-minimal-deployment-target-for-building-the-dylib-static-library-on-macos/68912)
with version 17.0. This change will not affect already published
artifacts, but in the near future, all new builds for OSX will require
at least 10.13. This constraint will be implemented through the `__osx`
virtual package, but the details of how we will achieve this are still
being worked out. Only `conda` versions 4.8.0 or newer have this virtual
package. If you are using a system with MacOS older than 10.13 and are
using `conda` older than 4.8.0, you will need to either upgrade `conda`
to at least 4.8.0 or upgrade your system to at least MacOS 10.13.

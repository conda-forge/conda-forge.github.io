---
tags: [howto, advanced]
---

<a id="moving-from-an-autotools-build-to-a-cmake-build"></a>

### Moving from an autotools build to a CMake build

Some packages maintain an autotools build and a cmake build. Some maintainers
would like to switch to a cmake build because that provides windows builds
easily. These builds are mostly not ABI compatible with each other.
Here are some things you should check,

1. Check that both libraries have the same SONAME on linux

   Run `readelf -d /path/to/lib.so`

2. Check that both libraries have the same install name and have the same
   compatibility and current versions.

   Run `otool -L /path/to/lib.dylib`. The second line should give you
   the three pieces of information

3. Check that the file list is the same in both.
4. Check that you use the same options as the same autoconf build.
5. Check that the symbols exported are the same.
6. Check that additional packaging information stays the same, e.g. is the same pkg-config information provided.

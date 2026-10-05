---
tags: [howto, advanced]
---

# Moving from an autotools build to a CMake build

Some packages maintain both an Autotools build and a CMake build. Some maintainers
would like to switch to a CMake build because that provides Windows support
easily. These builds are mostly not ABI compatible with each other.
Here are some things you should check,

1. Verify that both libraries have the same SONAME on Linux.

   Run `readelf -d /path/to/lib.so`

2. Check that both libraries have the same install name and have the same
   compatibility and current versions on macOS.

   Run `otool -L /path/to/lib.dylib`. The second line should give you
   these three pieces of information.

3. Compare the file lists from both builds, and make sure that no significant files are lost. For example, most of the time it is okay to lose `.la` files. Switching to CMake also means that additional CMake configs will be installed.
4. Check that the build is configured using equivalent options (i.e. the same features are enabled).
5. Check that the symbols exported are the same.

   For example, on Linux you can compare the sorted output of
   `nm -D --defined-only /path/to/lib.so | c++filt` from both builds.
   On macOS, use `nm -gU /path/to/lib.dylib` similarly.

6. Check that additional packaging information stays the same, e.g. is the same pkg-config information provided.

:::note

Switching to a CMake build often results in additional CMake configs being installed. This is usually desirable, however it means that you won't be able to switch back without risking breaking build of packages that start relying on these files being present. When backwards compatibility is important, it may be desirable to remove these additional files from within the build script.

:::

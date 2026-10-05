---
tags: [how-to, advanced, windows]
---

# Testing and debugging Windows builds locally

The first thing that you should know is that you can locally test Windows
builds of your packages even if you don't own a Windows machine. Microsoft
makes available free trial Windows virtual machines (VMs). If you
are unfamiliar with VM systems or have trouble installing Microsoft's VMs, please
use a general web search to explore — while these topics are beyond the
scope of this documentation, there are ample discussions on them on the broader
Internet.

To bootstrap a conda environment, consider
[miniforge](https://github.com/conda-forge/miniforge).

## Testing using wine

Some degree of testing and debugging can also be performed without a Windows
system, using [wine](https://www.winehq.org/).
[miniforge](https://github.com/conda-forge/miniforge) works correctly
in the wine's `cmd` shell, and can be used to create and run Conda environments.
In fact, sometimes Wine is able to provide more insightful error messages,
for example:

```
wine: Call from 00006FFFFFF999EA to unimplemented function libblas.dll.cdotc_, aborting
```

It may be necessary to manipulate the `WINEDEBUG` variable to obtain more
debugging logs.

## Debugging DLL issues

When debugging issues related to dynamically-linked libraries (DLLs) failing
to load, the following tools can be helpful:

- [Windows Debugger](https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/debugger-download-tools)
  can be used when debugging the dreaded "DLL load failed" errors. For example to debug a numpy import error:
  - `"C:\Program Files (x86)\Windows Kits\10\Debuggers\x64\gflags.exe" -i python.exe +sls`
  - `"C:\Program Files (x86)\Windows Kits\10\Debuggers\x64\cdb.exe" -logo log.txt -g -G -o -xn av python -c "import numpy"`
    The log file saved in `log.txt` will display information about where the DLLs were loaded from,
    which DLLs are missing and which symbols are missing from a DLL.

- [Dependency Walker](https://www.dependencywalker.com/) can display a tree
  diagram of all dependent modules.

- [Dependencies](https://github.com/lucasg/Dependencies) is a more modern
  replacement for Dependency Walker, with both console and GUI interface.
  It also works better on Wine.

- [dumpbin](https://learn.microsoft.com/en-us/cpp/build/reference/dumpbin-reference)
  tool from MSVC can be used to obtain information about Windows binaries.
  On Unix, [gendef](https://sourceforge.net/p/mingw-w64/wiki2/gendef)
  tool can be used instead by installing the conda package.

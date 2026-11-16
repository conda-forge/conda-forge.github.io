---
title: 'System setup for compilers'
---

<a id="system-setup-for-compilers"></a>

# System setup for compilers

If you plan to install and use compilers distributed on conda-forge in your environments
(e.g. to develop a C++ project), you may need to first install some pre-requisite
software on your system.
The extent of the required setup depends on which operating system you are using.

After following these instructions, you can install the `compilers` meta-package for the standard
C, C++, and Fortran compilers, or install specific compiler packages such as
`cxx-compiler`, `rust`, and `go-cgo`.
See [the maintainer documentation on installing standard compilers](../../maintainer/infrastructure/#installing-standard-compilers-manually)
for more detailed instructions.

<a id="system-setup-linux"></a>

## Linux

Most linux distributions will have all pre-requisite software already installed.
If you run a particularly minimal distribution, you may need to follow error messages to expose any
missing tools as you encounter them.

:::note
Distributions which use `musl` instead of `glibc` by default, such as Alpine,
will need special treatment
(e.g. [https://wiki.alpinelinux.org/wiki/Running_glibc_programs](https://wiki.alpinelinux.org/wiki/Running_glibc_programs)),
as much of conda-forge assumes that `glibc` is available.
Full instructions for using such a setup with conda-forge have not yet been written.
:::

<a id="system-setup-macos"></a>

## macOS

In a terminal, execute the following command to install the macOS Software Development Kit,
as part of Command Line Tools:

```bash
xcode-select --install
```

<a id="system-setup-windows"></a>

## Windows

You need to install Microsoft's Visual C++ build tools
to get standard compilers which rely on a C/C++ toolchain working.
This can be achieved via a relatively minimal Visual Studio installation.

1. **Download the installer.**
   Go to [visualstudio.microsoft.com/downloads](https://visualstudio.microsoft.com/downloads/)
   and download the **Build Tools for Visual Studio** installer.
   At the time of writing, it is available directly at
   [aka.ms/vs/stable/vs_BuildTools.exe](https://aka.ms/vs/stable/vs_BuildTools.exe).

2. **Select the C++ workload.**
   Launch the downloaded installer, and when prompted to select workloads,
   select **Desktop development for C++**.

3. **Deselect unnecessary components.**
   Under _Installation details_, several components are preselected that are not necessary.
   At the time of writing, these are:

   - **C++ CMake tools for Windows**
   - **Testing tools core features - Build Tools**
   - **MSVC AddressSanitizer**
   - **vcpkg package manager**

4. **Keep the Windows SDK.**
   Make sure the **Windows 11 SDK** component stays selected.

5. **Select the MSVC build tools version.**
   Select the component for the build tools version you plan to use.
   At the time of writing, conda-forge defaults to Visual Studio 2022,
   so select **MSVC v143 - VS 2022 C++ x64/x86 build tools**.

   :::tip
   Some projects use a different version than the conda-forge default:

   - **Newer:** for e.g. 2026, the corresponding component,
     **MSVC Build Tools for x64/x86 (Latest)**, is preselected.
     If you do not plan to use version 2026, you can deselect it.
   - **Older (e.g. 2019):** select the corresponding component,
     such as **MSVC v142 - VS 2019 C++ x64/x86 build tools**.

   :::

   :::note
   See [the detailed notes on MSVC versions](../../how-to/advanced/windows/notes-on-native-code/#versions-of-microsoft-visual-c-msvc)
   for more information on what the various version numbers mean and where compatibility can be expected.
   :::

6. **Install.**
   Select **Install** and wait for the installation to complete.

Once activated in a new shell, a conda environment with `cxx-compiler` installed
should have the compiler `cl.exe` available on `PATH`, e.g. at:

```text
path\to\Microsoft Visual Studio\2022\BuildTools\VC\Tools\MSVC\14.44.35207\bin\HostX64\x64\cl.exe
```

### Terminal Installation

An alternative to the GUI installer is to use powershell.
Here is an example script that you can use to install the relevant components:

```powershell
$installer = Join-Path $env:TEMP 'vs_buildtools2026.exe'

Invoke-WebRequest 'https://aka.ms/vs/18/stable/vs_buildtools.exe' -OutFile $installer

$proc = Start-Process $installer -Wait -PassThru -ArgumentList `
  '--quiet --wait --norestart --nocache',
  '--add Microsoft.VisualStudio.Workload.VCTools',
  '--add Microsoft.VisualStudio.Component.VC.14.44.17.14.x86.x64',
  '--add Microsoft.VisualStudio.Component.Windows11SDK.26100'

if ($proc.ExitCode -notin 0, 3010) { throw "Install failed: $($proc.ExitCode)" }
```

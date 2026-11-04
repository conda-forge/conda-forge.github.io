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

Distributions which use `musl` instead of `glibc` by default, such as Alpine,
will need special treatment, as much of conda-forge assumes that `glibc` is available.

<a id="system-setup-macos"></a>

## macOS

In a terminal, execute the following command to install the macOS Software Development Kit
as part of Command Line Tools:

```bash
xcode-select --install
```

<a id="system-setup-windows"></a>

## Windows

On Windows, you need to install Microsoft's Visual C++ build tools
to get standard compilers which rely on a C/C++ toolchain working.
This can be achieved via a relatively minimal Visual Studio installation.

At the time of writing, conda-forge defaults to Visual Studio 2022,
so that is the recommended version to install.
See [the detailed notes on MSVC versions](../../how-to/advanced/windows/notes-on-native-code/#versions-of-microsoft-visual-c-msvc)
for more information on what various relevant version numbers mean
and where compatibility can be expected.

<!--
NOTE: we haven't included instructions for using the Visual Studio Installer GUI,
as at the time of writing, that heavily encourages installation of vs2026,
which is newer than conda-forge's default of vs2022.

If, at some point in the future, conda-forge's default aligns with a version that is
easily installable via the GUI, it may be beneficial to include instructions for that method.
-->

It is possible to install what you need in a terminal using powershell.
Here is a script that you can use to install the relevant components of vs2022:

```powershell
$installer = Join-Path $env:TEMP 'vs_buildtools2022.exe'

Invoke-WebRequest 'https://aka.ms/vs/17/release/vs_buildtools.exe' -OutFile $installer

$proc = Start-Process $installer -Wait -PassThru -ArgumentList `
  '--quiet --wait --norestart --nocache',
  '--add Microsoft.VisualStudio.Workload.VCTools',
  '--add Microsoft.VisualStudio.Component.VC.Tools.x86.x64',
  '--add Microsoft.VisualStudio.Component.Windows11SDK.26100'

if ($proc.ExitCode -notin 0, 3010) { throw "Install failed: $($proc.ExitCode)" }
```

A conda environment with the `cxx-compiler` dependency activated in a new shell
should now have the compiler `cl.exe` available on `PATH`, at e.g.
`path\to\Microsoft Visual Studio\2022\BuildTools\VC\Tools\MSVC\14.44.35207\bin\HostX64\x64\cl.exe`.

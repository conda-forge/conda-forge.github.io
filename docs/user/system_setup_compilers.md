---
title: 'System setup for compilers'
---

<a id="system-setup-for-compilers"></a>

# System setup for compilers

If you plan to install and use compilers distributed on conda-forge in your environments
(e.g. to develop a C++ project), you may need to first configure your system to install some
pre-requisite software. The extent of the required setup depends on which operating system
you are using.
 
After following these instructions, you can install the `compilers` package for the standard
C, C++, and Fortran compilers, or installing specific compiler packages such as
`cxx-compiler`, `rust`, and `go-cgo`.
See [the maintainer documentation on installing standard compilers](../maintainer/infrastructure/#installing-standard-compilers-manually)
for more detailed instructions.

<a id="system-setup-linux"></a>

## Linux

- TODO: are there _any_ pre-requisites on linux, or should this work out of the box?

<a id="system-setup-macos"></a>

## macOS

In a terminal, execute the following command to install the macOS Software Development Kit
as part of Command Line Tools:

```bash
xcode-select --install
```

<a id="system-setup-windows"></a>

## Windows

The easiest way to install 

- TODO: clear guidance on minimal visual studio intallation via visual studio GUI

- TODO: what do users need to make sure is on their PATH / how to launch a shell which handles that?

- TODO: explain minimal visual studio CLI installation:

```powershell
# --- Change these two values to switch versions ---
# VS 2022 -> '2022' and '17'
# VS 2019 -> '2019' and '16'
$vsVersion = '2022'
$channel   = '17'
# ---------------------------------------------------

$url       = "https://aka.ms/vs/$channel/release/vs_buildtools.exe"
$installer = Join-Path $env:TEMP "vs_buildtools$vsVersion.exe"

Invoke-WebRequest $url -OutFile $installer

$proc = Start-Process $installer -Wait -PassThru -ArgumentList `
  '--quiet --wait --norestart --nocache',
  '--add Microsoft.VisualStudio.Workload.VCTools',
  '--add Microsoft.VisualStudio.Component.VC.Tools.x86.x64',
  '--add Microsoft.VisualStudio.Component.Windows10SDK.19041'

if ($proc.ExitCode -notin 0, 3010) { throw "Install failed: $($proc.ExitCode)" }
```

- TODO: link to [the notes on native code on Windows for maintainers](/how-to/advanced/windows/notes-on-native-code/) for more detailedn guidance

- TODO: any other setup required for Fortran? Other languages?

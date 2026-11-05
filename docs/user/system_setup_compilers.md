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

On Windows, you need to install Microsoft's Visual C++ build tools
to get standard compilers which rely on a C/C++ toolchain working.
This can be achieved via a relatively minimal Visual Studio installation.

In many cases, installing any recent version of Visual Studio will be sufficient.
At the time of writing, conda-forge defaults to Visual Studio 2022,
so that is the recommended version to install.
See [the detailed notes on MSVC versions](../how-to/advanced/windows/notes-on-native-code/#versions-of-microsoft-visual-c-msvc)
for more information on what various relevant version numbers mean
and where compatibility can be expected.

### Using the Visual Studio Installer GUI

The easiest way to install the build tools is via the Visual Studio Installer GUI.

1. Download the 'Build Tools for Visual Studio' installer from
[https://visualstudio.microsoft.com/downloads/](https://visualstudio.microsoft.com/downloads/).
2. TODO: install the minimal required components of vs2022

- TODO: what do users need to make sure is on their PATH / how to launch a shell which handles that?

### Using Powershell

If using the Visual Studio Installer GUI is not an option on your machine,
it is possible to install what you need in a terminal using powershell.

Here is a script that you can use to install vs2022 or vs2026:

```powershell
# --- Change this one value to switch versions: '2026' or '2022' ---
$vsVersion = '2022'
# -------------------------------------------------------------------

$urls = @{
  '2026' = 'https://aka.ms/vs/18/stable/vs_buildtools.exe'
  '2022' = 'https://aka.ms/vs/17/release/vs_buildtools.exe'
}

if (-not $urls.ContainsKey($vsVersion)) { throw "Unsupported VS version: $vsVersion" }

$installer = Join-Path $env:TEMP "vs_buildtools$vsVersion.exe"

Invoke-WebRequest $urls[$vsVersion] -OutFile $installer

$proc = Start-Process $installer -Wait -PassThru -ArgumentList `
  '--quiet --wait --norestart --nocache',
  '--add Microsoft.VisualStudio.Workload.VCTools',
  '--add Microsoft.VisualStudio.Component.VC.Tools.x86.x64',
  '--add Microsoft.VisualStudio.Component.Windows11SDK.26100'

if ($proc.ExitCode -notin 0, 3010) { throw "Install failed: $($proc.ExitCode)" }
```

- TODO: what do users need to make sure is on their PATH / how to launch a shell which handles that?

- TODO: any other setup required for Fortran? Other languages?

---
tags: [how-to, advanced, windows]
---

# CMD/Batch scripting for Windows recipes

Windows recipes rely on CMD/Batch scripts (`.bat`) by default.
Batch syntax is a bit different from Bash and friends on Unix, so we have collected some tips here to help you get started if you are not familiar with this scripting language.

- Check if you need to write a Batch script first!
  Simple recipes might not need shell-specific code and can be written in an agnostic way.
  Use the `build.script` item in `meta.yaml` (see [conda-build docs](https://docs.conda.io/projects/conda-build/en/stable/resources/define-metadata.html#script)).
  This item can take a string or a list of strings (one per line).
- [SS64's CMD howto pages](https://ss64.com/nt/syntax.html) are the best resource for any kind of question regarding CMD/Batch syntax.
- Search conda-forge for existing `.bat` scripts and learn with examples.
  See this [example query for all Batchfiles](https://github.com/search?q=org%3Aconda-forge+language%3ABatchfile&type=code&l=Batchfile).
- You can get free trial Windows VMs from Microsoft.
  Set one up with your favorite virtualization solution to debug your CMD syntax.
  There are also some minimal emulators online that might get you started with the basics, even if not all CMD features are present.
  For example, this [Windows 95 emulator](https://www.pcjs.org/software/pcx86/sys/windows/win95/4.00.950/) features a more or less okay MS-DOS prompt.

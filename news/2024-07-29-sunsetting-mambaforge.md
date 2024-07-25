# Sunsetting Mambaforge

With the [Miniforge 23.3.1 release](https://github.com/conda-forge/miniforge/releases/tag/23.3.1-0),
the Miniforge and Mambaforge installers became essentially **identical**. The only difference
between the two was their name and, subsequently, the default installation directory.

Maintaining both installers adds unnecessary burden to our support infrastructure and creates
confusion among end users. As a result, last year we decided to _discourage_ the usage of
Mambaforge in favor of Miniforge.

A year later, we would like to formally sunset Mambaforge. All users are encouraged to switch to
Miniforge. Remember they contain the same packages, so the only difference is the default
installation directory.

The deprecation process will roughly follow this calendar:

- August 2024: The Mambaforge installers will warn about the deprecation and make the user wait 30
  seconds before continuing.
- October 2024: The Mambaforge installers will refuse to install during several pre-specified date ranges (i.e., ["brownouts"](<https://en.wikipedia.org/wiki/Brownout_(software_engineering)>)) in order to encourage users to switch to Miniforge. These dates are
  - Every two weeks in October 2024 (2024-10-01, 2024-10-15)
  - Every ten days in November 2024 (2024-11-01, 2024-11-10, 2024-11-20, 2024-11-30)
  - Every five days in December 2024 (2024-12-05, 2024-12-10, 2024-12-15, 2024-12-20, 2024-12-25, 2024-12-30, 2024-12-31)
- January 2025: The Mambaforge installers will stop being built and distributed.

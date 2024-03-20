# Clang 9.0.0 and gfortran 7.3.0 as default compilers in OSX

- If you maintain a feedstock that requires a C/C++ compiler, no
  changes necessary. A rerender should be done next time the feedstock is
  updated to use the new compiler.
- If you maintain a feedstock with a
  Fortran compiler, a PR to upgrade to gfortran 7.3.0 was already issued.
  If that PR was merged, there's nothing to do. If not, contact core if
  you need help migrating.

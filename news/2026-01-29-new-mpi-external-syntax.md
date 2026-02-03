# New Syntax for External MPI Packages

Due to ongoing issues with the solver pulling in the `external` MPI builds ahead of the real packages,
we have moved the external builds to a new label, `conda-forge/label/mpi-external`. The packages on this
label replace the old MPI packages with `external` in their build strings. These old packages have been labeled
as broken. Follow our [documentation](https://conda-forge.org/docs/user/tipsandtricks/#using-external-message-passing-interface-mpi-libraries)
to update to the new syntax.

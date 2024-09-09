# Changes to the Feedstock Output Validation Procedure

We have changed our feedstock output validation procedure. Instead of automatically
adding new packages to existing feedstocks (e.g., when a new output is added), we will now
require that maintainers submit a PR to add the new output via our
[admin-requests repository](https://github.com/conda-forge/admin-requests?tab=readme-ov-file#add-a-package-output-to-a-feedstock).
New feedstocks created via `staged-recipes` will have their outputs added automatically. If you maintain a feedstock
that regularly adds new outputs (e.g., `llvmdev` has `libllvm18`, `libllvm19`, etc.), we have created a
[list of feedstocks with allowed glob patterns](https://github.com/conda-forge/feedstock-outputs/blob/main/feedstock_outputs_autoreg_allowlist.yml). These feedstocks will have any outputs matching their glob patterns
added automatically. If you would like to add your feedstock to this list, please submit a PR. Further
details on package output validation can be found in our [documentation](https://conda-forge.org/docs/maintainer/infrastructure/#output-validation-and-feedstock-tokens).

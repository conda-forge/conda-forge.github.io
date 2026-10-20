# Moving to CentOS 7 and CentOS 6 End-of-Life

conda-forge's compiler stack uses repackaged libraries from CentOS 6 to
supply certain libraries, notably `glibc` when building recipes. We
currently default to using CentOS 6 with the `glibc` 2.12 ABI. However,
CentOS 6 reached end-of-life in November 2020 and increasingly software
packages require at least CentOS 7 with the `glibc` 2.17 ABI. We also
realize that due to recent events, some communities that may have been
planning to skip CentOS 7 and move straight to CentOS 8 might be
reconsidering those plans. Further, they may not be ready for a
full-scale switch to CentOS 7. Thus the conda-forge core team has
decided to delay moving to CentOS 7 until sometime early next year,
likely the end of January 2021 at the earliest. We are actively looking
for feedback from our users on this issue. Please do
get in touch if you have comments or concerns!

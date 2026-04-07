# Security considerations for conda-forge builds

All conda-forge packages are built by strangers on the internet on public cloud infrastructure from source code you likely have not inspected, so you should not use conda-forge packages if you or your team require a high level of security.
You are also free to download recipes and rebuild them yourself, if you would like at least that much oversight. However, many people use conda-forge all the time with no issues and here are some things that conda-forge does to help with security in some ways:

1. [Sources](../adding_pkgs#source) (where you specify where the package's source code is coming from) can be pulled from GitHub, PyPI, or other sources and SHA256 hashes are always used, so moving of tags or uploading of new sdists can not cause automatic package rebuilds.
   Also, once packages are accepted and made into feedstocks, only the maintainers of that feedstock have the right to merge PRs made to that feedstock.
2. Each feedstock can only upload packages for that feedstock. This is enforced by using a cf-staging channel where builds are first sent.
   A bot then assesses that the submitting feedstock has permission to build the package it has submitted, and only then will it relay the build to the `conda-forge` channel.
   This helps mitigate against a bad actor gaining access to an inconspicuous feedstock and then trying to push a build with malicious code into essential infrastructure packages (e.g., OpenSSL or Python).
3. We have a dedicated [Security and Systems Sub-Team](/community/subteams/#security-subteam) who works hard towards making sure to secure and maintain appropriate access to the credentials and services/systems used by conda-forge.

If you have found a security-related issue with conda-forge, please check our [Security Policy](https://github.com/conda-forge/security/security/policy)
to learn how to report it responsibly.

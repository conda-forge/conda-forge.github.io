# Security considerations for conda-forge builds

Conda-forge is a community effort involving thousands of different feedstock maintainers.
Conda-forge packages are built on public cloud infrastructure.
While we do our best to ensure that these packages remain reliable and secure, they should not be used in environments requiring a high level of security.

## Measures improving package security

Here is a number of measures that conda-forge takes to improve package security:

1. [Sources](../adding_pkgs#source) (external files containing package sources, patches, etc.) are pinned to specific SHA256 hashes.
   If a git tag is updated or a source archive is altered, no new packages will be built and the builders will report a hash mismatch.
   This protects against the most common attacks against existing package versions.
2. The newer v1 recipes are built in environments without Internet access, preventing the build process from downloading any potentially insecure data or sources.
   This is still a risk factor in v0 recipes.
3. Only the listed maintainers of a given feedstock can merge pull requests made to that feedstock.
   Other conda-forge contributors cannot bypass the maintainers and alter these packages.
4. Each feedstock has an explicit allowlist of packages that it can upload.
   This is enforced by using a cf-staging channel where builds are first sent.
   A bot then assesses that the submitting feedstock has permission to build the package it has submitted, and only then will it relay the build to the `conda-forge` channel.
   This helps mitigate against a bad actor gaining access to an inconspicuous feedstock and then trying to push a build with malicious code into essential infrastructure packages (e.g., OpenSSL or Python).
5. Conda-forge's [Security and Systems Sub-Team](/community/subteams/#security-subteam) is working hard towards making sure to secure and maintain appropriate access to the credentials and services/systems used by conda-forge.

## Reporting conda-forge security issues

If you have found a security-related issue with conda-forge, please check our [Security Policy](https://github.com/conda-forge/security/security/policy)
to learn how to report it responsibly.

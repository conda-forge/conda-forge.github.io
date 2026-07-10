# Security considerations for conda-forge builds

Conda-forge is a community effort involving thousands of different feedstock maintainers.
Conda-forge packages are built on public cloud infrastructure.
While we do our best to ensure that these packages remain reliable and secure, they should not be used in environments requiring a high level of security.

## Measures improving package security

Here is a number of measures that conda-forge takes to improve package security:

1. [Sources](/docs/maintainer/adding_pkgs/#source) (external files containing package sources, patches, etc.) are pinned to specific SHA256 hashes.
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

If you have found a security-related issue in a project governed by conda-forge, please check our [Security Policy](https://github.com/conda-forge/security/security/policy) to learn how to report it responsibly.
Please note that this policy does not apply to software packaged in conda-forge.

## Reporting packaged software security issues

If you have found a security-related issue on a software packaged by conda-forge, please report it upstream (if it is not reported already).
You can usually find the appropriate bug reporting instructions on upstream's homepage, which you can find e.g. on anaconda.org's overview of the package (`https://anaconda.org/channels/conda-forge/packages/{package-name}/overview`).

Normally, package security fixes propagate to conda-forge after upstream releases a fixed version and the conda package is bumped.
In some cases, in particular if the issue is urgent or the software is no longer maintained upstream, [the security fixes may be applied in the feedstock](/docs/how-to/emergencies/fix-a-security-vulnerability/#creating-a-patched-version) instead.
If you believe that this would be justified, please report a bug to the feedstock.
However, please bear in mind that feedstocks are maintained by volunteers.

If you believe that the particular issue is strictly caused by conda-forge packaging and is not an upstream bug, please report an issue to the feedstock directly.

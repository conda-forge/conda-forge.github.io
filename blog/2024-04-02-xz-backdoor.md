---
authors:
  - core
tags: [security]
---

# About the `xz` backdoor

On March 29th, 2024, at 18:07 UTC, the core team learnt about the [recently disclosed `xz` backdoor](https://www.openwall.com/lists/oss-security/2024/03/29/4), now labeled as [`CVE-2024-3094`](https://nvd.nist.gov/vuln/detail/CVE-2024-3094).

To the best of our knowledge, conda-forge's artifacts for `xz` are _not_ affected.

<!--truncate -->

## Our response

We immediately checked which `xz` artifacts had been published in our channel:

- Our latest build for `xz` (recipe source available in the [`xz-feedstock`](https://github.com/conda-forge/xz-feedstock/blob/8b8001268eb4eb7f9dcab4166ba88926e5ed6e91/recipe/meta.yaml)) is for version `5.2.9` and was uploaded on 2022-12-08. See artifacts in [anaconda.org](https://anaconda.org/conda-forge/xz/files).
- The backdoored versions of `xz` belong to the `5.6.x` series.

We are monitoring the situation develop and will update this announcement accordingly if needed.

## Closing thoughts

We, the conda-forge core dev team, want to thank everyone for their patience and support as we have responded to the various security incidents and bugs detailed above. It goes without saying that the public nature of conda-forge's infrastructure carries risks. On the other hand, by being public, anyone can look and verify our artifact builds. Security for conda-forge is about reducing risk, and we will continue to do our best.

As a reminder, we do not recommend that you use conda-forge in environments with sensitive information. conda-forge's software is built by our users and the core dev team cannot verify or guarantee that this software is not malicious or has not been tampered with.

Our best defense against security incidents in conda-forge is you! Our feedstock maintainers are in the best position to notice incidents and issues. Please responsibly report anything you find to us at condaforge+security@gmail.com or using the process described in our [Security policy](https://github.com/conda-forge/conda-forge.github.io/security/policy).

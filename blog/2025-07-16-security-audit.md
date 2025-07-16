---
authors:
  - core
tags: [security]
---

# Security audit

During the first half of the year, conda-forge has been subject to a security audit in partnership with [Open Source Technology Improvement Fund](https://ostif.org/) (OSTIF), [Sovereign Tech Agency](https://www.sovereign.tech/) (STA) and the security firm [7ASecurity](https://7asecurity.com/). This effort has resulted in the identification and remediation of 13 findings with security impact, a custom threat model, and a supply chain security analysis. Full details are now publicly available in the [final report](/_static/CON-01-conda-forge-Audit-Public_RC1.0.pdf).

<!-- truncate -->

## Details

Back in April 2024, we started a conversation with [OSTIF](https://ostif.org/) that would result in a partnership with [7ASecurity](https://7asecurity.com/). The security audit took part from February to May, where 7ASecurity reported all their findings. The `conda-forge/core` team assessed the reports and submitted the necessary fixes to our infrastructure and involved tooling, from which we highlight:

- Three incidents in `conda/conda-build`.
- Two incidents in `conda-forge/conda-forge-webservices`.
- Two incidents in `conda-forge/conda-smithy`.
- One incident in `conda/constructor`.
- One incident in `conda-forge/conda-forge-ci-setup`.
- One incident in `conda-forge/infrastructure`.

7ASecurity also contributed a detailed threat model and a supply chain security analysis. CVEs, Github Advisories and related contributions are available in the [final report](/_static/CON-01-conda-forge-Audit-Public_RC1.0.pdf).

We are incredibly grateful for the support offered by OSTIF and STA, and we are delighted to have worked with 7ASecurity during all these months! You can read their blog posts at:

- [conda-forge Audit Complete!](https://ostif.org/conda-forge-audit-complete/), ostif.org.
- [Conda-Forge Security Audit by 7ASecurity](https://7asecurity.com/blog/2025/07/conda-forge-security-audit-by-7asecurity/), 7asecurity.com.

## Final notes

We want to take this opportunity to remind our users that we do not recommend that you use conda-forge in environments with sensitive information. conda-forge's software is built by our users and the core dev team cannot verify or guarantee that this software is not malicious or has not been tampered with.

Our best defense against security incidents in conda-forge is you! Our feedstock maintainers are in the best position to notice incidents and issues. Please responsibly report anything you find to us by following our [security policy](https://github.com/conda-forge/conda-forge.github.io/security/policy).

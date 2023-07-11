# conda-forge vulnerability handling process

This document summarizes and proposes guidelines for handling vulnerabilities reported in
conda-forge's infrastructure.

Security issues and vulnerabilities have expectations and processes that are differ from typical
open source practices:

- Private discussions
- Obfuscation
- Short timeline

This makes it quite hard to be able to understand, learn, or know what to expect from a security
point of view. This document will give you a glimpse on what's happening on the inside, and what
timeline to expect when you report a security vulnerability. It will also serve as a guideline and
task list for conda-forge members on how to handle security related issues.

## Scope

This process applies to *all projects* governed by conda-forge. This includes:

- conda-forge feedstock machinery
- conda-forge infrastructure and bots
- conda-forge website and documentation

Conversely, this process does NOT apply to the software packaged by conda-forge itself. Please contact the upstream maintainers directly.

## Reporting Vulnerabilities

If you believe you’ve found a security vulnerability in a conda-forge project, please responsibly report it to condaforge+security@gmail.com. conda-forge will try to will respond within 7 days to all new reports.

We are also testing GitHub Private vulnerability reporting, you can try to submit a security advisory on [conda-forge/conda-forge.github.io using this link](https://github.com/conda-forge/conda-forge.github.io/security/advisories/new).

## Coordinated Disclosures

conda-forge follows a [coordinated disclosure][coordinated-disclosure] model where the initial
report and remediation are handled privately, but the completion description is made public once a
patch is available. conda-forge will disclose known vulnerabilities within 90 days by default,
whether a patch is available or not.

## Acknowledgement

conda-forge will work to ensure that security researchers, developers, users, or others who
identify and report vulnerabilities within conda-forge projects receive acknowledgement for their
contribution.

## Vulnerability Triage & Remediation Process

This section describes an example process used by conda-forge to track, remediate, and disclose a
reported vulnerability. This description is both a reference for the conda-forge community and a
guideline for contributors. The actual process may vary depending on the nature of the
vulnerability.

### Roles

This process defines these roles:
- **Reporter** The individual(s) who report the vulnerability
- **Coordinator** A conda-forge core member who facilitates the tracking of the vulnerability
  through this process
- **Developer** One or more developers who work on remediating the vulnerability

For the purpose of this document these roles are distinct, in practice, some of these roles may be handled by the same individual. However, the roles should be covered by a minimum of two separate individuals. For example, a Reporter may also fill the Developer role and create the remediation, in this case the Coordinator should be a separate individual.

### Process

The role responsible for each step is noted at the beginning.

- Upon receipt of the initial report:
  - **Coordinator**: Respond to the reported and acknowledge receipt of the report in the timeframe
    given in the "Reporting Vulnerabilities" section.
  - **Coordinator**: Open an issue in the private GitHub repository used for tracking
    vulnerabilities across projects
  - **Coordinator**: Review the issue for completeness and suitability (triage). If more
    information is needed, follow up with the Reporter.
- If the vulnerability is not accepted:
  - **Coordinator**: Close the issue
  - **Coordinator**: Notify the reporter
- If the vulnerability is accepted, within the relevant repositories:
  - **Coordinator**: Open a draft [GitHub Security
    Advisory](https://docs.github.com/en/code-security/repository-security-advisories/about-github-security-advisories-for-repositories#about-github-security-advisories)
    - Include relevant but sanitized details in the top level comment, which will become public
    - Sensitive details and reproductions go in the comments on the draft advisory, which are not
      public
    - **Coordinator**: Add relevant people to the advisory
    - **Developer**: Attempt to replicate the reported vulnerability. Request more information from
      the **Reporter** if necessary.
    - **Developer**: Work on the [vulnerability fix
      PR](https://docs.github.com/en/code-security/repository-security-advisories/collaborating-in-a-temporary-private-fork-to-resolve-a-repository-security-vulnerability#creating-a-temporary-private-fork).
    - **Coordinator**/**Developer**: If appliccable, request a
      [CVE](https://docs.github.com/en/code-security/repository-security-advisories/about-github-security-advisories-for-repositories#cve-identification-numbers)
      from GitHub. The CVE Number will be private until the advisory is published.
    - **Developer & Coordinator**: Decide on release and announcement dates and post them the draft
      advisory.
  - **Coordinator**: Post the release and announcement dates on the conda-forge core chat room and
    mailing list.
  - **Developer**: Merge the security fix PR
  - **Developer**: Release the package and/or deploy the fix as appropriate
  - **Developer & Coordinator**: Draft a [blog post](https://github.com/conda-forge/blog) and other
    announcement texts. This can be done in parallel with the previous steps, but consider using a
    [private advisory](https://github.com/conda-forge/blog/security/advisories) for the text.
  - **Coordinator**: Publish the security advisory on the announcement date. If applicable, GitHub
    will post the CVE to the MITRE database.
  - **Coordinator**: Publish the blog post and other announcements (Element chat room, Twitter,
    etc) as necessary.
- **Coordinator**: Notify the **Reporter** of the releases
- **Coordinator**: Close the issue in the tracking repository

> Notes to Developers
>
> - Be aware that GitHub CI workflows won't run on security forks, so reviewers must test manually
>   to avoid a broken CI when the patch is merged to the public repo.
> - Also, vulnerabilities may involve multiple private security forks across different GitHub
>   organizations.
> - This may require additional manual steps to include those private forks.

[coordinated-disclosure]: https://cheatsheetseries.owasp.org/cheatsheets/Vulnerability_Disclosure_Cheat_Sheet.html#responsible-or-coordinated-disclosure

---

> This document is based on the excellent [write-up](https://github.com/jupyter/security/blob/86ec517/docs/vulnerability-handling.md) used by the Jupyter community, [BSD-3 licensed](https://github.com/jupyter/security/blob/86ec517/LICENSE).




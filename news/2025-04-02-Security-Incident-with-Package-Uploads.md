# Security Incident with Package Uploads

Yesterday, ``conda-forge`` was notified of a security incident reporting that the ``anaconda.org`` upload token
for the ``conda-forge`` channel had been accidentally leaked between on or about 2025-02-10 to 2025-04-01. Our
investigation resulted in the temporary artifact upload shutdown you observed yesterday (2025-04-01). The results
of our analysis show that, as best as can reasonably be determined, the token was not used by any 3rd party to
upload malicious artifacts.

More details below the fold.

<!-- truncate -->

## Report details

In the past few months, ``conda-forge`` has been engaging with an external security audit in collaboration with
the [Open Source Technology Improvement Fund](https://ostif.org/) (OSTIF). The full results of this audit will be
made public once it is complete per OSTIF responsible disclosure policies.

During this process, OSTIF and their contractor uncovered misconfigured infrastructure which exposed the ``anaconda.org``
token for the ``conda-forge`` channel to all feedstock maintainers. The token was exposed from on or about 2025-02-10 through
2025-04-01. See our [GitHub Security Advisory](https://github.com/conda-forge/infrastructure/security/advisories/GHSA-m4h2-49xf-vq72)
for more details.

We have requested a CVE from GitHub and will amend this announcement once it is issued. Our response to this
incident is detailed below, but TL;DR, as best as can reasonably be determined, **no packages were compromised
during this time**.

Thank you for using ``conda-forge``, please [contact us](https://conda-forge.org/community/getting-in-touch/) if you
have further questions, and please follow our [security process](https://github.com/conda-forge/conda-forge.github.io/blob/main/SECURITY.md)
for responsible reporting of vulnerabilities.

**Finally, as a reminder, ``conda-forge`` packages are built by strangers on the internet (our wonderful feedstock
maintainers!) and are not suitable for use cases that require secure software provenance.**

## Response timeline

The timeline and details of our response to this security incident are as follows:

- 2025-04-01 13:35 UTC: OSTIF and their contractor notified ``conda-forge`` of the leaked token.
- 2025-04-01 14:00 UTC: The ``conda-forge/core`` team acknowledged receipt of the report and
  started conducting the investigation.
- 2025-04-01 14:15 UTC: The ``conda-forge/core`` team disabled the token and stopped uploads to ``anaconda.org``.
- 2025-04-01 14:20 UTC: We posted an [incident](https://github.com/conda-forge/status/issues/194)
  to our status page reporting that uploads were temporarily paused.
- 2025-04-01 15:19 UTC: We audited all uploads to the ``conda-forge`` channel, looking for uploads that
  bypassed our upload staging process. We did not find any. This check is not completely robust, but it
  does indicate that nothing was obviously compromised.
- 2025-04-01 15:53 UTC: We decided to delay disclosure by one day to 2025-04-02 in order to not generate
  confusion (2025-04-01 is [April Fools' Day](https://en.wikipedia.org/wiki/April_Fools%27_Day) in some countries
  when people commonly engage in practical jokes).
- 2025-04-01 21:39 UTC: We deployed a fix to our infrastructure.
- 2025-04-01 22:20 UTC: We then deployed a new token to our infrastructure and restarted uploads.
- 2025-04-01 23:02 UTC: The status page [incident](https://github.com/conda-forge/status/issues/194) was marked as resolved.
- 2025-04-02: We published this announcement and the advisory. We requested a CVE from GitHub and will update this
  notice when we get the number.

# Security Incident with Package Uploads (CVE-2025-31484)

Yesterday, `conda-forge` was notified of a security incident reporting that the `anaconda.org` upload token
for the `conda-forge` channel had been accidentally leaked between on or about 2025-02-10 to 2025-04-01. Our
investigation resulted in the temporary artifact upload shutdown you observed yesterday (2025-04-01). The results
of our analysis show that, as best as can reasonably be determined, the token was not used by any 3rd party to
upload malicious artifacts.

More details in the [corresponding blog post](/blog/2025/04/02/security-incident-with-package-uploads/).

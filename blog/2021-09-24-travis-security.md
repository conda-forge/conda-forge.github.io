---
authors:
  - beckermr
tags: [security]
---

# Travis CI Security Incident

On September 9, 2021 one of our core devs discovered that artifacts
building on Travis CI were being uploaded to our conda channel from PRs
running on forked repositories. A quick investigation revealed that
Travis CI was passing encrypted secrets to PR builds on forks. Further
examination of our logs and artifacts indicated that this had been
happening since about September 3, 2021. This security bug was
subsequently confirmed by Travis CI. See this
[CVE](https://nvd.nist.gov/vuln/detail/CVE-2021-41077) for more details
on this incident. **As far as we know, there were no actual exploits
against conda-forge which used this vulnerability.**

<!--truncate-->

## Our Response

We took the following steps to respond to this incident.

1.  We immediately turned off all builds on Travis CI by suspending the
    Travis CI GitHub App.
2.  We immediately disclosed the bug to Travis CI through our contacts
    there.
3.  Once Travis CI indicated to us that they were ready, we rotated all
    feedstock tokens and later our anaconda.org token for our staging
    channel. The anaconda.org token for the main `conda-forge` channel
    was never disclosed in this incident. Further, only ~70 feedstocks
    had their tokens exposed in this incident.
4.  We examined our artifacts and marked as broken any artifacts that
    were uploaded from PRs. We think we found everything, but we are not
    completely sure. Our criterion for marking things broken was more
    generous than it needed to be.
5.  We issued PRs to rebuild any broken artifacts via our bots.
6.  We put in changes to `conda-smithy` to help prevent inadvertent
    uploads of artifacts from PRs in the future.

## Closing Thoughts & What can you do?

I (MRB) want to recognize the quick work of our core dev team in
handling this incident. It goes without saying that the public nature of
`conda-forge`'s infrastructure carries risks. On the other hand, by
being public, anyone can look and verify our artifact builds. Security
for `conda-forge` is about reducing risk and we will continue to do our
best.

Our best defense against security incidents in `conda-forge` is _you_!
Our feedstock maintainers are in the best position to notice incidents
and issues. Please responsibly report anything you find to us at
`condaforge+security@gmail.com`.

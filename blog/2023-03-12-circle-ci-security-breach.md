---
authors:
  - core
tags: [security]
---
# CircleCI Security Incident

In early January 2023, CircleCI informed us that they had a large
[security breach](https://circleci.com/blog/jan-4-2023-incident-report/)
where a third party had gained access to all the environment secrets
stored in the service. For `conda-forge`, these secrets are the API
token used to upload built packages to our staging area on
`anaconda.org` and the unique token we generate for each feedstock. The
feedstock tokens are used as part of our artifact staging process to
ensure that only the maintainers of a given feedstock can upload
packages built by that feedstock. Later in January, we were informed by
CircleCI that their security breach started on December 19, 2022, with
the bulk of the secrets being exfiltrated in plain text from their
servers a few days later. A malicious third-party with access to these
secrets could potentially upload compromised versions of any package on
`conda-forge` in a so-called "supply chain" attack.

<!--truncate -->

**We have produced a** [list of all possibly compromised
artifacts](https://raw.githubusercontent.com/conda-forge/conda-forge.github.io/main/misc/circle_ci_pkgs_dec2022_breach.json).

**If you use** `conda-forge` **in very sensitive environments (which we
do not recommend!), please remove these artifacts from your system.**

**To date, we know of no compromised artifacts in** `conda-forge`.

**API tokens for the main** `conda-forge` **channel were never exposed
and remain secure to our knowledge.**

## Our Response

We took the following steps to respond to this incident.

-   We immediately started a token rotation of all of our feedstock
    tokens and our staging area upload tokens as precautionary measures.
    This token rotation hit a few bugs, but was completed as of January
    13, 2023.
-   We produced a census of all packages uploaded between December 19,
    2022 and January 13, 2023. This data is available for download as a
    [JSON
    file](https://raw.githubusercontent.com/conda-forge/conda-forge.github.io/main/misc/circle_ci_pkgs_dec2022_breach.json).
-   We examined all the artifacts built during this time period for the
    [malicious
    files](https://circleci.com/blog/jan-4-2023-incident-report/) listed
    by CicleCI. We did not find any of those files in our artifacts.
-   As detailed below, we have begun retooling our system for feedstock
    tokens to be more robust and enable greater flexibility in our
    response to incidents like this.
-   We have begun systematically invalidating old tokens,
    decommissioning old bots, and minimizing permissions of our current
    tokens in order to further enhance `conda-forge`'s security.

Rotating all of our tokens was taken as a precautionary measure.
Unfortunately, during this token rotation, one of our bots encountered a
bug which resulted in us losing the tokens for a very large fraction of
feedstocks. This situation resulted in an extended outage that lasted
about five days and was resolved on January 13, 2023, when the full
token rotation was completed.

## What did we learn?

We learned a few things about our system for feedstock tokens and
general maintenance of our CI service integrations. We probably should
have known them already, but here we are.

-   We used the same feedstock token across multiple CI services. This
    limited our ability to immediately invalidate tokens associated with
    a single CI service and exposed all services if any single service
    had an incident.
-   Our token system only allowed one valid token per feedstock. This
    limitation means that we cannot recover from partially failed token
    resets/rotations and are subject to race conditions during the
    reset/rotation process that can cause failed package uploads.
-   We need to be more proactive about cleaning up deprecated/removed CI
    services. The use of CircleCI in `conda-forge` has been deprecated
    for quite a while. Had we taken the time, and had the foresight, to
    remove all of our secrets from CircleCI when it was deprecated, we
    could have avoided the security incident all together.

We have begun retooling our system for feedstock tokens in order to fix
the issues identified above and allow us to have more flexibility in
responding to security incidents. We have also started the process of
decommissioning several of our old CI services. These changes will take
time to implement. You can follow the progress on our various public
issue trackers.

## Closing Thoughts & What can you do?

We, the `conda-forge` core dev team, want to thank everyone for their
patience and support as we have responded to the various security
incidents and bugs detailed above. It goes without saying that the
public nature of `conda-forge`'s infrastructure carries risks. On the
other hand, by being public, anyone can look and verify our artifact
builds. Security for `conda-forge` is about reducing risk, and we will
continue to do our best.

As a reminder, we do not recommend that you use `conda-forge` in
environments with sensitive information. `conda-forge`'s software is
built by our users and the core dev team cannot verify or guarantee that
this software is not malicious or has not been tampered with.

Our best defense against security incidents in `conda-forge` is you! Our
feedstock maintainers are in the best position to notice incidents and
issues. Please responsibly report anything you find to us at
`condaforge+security@gmail.com`.

# Travis CI Usage Deprecated for `win_*`, `osx_*`, and `linux_64` Platforms

Due to changes in how Travis CI tracks open-source build time, we are
deprecating using it for the `win_*`, `osx_*`, and `linux_64` platforms.

Travis CI will be available only for platforms in their [partner
queues](https://docs.travis-ci.com/user/billing-overview/#partner-queue-solution).
These platforms currently include `ppc64le`, `aarch64` and `s390x`.

Rerendering will raise an error if Travis CI is used for a non-partner
queue platform in the conda-forge GitHub organization.

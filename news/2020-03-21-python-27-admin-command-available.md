# Python 2.7 Admin Command Available

A webservices admin command is now available to add Python 2.7 back to
feedstocks. Put `@conda-forge-admin add python 2.7` in the title on an
issue in your feedstock. The admin webservices bot will then issue a PR
adding back Python 2.7. Note that this PR will remove other Python
builds and any `win`, `aarch64`, or `ppc64le` builds. If you want to
keep those, merge the PR into a separate branch on your feedstock.

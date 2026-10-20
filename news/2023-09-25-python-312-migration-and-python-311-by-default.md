# Python 3.12 migration and Python 3.11 by default

With the Python 3.12 release approaching, we have already started the
rebuild of packages for it. Although, there is no offical Python 3.12
release yet, the release candidates of it will have the same ABI. Thus
packages built with the release candidate can be safely used with the
later offical release. To support rebuilding packages on conda-forge
while ensuring Python release candidates don't end up in end-user
solves, we have uploaded the Python 3.12.0rc2 and rc3 builds to the
`conda-forge/label/python_rc` channel. The `python312` migration adds
this channel in the feedstock builds to the Python 3.12 matrix entry. On
the offical release of Python 3.12, we will adjust the migration and
remove the channel again. Then (on a rerender), feedstock will only
consume the main channel again.

Overall, this approach allows us to provide Python 3.12 for a wide range
of packages already on the day of the offical Python 3.12 release.
At the same time, we have stopped the Python 3.11 migration and added it
to the list of default Python versions on conda-forge.

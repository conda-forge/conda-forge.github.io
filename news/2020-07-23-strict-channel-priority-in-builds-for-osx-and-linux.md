# Strict channel priority in builds for OSX and Linux

We have changed the OSX and Linux platforms to enforce strict channel
priority in package builds. This change means that if a package is
available in the conda-forge channels, the `conda` solver will not
consider any versions of the package from other channels. Users can
disable this by setting `channel_priority: flexible` in their
`conda-forge.yml`.

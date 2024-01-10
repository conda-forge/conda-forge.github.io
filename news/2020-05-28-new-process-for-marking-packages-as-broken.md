# New Process for Marking Packages as Broken

We are changing the way we mark packages as `broken` to better match the `defaults` channel and to
better enable reproducible environments that depended on broken packages. We will now be adding the
`broken` label to packages but leaving them on the `main` channel. In order to make sure they do
not appear in the `repodata.json` for the `main` channel, we will be patching the repo data to
remove them using the `removals` feature. Users will notice the following changes

- The packages on `anaconda.org` will now have both the `main` and the `broken` labels. 
- All requests to mark packages as broken must be sent to the `cf-mark-broken` repo. 
- Members of `core` can no longer mark things as broken by hand since the repo data patching must
  be done as well. 
- The package metadata for broken packages may differ slightly from when they were on the `main`
  channel. 
- The only correct source of package metadata is now the `repodata.json` etc on `anaconda.org`. Any
  other sources may be missing critical changes.

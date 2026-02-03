---
tags: [how-to, advanced]
---

# How to maintain several versions

The conda-forge workflow assumes that a push to any branch in the feedstock repository will result in a build being uploaded to the conda-forge channel (and that's why PRs must always be opened from a fork!).

Most feedstocks only need `main` for their builds, since the package has a single release line, and new releases always imply a later version. However, some packages may maintain a few release lines in parallel. If you wish to maintain those in your feedstock, you will need to create a branch for each.

Important reasons why it can be necessary to keep publishing packages for older versions:
* The package continues to receive upstream support, and new patch versions need to be published.
* The package depends on libraries that are versioned in the global pinning, which need to be rebuilt by our bot infrastructure to stay compatible with the rest of conda-forge.
* The package needs a backport of an upstream patch, security fix, etc.

## Create the new branch

:::note
This operation can only be performed by users with write acccess to the feedstock.
:::

In the local copy of your [forked repository](../basics/fork-sync.md), create a branch named after the release line you want to maintain. For example, for `3.10`, it could be:

```bash
git checkout main
git pull upstream main
git checkout -b v3.10.x
```

The above is for branching off from the `main` branch directly; in many cases though you may want
to branch off at an earlier point of the repo history. For example, if the `main` branch is already
on version 3.11 or beyond, but you want to publish a new patch release 3.10.18. In this case, you
should go `https://github.com/conda-forge/<your_pkg>-feedstock/commits/main/` and find the commit
for the last _published_ builds of the 3.10.x series -- in other words, a commit where there is some
indication that the CI ran successfully (green check or, more rarely, a red X where _some_ jobs still
succeeded). Usually this is the last merge before any of the commits from the PR that did the update
to 3.11.

Alternatively, you can go to the conda-forge [metadata app](https://conda-metadata-app.streamlit.app),
navigate to the last 3.10.x build of your package, and look for the "Provenance" section. It contains
a reference to the exact commit that produced the package you're looking at.

Once you've found the right commit hash, instead of the `git checkout -b v3.10.x` described above, do:

```bash
git checkout <sha_hash_of_commit_from_above> -b v3.10.x
```

In either case, add an empty commit with the `[ci skip]` message so that the act of pushing the new
branch does not result in a new build process, and push it to `upstream`. This is one of the rare
ocassions where you must push directly to the feedstock repository, not your fork!

```bash
git commit --allow-empty -m "[ci skip] Create new branch for v3.10.x release series"
git push -u upstream v3.10.x
```

Now this branch can be selected as a target in the drop-down when opening a PR (e.g. to publish
a new patch version of v3.10.x in the example above).

## Ensure the branch participates in migration infrastructure

For the duration of the lifetime of your LTS version, you'll want it to participate in the relevant
migrations that are happening in conda-forge, e.g. if there's a rebuild for a new version of one of
your dependencies. The configuration for this must be on the `main` branch in the `conda-forge.yml`
file and add these lines:

```yaml
bot:
  abi_migration_branches:
    - "v3.10.x"  # the branch name you picked; use a consistent scheme across versions
```

You can incorporate this change into your next PR to the `main` branch, or do a push with

```bash
git checkout main
git pull upstream main
# modify conda-forge.yml and save
git add conda-forge.yml
git commit -m "[ci skip] update abi_migration_branches"
git show                    # sanity check that the commit contains nothing else
git push -u upstream main
```

Note that the bot infrastructure for `abi_migration_branches:` only does migrations; it will not
automatically pick up new patch versions, which you have to do manually (e.g. it helps to subscribe
to notifications for new releases in the upstream repo).

Eventually, you'll want to stop receiving bot PRs to a given branch (because the version has become
too old); at that point, you simply remove the branch from `abi_migration_branches:`. Again, the
only bot config (in `conda-forge.yml`) that's being taken into account is the one on the `main` branch.

:::note

In some cases, the `abi_migration_branches` may receive migration PRs that have already been processed. This is being looked into at [regro/cf-scripts#2500](https://github.com/regro/cf-scripts/issues/2500). In the meantime, you can ignore these redundant PRs by closing them.

:::

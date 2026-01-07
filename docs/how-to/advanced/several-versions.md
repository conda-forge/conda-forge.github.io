---
tags: [how-to, advanced]
---

# How to maintain several versions

The conda-forge workflow assumes that a push to any branch in the feedstock repository will result in a build being uploaded to the conda-forge channel (and that's why PRs must always be opened from a fork!).

Most feedstocks only need `main` for their builds, since the package has a single release line, and new releases always imply a later version. However, some packages may maintain a few release lines in parallel. If you wish to maintain those in your feedstock, you will need to create a branch for each.

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
for the last _published_ builds of the 3.10.x series (usually: the last merge before any of the
commits from the PR that did the update to 3.11). Then, instead of `git checkout -b v3.10.x`, do:

```bash
git checkout <sha_hash_of_commit_from_above> -b v3.10.x
```

In either case, add an empty commit with the `[ci skip]` message so that the act of pushing the new
branch does not result in a new build process, and push it to `upstream`. This is one of the rare
ocassions where you must push directly to the feedstock, not your fork!

```bash
git commit --allow-empty -m "[ci skip] Create new branch for v3.10.x release series"
git push -u upstream v3.10.x
```

Now, this branch can be selected as a target branch in the following steps.

## Open a PR with the necessary changes

From the same branch, create another one to add some extra changes that will need to be reviewed in a PR:

```bash
git checkout -b setup-3.10.x
```

Open your `conda-forge.yml` file and add these lines:

```yaml
bot:
  abi_migration_branches:
    - "v3.10.x"  # or the branch name you picked
```

And [rerender](../basics/rerender.md). Now, make sure to adjust the recipe file so the correct version is being built.

Once ready, push the branch to your fork (`origin`) and open the corresponding pull request. Don't forget to pick `v3.10.x` as the target branch!

:::note

In some cases, the `abi_migration_branches` may receive migration PRs that have already been processed. This is being looked into at [regro/cf-scripts#2500](https://github.com/regro/cf-scripts/issues/2500). In the meantime, you can ignore these redundant PRs by closing them.

:::

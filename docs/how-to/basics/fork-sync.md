---
tags: [how-to, basic]
---

# How to keep your fork in sync

The `conda-forge` workflow assumes that contributors will _always_ open their pull requests from their feedstock fork. Follow these best practices to make sure your branches are always up-to-date.

## Terminology

Given a `conda-forge/package-feedstock` repository, Github allows you to create a copy on your account, called _fork_. You have full rights over your forked repository, and it should be the place where you experiment with new branches and changes.

The original repository is usually referred to as `upstream`.

## How to fork a feedstock

Forks are easily created from the Github UI:

1. Go to the conda-forge feedstock
2. Click on the Fork button in the top right corner
3. Select on which account you want to create the fork. Choose your personal account, not an organization.

## How to keep your fork in sync

Never push directly to your fork's `main` branch. This branch should always be identical to upstream. This way your new branches will never start with merge conflicts.

You can sync your fork `main` with upstream's via the Github UI. Look for an option named "Sync". Then, in your local copy of the forked repository, run: `git checkout main && git pull`.

Locally, you can follow these steps:

1. If not available on disk yet, clone your fork and change into its directory.
2. Change the branch to `main`: `git checkout main`.
3. Pull from upstream: `git pull upstream main`.
   - If this results in merge conflicts, abort with `git merge --abort` and hard-reset `main`. This WILL lose all the changes made in `main` that were not part of upstream. The command is: `git reset --hard upstream/main`.

Once `main` is synced, you can create a new branch with `git checkout -b new-branch-name`.

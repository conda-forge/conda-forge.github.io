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

If this results in merge conflicts, check the section below.

Once `main` is synced, you can create a new branch with `git checkout -b new-branch-name`.

## How to resolve conflicts in `main`

When pulling from `upstream`, you might run into merge conflicts. This can happen if you pushed to your fork's `main` and opened a PR from that branch instead of creating a new one.

To make your fork's `main` look like `upstream`'s:

1. If you just tried to `pull`, abort with `git merge --abort`. Otherwise, check the info in `git status` and make sure you are you are in the `main` branch: `git checkout main`.
2. Park your local `main` in separate branch, as a backup: `git checkout -b parked-changes`.
3. Ensure your remotes are fresh: `git fetch upstream`.
4. Go back to `main` and reset it to `upstream`'s: `git reset --hard upstream/main`.

Alternatively, create a backup of your `main` branch with `git checkout main && git checkout -b parked-changes` and then try to pull with a rebase strategy with `git pull --rebase upstream main`. The idea here is to keep only the commits from `upstream` and drop the ones you added yourself. [Gitlab's docs on `git rebase`](https://docs.gitlab.com/topics/git/git_rebase/) contain more details on this type of workflow.

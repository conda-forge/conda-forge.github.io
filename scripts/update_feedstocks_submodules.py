#!/usr/bin/env conda-execute

# conda execute
# env:
#  - git 2.14.2
#  - python
#  - conda-smithy
#  - gitpython
# channels:
#  - conda-forge
# run_with: python

import os
import shutil

import conda_smithy.feedstocks as feedstocks
from git import Repo
from git.exc import GitCommandError

import argparse

import warnings

parser = argparse.ArgumentParser(description='Update the conda-forge/feedstocks repo.')
parser.add_argument('feedstocks_repo', help="The location of the checked out conda-forge/feedstocks repo.")

args = parser.parse_args()

feedstocks_repo = Repo(args.feedstocks_repo)

forge_feedstocks = feedstocks.feedstock_repos('conda-forge')

# Identify the submodule names which lie withing the repo.
submodules = {sm.name: sm for sm in feedstocks_repo.submodules}

for feedstock in forge_feedstocks:
    repo_subdir = os.path.join('feedstocks', feedstock.package_name)
    abs_subdir = os.path.join(feedstocks_repo.working_tree_dir, repo_subdir)
    if not os.path.exists(abs_subdir):
        print('Adding {} to submodules.'.format(feedstock.package_name))

        # For situations where the submodule already exists, but not in the expected locations, just
        # remove it, and re-add.
        if feedstock.package_name in submodules:
            feedstocks_repo.submodules[feedstock.package_name].remove()

        # Add the new submodule.
        try:
            feedstocks_repo.git.submodule(
                "add",
                "--name",
                feedstock.package_name,
                feedstock.clone_url,
                repo_subdir
            )
        except GitCommandError:
            warnings.warn(
                    "Unable to add the submodule {}. "
                    "This is likely because the repo has no commits, "
                    "which likely means something went wrong with feedstock generation. "
                    "Will skip adding this submodule and continue.".format(feedstock.package_name)
            )
            shutil.rmtree(abs_subdir)


# Pick out the feedstocks which exist on the repo, but are no longer on conda-forge.
to_be_deleted = set(submodules.keys()) - set(repo.package_name for repo in forge_feedstocks)
for package_name in to_be_deleted:
    print("Removing {}.".format(package_name))
    submodule = submodules[package_name].remove()

for each_submodule in feedstocks_repo.submodules:
    print("Updating {}.".format(each_submodule.name))
    # Update and initialize the submodule as it may not exist.
    each_submodule.update(
        init=True,
        recursive=False,
        force=True
    )
    # Checkout the master branch so the repo can be updated to latest.
    each_submodule.branch.checkout(force=True)
    # Update the submodule based on the current repo's state.
    each_submodule.update(
        init=True,
        recursive=False,
        force=True,
        to_latest_revision=True
    )

if feedstocks_repo.is_dirty():
    feedstocks_repo.git.commit('-a', '-m', 'Updated feedstocks submodules. [ci skip]')

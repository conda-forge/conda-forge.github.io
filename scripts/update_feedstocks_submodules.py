#!/usr/bin/env conda-execute

# conda execute
# env:
#  - python
#  - conda-smithy
#  - gitpython
# channels:
#  - conda-forge
# run_with: python

import os

import conda_smithy.feedstocks as feedstocks
from git import Repo

import argparse

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
        feedstocks_repo.create_submodule(feedstock.package_name, repo_subdir,
                                         url=feedstock.clone_url)


# Pick out the feedstocks which exist on the repo, but are no longer on conda-forge.
to_be_deleted = set(submodules.keys()) - set(repo.package_name for repo in forge_feedstocks)
for package_name in to_be_deleted:
    print("Removing {}.".format(package_name))
    submodule = submodules[package_name].remove()

feedstocks_repo.submodule_update(recursive=False)
feedstocks_repo.git.submodule('foreach', 'git', 'pull', 'origin', 'master')

if feedstocks_repo.is_dirty():
    feedstocks_repo.git.commit('-a', '-m', 'Updated feedstocks submodules.')

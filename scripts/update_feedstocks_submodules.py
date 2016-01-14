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

parser = argparse.ArgumentParser(description='Process some integers.')
parser.add_argument('feedstocks_repo', help="The location of the checked out conda-forge/feedstocks repo.")

args = parser.parse_args()

feedstocks_repo = Repo(args.feedstocks_repo)

for feedstock in feedstocks.feedstock_repos('conda-forge'):
    repo_subdir = os.path.join('feedstocks', feedstock.package_name)
    abs_subdir = os.path.join(feedstocks_repo.working_tree_dir, repo_subdir)
    sm_names = [sm.name for sm in feedstocks_repo.submodules]
    if not os.path.exists(abs_subdir):
        print('Adding {} to submodules.'.format(feedstock.package_name))

        # For situations where the submodule already exists, but not in the expected locations, just
        # remove it, and re-add.
        if feedstock.package_name in sm_names:
            feedstocks_repo.submodules[feedstock.package_name].remove()

        # Add the new submodule.
        feedstocks_repo.create_submodule(feedstock.package_name, repo_subdir,
                                         url=feedstock.clone_url)

feedstocks_repo.git.submodule('foreach', 'git', 'pull',  'origin', 'master')

if feedstocks_repo.is_dirty():
    feedstocks_repo.index.add(['.gitmodules'])
    feedstocks_repo.index.commit("Updated feedstocks submodules.")

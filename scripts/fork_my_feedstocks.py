#!/usr/bin/env conda-execute

"""
This script can be run to fork conda-forge feedstocks to which you are a maintainer.
This is super useful if you maintain many feedstocks and would like to cutdown maintenance on your next PR...

Requires a token stored in the environment variable `GH_TOKEN` with the permissions `public_repo` and `read:org`.
It also requires all the feedstocks be cloned somewhere like with the `feedstocks` repo.
"""
# conda execute
# env:
#  - git
#  - python
#  - conda-smithy
#  - pygithub
#  - gitpython
# channels:
#  - conda-forge
# run_with: python

import os
import argparse

import git
import github

from conda_build.metadata import MetaData

import conda_smithy.github
import conda_smithy.configure_feedstock
import conda_smithy
import conda_smithy.feedstocks as feedstocks


parser = argparse.ArgumentParser(description="Fork your maintained feedstocks.")
parser.add_argument("--feedstocks-dir", help="The location of the feedstocks.",
                    default="./feedstocks")
args = parser.parse_args()

feedstocks_dir = os.path.abspath(os.path.expanduser(args.feedstocks_dir))

gh_token = os.environ['GH_TOKEN']
gh = github.Github(gh_token)
gh_me = gh.get_user()
gh_org = gh.get_organization("conda-forge")

if gh_me.login == 'conda-forge-admin':
    raise ValueError("Please don't run this script with the github "
                     "token for {}.".format(gh_me.login))

for each_feedstock in os.listdir(feedstocks_dir):
    each_feedstock_dir = os.path.join(feedstocks_dir, each_feedstock)
    meta = os.path.join(each_feedstock_dir, 'recipe')
    if not os.path.exists(meta):
        print('Found an empty repo... :(')
        continue
    meta = MetaData(meta)
    me_a_maintainer = gh_me.login in meta.meta.get('extra', {}).get('recipe-maintainers', [])
    print(' - {: <24}(maintainer: {})'.format(each_feedstock, me_a_maintainer))
    if me_a_maintainer:
        print('*** Forking `{}`.'.format(each_feedstock))
        each_feedstock_repo = each_feedstock
        if not each_feedstock_repo.endswith("-feedstock"):
            each_feedstock_repo += "-feedstock"
        repo = git.Repo(each_feedstock_dir)
        remote_repo = gh_org.get_repo(each_feedstock_repo)
        gh_me.add_to_subscriptions(remote_repo)
        fork_repo = gh_me.create_fork(remote_repo)
        gh_me.add_to_subscriptions(fork_repo)

        # Add the remote repos locally.
        for user, url in [
                (remote_repo.owner.login, remote_repo.clone_url),
                (fork_repo.owner.login, fork_repo.ssh_url)
        ]:
            try:
                remote = repo.create_remote(user, url)
            except git.exc.GitCommandError:
                pass

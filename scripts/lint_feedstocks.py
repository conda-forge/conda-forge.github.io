#!/usr/bin/env conda-execute

# conda execute
# env:
#  - git
#  - python
#  - conda-smithy
#  - gitpython
#  - pygithub
# channels:
#  - conda-forge
# run_with: python

import os
import argparse
import textwrap
import random
import re

import git
import github

import conda_smithy.github
import conda_smithy.lint_recipe
import conda_smithy

import conda_smithy.feedstocks as feedstocks


parser = argparse.ArgumentParser(description=('Lint all of the feedstocks, '
                                              'raising issues if there is any.'))
parser.add_argument('--feedstocks-dir', help="The location of the feedstocks.",
                    default="~/dev/conda-forge/feedstocks")
parser.add_argument('--regexp', help="Regexp of feedstocks to consider.",
                    default=".*")
args = parser.parse_args()

feedstocks_dir = os.path.expanduser(args.feedstocks_dir)
feedstocks.clone_all('conda-forge', feedstocks_dir)
feedstocks.fetch_feedstocks(feedstocks_dir)

regexp = re.compile(args.regexp)
randomised_feedstocks = [feedstock for feedstock in feedstocks.cloned_feedstocks(feedstocks_dir)
                         if regexp.match(feedstock.package)]
random.shuffle(randomised_feedstocks)

gh_token = conda_smithy.github.gh_token()
gh = github.Github(gh_token)
gh_forge = gh.get_organization('conda-forge')

# Set to false to debug.
if True:
    print("Collecting list of conda-forge repos...")
    forge_repos = {repo.name: repo for repo in gh_forge.get_repos()}
else:
    # For debugging, we turn our attention to a single feedstock.
    debug_name = 'libtiff-feedstock'
    forge_repos = {debug_name: gh_forge.get_repo(debug_name)}
    randomised_feedstocks = [feedstock for feedstock in randomised_feedstocks
                             if feedstock.name == debug_name]

for feedstock in randomised_feedstocks:
    print('Checking {}'.format(feedstock.name))

    clone = git.Repo(feedstock.directory)
    forge_feedstock = forge_repos[feedstock.name]

    clone.remotes.upstream.fetch()
    if clone.is_dirty():
        print(' * Skipping {}, the clone is dirty.'.format(feedstock.name))
        continue

    for branch in clone.remotes['upstream'].refs:
        # Detatch the head
        clone.head.reference = branch.commit
        clone.git.reset('--hard')

        lint = conda_smithy.lint_recipe.main(os.path.join(feedstock.directory, 'recipe'))
        if lint:
            title = 'MNT: The {} recipe has some lint :('.format(feedstock.package)
            open_issues = [issue for issue in forge_feedstock.get_issues()
                           if issue.title == title]
            if open_issues:
                print('Already has an open issue! {}'.format(', '.join([issue.html_url for issue in open_issues])))
            else:
                body = textwrap.dedent("""
                    This is the friendly conda-forge-admin automated user.

                    I've ran the conda-smithy linter and found some lint in this feedstock :cry:.

                    Here is what I have got:

                      * {}

                    Thanks!

                """.format('\n                      * '.join(lint)))
                issue = forge_feedstock.create_issue(title, body)
                print('Opened lint issue at {}'.format(issue.html_url))

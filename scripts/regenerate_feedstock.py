#!/usr/bin/env conda-execute

"""
This script is used to manage the feedstocks by regenerating the content (from conda-smithy).
The first feedstock found which needed re-generating will then have a branch pushed and a pull request open.

"""

# conda execute
# env:
#  - python
#  - conda-smithy
#  - gitpython
# channels:
#  - conda-forge
# run_with: python

import conda_smithy.feedstocks as feedstocks
import time
import argparse
import textwrap


parser = argparse.ArgumentParser(description='Propose a feedstock update.')
args = parser.parse_args()

"""
for feedstock in feedstocks.list_all:
    smithy_rerender feedstock
    if feedstock has diffs
        if remote "updated_smithy" branch check it out
        else create a new updated_smithy branch

        smithy_rerender onto the branch
        if changes commit
        push branch to remote
        if pull request for branch, add a comment
        else create a pull request
"""

import os
feedstocks_dir = os.path.expanduser("~/dev/conda-forge/feedstocks")

#feedstocks.clone_all('conda-forge', feedstocks_dir)
#feedstocks.fetch_feedstocks(feedstocks_dir)
# TODO: What about feedstocks that get removed?

import random
randomised_feedstocks = list(feedstocks.cloned_feedstocks(feedstocks_dir))
# Shuffle is in-place. :(
random.shuffle(randomised_feedstocks)

import git
import github
import conda_smithy.github

# XXX Ensure this is the conda-forge-admin token
gh_token = conda_smithy.github.gh_token()
gh = github.Github(gh_token)


gh_me = gh.get_user()

if gh_me.login != 'conda-forge-admin':
    raise ValueError("The github token isn't that of conda-forge-admin (it's "
                     "for {}), I'm going to have to bail.".format(gh_me.login))


gh_forge = gh.get_organization('conda-forge')


def my_repos(gh_user):
    return github.PaginatedList.PaginatedList(
                github.Repository.Repository,
                gh_user._requester,
                gh_user.url + "/repos",
                dict(affiliation="owner"))


def list_pulls(repo, state='open', head=None):
    url_parameters = dict(state=state)
    if head:
        url_parameters['head'] = head
    return github.PaginatedList.PaginatedList(
        github.PullRequest.PullRequest,
        repo._requester,
        repo.url + "/pulls",
        url_parameters
    )


my_repos = {repo.name: repo for repo in my_repos(gh_me)}
forge_repos = {repo.name: repo for repo in gh_forge.get_repos()}
if False:
    my_repos = {'pyproj-feedstock': gh_me.get_repo('pyproj-feedstock')}
    forge_repos = {'pyproj-feedstock': gh_me.get_repo('pyproj-feedstock')}
    randomised_feedstocks = [feedstock for feedstock in randomised_feedstocks
                             if feedstock.name == 'pyproj-feedstock']


for feedstock in randomised_feedstocks:
    print('Update process for {}'.format(feedstock.name))
    if feedstock.name not in forge_repos:
        raise ValueError("There exists a feedstock ({}) which isn't in the "
                         "conda-forge org.".format(feedstock.name))

    if feedstock.name not in my_repos:
        forge_repo = gh_forge.get_repo(feedstock.name)
        print('Forking {}'.format(feedstock.name))
        gh_me.create_fork(forge_repo)
        my_repos[feedstock.name] = gh_me.get_repo(feedstock.name)

    clone = git.Repo(feedstock.directory)
    admin_fork = my_repos[feedstock.name]
    forge_feedstock = forge_repos[feedstock.name]

    # Put an appropriate conda-forge-admin remote in place.
    if 'conda-forge-admin' in [remote.name for remote in clone.remotes]:
        clone.delete_remote('conda-forge-admin')
    clone.create_remote('conda-forge-admin', url=admin_fork.clone_url.replace('https://', 'https://{}@'.format(gh_token)))

    clone.remotes['conda-forge-admin'].fetch()
    clone.remotes.upstream.fetch()
    if 'feedstock_rerender' in clone.heads:
        clone.heads.master.checkout()
        clone.delete_head('feedstock_rerender', '-D')
    clone.create_head('feedstock_rerender', clone.remotes.upstream.refs.master).set_tracking_branch(clone.remotes.upstream.refs.master)

    # Reset the working tree to a clean state.
    clone.head.reset(index=True, working_tree=True)
    clone.heads.feedstock_rerender.checkout()

    import conda_smithy.configure_feedstock
    import conda_smithy
    conda_smithy.configure_feedstock.main(feedstock.directory)    

    if not clone.is_dirty():
        # We don't need this feedstock - it is slap-bang up to date. :)
        print("{} was checked, and is up-to-date".format(feedstock.name))
        continue

    # if no changes, continue. Else, commit, push and pull request.

    clone.git.add('-A')

    commit = clone.index.commit("MNT: Updated the feedstock for conda-smithy version {}.".format(conda_smithy.__version__))

    cfa = clone.remotes['conda-forge-admin']
    if 'feedstock_rerender' in cfa.refs:
        diff = commit.diff(clone.remotes['conda-forge-admin'].refs.feedstock_rerender)
        if not diff:
            # There were no differences between this and the remote feedstock_rerender, so just continue.
            print("{} was checked, and whilst there are changes needed, the PR is up-to-date".format(feedstock.name))
            continue

    clone.remotes['conda-forge-admin'].push('+feedstock_rerender')

    rerender_pulls = list(list_pulls(forge_feedstock, state='open', head='conda-forge-admin:feedstock_rerender'))
    CR = "\n"
    if rerender_pulls:
        pull = rerender_pulls[0]
        msg = textwrap.dedent("""
                It's the friendly automated conda-forge-admin here again.

                Just to let you know, I've updated this PR so that it has the latest render from conda-smithy (version {}).

                If there are no problems with it, please consider merging this PR.
                If there are concerns about it, please ping the 'conda-forge/core' team (using the @ notation in a comment).

                Thanks!
               """.format(conda_smithy.__version__))
        pull.create_issue_comment(msg)
        print('Updated PR on {}'.format(forge_feedstock.url))
    else:
        # TODO: Should there be one for each branch in the repo?
        msg = textwrap.dedent("""
                Hi! This is the friendly conda-forge-admin automated user.

                I've re-rendered this feedstock with the latest version of conda-smithy ({}) and noticed some changes.
                If the changes look good, then please go ahead and merge this PR.
                If you have any questions about the changes though, please feel free to ping the 'conda-forge/core' team (using the @ notation in a comment). 

                Remember, for any changes to the recipe you would normally need to increment the version or the build number of the package.
                Since this is an infrastructural change, we don't actually need/want a new version to be uploaded to anaconda.org/conda-forge, so the version and build/number are left unchanged.

                Thanks!

                """.format(conda_smithy.__version__))
        forge_feedstock.create_pull(title='MNT: Re-render the feedstock',
                               body=msg,
                               head="conda-forge-admin:feedstock_rerender", base="master")
        print('Opened PR on {}'.format(forge_feedstock.url))

    # Stop processing any more feedstocks until the next time the script is run.
    break

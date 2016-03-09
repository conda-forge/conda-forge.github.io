#!/usr/bin/env conda-execute

"""
This script is used to manage the feedstocks by regenerating the content (from conda-smithy).
The first feedstock found which needed re-generating will then have a branch pushed and a pull request open.

Whilst it is out of date, the following pseudo code was used to outline this module:

    for feedstock in feedstocks:
        checkout a clean branch named "feedstock_rerender" from upstream/master
        conda smithy rerender feedstock
        if feedstock has diffs:
            if diff between origin/feedstock_redender and "feedstock_rerender":
                force push origin/feedstock_rerender
                if pull request for branch:
                    add a comment
                else:
                    create a pull request
                break
"""
# conda execute
# env:
#  - python
#  - conda-smithy
#  - gitpython
#  - pygithub
# channels:
#  - conda-forge
# run_with: python

import os
import time
import argparse
from contextlib import contextmanager
import textwrap
import random
import git
import github
import conda_smithy.github

import conda_smithy.configure_feedstock
import conda_smithy

import conda_smithy.feedstocks as feedstocks


parser = argparse.ArgumentParser(description='Propose a feedstock update.')
parser.add_argument('--feedstocks-dir', help="The location of the feedstocks.",
                    default="~/dev/conda-forge/feedstocks")
args = parser.parse_args()

feedstocks_dir = os.path.expanduser(args.feedstocks_dir)

feedstocks.clone_all('conda-forge', feedstocks_dir)
feedstocks.fetch_feedstocks(feedstocks_dir)
# TODO: What about feedstocks that get removed?

randomised_feedstocks = list(feedstocks.cloned_feedstocks(feedstocks_dir))
# Shuffle is in-place. :(
random.shuffle(randomised_feedstocks)

gh_token = conda_smithy.github.gh_token()
gh = github.Github(gh_token)

gh_me = gh.get_user()

if gh_me.login != 'conda-forge-admin':
    raise ValueError("The github token isn't that of conda-forge-admin (it's "
                     "for {}), I'm going to have to bail.".format(gh_me.login))

gh_forge = gh.get_organization('conda-forge')


def my_repos(gh_user):
    """
    List all of my repos.
    See https://github.com/PyGithub/PyGithub/issues/390 for rationale.

    """
    return github.PaginatedList.PaginatedList(
                github.Repository.Repository,
                gh_user._requester,
                gh_user.url + "/repos",
                dict(affiliation="owner"))


def list_pulls(repo, state='open', head=None):
    """
    List all of the pull requests that match the given critera.

    At the time of writing, pygithub doesn't allow you to specify the head,
    so I had to create this function.

    """
    url_parameters = dict(state=state)
    if head:
        url_parameters['head'] = head
    return github.PaginatedList.PaginatedList(
        github.PullRequest.PullRequest,
        repo._requester,
        repo.url + "/pulls",
        url_parameters
    )


# Set to false to debug.
if True:
    print("Collecting list of conda-forge-admin repos...")
    my_repos = {repo.name: repo for repo in my_repos(gh_me)}
    print("Collecting list of conda-forge repos...")
    forge_repos = {repo.name: repo for repo in gh_forge.get_repos()}
else:
    # For debugging, we turn our attention to a single feedstock.
    debug_name = 'pyproj-feedstock'
    my_repos = {debug_name: gh_me.get_repo(debug_name)}
    forge_repos = {debug_name: gh_me.get_repo(debug_name)}
    randomised_feedstocks = [feedstock for feedstock in randomised_feedstocks
                             if feedstock.name == debug_name]


@contextmanager
def tmp_remote(repo, remote_name, url):
    if remote_name in [remote.name for remote in repo.remotes]:
        repo.delete_remote(remote_name)
    remote = repo.create_remote(remote_name, url)
    yield remote
    repo.delete_remote(remote_name)


for feedstock in randomised_feedstocks:
    print('Checking {}'.format(feedstock.name))
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
    with tmp_remote(clone, 'conda-forge-admin',
                    admin_fork.clone_url.replace('https://',
                                                 'https://{}@'.format(gh_token))) as remote:
        remote.fetch()
        clone.remotes.upstream.fetch()
        if 'feedstock_rerender' in clone.heads:
            clone.heads.master.checkout()
            clone.delete_head('feedstock_rerender', '-D')
        clone.create_head('feedstock_rerender', clone.remotes.upstream.refs.master).set_tracking_branch(clone.remotes.upstream.refs.master)

        # Reset the working tree to a clean state.
        clone.head.reset(index=True, working_tree=True)
        clone.heads.feedstock_rerender.checkout()

        # Technically, we can do whatever we like to the feedstock now. Let's just
        # update the feedstock though. For examples of other things that *have* been
        # done here - once upon a time @pelson modified the conda-forge.yaml config
        # item for every single feedstock, and submitted PRs for every project.
        conda_smithy.configure_feedstock.main(feedstock.directory)    

        if not clone.is_dirty():
            # We don't need this feedstock - it is slap-bang up to date. :)
            print("{} was checked, and is up-to-date".format(feedstock.name))
            continue

        # if no changes, continue. Else, commit, push and pull request.

        clone.git.add('-A')

        commit = clone.index.commit("MNT: Updated the feedstock for conda-smithy version {}.".format(conda_smithy.__version__))

        if 'feedstock_rerender' in remote.refs:
            diff = commit.diff(remote.refs.feedstock_rerender)
            if not diff:
                # There were no differences between this and the remote feedstock_rerender, so just continue.
                print("{} was checked, and whilst there are changes needed, the PR is up-to-date".format(feedstock.name))
                continue

        remote.push('+feedstock_rerender')

    rerender_pulls = list(list_pulls(forge_feedstock, state='open', head='conda-forge-admin:feedstock_rerender'))
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
        print('Updated PR on {}'.format(forge_feedstock.html_url))
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
        print('Opened PR on {}'.format(forge_feedstock.html_url))

    # Stop processing any more feedstocks until the next time the script is run.
    break

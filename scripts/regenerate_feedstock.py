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
#  - git
#  - python
#  - conda-smithy >=1.1.2
#  - conda-build-all >=1.0.2
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
import re

import git
import github

import conda_smithy.github
import conda_smithy.configure_feedstock
import conda_smithy

import conda_smithy.feedstocks as feedstocks


parser = argparse.ArgumentParser(description='Propose a feedstock update.')
parser.add_argument('--feedstocks-dir', help="The location of the feedstocks.",
                    default="~/dev/conda-forge/feedstocks")
regexp_or_package = parser.add_mutually_exclusive_group()
regexp_or_package.add_argument('--regexp', help="Regexp of feedstocks to consider.")
regexp_or_package.add_argument('--package', help="A specific package to check.")
parser.add_argument('--local', help="Whether to use the existing local checkouts of the feedstocks, or to fetch from upstream", action="store_true", default=False)
parser.add_argument('--limit', help="Limit the number of packages to propose changes for (0 is unlimited).",
                    default=1, type=int)
args = parser.parse_args()

feedstocks_dir = os.path.expanduser(args.feedstocks_dir)
change_limit = args.limit

if args.package:
    package_name = args.package
    package_feedstock = '{}-feedstock'.format(package_name)
    args.regexp = package_name

need_to_clone = args.local == False
feedstock_gen = feedstocks.feedstocks_yaml('conda-forge', feedstocks_dir, use_local=args.local,
                                           randomise=True, pull_up_to_date=need_to_clone, regexp=args.regexp)

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


if args.package:
    try:
        my_repos = {package_feedstock: gh_me.get_repo(package_feedstock)}
    except github.UnknownObjectException:
        # We haven't forked it yet!
        my_repos = {}
    forge_repos = {package_feedstock: gh_forge.get_repo(package_feedstock)}
else:
    print("Collecting list of conda-forge-admin repos...")
    my_repos = {repo.name: repo for repo in my_repos(gh_me)}
    print("Collecting list of conda-forge repos...")
    forge_repos = {repo.name: repo for repo in gh_forge.get_repos()}


@contextmanager
def tmp_remote(repo, remote_name, url):
    if remote_name in [remote.name for remote in repo.remotes]:
        repo.delete_remote(remote_name)
    remote = repo.create_remote(remote_name, url)
    yield remote
    repo.delete_remote(remote_name)


@contextmanager
def create_update_pr(clone, remote_head, fork_remote, upstream_remote):
    target_branch = 'feedstock_rerender_{}'.format(remote_head)
    if target_branch in clone.heads:
        # Detatch the head
        clone.head.reference = clone.commit('HEAD~1')
        clone.delete_head(target_branch, '-D')
    clone.create_head(target_branch, upstream_remote.refs[remote_head]).set_tracking_branch(upstream_remote.refs[remote_head])

    # Reset the working tree to a clean state.
    clone.head.reset(index=True, working_tree=True)
    clone.heads[target_branch].checkout()

    # It is at this point we pass context back to the caller so that they can
    # do whatever they like to the repo (like rerender the feedstock).
    context = []
    yield context

    # If nothing was done, don't need a PR!
    has_change = True
    if not clone.is_dirty():
        # We don't need this feedstock - it is slap-bang up to date. :)
        print("{} was checked, and is up-to-date".format(feedstock.name))
        has_change = False
    if has_change:
        clone.git.add('-A')
        from git import Actor
        author = Actor("conda-forge-admin", "pelson.pub+conda-forge@gmail.com")
        commit = clone.index.commit("MNT: Updated the feedstock for conda-smithy version {}.".format(conda_smithy.__version__),
                                    author=author)

        remote_branch_already_exists = target_branch in fork_remote.refs

        change_from_remote_branch = True
        full_ref = '{}/{}'.format(fork_remote.name, target_branch)
        if full_ref in [ref.name for ref in fork_remote.refs]:
            diff = commit.diff(fork_remote.refs[target_branch])
            if not diff:
                # There were no differences between this and the remote targt branch, so just continue.
                change_from_remote_branch = False

        if not remote_branch_already_exists or change_from_remote_branch:
            fork_remote.push('+{}'.format(target_branch))

        rerender_pulls = list(list_pulls(forge_feedstock, state='open', head='conda-forge-admin:{}'.format(target_branch)))
        if rerender_pulls:
            pull = rerender_pulls[0]
            if not change_from_remote_branch:
                print("{} was checked, and whilst there are changes needed, the PR ({}) is up-to-date".format(feedstock.name, pull.html_url))
            else:
                msg = textwrap.dedent("""
    It's the friendly automated conda-forge-admin here again.

    Just to let you know, I've updated this PR so that it has the latest render from conda-smithy (version {}).

    If there are no problems with it, please consider merging this PR.
    If there are concerns about it, please ping the 'conda-forge/core' team (using the @ notation in a comment).

    Thanks!
                       """.format(conda_smithy.__version__))
                pull.create_issue_comment(msg)
                print('Updated PR on {}'.format(pull.html_url))
        else:
            # There were no existing open PRs, so open one!
            msg = textwrap.dedent("""
Hi! This is the friendly conda-forge-admin automated user.

I've re-rendered this feedstock with the latest version of conda-smithy ({}) and noticed some changes.
If the changes look good, then please go ahead and merge this PR.
If you have any questions about the changes though, please feel free to ping the 'conda-forge/core' team (using the @ notation in a comment). 

Remember, for any changes to the recipe you would normally need to increment the version or the build number of the package.
Since this is an infrastructural change, we don't actually need/want a new version to be uploaded to anaconda.org/conda-forge, so the version and build/number are left unchanged and the CI has been skipped.

Thanks!

                    """.format(conda_smithy.__version__))
            pull = forge_feedstock.create_pull(title='MNT: Re-render the feedstock [ci skip]',
                                               body=msg,
                                               head="conda-forge-admin:{}".format(target_branch), base=remote_head)
            print('Opened PR on {}'.format(pull.html_url))
        context.append(pull)

count = 0
visited = []
for feedstock, git_ref, meta_content, recipe in feedstock_gen:
    if feedstock.name not in visited:
        print('Checking {}'.format(feedstock.name))
        visited.append(feedstock.name)

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

    skip_after_package = False

    # Put an appropriate conda-forge-admin remote in place.
    with tmp_remote(clone, 'conda-forge-admin',
                    admin_fork.clone_url.replace('https://',
                                                 'https://{}@'.format(gh_token))) as remote:
        try:
            remote.fetch()
        except git.exc.GitCommandError as ex:
            # Periodically this fetch fails with a "git remote error: access denied
            # or repository not exported". Presumably this is because we have only just
            # forked it and GitHub is taking time to catch up, so we wait a few seconds
            # and try again.
            print("Sleeping for 10s before retrying due to the following error: \n", str(ex))
            time.sleep(10)
            remote.fetch()

        remote_branch = git_ref.remote_head.replace('{}/'.format(gh_me.login), '')
        with create_update_pr(clone, remote_branch, remote, clone.remotes['upstream']) as pr:

            # Technically, we can do whatever we like to the feedstock now. Let's just
            # update the feedstock though. For examples of other things that *have* been
            # done here - once upon a time @pelson modified the conda-forge.yaml config
            # item for every single feedstock, and submitted PRs for every project.
            conda_smithy.configure_feedstock.main(feedstock.directory)
        if pr:
            skip_after_package = True

    # Stop processing any more feedstocks until the next time the script is run.
    if skip_after_package:
        count += 1

    if change_limit > 0 and count >= change_limit:
        break


#!/usr/bin/env conda-execute

# conda execute
# env:
#  - python
#  - conda-smithy >=1.1
#  - gitpython
#  - pygithub
# channels:
#  - conda-forge
# run_with: python

import argparse
from contextlib import contextmanager
import os
import random
import re
import textwrap
import time

import git
import github

import conda_smithy.github
import conda_smithy.feedstocks as feedstocks


# The version commented right after the comma is the one available for **Linux** in **defaults**.
# That version is assumed to be the same in all platforms and the one used to build all packages.
# BE VERY CAREFUL when updating pinnings. Make sure to check https://abi-laboratory.pro/tracker/
# for any incompatibility between versions.
# Also be aware that currently the following pinnings are used for both build and run meta.yaml
# sections. Defining the same pinning for both sections means we need to be more restrictive.
#
# For example, we used to define gmp as 'gmp >=5.0.1,<7'. This is wrong as it allows a package
# to be built against gmp 6.1.0 but run with 5.0.1.
# As showed by https://abi-laboratory.pro/tracker/timeline/gmp/ binaries built with 6.1.0 are not
# compatible with 5.0.1 (the other way around would be true).
pinned = {
          'boost': 'boost 1.64.*',  # 1.61.0
          'boost-cpp': 'boost-cpp 1.64.*',  # NA
          'bzip2': 'bzip2 1.0.*',  # 1.0.6
          'cairo': 'cairo 1.14.*',  # 1.12.18
          'ffmpeg': 'ffmpeg >=2.8,<2.8.11',  # NA
          'fontconfig': 'fontconfig 2.12.*',  # 2.12.1
          'freetype': 'freetype 2.7',  # 2.5.5
          'geos': 'geos 3.5.1',  # 3.5.0
          'giflib': 'giflib 5.1.*',  # NA
          'glib': 'glib 2.51.*',  # 2.50.2
          'gmp': 'gmp 6.1.*', # 6.1.0
          'harfbuzz': 'harfbuzz 1.3.4',  # 0.9.39
          'hdf5': 'hdf5 1.8.18|1.8.18.*',  # 1.8.17
          'icu': 'icu 58.*',  # 54.1
          'jpeg': 'jpeg 9*',  # 9b (but defaults is probably using 8d)
          'libblitz': 'libblitz 0.10|0.10.*',  # NA
          'libevent': 'libevent 2.0.*',  # 2.0.22
          'libmatio': 'libmatio 1.5.*',  # NA
          'libnetcdf': 'libnetcdf 4.4.*',  # 4.4.1
          'libpng': 'libpng >=1.6.28,<1.7',  # 1.6.27
          'libsvm': 'libsvm 3.21|3.21.*',  # NA
          'libtiff': 'libtiff >=4.0.3,<4.0.8',  # 4.0.6
          'libxml2': 'libxml2 2.9.*',  # 2.9.4
          'metis': 'metis 5.1.*',  # NA
          'mpfr': 'mpfr 3.1.*',  # 3.1.5
          'ncurses': 'ncurses 5.9',  # 5.9
          'netcdf-cxx4': 'netcdf-cxx4 4.3.*',  # NA
          'netcdf-fortran': 'netcdf-fortran 4.4.*',  #
          'openblas': 'openblas 0.2.19|0.2.19.*',  # 0.2.19
          'openssl': 'openssl 1.0.*',  # 1.0.2k
          'pango': 'pango 1.40.*',  # 1.40.3
          'pixman': 'pixman 0.34.*',  # 0.34.0
          'proj4': 'proj4 4.9.3',  # 4.9.2
          'pyqt': 'pyqt 5.6.*',  # 5.6.0
          'qt': 'qt 5.6.*',  # 5.6.2
          'readline': 'readline 6.2*',  # 6.2
          'sox': 'sox 14.4.2',  # NA
          'sqlite': 'sqlite 3.13.*',  # 3.13.0
          'tk': 'tk 8.5.*',  # 8.5.18
          'vlfeat': 'vlfeat 0.9.20',  # NA
          'xz': 'xz 5.2.*',  # 5.2.2
          'zlib': 'zlib 1.2.8',  # 1.2.8
        }

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

gh_token = conda_smithy.github.gh_token()
gh = github.Github(gh_token)

gh_me = gh.get_user()

if gh_me.login != 'conda-forge-admin':
    raise ValueError("The github token isn't that of conda-forge-admin (it's "
                     "for {}), I'm going to have to bail.".format(gh_me.login))

gh_forge = gh.get_organization('conda-forge')


if args.package:
    package_name = args.package
    package_feedstock = '{}-feedstock'.format(package_name)
    args.regexp = package_name

need_to_clone = args.local == False
feedstock_gen = feedstocks.feedstocks_yaml('conda-forge', feedstocks_dir, use_local=args.local,
                                           randomise=True, pull_up_to_date=need_to_clone, regexp=args.regexp)


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
    List all of the pull requests that match the given criteria.

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
    target_branch = 'feedstock_version_pin_{}'.format(remote_head)
    if target_branch in clone.heads:
        # Detach the head
        clone.head.reference = clone.commit('upstream/master')
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
        author = git.Actor(gh_me.login, gh_me.email)
        commit = clone.index.commit("MNT: Updated some of the pinned versions",
                                    author=author)

        change_from_remote_branch = True
        full_ref = '{}/{}'.format(fork_remote.name, target_branch)

        if full_ref in [ref.name for ref in fork_remote.refs]:
            diff = commit.diff(fork_remote.refs[target_branch])
            if not diff:
                # There were no differences between this and the remote targt branch, so just continue.
                print("{} was checked, and whilst there are changes needed, the branch ({}) is up-to-date".format(feedstock.name, target_branch))
                change_from_remote_branch = False

        fork_remote.push('+{}'.format(target_branch))

        if change_from_remote_branch:
            fork_remote.push('+{}'.format(target_branch))

            pull_requests = list(list_pulls(forge_feedstock, state='open', head='{}:{}'.format(gh_me.login, target_branch)))

            if pull_requests:
                pull = pull_requests[0]
                msg = textwrap.dedent("""
    It's the friendly automated conda-forge-admin here again.

    Just to let you know, I've updated this PR so that it has the latest pinned versions.

    If there are no problems with it, please consider merging this PR.
    If there are concerns about it, please ping the 'conda-forge/core' team (using the @ notation in a comment).

    Thanks!
                       """)
                pull.create_issue_comment(msg)
                print('Updated PR on {}'.format(pull.html_url))
            else:
                msg = textwrap.dedent("""
    Hi! This is the friendly conda-forge-admin automated user.

    I've bumped some of the conda-forge pinned versions, and noticed that it impacts this feedstock.
    If the changes look good, then please go ahead and merge this PR.
    If you have any questions about the changes though, please feel free to ping the 'conda-forge/core' team (using the @ notation in a comment).

    Thanks!

                """)

                pull = forge_feedstock.create_pull(title='MNT: Update pinned versions.',
                                                   body=msg,
                                                   head="{}:{}".format(gh_me.login, target_branch), base=remote_head)
                print('Opened PR on {}'.format(pull.html_url))
            context.append(pull)


count = 0
for feedstock, git_ref, meta_content, recipe in feedstock_gen:
    if feedstock.name not in forge_repos:
        raise ValueError("There exists a feedstock ({}) which isn't in the "
                         "conda-forge org.".format(feedstock.name))

    if feedstock.name not in my_repos:
        forge_repo = gh_forge.get_repo(feedstock.name)
        print('Forking {}'.format(feedstock.name))
        my_repos[feedstock.name] = gh_me.create_fork(forge_repo)

    clone = git.Repo(feedstock.directory)
    admin_fork = my_repos[feedstock.name]
    forge_feedstock = forge_repos[feedstock.name]

    skip_after_package = False

    # Put an appropriate conda-forge-admin remote in place.
    with tmp_remote(clone, gh_me.login,
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
            replacements = {}
            for section_name in ['run', 'build']:
                requirements = recipe.get('requirements')
                if requirements is None:
                    break
                section = requirements.get(section_name)
                if not section:
                    continue

                for pos, dep in enumerate(section):
                    for name, pin in pinned.items():
                        if re.match(r"^\s*%s\s*$" % name, dep) and dep != pin:
                            replacements['- ' + str(dep)] = '- ' + pin
            if replacements:
                current_build_number = recipe['build']['number']
                replacements['number: {}'.format(current_build_number)] = 'number: {}'.format(current_build_number + 1)
            content = meta_content
            for orig, new in replacements.items():
                content = re.sub(
                    # Use capture groups to get the indentation correct.
                    r"(^\s*)%s(\s*)$" % orig,
                    r"\1%s\2" % new,
                    content,
                    flags=re.MULTILINE)
            forge_yaml = os.path.join(feedstock.directory, 'recipe', 'meta.yaml')
            with open(forge_yaml, 'w') as fh:
                fh.write(content)
        if pr:
            skip_after_package = True
    # Stop processing any more feedstocks until the next time the script is run.
    if skip_after_package:
        count += 1

    if change_limit > 0 and count >= change_limit:
        break

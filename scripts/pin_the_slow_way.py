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


# Some links that point to backward compatibility
# https://abi-laboratory.pro/tracker/timeline/ffmpeg/
# https://abi-laboratory.pro/tracker/timeline/libtiff/
# https://abi-laboratory.pro/tracker/timeline/libzip/
# https://abi-laboratory.pro/tracker/timeline/fontconfig/
# https://abi-laboratory.pro/tracker/timeline/freetype/
# https://abi-laboratory.pro/tracker/timeline/openssl/
# https://abi-laboratory.pro/tracker/timeline/sqlite/
# https://abi-laboratory.pro/tracker/timeline/qt/
# https://abi-laboratory.pro/tracker/timeline/giflib/
# http://upstream.rosalinux.ru/versions/libgeos_c.html
# http://upstream.rosalinux.ru/versions/libgeos.html
# http://upstream.rosalinux.ru/versions/netcdf.html
# http://upstream.rosalinux.ru/versions/readline.html
# http://upstream.rosalinux.ru/versions/tk.html
# http://upstream.rosalinux.ru/versions/libsox.html
# http://upstream.rosalinux.ru/versions/zlib.html
# http://upstream.rosalinux.ru/versions/ncurses.html
# http://upstream.rosalinux.ru/versions/blitz.html

build_pin = {
          'boost': 'boost 1.61.*',
          'bzip2': 'bzip2 1.0.*',
          'ffmpeg': 'ffmpeg 2.8.*',
          'fontconfig': 'fontconfig 2.11.*',
          'freetype': 'freetype 2.6.*',
          'geos': 'geos 3.4.*',
          'giflib': 'giflib 5.1.2',
          'hdf5': 'hdf5 1.8.17|1.8.17.*',
          'icu': 'icu 56.*',
          'jpeg': 'jpeg 9*',
          'libblitz': 'libblitz 0.10|0.10.*',
          'libmatio': 'libmatio 1.5.*',
          'libnetcdf': 'libnetcdf 4.4.*',
          'libpng': 'libpng 1.6.21',
          'libsvm': 'libsvm 3.21|3.21.*',
          'libtiff': 'libtiff 4.0.*',
          'ncurses': 'ncurses 5.9*',
          'netcdf-cxx4': 'netcdf-cxx4 4.3.*',
          'netcdf-fortran': 'netcdf-fortran 4.4.*',
          'openblas': 'openblas 0.2.18|0.2.18.*',
          'openssl': 'openssl 1.0.2h',
          'proj.4': 'proj.4 4.9.3',
          'pyqt': 'pyqt 4.11.4',
          'qt': 'qt 4.8.5',
          'readline': 'readline 6.2*',
          'sox': 'sox 14.4.2',
          'sqlite': 'sqlite 3.13.*',
          'tk': 'tk 8.5.*',
          'vlfeat': 'vlfeat 0.9.20',
          'xz': 'xz 5.2.*',
          'zlib': 'zlib 1.2.8',
        }

run_pin = {
          'boost': 'boost 1.61.*',
          'bzip2': 'bzip2 >=1.0,<2',
          'ffmpeg': 'ffmpeg 2.8.*',
          'fontconfig': 'fontconfig >=2.11,<3',
          'freetype': 'freetype 2.6.*',
          'geos': 'geos 3.4.*',
          'giflib': 'giflib >=5.1.2,<6',
          'hdf5': 'hdf5 1.8.17|1.8.17.*',
          'icu': 'icu 56.*',
          'jpeg': 'jpeg 9*',
          'libblitz': 'libblitz 0.10|0.10.*',
          'libmatio': 'libmatio 1.5.*',
          'libnetcdf': 'libnetcdf >=4.4,<5',
          'libpng': 'libpng >=1.6.21,<1.7',
          'libsvm': 'libsvm 3.21|3.21.*',
          'libtiff': 'libtiff >=4.0,<5',
          'ncurses': 'ncurses >=5.9,<6',
          'openblas': 'openblas 0.2.18|0.2.18.*',
          'openssl': 'openssl >=1.0.2h,<1.1',
          'proj.4': 'proj.4 4.9.3',
          'pyqt': 'pyqt >=4.11.4,<5',
          'qt': 'qt >=4.8.5,<5',
          'readline': 'readline >=6.2,<7',
          'sox': 'sox 14.4.2',
          'sqlite': 'sqlite >=3.13,<4',
          'tk': 'tk 8.5.*',
          'vlfeat': 'vlfeat 0.9.20',
          'xz': '>=5.2,<6.0',
          'zlib': 'zlib >=1.2.8,<1.3',
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
    target_branch = 'feedstock_version_pin_{}'.format(remote_head)
    if target_branch in clone.heads:
        # Detatch the head
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
            content = meta_content
            req_idx = content.find('requirements:')
            if req_idx > -1:
                run_idx = content.find('run:', req_idx)
                build_idx = content.find('build:', req_idx)
                if run_idx > build_idx:
                    section_names = [('build', build_idx), ('run', run_idx)]
                else:
                    section_names = [('run', run_idx), ('build', build_idx)]
            replacements = {}
            for section_name in ['run', 'build']:
                requirements = recipe.get('requirements')
                if requirements is None:
                    break
                section = requirements.get(section_name)
                if not section:
                    continue
                if section_name == 'build':
                    pinned = build_pin
                else:
                    pinned = run_pin
                for pos, dep in enumerate(section):
                    for name, pin in pinned.items():
                        if dep.startswith(name) and dep != pin:
                            replacements[section_name + '- ' + str(dep)] = '- ' + pin
            if replacements:
                current_build_number = recipe['build']['number']
                replacements['number: {}'.format(current_build_number)] = 'number: {}'.format(current_build_number + 1)
                first_idx = section_names[0][1]
                if first_idx == -1:
                    last_idx = -1
                else:
                    last_idx = section_names[1][1]
                for i, (section_name, sec_idx) in enumerate(section_names):
                    for orig, new in replacements.items():
                        if not orig.split('-')[0] == section_name:
                            continue
                        if i == 0 or first_idx == -1:
                            content = content[:req_idx] + \
                                      content[req_idx:last_idx].replace(orig[len(section_name):], new, 1) + \
                                      content[last_idx:]
                        else:
                            content = content[:last_idx] +  \
                                      content[last_idx:].replace(orig[len(section_name):], new, 1)
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

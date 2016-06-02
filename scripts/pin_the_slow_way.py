#!/usr/bin/env conda-execute

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
import re

import git
import github

import conda_smithy.github
import conda_smithy.configure_feedstock
import conda_smithy

import conda_smithy.feedstocks as feedstocks


pinned = {
          'boost': 'boost 1.61.*',
          'bzip2': 'bzip2 1.0.*',
          'fontconfig': 'fontconfig 2.11.*',
          'freetype': 'freetype 2.6.*',
          'hdf5': 'hdf5 1.8.17|1.8.17.*',
          'icu': 'icu 56.*',
          'jpeg': 'jpeg 9*',
          'libnetcdf': 'libnetcdf 4.4.*',
          'libpng': 'libpng >=1.6.21,<1.7',
          'libtiff': 'libtiff 4.0.*',
          'ncurses': 'ncurses 5.9*',
          'openssl': 'openssl 1.0.*',
          'readline': 'readline 6.2*',
          'sqlite': 'sqlite 3.9.*',
          'tk': 'tk 8.5.*',
          'xz': 'xz 5.0.*',  # To be changed once we have the Python recipe.
          'zlib': 'zlib 1.2.*',
        }

parser = argparse.ArgumentParser(description='Propose a feedstock update.')
parser.add_argument('--feedstocks-dir', help="The location of the feedstocks.",
                    default="~/dev/conda-forge/feedstocks")
parser.add_argument('--regexp', help="Regexp of feedstocks to consider.",
                    default=".*")
parser.add_argument('--limit', help="Limit the number of packages to propose changes for (0 is unlimited).",
                    default=1, type=int)
args = parser.parse_args()

feedstocks_dir = os.path.expanduser(args.feedstocks_dir)
change_limit = args.limit

#feedstocks.clone_all('conda-forge', feedstocks_dir)
#feedstocks.fetch_feedstocks(feedstocks_dir)

regexp = re.compile(args.regexp)
randomised_feedstocks = [feedstock for feedstock in feedstocks.cloned_feedstocks(feedstocks_dir)
                         if regexp.match(feedstock.package)]
randomised_feedstocks = [feedstock for feedstock in randomised_feedstocks if feedstock.package not in ['boost', 'gdal', 'git', 'pandoc']]
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

    # TODO: Maybe we should sort the feedstocks into dependency order.
else:
    # For debugging, we turn our attention to a single feedstock.
    debug_name = 'libtiff-feedstock'
    debug_name = 'bob.io.image-feedstock'
    debug_name = 'expat-feedstock'
    try:
        my_repos = {debug_name: gh_me.get_repo(debug_name)}
    except github.UnknownObjectException:
        # We haven't forked it yet!
        my_repos = {}
    forge_repos = {debug_name: gh_forge.get_repo(debug_name)}
    randomised_feedstocks = [feedstock for feedstock in randomised_feedstocks
                             if feedstock.name == debug_name]


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
                       """.format(conda_smithy.__version__))
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


from ruamel.yaml.comments import CommentedBase
def set_start_comment(self, comment, indent=0):
    """overwrites any preceding comment lines on an object expects comment to be without `#` and possible have mutlple lines """
    from ruamel.yaml.error import Mark
    from ruamel.yaml.tokens import CommentToken
    if self.ca.comment is None:
        pre_comments = []
        self.ca.comment = [None, pre_comments]
    else:
        pre_comments = self.ca.comments[1]

    if comment[-1] == '\n':
        comment = comment[:-1]
        # strip final newline if there
    start_mark = Mark(None, None, None, indent, None, None)
    for com in comment.split('\n'):
        pre_comments.append(CommentToken('# ' + com + '\n', start_mark, None))

if not hasattr(CommentedBase, 'set_start_comment'): 
    CommentedBase.set_start_comment = set_start_comment

import jinja2
class NullUndefined(jinja2.Undefined):
    def __unicode__(self):
        return unicode(self._undefined_name)

    def __getattr__(self, name):
        return unicode('{}.{}'.format(self, name))

    def __getitem__(self, name):
        return '{}["{}"]'.format(self, name)
env = jinja2.Environment(undefined=NullUndefined)

count = 0
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

    skip_after_package = False

    # Put an appropriate conda-forge-admin remote in place.
    with tmp_remote(clone, gh_me.login,
                    admin_fork.clone_url.replace('https://',
                                                 'https://{}@'.format(gh_token))) as remote:
        remote.fetch()
        clone.remotes.upstream.fetch()
        for branch in clone.remotes['upstream'].refs:
            remote_branch = branch.remote_head.replace('{}/'.format(gh_me.login), '')
            with create_update_pr(clone, remote_branch, remote, clone.remotes['upstream']) as pr:

                # Technically, we can do whatever we like to the feedstock now. Let's just
                # update the feedstock though. For examples of other things that *have* been
                # done here - once upon a time @pelson modified the conda-forge.yaml config
                # item for every single feedstock, and submitted PRs for every project.
#                conda_smithy.configure_feedstock.main(feedstock.directory)

                import ruamel.yaml
                forge_yaml = os.path.join(feedstock.directory, 'recipe', 'meta.yaml')
                with open(forge_yaml, 'r') as fh:
                    content = ''.join(fh)
                parsable_content = env.from_string(content).render(os=os)
                code = ruamel.yaml.load(parsable_content, ruamel.yaml.RoundTripLoader)

                replacements = {}
                for section_name in ['run', 'build']:
                    requirements = code.get('requirements')
                    if requirements is None:
                        break
                    section = requirements.get(section_name)
                    if not section:
                        continue

                    for pos, dep in enumerate(section):
                        for name, pin in pinned.items():
                            if dep.startswith(name) and dep != pin:
                                replacements['- ' + str(dep)] = '- ' + pin
                if replacements:
                    current_build_number = code['build']['number']
                    replacements['number: {}'.format(current_build_number)] = 'number: {}'.format(current_build_number + 1)
                for orig, new in replacements.items():
                    content = content.replace(orig, new)
                with open(forge_yaml, 'w') as fh:
                    fh.write(content)
            if pr:
                skip_after_package = True
    # Stop processing any more feedstocks until the next time the script is run.
    if skip_after_package:
        count += 1

    if change_limit > 0 and count >= change_limit:
        break

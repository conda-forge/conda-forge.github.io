#!/usr/bin/env conda-execute

# conda execute
# env:
#  - python >=2.7
#  - setuptools
#  - beautifulsoup4
#  - conda-smithy
#  - gitpython
#  - jinja2
#  - pygithub >=1.29,<2
#  - pyyaml
#  - requests
#  - tqdm
# channels:
#  - conda-forge
# run_with: python

"""
Usage:
python tick_my_feedstocks.py [-h]
[--password GH_PASSWORD] [--user GH_USER]
[--no-regenerate] [--no-rerender] [--dry-run]
[--targetfile TARGETFILE]
[--target-feedstocks [TARGET_FEEDSTOCKS [TARGET_FEEDSTOCKS ...]]]
[--limit-feedstocks LIMIT_FEEDSTOCKS]
[--limit-outdated LIMIT_OUTDATED]
[--skipfile SKIPFILE]
[--skip-feedstocks [SKIP_FEEDSTOCKS [SKIP_FEEDSTOCKS ...]]]

or

conda execute tick_my_feedstocks.py [-h]
[--password GH_PASSWORD] [--user GH_USER]
[--no-regenerate] [--no-rerender] [--dry-run]
[--targetfile TARGETFILE]
[--target-feedstocks [TARGET_FEEDSTOCKS [TARGET_FEEDSTOCKS ...]]]
[--limit-feedstocks LIMIT_FEEDSTOCKS]
[--limit-outdated LIMIT_OUTDATED]
[--skipfile SKIPFILE]
[--skip-feedstocks [SKIP_FEEDSTOCKS [SKIP_FEEDSTOCKS ...]]]


NOTE that your oauth token should have these abilities:
* public_repo
* read:org
* delete_repo.

This script:
1. identifies all of the feedstocks maintained by a user
2. attempts to determine F, the subset of feedstocks that need updating
3. attempts to determine F_i, the subset of F that have no dependencies
  on other members of F
4. attempts to patch each member of F_i with the new version number and hash
5. attempts to regenerate each member of F_i with the installed version
  of conda-smithy
6. submits a pull request for each member of F_i to the appropriate
  conda-forge repoository

IMPORTANT NOTES:
* We get version information from PyPI. If the feedstock isn't based on PyPI,
  it will raise an error. (Execution will continue.)
* All feedstocks updated with this script SHOULD BE DOUBLE-CHECKED! Because
  conda-forge tests are lightweight, even if the requirements have changed the
  tests may still pass successfully.
"""
# TODO pass token/user to pygithub for push. (Currently uses system config.)
# TODO Modify --dry-run flag to list which repos need forks.
# TODO Modify --dry-run flag to list which forks are dirty.
# TODO Modify --dry-run to also cover regeneration
# TODO skip upgrading from a stable release to a dev release (e.g. ghost.py)
#  (This is useful but not critical, since we can provide skip lists)
# TODO Deeper check of dependency changes in meta.yaml.
# TODO Check installed conda-smithy against current feedstock conda-smithy.
# TODO Check if already-forked feedstocks have open pulls.
# TODO maintainer_can_modify flag when submitting pull
#  Note that this isn't supported by pygithub yet, so would require
#  switching back to requests
# TODO Suppress regeneration text output
# TODO improve the tqdm progress bar during regeneration.

import argparse
from base64 import b64encode
from collections import defaultdict
from collections import namedtuple
from git import Actor
from git import Repo
from github import Github
from github import GithubException
from github import UnknownObjectException
import hashlib
from jinja2 import Template
from jinja2 import UndefinedError
import os
from pkg_resources import parse_version
import re
import requests
import shutil
import stat
import tempfile
from tqdm import tqdm
import urllib
import yaml

# Find places where Jinja variables are set
jinja_set_regex = re.compile('{% *set +([^ ]+) *= "?([^ "]+)"? *%}')

# Find places where YAML variables are assigned using Jinja variables
yaml_jinja_assign_regex = re.compile(' +([^:]+): *[^ ]*({{ .* }}.*)')

# Jinja template informaton
# Value being set and the setting string
# tpl(str, str)
jinja_var = namedtuple('jinja_var', ['value', 'string'])

# result tuple
# Success bool and any related data
# tpl(bool, None|str|status_data)
result_tuple = namedtuple('result_tuple', ['success', 'data'])

# status_data tuple
# data for updating a feedstock
# tpl(Feedstock_Meta_Yaml, str,  str)
status_data = namedtuple('status_data', ['meta_yaml',
                                         'version',
                                         'blob_sha'])

# feedstock status tuple
# pairing of a feedstock and its status data
# tpl(github.Repository.Repository, status_data)
fs_status = namedtuple('fs_status', ['fs', 'sd'])

# Ordered list of acceptable ways source can be packaged.
source_bundle_types = ["tar.gz", "tar.bz2", "zip", "bz2"]


# stream_url_progress and hash_url are vendored from rever
def stream_url_progress(url, verb='downloading', chunksize=1024):
    """Generator yielding successive bytes from a URL.

    Parameters
    ----------
    url : str
        URL to open and stream
    verb : str
        Verb to prefix the url downloading with, default 'downloading'
    chunksize : int
        Number of bytes to return, defaults to 1 kb.

    Returns
    -------
    yields the bytes which is at most chunksize in length.

    Copyright (c) 2017, Anthony Scopatz
    """
    nbytes = 0
    print(verb + ' ' + url)
    with urllib.request.urlopen(url) as f:
        totalbytes = f.length
        while True:
            b = f.read(chunksize)
            lenbytes = len(b)
            nbytes += lenbytes
            if lenbytes == 0:
                break
            else:
                yield b
            if totalbytes is None:
                totalbytes = f.length


def hash_url(url, hash='sha256'):
    """Hashes a URL and returns the hex representation

    Copyright (c) 2017, Anthony Scopatz"""
    hasher = getattr(hashlib, hash)()
    for b in stream_url_progress(url, verb='Hashing'):
        hasher.update(b)
    return hasher.hexdigest()


def parse_feedstock_file(feedstock_fpath):
    """
    Takes a file with space-separated feedstocks on each line and comments
    after hashmarks, and returns a list of feedstocks
    :param str feedstock_fpath:
    :return: `list` -- list of feedstocks
    """
    from itertools import chain

    if not (isinstance(feedstock_fpath, str) and
            os.path.exists(feedstock_fpath)):
        return list()

    try:
        with open(feedstock_fpath, 'r') as infile:
            feedstocks = list(
                chain.from_iterable(x.split('#')[0].strip().split()
                                    for x in infile)
            )
    except:
        return list()

    return feedstocks


class Feedstock_Meta_Yaml:
    """
    A parser for and modifier of a feedstock's meta.yaml file.
    Because many feedstocks use Jinja templates in their meta.yaml files
    and because we'd like to minimize the number of changes to meta.yaml
    when submitting a patch, this class can be used to help keep the
    manage the file's content and keep changes small.
    """

    def _parse_text(self):
        """
        Extract different variables from the raw text
        """
        try:
            self._yaml_dict = yaml.load(Template(self._text).render(),
                                        Loader=yaml.BaseLoader)
        except UndefinedError:
            # assume we hit a RECIPE_DIR reference in the vars
            # and can't parse it.
            # just erase for now
            try:
                self._yaml_dict = yaml.load(
                    Template(re.sub('{{ (environ\[")?RECIPE_DIR("])? }}/',
                                    '',
                                    self._text)
                             ).render(),
                    Loader=yaml.BaseLoader)
            except UndefinedError:
                raise UndefinedError("Can't parse meta.yaml")

        for x, y in [('package', 'version'),
                     ('source', 'fn')]:
            if y not in self._yaml_dict[x]:
                raise KeyError('Missing meta.yaml key: [{}][{}]'.format(x, y))

        if 'sha256' in self._yaml_dict['source']:
            self.checksum_type = 'sha256'
        elif 'md5' in self._yaml_dict['source']:
            self.checksum_type = 'md5'
        else:
            raise KeyError('Missing meta.yaml key for checksum')

        splitter = '-{}.'.format(self._yaml_dict['package']['version'])
        self.package, self.bundle_type = \
            self._yaml_dict['source']['fn'].split(splitter)
        self.package_type = None
        self.package_owner = None
        self.package_url = None
        if 'github' in self._yaml_dict['source']['url']:
            self.package_type = 'github'
            split_url = self._yaml_dict['source']['url'].lower().split('/')
            self.package_owner = split_url[split_url.index('github.com') + 1]
            self.package_url = self._yaml_dict['source']['url']
        else:
            self.package_type = 'pypi'

        self.reqs = set()
        for step in self._yaml_dict['requirements']:
            self.reqs.update({x.split()[0]
                              for x in self._yaml_dict['requirements'][step]})

        # Get variables defined in the Jinja template
        self.jinja_vars = dict()
        for j_v in re.finditer(jinja_set_regex, self._text):
            grps = j_v.groups()
            match_str = j_v.string[j_v.start(): j_v.end()]
            self.jinja_vars[grps[0]] = jinja_var(grps[1], match_str)

        # Get YAML variables assigned Jinja variables
        self.yaml_jinja_refs = {y_j.groups()[0]: y_j.groups()[1]
                                for y_j in re.finditer(yaml_jinja_assign_regex,
                                                       self._text)}

    def __init__(self, raw_text):
        """
        :param str raw_text: The complete raw text of the meta.yaml file
        """
        self._text = raw_text
        self._parse_text()

    def build(self):
        """
        Get current build number.
        :return: `str` -- the extracted build number
        """
        return str(self._yaml_dict['build']['number'])

    def version(self):
        """
        Get the current version string.
        A look up into a dictionary. Probably Unneeded.
        :return: `str` -- the extracted version string
        """
        return self._yaml_dict['package']['version']

    def checksum(self):
        """
        Get the current checksum.
        A look up into a dictionary. Probably Unneeded.
        :return: `str` -- the current checksum
        """
        return self._yaml_dict['source'][self.checksum_type]

    def find_replace_update(self, mapping):
        """
        Find and replace values in the raw text.
        :param dict mapping: keys are old values, values are new values
        """
        for key in sorted(mapping.keys()):
            self._text = self._text.replace(key, mapping[key])

        self._parse_text()

    def set_build_number(self, new_number):
        """
        Reset the build number
        :param int|str new_number: New build number
        :return: `bool` -- True if replacement successful or unneeded, False if
        failed
        """
        if str(new_number) == self._yaml_dict['build']['number']:
            # Nothing to do
            return True

        if 'number' in self.yaml_jinja_refs:
            # We *assume* that 'number' is for assigning the build
            # We *assume* that there's only one variable involved in the
            # assignment
            build_var = self.yaml_jinja_refs['number'].split()[1]
            mapping = {self.jinja_vars[build_var].string:
                '{{% set {key} = {val} %}}'.format(
                    key=build_var,
                    val=new_number)}
        else:
            build_num_regex = re.compile('number: *{}'.format(
                self._yaml_dict['build']['number']))
            matches = re.findall(build_num_regex, self._text)
            if len(matches) != 1:
                # Multiple number lines
                # or no number lines
                # So give up
                return False

            mapping = {matches[0]: 'number: {}'.format(new_number)}

        self.find_replace_update(mapping)
        return True

    def encoded_text(self):
        """
        Get the encoded version of the current raw text
        :return: `str` --  the text encoded as a b64 string
        """
        return b64encode(self._text.encode('utf-8')).decode('utf-8')


def pypi_legacy_json_sha(package_name, version):
    """
    Use PyPI's legacy JSON API to get the SHA256 of the source bundle
    :param str package_name: Name of package (PROPER case)
    :param str version: version for which to get sha
    :return: `tpl(str,str)|tpl(None,None)` -- bundle_type,SHA or None,None
    """
    r = requests.get('https://pypi.org/pypi/{}/json'.format(package_name))
    if not r.ok:
        return None, None
    jsn = r.json()

    if version not in jsn['releases']:
        return None, None

    release = None
    for bundle_type in source_bundle_types:
        try:
            release = next(x for x
                           in jsn['releases'][version]
                           if x['filename'].endswith('.' + bundle_type))
            return bundle_type, release['digests']['sha256']
        except StopIteration:
            # No bundle of target type
            continue
        except KeyError:
            # No key  for the sha.
            release = None

    if release is None:
        return None, None


def pypi_org_sha(package_name, version):
    """
    Scrape pypi.org for SHA256 of the source bundle
    :param str package_name: Name of package (PROPER case)
    :param str version: version for which to get sha
    :return: `str,str|None,None` -- bundle type,SHA for source, None,None if
    can't be found
    """
    import warnings
    from bs4 import BeautifulSoup
    warnings.filterwarnings("ignore", category=UserWarning, module='bs4')

    r = requests.get('https://pypi.org/project/{}/{}/#files'.format(
        package_name,
        version))

    bs = BeautifulSoup(r.text)
    for bundle_type in source_bundle_types:
        try:
            url_pattern = re.compile(
                'https://files.pythonhosted.org.*{}-{}.{}'.format(package_name,
                                                                  version,
                                                                  bundle_type))
            sha_val = bs.find('a', {'href': url_pattern}
                              ).next.next.next['data-clipboard-text']
            return bundle_type, sha_val
        except AttributeError:
            # Bad parsing of page, couldn't get SHA256
            continue

    return None, None


def sha(package, version, package_type='pypi', package_url=None,
        prior_version=None):
    """
    :param str package: The name of the package in PyPI
    :param str version: The version to be retrieved from PyPI.
    :return: `str|None` -- SHA256 for a source bundle, None if can't be found
    """
    if package_type == 'github':
        package_url = package_url.replace(prior_version, version)
        return hash_url(package_url)
    else:
        bundle_type, sha = pypi_legacy_json_sha(package, version)
        if bundle_type is not None and sha is not None:
            return bundle_type, sha
        return pypi_org_sha(package, version)


def version_str(package_name, package_type='pypi', package_owner=None):
    """
    Retrive the latest version of a package in PyPI
    :param str package_name: The name of the package
    :param str package_type: The type of package ('pypi' or 'github')
    :return: `str|bool` -- Version string, False if unsuccessful
    """
    if package_type == 'pypi':
        r = requests.get('https://pypi.python.org/pypi/{}/json'.format(
            package_name))
        if not r.ok:
            return False
        return r.json()['info']['version'].strip()
    elif package_type == 'github':
        # get all the tags
        refs = requests.get('https://api.github.com/repos/{owner}/'
                         '{repo}/git/refs/tags'.format(owner=package_owner,
                                                       repo=package_name))
        if not refs.ok:
            return False
        # Extract all the non rc tags
        tags = [parse_version(r['ref'].split('/')[-1]) for r in refs if
                'rc' not in r['ref']]
        # return the most recent tag
        return max(tags)


def user_feedstocks(user, limit=-1, skips=None):
    """
    :param github.AuthenticatedUser.AutheticatedUser user:
    :param  int limit: If greater than -1, max number of feedstocks to return
    :param list|set skips: an iterable of the names of feedstocks that should
    be skipped
    :return: `tpl(int,list)` -- count of skipped feedstocks, list of
    conda-forge feedstocks the user maintains
    """
    if skips is None:
        skips = set()

    skip_count = 0
    feedstocks = []
    for team in tqdm(user.get_teams(), desc='Finding feedstock teams...'):

        # Check if we've hit the feedstock limit
        if limit > -1 and len(feedstocks) >= limit:
            break

        # Each conda-forge team manages one feedstock
        # If a team has more than one repo, skip it.
        if team.repos_count != 1:
            continue

        repo = list(team.get_repos())[0]
        if not repo.full_name.startswith('conda-forge/') or \
                not repo.full_name.endswith('-feedstock'):
            continue

        if repo.name in skips:
            skip_count += 1
            continue

        feedstocks.append(repo)

    return skip_count, feedstocks


def feedstock_status(feedstock):
    """
    Return whether a feedstock is out of date and any information needed to
    update it.
    :param github.Repository.Repository feedstock:
    :return: `tpl(bool,bool,None|status_data)` -- bools indicating success and
    either None or a status_data tuple
    """
    fs_contents = feedstock.get_contents('recipe/meta.yaml')
    try:
        meta_yaml = Feedstock_Meta_Yaml(
            fs_contents.decoded_content.decode('utf-8'))
    except (UndefinedError, KeyError) as e:
        return result_tuple(False, e.args[0])

    version = version_str(meta_yaml.package,
                          meta_yaml.package_type,
                          meta_yaml.package_owner)
    if version is False:
        return result_tuple(False, "Couldn't find package in PyPI")

    if parse_version(meta_yaml.version()) >= parse_version(version):
        return result_tuple(True, None)

    return result_tuple(True,
                        status_data(meta_yaml,
                                    version,
                                    fs_contents.sha))


def even_feedstock_fork(user, feedstock):
    """
    Return a fork that's even with the latest version of the feedstock
    If the user has a fork that's ahead of the feedstock, do nothing
    :param github.AuthenticatedUser.AuthenticatedUser user: GitHub user
    :param github.Repository.Repository feedstock: conda-forge feedstock
    :return: `None|github.Repository.Repository` -- None if no fork, else the
    repository
    """
    try:
        fork = user.create_fork(feedstock)
    except UnknownObjectException:
        raise ValueError('Got 404 when creating fork')
    try:
        comparison = fork.compare(base='{}:master'.format(user.login),
                                  head='conda-forge:master')
    except UnknownObjectException:
        raise ValueError('Got 404 when comparing forks, left new fork')

        # TODO Solve the mystery of why github times are misbehaving
        #  and then check if a fork was just created and can be purged.
        # from datetime import datetime
        # seconds_since_creation = (
        #     datetime.now() - fork.created_at).total_seconds()
        # print('seconds_since_creation = {}'.format(seconds_since_creation))
        # if seconds_since_creation > 10:
        #     # Assume fork is old, so don't clean it up
        #     raise ValueError('Got 404 when comparing forks, left fork')
        #
        # try:
        #     fork.delete()
        # except UnknownObjectException:
        #     raise ValueError(
        #         "Got 404 when comparing forks, couldn't clean up")
        #
        # raise ValueError(
        #     'Got 404 when comparing forks, cleaned up fork')

    if comparison.behind_by > 0:
        # head is *behind* the base
        # conda-forge is behind the fork
        # leave everything alone - don't want a mess.
        raise ValueError('local fork is ahead of conda-forge')

    if comparison.ahead_by > 0:
        # head is *ahead* of base
        # conda-forge is ahead of the fork
        # delete fork and clone from scratch
        try:
            fork.delete()
        except GithubException:
            # couldn't delete feedstock
            # give up, don't want a mess.
            raise ValueError("Couldn't delete outdated fork")

        try:
            fork = user.create_fork(feedstock)
        except UnknownObjectException:
            raise ValueError('Got 404 when re-creating fork')

    return fork


def regenerate_fork(fork):
    """
    :param github.Repository.Repository fork: fork of conda-forge feedstock
    :return: `bool` -- True if regenerated, false otherwise
    """
    import conda_smithy
    import conda_smithy.configure_feedstock

    # Would need me to pass gh_user, gh_password
    # subprocess.run(["./renderer.sh", gh_user, gh_password, fork.name])

    working_dir = tempfile.mkdtemp()
    local_repo_dir = os.path.join(working_dir, fork.name)
    r = Repo.clone_from(fork.clone_url, local_repo_dir)
    conda_smithy.configure_feedstock.main(local_repo_dir)

    if not r.is_dirty():
        # No changes made during regeneration.
        # Clean up and return
        shutil.rmtree(working_dir, onerror=remove_readonly)
        return False

    commit_msg = \
        'MNT: Updated the feedstock for conda-smithy version {}.'.format(
            conda_smithy.__version__)
    r.git.add('-A')
    r.index.commit(commit_msg,
                   author=Actor(fork.owner.login, fork.owner.email))
    r.git.push()

    shutil.rmtree(working_dir, onerror=remove_readonly)
    return True


def remove_readonly(func, path, excinfo):
    os.chmod(path, stat.S_IWRITE)
    func(path)


def tick_feedstocks(gh_password=None,
                    gh_user=None,
                    no_regenerate=False,
                    dry_run=False,
                    targetfile=None,
                    target_feedstocks=None,
                    limit_feedstocks=-1,
                    limit_outdated=-1,
                    skipfile=None,
                    skip_feedstocks=None):
    """
    Finds all of the feedstocks a user maintains that can be updated without
    a dependency conflict with other feedstocks the user maintains,
    creates forks, ticks versions and hashes, and regenerates,
    then submits a pull
    :param str|None gh_password: GitHub password or OAuth token (if omitted,
    check environment vars)
    :param str|None gh_user: GitHub username (can be omitted with OAuth)
    :param bool no_regenerate: If True, don't regenerate feedstocks before
    submitting pull requests
    :param bool dry_run: If True, do not apply generate patches, fork
    feedstocks, or regenerate
    :param str targetfile: path to file listing feedstocks to use
    :param list|set target_feedstocks: list or set of feedstocks to use
    :param int limit_feedstocks: If greater than -1, maximum number of
    feedstocks to retrieve and check for updateds
    :param int limit_outdated: If greater than -1, maximum number of outdated
    feedstocks to check for patching
    :param str skipfile: path to file listing feedstocks to skip
    :param list|set skip_feedstocks: list or set of feedstocks to skip
    """
    if gh_password is None:
        gh_password = os.getenv('GH_TOKEN')
        if gh_password is None:
            raise ValueError('No password or OAuth token provided, '
                             'and no OAuthToken as GH_TOKEN in environment.')

    if gh_user is None:
        g = Github(gh_password)
        user = g.get_user()
        gh_user = user.login
    else:
        g = Github(gh_user, gh_password)
        user = g.get_user()

    targets = set()
    if isinstance(target_feedstocks, (set, list)):
        targets.update(target_feedstocks)
    targets.update(parse_feedstock_file(targetfile))

    skips = set()
    if isinstance(skip_feedstocks, (set, list)):
        skips.update(skip_feedstocks)
    skips.update(parse_feedstock_file(skipfile))

    if len(targets) > 0:
        # If we have specific target feedstocks only retrieve those
        skip_count = len(targets & skips)
        feedstocks = []
        for name in targets - skips:
            repo = g.get_repo('conda-forge/{}'.format(name))
            try:
                repo.full_name
                feedstocks.append(repo)
            except UnknownObjectException:
                # couldn't get repo, so error out
                raise ValueError(
                    "Couldn't retrieve repository: {}".format(name))

    else:
        # If we have no specific targets
        # review all teams and filter based on those
        skip_count, feedstocks = user_feedstocks(user, limit_feedstocks, skips)

    can_be_updated = list()
    status_error_dict = defaultdict(list)
    for feedstock in tqdm(feedstocks, desc='Checking feedstock statuses...'):
        status = feedstock_status(feedstock)
        if status.success and status.data is not None:
            can_be_updated.append(fs_status(feedstock, status.data))
        elif not status.success:
            status_error_dict[status.data].append(feedstock.name)

        if limit_outdated > -1 and len(can_be_updated) >= limit_outdated:
            break

    package_names = set([x.fs.name[:-10] for x in can_be_updated])
    indep_updates = [x for x in can_be_updated
                     if len(x.sd.meta_yaml.reqs & package_names) < 1]

    successful_forks = list()
    successful_updates = list()
    patch_error_dict = defaultdict(list)
    fork_error_dict = defaultdict(list)
    error_dict = defaultdict(list)
    for update in tqdm(indep_updates, desc='Updating feedstocks'):

        new_bundle_type, new_sha = sha(
            update.sd.meta_yaml.package,
            update.sd.version,
            update.sd.meta_yaml.package_type,
            update.sd.meta_yaml.package_url,
            update.sd.meta_yaml.version()
        )

        if new_bundle_type is None and new_sha is None:
            patch_error_dict["Couldn't get SHA from PyPI"].append(
                update.fs.name)
            continue

        # generate basic patch
        mapping = {update.sd.meta_yaml.version():
                       update.sd.version,
                   update.sd.meta_yaml.checksum(): new_sha}

        if update.sd.meta_yaml.checksum_type != 'sha256':
            mapping[update.sd.meta_yaml.checksum_type] = 'sha256'

        if new_bundle_type != update.sd.meta_yaml.bundle_type:
            mapping[update.sd.meta_yaml.bundle_type] = new_bundle_type

        update.sd.meta_yaml.find_replace_update(mapping)

        if update.sd.meta_yaml.build() != '0':
            update.sd.meta_yaml.set_build_number(0)

        if dry_run:
            # Skip additional processing here.
            continue

        # make fork
        try:
            fork = even_feedstock_fork(user, update.fs)
        except ValueError as e:
            fork_error_dict[e.args[0]].append(update.fs.name)
            continue

        if fork is None:
            fork_error_dict["Unspecified failure"].append(update.fs.name)
            continue

        # patch fork
        r = requests.put(
            'https://api.github.com/repos/{}/contents/recipe/meta.yaml'.format(
                fork.full_name),
            json={'message':
                      'Tick version to {}'.format(update.sd.version),
                  'content': update.sd.meta_yaml.encoded_text(),
                  'sha': update.sd.blob_sha
                  },
            auth=(gh_user, gh_password))
        if not r.ok:
            error_dict["Couldn't apply patch"].append(update.fs.name)
            continue

        successful_updates.append(update)
        successful_forks.append(fork)

    if no_regenerate:
        print('Skipping regenerating feedstocks.')
    else:
        for fork in tqdm(successful_forks, desc='Regenerating feedstocks...'):
            regenerate_fork(fork)

    pull_count = 0
    for update in tqdm(successful_updates, desc='Submitting pulls...'):
        try:
            update.fs.create_pull(title='Ticked version, '
                                        'regenerated if needed. '
                                        '(Double-check reqs!)',
                                  body='Made using `tick_my_feedstocks.py`!\n'
                                       '- [ ] **I have vetted this recipe**',
                                  head='{}:master'.format(gh_user),
                                  base='master')
        except GithubException:
            error_dict["Couldn't create pull"].append(update.fs.name)
            continue

        pull_count += 1

    print('{} feedstock(s) skipped.'.format(skip_count))
    print('{} feedstock(s) checked.'.format(len(feedstocks)))
    print('  {} feedstock(s) '
          'were out-of-date.'.format(len(can_be_updated)))
    print('  {} feedstock(s) '
          'were independent of other out-of-date feedstocks'.format(
        len(indep_updates)))
    print('  {} feedstock(s) '
          'had pulls submitted.'.format(pull_count))
    print('-----')

    for msg, cur_dict in [("Couldn't check status", status_error_dict),
                          ("Couldn't create patch", patch_error_dict),
                          ("Error when forking", fork_error_dict)]:
        if len(cur_dict) < 1:
            continue

        print('{}:'.format(msg))
        for error_msg in cur_dict:
            print('  {} ({}):'.format(error_msg,
                                      len(cur_dict[error_msg])))
            for name in cur_dict[error_msg]:
                print('    {}'.format(name))

    for error_msg in ["Couldn't apply patch",
                      "Couldn't create pull"]:
        if error_msg not in error_dict:
            continue
        print('{} ({}):'.format(error_msg, len(error_dict[error_msg])))
        for name in error_dict[error_msg]:
            print('  {}'.format(name))


def main():
    """
    Parse command-line arguments and run tick_feedstocks()
    """
    parser = argparse.ArgumentParser()
    parser.add_argument('--password',
                        default=None,
                        dest='gh_password',
                        help='GitHub password or oauth token')
    parser.add_argument('--user',
                        default=None,
                        dest='gh_user',
                        help='GitHub username')
    parser.add_argument('--no-regenerate',
                        action='store_true',
                        dest='no_regenerate',
                        help="If present, don't regenerate feedstocks "
                             'after updating')
    parser.add_argument('--no-rerender',
                        action='store_true',
                        dest='no_rerender',
                        help="If present, don't regenerate feedstocks "
                             'after updating')
    parser.add_argument('--dry-run',
                        action='store_true',
                        dest='dry_run',
                        help='If present, skip applying patches, forking, '
                             'and regenerating feedstocks')
    parser.add_argument('--target-feedstocks-file',
                        default=None,
                        dest='targetfile',
                        help='File listing feedstocks to check')
    parser.add_argument('--target-feedstocks',
                        default=None,
                        dest='target_feedstocks',
                        nargs='*',
                        help='List of feedstocks to update')
    parser.add_argument('--limit-feedstocks',
                        type=int,
                        default=-1,
                        dest='limit_feedstocks',
                        help='Maximum number of feedstocks to retrieve')
    parser.add_argument('--limit-outdated',
                        type=int,
                        default=-1,
                        dest='limit_outdated',
                        help='Maximum number of outdated feedstocks to try '
                             'and patch')
    parser.add_argument('--skip-feedstocks-file',
                        default=None,
                        dest='skipfile',
                        help='File listing feedstocks to skip')
    parser.add_argument('--skip-feedstocks',
                        default=None,
                        dest='skip_feedstocks',
                        nargs='*',
                        help='List of feedstocks to skip updating')
    args = parser.parse_args()

    tick_feedstocks(args.gh_password,
                    args.gh_user,
                    args.no_regenerate or args.no_rerender,
                    args.dry_run,
                    args.targetfile,
                    args.target_feedstocks,
                    args.limit_feedstocks,
                    args.limit_outdated,
                    args.skipfile,
                    args.skip_feedstocks)


if __name__ == "__main__":
    main()

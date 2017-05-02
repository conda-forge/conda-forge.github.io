#!/usr/bin/env conda-execute

# conda execute
# env:
#  - python ==3.5
#  - conda-build
#  - conda-smithy
#  - beautifulsoup4
#  - gitpython
#  - jinja2
#  - lxml
#  - pygithub >=1.29
#  - pyyaml
#  - requests
#  - setuptools
#  - tqdm
# channels:
#  - conda-forge
# run_with: python

"""
Usage:
python tick_my_feedstocks.py
[--password <github_password_or_oauth>]
[--user <github_username>]
[--no-regenerate --no-rerender --dry-run]

NOTE that your oauth token should have these abilities:
* public_repo
* read:org
* delete_repo.

This script:
1 identifies all of the feedstocks maintained by a user
2 attempts to determine F, the subset of feedstocks that need updating
3 attempts to determine F_i, the subset of F that have no dependencies
  on other members of F
4 attempts to patch each member of F_i with the new version number and hash
5 attempts to regenerate each member of F_i with the installed version
  of conda-smithy
6 submits a pull request for each member of F_i to the appropriate
  conda-forge repoository

IMPORTANT NOTES:
* We get version information from PyPI. If the feedstock isn't based on PyPI,
  it will raise an error. (Execution will continue.)
* All feedstocks updated with this script SHOULD BE DOUBLE-CHECKED! Because
  conda-forge tests are lightweight, even if the requirements have changed the
  tests may still pass successfully.
"""
# TODO Finish refactoring meta yaml as a class
# TODO pass token/user to pygithub for push. (Currently uses system config.)
# TODO Modify --dry-run flag to list which repos need forks.
# TODO Modify --dry-run flag to list which forks are dirty.
# TODO Modify --dry-run to also cover regeneration
# TODO Add support for skipping repos that are deprecated. (e.g. fake-factory)
# TODO Test python 2.7 compatability (should work, but untested.)
# TODO Test python 3.4 compatability (should work, but untested.)
# TODO Test python 3.6 compatability (should work, but untested.)
# TODO Deeper check of dependency changes in meta.yaml.
# TODO reset build number back to zero
# TODO Check installed conda-smithy against current feedstock conda-smithy.
# TODO Check special case of feedstocks renamed with 'python-' prefixes
# TODO Check if already-forked feedstocks have open pulls.
# TODO Clean up redundant version strings (see pypi_sha())
# TODO Deal with having to change compression types in the new version

import argparse
from base64 import b64encode
from bs4 import BeautifulSoup
from collections import defaultdict
from collections import namedtuple
import conda_smithy
import conda_smithy.configure_feedstock
from git import Actor
from git import Repo
from github import Github
from github import GithubException
from jinja2 import Template
from jinja2 import UndefinedError
import os
from pkg_resources import parse_version
import re
import requests
import tempfile
from tqdm import tqdm
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
                                         'pypi_version',
                                         'blob_sha'])

# feedstock status tuple
# pairing of a feedstock and its status data
# tpl(github.Repository.Repository, status_data)
fs_status = namedtuple('fs_status', ['fs', 'sd'])

# Ordered list of acceptable ways source can be packaged.
source_bundle_types = ["tar.gz", "tar.bz2", "zip", "bz2"]


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
            raise KeyError('Missing meta.yam key for checksum')

        splitter = '-{}.'.format(self._yaml_dict['package']['version'])
        self.pypi_package, self.bundle_type = \
            self._yaml_dict['source']['fn'].split(splitter)

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
        :return: `bool` -- True if replacement successful or unneeded, False if failed
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
            matches = re.findall(build_num_regex, self.text)
            if len(matches) > 1:
                # Multiple number lines
                # So give up
                return False

            build_num_str = matches[0].string[matches[0].start():
                                              matches[0].end()]
            mapping = {build_num_str:
                       'number: {}'.format(
                           self._yaml_dict['build']['number'])}

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
    :return: `str,str|None,None` -- bundle_type,SHA for source, None,None if can't be found
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
    :return: `str,str|None,None` -- bundle type,SHA for source, None,None if can't be found
    """
    r = requests.get('https://pypi.org/project/{}/{}/#files'.format(
        package_name,
        version))

    bs = BeautifulSoup(r.text, 'lxml')
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


def pypi_sha(pypi_package, pypi_version):
    """
    :param str pypi_package: The name of the package in PyPI
    :param str pypi_version: The version to be retrieved from PyPI.
    :return: `str|None` -- SHA256 for a source bundle, None if can't be found
    """
    bundle_type, sha = pypi_legacy_json_sha(pypi_package, pypi_version)
    if bundle_type is not None and sha is not None:
        return bundle_type, sha
    return pypi_org_sha(pypi_package, pypi_version)


def pypi_version_str(package_name):
    """
    Retrive the latest version of a package in PyPI
    :param str package_name: The name of the package
    :return: `str|bool` -- Version string, False if unsuccessful
    """
    r = requests.get('https://pypi.python.org/pypi/{}/json'.format(
        package_name))
    if not r.ok:
        return False
    return r.json()['info']['version'].strip()


def user_feedstocks(user):
    """
    :param github.AuthenticatedUser.AutheticatedUser user:
    :return: `list` -- list of conda-forge feedstocks the user maintains
    """
    feedstocks = []
    for team in tqdm(user.get_teams(), desc='Finding feedstock teams...'):

        # Each conda-forge team manages one feedstock
        # If a team has more than one repo, skip it.
        if team.repos_count != 1:
            continue

        repo = list(team.get_repos())[0]
        if repo.full_name.startswith('conda-forge/') and \
                repo.full_name.endswith('-feedstock'):
            feedstocks.append(repo)

    return feedstocks


def feedstock_status(feedstock):
    """
    Return whether a feedstock is out of date and any information needed to update it.
    :param github.Repository.Repository feedstock:
    :return: `tpl(bool,bool,None|status_data)` -- bools indicating success and either None or a status_data tuple
    """
    fs_contents = feedstock.get_contents('recipe/meta.yaml')
    try:
        meta_yaml = Feedstock_Meta_Yaml(
            fs_contents.decoded_content.decode('utf-8'))
    except (UndefinedError, KeyError) as e:
        # TODO fix this to use the passed error message
        return result_tuple(False, e.args[0])

    pypi_version = pypi_version_str(meta_yaml.pypi_package)
    if pypi_version is False:
        return result_tuple(False, "Couldn't find package in PyPI")

    if parse_version(meta_yaml.version()) >= parse_version(pypi_version):
        return result_tuple(True, None)

    return result_tuple(True,
                        status_data(meta_yaml,
                                    pypi_version,
                                    fs_contents.sha))


def get_user_fork(user, feedstock):
    """
    Return a user's fork of a feedstock if one exists, else create a new one.
    :param github.AuthenticatedUser.AuthenticatedUser user:
    :param github.Repository.Repository feedstock: conda-forge feedstock
    :return: `github.Repository.Repository` -- fork of the feedstock beloging to user
    """
    for fork in feedstock.get_forks():
        if fork.owner.login == user.login:
            return fork

    return user.create_fork(feedstock)


def even_feedstock_fork(user, feedstock):
    """
    Return a fork that's even with the latest version of the feedstock
    If the user has a fork that's ahead of the feedstock, do nothing
    :param github.AuthenticatedUser.AuthenticatedUser user: GitHub user
    :param github.Repository.Repository feedstock: conda-forge feedstock
    :return: `None|github.Repository.Repository` -- None if no fork, else the repository
    """
    fork = get_user_fork(user, feedstock)

    comparison = fork.compare(base='{}:master'.format(user.login),
                              head='conda-forge:master')

    if comparison.behind_by > 0:
        # head is *behind* the base
        # conda-forge is behind the fork
        # leave everything alone - don't want a mess.
        return None

    elif comparison.ahead_by > 0:
        # head is *ahead* of base
        # conda-forge is ahead of the fork
        # delete fork and clone from scratch
        try:
            fork.delete()
        except GithubException:
            # couldn't delete feedstock
            # give up, don't want a mess.
            return None

        fork = user.create_fork(feedstock)

    return fork


def regenerate_fork(fork):
    """
    :param github.Repository.Repository fork: fork of conda-forge feedstock
    :return: `bool` -- True if regenerated, false otherwise
    """
    # Would need me to pass gh_user, gh_password
    # subprocess.run(["./renderer.sh", gh_user, gh_password, fork.name])

    working_dir = tempfile.TemporaryDirectory()
    r = Repo.clone_from(fork.clone_url, working_dir.name)
    conda_smithy.configure_feedstock.main(working_dir.name)

    if not r.is_dirty():
        # No changes made during regeneration.
        # Clean up and return
        working_dir.cleanup()
        return False

    commit_msg = 'MNT: Updated the feedstock for conda-smithy version {}.'.format(
        conda_smithy.__version__)
    r.git.add('-A')
    r.index.commit(commit_msg,
                   author=Actor(fork.owner.login, fork.owner.email))
    r.git.push()

    working_dir.cleanup()
    return True


def tick_feedstocks(gh_password=None,
                    gh_user=None,
                    no_regenerate=False,
                    dry_run=False):
    """
    Finds all of the feedstocks a user maintains that can be updated without
    a dependency conflict with other feedstocks the user maintains,
    creates forks, ticks versions and hashes, and regenerates,
    then submits a pull
    :param str|None gh_password: GitHub password or OAuth token (if omitted, check environment vars)
    :param str|None gh_user: GitHub username (can be omitted with OAuth)
    :param bool no_regenerate: If True, don't regenerate feedstocks before submitting pull requests
    :param bool dry_run: If True, do not apply generate patches, fork feedstocks, or regenerate
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

    feedstocks = user_feedstocks(user)

    can_be_updated = list()
    status_error_dict = defaultdict(list)
    up_to_date_count = 0
    for feedstock in tqdm(feedstocks, desc='Checking feedstock statuses...'):
        status = feedstock_status(feedstock)
        if status.success:
            if status.data is None:
                up_to_date_count += 1
            else:
                can_be_updated.append(fs_status(feedstock, status.data))
        else:
            status_error_dict[status.data].append(feedstock.name)

    package_names = set([x.fs.name[:-10] for x in can_be_updated])

    indep_updates = [x for x in can_be_updated
                     if len(x.sd.meta_yaml.reqs & package_names) < 1]

    successful_forks = list()
    successful_updates = list()
    patch_error_dict = defaultdict(list)
    error_dict = defaultdict(list)
    for update in tqdm(indep_updates, desc='Updating feedstocks'):

        new_bundle_type, new_sha = pypi_sha(
            update.sd.meta_yaml.pypi_package,
            update.sd.pypi_version)

        if new_bundle_type is None and new_sha is None:
            patch_error_dict["Couldn't get SHA from PyPI"].append(
                update.fs.name)
            continue

        # generate basic patch
        mapping = {update.sd.meta_yaml.version():
                   update.sd.pypi_version,
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
        fork = even_feedstock_fork(user, update.fs)
        if fork is None:
            error_dict["Couldn't fork"].append(update.fs.name)
            continue

        # patch fork
        r = requests.put(
            'https://api.github.com/repos/{}/contents/recipe/meta.yaml'.format(
                fork.full_name),
            json={'message':
                  'Tick version to {}'.format(update.sd.pypi_version),
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
                                  body='(Built using tick_my_feedstocks)',
                                  head='{}:master'.format(gh_user),
                                  base='master')
        except GithubException:
            continue

        pull_count += 1

    print('{} total feedstocks checked.'.format(len(feedstocks)))
    print('  {} were up-to-date.'.format(up_to_date_count))
    print('  {} were independent of other out-of-date feedstocks'.format(
        len(indep_updates)))
    print('  {} had pulls submitted.'.format(pull_count))
    print('-----')

    for msg, cur_dict in [("Couldn't check status", status_error_dict),
                          ("Couldn't create patch", patch_error_dict)]:
        if len(cur_dict) > 0:
            print('{}:'.format(msg))
            for error_msg in cur_dict:
                print('  {} ({}):'.format(error_msg,
                                          len(cur_dict[error_msg])))
                for name in cur_dict[error_msg]:
                    print('    {}'.format(name))

    for error_msg in ["Couldn't fork",
                      "Couldn't apply patch",
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
    parser.add_argument('--no-rererender',
                        action='store_true',
                        dest='no_rerender',
                        help="If present, don't regenerate feedstocks "
                        'after updating')
    parser.add_argument('--dry-run',
                        action='store_true',
                        dest='dry_run',
                        help='If present, skip applying patches, forking, '
                        'and regenerating feedstocks')
    args = parser.parse_args()

    tick_feedstocks(args.gh_password,
                    args.gh_user,
                    args.no_regenerate or args.no_rerender,
                    args.dry_run)


if __name__ == "__main__":
    main()

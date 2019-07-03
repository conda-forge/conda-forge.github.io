#!/usr/bin/env conda-execute

# conda execute
# env:
#  - python
#  - click
#  - jinja2
#  - requests
#  - ruamel.yaml
#  - conda-smithy
#  - pygithub
#  - fuzzywuzzy
# channels:
#  - conda-forge
# run_with: python

import click
import conda_smithy.feedstocks as feedstocks
import jinja2
import json
import requests
import ruamel.yaml
from ruamel.yaml.scanner import ScannerError
import os

from github import Github
import conda_smithy.github as smithy_github
from fuzzywuzzy import process


# patch over differences between PY2 and PY3
try:
    text_type = unicode
except NameError:
    text_type = str


class NullUndefined(jinja2.Undefined):
    def __unicode__(self):
        return text_type(self._undefined_name)

    def __getattr__(self, name):
        return text_type('{}.{}'.format(self, name))

    def __getitem__(self, name):
        return '{}["{}"]'.format(self, name)


env = jinja2.Environment(undefined=NullUndefined)


@click.group()
def cli():
    """Match package names in pr against existing feedstocks.

    Tools to match package names in from all the recipes in a pr against
    the existing conda-forge feedstocks.
    """
    pass


@cli.command('build-feedstock-index', help='create json index of feedstocks.')
@click.argument('filename')
@click.option('--gh-org', default='conda-forge', help='Set GitHub organization name.')
def build_feedstock_index(filename, gh_org='conda-forge'):
    "Iterate over feedstocks and return dict of pkg-name:feedstock"
    pkg_index = {}
    for repo in feedstocks.feedstock_repos(gh_org):
        try:
            meta = repo.get_file_contents(path='recipe/meta.yaml').decoded_content
            pkg_name = _extract_package_name(meta)
        except (AttributeError, KeyError, ScannerError) as err:
            # unable to parse the bob.io.image-feedstock
            print('Unable to parse meta.yaml for {}'.format(repo.url))
            print('guessing pkg name from feedstock url')
            print('Traceback: \n', err)
            pkg_name = repo.url.split('/')[-1].split('-feedstock')[0].lower()
        pkg_index[pkg_name] = repo.full_name

    with open(filename, 'w') as f:
        json.dump(pkg_index, f)
        print('feedstocks index written to {}'.format(filename))


@cli.command('build-pr-index', help='create json index of pull requests.')
@click.argument('filename')
@click.option('--gh-org', default='conda-forge', help='Set GitHub organization name.')
@click.option('--staged-recipes-repo', default='staged-recipes', help='Set staged recipe repo.')
def build_pr_index(filename, gh_org='conda-forge', staged_recipes_repo='staged-recipes'):
    "Iterate over open pull requests in staged_recipes and return dict of pr:pkg-name"

    token = smithy_github.gh_token()
    gh = Github(token)
    org = gh.get_organization(gh_org)
    repo = org.get_repo(staged_recipes_repo)
    pkg_index = {}
    for pr in list(repo.get_pulls()):
        for f in pr.get_files():
            if f.filename.lower().endswith('meta.yaml'):
                try:
                    meta = requests.get(f.raw_url).content
                    pkg_name = _extract_package_name(meta)
                    idx = 'pr {} ({}) /{}'.format(pr.number, pkg_name, f.filename)
                    pkg_index[idx] = pkg_name
                except (AttributeError, ScannerError) as err:
                    pkg_index[idx] = None
                    print('Unable to parse meta.yaml for pr #{}'.format(pr.number))
                    print('setting pkg_name to None')
                    print('Traceback: \n', err)

    with open(filename, 'w') as f:
        json.dump(pkg_index, f)
        print('pull requests index written to {}'.format(filename))


@cli.command('compare-indices', help='compare pr index to feedstock index.')
@click.argument('pr-index')
@click.argument('feedstock-index')
@click.option('--threshold', default=85, help='only return matches with scores above threshold')
@click.option('--limit', default=2, help='maximum number of matches')
def compare_indices(pr_index, feedstock_index, threshold, limit):
    pr_index = json.load(open(pr_index))
    feedstock_index = json.load(open(feedstock_index))
    matches = {}
    for pr, name in list(pr_index.items()):
        m = _fuzzy_match(name, feedstock_index, threshold=threshold, limit=limit)
        if len(m) > 0:
            matches[pr] = m
    _format_output(matches, threshold, limit)


@cli.command('check-pr', help='check pr against feedstock index.')
@click.argument('pr', type=int)
@click.argument('feedstock-index')
@click.option('--threshold', default=85, help='only return matches with scores above threshold')
@click.option('--limit', default=2, help='maximum number of matches')
@click.option('--gh-org', default='conda-forge', help='Set GitHub organization name.')
@click.option('--staged-recipes-repo', default='staged-recipes', help='Set staged recipe repo.')
def check_pr(pr, feedstock_index, threshold, limit, gh_org, staged_recipes_repo):
    feedstock_index = json.load(open(feedstock_index))
    token = smithy_github.gh_token()
    gh = Github(token)
    org = gh.get_organization(gh_org)
    repo = org.get_repo(staged_recipes_repo)
    pr = repo.get_pull(pr)
    packages = {}
    for f in pr.get_files():
        if f.filename.lower().endswith('meta.yaml'):
            try:
                meta = requests.get(f.raw_url).content
                pkg_name = _extract_package_name(meta)
                idx = 'pr {} ({}) /{}'.format(pr.number, pkg_name, f.filename)
                packages[idx] = pkg_name
            except AttributeError:
                packages[idx] = None

    matches = {}
    for k, pkg_name in packages.items():
        matches[k] = _fuzzy_match(pkg_name, feedstock_index, threshold, limit)

    _format_output(matches, threshold, limit)


@cli.command('check-pkg', help='check pkg name against feedstock index.')
@click.argument('name')
@click.argument('feedstock-index')
@click.option('--threshold', default=85, help='only return matches with scores above threshold')
@click.option('--limit', default=2, help='maximum number of matches')
def check_pkg(name, feedstock_index, threshold, limit):
    feedstock_index = json.load(open(feedstock_index))
    matches = _fuzzy_match(name, feedstock_index, threshold, limit)
    _format_output({name: matches}, threshold, limit)


def _format_output(matches, threshold, limit):
    vals = (threshold, limit)
    print('-------------------------------------------')
    print('match(es) found using threshold={}, limit={}'.format(*vals))
    print('-------------------------------------------')
    for k, repo in sorted(matches.items()):
        for recipe in repo:
            if len(recipe) > 0:
                print('{} matches --> pkg={}, score={}, feedstock={}'.format(k, *recipe))


def _fuzzy_match(name, feedstock_index, threshold, limit):
    choices = list(feedstock_index.keys())
    matches = process.extract(name, choices, limit=limit)
    result = []
    for match in matches:
        pkg, score = match
        if score >= threshold:
            result.append((pkg, score, feedstock_index[pkg]))

    return result

def _extract_package_name(meta):
    """Extract package name from meta.yaml"""
    content = env.from_string(meta.decode('utf8')).render(os=os)
    meta = ruamel.yaml.load(content, ruamel.yaml.RoundTripLoader)
    return meta['package']['name'].lower()


if __name__ == '__main__':
    cli()

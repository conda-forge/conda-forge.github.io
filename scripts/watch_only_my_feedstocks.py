#!/usr/bin/env conda-execute

"""
This script can be run to stop watching conda-forge feedstocks to which you are not a maintainer.
This is super useful if you are a conda-forge administrator and you are automatically subscribed to watch each new repo...
"""
# conda execute
# env:
#  - git
#  - python
#  - conda-smithy
#  - pygithub
#  - gitpython
#  - six
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
import jinja2
import six

import conda_smithy.github
import conda_smithy.configure_feedstock
import conda_smithy
import conda_smithy.feedstocks as feedstocks
import yaml


parser = argparse.ArgumentParser(description='Watch only your maintained feedstocks.')
parser.add_argument('--feedstocks-dir', help="The location of the feedstocks.",
                    default="~/dev/conda-forge/feedstocks")
args = parser.parse_args()

feedstocks_dir = os.path.expanduser(args.feedstocks_dir)

# Clone and update all feedstocks locally.
print('Cloning all feedstocks locally (to {}) so that we can determine '
      'if you are a maintainer (can take a long time)...'.format(feedstocks_dir))
feedstocks.clone_all('conda-forge', feedstocks_dir)
feedstocks.fetch_feedstocks(feedstocks_dir)

gh_token = os.environ['GH_TOKEN']
gh = github.Github(gh_token)
gh_me = gh.get_user()

if gh_me.login == 'conda-forge-admin':
    raise ValueError("Please don't run this script with the github "
                     "token for {}.".format(gh_me.login))

print("Fetching current subscriptions (can take a *very* long time, like ~5mins)...")
current_subscriptions = {repo.name: repo for repo in list(gh_me.get_subscriptions())
                         if repo.organization is not None and repo.organization.name == 'conda-forge'}
print('Found {} conda-forge subscriptions.'.format(len(current_subscriptions)))


class NullUndefined(jinja2.Undefined):
    def __unicode__(self):
        return six.text_type(self._undefined_name)
    
    def __getattr__(self, name):
        return six.text_type('{}.{}'.format(self, name))

    def __getitem__(self, name):
        return '{}["{}"]'.format(self, name)

env = jinja2.Environment(undefined=NullUndefined)

for feedstock in feedstocks.cloned_feedstocks(feedstocks_dir):
    meta = os.path.join(feedstock.directory, 'recipe', 'meta.yaml')
    if not os.path.exists(meta):
        print('Found an empty repo... :(')
        continue
    with open(meta, 'r') as fh:
        contents = env.from_string(''.join(fh)).render(os=os, environ=os.environ)
    meta = yaml.safe_load(contents)
    me_a_maintainer = gh_me.login in meta.get('extra', {}).get('recipe-maintainers', [])
    print(' - {: <24}(maintainer: {})'.format(feedstock.package, me_a_maintainer))
    if me_a_maintainer and feedstock.name not in current_subscriptions:
        print('*** Not watching {}, yet you are a maintainer of it! You may want to fix that.'.format(feedstock.name))
    if not me_a_maintainer and feedstock.name in current_subscriptions:
        print('*** Removing {} from your watched list as you are not a maintainer of it.'.format(feedstock.name))
        gh_me.remove_from_subscriptions(current_subscriptions[feedstock.name])


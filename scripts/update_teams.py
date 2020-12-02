#!/usr/bin/env conda-execute

# conda execute
# env:
#  - python 2.7.*
#  - conda-smithy
#  - pygithub 1.*
#  - six
#  - conda-build
# channels:
#  - conda-forge
# run_with: python

from __future__ import print_function

import argparse
import collections
import os
import six

from github import Github
import github
import yaml
from conda_build.metadata import MetaData


parser = argparse.ArgumentParser(description='Process some integers.')
parser.add_argument('feedstocks_clone', help="The location of the feedstocks directory within the conda-forge/feedstocks clone.")

args = parser.parse_args()

from conda_smithy.github import gh_token


token = gh_token()

gh = Github(token)

conda_forge = gh.get_organization('conda-forge')
teams = {team.name: team for team in conda_forge.get_teams()}

feedstocks_path = args.feedstocks_clone

packages_visited = set()

all_members = set()
from random import choice
superlative = ['awesome', 'slick', 'formidable', 'awe-inspiring', 'breathtaking',
               'magnificent', 'wonderous', 'stunning', 'astonishing', 'superb',
               'splendid', 'impressive', 'unbeatable', 'excellent', 'top', 'outstanding',
               'exalted', 'standout', 'smashing']

# Go through each of the feedstocks and ensure that the team is up to date and that
# there is nobody in the team which doesn't belong (i.e. isn't in the maintainers list).
for package_name in os.listdir(feedstocks_path):
    print("Checking {}".format(package_name))
    packages_visited.add(package_name)
    feedstock = os.path.join(feedstocks_path, package_name)
    recipe = os.path.join(feedstock, 'recipe', 'meta.yaml')

    if not os.path.exists(recipe):
        print("The {} feedstock is recipe less".format(package_name))
        continue
    meta = MetaData(os.path.dirname(recipe))

    contributors = meta.meta.get('extra', {}).get('recipe-maintainers', [])
    if not isinstance(contributors, list):
        # Deal with a contribution list which has dashes but no spaces
        # (e.g. https://github.com/conda-forge/pandoc-feedstock/issues/1)
        contributors = [contributors.lstrip('-')]
    contributors = set(handle.lower() for handle in contributors)
    all_members.update(contributors)

    # If the team already exists, get hold of it.
    team = teams.get(package_name)
    if not team:
        print("Team {} does not exist in conda-forge organization".format(package_name))
        continue

    current_members = team.get_members()
    member_handles = set([member.login.lower() for member in current_members])
    for new_member in contributors - member_handles:
        headers, data = team._requester.requestJsonAndCheck(
                                       "PUT",
                                        team.url + "/memberships/" + new_member)
    for old_member in member_handles - contributors:
        print("AN OLD MEMBER ({}) NEEDS TO BE REMOVED FROM {}".format(old_member, package_name))
        # The following works, it is just a bit scary!
#        headers, data = team._requester.requestJsonAndCheck(
#                                  "DELETE",
#                                  team.url + "/memberships/" + old_member)


# Create and administer the all-members team.
team = teams.get('all-members')
if not team:
    raise RuntimeError("Team all-members does not exist in conda-forge organization")

current_members = team.get_members()
member_handles = set([member.login.lower() for member in current_members])
for new_member in all_members - member_handles:
    headers, data = team._requester.requestJsonAndCheck(
                                   "PUT",
                                    team.url + "/memberships/" + new_member)
for old_member in member_handles - all_members:
    print("AN OLD MEMBER ({}) NEEDS TO BE REMOVED FROM all-members".format(old_member))



# Remove any teams which don't belong any more (because there is no longer a feedstock).
for team_to_remove in set(teams.keys()) - set(packages_visited):
    if team_to_remove in ['Core',
                          'conda-forge.github.io',
                          'all-members',
                          'conda-forge-anvil',
                          'conda-forge-webservices',
                          'staged-recipes']:
        print('Keeping ', team_to_remove)
        continue
    print("THE {} TEAM NEEDS TO BE REMOVED.".format(team_to_remove))
    # The following works, it is just a bit scary!
#    teams[team_to_remove].delete()

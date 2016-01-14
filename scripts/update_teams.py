#!/usr/bin/env conda-execute

# conda execute
# env:
#  - python
#  - conda-smithy
#  - pygithub
# channels:
#  - conda-forge
# run_with: python

import os

import conda_smithy.feedstocks as feedstocks

from github import Github
import github
import yaml

import argparse

parser = argparse.ArgumentParser(description='Process some integers.')
parser.add_argument('feedstocks_clone', help="The location of the conda-forge/feedstocks checkout.")

args = parser.parse_args()


from conda_smithy.github import gh_token
from conda_smithy.feedstocks import cloned_feedstocks


token = gh_token()

gh = Github(token)

conda_forge = gh.get_organization('conda-forge')
teams = {team.name: team for team in conda_forge.get_teams()}

feedstocks_path = args.feedstocks_clone


def create_team(org, name, description, repos):
    # PyGithub creates secret teams, and has no way of turning that off! :(
    post_parameters = {
        "name": name,
        "description": description,
        "privacy": "closed",
    }
    post_parameters["repo_names"] = [element._identity for element in repos]
    headers, data = org._requester.requestJsonAndCheck(
        "POST",
        org.url + "/teams",
        input=post_parameters
    )
    return github.Team.Team(org._requester, headers, data, completed=True)


packages_visited = set()

users = {}
from random import choice
superlative = ['awesome', 'slick', 'formidable', 'awe-inspiring', 'breathtaking',
               'magnificent', 'wonderous', 'stunning', 'astonishing', 'superb',
               'splendid', 'impressive', 'unbeatable', 'excellent', 'top', 'outstanding',
               'exalted', 'standout', 'smashing']


# Go through each of the feedstocks and ensure that the team is up to date and that
# there is nobody in the team which doesn't belong (i.e. isn't in the maintainers list).
for package_name in os.listdir(feedstocks_path):
    packages_visited.add(package_name)
    feedstock = os.path.join(feedstocks_path, package_name)
    recipe = os.path.join(feedstock, 'recipe', 'meta.yaml')

    if not os.path.exists(recipe):
        print("The {} feedstock is recipe less".format(package_name))
        continue

    with open(recipe) as fh:
        data = yaml.safe_load(fh)

    contributors = set(data.get('extra', {}).get('recipe-maintainers', []))

    # Get the github repo for this feedstock.
    repo = conda_forge.get_repo('{}-feedstock'.format(package_name))

    # If the team already exists, get hold of it.
    team = teams.get(package_name)
    if not team:
        team = create_team(conda_forge, package_name.lower(),
                           'The {} {} contributors!'.format(choice(superlative), package_name),
                           [repo])
        teams[package_name] = team

    current_members = team.get_members()
    member_handles = set([member.login for member in current_members])
    for new_member in contributors - member_handles:
        headers, data = team._requester.requestJsonAndCheck(
                                       "PUT",
                                        team.url + "/memberships/" + new_member)
    for old_member in member_handles - contributors:
        headers, data = team._requester.requestJsonAndCheck(
                                  "DELETE",
                                  team.url + "/memberships/" + old_member)


# Remove any teams which don't belong any more (because there is no longer a feedstock).
for team_to_remove in set(teams.keys()) - set(packages_visited):
    if team_to_remove in ['Contributors', 'Core', 'conda-forge.github.io']:
        print('Keeping ', team_to_remove)
        continue
    teams[team_to_remove].delete()

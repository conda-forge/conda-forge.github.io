#!/usr/bin/env conda-execute

# conda execute
# env:
#  - python
#  - conda-smithy
#  - pygithub 1.*
#  - six
#  - conda-build 1.20.1
# channels:
#  - conda-forge
# run_with: python

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

    # Get the github repo for this feedstock.
    repo = conda_forge.get_repo('{}-feedstock'.format(package_name))

    # If the team already exists, get hold of it.
    team = teams.get(package_name)
    if not team:
        team = create_team(conda_forge, package_name.lower(),
                           'The {} {} contributors!'.format(choice(superlative), package_name),
                           [repo])
        teams[package_name] = team
    # Ensure that we have merge rights on the repo for this team.
    url = team.url + "/repos/" + repo._identity
    team._requester.requestJsonAndCheck("PUT", url, input={"permission": "push"})

    current_members = team.get_members()
    member_handles = set([member.login.lower() for member in current_members])
    for new_member in contributors - member_handles:
        headers, data = team._requester.requestJsonAndCheck(
                                       "PUT",
                                        team.url + "/memberships/" + new_member)
    for old_member in member_handles - contributors:
        print("AN OLD MEMBER ({}) NEEDS TO BE REMOVED FROM {}".format(old_member, repo._identity))
        # The following works, it is just a bit scary!
#        headers, data = team._requester.requestJsonAndCheck(
#                                  "DELETE",
#                                  team.url + "/memberships/" + old_member)


# Create and administer the all-members team.
team = teams.get('all-members')
if not team:
    team = create_team(conda_forge, 'all-members',
                       'All of the awesome conda-forge contributors!', [])

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
                          'conda-forge-webservices']:
        print('Keeping ', team_to_remove)
        continue
    print("THE {} TEAM NEEDS TO BE REMOVED.".format(team_to_remove))
    # The following works, it is just a bit scary!
#    teams[team_to_remove].delete()

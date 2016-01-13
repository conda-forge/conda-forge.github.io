#!/usr/bin/env conda-execute

# conda execute
# env:
#  - python
#  - conda-smithy
# channels:
#  - conda-forge
# run_with: python

import os

import conda_smithy.feedstocks as feedstocks


from jinja2 import Environment, FileSystemLoader

print(__file__)
loader = FileSystemLoader(os.path.dirname(__file__))
env = Environment(loader=loader)

context = {}
context['gh_feedstocks'] = feedstocks.feedstock_repos('conda-forge')


tmpl = env.get_template('feedstocks.html.tmpl')
with open('feedstocks.html', 'w') as fh:
    fh.write(tmpl.render(context))

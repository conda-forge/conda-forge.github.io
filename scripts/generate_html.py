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

html_source = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
loader = FileSystemLoader(html_source)
env = Environment(loader=loader)

context = {}
context['gh_feedstocks'] = feedstocks.feedstock_repos('conda-forge')


tmpl = env.get_template('feedstocks.html.tmpl')
with open(os.path.join(html_source, 'feedstocks.html'), 'w') as fh:
    fh.write(tmpl.render(context))

#!/usr/bin/env python
import os
import jinja2
import yaml
import requests

repo_dir = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))

with open(os.path.join(repo_dir, "src", "inst_partners.yaml")) as fp:
    data = yaml.safe_load(fp)

for k in data:
    if "Logo URL" in data[k]:
        try:
            r = requests.get(data[k]["Logo URL"][0])
            r.raise_for_status()
        except Exception as e:
            print(e)
            del data[k]["Logo URL"]

with open(os.path.join(repo_dir, "index.html.tmpl")) as fp:
    tmpl = jinja2.Template(fp.read())

context = {"inst_partners": data}

with open(os.path.join(repo_dir, 'index.html'), 'w') as fp:
    fp.write(tmpl.render(context))

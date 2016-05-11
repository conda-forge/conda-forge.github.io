#!/usr/bin/env conda-execute

# conda execute
# env:
#  - python
#  - conda
# run_with: python

from __future__ import print_function

import argparse
import re
from conda.api import get_index

parser = argparse.ArgumentParser()
parser.add_argument('channel')
parser.add_argument('--packages', nargs='+', default=['.*'])
parser.add_argument('--dependencies', nargs='+', default=['.*'])
parser.add_argument('--platform', default=None)

args = parser.parse_args()

matching_pkgs = [re.compile(pkg) for pkg in args.packages]
matching_deps = [re.compile(pkg) for pkg in args.dependencies]
index = get_index(channel_urls=[args.channel],
                  prepend=False, platform=args.platform,
                  use_cache=False)

for dist, pkg_info in sorted(index.items()):
    matched = False
    for matching_pkg in matching_pkgs:
        if matching_pkg.match(pkg_info['name']):
            matched = True

    if matched:
        depends = pkg_info['depends']
        deps_which_match = []
        for matching_dep in matching_deps:
            for dep in depends:
                if matching_dep.match(dep):
                    deps_which_match.append(dep)
        if deps_which_match:
            full_dist = '{info[name]} {info[version]} {info[build]} {subdir}'.format(info=pkg_info, subdir=args.platform)
            print('{: <35}: {}'.format(full_dist, ', '.join(sorted(deps_which_match))))


#!/usr/bin/env conda-execute

# conda execute
# env:
#  - python
#  - conda
# channels:
#  - conda-forge
# run_with: python

import argparse
from conda.api import get_index
import conda.resolve

parser = argparse.ArgumentParser()
parser.add_argument('packages', nargs='+')
parser.add_argument('--platform', default=None)

args = parser.parse_args()


forge_index = get_index(channel_urls=['conda-forge'],
                        prepend=False, platform=args.platform)
defaults_index = get_index(channel_urls=['defaults'],
                        prepend=False, platform=args.platform)

pkgs_in_forge = {pkg['name'] for pkg in forge_index.values()}

forge_on_top = defaults_index.copy()
forge_on_top.update(forge_index)

r = conda.resolve.Resolve(forge_on_top)

specs = args.packages
result = r.solve(specs)

print('Resolved with: {}\n'.format(', '.join(sorted(result))))


forge_packages = []
for pkg in sorted(result):
    resolved_pkg = forge_on_top[pkg]
    name = resolved_pkg['name']
    if pkg in forge_index:
        forge_packages.append(name)
    else:
        if name in pkgs_in_forge:
            print("{: <25}:\t exists in conda-forge, but has been trumped by {} "
                    "(availables: {})".format(name, pkg,
                                              ', '.join(fqn for fqn, info in forge_index.items()
                                                        if info['name'] == name)))
        else:
            print("{: <25}:\t doesn't exist in conda-forge".format(name))

print('Found {} of {} packages from conda-forge. ({})'
      ''.format(len(forge_packages), len(result), ', '.join(forge_packages)))

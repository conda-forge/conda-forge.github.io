#!/usr/bin/env conda-execute

# conda execute
# env:
#  - python
#  - conda
#  - anaconda-client
# run_with: python

''' This script can be used to hotfix package dependencies.

Usage example: conda execute conda-forge.github.io/scripts/hotfix.py conda-forge /tmp/infile.txt -r 'boost 1.60.*'

# An example for infile:
bob.blitz 2.0.8 np111py27_6 linux-64: boost
bob.blitz 2.0.8 np111py34_6 linux-64: boost
bob.blitz 2.0.8 np111py35_6 linux-64: boost
bob.core 2.1.2 py27_0 linux-64     :
bob.core 2.1.2 py27_1 linux-64     :

infile can be created using the output of the list_deps.py script with small modifications. For example:
$ conda execute conda-forge.github.io/scripts/list_deps.py conda-forge --package bob.blitz --dependencies 'boost$' --platform linux-64
# remove the first line
Fetching package metadata: ..
bob.blitz 2.0.8 np110py27_0 linux-64: boost
bob.blitz 2.0.8 np110py27_1 linux-64: boost
bob.blitz 2.0.8 np110py27_2 linux-64: boost
bob.blitz 2.0.8 np110py27_3 linux-64: boost
bob.blitz 2.0.8 np110py27_4 linux-64: boost
...

$ conda execute conda-forge.github.io/scripts/list_deps.py conda-forge --package bob.core --platform linux-64
# remove the first line
# remove the lines that have "boost 1.60.*" or "boost 1.61.*" in them.
# remove everything in all lines after the ":" character.
Fetching package metadata: ..
bob.core 2.1.2 py27_0 linux-64     : bob.blitz, libgcc, python 2.7*
bob.core 2.1.2 py27_1 linux-64     : bob.blitz, libgcc, python 2.7*
bob.core 2.1.2 py27_2 linux-64     : bob.blitz, python 2.7*
bob.core 2.1.2 py27_3 linux-64     : bob.blitz, python 2.7*
bob.core 2.1.2 py27_4 linux-64     : bob.blitz, python 2.7*
bob.core 2.1.2 py27_5 linux-64     : bob.blitz, boost 1.60.*, python 2.7*
bob.core 2.1.2 py27_6 linux-64     : bob.blitz, boost 1.61.*, python 2.7*
...

'''

import argparse
import datetime
import json
import os
import subprocess
import tarfile
import tempfile


def download_package(channel, name, version, build_string, platform, save_path):
  # I am using wget here but maybe conda has an api for this?
  url = 'https://anaconda.org/{channel}/{name}/{version}/download/{platform}/{name}-{version}-{build_string}.tar.bz2'
  url = url.format(channel=channel, name=name, version=version, platform=platform, build_string=build_string)
  print('Downloading: {}'.format(url))
  subprocess.call(
    ['wget',
     '--quiet',
     url,
     '-O',
     save_path])


def hotfix_package(channel, name, version, build_string, platform, dependency, replace):
  with tempfile.TemporaryDirectory() as tmpdir:

    # download the package
    save_path = os.path.join(tmpdir, '{}-{}-{}.tar.bz2'.format(name, version, build_string))
    download_package(channel, name, version,
                     build_string, platform, save_path)

    # extract it
    pkgdir = os.path.join(tmpdir, 'package')
    os.makedirs(pkgdir)
    with tarfile.open(save_path) as tar:
      tar.extractall(pkgdir)

    # patch the info/index.json file
    info_file = os.path.join(pkgdir, 'info', 'index.json')
    with open(info_file) as f:
      data = json.load(f)

    # keep the old dependency list as a dictionary of timestamps
    timestamp = str(datetime.datetime.now())
    if 'depends_history' in data:
      data['depends_history'][timestamp] = list(data['depends'])
    else:
      data['depends_history'] = {timestamp: list(data['depends'])}

    # replace the dependency or add it if it does not exist.
    if dependency in data['depends']:
      i = data['depends'].index(dependency)
      data['depends'][i] = replace
    elif dependency == '':
      data['depends'].append(replace)
    else:
      print('dependency not found! not hotfixing the package.')
      return
    with open(info_file, 'w') as f:
      json.dump(data, f, sort_keys=True, indent=2)

    # repackage
    os.chdir(pkgdir)
    files = os.listdir(pkgdir)
    with tarfile.open(save_path, 'w:bz2') as tar:
      for name in files:
        tar.add(name)

    # upload and replace
    # maybe we need to add --force here?
    args = ['anaconda', 'upload', '--user', channel, save_path]
    print(' '.join(args))
    subprocess.call(args)


def main(args):
  # An example for infile:

  # these lines dependency will be replaced
  # bob.blitz 2.0.8 np111py27_6 linux-64: boost
  # bob.blitz 2.0.8 np111py34_6 linux-64: boost
  # bob.blitz 2.0.8 np111py35_6 linux-64: boost

  # these lines args.replace will be added to the depends list
  # bob.core 2.1.2 py27_0 linux-64     :
  # bob.core 2.1.2 py27_1 linux-64     :
  for line in args.infile:
    name, dependency = line.split(':', 1)
    dependency = dependency.strip()
    name, version, build_string, platform = name.split()
    hotfix_package(args.channel, name, version, build_string, platform, dependency, args.replace)


if __name__ == '__main__':
  parser = argparse.ArgumentParser()
  parser.add_argument('channel')
  parser.add_argument('infile', type=argparse.FileType('r'))
  parser.add_argument('-r', '--replace', required=True)

  args = parser.parse_args()

  main(args)

---
tags: [tutorial]
---

# Building a package locally

In this tutorial, we will clone an existing feedstock and build a package for it locally. Building
locally is often a convenient way to quickly test your changes.

The tutorial assumes that you are running a Linux or macOS system, and have Docker, Git and Python
installed.

## Clone the feedstock

Once a new recipe is accepted for conda-forge (as outlined in [contributing
documentation](https://conda-forge.org/docs/maintainer/adding_pkgs/), a new feedstock repository is
created for it. All the subsequent work on the recipe happens in that repository. In this tutorial,
we will be working in a selected feedstock repository, similarly to how you'd work on your own
feedstock.

Let's start by cloning the
[xmltodict-feedstock](https://github.com/conda-forge/xmltodict-feedstock/) repository at a commit
corresponding to version 1.0.4, build 0.

Enter a directory of your choice, clone the repository and then enter it:

```bash
git clone --revision=728537f91186b70e7ac27cc7d5c036c82486d942 https://github.com/conda-forge/xmltodict-feedstock/
cd xmltodict-feedstock/
```

## Build the recipe

Feedstocks provide a convenient `build-locally.py` script that can be used to build recipes locally.
Start it:

```bash
python build-locally.py
```

Normally, the script would ask you to choose a configuration to build at this point. However, pure
Python packages such as `xmltodict` have only one configuration, so the script proceeds immediately.
It will pull the [conda-forge Docker image](https://github.com/conda-forge/docker-images), use it to
provision all the build tools and then will build the package, while
outputting the build process to the console.

Alternatively, for feedstocks having `conda_install_tool: pixi` in `conda-forge.yml`, you may use
`pixi run build` instead.

Near the end of the process, output validation will be performed and the packages produced will be
printed as part of that, for example:

```
validation results:
{
  "noarch/xmltodict-1.0.4-pyhcf101f3_0.conda": true
}
```

The built package will be found at the appropriate subdirectory of `build_artifacts`:

```
$ ls -lh build_artifacts/noarch/
total 28K
-rw-r--r-- 1 user user 461 02-23 16:33 repodata.json
-rw------- 1 user user 21K 02-23 16:33 xmltodict-1.0.4-pyhcf101f3_0.conda
```

## Try installing the built package

After building the package, we can create a local conda environment and try to install it. Type
in a conda-enabled prompt:

```bash
conda create -p ./build_artifacts/xmltodict-tests/ --override-channels -c ./build_artifacts -c conda-forge xmltodict
```

This will request creating a new conda environment in the directory specified by the `-p` argument.
`--override-channels` specifies that the channels found in default configuration should be ignored,
while the `-c` arguments specify that packages should be taken from `./build_artifacts` directory
first, and then from the `conda-forge` channel. The options are followed by the list of packages
to install; here: `xmltodict`. The command will print a list of packages to install. Among them, you
should be able to notice that `xmltodict` is taken from the local artifacts:

```
  xmltodict          build_artifacts/noarch::xmltodict-1.0.4-pyhcf101f3_0
```

Confirm creating the environment, activate it and start Python <abbr
title="read-eval-print loop">REPL</abbr>:

```bash
conda activate ./build_artifacts/xmltodict-tests/
python
```

Now you can import the newly installed module and confirm that it works:

```python
>>> import xmltodict
>>> xmltodict.unparse({"html": {"body": {"@style": "color: red", "#text": "hello world"}}})
'<?xml version="1.0" encoding="utf-8"?>\n<html><body style="color: red">hello world</body></html>'
```

## Clean up

Once you are done working with a feedstock, you want to remove the build artifacts, as they can take
a lot of space:

```
rm -r build_artifacts/
```

You may also want to clean up leftover Docker containers and images. However, note that this may
also remove other stopped containers and unused resources (which may matter if you are using Docker
for other purposes):

```
docker system prune
```

This will leave the downloaded Linux image used for the builds, though. To remove _all_ images, use:

```
docker system prune -a
```

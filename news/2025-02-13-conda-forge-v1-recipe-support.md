# Announcing the new recipe format on conda-forge

The conda-forge team is excited to announce that the v1 recipe format is available on conda-forge. The v1 recipe format is a community initiative dating back over 3 years to improve the recipe format for conda packages. If you are a maintainer of a feedstock on conda-forge, you have probably dealt with `meta.yaml` files that conda-build utilizes. The file format has some limitations which is why the community has come together to come up with an improved version of the format: the v1 format.

<!--truncate-->

## rattler-build and the v1 spec

The v1 recipe format has a number of benefits:

- It always parses as valid YAML which makes it much easier to modify it with the bot infrastructure of conda-forge. While meta.yaml looks like YAML, it can contain Jinja logic incompatible with the YAML specification, which make significantly complicates parsing and automated manipulation. Additionally, the recipe has a published JSON schema which means that the editing experience in VSCode is greatly improved with contextual help.
- The new recipe executes much faster, which is partially due to some design decisions (no more recursive evaluation) as well as due to rattler-build building on top of a modern re-implementation of the conda standards in Rust.
- The log output of rattler-build is greatly improved, always showing the user what the final files in the package are and the final metadata.
- Some features of conda-build, such as multiple outputs, had a lot of implicit behavior. We are fixing that in the v1 recipe.

You can read much more about the v1 recipe format in the [https://rattler.build](https://rattler.build) docs and [CEPs](https://github.com/conda/ceps/).

A simple v1 recipe looks something like the following:

```yaml
context:
  # we define named variables in the context instead of `{$ set ... %}` directives
  version: "23.0.0"
 
package:
  name: "boltons"
  # note that we use "GitHub" inspired syntax to access context / Jinja variables
  version: ${{ version }}
 
source:
  url: https://github.com/mahmoud/boltons/archive/refs/tags/${{ version }}.tar.gz
  sha256: 9b2998cd9525ed472079c7dd90fbd216a887202e8729d5969d4f33878f0ff668
 
build:
  noarch: python
  script:
    - python -m pip install . --no-deps -vv
 
requirements:
  host:
    - python
    - pip
    - setuptools
  run:
    - pip
 
about:
  license: BSD-3-Clause
  license_file: LICENSE
```

## How to use the v1 recipe format on conda-forge

If you are adding a new recipe on staged-recipes, then it's easy: just submit a `recipe.yaml` file instead of a `meta.yaml` file.
In case you already maintain a feedstock, then the conversion can be semi-automated with a tool created by [Hadrien Mary](https://github.com/hadim) called [`feedrattler`](https://github.com/hadim/feedrattler). The tool will take care of the basic conversions steps and uses [`conda-recipe-manager`](https://github.com/conda-incubator/conda-recipe-manager) by Anaconda / [Schuyler Martin](https://github.com/schuylermartin45) under the hood to parse the recipe and convert it to the new format.

```shell
pixi exec feedrattler my-awesome-package-feedstock gh_user
```

To do the conversion by hand, you need to do the following things:

- In the `conda-forge.yml`, add `conda_build_tool: rattler-build`
- Remove the `meta.yaml` file and add a `recipe.yaml` file following the v1 spec
- Rerender the feedstock using `conda-smithy rerender`
- Push your changes to your fork and open a PR to see the CI build your package

## Transition plans

For the foreseeable future, conda-forge is going to support both formats, v1 and v0. We envision a gradual transition over at least one year to the new spec. There are a couple of places where the v1 spec also needs to finalize / stabilize. One notable place is the `cache` output where CEP discussions are ongoing. This stabilization in the format should happen within Q1 of 2025.

Since the beginning of 2025, the bot has gained more capabilities for the v1 format, such as automatically bumping versions (the "autotick-bot"). There are a number of other migrators and mini-migrators that need to be fully ported to the v1 spec before we can claim 100% compatibility with the conda-forge infrastructure.

As of today, over 700 of the 25000 recipes on conda-forge have been converted.

For now, the recommendation on staged-recipes is: if it's a simple `noarch: python` recipe, it should probably be a `v1` recipe. The same goes for `Rust` or `Go` projects that have a simple structure.

### Where to learn more

There are very helpful docs located at [https://rattler.build](https://rattler.build) that explain the differences of the new recipe format pretty well. You are also very welcome to chat with us on the [conda-forge Zulip](https://conda-forge.zulipchat.com/), or chat with the rattler-build developers on [their Discord](https://discord.gg/kKV8ZxyzY4).

You can also read more about rattler-build and the v1 format in the following blog posts:

- https://prefix.dev/blog/rattler_build_on_conda_forge
- https://prefix.dev/blog/the_love_of_building_conda_packages
- https://prefix.dev/blog/rattler_build_a_new_parser
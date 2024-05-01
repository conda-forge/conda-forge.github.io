---
sidebar_position: 1
---

# The life cycle of a package

conda-forge implements a particular workflow for building, publishing and maintaining conda packages.
However, the core concepts are the same for any conda packaging solution.

## General concepts about conda packaging

`conda` packages are built off `conda` _recipes_.
A conda recipe includes a `meta.yaml` file, and optionally supporting scripts and data.
A build tool (usually [`conda-build`](https://github.com/conda/conda-build)) takes the recipe and produces one or more packages (also referred to as _outputs_ and/or _artifacts_, depending on the context).

While you can distribute the artifacts on your own, the conda packages are usually uploaded to a `conda` _channel_ hosted in a server like [Anaconda.org](https://anaconda.org/conda-forge) or [Quetz](https://github.com/mamba-org/quetz).
This channel _server_ processes all uploaded packages and aggregates the metadata contained in the packages in a single `repodata.json` file per platform or _subdir_.
For example, this is a subset of the `conda-forge` repodata for Linux x64 systems: [`current_repodata.json`](https://conda.anaconda.org/conda-forge/linux-64/current_repodata.json).

These are the metadata files that the `conda` client fetches when the user types `conda install ...`.
The solver will process all the metadata and will provide the most adequate selection of packages to the user, which are then downloaded, extracted and linked into the target conda environment.

### Post-publication particularities

For most packages, the paragraphs above are enough to describe their life cycle.
However, the repodata-first approach followed in the conda ecosystem allows for some unique features in the post-publication stages.

For large volume channels like conda-forge, Anaconda.org delivers the artifacts through a [CDN](/docs/reference/glossary.md#cdn) network for faster access.
The CDN network is synced with the channels periodically.
As a result, packages take around 15 minutes to be available for installation after their publication.

This CDN process offers a unique opportunity to post-process the repodata files.
This way, we can fix metadata issues without rebuilding packages.
Note that these changes do not propagate back to the metadata contained in the packages.

Anaconda.org also offers the concept of [channel _labels_][anaconda-org-labels], which in practice
behave as _subchannels_. The default label is `main`. When a new label is added, the package is
also visible in the subchannel `<channel>/label/<label>`. For example, a package uploaded to
conda-forge and labeled as `test` and `main` will be available in the `conda-forge` channel, but
also in the `conda-forge/label/test` subchannel.

## The life cycle on conda-forge

Anyone can run `conda-build` on their computer and manually upload their packages to Anaconda.org.
However, that approach has a few problems:

- It doesn't facilitate collaboration.
- There's no transparency in the process.
- Reproducibility is very system dependent.
- Compatibility across packages is not guaranteed.
- It doesn't scale well beyond a handful of packages.

On conda-forge, most packages are built using public CI services and maintained by thousands of volunteers, which require approaching the problem in a different way to guarantee fine-controlled permissions, independent project management and automated batch updates.

The main idea is that each conda recipe is processed by a separate GitHub repository.
These repositories, named _feedstocks_ in conda-forge, host the user-contributed conda recipe plus a number of auto-generated required scripts, configuration files and CI pipelines to build and export the conda artifacts.
Under this setup, the conda-forge bots can traverse the conda-forge repositories to re-generate and update feedstocks as needed when a global change or fix needs to be issued.

To be given a conda-forge feedstock, contributors must first submit their recipe for review to the the [`staged-recipes`][staged-recipes] repository.
Once reviewed and approved, the PR is merged to `main`, which triggers the feedstock creation.

After accepting the invitations to the `conda-forge` organization, the submitting contributor(s) will have been given commit rights to that repository.
By then, the [`staged-recipes` machinery][staged-recipes] will have populated the feedstock with the submitted recipe, plus the supporting scripts, configuration files and CI pipelines.

These pipelines will process the initial commits to produce and upload the conda artifacts to the `cf-staging` channel.
Any subsequent pushes to `main` (e.g. merged PRs) or other enabled branches will undergo the same process.

:::info
For existing feedstocks, conda-forge bots will often send automated PRs for new project releases or maintenance tasks.
You can find more details about it in [Automation & bots](/docs/advanced/automation.md).
:::

The validation server will detect the new uploads on `cf-staging` and will perform some checks on those artifacts.
If successful, the artifacts will then be copied to the actual `conda-forge` channel.

At this point, the channel server will process the contents of the new packages to retrieve their metadata and update the repodata files.
On the next CDN sync cycle, the artifacts will be distributed to the delivery network for faster access.
Validation and CDN sync usually take less then 15 minutes after the CI is passing on `main`. From this moment on, users can install the new packages from the CLI.

### Post publication particularities

In an ideal world, that would be the end of the life cycle. However, in some cases some packages go through some post-publication stages.

If the package metadata is found to be wrong or out-of-date, it can be modified without rebuilding the package.
The channel server can apply patches to the repodata files directly.
The patch instructions are published in [`conda-forge-repodata-patches`](/docs/reference/infrastructure/tooling-data.md#conda-forge-repodata-patches) and processed weekly.

Sometimes, there are issues with a published package that cannot be amended with a repodata patch (e.g. libraries were built wrong and segfault).
In these cases, the packages can be retired by labeling them as `broken`.
This is done through the [`admin-requests` repository](/docs/reference/infrastructure/automated-maintenance.md#admin-requests).
As part of the CDN-driven metadata patching, packages labeled as `broken` are not included in the final repodata index.
However, they are still available via direct URL access.
This allows organizations to retire packages from normal, solver-driven installs without compromising the reproducibility offered by lockfiles.

Finally, a project might have reached a status where no further updates are needed or expected (e.g. it has been superseded by a new project).
If the maintainers want to, these feedstocks can be archived and marked as read-only.

## Summary of stages

These stages are key concepts in the conda-forge documentation.
Feel free to refer to this list any time as you check the rest of the material.

1. [Initial submission to `staged-recipes`](/docs/fundamentals/staged-recipes.md)
2. Feedstock changes:
   - A. Repository initialization
   - B. Automated maintenance updates
   - C. PRs submitted by users
3. Package building
4. Package validation
5. Package publication
6. Post-publication:
   - A. Repodata patch
   - B. Mark a package as broken
   - C. Archive the feedstock

:::info
If you want to read on the infrastructure details behind these stages,
consider reading our [Infrastructure guide](/docs/reference/infrastructure/).
:::

<!-- LINKS -->

[anaconda-org-labels]: https://docs.anaconda.com/anacondaorg/user-guide/tutorials/
[staged-recipes]: /docs/reference/infrastructure/staged-recipes.md
[feedstocks]: /docs/reference/infrastructure/feedstocks.md

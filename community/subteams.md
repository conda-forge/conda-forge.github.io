---
title: 'A list of current sub-teams'
---

<a id="a-list-of-current-sub-teams"></a>

# A list of current sub-teams

<a id="security-subteam"></a>

<a id="security-and-systems-sub-team"></a>

## Security and Systems Sub-Team

<a id="role"></a>

### Role

The purpose of the security and systems sub-team is to secure and maintain appropriate access
to the credentials and services/systems used by conda-forge. This infrastructure
includes all bot accounts, all service provider accounts, and all keys, API or otherwise,
used for various tasks. This team is also charged with provisioning new members of `core`
with access to the organization.

<a id="charter"></a>

### Charter

Static

<a id="responsibility"></a>

### Responsibility

The core responsibilities of this team are as follows:

- Maintain secure access to the credentials to all bot accounts.
- Maintain secure access to all keys, API or otherwise, used by conda-forge.
- Maintain secure access to all service provider accounts owned by conda-forge.
- Maintain the infrastructure for `CFEP-13`.
- Maintain automated ways to recover and reprovision conda-forge systems.
- Perform ongoing security maintenance tasks.
- Provision new members of core with access to all conda-forge systems, credentials
  and keys.

This team will operate via the following rules:

- Only members of `core` can be on this sub-team.
- This sub-team will report its activity to core at all `core` meetings.
- This sub-team will consult with core at `core` meetings regarding all planned activity.
- This sub-team will not limit the access by `core` members to any conda-forge resources
  including but not limited to its systems, credentials, keys, or service accounts.

<a id="members"></a>

### Members

- Matthew R. Becker <[becker.mr@gmail.com](mailto:becker.mr@gmail.com)>
- Christopher J. "CJ" Wright <[cjwright4242@gmail.com](mailto:cjwright4242@gmail.com)>
- Anthony Scopatz <[scopatz@gmail.com](mailto:scopatz@gmail.com)>

<a id="finance-sub-team"></a>

## Finance Sub-Team

<a id="id1"></a>

### Role

The purpose of the finance sub-team is to provide a point of contact
for financial and budgetary issues. This includes keeping core aware
of the current conda-forge balance via `core` meetings and facilitating
dispersal of funds.

<a id="id2"></a>

### Charter

Static

<a id="id3"></a>

### Responsibility

The core responsibilities of this team are as follows:

- Keep core aware of budgetary and financial matters pertaining to conda-forge.
- Facilitate dispersal of funds.
- Give core updates via the standing budget item at core meetings.
- Work closely with the NumFOCUS point of contact to ensure smooth financial operations.

This team will operate via the following rules:

- Only members of `core` can be on this sub-team.
- This sub-team will report its activity to core at all attended `core` meetings.
- This sub-team will not approve or deny access to funds unless instructed to
  via the method specified by the conda-forge governance document.

<a id="id4"></a>

### Members

- Christopher J. "CJ" Wright <[cjwright4242@gmail.com](mailto:cjwright4242@gmail.com)>
- Filipe Fernandes <[ocefpaf@gmail.com](mailto:ocefpaf@gmail.com)>
- Eric Dill <[ericdill@pm.me](mailto:ericdill@pm.me)>

<a id="bot-sub-team"></a>

## Bot Sub-Team

<a id="id5"></a>

### Role

Develop and manage the conda-forge migration bot and all related tooling.
Also manages and deploys migrations themselves.

<a id="id6"></a>

### Charter

Dynamic

<a id="id7"></a>

### Responsibility

The migration and autotick bot is now a central part of the conda-forge ecosystem.
This subteam has the right and responsibility to manage and develop the general
operation of the bot.
This includes building new migrators, fixing migration related bugs, and tooling.
Example migrations that can happen include:

- Compiler bumps
- Python version bump
- R version bump
- Build number bumps of the ecosystem when a pinned package version updates and
  there is a binary incompatibility which necessitates downstream rebuilds.
- Automatically version bumping of feedstocks when the package releases a new version.

For large scale (affecting >20% of packages) this sub-team will inform and
discuss with the core team about the upcoming migration prior to starting the
migration.

Packages and tools that fall under the purview of the bot subteam include:

- cf-scripts
- libcflib
- libcfgraph
- cf-graph
- circle-worker

<a id="id8"></a>

### Members

- Matthew R. Becker <[becker.mr@gmail.com](mailto:becker.mr@gmail.com)>
- Chris Burr <[christopher.burr@cern.ch](mailto:christopher.burr@cern.ch)>
- Sophia Castellarin <[scastellarin@anaconda.com](mailto:scastellarin@anaconda.com)>
- Vinicius D. Cerutti <[vinicius.douglas.cerutti9@gmail.com](mailto:vinicius.douglas.cerutti9@gmail.com)>
- Filipe Fernandes <[ocefpaf@gmail.com](mailto:ocefpaf@gmail.com)>
- Isuru Fernando <[isuruf@gmail.com](mailto:isuruf@gmail.com)>
- Marius van Niekerk <[marius.v.niekerk@gmail.com](mailto:marius.v.niekerk@gmail.com)>
- Michael Sarahan <[msarahan@gmail.com](mailto:msarahan@gmail.com)>
- Anthony Scopatz <[scopatz@gmail.com](mailto:scopatz@gmail.com)>
- Christopher J. "CJ" Wright <[cjwright4242@gmail.com](mailto:cjwright4242@gmail.com)>

<a id="arm-sub-team"></a>

## ARM Sub-Team

<a id="id9"></a>

### Role

Develop and manage ARM architecture support for conda-forge.

<a id="id10"></a>

### Charter

Dynamic

<a id="id11"></a>

### Responsibility

This sub-team is broadly responsible for enabling the ARM architecture.
This includes updates and enabling features to:

- staged-recipes
- CI interfaces
- conda-smithy
- Docker containers

And other parts of the conda-forge ecosystem.

<a id="id12"></a>

### Members

- Jonathan Helmus <[jjhelmus@gmail.com](mailto:jjhelmus@gmail.com)>
- Marius van Niekerk <[marius.v.niekerk@gmail.com](mailto:marius.v.niekerk@gmail.com)>
- Mark Harfouche <[mark.harfouche@gmail.com](mailto:mark.harfouche@gmail.com)>

<a id="doc-sub-team"></a>

## Doc Sub-Team

<a id="id13"></a>

### Role

Maintain and improve the documentation. Review, organize and help with documentation related issues.

<a id="id14"></a>

### Charter

Dynamic

<a id="id15"></a>

### Responsibility

Good documentation is an important cornerstone of a successful community project.
Accurate, well organized and comprehensive documentation not only benefits users, but also frees
the core team by decreasing support requests.

The documentation team is responsible for:

- Keeping the documentation accurate and up-to-date.
- Help expanding the documentation by identifying new topics of common interest.
- Improving the documentation by reorganizing and clarifying its contents.
- Giving feedback on community contributions to the documentation.

As such following task are performed by the documentation team:

- Reviewing and organizing documentation related issues and PRs in `conda-forge.github.io`.
- Proposing improvements and new content by opening issues and pull requests.
- Engaging with the community to ensure the effectiveness of the documentation.

<a id="id16"></a>

### Members

- Anthony Scopatz <[scopatz@gmail.com](mailto:scopatz@gmail.com)>
- Christian Roth <[ch.m.roth@gmail.com](mailto:ch.m.roth@gmail.com)>
- Lori A. Burns <[lori.burns@gmail.com](mailto:lori.burns@gmail.com)>
- Jaime Rodríguez-guerra <[jrodriguez@quansight.com](mailto:jrodriguez@quansight.com)>

<a id="staging-sub-team"></a>

## Staging Sub-Team

<a id="id17"></a>

### Role

Review and merge feedstock candidates in the staged-recipes repository. Help users to create
conda-forge compatible recipes.

<a id="id18"></a>

### Charter

Dynamic

<a id="id19"></a>

### Responsibility

Introducing a recipe for most users is the first step of becoming involved with the development of conda-forge.
Especially for new maintainers it is crucial to be able to ask questions and receive helpful and constructive feedback.

The staging team is responsible for:

- Reviewing and merging pull requests in `conda-forge/staged-recipes`.
- Answering questions and giving feedback regarding conda-forge requirements.
- Identifying common misconceptions and problems due to unclear documentation.
- Help the documentation team maintain clear documentation that simplifies contributing packages.
- Assist core in supporting feedstock maintainers when questions/issues arise during recipe maintenance.

<a id="id20"></a>

### Members

In addition to [core](https://github.com/conda-forge/conda-forge.github.io/blob/main/src/core.csv)
and [emeritus](https://github.com/conda-forge/conda-forge.github.io/blob/main/src/emeritus.csv),
the following are members of the staged-recipes team and have commit rights.

- Amir Mohammadi <[183.amir@gmail.com](mailto:183.amir@gmail.com)>
- Igor T. Ghisi <>
- Johannes Köster <>
- Nehal J Wani <[nehaljw.kkd1@gmail.com](mailto:nehaljw.kkd1@gmail.com)>
- Peter M. Landwehr <>
- Patrick Sodré <[psodre@gmail.com](mailto:psodre@gmail.com)>

<a id="miniforge-sub-team"></a>

## Miniforge Sub-Team

<a id="id21"></a>

### Role

Develop and manage miniforge installers for conda-forge

<a id="id22"></a>

### Charter

Dynamic

<a id="id23"></a>

### Responsibility

This sub-team is broadly responsible for developing, maintaining and releasing
miniforge installers.

<a id="id24"></a>

### Members

- Mark Harfouche <[mark.harfouche@gmail.com](mailto:mark.harfouche@gmail.com)>
- Anthony Scopatz <[scopatz@gmail.com](mailto:scopatz@gmail.com)>
- Hadrien Mary <[hadrien.mary@gmail.com](mailto:hadrien.mary@gmail.com)>
- Isuru Fernando <[isuruf@gmail.com](mailto:isuruf@gmail.com)>

<a id="diversity-and-inclusion-sub-team"></a>

## Diversity and Inclusion Sub-Team

<a id="id25"></a>

### Role

Develop conda-forge as a diverse community and advocate for
actions impacting underrepresented groups in conda-forge.

<a id="id26"></a>

### Charter

Dynamic

<a id="id27"></a>

### Responsibility

One of the core strengths of conda-forge is the diversity of ecosystems it supports.
Likewise, fostering and advancing a diverse community of users, maintainers, and infrastructure contributors
is an important part of creating and maintaining a vibrant project.
The mandate of this subteam is to support and increase the diversity of the conda-forge
community at all levels.
As such this group can, but is not limited to:
- provide a place for issues impacting diversity to be heard
- advocate for underrepresented groups and bring their issues to the attention of core
- run programs to maintain and grow the community's diversity and inclusiveness

<a id="id28"></a>

### Members

- Filipe Fernandes <[ocefpaf@gmail.com](mailto:ocefpaf@gmail.com)>
- Christopher J. "CJ" Wright <[cjwright4242@gmail.com](mailto:cjwright4242@gmail.com)>
- Marcelo Duarte Trevisani <[marceloduartetrevisani@gmail.com](mailto:marceloduartetrevisani@gmail.com)>
- Peter K. G. Williams <[peter@newton.cx](mailto:peter@newton.cx)>

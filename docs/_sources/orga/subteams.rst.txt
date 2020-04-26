A list of current sub-teams
***************************


Security and Systems Sub-Team
=============================

Role
----
The purpose of the security and systems sub-team is to secure and maintain appropriate access
to the credentials and services/systems used by ``conda-forge``. This infrastructure
includes all bot accounts, all service provider accounts, and all keys, API or otherwise,
used for various tasks. This team is also charged with provisioning new members of ``core``
with access to the organization.

Charter
-------
Static

Responsibility
--------------
The core responsibilities of this team are to

- maintain secure access to the credentials to all bot accounts
- maintain secure access to all keys, API or otherwise, used by ``conda-forge``
- maintain secure access to all service provider accounts owned by ``conda-forge``
- maintain the infrastructure for CFEP-13
- maintain automated ways to recover and reprovision ``conda-forge`` systems
- perform ongoing security maintenance tasks
- provision new members of `core` with access to all ``conda-forge`` systems, credentials
  and keys

This team will operate via the following rules

- only members of `core` can be on this sub-team
- this sub-team will report its activity to core at all ``core`` meetings
- this sub-team will consult with core at ``core`` meetings regarding all planned activity
- this sub-team will not limit the access by ``core`` members to any ``conda-forge`` resources
  including but not limited to its systems, credentials, keys, or service accounts

Members
-------
- Matthew R. Becker <becker.mr@gmail.com>
- Christopher J. "CJ" Wright <cjwright4242@gmail.com>
- Anthony Scopatz <scopatz@gmail.com>


Bot Sub-Team
============

Role
----
Develop and manage the ``conda-forge`` migration bot and all related tooling.
Also manages and deploys migrations themselves.

Charter
-------
Dynamic

Responsibility
--------------
The migration and autotick bot is now a central part of the ``conda-forge`` ecosystem.
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

Members
-------
- Matthew R. Becker <becker.mr@gmail.com>
- Sophia Castellarin <scastellarin@anaconda.com>
- Filipe Fernandes <ocefpaf@gmail.com>
- Marius van Niekerk <marius.v.niekerk@gmail.com>
- Michael Sarahan <msarahan@gmail.com>
- Anthony Scopatz <scopatz@gmail.com>
- Christopher J. "CJ" Wright <cjwright4242@gmail.com>


ARM Sub-Team
============

Role
----
Develop and manage ARM architecture support for ``conda-forge``.

Charter
-------
Dynamic

Responsibility
--------------
This sub-team is broadly responsible for enabling the ARM architecture.
This includes updates and enabling features to:

- staged-recipes
- CI interfaces
- conda-smithy
- Docker containers

And other parts of the ``conda-forge`` ecosystem.

Members
-------
- Jonathan Helmus <jjhelmus@gmail.com>
- Marius van Niekerk <marius.v.niekerk@gmail.com>
- Mark Harfouche <mark.harfouche@gmail.com>


Doc Sub-Team
============

Role
----
Maintain and improve the documentation; review, organize and help with documentation related issues.

Charter
-------
Dynamic

Responsibility
--------------
Good documentation is an important cornerstone of a successful community project.
Accurate, well organized and comprehensive documentation not only benefits users, but also frees
the core team by decreasing support requests.

The documentation team is responsible for

 - keeping the documentation accurate and up-to-date.
 - help expanding the documentation by identifying new topics of common interest.
 - improving the documentation by reorganizing and clarifying its contents.
 - giving feedback on community contributions to the documentation.

As such following task are performed by the documentation team:

 - reviewing and organizing documentation related issues and PRs in ``conda-forge.github.io``.
 - proposing improvements and new content by opening issues and pull requests.
 - engaging with the community to ensure the effectiveness of the documentation.


Members
-------
- Anthony Scopatz <scopatz@gmail.com>
- Christian Roth <ch.m.roth@gmail.com>
- Lori A. Burns <lori.burns@gmail.com>


Staging Sub-Team
================

Role
----
Review and merge feedstock candidates in the staged-recipes repository. Help users to create
``conda-forge`` compatible recipes.

Charter
-------
Dynamic

Responsibility
--------------
Introducing a recipe for most users is the first step of becoming involved with the development of ``conda-forge``.
Especially for new maintainers it is crucial to be able to ask questions and receive helpful and constructive feedback.

The staging team is responsible for:

 - reviewing and merging pull requests in ``conda-forge/staged-recipes``
 - answering questions and giving feedback regarding ``conda-forge`` requirements
 - identifying common misconceptions and problems due to unclear documentation
 - help the documentation team maintain clear documentation that simplifies contributing packages
 - assist core in supporting feedstock maintainers when questions/issues arise during recipe maintenance

Members
-------
In addition to [core](https://github.com/conda-forge/conda-forge.github.io/blob/master/src/core.csv)
and [emeritus](https://github.com/conda-forge/conda-forge.github.io/blob/master/src/emeritus.csv),
the following are members of the staged-recipes team and have commit rights.

 - Amir Mohammadi <183.amir@gmail.com>
 - Matthew R. Becker <becker.mr@gmail.com>
 - Chris Burr <christopher.burr@cern.ch>
 - Igor T. Ghisi <>
 - Johannes Köster <>
 - Marcelo Duarte Trevisani <marceloduartetrevisani@gmail.com>
 - Nehal J Wani <nehaljw.kkd1@gmail.com>
 - Peter M. Landwehr <>
 - Patrick Sodré <psodre@gmail.com>
 - Sylvain Corlay <sylvain.corlay@gmail.com>


Miniforge Sub-Team
==================

Role
----
Develop and manage miniforge installers for ``conda-forge``

Charter
-------
Dynamic

Responsibility
--------------
This sub-team is broadly responsible for developing, maintaining and releasing
miniforge installers.

Members
-------
- Mark Harfouche <mark.harfouche@gmail.com>
- Anthony Scopatz <scopatz@gmail.com>
- Hadrien Mary <hadrien.mary@gmail.com>
- Isuru Fernando <isuruf@gmail.com>

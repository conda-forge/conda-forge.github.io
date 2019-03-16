A list of current sub-teams
***************************


Bot Sub-Team
============

Role
----
Develop and manage the conda-forge migration bot and all related tooling.
Also manages and deploys migrations themselves.

Charter
-------
Dynamic

Responsibility
--------------
The migration and autotick bot is now a central part of the conda-forge ecosystem.
This subteam has the right and responsibility to manage and develop the general
operation of the bot.
This includes building new migrators, fixing migration related bugs, and tooling.
Example migrations that can happen include:

- Compiler bumps
- Python version bump
- R version bump
- Build number bumps of the ecosystem when a pinned package version updates and
  there is a binary incompatibility which necessitate downstream rebuilds.
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
- Justin Calamari <justin.calamari@gmail.com>
- Filipe Fernandes <ocefpaf@gmail.com>
- Marius van Niekerk <marius.v.niekerk@gmail.com>
- Michael Sarahan <msarahan@gmail.com>
- Anthony Scopatz <scopatz@gmail.com>
- Christopher J. "CJ" Wright <cjwright4242@gmail.com>






ARM Sub-Team
============

Role
----
Develop and manage ARM architecture support for conda-forge.

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

And other parts of the conda-forge ecosystem.

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

Good documentation is an important corner stone of a successful community project.
Accurate, well organized and comprehensive documentation not only benefits users, but also frees the core team by decreasing support requests.

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

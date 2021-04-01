Joining the team
****************

``conda-forge`` is a volunteer-driven community. We need your help! We have three
main groups of people who maintain the ecosystem. They are the core team, the
staged-recipes maintainers, and the feedstock maintainers. If you are interested in
helping us maintain this ecosystem, our biggest need is help reviewing new conda packages
coming in through staged-recipes.

To join the staged-recipes team, please ask one of the core members on
`our gitter channel <https://gitter.im/conda-forge/conda-forge.github.io>`__.
We will then reach consensus in private and let you know our decision.
Our decision will likely be "yes" but it could be "please get more involved
with the review process on staged recipes first" if we have not seen you
take much interest in the staged-recipes review process.
For transparency, our process is to have the core team "vote" on adding new
members. When we have a new member candidate, we ask the core team to vote
yes/no and give the team seven days to vote. The person will then be given merge
rights to conda-forge/staged-recipes so that they can help us review and merge
submissions more quickly!

If you'd like to maintain a specific feedstock, open a PR on the feedstock adding
yourself as a maintainer. If the current maintainers have not responded after a week,
please get in touch with the core team to get the PR merged.

If you are interested in joining the core team, please get in touch with us on
`our gitter channel <https://gitter.im/conda-forge/conda-forge.github.io>`__.
Core members are added via a vote amongst the current core team. The core team
member who is running your vote will ask you to provide sufficient justification
as to why you should be nominated to core. Prior service to the community, including
but not limited to serving as a staged-recipes reviewer, working on critical conda-forge
infrastructure, and helping to bridge disparate communities are an important part of
the nomination process.


core Responsibilities
=====================

The core team is the governing body over the entire ``conda-forge``
organization. Members of the core team have full rights over all ``conda-forge``
repositories. Members of core are the face of the project, and are responsible
for officially interfacing with external communities, organizations, non-profits,
and companies. They are also responsible for maintaining conda-forge's infrastructure.


staged-recipes Responsibilities
===============================

You are the welcoming committee for new recipes coming in to the conda-forge
community! Please give new (and experienced) contributors a pleasant experience!
Generally speaking, your role is as follows:

1. Keep up to date with the current best practices for conda packaging standards
2. Provide recipe review which generally means making sure that the recipe
   under review adheres to what we list on the :ref:`dev_contribute_pkgs` page.
3. Open issues as needed, both on staged and on the other flagship repos
   (`smithy <https://github.com/conda-forge/conda-smithy>`_,
   `webservices <https://github.com/conda-forge/conda-forge-webservices>`_,
   `docs <https://github.com/conda-forge/conda-forge.github.io>`_, etc.),
   especially when problems occur.
4. Helping recipe maintainers who bump the ``conda-forge/help-*`` teams.


feedstock maintainer Responsibilities
=====================================

Feedstock maintainers are responsible for

1. Keeping their recipes up-to-date including version bumps.
2. Merging ABI migration PRs from our bots.
3. Responding to issues raised by the community on the feedstock issues tracker.

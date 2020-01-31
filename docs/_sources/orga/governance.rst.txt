Governance
==========
This document outlines the policies and procedures that manage the conda-forge
community. This document recognizes that, while packaging is deeply important
to all of us, conda-forge is an all-volunteer organization. Members of the
core, any team, or external contributors choose to participate and may
choose to leave at any time for any reason or for no reason. We deeply
appreciate all good faith contributions.

Code of Conduct
---------------
Conda-forge adheres to the
`NumFOCUS Code of Conduct <https://www.numfocus.org/code-of-conduct>`_.

Teams & Roles
-------------
Here are defined the primary teams participating in conda-forge activities.

* **core:** The core team is the governing body over the entire conda-forge
  organization. Members of the core team have full rights over all conda-forge
  repositories. Members of core are the face of the project, and are responsible
  for officially interfacing with external communities, organizations, non-profits,
  and companies. The core team may create new sub-teams, as appropriate.
  Each member of core is entitled to one vote on all elected matters.
* **staged-recipes:** The staged-recipes team administers the staged-recipes
  repository and is responsible for the review and creation of new feedstocks.
* **maintainers:** A maintainer is an individual responsible for the management
  of one or more feedstock repositories and packages. Maintainers have the ability
  to merge pull requests into the feedstock of only the packages they maintain.
* **external contributors:** This group encompasses all others who are not on
  core, part of staged-recipes, or maintainers. This includes first-time
  contributors, collaborators, and funders. They have no special rights within
  the conda-forge organization itself.
* **emeritus-core:** Core members that are inactive (commits, GitHub comments/issues/reviews,
  dev meetings and voting on polls) in the past six months will be asked if they want to become emeritus-core
  developers. Any core member can also request to become emeritus if they wish to do so
  (e.g. taking a sabbatical or long vacation).
  Emeritus core members can still vote and be back to active core anytime, the only difference is
  that emeritus-core will not count as the total core members when computing the necessary
  votes a poll needs to pass. The ``core.csv`` list should be updated when change in the status of a member occurs.

Sub-Teams
---------
The core team may elect to create new sub-teams for managing the daily business
of the organization. While sub-teams may have non-core members, every sub-team
must have at least one core team member at all times. If a sub-team fails to
have  a core team member for more than 1 week, that team is considered to be
dissolved. A new sub-team would need to be established by the core in order to
reinstate the activity.

Sub-teams have a charter that is either *dynamic* or *static*.

* A *dynamic* charter means that the sub-team is self-organizing, with respect
  to its own internal policies, procedures, and membership. A sub-team may choose
  to modify its membership independent of the core team. For example, a
  Google Summer of Code team could be a good candidate for a dynamic charter.
  Alternatively, language-based maintenance teams also have a dynamic charter.
* A *static* charter means that all membership decisions and non-trivial policies
  changes must be approved by the core team. For example, a finance team
  may require a static charter.

All sub-teams must adhere to the governance, policies, and procedures of
conda-forge at all times.

Voting
------
This section presents descriptions and criteria for voting items in the
conda-forge community. The core team is the only team with voting rights.
Members of core may also call a vote on any topic. The restrictions on
calling a vote are as follows:

* There must only be one vote active on a particular item at any time.
* The act of calling for a vote cannot itself violate the code of
  conduct. For example, Sam repeatedly called for votes immediately
  after a previous vote failed to achieve Sam's result. Sam is
  attempting to bully other members of core into agreeing, and is thus
  violating the code of conduct.
* Voting yes moves the proposal forward;
  voting no is the only way to express opposition to the proposal;
  not voting is discouraged, but non-votes do not count as "no".
* There should always be an option to abstain from voting.

Voting items are labeled as either **standard** or **sensitive**.
Standard items are ones where public record and discourse is
preferable. Sensitive voting items are ones where the results of the
vote should remain private to the voters after the vote has occurred.
Sensitive votes should take place on a secure anonymous voting platform
(such as `Polys <polys.me>`_ or
`the Helios voting system <https://vote.heliosvoting.org/>`_) in order to
retain anonymity.

The default voting period is 1 week (7 days). This may be modified at
the time when a vote is called, but may never be less than 24 hrs.

To call for a standard vote, here is a template PR comment:

.. code-block:: md

    @conda-forge/core
    This PR falls under the {policy} policy, please vote and/or comment on this PR.
    This PR needs {policy_percent} of core to vote yea to pass.
    To vote please leave Approve (yea) or Request Changes (nay) reviews.
    If you would like changes to the current language please leave a comment or push to this branch.
    This vote will end on {date}.

----

:CFEP Approval: When ready, the proposer may call for a vote on an
    existing conda-forge enhancement proposal (CFEP). This requires a
    super-majority (60%) to pass so that the decision to accept the
    CFEP is unequivocable and we have ensured that consensus has been
    reached.

    * Standard
    * 60% Majority to pass

----

:Nominate new member of staged-recipes: The proposer must provide
    a brief justification as to why the new member is desirable or needed.

    * Sensitive
    * 50% Majority to pass

----

:Nominate new member of core: The proposer must provide
    a sufficient justification as to why the nominee should be welcomed
    into core. Prior service to the community, including but not limited to:
    serving as a staged-recipes reviewer, working on critical conda-forge
    infrastructure, and helping to bridge disparate communities are an
    important part of the nomination process.

    * Sensitive
    * 66.7% Majority to pass

----

:Sub-team Formation: Proposers must specify the name, role & responsibility,
    members, and charter (dynamic or static) of any new sub-teams.

    * Standard
    * 50% Majority to pass

----

:Sub-team Dissolution: Proposers must specify the name and justification
    for why a sub-team should be dissolved.

    * Standard
    * 50% Majority to pass

----

:Lock an Issue, Pull Request, Thread: Occasionally, discussions become
    toxic and antithetical to the goal of fostering the conda-forge
    community. Members of core have the right to lock the thread in an
    "ask for forgiveness and not for permission" way so bad situations
    are handled quickly. The lock must be justified in the thread itself
    with a text explaining the reasons for locking and how the participants
    can contest it.

    * Standard
    * No need for voting to lock a thread

----

:Block a Contributor: In extreme cases, such as repeated harassment,
    it may become necessary to block a user completely from participating
    in all conda-forge activities. This should not be done lightly,
    but it may be necessary to do so expediently. Shorter voting periods
    (such as 24 hrs) are to be expected. The proposer of the block
    must provide ample justification as to why this is needed.

    * Sensitive
    * 60% Majority to pass

----

:Remove member of staged-recipes: The proposer must provide
    a justification as to why the member of staged recipes
    should be removed.

    * Sensitive
    * 66.7% Majority to pass

----

:Remove member of core: The proposer must provide
    an overwhelming justification as to why the member core
    should be removed.

    * Sensitive
    * 75% Majority to pass

----

:Overall workflow and packaging policies: The proposer can choose to
    create a poll with an external tool or call
    for voting on the GH issue in question.
    The voting period must be open for at least one core
    member meeting cycle to allow for clarification questions
    and discussions. Friendly reminders to vote are encouraged.

    * Standard
    * 50% plus one of those voting to pass

----

:Spending of funds: Proposers must specify the purpose, time limit, and source
    of funds that are to be spent. Purpose and time limit should be general
    enough in order to prevent excessive voting.  For example, recurrent
    items (such as CI) should not need to be voted on each and every month.
    Instead, they should exist for a defined period of time (e.g. until the
    current migration ends, or for the next year). For such recurring expenses,
    the person coordinating spending the funds can choose to cancel the
    spending if it is deemed no longer necessary or cost-effective without
    calling another vote, although they should make reasonable efforts to
    notify the rest of core before doing so.

    * Standard
    * 50% Majority to pass

----

:Modifying the governance document: The voting should happen in the PR
    in question and there must be a call to `@conda-forge/core`.
    The voting period must be open for at least one core
    member meeting cycle to allow for clarification questions
    and discussions.

    * Standard
    * 75% plus one of those voting to pass

----

All other voting items are considered to be standard and require a 50%
majority to pass.

Current Members of Core
-----------------------
In alphabetical order,

* Marcel Bargull, @mbargull
* Matthew Becker, @beckermr
* Lori Burns, @loriab
* Sophia Castellarin, @soapy1
* Matt Craig, @mwcraig
* Eric Dill, @ericdill
* Phil Elson, @pelson
* Filipe Pires Alvarenga Fernandes, @ocefpaf
* Isuru Fernando, @isuruf
* Björn Grüning, @bgruening
* Jonathan J. Helmus, @jjhelmus
* John Kirkham, @jakirkham
* Marius van Niekerk, @mariusvniekerk
* Min Ragan-Kelley, @minrk
* Mike Sarahan, @msarahan
* Anthony Scopatz, @scopatz
* Patrick Snape, @patricksnape
* Patrick Sodré, @sodre
* Dougal J. Sutherland, @dougalsutherland
* Peter K. G. Williams, @pkgw
* Christopher J. "CJ" Wright, @CJ-Wright

Document History
----------------
This document was written by Anthony Scopatz.

This document is released under the CC-BY 4.0 license.

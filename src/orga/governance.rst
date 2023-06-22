Governance
==========
This document outlines the policies and procedures that manage the conda-forge
community. This document recognizes that, while packaging is deeply important
to all of us, conda-forge is an all-volunteer organization. Members of the
core, any team, or external contributors choose to participate and may
choose to leave at any time for any reason or for no reason. We deeply
appreciate all good faith contributions.

.. _code_of_conduct:

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
  Emeritus core members can still vote and move back to active core anytime. Emeritus
  votes are used to count towards quorum but the quorum size is computed from the size of
  the active core group. The ``core.csv`` list should be updated when a change in the status
  of a member occurs.

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
* A *static* charter means that all membership decisions and non-trivial policy
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
in order to retain election integrity and anonymity. (We have used `Polys <https://polys.me>`__
and `the Helios voting system <https://vote.heliosvoting.org/>`__, but are
open to any secure, anonymous system.) The email capability of your chosen
voting platform should be used for sending voting invitations and reminders,
and you should use the email list from
https://github.com/conda-forge/conda-forge.github.io/blob/main/src/core.csv
and https://github.com/conda-forge/conda-forge.github.io/blob/main/src/emeritus.csv
as the authoritative list of emails to use.

The default voting period is 1 week (7 days). This may be modified at
the time when a vote is called, but may never be less than 24 hrs.

Additional requirements may apply in case low turnouts have to be handled, see "Quorum" below.

To call for a standard vote, here is a template PR comment:

.. code-block:: md

    @conda-forge/core
    This PR falls under the {policy} policy, please vote and/or comment on this PR.
    This PR needs {policy_percent} of core to vote yea to pass.
    To vote please leave Approve (yea) or Request Changes (nay) reviews.
    If you would like changes to the current language please leave a comment or push to this branch.
    This vote will end on {date}.

----

:Posting results: To maintain the historical record, the outcome of any standard vote which invokes the
         "time out" rules below should be recorded in the "vote-results" folder at
         https://github.com/conda-forge/conda-forge.github.io/tree/main/vote-results

         Each vote should be its own file.  The filename should reflect the topic and the
         date that the vote opened.  The file should contain at least:

         * vote description
         * vote policy
         * vote totals
         * poll open and close dates
         * notifications given to the core group

----

:Quorum: Quorum for votes can be met in one of three ways depending on the
     vote: the standard quorum rules, the accelerated quorum rules, and the
     "time out" quorum rules. The specific quorum rules applicable
     for each vote are listed below.

     **Standard Quorum Rules**: All percentages below express *both*
     required participation, as a
     fraction of the active core team, as well as the fraction of that
     fraction who vote affirmatively on the issue. For example, in a vote
     requiring 50%, with 18 active core members, at least 9 must vote;
     if 9 vote, there must 5 affirmative votes. If 13 members vote, 7
     must be affirmative.

     **Accelerated Quorum Rules**: For certain votes, we allow a lower quorum level.
     For these votes,
     if the voting period is longer than a week and there are no "no" votes, a quorum
     of half of the size
     needed for a **standard quorum** above is acceptable. For example, for a vote
     requiring 50% with 18
     active core members, at least 5 people must vote "yes" and exactly 0 people
     must vote "no".

     **Time-out Quorum Rules**: Votes not achieving quorum will eventually time out on their set end date.
     When this happens,
     the current participation level is taken for what it is, and the percentage
     of affirmative votes is calculated from whatever the vote total is at that
     time.  In order for a timeout to occur, the vote must have:

         * been open for at least 2 weeks
         * been presented and discussed at a Core team meeting
         * been advertised on at least 3 separate occasions on the element core
           chatroom (beginning of voting period, middle, and one day prior to
           proposed timeout)
         * been sent to core members via email.  Email reminders must have been
           sent to the core email list in a manner similar to the element chatroom: at least 3 times,
           occurring as beginning of voting period, middle, and one day
           prior to proposed timeout.

     Extending the above example, if 9 people are required for a quorum, but
     only 7 have voted, those 7 votes can form the basis of a completed vote
     after the above conditions are met. 4 votes within those 7 would be
     needed to pass the vote.

     To post a timeout reminder, here is a template comment:

      .. code-block:: md

          @conda-forge/core
          This vote falls under the {policy} policy, please vote
          and/or comment on this PR.
          This vote needs {policy_percent} of core to vote yea to pass.
          This vote presently has {current_voters}, and needs
          {policy_percent * core - current_voters} more for quorum.
          It is proposed that this vote will time out and be
          evaluated with the current votes in {days}, on {date}.
          To vote please leave Approve (yea) or Request Changes (nay)
          reviews.

     To declare a standard vote "timed out," the person making such a declaration
     must post a pull-request adding
     a vote record to the `vote-results folder <https://github.com/conda-forge/conda-forge.github.io/tree/main/vote-results>`__.  
     The declaration PR should be merged by the first core member
     who is available to verify that
     the requirements for the timeout have been met, based on their
     own personal records.

----

:CFEP Approval: When ready, the proposer may call for a vote on an
    existing conda-forge enhancement proposal (CFEP). This requires a
    super-majority (60%) to pass so that the decision to accept the
    CFEP is unequivocable and we have ensured that consensus has been
    reached.

    * Standard
    * 60% Majority to pass
    * Quorum rules: standard or time-out

----

:Nominate new member of staged-recipes: The proposer must provide
    a brief justification as to why the new member is desirable or needed.

    * Sensitive
    * 50% Majority to pass
    * Quorum rules: standard, accelerated, or time-out

----

:Nominate new member of core: The proposer must provide
    a sufficient justification as to why the nominee should be welcomed
    into core. Prior service to the community, including but not limited to:
    serving as a staged-recipes reviewer, working on critical conda-forge
    infrastructure, and helping to bridge disparate communities are an
    important part of the nomination process.

    * Sensitive
    * 66.7% Majority to pass
    * Quorum rules: standard or time-out

----

:Sub-team Formation: Proposers must specify the name, role & responsibility,
    members, and charter (dynamic or static) of any new sub-teams.

    * Standard
    * 50% Majority to pass
    * Quorum rules: standard or time-out

----

:Sub-team Dissolution: Proposers must specify the name and justification
    for why a sub-team should be dissolved.

    * Standard
    * 50% Majority to pass
    * Quorum rules: standard or time-out

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
    * Quorum rules: standard or time-out

----

:Remove member of staged-recipes: The proposer must provide
    a justification as to why the member of staged recipes
    should be removed.

    * Sensitive
    * 66.7% Majority to pass
    * Quorum rules: standard or time-out

----

:Remove member of core: The proposer must provide
    an overwhelming justification as to why the member core
    should be removed.

    * Sensitive
    * 75% Majority to pass
    * Quorum rules: standard or time-out

----

:Overall workflow and packaging policies: The proposer can choose to
    create a poll with an external tool or call
    for voting on the GH issue in question.
    The voting period must be open for at least one core
    member meeting cycle to allow for clarification questions
    and discussions. Friendly reminders to vote are encouraged.

    * Standard
    * 50% Majority to pass
    * Quorum rules: standard, accelerated, or time-out

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
    * Quorum rules: standard or time-out

----

:Modifying the governance document: The voting should happen in the PR
    in question and there must be a call to `@conda-forge/core`.
    The voting period must be open for at least one core
    member meeting cycle to allow for clarification questions
    and discussions.

    * Standard
    * 75% plus one of those voting to pass
    * Quorum rules: standard or time-out

----

All other voting items are considered to be standard, require a 50%
majority to pass, and use only the standard or time-out quorum rules.

Current Members of Core
-----------------------
In alphabetical order,

{{ core_members }}

Emetirus members
-----------------------
In alphabetical order,

{{ emeritus_members }}

Document History
----------------
This document was written by Anthony Scopatz.

This document is released under the CC-BY 4.0 license.

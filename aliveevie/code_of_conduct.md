# code of conduct and reporting guidelines
# Teams & Roles
Here are defined the primary teams participating in conda-forge activities.
- **core:** The core team is the governing body over the entire conda-forge organization. Members of the core team have full rights over all conda-forge repositories. Members of core are the face of the project, and are responsible for officially interfacing with external communities, organizations, non-profits, and companies. The core team may create new sub-teams, as appropriate. Each member of core is entitled to one vote on all elected matters.

- **staged-recipes:** The staged-recipes team administers the staged-recipes repository and is responsible for the review and creation of new feedstocks.

- **maintainers:** A maintainer is an individual responsible for the management of one or more feedstock repositories and packages. Maintainers have the ability to merge pull requests into the feedstock of only the packages they maintain.

- **external contributors:** This group encompasses all others who are not on core, part of staged-recipes, or maintainers. This includes first-time contributors, collaborators, and funders. They have no special rights within the conda-forge organization itself.

- **emeritus-core:** Core members that are inactive (commits, GitHub comments/issues/reviews, dev meetings and voting on polls) in the past six months will be asked if they want to become emeritus-core developers. Any core member can also request to become emeritus if they wish to do so (e.g. taking a sabbatical or long vacation). Emeritus core members can still vote and move back to active core anytime. Emeritus votes are used to count towards quorum but the quorum size is computed from the size of the active core group. The core.csv list should be updated when a change in the status of a member occurs.

## Sub-Teams
The core team may elect to create new sub-teams for managing the daily business of the organization. While sub-teams may have non-core members, every sub-team must have at least one core team member at all times. If a sub-team fails to have a core team member for more than 1 week, that team is considered to be dissolved. A new sub-team would need to be established by the core in order to reinstate the activity.

Sub-teams have a charter that is either dynamic or static.

- ***A dynamic charter*** means that the sub-team is self-organizing, with respect to its own internal policies, procedures, and membership. A sub-team may choose to modify its membership independent of the core team. For example, a Google Summer of Code team could be a good candidate for a dynamic charter. Alternatively, language-based maintenance teams also have a dynamic charter.

- ***A static charter*** means that all membership decisions and non-trivial policy changes must be approved by the core team. For example, a finance team may require a static charter.

# Voting

This section presents descriptions and criteria for voting items in the conda-forge community. The core team is the only team with voting rights. Members of core may also call a vote on any topic. The restrictions on calling a vote are as follows:

- There must only be one vote active on a particular item at any time.

- The act of calling for a vote cannot itself violate the code of conduct. For example, Sam repeatedly called for votes immediately after a previous vote failed to achieve Sam’s result. Sam is attempting to bully other members of core into agreeing, and is thus violating the code of conduct.

- Voting yes moves the proposal forward; voting no is the only way to express opposition to the proposal; not voting is discouraged, but non-votes do not count as “no”.

- There should always be an option to abstain from voting.

- Voting items are labeled as either standard or sensitive. Standard items are ones where public record and discourse is preferable. Sensitive voting items are ones where the results of the vote should remain private to the voters after the vote has occurred. Sensitive votes should take place on a secure anonymous voting platform in order to retain election integrity and anonymity. (We have used Polys and the Helios voting system, but are open to any secure, anonymous system.) The email capability of your chosen voting platform should be used for sending voting invitations and reminders, and you should use the email list from https://github.com/conda-forge/conda-forge.github.io/blob/main/src/core.csv and https://github.com/conda-forge/conda-forge.github.io/blob/main/src/emeritus.csv as the authoritative list of emails to use.

- The default voting period is 1 week (7 days). This may be modified at the time when a vote is called, but may never be less than 24 hrs.

- Additional requirements may apply in case low turnouts have to be handled, see “Quorum” below.

- To call for a standard vote, here is a template PR comment:

- `@conda-forge/core
This PR falls under the {policy} policy, please vote and/or comment on this PR.
This PR needs {policy_percent} of core to vote yea to pass.
To vote please leave Approve (yea) or Request Changes (nay) reviews.
If you would like changes to the current language please leave a comment or push to this branch.
This vote will end on {date}.`
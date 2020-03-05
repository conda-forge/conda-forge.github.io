# Adding a timeout for voting and requiring documentation of votes
## https://github.com/conda-forge/conda-forge.github.io/pull/970

Votes historically stall, and many initiatives have failed due to a lack
of participation.  This addition seeks to remove inaction as a determining
factor in the organization's decision making.  It defines a timeout period
after which the quorum fraction required for the vote drops to simply the
current votes at that time.  These are then evaluated at the original fraction
required for the vote.

This proposal adds stringent requirements around communication of the vote,
such that a timeout event should never occur because people were not aware
of the vote.

Finally, proposal also establishes rules for recording the outcome of votes,
both for the sake of providing review and challenging any possibly undesirable
timeout outcomes, and because it's also just a good idea to have a central
record of what we decided and when.

## Dates

Please include times to the nearest hour, in GMT time zone.

| Event      |  Dates |
| ---            |  ---:|
| Proposed on:   |  2020/02/04 17:27 |
| Original proposed close date:   |  2020/02/19 18:00 |
| Presented at core meeting on:   |  2020/02/19 17:00 |

There was no timeout for this vote, because this vote established the timeout
policy.  This vote was declared complete at 2020/03/04 18:41.

## Policy governing the vote

@conda-forge/core
This PR falls under the Modifying Governance policy, please vote and/or comment
on this PR.
This PR needs 75% of core to vote yea to pass.
To vote please leave Approve (yea) or Request Changes (nay) reviews.
If you would like changes to the current language please leave a comment or push
to this branch.
This vote will end on February 19, after the general meeting on that day.

## Final vote tallies (do not include names)

|Direction       |  Count |
| ---            |  ---:|
| For            |   15 |
| Against        |    1 |

0 explicitly abstained.  1 raised an issue.  3 did not participate.

# Given vote tallies and policy, summarize the outcome of this vote

This vote follows legacy rules.  Rather than evaluating it as 15/16 (fraction of
total votes), this is evaluated as the fraction of the total core members, 15/19
= 78.9%.  The needed vote fraction was 75%.  The timeout policy and vote
recording will become active after the PR adding this document is merged.

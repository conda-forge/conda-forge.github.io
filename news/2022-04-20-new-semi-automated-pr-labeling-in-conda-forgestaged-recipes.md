# New Semi-automated PR Labeling in conda-forge/staged-recipes

A GitHub action now monitors comments on issues in staged-recipes and
will add language and review labels to issues/PRs when a staged-recipes
sub-team is mentioned in a comment. It adds the Awaiting author
contribution label if a member of staged-recipes removes the
review-requested label. Unlike notifications, which are only sent to the
users which are members of a team at the time of the mention, labels are
persistent and visible to everyone, so they should be very helpful for
identifying old PRs that need attention.

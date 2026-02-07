---
tags: [how-to, advanced]
---

# How to talk to the bots

Some parts of the conda-forge automation are exposed as "bot commands" that can be invoked from issue titles and comments. You can check the full list in the [admin-web-services](/docs/maintainer/infrastructure#admin-web-services) documentation.

Bot commands typically start with `@conda-forge-admin, please`. Bot commands can have two types of scope:

- Repository scope: The command is typed as the title of a new issue in the target feedstock, or in an issue comment.
- Pull request scope: The command is typed as a pull request comment or review.

Some commands may have dual behavior. For example `@conda-forge-admin, please rerender` can be used as an issue title to create a new PR after rerendering from `main`, but it can also be used within a PR to rerender the head branch and push a new commit automatically.

The bots will usually react to the comment with a 🚀 emoji, and later post a comment informing about progress and outcome.

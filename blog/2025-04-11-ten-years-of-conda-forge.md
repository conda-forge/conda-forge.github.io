---
authors:
  - core
---

# Ten years of conda-forge!

Today, 2025-04-11, marks the 10th anniversary of the conda-forge community.

Join us in our Zulip instance and share how you got involved with conda-forge, how this community
has helped you, or just to show appreciation to the thousands of volunteers that make this effort
possible!

To many more years! 🎉

<!-- truncate -->

## One billion downloads per month

While there are too many important milestones to name across those 10 years, just [a few days
ago](https://github.com/conda-forge/by-the-numbers/commit/09eefe47d4cd1c4d9bc29c2ea5f9b07cc9100433),
we passed 1,000,000,000 monthly downloads across all packages for the first time ever. 🥳 

In total, we have served almost 27 billion downloads, and that's not even counting all those that
happen behind various institutional caching layers. This tells us that the fruits of this community
collaboration are having an enormous impact. If you'd like to share where conda-forge has saved you
hours of work, streamlined your processes, or made some ideas possible at all, please also jump in
on the zulip link above!

## Why today?

This date can be found as the creation date of the `conda-forge` Github organization:

```js
$ curl "https://api.github.com/orgs/conda-forge"
{
  "login": "conda-forge",
  "id": 11897326,
  "node_id": "MDEyOk9yZ2FuaXphdGlvbjExODk3MzI2",
  "url": "https://api.github.com/orgs/conda-forge",
  "repos_url": "https://api.github.com/orgs/conda-forge/repos",
  "events_url": "https://api.github.com/orgs/conda-forge/events",
  "hooks_url": "https://api.github.com/orgs/conda-forge/hooks",
  "issues_url": "https://api.github.com/orgs/conda-forge/issues",
  "members_url": "https://api.github.com/orgs/conda-forge/members{/member}",
  "public_members_url": "https://api.github.com/orgs/conda-forge/public_members{/member}",
  "avatar_url": "https://avatars.githubusercontent.com/u/11897326?v=4",
  "description": "A community led collection of recipes, build infrastructure and distributions for the conda package manager.",
  "name": "conda-forge",
  "company": null,
  "blog": "https://conda-forge.org",
  "location": null,
  "email": null,
  "twitter_username": "condaforge",
  "is_verified": false,
  "has_organization_projects": false,
  "has_repository_projects": true,
  "public_repos": 25378,
  "public_gists": 0,
  "followers": 1103,
  "following": 0,
  "html_url": "https://github.com/conda-forge",
  "created_at": "2015-04-11T07:37:06Z", // <----------------- See here!
  "updated_at": "2025-03-13T11:32:03Z",
  "archived_at": null,
  "type": "Organization"
}
```

And the anaconda.org production channel:

```js
$ curl -s "https://api.anaconda.org/user/conda-forge" | jq
{
  "company": "",
  "created_at": "2015-04-11 10:15:08.727000+00:00",
  "description": "A community-led collection of recipes, build infrastructure, and distributions for the conda package manager.",
  "location": "",
  "login": "conda-forge",
  "name": "conda-forge",
  "url": "",
  "user_type": "org"
}
```

If you want to learn more about the early history of conda-forge, check this [draft
PR](https://github.com/conda-forge/conda-forge.github.io/pull/2298), where we're in the process of
crystallizing the collective memories of many current and prior contributors into a cohesive
account of the most important events and milestones.

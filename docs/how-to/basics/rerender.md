---
tags: [how-to, basic]
---

# How to rerender a feedstock

Rerendering is the process of regenerating the templated contents of your feedstock, according to the contents of `conda-forge.yml` and the recipe itself.

<!-- PENDING: Read more about it in [Rerendering a feedstock](#TODO). -->

:::tip When to rerender

We need to re-render when there are changes in the following parts of the feedstock:

- Platform configuration (`skip` sections).
- `yum_requirements.txt` or `conda-forge.yml`.
- Updates in the build matrix due to new versions of Python, NumPy, PERL, R, etc.
- Updates in conda-forge pinning that affect the feedstock.
- Build issues that a feedstock configuration update will fix (follow us on [Zulip](https://conda-forge.zulipchat.com/) to know about those).

:::

There are two ways of rerendering a feedstock:

- Via bot commands on the feedstock issue tracker
- Using `conda-smithy` locally

## With bot commands

Simply open a new issue in the feedstock titled `@conda-forge-admin, please rerender`. The description can be left empty. A new PR will be opened after a few seconds, and will receive a new commit with the rerendered changes within minutes.

## With `conda-smithy`

Behind the bot command, our automation ran `conda-smithy rerender` on your feedstock and published the changes. You can also do this locally.

### 1. Prepare the forked feedstock

If you haven't already, fork the feedstock to your personal account. Then clone the fork to disk and [create a fresh branch out of your synced `main`](fork-sync.md):

```
cd name-feedstock
git checkout main
git pull upstream main
git checkout -b rerender
```

Depending on your `conda-forge.yml` configuration, from now on you will need to run different steps:

- Option A: With `conda_install_tool: pixi`, you only need to install Pixi and run `pixi run rerender`.
- Option B: With other `conda_install_tool` settings you need to install `conda-smithy` on your own.

### 2a. Rerender with `conda_install_tool: pixi`

1. Download and install `pixi` (check [their documentation](https://pixi.sh/latest/installation/)).
2. Go to the cloned repository and run `pixi run rerender`.

### 2b. Rerender with other `conda_install_tool` settings

Create a new environment with `conda-smithy`:

```bash
conda create -n conda-smithy -c conda-forge conda-smithy shellcheck
```

Activate it and run `conda-smithy` from the cloned repository directory:

```bash
conda activate conda-smithy
cd name-feedstock
conda-smithy rerender
```

### 3. Commit and push the results to a new pull request

Once the rerender is done, `conda-smithy` will have added the rerender changes to the staging area of your repository and prepared a commit message for you. Use it to commit the changes and push the branch to your fork:

```
git commit -m "<copied message>"
git push -u origin rerender
```

The git remote will suggest you to open a PR with the new changes. Follow that link and fill in the PR template.

### Troubleshooting

#### New conda-smithy version available

Please update your local conda-smithy version:

- `conda update -n conda-smithy conda-smithy`
- `pixi run --force-reinstall rerender`

If you are intentionally using an older version, then pass `--no-check-uptodate` to `conda-smithy:

```
conda-smithy rerender --no-check-uptodate
```

---
sidebar_position: 2
---

# Submission to staged-recipes

[`staged-recipes`](/docs/reference/infrastructure/staged-recipes.md) is the gateway to conda-forge.
Every package published has gone through this repository as part of the submission process.

Users normally follow these steps:

1. Fork the `conda-forge/staged-recipes` repository and create a new branch from `main`.
2. Add `meta.yaml` (and other files as needed) in a new subdirectory under `recipes/`.
3. Open a new pull request and pass the CI checks, which include building the recipe under different operating systems and some static analysis of the recipe files (linting).
4. Ask for a review and apply the suggestions.

When the PR is approved and merged to `main`, the new directory under `recipes/` will trigger the `staged-recipes` pipelines, which will create a new feedstock with the recipe contents.

```mermaid
sequenceDiagram
    actor c as contributor
    participant r as staged-recipes repo
    actor a as admin
    c->>r: submit PR
    activate r
    loop
        r->>c: report failing CI
        deactivate r
        c->>r: add commits
        activate r
    end
    r->>c: report successful CI
    deactivate r
    loop
        c->>r: mark as ready for review
        r->>a: request review
        a->>r: provide comments
        c->>r: address comments
        activate r
        loop
            r->>c: report failing CI
            deactivate r
            c->>r: add commits
            activate r
        end
        r->>c: report successful CI
        deactivate r
    end
    a->>r: accept PR
    a->>r: merge PR
```

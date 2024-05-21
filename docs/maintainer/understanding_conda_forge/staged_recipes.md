---
sidebar_position: 2
---

# Submission to staged-recipes

[`staged-recipes`](/docs/maintainer/infrastructure#staged-recipes) is the gateway to conda-forge.
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
    participant repo as staged-recipes repo
    rect rgb(178, 223, 219)
        Note right of c: 1: Prepare PR
        c->>repo: submit PR
        activate repo
        loop
            repo->>c: report failing CI
            deactivate repo
            c->>repo: add commits
            activate repo
        end
        repo->>c: report successful CI
        deactivate repo
    end
    rect rgb(178, 223, 219)
        Note right of c: 2: Solicit and address reviews
        loop
            c->>repo: mark as ready for review
            create actor reviewer
            repo->>reviewer: request review
            reviewer->>repo: provide comments
            c->>repo: address comments
            activate repo
            loop
                repo->>c: report failing CI
                deactivate repo
                c->>repo: add commits
                activate repo
            end
            repo->>c: report successful CI
            deactivate repo
        end
    end
    rect rgb(178, 223, 219)
        Note right of repo: Integrate new package into conda-forge
        reviewer->>repo: accept PR
        reviewer->>repo: merge PR
    end
```

```mermaid
sequenceDiagram
    participant sr as staged-recipes repo
    participant ar as admin-requests repo
    loop Several times per hour
        ar->>sr: check for new recipes
        loop for every new recipe
            create participant cs as conda-smithy
            ar->>cs: register github
            create participant fs as feedstock repo
            participant cf as conda-forge organization
            participant ci as ci providers
            cs->>fs: create feedstock repo
            cs->>cf: create maintainers team
            cs->>fs: add maintainers team
            ar->>cs: register ci
            cs->>ci: register builds
            destroy cs
            cs->>ar: finish
            ar->>sr: remove recipe from staged-recipes
        end
    end
```

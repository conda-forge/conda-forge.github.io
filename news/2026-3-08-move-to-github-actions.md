# Moving All Feedstocks to GitHub Actions

`conda-forge` is now able to enjoy extended concurrency limits for Github Actions. That means that we can finally use it as CI provider for package builds. However, we also use GHA for infrastructure and automation, and there is no way to split the general pool into smaller subpools with different priorities. All the repos in the organization are part of a flat FIFO queue.

<!-- truncate -->

In order to avoid self-DOS'ing our infra, we will implement a few rules:

- In order to guarantee fair use across all repositories, a given feedstock can only run up to 10 concurrent GHA jobs.
- We reserve the right to cancel build jobs if the org-wide limits are close to being hit. This is done to secure a buffer of runners for infrastructure and automation jobs.

As a reminder, the only Github Actions workflows that can be used are those provided by conda-smithy rerender, without any further modifications. Any other use is forbidden and may be removed without prior warning.

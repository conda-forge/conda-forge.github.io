# Updating our Ubuntu base for Miniforge Docker images (20.04 → 24.04)

The base image for our Ubuntu Dockerfiles has been upgraded from Ubuntu 20.04
(focal) to Ubuntu 24.04 (noble) in
[PR #145](https://github.com/conda-forge/miniforge-images/pull/145).
This change ensures continued support and access to newer packages and system
libraries.

Downstream users building on top of the Ubuntu variant of our containers should
verify compatibility with the updated environment.

Thanks to @rpanai for the contribution and to the reviewers for their input.

# Migration to Unique Feedstock Tokens per Provider

We will be slowly migrating `conda-forge` to use unique feedstock tokens per provider. The feedstock token is used to allow maintainers to copy packages from our staging area to the main `conda-forge` channel. This change will improve our security posture and help us limit the impact of any leaked tokens. During this migration we will also be using newly implemented feedstock token expiration times to avoid race conditions between token changes and running builds.

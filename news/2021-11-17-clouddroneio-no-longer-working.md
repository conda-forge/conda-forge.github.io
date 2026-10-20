# `cloud.drone.io` no longer working

The `cloud.drone.io` service we use for `aarch64` builds is no longer
accepting our API requests for triggering builds. We have been in
contact with them, but have been unable to resolve the issue. Going
forward, we will still be adding feedstocks to `cloud.drone.io` but we
have moved all `aarch64` builds to emulated builds on `Azure`.
Cross-compilers are available as well for resource-intensive builds.
Please rerender your feedstock as needed to get the updated
configuration.

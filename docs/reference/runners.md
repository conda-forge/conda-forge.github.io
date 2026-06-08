---
tags: [reference]
---

# Build runners

This list is a best effort to compile publicly available information about the runners available for CI builds in conda-forge.
It might not be up-to-date, so in case of doubt refer to the documentation of the provider.

## Regular runners

These runners are available to all feedstocks by default. Only supported images and labels are mentioned.

### Azure Pipelines

| VM image         |  Platform   | # CPU | RAM (GB) | Storage (GB) | Runtime (h) |
| :--------------- | :---------: | :---: | :------: | :----------: | :---------: |
| `ubuntu-latest`  | `linux-64`  |   2   |    7     |   10 to 14   |      6      |
|                  |
| `macOS-14`       |  `osx-64`   |   3   |    14    |   10 to 14   |      6      |
| `macOS-15`       |  `osx-64`   |   3   |    14    |   10 to 14   |      6      |
| `macos-15-arm64` | `osx-arm64` |   3   |    7     |   10 to 14   |      6      |
|                  |
| `windows-2022`   |  `win-64`   |   2   |    7     |   10 to 14   |      6      |
| `windows-2025`   |  `win-64`   |   2   |    7     |   10 to 14   |      6      |

Full reference: [Azure Pipelines runners](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/hosted?view=azure-devops&tabs=macos-images%2Cyaml#hardware).

### Github Actions

| Label              |    Platform     | CPUs | RAM (GB) | Storage (GB) | Runtime (h) |
| :----------------- | :-------------: | :--: | :------: | :----------: | :---------: |
| `ubuntu-latest`    |   `linux-64`    |  4   |    16    |      14      |      6      |
| `ubuntu-24.04-arm` | `linux-aarch64` |  4   |    16    |      14      |      6      |
|                    |
| `windows-2022`     |    `win-64`     |  4   |    16    |      14      |      6      |
| `windows-2025`     |    `win-64`     |  4   |    16    |      14      |      6      |
| `windows-11-arm`   |    `win-arm`    |  4   |    16    |      14      |      6      |

Full reference: [Github Actions runners](https://docs.github.com/en/actions/reference/runners/github-hosted-runners#standard-github-hosted-runners-for-public-repositories).

## Large CPU runners

These larger runners are not available by default. You need to apply per feedstock once the regular runners above are proven insufficient. Check [Self-hosted runners](/docs/how-to/advanced/self-hosted-runners.mdx) for details.

### Namespace.so

These runners are sponsored by [Namespace.so](https://namespace.so):

| Label                                      |    Platform     | CPUs | RAM (GB) | Storage (GB) |
| :----------------------------------------- | :-------------: | :--: | :------: | :----------: |
| `namespace-profile-8cpu-on-linux-64`       |   `linux-64`    |  8   |    32    |     160      |
| `namespace-profile-16cpu-on-linux-64`      |   `linux-64`    |  16  |    64    |     288      |
| `namespace-profile-8cpu-on-linux-aarch64`  | `linux-aarch64` |  8   |    32    |     160      |
| `namespace-profile-16cpu-on-linux-aarch64` | `linux-aarch64` |  16  |    64    |     288      |
|                                            |
| `namespace-profile-6cpu-on-osx-arm64`      |   `osx-arm64`   |  6   |    14    |     104      |
| `namespace-profile-12cpu-on-osx-arm64`     |   `osx-arm64`   |  12  |    28    |     160      |
|                                            |
| `namespace-profile-8cpu-on-win-64`         |    `win-64`     |  8   |    32    |     160      |
| `namespace-profile-16cpu-on-win-64`        |    `win-64`     |  16  |    64    |     288      |

### Blacksmith.sh

These runners are sponsored by [Blacksmith.sh](https://www.blacksmith.sh):

| Label                               |    Platform     | CPUs | RAM (GB) | Storage (GB) |
| :---------------------------------- | :-------------: | :--: | :------: | :----------: |
| `blacksmith-8vcpu-ubuntu-2404`      |   `linux-64`    |  8   |    32    |     160      |
| `blacksmith-16vcpu-ubuntu-2404`     |   `linux-64`    |  16  |    64    |     750      |
| `blacksmith-8vcpu-ubuntu-2404-arm`  | `linux-aarch64` |  8   |    24    |     160      |
| `blacksmith-16vcpu-ubuntu-2404-arm` | `linux-aarch64` |  16  |    48    |     750      |
|                                     |
| `blacksmith-6vcpu-macos-latest`     |   `osx-arm64`   |  6   |    24    |     150      |
| `blacksmith-12vcpu-macos-latest`    |   `osx-arm64`   |  12  |    48    |     250      |
|                                     |
| `blacksmith-8vcpu-windows-2025`     |    `win-64`     |  8   |    28    |     130      |
| `blacksmith-16vcpu-windows-2025`    |    `win-64`     |  16  |    56    |     130      |

### Depot.dev

These runners are sponsored by [Depot.dev](https://depot.dev):

| Label                       |    Platform     | CPUs | RAM (GB) | Storage (GB) |
| :-------------------------- | :-------------: | :--: | :------: | :----------: |
| `depot-ubuntu-24.04-8`      |   `linux-64`    |  8   |    32    |     150      |
| `depot-ubuntu-24.04-16`     |   `linux-64`    |  16  |    64    |     180      |
| `depot-ubuntu-24.04-32`     |   `linux-64`    |  32  |   128    |     200      |
| `depot-ubuntu-24.04-64`     |   `linux-64`    |  64  |   256    |     250      |
| `depot-ubuntu-24.04-arm-8`  | `linux-aarch64` |  8   |    32    |     150      |
| `depot-ubuntu-24.04-arm-16` | `linux-aarch64` |  16  |    64    |     180      |
| `depot-ubuntu-24.04-arm-32` | `linux-aarch64` |  32  |   128    |     200      |
| `depot-ubuntu-24.04-arm-64` | `linux-aarch64` |  64  |   256    |     250      |
|                             |
| `depot-macos-15`            |   `osx-arm64`   |  8   |    24    |     400      |
|                             |
| `depot-windows-2025-8`      |    `win-64`     |  8   |    32    |     150      |
| `depot-windows-2025-16`     |    `win-64`     |  16  |    64    |     180      |
| `depot-windows-2025-32`     |    `win-64`     |  32  |   128    |     200      |
| `depot-windows-2025-64`     |    `win-64`     |  64  |   256    |     250      |

---
authors:
  - core
tags: [pytorch]
---

# About Pytorch Channel Deprecation

[PyTorch team announced](https://github.com/pytorch/pytorch/issues/138506) that they will stop publishing packages to their official channel on Anaconda.org (`-c pytorch`) after the `2.5` release. We want to address this change and clarify our commitment to maintaining PyTorch packages on conda-forge. 

First and foremost, we deeply appreciate the PyTorch team’s significant contributions to the conda packaging ecosystem and their ongoing collaboration with conda-forge. The conda-forge team sees this transition as an opportunity to strengthen the conda ecosystem and create more stable and reliable environments for users.

<!-- truncate -->

Dependency conflicts have long been a pain point for users when mixing packages from the conda-forge and Anaconda "defaults." These conflicts arise because different channels build packages against different versions of core dependencies (packages on pytorch channel had dependancies in Anaconda `defaults` cannels). By consolidating PyTorch packages entirely under conda-forge, we can provide a more consistent and reliable experience, reducing conflicts and improving installation stability.


## Our Commitment

- Conda-forge is actively working with PyTorch maintainers and the broader open-source community to address potential gaps, ensure stability, and improve package availability.
- We will continue to maintain [pytorch-cpu](https://anaconda.org/conda-forge/pytorch-cpu) and [pytorch-gpu](https://anaconda.org/conda-forge/pytorch-gpu) packages, ensuring they are up to date and aligned with PyTorch releases.
- While Windows support is currently limited, we are making it a top priority to improve this and deliver a consistent experience across all platforms ([see #231](https://github.com/conda-forge/pytorch-cpu-feedstock/pull/231)).
- We aim to release updates as close as possible to official PyTorch releases. As a volunteer-driven community, we follow a best-effort approach while prioritizing quality and reliability.
- We welcome community [feedback and contributions](#getting-help-and-contributing), which are essential to improving the ecosystem. Your input directly informs our priorities and helps shape the future of PyTorch on conda-forge.


## Current Package Support

Fully Supported:
- Linux: Full support for both Pytorch CPU and Pytorch GPU (CUDA versions 11.8, 12.1, and 12.4).
- macOS: CPU-only support.

**Known Limitations:**
- Windows: Limited support currently, but improving Windows support is a top priority.


## Migration Guide

For Current PyTorch Channel Users

Update your conda configuration:
```bash
mamba/conda config --remove channels pytorch
mamba/conda config --add channels conda-forge
mamba/conda config --set channel_priority strict
```

Update your PyTorch installation
```bash
mamba install pytorch-cpu
mamba install pytorch-gpu # for GPU support
# OR
conda install pytorch-cpu
conda install pytorch-gpu # for GPU support
```

## Getting Help and Contributing
The success of this transition depends on collaboration with the community. Here’s how you can get involved:
- Report issues: Use the [pytorch-cpu-feedstock](https://github.com/conda-forge/pytorch-cpu-feedstock) repository to report bugs or request features.
- Join discussions: Share feedback and ideas on the conda-forge [Zulip chat](https://conda-forge.zulipchat.com/).
- Contribute: Help maintain [Pytorch package on conda-forge](https://github.com/conda-forge/pytorch-cpu-feedstock/issues/273) or support ongoing improvements.

## Frequently Asked Questions

**Will my existing PyTorch installations stop working?**
No, existing installations will continue to work. However, we recommend transitioning to conda-forge packages for future updates.

**How quickly will conda-forge release new PyTorch versions?**
We aim to release updates as close as possible to official PyTorch releases. But as a volunteer-driven community, we follow a best-effort approach while prioritizing quality and reliability..

**What about PyTorch's ecosystem packages (torchvision, torchaudio, etc.)?**
We maintain these packages as well, and they will continue to be available through conda-forge (see [torchvision](https://github.com/conda-forge/torchvision-feedstock) and [torchaudio](https://github.com/conda-forge/torchaudio-feedstock) feedstocks). 

**How can I ensure package compatibility?**
Using `conda-forge` as your primary channel with strict channel priority will ensure package compatibility.

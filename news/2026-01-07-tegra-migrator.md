# NVIDIA Tegra Migrator Ready for General Use

Tegra devices are system on chip (SOC) devices used in robotics and other mobile
applications. They are a Linux ARM (aarch64) platform variant which must be targeted
separately from Server Base System Architecture (SBSA) ARM when compiling for CUDA 12.x and
earlier. Non-NVIDIA feedstock maintainers may now build Tegra variants for their CUDA 12.9
packages if they choose by following [these
directions](/docs/how-to/advanced/cuda/tegra/).

This special Tegra variant is only relevant for packages still targeting CUDA 12.9
because starting with CUDA 13.0, supported Tegra devices are SBSA-compliant, so they
do not need to be targeted separately.

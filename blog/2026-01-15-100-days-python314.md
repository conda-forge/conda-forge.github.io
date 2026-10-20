---
authors:
  - xhochy
tags: [infrastructure]
---

# 100 Days of Python 3.14 on conda-forge

Today marks 100 days since the official release of Python 3.14, and we're thrilled to report that conda-forge has achieved its fastest Python version adoption ever. With **1,932 binary packages** available at the 100-day mark, Python 3.14 has surpassed all previous Python releases in early availability.

<!-- truncate -->

## The Numbers

Let's look at how Python 3.14 compares to previous releases at the 100-day milestone:

### Binary Packages Only

| Python Version  | Packages at Day 100 |
| --------------- | ------------------- |
| Python 3.10     | 1,588               |
| Python 3.11     | 1,835               |
| Python 3.12     | 1,576               |
| Python 3.13     | 1,435               |
| **Python 3.14** | **1,932**           |

Python 3.14 leads with **1,932 binary packages**, beating the previous record holder (Python 3.11) by nearly 100 packages.

![Python 3.14 binary package availability](/img/py314-100days/package_availability_combined_100days.png)

### Including noarch and ABI3 Packages

When we count packages that transitioned to `noarch: python` or ABI3 (stable ABI) builds since the Python 3.10 migration, the numbers are even more impressive:

| Python Version  | Packages at Day 100 (with noarch + ABI3) |
| --------------- | ---------------------------------------- |
| Python 3.10     | 1,669                                    |
| Python 3.11     | 2,098                                    |
| Python 3.12     | 1,945                                    |
| Python 3.13     | 1,947                                    |
| **Python 3.14** | **2,609**                                |

![Python 3.14 binary, ABI3 and noarch package availability](/img/py314-100days/package_availability_with_noarch_abi3_combined_100days.png)

## Why Python 3.14 Adoption Was So Fast

Several factors contributed to this record-breaking adoption:

### 1. Better Utilization of Release Candidates

The migration started much earlier than previous versions. Around 40 days before the final release, the migration really kicked into gear. By the time Python 3.14 was officially released, over 1,000 packages were already built and waiting.

### 2. Improved Tooling and Automation

The `regro-cf-autotick-bot` has become increasingly effective at opening "Rebuild for Python 3.14" PRs on feedstocks where all dependencies are ready. This automation significantly reduces the burden on maintainers.

### 3. Growing Use of noarch and ABI3

More packages have transitioned to `noarch: python` or ABI3 builds, which work across Python versions without rebuilding. This means that once Python 3.14 was released, these packages were immediately available without any additional work.

## Using Python 3.14

If you're looking to try Python 3.14 on conda-forge, you can create a new environment using:

```bash
conda create -n py314 python=3.14
conda activate py314
```

If a package is missing, you can lookup on the [Status page of the Python 3.14](https://conda-forge.org/status/migration/?name=python314) what is blocking it.

---

_Data for this analysis was generated using conda-forge repodata from January 15, 2026. The analysis tracks packages that have `python_abi` dependencies for specific Python versions, as well as packages that transitioned from version-specific builds to noarch or ABI3 builds._

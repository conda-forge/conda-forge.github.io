# Upcoming closure of NumPy 2.0 migration

NumPy 2.0 was a big change (the first major version in 15 years). For more than a year, we
have been migrating feedstocks from NumPy 1.x to NumPy 2.x, and while not every affected
feedstock has been done, we are planning to conclude the migration in one week.
Note that NumPy 2 support is required for feedstocks that intend to support Python 3.13
and above.

For feedstocks that are not compatible with v2.x yet, this means you will have to add

```yaml
numpy:
  - 1.26  # or 1.25
```

to your `recipe/conda_build_config.yaml`, and then rerender. Pins below 1.25 are not possible
if your feedstock supports Python 3.12, as NumPy 1.25 was the first version with support for
that Python version (and it will not be possible going forward to pin different NumPy versions
for different Python versions).

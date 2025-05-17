# Upcoming closure of NumPy 2.0 migration

NumPy 2.0 was a big change (the first major version in 15 years). For more than a year, we
have been migrating feedstocks from NumPy 1.x to NumPy 2.x, and while not every affected
feedstock has been done, we are planning to conclude the migration at the end of May.

For feedstocks that are not compatible with v2.x yet, this means you will have to add

```yaml
numpy:
  - 1.26  # or similar
```

to your `recipe/conda_build_config.yaml`, and then rerender.

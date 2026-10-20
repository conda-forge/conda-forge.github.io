# Artifact Validation

In an effort to better secure conda-forge, we are developing a process
to validate artifacts before they are uploaded to `anaconda.org`. This
validation will look for various security-related items, such as
artifacts that overwrite key pieces of certain packages. While this
process is in development, we will not be rejecting uploads. However, we
will start scanning our current artifacts and working with the
maintainers of those artifacts to mark broken any which we deem a
security risk. We will also be running validation on new artifacts being
upload and will report any issues back to feedstocks. At a future date,
artifacts that do not pass validation will not be uploaded.

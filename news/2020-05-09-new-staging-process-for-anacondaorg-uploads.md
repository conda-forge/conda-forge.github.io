# New Staging Process for `anaconda.org` Uploads

Starting this week, we are changing the way we upload packages to `anaconda.org`. We will move from
direct uploads to the conda-forge `main` channel to using a staging organization/channel combined
with a copy request from the staging channel to the production channel. This new process will allow
us to perform some validation on the outputs of feedstocks before they are released.

What will you see as a feedstock maintainer?

- Starting this week, the `admin-migrations` service will be making commits to all feedstocks to
  provision them with the necessary configuration, API keys, and tokens.
- Each feedstock will now be provisioned with a secret token. This token should not be shared or
  taken out of the CI services. It is used to identify the feedstock during the upload process.
- The `admin-migrations` service will be setting a new top-level key in the `conda-forge.yml`,
  `conda_forge_output_validation: true`. This key indicates to `conda-smithy` that it should
  include the output validation calls in the feedstock CI scripts.
- Currently open PRs will need to have this key added by hand and then rerendered.
- When PRs are running the CI scripts, they will do some initial validation of the feedstock
  outputs. If this validation fails, the CI job will fail. Please see the CI logs for the error
  message which is printed after `conda-build` runs.
- Once a PR is merged to master, the copy from the staging channel to the production channel will
  happen automatically.
- Should a copy request fail, you will get a notification via a comment on the commit to master.
- As part of this process, uploads from `appveyor` will no longer be allowed unless there is a
  significant barrier to using `azure`. We have recently upgraded the compiler infrastructure on
  `azure` to support this change in policy.

Despite our extensive testing, we do not expect this change to be completely smooth, so please bear
with us. As always, if you have any questions, concerns, or trouble, you can find us on Gitter or
bump us directly on Github!

# Default for Package Uploads on Branches Changing

In an effort to make feedstock maintenance easier, we are deprecating the current
default for how feedstock package uploads and branches interact. The current behavior
of uploading packages from any branch on the feedstock is now deprecated and will be
removed on or after 2026-11-15. Starting on or after 2026-11-15,
feedstocks will, by default, only upload packages from builds on the `main`
branch. This change has two effects. First, after this date,
feedstock maintainers will be able to make pull requests from branches on the
feedstock without causing inadvertent package uploads. Second, for version
or ABI branches on feedstocks, the `conda-forge.yml` file on the branch will need to
specify the configuration value `upload_on_branch` with the name of the branch
in order for uploads to take place. During the deprecation period, we will be
automatically adjusting the configuration of feedstocks. After the deprecation
period, uploads from non-`main` branches where the `upload_on_branch` value is
not specified will fail

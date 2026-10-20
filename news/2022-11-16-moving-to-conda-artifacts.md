# Moving to `.conda` Artifacts

conda-forge is moving to producing `conda` artifacts in the version 2
package format (also known as `.conda`). These artifacts allow for more
efficient indexing and maintenance of the ecosystem. Our admin
migrations bot will begin making PRs to feedstocks to change them over
to the new artifact format. You will need `conda` version 4.7 or later
to use the new `.conda` artifacts. Please leave a comment on [this
issue](https://github.com/conda-forge/conda-forge.github.io/issues/1586)
if you encounter problems or have feedback.

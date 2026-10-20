---
authors:
  - name: Mahe
    title: Outreachy intern
    url: https://github.com/ForgottenProgramme
    image_url: https://github.com/ForgottenProgramme.png
tags: [grayskull, outreachy]
---

# Contributing Packages To conda-forge Using Grayskull

When contributing packages to conda-forge, Grayskull can make your life
much easier. Grayskull generates recipes for Python packages hosted on
PyPI.

<!--truncate-->

As the
[introduction](https://github.com/conda-incubator/grayskull#introduction)
for Grayskull reads; "The main goal of this project is to generate
concise recipes for conda-forge." In this tutorial we learn how to
contribute a Python package to the conda-forge channel using Grayskull
to generate the recipe.

Let us get started.

1.  Install `grayskull` using `conda` through the `conda-forge` channel:

    ```
    $ conda install -c conda-forge grayskull
    ```

2.  Fork and clone the conda-forge [staged-recipes
    repository](https://github.com/conda-forge/staged-recipes) from
    GitHub.

3.  Checkout a new branch from the `master branch`.

4.  Through CLI, cd inside the 'staged-recipes/recipes' directory.

5.  Call `grayskull` and pass the `pypi` repository, followed by the
    name of the package you want to contribute to conda-forge. For
    example: `grayskull pypi abc`

    Or you could use `grayskull pypi abc --strict-conda-forge` to remove
    some selectors which are not necessary for conda-forge and adapt
    recipes to fit better in the conda-forge ecosystem.

    Grayskull will create a folder with the same name as the package (in
    this case: 'abc') in the 'recipes' folder of the 'staged-recipes'
    directory. This folder will contain the `meta.yaml` file and also
    the license file if the package includes a license in the PyPI
    distribution.

6.  Go through the generated `meta.yaml` file. For simpler packages, the
    generated recipes are nearly perfect, but for some packages you
    might need to make certain tweaks.

7.  Commit and push the changes. `git add recipe/abc/meta.yaml`
    `git commit -m "add a commit message"` `git push`

8.  Create a PR.

9.  Once the CI is passing, post a comment saying:
    `This is ready for review` `@conda-forge-admin, please ping team`

Once the PR gets merged, your package will be available on the
conda-forge channel. Tada! It's that easy.

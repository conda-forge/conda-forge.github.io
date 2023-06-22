The docs are built on GitHub Actions and run the ``.ci_scripts/update_docs`` script.

To build the docs locally, follow the steps mentioned below:
 1.  Clone the repository into your local machine.
 2.  Go into the main folder and run the following commands.  
 3. ``conda env create -f ./.ci_scripts/environment.yml``
 4. ``conda activate conda-forge-docs``
 5. ``cd newsfeed && pip install --no-deps .``
 6. ``cd ../src``
 7. ``make html``

Documentation update PRs should only change the files in ``src``. 

Once the PR is merged to ``main``, you can find the auto-generated html files in ``docs`` directory.


To build the docs here locally: 
* Make sure you have Sphinx, the Cloud Sphinx Theme, and the sphinxcontrib-fulltoc Sphinx extension installed (``conda install sphinx cloud_sptheme sphinxcontrib-fulltoc``).
* Then run ``make html`` (Unix) or ``./make.bat html`` (Windows).
* This will create the output files in ``_build/html``.


* The docs are built on GitHub Actions and run the ``.ci_scripts/update_docs`` script.
  To build the docs locally, follow the steps mentioned below:
   1.  Clone the repository into your local machine.
   2.  Go into the main folder.Run the following commands.  
   3. ``conda env create -f ./.ci_scripts/environment.yml``
   4. ``conda activate conda-forge-docs``
   5. ``cd newsfeed && pip install --no-deps .``
   6. ``cd ../src``
   7. ``make html``

* Once merged to ``master``, you can find the auto-generated html file in ``docs`` directory.


To build the docs here locally: 

* Make sure you have Sphinx, the Cloud Sphinx Theme, and the sphinxcontrib-fulltoc Sphinx extension installed (``conda install sphinx cloud_sptheme sphinxcontrib-fulltoc``).
* Then run ``make html`` (Unix) or ``./make.bat html`` (Windows).
* This will create the output files in ``_build/html``.

Documentation update PRs should only change this source; once merged to ``master``, [.ci_scripts/update_docs](http://.ci_scripts/update_docs) will then automatically build it into the ``docs`` directory.

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

Once the PR is merged to ``master``, you can find the auto-generated html files in ``docs`` directory.

## conda-forge CODE OF CONDUCT ([https://conda-forge.org/docs/orga/governance.html#code-of-conduct])

Conda-forge adheres to the NumFOCUS Code of Conduct.([https://www.numfocus.org/code-of-conduct])

                              THE SHORT VERSION
  >> Be kind to others. Do not insult or put down others. Behave professionally. Remember that harassment and sexist, racist, or exclusionary jokes are not appropriate for NumFOCUS.

  >> All communication should be appropriate for a professional audience including people of many different backgrounds. Sexual language and imagery is not appropriate.

  >> NumFOCUS is dedicated to providing a harassment-free community for everyone, regardless of gender, sexual orientation, gender identity and expression, disability, physical appearance, body size, race, or religion. We do not tolerate harassment of community members in any form.

  Thank you for helping make this a welcoming, friendly community for all.

  The Code of Conduct Reporting Form can be accessed here ([https://numfocus.typeform.com/to/ynjGdT])

  Code of Conduct Table of Contents

  >> Diversity Statement([https://numfocus.org/code-of-conduct#diversity-statement])
  >> Code of Conduct Introduction & Scope([https://numfocus.org/code-of-conduct#introduction])
  >> Standards for Behavior([https://numfocus.org/code-of-conduct#standards-behavior])
  >> Unacceptable Behavior([https://numfocus.org/code-of-conduct#unacceptable-behavior])
  >> Reporting Guidelines([https://numfocus.org/code-of-conduct#reporting-guidelines])
  >> How to Submit a Report([https://numfocus.org/code-of-conduct#how-to-report])
  >> Reporting Form([https://numfocus.org/code-of-conduct#report-form])
  >> Person(s) Responsible for Resolving Complaints([https://numfocus.org/code-of-conduct#persons-responsible])
  >> Conflicts of Interest([https://numfocus.org/code-of-conduct#conflicts-of-interest])
  >> Reporting at NumFOCUS Events([https://numfocus.org/code-of-conduct#reporting-at-events])
  >> What to Include in a Report([https://numfocus.org/code-of-conduct#what-to-include])
  >> Enforcement: What Happens After a Report is Filed?([https://numfocus.org/code-of-conduct#enforcement])
  >> Appealing a Decision([https://numfocus.org/code-of-conduct#appeal])
  >> Timeline Summary([https://numfocus.org/code-of-conduct#timeline])
  >> License([https://numfocus.org/code-of-conduct#license])

## Getting Started

The docs are built on GitHub Actions and run the `.ci_scripts/update_docs` script.

### Prerequisites

#### Install

You will need to have [Anaconda](https://problemsolvingwithpython.com/01-Orientation/01.03-Installing-Anaconda-on-Windows/) installed on your machine to use conda as a package manager

<br >

##### To build the docs locally, follow the steps mentioned below:

1.  Clone the repository into your local machine.
2.  Go into the main folder and run the following commands.

```
conda env create -f ./.ci_scripts/environment.yml
```

```
conda activate conda-forge-docs
```

```
conda install sphinx cloud_sptheme sphinxcontrib-fulltoc
```

```
cd newsfeed
```

```
pip install --no-deps
```

```
cd ../src
```

<br>

##### To create the output files in `_build/html`.

Linux run

```
make html
```

Windows run

```
./make.bat html
```

<br>

##### To preview on broswer

Google chrome run

```
google-chrome _build/html/index.html
```

Firefox run

```
firefox _build/html/index.html
```

<br>

## Contributor Conda-forge Code of Conduct

### Scope

This code of conduct applies to all spaces managed by Conda-forge, including all public and private mailing lists, issue trackers, wikis, forums, and any other communication channel used by our community. The code of conduct equally applies at Conda-forge events and governs standards of behavior for attendees, speakers, volunteers, booth staff, and event sponsors.

### Our Dedication

Conda-forge is dedicated to providing a harassment-free community for everyone, regardless of gender, sexual orientation, gender identity and expression, disability, physical appearance, body size, race, or religion. We do not tolerate harassment of community members in any form.

### Our Standards

Examples of behavior that contributes to creating a positive environment
include:

- Be kind to others.
- Do not insult or put down others.
- Behave professionally.
- Remember that harassment and sexist, racist, or exclusionary jokes are not appropriate for conda-forge.
- All communication should be appropriate for a professional audience including people of many different backgrounds.

Examples of unacceptable behavior by participants include:

- The use of sexualized language or imagery.
- Violent or intimidating threats or language directed against another person.
- Trolling or insulting and derogatory comments.
- Public or private harassment.
- Sharing private content, such as emails sent privately or non-publicly, or direct message history, without the sender’s consent.
- Posting sexually explicit or violent material.
- Other unethical or unprofessional conduct.
- Advocating for, or encouraging, any of the above behaviors.

### Reporting Misconduct

- You can reach the project maintainers [here](https://conda-forge.org/docs/orga/getting-in-touch.html).

### Enforcement: What Happens After a Report is Filed

- Reviewing the report.
- Contacting the person reported.

### Response and Potential Consequences

- Nothing (if we determine that no violation occurred).
- Private feedback or reprimand from Conda-forge to the individual(s) involved.
- Removing a person from Conda-forge membership or other formal affiliation.
- Publishing an account of the harassment and calling for the resignation of the alleged harasser from their responsibilities (usually pursued by people without formal authority: may be called for if the person is the event leader, or refuses to stand aside from the conflict of interest, or similar).
- Any other response that Conda-forge deems necessary and appropriate to the situation.

_This code-of-conduct is common to the following projects:_

- _[staged-recipes](https://github.com/conda-forge/staged-recipes)_
- _[miniforge](https://github.com/conda-forge/miniforge)_
- _[conda-forge.github.io](https://github.com/conda-forge/conda-forge.github.io)_
- _[feedstocks](https://github.com/conda-forge/feedstocks)_
- _[conda-smithy](https://github.com/conda-forge/conda-smithy)_
- _[admin-requests](https://github.com/conda-forge/admin-requests)_
- _[conda-forge-repodata-patches-feedstock](https://github.com/conda-forge/conda-forge-repodata-patches-feedstock)_
- _[conda-forge-pinning-feedstock](https://github.com/conda-forge/conda-forge-pinning-feedstock)_
- _[docker-images](https://github.com/conda-forge/docker-images)_
- _[conda-forge-ci-setup-feedstock](https://github.com/conda-forge/conda-forge-ci-setup-feedstock)_
- _[marketing](https://github.com/conda-forge/marketing)_

### Attribution

This Code of Conduct is adapted from the [Contributor Conda-forge](https://conda-forge.org/docs/orga/governance.html)

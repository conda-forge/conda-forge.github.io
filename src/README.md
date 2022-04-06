The docs are built on GitHub Actions and run the ``.ci_scripts/update_docs`` script.

To build the docs locally, follow the steps mentioned below:
 1.  Clone the repository into your local machine.
 2.  Go into the main folder and run the following commands.  
 3. ``conda env create -f ./.ci_scripts/environment.yml``
 4. ``conda activate conda-forge-docs``
 5. ``cd newsfeed && pip install --no-deps .``
 6. ``cd ../src``
 7. ``make html``


Conda-forge adheres to the NumFOCUS Code of Conduct. (https://numfocus.org/code-of-conduct)

## Scope

This code of conduct applies to all spaces managed by conda-forge, including all public and private mailing lists, issue trackers, wikis, forums, and any other communication channel used by our community. The code of conduct equally applies at conda-forge events and governs standards of behavior for attendees, speakers, volunteers, booth staff, and event sponsors.

## Code of Conduct 

- Be kind to others. 
- Do not insult or put down others. Behave professionally. 
- Remember that harassment and sexist, racist, or exclusionary jokes are not appropriate for conda-forge.
- All communication should be appropriate for a professional audience including people of many different backgrounds. Sexual language and imagery is not appropriate.
- Conda-forge is dedicated to providing a harassment-free community for everyone, regardless of gender, sexual orientation, gender identity and expression, disability, physical appearance, body size, race, or religion. We do not tolerate harassment of community members in any form.
- Be empathetic, welcoming, friendly, and patient. We remember that every conda-forge project and program is crafted by human beings who deserve to be treated with kindness and empathy. We work together to resolve conflict and assume good intentions. We may all experience some frustration from time to time, but we do not allow frustration to turn into a personal attack. A community where people feel uncomfortable or threatened is not a productive one.
- Be collaborative. Our work depends on the participation of many people, and in turn others depend on our work. Open source communities depend on effective and friendly collaboration to achieve their goals.
- Be inquisitive. Nobody knows everything! Asking questions early avoids many problems later, so we encourage questions, although we may direct them to the appropriate forum. We will try hard to be responsive and helpful.
- Be careful in the words that we choose. We are careful and respectful in our communication and we take responsibility for our own speech. Be kind to others. Do not insult or put down other members of the community.

Thank you for helping make this a welcoming, friendly community for all.

## Examples of Unacceptable Behaviours 

We at conda-forge are committed to making participation in this community a harassment-free experience.

We will not accept harassment or other exclusionary behaviors, such as:
- The use of sexualized language or imagery
- Excessive profanity (please avoid curse words; people differ greatly in their sensitivity to swearing)
- Posting sexually explicit or violent material
- Violent or intimidating threats or language directed against another person
- Inappropriate physical contact and/or unwelcome sexual attention or sexual comments
- Sexist, racist, or otherwise discriminatory jokes and language
- Trolling or insulting and derogatory comments
- Written or verbal comments which have the effect of excluding people on the basis of membership in a specific group, including level of experience, gender, gender identity and expression, sexual orientation, disability, neurotype, personal appearance, body size, race, ethnicity, age, religion, or nationality
- Public or private harassment
- Sharing private content, such as emails sent privately or non-publicly, or direct message history, without the sender’s consent
- Continuing to initiate interaction (such as photography, recording, messaging, or conversation) with someone after being asked to stop
- Sustained disruption of talks, events, or communications, such as heckling of a speaker
- Publishing (or threatening to post) other people’s personally identifying information (“doxing”), such as physical or electronic addresses, without explicit permission
- Other unethical or unprofessional conduct
- Advocating for, or encouraging, any of the above behaviors

## Reporting Guidelines

If you believe someone is violating the code of conduct, please report this in a timely manner. Code of conduct violations reduce the value of the community for everyone. The team at conda-forge takes reports of misconduct very seriously and is committed to preserving and maintaining the welcoming nature of our community.

All reports will be kept confidential.

If you feel your safety is in jeopardy or the situation is an emergency, we urge you to contact local law enforcement before making a report to conda-forge. (In the U.S., dial 911.)

## Conflicts of Interest

In the event of any conflict of interest, the team member will immediately notify the Board and recuse themselves if necessary.

If you are concerned about making a report that will be read by any of the above individuals, please reach out to one of the members of the conda-forge Board.

## What to Include in a Report

Our ability to address any code of conduct breaches in a timely and effective manner is impacted by the amount of information you can provide, so, our reporting form asks you to include as much of the following information as you can:

- Your contact info (so we can get in touch with you if we need to follow up). This will be kept confidential. If you wish to remain anonymous, your information will not be shared beyond the person receiving the initial report.
- The approximate time and location of the incident (please be as specific as possible)
- Identifying information (e.g. name, nickname, screen name, physical description) of the individual whose behavior is being reported
- Description of the behavior (if reporting harassing language, please be specific about the words used), your account of what happened, and any available supporting records (e.g. email, GitHub issue, screenshots, etc.)
- Description of the circumstances/context surrounding the incident
- Let us know if the incident is ongoing, and/or if this is part of an ongoing pattern of behavior
- Names and contact info, if possible, of anyone else who witnessed or was involved in this incident.(Did anyone else observe the incident?)
- Any other relevant information you believe we should have
 
## Reviewing the Report

conda-forge will review the incident as quickly as possible and determine:

- Whether this is an ongoing situation, or if there is a threat to anyone’s physical safety
- What happened
- Whether this event constitutes a code of conduct violation
- Who the bad actor was, if any
- If the incident took place at an event or meetup or within the community channels of a conda-forge project, the conda-forge Code of Conduct Enforcement Team will reach out to the relevant organizers/community managers/project leaders as necessary to follow up on the incident.

## Response and Potential Consequences

Once conda-forge has completed our investigation of the report, we will make a decision as to how to respond. The person making a report will not normally be consulted as to the proposed resolution of the issue, except insofar as we need to understand how to help them feel safe.

Potential consequences for violating the conda-forge code of conduct include:

- Nothing (if we determine that no violation occurred)
- Private feedback or reprimand from conda-forge to the individual(s) involved
- Warning the person to cease their behavior and that any further reports will result in sanctions
- A public announcement that an incident occurred
- Mediation (only if both reporter and reportee agree)
- An imposed vacation (e.g. asking someone to “take a week off” from a mailing list)
- A permanent or temporary ban from some or all conda-forge spaces (mailing lists, GitHub repos, in-person events, etc.)

Potential consequences for violating the conda-forge Code of Conduct at an in-person event include:

- Warning the person to cease their behavior and that any further reports will result in sanctions
- Requiring that the person avoid any interaction with, and physical proximity to, the person they are harassing for the remainder of the event
- Ending a talk that violates the policy early
- Not publishing the video or slides of a talk that violated the policy
- Not allowing a speaker who violated the policy to give (further) talks at the event now or in the future
- Immediately ending any event volunteer responsibilities and privileges the reported person holds
- Requiring that the person not volunteer for future events conda-forge runs (either indefinitely or for a certain time period)
- Expelling the person from the event without a refund

We will contact the person who is the subject of the report to let them know what actions will be taken as a result of the report, if any.

Our policy is to make sure that everyone aware of the initial incident is also made aware that official action has been taken, while still respecting the privacy of individuals. conda-forge may choose to make a public report of the incident, while maintaining the anonymity of those involved.

Documentation update PRs should only change the files in ``src``. 

Once the PR is merged to ``master``, you can find the auto-generated html files in ``docs`` directory.




## The docs are built on GitHub Actions and run the ``.ci_scripts/update_docs`` script.

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


# Code of conduct

The [NumFOCUS Code of Conduct](https://numfocus.org/code-of-conduct) is followed by us.

1.Be considerate of others. Don't make others feel bad by insulting or dismissing them. Behave in a professional manner.
2.Remember that conda-forge does not tolerate harassing or sexist, racist, or exclusionary humour.
3.Every piece of communication should be tailored to a professional audience that includes people from a variety of backgrounds. Sexual imagery and language are not suitable.
4.Regardless of gender, sexual orientation, gender identity and expression, handicap, physical appearance, body size, race, or religion, conda-forge is committed to creating a harassment-free community. Harassment of community members in any manner is not tolerated.
5.We endeavour to be empathic, welcoming, kind, and patient, as well as collaborative, inquiring, and cautious with our words.

Thank you for your assistance in making this possible.

The following is a condensed version of the Code of Conduct. Check out the [NumFOCUS Code of Conduct](https://numfocus.org/code-of-conduct) if you want to learn more.

# Reporting Procedures
f
If you suspect someone is breaking the code of conduct, please notify us as soon as possible. Violations of the community's code of conduct lower the community's value for everyone. Conda-team forge's takes accusations of misconduct extremely seriously and is dedicated to protecting and maintaining our community's welcome atmosphere.

All information will be kept private. Please read the [Reporting Guidelines](https://numfocus.org/code-of-conduct#reporting-guidelines) carefully.


# What Happens After a Report is Filed in Terms of Enforcement?
## Recognizing and Responding to Urgent Needs

We will make every effort to ensure your safety and assist you with any immediate requirements, especially if you are attending an in-person event. We'll do everything we can to acknowledge receipt within 24 hours (and we'll aim for much faster). Take a look at the [What Happens After a Report is Filed?](https://numfocus.org/code-of-conduct#enforcement) process.
 
## Examining the Document
We'll look into the matter as soon as possible and figure out:

1. Whether this is a continuous scenario or if anyone's physical safety is in jeopardy.
2. What took place?
3. Whether or not this incident is a breach of the code of conduct
4. If there was a horrible actor, who was it?

If the incident occurred at an event or meetup, or in the community channels, the Team will contact the appropriate organizers/community managers/project leaders to follow up on the occurrence as needed.

## Getting in Touch with the Person Reported
Someone will attempt to contact the individual who is the subject of the report after we have had time to review and discuss the report. We'll then inquire about that person's version of events.

 
## Potential Consequences and Reaction
We will decide how to respond after we have concluded our investigation of the report. Except inasmuch as we need to understand how to assist them feel safe, the person making the report will not generally be consulted about the proposed resolution of the issue.

## Violations of our code of conduct may result in the following consequences:

1. There is nothing (if we determine that no violation occurred).
2. NumFOCUS may provide private criticism or reprimand to the individual(s) involved.
3. The person has been warned to stop acting out and that any additional reports would result in punishment.
4. An official statement stating that an occurrence has occurred.
5. Mediation is a method of resolving (only if both reporter and reportee agree).
6. An imposed vacation (for example, asking someone to "opt out" of a mailing list for a week).
7. A prohibition from some or all NumFOCUS spaces, either permanently or temporarily (mailing lists, GitHub repos, in-person events, etc.).
8. Assistance with a report to other bodies, such as institutional offices or competent law enforcement organisations, for the complainant.
9. Taking someone out of our membership or other formal affiliation.
10. Publicizing a narrative of the harassment and appealing for the accused harasser's resignation from their position (usually pursued by people without formal authority: may be called for if the person is the event leader, or refuses to stand aside from the conflict of interest, or similar).
11. Any other action we believe necessary and appropriate under the circumstances.

If a participant violates this code of conduct at a NumFOCUS event, the conference organisers and staff may take any action they feel appropriate.

## Violations of the Code of Conduct at an in-person event may result in the following consequences:

1. The person has been warned to stop acting out and that any additional reports would result in punishment.
2. For the remainder of the event, the individual must avoid all contact with and physical closeness to the person they are bothering.
3. Early termination of a talk that is in violation of the policy
4. The video or slides of a talk that was in violation of the policy were not published.
5. Not allowing a speaker who has broken the policy to speak at the event again (now or in the future).
6. Any event volunteer responsibilities and privileges held by the reported person must be immediately terminated.
7. Requiring the individual to refrain from volunteering for future occasions (either indefinitely or for a certain time period).
8. Excluding the participant from the event and without providing a refund.
9. Requiring the person to leave the event immediately and not return.
10. Excluding the individual from future events (either indefinitely or for a certain time period).
11. Any other action we believe necessary and appropriate under the circumstances.

No one will be allowed to occupy any position representing us, including volunteer roles, if their ideas or values are in violation of our code of conduct. We reserve the right to remove, amend, or reject comments, commits, code, wiki revisions, issues, and any contributions that do not follow this code of behaviour.

We'll get in touch with the individual who is the subject of the report to let them know what, if any, measures will be done as a result of it.

Our policy is to make sure that everyone who was aware of the initial occurrence is likewise informed that official action has been taken, while maintaining individual privacy. We may decide to make a public report of the occurrence while keeping the identities of people involved confidential.

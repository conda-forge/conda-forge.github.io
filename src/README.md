The docs are built on GitHub Actions and run the `.ci_scripts/update_docs` script.

To build the docs locally, follow the steps mentioned below:

1.  Clone the repository into your local machine.
2.  Go into the main folder and run the following commands.

```
conda env create -f ./.ci_scripts/environment.yml
```

```
conda activate conda-forge-docs
```

```
cd newsfeed && pip install --no-deps .
```

```
cd ../src
```

```
make html
```

Documentation update PRs should only change the files in ``src``. 

Once the PR is merged to ``master``, you can find the auto-generated html files in ``docs`` directory.


### Code of conduct

We adheres to the [NumFOCUS Code of Conduct](https://numfocus.org/code-of-conduct).

1. Be kind to others. Do not insult or put down others. Behave professionally. 
2. Remember that harassment and sexist, racist, or exclusionary jokes are not appropriate for conda-forge.
3. All communication should be appropriate for a professional audience including people of many different backgrounds. Sexual language and imagery is not appropriate.
4. conda-forge is dedicated to providing a harassment-free community for everyone, regardless of gender, sexual orientation, gender identity and expression, disability, physical appearance, body size, race, or religion. We do not tolerate harassment of community members in any form.
5. We strive to Be empathetic, welcoming, friendly, and patient, Be collaborative, Be inquisitive, Be careful in the words that we choose.

Thank you for helping make this a welcoming, friendly community for all.

This is the short version of Code of Conduct. If you want to read more about it check out on [NumFOCUS Code of Conduct](https://numfocus.org/code-of-conduct).


### Reporting Guidelines

If you believe someone is violating the code of conduct, please report this in a timely manner. Code of conduct violations reduce the value of the community for everyone. The team at conda-forge takes reports of misconduct very seriously and is committed to preserving and maintaining the welcoming nature of our community.

All reports will be kept confidential. Please go through it thoroughly [Reporting Guidelines](https://numfocus.org/code-of-conduct#reporting-guidelines).






### Enforcement: What Happens After a Report is Filed?
## Acknowledgment and Responding to Immediate Needs

We will attempt to ensure your safety and help with any immediate needs, particularly at an in-person event. We will make every effort to acknowledge receipt within 24 hours (and we’ll aim for much more quickly than that). Have a look at the process of [What Happens After a Report is Filed?](https://numfocus.org/code-of-conduct#enforcement).

 
## Reviewing the Report
We will review the incident as quickly as possible and determine:

1. Whether this is an ongoing situation, or if there is a threat to anyone’s physical safety
2. What happened
3. Whether this event constitutes a code of conduct violation
4. Who the bad actor was, if any
If the incident took place at an event or meetup or within the community channels], the Team will reach out to the relevant organizers/community managers/project leaders as necessary to follow up on the incident.

## Contacting the Person Reported
After we has had time to review and discuss the report, someone will attempt to contact the person who is the subject of the report to inform them of what has been reported about them. We will then ask that person for their account of what happened.

 
## Response and Potential Consequences
Once we have completed our investigation of the report, we will make a decision as to how to respond. The person making a report will not normally be consulted as to the proposed resolution of the issue, except insofar as we need to understand how to help them feel safe.

## Potential consequences for violating the our code of conduct include:

1. Nothing (if we determine that no violation occurred).
2. Private feedback or reprimand from NumFOCUS to the individual(s) involved.
3. Warning the person to cease their behavior and that any further reports will result in sanctions.
4. A public announcement that an incident occurred.
5. Mediation (only if both reporter and reportee agree).
6. An imposed vacation (e.g. asking someone to “take a week off” from a mailing list).
7. A permanent or temporary ban from some or all NumFOCUS spaces (mailing lists, GitHub repos, in-person events, etc.).
8. Assistance to the complainant with a report to other bodies, for example, institutional offices or appropriate law enforcement agencies.
9. Removing a person from our membership or other formal affiliation.
10. Publishing an account of the harassment and calling for the resignation of the alleged harasser from their responsibilities (usually pursued by people without formal authority: may be called for if the person is the event leader, or refuses to stand aside from the conflict of interest, or similar).
11. Any other response that we deem necessary and appropriate to the situation.
At NumFOCUS events, if a participant engages in behavior that violates this code of conduct, the conference organizers and staff may take any action they deem appropriate..

## Potential consequences for violating the Code of Conduct at an in-person event include:

1. Warning the person to cease their behavior and that any further reports will result in sanctions
2. Requiring that the person avoid any interaction with, and physical proximity to, the person they are harassing for the remainder of the event
3. Ending a talk that violates the policy early
4. Not publishing the video or slides of a talk that violated the policy
5. Not allowing a speaker who violated the policy to give (further) talks at the event now or in the future
6. Immediately ending any event volunteer responsibilities and privileges the reported person holds
7. Requiring that the person not volunteer for future events  (either indefinitely or for a certain time period)
8. Expelling the person from the event without a refund
9. Requiring that the person immediately leave the event and not return
10. Banning the person from future events (either indefinitely or for a certain time period)
11. Any other response that we deem necessary and appropriate to the situation
No one espousing views or values contrary to the standards of our code of conduct will be permitted to hold any position representing us, including volunteer positions. We have the right and responsibility to remove, edit, or reject comments, commits, code, wiki edits, issues, and other contributions that are not aligned with this code of conduct.

We will contact the person who is the subject of the report to let them know what actions will be taken as a result of the report, if any.

_This code-of-conduct is common to the any projects of conda-forge found here(https://github.com/conda-forge)_

Our policy is to make sure that everyone aware of the initial incident is also made aware that official action has been taken, while still respecting the privacy of individuals. We may choose to make a public report of the incident, while maintaining the anonymity of those involved.






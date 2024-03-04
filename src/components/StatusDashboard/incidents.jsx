import Link from "@docusaurus/Link";
import moment from "moment";
import { Octokit } from "octokit";
import { React, useEffect, useState } from "react";
import Markdown from "react-markdown";
import styles from "./styles.module.css";

// Date format string.
const DATE = "YYYY/M/D HH:mm:ss";

// The GitHub repository with relevant issues.
const REPO = { owner: "conda-forge", repo: "status" };

// This label indicates danger.
const MAJOR = "major outage";

// This label indicates warning.
const DEGRADED = "degraded performance";

// Incident labels we care about.
const BAD_LABELS = new Set(["investigating", DEGRADED, MAJOR, "maintenance"]);

// Time period  we care about: 90 days – in milliseconds.
const PERIOD = 90 * 24 * 60 * 60 * 1000;

export default function Incidents({ onLoad }) {
  const [{ closed, current, open }, setState] = useState(
    { closed: [], current: new Set(), open: [] }
  );
  useEffect(() => {
    const octokit = new Octokit({});
    const era = Date.now() - PERIOD;
    const open = [];
    const closed = [];
    let current = new Set();
    void (async () => {
      try {
        const issues = await octokit.rest.issues.listForRepo({
          ...REPO, per_page: 100, state: "all"
        });
        for (const issue of issues.data) {
          const labels = new Set(issue.labels.map(({ name }) => name));
          const incident = intersection(labels, BAD_LABELS);
          if (!incident.size) continue; // Bail if the issue is not an incident.
          const severity = incident.keys().next().value;
          if (issue.state === "open") {
            open.push({ ...issue, severity });
            current = new Set([...current, ...incident]);
          } else if (era < new Date(issue.closed_at).getTime()) {
            closed.push({ ...issue, severity });
          }
        }
        setState({ closed, current, open });
      } catch (error) {
        console.warn(`error loading github issues`, error);
      }
      onLoad?.(!!current.size);
    })();
  }, []);
  const outage = !!current.size;
  const severity = outage && current.has(MAJOR) ? "danger" : "warning";
  const label = severity ? severity === "danger" ? MAJOR : DEGRADED : "";
  return (
    <>
      <div id="incidents" className={styles.toc_anchor}></div>
      <div className={`card margin-top--xs`}>
        <div className="card__header">
          <h3>
            Incidents
            {" "}
            {current.size && (
              <span className={`badge badge--${severity}`}>{label}</span>
            )}
          </h3>
        </div>
        <div className={`card__body ${styles.incidents}`}>
          {open.map((issue, i) => <Incident key={i}>{issue}</Incident>)}
          {closed.map((issue, i) => <Incident key={i}>{issue}</Incident>)}
        </div>
      </div>
    </>
  );
}

function Incident({ children }) {
  const issue = children;
  const open = issue.state === "open";
  const date = moment(open ? issue.updated_at : issue.closed_at);
  const status = open ? "Ongoing" : "Resolved";
  const severity = open ?
    issue.severity === MAJOR ? "danger" : "warning" : "success";
  return (
    <div className={styles.incident}>
      <div>
        <span className={`badge badge--${severity}`}>{status}</span>
        <em className={styles.incident_date}>{date.format(DATE)}</em>
      </div>
      <Link className={styles.incident_link} to={issue.html_url}>
        {issue.title} (#{issue.number})
      </Link>
      <div className={styles.incident_body}>
        <Markdown>{issue.body}</Markdown>
      </div>
    </div>
  );
}

const intersection = (one, two) => {
  const intersection = new Set();
  const [bigger, smaller] = one.size >= two.size ? [one, two] : [two, one];
  for (const item of smaller) if (bigger.has(item)) intersection.add(item);
  return intersection;
}

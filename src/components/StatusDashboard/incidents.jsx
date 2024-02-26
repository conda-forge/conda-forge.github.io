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

// Incident labels we care about.
const BAD_LABELS = new Set([
  "investigating",
  "degraded performance",
  "major outage",
  "maintenance"
]);

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
      onLoad();
    })();
  }, []);
  return (
    <>
      <div id="incidents" className={styles.toc_anchor}></div>
      <div className={`card margin-top--xs`}>
        <div className="card__header">
          <h3>
            Incidents
            {" "}
            {current.size > 0 && Array.from(current).map((label, index) => (
              <span className="badge badge--danger"
                style={{ marginRight: 5 }}
                key={index}>{label}</span>
            ))}
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
  const date = moment(issue.open ? issue.updated_at : issue.closed_at);
  const status = issue.open ? "Ongoing" : "Resolved";
  return (
    <div className={styles.incident}>
      <div>
        <span
          className={styles.incident_status}
          style={{
            backgroundColor: status === 'Ongoing' ?
              "var(--ifm-color-warning)" :
              "var(--ifm-color-success)"
          }}>{status}</span>
        <em>{date.format(DATE)}</em>
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

import { urls } from "@site/src/constants";
import { React, useEffect, useState } from "react";
import styles from "./styles.module.css";

const OPERATIONAL = "All Systems Operational";

export default function CloudServices({ onLoad, style }) {
  useEffect(() => {
    void onLoad();
  }, []);
  return (
    <>
      <div id="cloud" className={styles.toc_anchor}></div>
      <div id="cloud_services" className="card margin-top--xs" style={style}>
        <div className="card__header">
          <h3>Cloud Services</h3>
        </div>
        <div className="card__body">
          <table style={{ fontSize: "small" }}>
            <tbody>
              {Object.keys(urls.cloud).map((service, index) =>
                <Status key={index} {...urls.cloud[service]} />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function Status({ api, link, title }) {
  const [state, setState] = useState({ status: "..." });
  const status = ({
    OPERATIONAL,
    "Everything is looking good": OPERATIONAL,
    "operational": OPERATIONAL
  })[state.status] || state.status;
  const className = styles.status_pill + " " +
    styles[status === OPERATIONAL ? "operational" : "degraded"]
  useEffect(() => {
    void (async () => {
      try {
        const parsed = (await (await fetch(api)).json()).status;
        const status = typeof parsed === "object" ? parsed.description : parsed;
        setState({ status });
      } catch (error) {
        console.warn(`error fetching data for ${title} – ${api}`, error);
      }
    })();
  }, []);
  return (
    <tr>
      <td>
        <a href={link} style={{ display: "inline-block", minWidth: "100%" }}>
          {title}
        </a>
      </td>
      <td><span className={className}>{status}</span></td>
    </tr>
  );
}

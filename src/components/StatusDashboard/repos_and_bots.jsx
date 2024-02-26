import { urls } from "@site/src/constants";
import { React, useEffect, useState } from "react";
import styles from "./styles.module.css";

// If CDN status is updated in this window (20 minutes), status is operational.
const OPERATIONAL_WINDOW = 20 * 60 * 1000;

// If CDN status is updated in this window (40 minutes), status is degraded.
const DEGRADED_WINDOW = 40 * 60 * 1000;

export default function ReposAndBots({ onLoad, style }) {
  useEffect(() => void onLoad(), []);
  return (
    <>
      <div id="repos" className={styles.toc_anchor}></div>
      <div className="card margin-top--xs" style={style}>
        <div className="card__header">
          <h3>Repos and Bots</h3>
        </div>
        <div className="card__body">
          <table style={{ fontSize: "small" }}>
            <tbody>
              <CDNStatus />
              <WebServices />
              {urls.repos.badges.map(({ name, ...badge }, index) =>
                <Badge key={index} {...badge}>{name}</Badge>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function Badge({ children, link, badge, badgeLink }) {
  return (
    <tr>
      <td>
        <a href={link} style={{ display: "inline-block", minWidth: "100%" }}>
          {children}
        </a>
      </td>
      <td style={{ textAlign: "right" }}>
        <Image alt={`${children} status`} link={badgeLink}>{badge}</Image>
      </td>
    </tr>
  );
}

function Image({ alt, link, children }) {
  const [error, setState] = useState(false);
  const onError = () => setState(true);
  if (error) return (<>No status available</>);
  const image = (
    <img alt={alt} className={styles.badge} onError={onError} src={children} />
  );
  return link ? <a href={link}>{image}</a> : image;
}

function CDNStatus() {
  const [{ minutes, status }, setState] = useState({ minutes: 0, status: "…" });
  useEffect(() => {
    void (async () => {
      try {
        const response = await (await fetch(urls.repos.cdn.api)).text();
        const updated = new Date(response.trim()).getTime();
        const delta = (new Date()).getTime() - updated;
        const status = delta < OPERATIONAL_WINDOW ? "operational" :
          delta < DEGRADED_WINDOW ? "degraded" : "major outage";
        setState({ minutes: Math.round(delta / 1000 / 60), status });
      } catch (error) {
        console.warn(`error loading cdn cloning status`, error);
      }
    })();
  }, []);
  return (
    <tr>
      <td>
        <a href={urls.repos.cdn.link}
          style={{ display: "inline-block", minWidth: "100%" }}>
          CDN cloning
        </a>
      </td>
      <td>
        <div style={{ display: "block" }} className={
          styles.status_pill +
          (status === "operational" ? " " + styles.operational : "") +
          (status === "degraded" ? " " + styles.degraded : "") +
          (status === "major outage" ? " " + styles.outage : "")
        }>{status}</div>
        <div style={{ fontStyle: "italic", textAlign: "right" }}>
          (last updated {minutes} min ago)
        </div>
      </td>
    </tr>
  );
}

function WebServices() {
  const [status, setState] = useState("");
  useEffect(() => {
    void (async () => {
      try {
        const { status } = await (await fetch(urls.repos.services.api)).json();
        setState(status);
      } catch (error) {
        console.warn(`error loading web services status`, error);
      }
    })();
  }, []);
  return (
    <tr>
      <td>
        <a href={urls.repos.services.link}
          style={{ display: "inline-block", minWidth: "100%" }}>
          admin web services
        </a>
      </td>
      <td>
        <div style={{ display: "block" }} className={
          styles.status_pill +
          (status === "operational" ? " " + styles.operational : "") +
          (status === "degraded" ? " " + styles.degraded : "") +
          (status === "major outage" ? " " + styles.outage : "")
        }>{status}</div>
      </td>
    </tr>
  );
}

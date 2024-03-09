import { useLocation } from "@docusaurus/router";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  TimeScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-moment";
import { React, useEffect, useState } from "react";
import AzurePipelineUsage from "./azure_pipelines_usage";
import CloudServices from "./cloud_services";
import CurrentMigrations from "./current_migrations";
import GitHubActionsUsage from "./github_actions_usage";
import Incidents from "./incidents";
import ReposAndBots from "./repos_and_bots";
import styles from "./styles.module.css";
import TOC from "./toc";
import TravisCIUsage from "./travis_ci_usage";
import VersionUpdates from "./version_updates";
import useIsBrowser from "@docusaurus/useIsBrowser";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  TimeScale,
  Title,
  Tooltip,
  Legend
);

export default function StatusDashboard() {
  const total = 8; // Total number of dashboard components.
  const [{ incidents, jumped, loaded }, setState] = useState({
    jumped: false, loaded: 0, ongoing: false
  });
  const { hash } = useLocation();
  const isBrowser = useIsBrowser();
  useEffect(() => {
    if (!isBrowser) return; // Set Chart.js colors at browser runtime.
    // Listen for `date-theme` changes in the `html` document element.
    const observer = new MutationObserver((mutations) => {
      let changed = false;
      for (const mutation of mutations) {
        changed = changed || mutation.attributeName === "data-theme"
      }
      if (changed) { // Set the chart color and trigger a render.
        setChartColor();
        setState(prev => ({ ...prev }));
      }
    });
    setChartColor();
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, [isBrowser]);
  useEffect(() => { // NB: This effect runs on every render.
    // When all components finish loading, scroll if necessary.
    if (jumped || loaded !== total) return;
    setState((prev) => ({ ...prev, jumped: true }));
    const id = hash.length > 1 ? hash.substring(1) : "";
    if (id) document.getElementById(id)?.scrollIntoView();
  });
  const onLoad = () =>
    setState((prev) => ({ ...prev, loaded: prev.loaded + 1 }));
  const onLoadIncidents = incidents =>
    setState((prev) => ({ ...prev, incidents, loaded: prev.loaded + 1 }));
  return (
    <main className="container">
      <div className="row row--no-gutters">
        <div className="col col--2"><TOC /></div>
        <div className="col col--10">
          {incidents &&
            <div className="row row--no-gutters">
              <div className="col col--12"><Incidents {...incidents} /></div>
            </div>}
          <div className="row row--no-gutters">
            <div className="col col--6" style={{ flex: 1 }}>
              <div id="repos" className={styles.toc_anchor}></div>
              <ReposAndBots onLoad={onLoad} style={{ height: "100%" }} />
            </div>
            <div className="col col--6" style={{ flex: 1 }}>
              <div id="cloud" className={styles.toc_anchor}></div>
              <CloudServices onLoad={onLoad} style={{ height: "100%" }} />
            </div>
          </div>
          <div className="row row--no-gutters">
            <div className="col col--12">
              <div id="migrations" className={styles.toc_anchor}></div>
              <CurrentMigrations onLoad={onLoad} />
            </div>
          </div>
          <div className="row row--no-gutters">
            <div className="col col--12">
              <div id="azure" className={styles.toc_anchor}></div>
              <AzurePipelineUsage onLoad={onLoad} />
            </div>
          </div>
          <div className="row row--no-gutters">
            <div className="col col--12">
              <div id="github" className={styles.toc_anchor}></div>
              <GitHubActionsUsage onLoad={onLoad} />
            </div>
          </div>
          <div className="row row--no-gutters">
            <div className="col col--12">
              <div id="travis" className={styles.toc_anchor}></div>
              <TravisCIUsage onLoad={onLoad} />
            </div>
          </div>
          <div className="row row--no-gutters">
            <div className="col col--6">
              <div id="incidents" className={styles.toc_anchor}></div>
              <Incidents onLoad={onLoadIncidents} />
            </div>
            <div className="col col--6">
              <div id="version" className={styles.toc_anchor}></div>
              <VersionUpdates onLoad={onLoad} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function setChartColor() {
  const div = document.createElement("div");
  div.style.backgroundColor = "var(--ifm-color-primary)";
  document.body.appendChild(div);
  ChartJS.defaults.backgroundColor = window.getComputedStyle(div)
    .getPropertyValue('background-color');
  document.body.removeChild(div);
}

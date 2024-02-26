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
  const [{ jumped, loaded }, setState] = useState({ loaded: 0, jumped: false });
  const { hash } = useLocation();
  useEffect(() => {
    // When all components finish loading, scroll if necessary.
    if (jumped || loaded !== total) return;
    setState((prev) => ({ ...prev, jumped: true }));
    const id = hash.length > 1 ? hash.substring(1) : "";
    if (id) document.getElementById(id)?.scrollIntoView();
  });
  const onLoad = () =>
    setState((prev) => ({ ...prev, loaded: prev.loaded + 1 }));
  return (
    <main className={["container", styles.status_dashboard].join(" ")}>
      <div className="row row--no-gutters">
        <div className="col col--2">
          <TOC />
        </div>
        <div className="col col--10">
          <div className="row row--no-gutters">
            <div className="col col--6" style={{ flex: 1 }}>
              <ReposAndBots onLoad={onLoad} style={{ height: "100%" }} />
            </div>
            <div className="col col--6" style={{ flex: 1 }}>
              <CloudServices onLoad={onLoad} style={{ height: "100%" }} />
            </div>
          </div>
          <div className="row row--no-gutters">
            <div className="col col--12">
              <CurrentMigrations onLoad={onLoad} />
            </div>
          </div>
          <div className="row row--no-gutters">
            <div className="col col--12">
              <AzurePipelineUsage onLoad={onLoad} />
            </div>
          </div>
          <div className="row row--no-gutters">
            <div className="col col--12">
              <GitHubActionsUsage onLoad={onLoad} />
            </div>
          </div>
          <div className="row row--no-gutters">
            <div className="col col--12">
              <TravisCIUsage onLoad={onLoad} />
            </div>
          </div>
          <div className="row row--no-gutters">
            <div className="col col--6">
              <Incidents onLoad={onLoad} />
            </div>
            <div className="col col--6">
              <VersionUpdates onLoad={onLoad} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

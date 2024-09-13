import { useLocation } from "@docusaurus/router";
import { useColorMode } from '@docusaurus/theme-common';
import { urls } from "@site/src/constants";
import { React, useEffect, useState } from "react";
import CloudServices from "./cloud_services";
import CurrentMigrations from "./current_migrations";
import Incidents from "./incidents";
import ReposAndBots from "./repos_and_bots";
import styles from "./styles.module.css";
import TOC from "./toc";
import UsageChart from "./usage_chart";
import VersionUpdates from "./version_updates";

export default function StatusDashboard() {
  const total = 8; // Total number of dashboard components.
  const [{ incidents, jumped, loaded }, setState] = useState({
    jumped: false, loaded: 0, ongoing: false
  });
  const { hash } = useLocation();
  const [chartColors, setChartColors] = useState({
    dark: "white",
    light: "black"
  });
  const { colorMode } = useColorMode();
  useEffect(() => computeChartColors(setChartColors), []);
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
    <main className="container" style={{ paddingBottom: "1em" }}>
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
              <div id="version" className={styles.toc_anchor}></div>
              <VersionUpdates onLoad={onLoad} />
            </div>
          </div>
          <div className="row row--no-gutters">
            <div className="col col--12">
              <div id="azure" className={styles.toc_anchor}></div>
              <UsageChart
                backgroundColor={chartColors[colorMode]}
                onLoad={onLoad}
                url={urls.azure.pipelines}
                title="Azure Pipelines Usage" />
            </div>
          </div>
          <div className="row row--no-gutters">
            <div className="col col--12">
              <div id="github" className={styles.toc_anchor}></div>
              <UsageChart
                backgroundColor={chartColors[colorMode]}
                onLoad={onLoad}
                url={urls.github.actions}
                title="GitHub Actions Usage" />
            </div>
          </div>
          <div className="row row--no-gutters">
            <div className="col col--12">
              <div id="travis" className={styles.toc_anchor}></div>
              <UsageChart
                backgroundColor={chartColors[colorMode]}
                onLoad={onLoad}
                url={urls.travis.usage}
                title="Travis CI Usage" />
            </div>
          </div>
          <div className="row row--no-gutters">
            <div className="col col--12">
              <div id="incidents" className={styles.toc_anchor}></div>
              <Incidents onLoad={onLoadIncidents} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

/**
 * Compute the color defined by the theme CSS variables at runtime.
 */
function computeChartColors(setChartColors) {
  if (typeof window === "undefined") return;
  const dark = document.createElement("div");
  const light = document.createElement("div");
  dark.style.backgroundColor = "var(--ifm-color-primary-dark-mode)"
  light.style.backgroundColor = "var(--ifm-color-primary-light-mode)";
  document.body.appendChild(dark);
  document.body.appendChild(light);
  setChartColors({
    dark: window.getComputedStyle(dark).getPropertyValue('background-color'),
    light: window.getComputedStyle(light).getPropertyValue('background-color')
  });
  document.body.removeChild(dark);
  document.body.removeChild(light);
}

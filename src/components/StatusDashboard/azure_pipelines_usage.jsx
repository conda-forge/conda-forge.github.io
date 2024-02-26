import { charts, urls } from "@site/src/constants";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import styles from "./styles.module.css";

export default function AzurePipelinesUsage({ onLoad }) {
  const [state, setState] = useState({ rates: {}, repos: {}, total: 0 });
  useEffect(() => {
    void (async () => {
      try {
        const fetched = await (await fetch(urls.azure.pipelines)).json();
        setState((prev) => ({ ...prev, ...fetched }));
      } catch (error) {
        console.warn("error loading azure pipelines", error);
      }
      onLoad();
    })();
  }, []);
  const datasets = [{ data: [] }];
  const labels = [];
  Object.keys(state.rates).forEach((rate) => {
    datasets[0].data.push(state.rates[rate]);
    labels.push(moment(rate).local());
  });
  return (
    <>
      <div id="azure" className={styles.toc_anchor}></div>
      <div id="azure_pipelines_usage" className="card margin-top--xs">
        <div className="card__header">
          <h3>
            Azure Pipelines Usage{" "}
            <span className="badge badge--secondary">{state.total}</span>
          </h3>
        </div>
        <div className={`card__body ${styles.status_dashboard_graph}`}>
          <Bar data={{ labels, datasets }} options={charts.usage.options} />
        </div>
      </div>
    </>
  );
}

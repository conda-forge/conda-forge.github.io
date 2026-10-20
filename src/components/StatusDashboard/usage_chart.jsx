import { charts } from "@site/src/constants";
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
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import styles from "./styles.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  TimeScale,
  Title,
  Tooltip,
  Legend
);

export default function UsageChart({ backgroundColor, onLoad, title, url }) {
  const [state, setState] = useState({ rates: {}, repos: {}, total: 0 });
  useEffect(() => {
    void (async () => {
      try {
        const fetched = await (await fetch(url)).json();
        setState((prev) => ({ ...prev, ...fetched }));
      } catch (error) {
        console.warn("error loading usage chart", error);
      }
      onLoad?.();
    })();
  }, []);
  const datasets = [{ backgroundColor, data: [] }];
  const labels = [];
  Object.keys(state.rates).forEach((rate) => {
    datasets[0].data.push(state.rates[rate]);
    labels.push(moment(rate).local());
  });
  return (
    <div className="card margin-top--xs">
      <div className="card__header">
        <h3>
          {`${title} `}
          <span className="badge badge--secondary">{state.total}</span>
        </h3>
      </div>
      <div className={`card__body ${styles.status_dashboard_graph}`}>
        <Bar data={{ labels, datasets }} options={charts.usage.options} />
      </div>
    </div>
  );
}

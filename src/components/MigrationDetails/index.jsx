import { Redirect, useLocation } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { urls } from "@site/src/constants";
import Layout from "@theme/Layout";
import { React, useEffect, useState } from "react";
import SVG from 'react-inlinesvg';
import styles from "./styles.module.css";

// { Done, In PR, Awaiting PR, Awaiting parents, Not solvable, Bot error }
const ORDERED = [
  ["done", "Done"],
  ["in-pr", "In PR"],
  ["awaiting-pr", "Awaiting PR"],
  ["awaiting-parents", "Awaiting parents"],
  ["not-solvable", "Not solvable"],
  ["bot-error", "Bot error"],
];

const TITLES = ORDERED.reduce((titles, [key, title]) =>
  ({ ...titles, [key]: title }), {});

const VIEW_KEY = "migration-toggle";

export function measureProgress(details) {
  const done = details["done"].length + details["in-pr"].length;
  const total =
    done +
    details["awaiting-parents"].length +
    details["awaiting-pr"].length +
    details["bot-error"].length +
    details["not-solvable"].length;
  const percentage = (done / (total || 1)) * 100;
  return { done, percentage, total };
}

export default function MigrationDetails() {
  const location = useLocation();
  const { siteConfig } = useDocusaurusContext();
  const [state, setState] = useState({
    name: location.pathname.replace("/status/migration", "").split("/").pop(),
    details: null,
    redirect: false,
    view: "table",
  });
  const toggle = (view) => {
    if (window && window.localStorage) {
      try {
        window.localStorage.setItem(VIEW_KEY, view);
      } catch (error) {
        console.warn(`error writing to local storage`, error);
      }
    }
    setState((prev) => ({ ...prev, view }));
  };
  useEffect(() => {
    if (!state.name) return setState((prev) => ({ ...prev, redirect: true }));
    let view = "";
    if (window && window.localStorage) {
      try {
        view = window.localStorage.getItem(VIEW_KEY);
      } catch (error) {
        console.warn(`error reading from local storage`, error);
      }
    }
    void (async () => {
      try {
        const url = urls.migrations.details.replace("<NAME>", state.name);
        const details = await (await fetch(url)).json();
        details.progress = measureProgress(details);
        setState((prev) => ({ ...prev, details, view: view || prev.view }));
      } catch (error) {
        console.warn(`error loading migration: ${state.name}`, error);
        setState((prev) => ({ ...prev, redirect: true }));
      }
    })();
  }, []);
  if (state.redirect) return <Redirect to="/status" replace />;
  const { details, name, view } = state;
  return (
    <Layout
      title={siteConfig.title}
      description="Status dashboard for conda-forge"
    >
      <main className={`container ${styles.migration_details}`}>
        <div className={`card margin-top--xs`}>
          <div className="card__header">
            <div className={styles.migration_details_toggle}>
              <button onClick={() => toggle("table")}>Table View</button>{" "}
              <button onClick={() => toggle("graph")}>Graph View</button>
            </div>
            <Breadcrumbs>{name}</Breadcrumbs>
            <div style={{ clear: "both" }}></div>
          </div>
          <div className="card__body" style={{ overflow: "auto" }}>
            {details && <Bar details={details} />}
            {view === "graph" ?
              <Graph>{name}</Graph> :
              (details && <Table details={details} />)}
          </div>
        </div>
      </main>
    </Layout>
  );
}

function Bar({ details }) {
  const prefix = "migration_details_filter_";
  return (
    <>
      <h4>Completion rate {details.progress.percentage.toFixed(0)}%</h4>
      <div className={styles.migration_details_bar}>
        {ORDERED.filter(([key]) => details[key]?.length)
          .map(([key], index) => (
            <div
              title={TITLES[key]}
              className={styles[`${prefix}${key.replace("-", "_")}`]}
              style={{ flex: details[key].length }} key={index}></div>
          ))}
      </div>
    </>
  );
}

function Breadcrumbs({ children }) {
  return (
    <nav aria-label="breadcrumbs">
      <ul className="breadcrumbs">
        <li className="breadcrumbs__item">
          <a className="breadcrumbs__link" href="/">conda-forge</a>
        </li>
        <li className="breadcrumbs__item">
          <a className="breadcrumbs__link" href="/status">Status</a>
        </li>
        <li className="breadcrumbs__item">
          <a className="breadcrumbs__link" href="/status#migrations">
            Migrations
          </a>
        </li>
        <li className="breadcrumbs__item breadcrumbs__item--active">
          <a className="breadcrumbs__link" href="">{children}</a>
        </li>
      </ul>
    </nav>
  );
}

function Filters({ counts, filters, onFilter }) {
  const icon = styles.migration_details_filter_icon;
  return (
    <div className={styles.migration_details_filter}>
      {ORDERED.map(([key, title], index) => {
        const prefix = "migration_details_filter_";
        const base = `${prefix}${key.replace("-", "_")}`;
        return (
        <div
          className={[
            styles.migration_details_filter_button,
            styles[base],
            filters[key] && styles[`${base}_on`]
          ].join(" ")}
          key={index}
          onClick={() => onFilter(key)}>
          {filters[key] ?
            <i className={`${icon} fa-solid fa-filter-circle-xmark`}></i> :
            <i className={`${icon} fa-solid fa-filter`}></i>
          } {title} ({counts[key]})
        </div>);
      })}
    </div>
  );
}

function Graph(props) {
  const [error, setState] = useState("");
  const url = urls.migrations.graph.replace("<NAME>", props.children);
  const onError = (error) => setState(error);
  return (
    <div>
      {error ?
        `Graph is unavailable.` :
        <SVG onError={onError} src={url} />}
    </div>
  );
}

function Table({ details }) {
  const [filters, setState] = useState(ORDERED
      .reduce((filters, [status]) => ({ ...filters, [status]: true }), {}));
  const feedstock = details._feedstock_status;
  const rows = ORDERED.reduce((rows, [status]) => (
    filters[status] ? rows :
      rows.concat((details[status]).map(name => ([name, status])))
  ), []);
  return (
    <>
      <Filters
        counts={ORDERED.reduce((counts, [key]) =>
          ({ ...counts, [key]: 0 || details[key]?.length }), {})}
        filters={{ ...filters }}
        onFilter={key => setState(prev => ({ ...prev, [key]: !prev[key] }))} />
      {rows.length > 0 && <table>
        <thead>
          <tr>
            <th style={{ width: 200 }}>Name</th>
            <th style={{ width: 115 }}>Status</th>
            <th style={{ flex: 1 }}>Immediate Children</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([name, status], i) =>
            <Row key={i}>{{ feedstock: feedstock[name], name, status }}</Row>
          )}
        </tbody>
      </table>}
    </>
  );
}

function Row({ children }) {
  const [collapsed, setState] = useState(true);
  const { feedstock, name, status } = children;
  const immediate = feedstock["immediate_children"] || [];
  const href = feedstock["pr_url"];
  const details = feedstock["pre_pr_migrator_status"];
  return (<>
    <tr>
      <td>
      {href ? (
        <a className="badge badge--secondary" href={href}>{name}</a>
      ) : (
        details ? (
          <span className={
            `badge badge--secondary ${collapsed ?
                styles.collapsed :
                styles.expanded}`}
            onClick={() => setState(!collapsed)}>
            {name}
          </span>) : (
          <span className={`badge badge--secondary`}>{name}</span>)
      )}
      </td>
      <td>{TITLES[status]}</td>
      <td>
        {immediate.map((name, index) => (<>
          <span className="badge badge--secondary" key={index}>{name}</span>
          {immediate.length - 1 === index ? "" : " "}
        </>))}
      </td>
    </tr>
    {details && !collapsed && (<tr>
      <td colSpan={3}><pre dangerouslySetInnerHTML={{ __html: details}} /></td>
    </tr>)}
  </>);
}

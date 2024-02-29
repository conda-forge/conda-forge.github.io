import { Redirect } from "@docusaurus/router";
import { urls } from "@site/src/constants";
import React, { useEffect, useState } from "react";
import { measureProgress } from "../MigrationDetails";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";

const COLLAPSED_KEY = "migration-collapsed";
const SORT_KEY = "migration-sort";

export default function CurrentMigrations({ onLoad }) {
  const [state, setState] = useState({
    closed: [],
    collapsed: { closed: true, longterm: true, regular: true },
    longterm: [],
    regular: [],
    sort: { by: "name", order: "ascending" }
  });
  const resort = (by) => {
    setState(({ closed, longterm, regular, sort, ...prev }) => {
      let order = "ascending";
      order = by === sort.by && order === sort.order ? "descending" : order;
      if (window && window.localStorage) {
        try {
          window.localStorage.setItem(SORT_KEY, JSON.stringify({ by, order }));
        } catch (error) {
          console.warn(`error writing to local storage`, error);
        }
      }
      return {
        ...prev,
        closed: closed.sort(compare(by, order)),
        longterm: longterm.sort(compare(by, order)),
        regular: regular.sort(compare(by, order)),
        sort: { by, order },
      };
    });
  };
  const select = (status) =>
    setState(({ collapsed, ...prev }) => {
      const updated = { ...collapsed, [status]: !collapsed[status] };
      if (window && window.localStorage) {
        try {
          const serialized = JSON.stringify(updated);
          window.localStorage.setItem(COLLAPSED_KEY, serialized);
        } catch (error) {
          console.warn(`error writing to local storage`, error);
        }
      }
      return { ...prev, collapsed: updated };
    });
  useEffect(fetchContent(onLoad, setState), []);
  const { closed, longterm, regular } = state;
  const total = closed.length + longterm.length + regular.length;
  return (
    <>
      <div id="migrations" className={styles.toc_anchor}></div>
      <div className="card" style={{ overflow: 'auto' }}>
        <div className="card__header">
          <h3>
            Current Migrations{" "}
            <span className="badge badge--secondary">{total}</span>
          </h3>
        </div>
        <div className="card__body">
          <table className={styles.migrations_table}>
            <TableContent
              collapsed={state.collapsed.longterm}
              name="Long-running migrations"
              resort={resort}
              rows={longterm}
              select={() => select("longterm")}
              sort={state.sort}
            />
            <TableContent
              collapsed={state.collapsed.regular}
              name="Regular migrations"
              resort={resort}
              rows={regular}
              select={() => select("regular")}
              sort={state.sort}
            />
            <TableContent
              collapsed={state.collapsed.closed}
              name="Closed migrations"
              resort={resort}
              rows={closed}
              select={() => select("closed")}
              sort={state.sort}
            />
          </table>
        </div>
      </div>
    </>
  );
}

function TableContent({ collapsed, name, resort, rows, select, sort }) {
  const [redirect, setState] = useState('');
  if (redirect) return (<Redirect to={redirect} replace />);
  return (
    <>
      <thead>
        <tr onClick={select}>
          <th colSpan="7" className={collapsed ? styles.collapsed : undefined}>
            {name}{" "}
            <span className="badge badge--secondary">{rows.length || "…"}</span>
          </th>
        </tr>
        <tr className={collapsed ? styles.collapsed : undefined}>
          <th
            onClick={() => resort("name")}
            className={sort.by === "name" ? styles[sort.order] : undefined}
          >
            Name
          </th>
          <th
            onClick={() => resort("status")}
            className={sort.by === "status" ? styles[sort.order] : undefined}
          >
            Status
          </th>
          <th
            onClick={() => resort("awaiting-parents")}
            className={sort.by === "awaiting-parents" ? styles[sort.order] : undefined}
          >
            Awaiting parents
          </th>
          <th
            onClick={() => resort("awaiting-pr")}
            className={sort.by === "awaiting-pr" ? styles[sort.order] : undefined}
          >
            Awaiting PR
          </th>
          <th
            onClick={() => resort("in-pr")}
            className={sort.by === "in-pr" ? styles[sort.order] : undefined}
          >
            In PR
          </th>
          <th
            onClick={() => resort("not-solvable")}
            className={sort.by === "not-solvable" ? styles[sort.order] : undefined}
          >
            Not solvable
          </th>
          <th
            onClick={() => resort("bot-error")}
            className={sort.by === "bot-error" ? styles[sort.order] : undefined}
          >
            Bot error
          </th>
        </tr>
      </thead>
      <tbody className={collapsed ? styles.collapsed  : undefined}>
        {rows.map((row) => {
          const { progress } = row;
          const href = `/status/migration/${row.name}`;
          return (
            <tr key={row.name}>
              <td>
                <Link className="badge badge--secondary"
                  href={href}
                  style={{ minWidth: "100%" }}
                  onClick={event => {
                    // Use app router instead defaulting to browser request.
                    event.preventDefault();
                    setState(href);
                  }}>{row.name}</Link>
              </td>
              <td>
                <label className={styles.progress_bar}>
                  <progress value={progress.done} max={progress.total}>
                    {progress.percentage.toFixed(2)}%
                  </progress>
                  <span className={styles.ratio}>
                    {progress.done}/{progress.total}
                  </span>
                </label>
              </td>
              <td>{row.details["awaiting-parents"].length}</td>
              <td>{row.details["awaiting-pr"].length}</td>
              <td>{row.details["in-pr"].length}</td>
              <td>{row.details["not-solvable"].length}</td>
              <td>{row.details["bot-error"].length}</td>
            </tr>
          );
        })}
      </tbody>
    </>
  );
}

// Returns a comparator function for sorting table columns.
function compare(by, order) {
  switch (by) {
    case "name":
      return order === "ascending"
        ? (a, b) => a.name.localeCompare(b.name)
        : (a, b) => b.name.localeCompare(a.name);
    case "status":
      return order === "ascending"
        ? (a, b) => a.progress.percentage - b.progress.percentage
        : (a, b) => b.progress.percentage - a.progress.percentage;
    default:
      return order === "ascending"
        ? (a, b) => a.details[by].length - b.details[by].length
        : (a, b) => b.details[by].length - a.details[by].length;
  }
}

// Returns a function that fetches local and remote content then sets state.
function fetchContent(onLoad, setState) {
  return () => {
    const local = {};
    if (window && window.localStorage) {
      try {
        const collapsed = window.localStorage.getItem(COLLAPSED_KEY);
        const sort = window.localStorage.getItem(SORT_KEY);
        if (collapsed) local.collapsed = JSON.parse(collapsed);
        if (sort) local.sort = JSON.parse(sort);
      } catch (error) {
        console.warn(`error reading from local storage`, error);
      }
    }
    void (async (patch) => {
      const promises = [];
      const fetched = {};
      for (const status in urls.migrations.status) {
        let count = 0;
        try {
          const response = await fetch(urls.migrations.status[status]);
          fetched[status] = Object.entries(await response.json()).map(
            ([name, description]) => ({ name, description })
          );
          for (const { name } of fetched[status]) {
            promises.push(
              (async (index) => {
                try {
                  const url = urls.migrations.details.replace("<NAME>", name);
                  const response = await fetch(url);
                  const details = await response.json();
                  fetched[status][index].details = details;
                  fetched[status][index].progress = measureProgress(details);
                } catch (error) {
                  console.warn(`error loading migration: ${name}`, error);
                }
              })(count++)
            );
          }
        } catch (error) {
          console.warn(`error loading top-level ${status} migrations`, error);
        }
      }
      await Promise.all(promises);
      setState((prev) => {
        const { by, order } = patch.sort || prev.sort;
        return {
          ...prev,
          ...patch,
          closed: fetched.closed.sort(compare(by, order)),
          longterm: fetched.longterm.sort(compare(by, order)),
          regular: fetched.regular.sort(compare(by, order)),
        };
      });
      onLoad();
    })(local);
  };
}

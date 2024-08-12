import { Redirect } from "@docusaurus/router";
import { urls } from "@site/src/constants";
import React, { useEffect, useState } from "react";
import { measureProgress } from "@site/src/pages/status/migration";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";

const COLLAPSED_KEY = "migration-collapsed";
const SORT_KEY = "migration-sort";

export default function CurrentMigrations({ onLoad }) {
  const [state, setState] = useState({
    closed: [],
    collapsed: { closed: true, longterm: true, paused: true, regular: true},
    longterm: [],
    paused: [],
    regular: [],
    sort: {
      closed: { by: "name", order: "ascending" },
      longterm: { by: "name", order: "ascending" },
      paused: { by: "name", order: "ascending" },
      regular: { by: "name", order: "ascending" },
    }
  });
  console.log('state:', state)
  const resort = (group) => {
    return (by) => {
      setState((prev) => {
        const sort = prev.sort[group];
        let order = "ascending";
        order = by === sort.by && order === sort.order ? "descending" : order;
        if (window && window.localStorage) {
          try {
            const key = `${SORT_KEY}-${group}`;
            window.localStorage.setItem(key, JSON.stringify({ by, order }));
          } catch (error) {
            console.warn(`error writing to local storage`, error);
          }
        }
        return {
          ...prev,
          [group]: prev[group].sort(compare(by, order)),
          sort: {
            ...prev.sort,
            [group]: { by, order }
          },
        };
      });
    }
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
  const { closed, longterm, paused, regular } = state;
  const total = closed.length + longterm.length + paused.length + regular.length;
  return (
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
            resort={resort("longterm")}
            rows={longterm}
            select={() => select("longterm")}
            sort={state.sort.longterm}
          />
        </table>
        <table className={styles.migrations_table}>
          <TableContent
            collapsed={state.collapsed.regular}
            name="Regular migrations"
            resort={resort("regular")}
            rows={regular}
            select={() => select("regular")}
            sort={state.sort.regular}
          />
        </table>
        <table className={styles.migrations_table}>
          <TableContent
            collapsed={state.collapsed.closed}
            name="Recently closed migrations"
            resort={resort("closed")}
            rows={closed}
            select={() => select("closed")}
            sort={state.sort.closed}
          />
        </table>
        <table className={styles.migrations_table}>
          <TableContent
            collapsed={state.collapsed.paused}
            name="Paused migrations"
            resort={resort("paused")}
            rows={paused}
            select={() => select("paused")}
            sort={state.sort.paused}
          />
        </table>
      </div>
    </div>
  );
}

function TableContent({ collapsed, name, resort, rows, select, sort }) {
  const [redirect, setState] = useState('');
  if (redirect) return (<Redirect to={redirect} replace={false} push={true} />);
  return (
    <>
      <thead>
        <tr onClick={select}>
          <th colSpan={8} className={collapsed ? styles.collapsed : undefined}>
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
            PRs made
          </th>
          <th
            onClick={() => resort("done")}
            className={sort.by === "done" ? styles[sort.order] : undefined}
          >
            Done
          </th>
          <th
            onClick={() => resort("in-pr")}
            className={sort.by === "in-pr" ? styles[sort.order] : undefined}
          >
            In PR
          </th>
          <th
            onClick={() => resort("awaiting-pr")}
            className={sort.by === "awaiting-pr" ? styles[sort.order] : undefined}
          >
            Awaiting PR
          </th>
          <th
            onClick={() => resort("awaiting-parents")}
            className={sort.by === "awaiting-parents" ? styles[sort.order] : undefined}
          >
            Awaiting parents
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
          const href = `/status/migration/?name=${row.name}`;
          return (
            <tr key={row.name}>
              <td>
                <Link href={href}
                  style={{ display: "block" }}
                  onClick={event => {
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
              <td>{row.details["done"].length}</td>
              <td>{row.details["in-pr"].length}</td>
              <td>{row.details["awaiting-pr"].length}</td>
              <td>{row.details["awaiting-parents"].length}</td>
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
    const local = { };
    if (window && window.localStorage) {
      try {
        const collapsed = window.localStorage.getItem(COLLAPSED_KEY);
        const sort = {
          closed: window.localStorage.getItem(`${SORT_KEY}-closed`),
          longterm: window.localStorage.getItem(`${SORT_KEY}-longterm`),
          regular: window.localStorage.getItem(`${SORT_KEY}-regular`),
          paused: window.localStorage.getItem(`${SORT_KEY}-paused`)
        };
        if (collapsed) local.collapsed = JSON.parse(collapsed);
        ["closed", "longterm", "regular", "paused"].forEach(group => {
          if (!sort[group]) return;
          local.sort = local.sort || {};
          local.sort[group] = JSON.parse(sort[group])
        });
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
        const sort = {
          closed: patch.sort?.closed || prev.sort.closed,
          longterm: patch.sort?.longterm || prev.sort.longterm,
          regular: patch.sort?.regular || prev.sort.regular,
          paused: patch.sort?.paused || prev.sort.paused
        };
        const result = {
          ...prev,
          ...patch,
          sort,
          closed: fetched.closed.sort(compare(sort.closed.by, sort.closed.order)),
          longterm: fetched.longterm.sort(compare(sort.longterm.by, sort.longterm.order)),
          regular: fetched.regular.sort(compare(sort.regular.by, sort.regular.order)),
          paused: fetched.paused.sort(compare(sort.paused.by, sort.paused.order)),
        };
        return result;
      });
      onLoad?.();
    })(local);
  };
}

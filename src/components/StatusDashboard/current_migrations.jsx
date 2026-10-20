import { Redirect } from "@docusaurus/router";
import { urls } from "@site/src/constants";
import React, { useEffect, useState } from "react";
import { measureProgress } from "@site/src/pages/status/migration";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";
import { SortableHeader } from "@site/src/components/SortableTable";

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
  const fetched = total > 0;
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
            fetched={fetched}
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
            fetched={fetched}
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
            fetched={fetched}
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
            fetched={fetched}
          />
        </table>
      </div>
    </div>
  );
}

function TableContent({ collapsed, name, resort, rows, select, sort, fetched }) {
  const [redirect, setState] = useState('');
  if (redirect) return (<Redirect to={redirect} replace={false} push={true} />);
  return (
    <>
      <thead>
        <tr onClick={select}>
          <th colSpan={8} className={collapsed ? styles.collapsed : undefined}>
            {name}{" "}
            <span className="badge badge--secondary">{fetched ? rows.length : "…" }</span>
          </th>
        </tr>
        <tr className={collapsed ? styles.collapsed : undefined}>
          <SortableHeader sortKey="name" currentSort={sort} onSort={resort} styles={styles}>
            Name
          </SortableHeader>
          <SortableHeader sortKey="status" currentSort={sort} onSort={resort} styles={styles}>
            PRs made
          </SortableHeader>
          <SortableHeader sortKey="done" currentSort={sort} onSort={resort} styles={styles}>
            Done
          </SortableHeader>
          <SortableHeader sortKey="in-pr" currentSort={sort} onSort={resort} styles={styles}>
            In PR
          </SortableHeader>
          <SortableHeader sortKey="awaiting-pr" currentSort={sort} onSort={resort} styles={styles}>
            Awaiting PR
          </SortableHeader>
          <SortableHeader sortKey="awaiting-parents" currentSort={sort} onSort={resort} styles={styles}>
            Awaiting parents
          </SortableHeader>
          <SortableHeader sortKey="not-solvable" currentSort={sort} onSort={resort} styles={styles}>
            Not solvable
          </SortableHeader>
          <SortableHeader sortKey="bot-error" currentSort={sort} onSort={resort} styles={styles}>
            Bot error
          </SortableHeader>
        </tr>
      </thead>
      <tbody className={collapsed ? styles.collapsed  : undefined}>
        {rows.map((row) => {
          const { progress } = row;
          const href = `/status/migration/?name=${row.name}`;
          return (
            <tr key={row.name}>
              <td>
                {row.success ?
                  <Link href={href}
                    style={{ display: "block" }}
                    onClick={event => {
                      event.preventDefault();
                      setState(href);
                    }}>{row.name}</Link>
                : <>
                    <span title="Failed to load. Refresh the page to try again." style={{cursor: "pointer"}}>⚠️</span>
                    {" "}{row.name}
                  </>
                }
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
// Supports secondary sorting: when primary values are equal, falls back to previousSort
export function compare(by, order, previousSort = null) {
  const secondaryComparator = previousSort ? compare(previousSort.by, previousSort.order, null) : null;

  const applySecondarySort = (primaryResult, a, b) => {
    if (primaryResult !== 0 || !secondaryComparator) return primaryResult;
    return secondaryComparator(a, b);
  };

  switch (by) {
    case "name":
      return (a, b) => {
        const result = order === "ascending"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
        return applySecondarySort(result, a, b);
      };
    case "status":
      return (a, b) => {
        const result = order === "ascending"
          ? a.progress.percentage - b.progress.percentage
          : b.progress.percentage - a.progress.percentage;
        return applySecondarySort(result, a, b);
      };
    case "migration_status":
      return (a, b) => {
        const result = order === "ascending"
          ? (a.migration_status_order ?? 999) - (b.migration_status_order ?? 999)
          : (b.migration_status_order ?? 999) - (a.migration_status_order ?? 999);
        return applySecondarySort(result, a, b);
      };
    case "ci_status":
      return (a, b) => {
        const aOrder = a.ci_status_order ?? 999;
        const bOrder = b.ci_status_order ?? 999;
        let result;
        // Always put items with no CI status (order >= 999) last
        if (aOrder >= 999 && bOrder < 999) result = 1;
        else if (aOrder < 999 && bOrder >= 999) result = -1;
        else if (aOrder >= 999 && bOrder >= 999) result = 0;
        else {
          // Normal sorting for items with CI status
          result = order === "ascending" ? aOrder - bOrder : bOrder - aOrder;
        }
        return applySecondarySort(result, a, b);
      };
    case "num_descendants":
      return (a, b) => {
        const result = order === "ascending"
          ? (a.num_descendants ?? 0) - (b.num_descendants ?? 0)
          : (b.num_descendants ?? 0) - (a.num_descendants ?? 0);
        return applySecondarySort(result, a, b);
      };
    case "updated_at":
      return (a, b) => {
        const aTimestamp = a.updated_at_timestamp ?? 0;
        const bTimestamp = b.updated_at_timestamp ?? 0;
        let result;
        // Always put items with no timestamp (0) last
        if (aTimestamp === 0 && bTimestamp !== 0) result = 1;
        else if (aTimestamp !== 0 && bTimestamp === 0) result = -1;
        else if (aTimestamp === 0 && bTimestamp === 0) result = 0;
        else {
          // Normal sorting for items with timestamps
          result = order === "ascending" ? aTimestamp - bTimestamp : bTimestamp - aTimestamp;
        }
        return applySecondarySort(result, a, b);
      };
    default:
      return (a, b) => {
        const result = order === "ascending"
          ? a.details[by].length - b.details[by].length
          : b.details[by].length - a.details[by].length;
        return applySecondarySort(result, a, b);
      };
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
                let details, success;
                try {
                  const url = urls.migrations.details.replace("<NAME>", name);
                  const response = await fetch(url);
                  details = await response.json();
                  success = true;
                } catch (error) {
                  console.warn(`error loading migration: ${name}`, error);
                  details = {
                    "done": [],
                    "in-pr": [],
                    "awaiting-pr": [],
                    "awaiting-parents": [],
                    "not-solvable": [],
                    "bot-error": [],
                  }
                  success = false;
                }
                fetched[status][index].details = details;
                fetched[status][index].progress = measureProgress(details);
                fetched[status][index].success = success;
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

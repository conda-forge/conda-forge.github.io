import { Redirect, useLocation } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { urls } from "@site/src/constants";
import Admonition from "@theme/Admonition";
import Layout from "@theme/Layout";
import React, { useEffect, useState } from "react";
import SVG from 'react-inlinesvg';
import styles from "./styles.module.css";
import { Tooltip } from "react-tooltip";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import moment from 'moment';
import { compare } from '@site/src/components/StatusDashboard/current_migrations';
import { useSorting, SortableHeader } from '@site/src/components/SortableTable';
import * as dagreD3 from "dagre-d3-es";
import * as d3 from "d3";
import {
  getPrunedFeedstockStatus,
  buildGraphDataStructure,
  buildInitialGraph,
  getStatusColor,
  getStatusTextColor,
  filterNodesBySearchTerm,
  getAwaitingParentsWithNoParent,
  applyHighlight,
  createZoomedGraphData,
  getNodeIdFromSvgElement
} from "@site/src/utils/migrationGraphUtils";

// GitHub GraphQL MergeStateStatus documentation
// Reference: https://docs.github.com/en/graphql/reference/enums#mergestatestatus
const CI_STATUS_DESCRIPTIONS = {
  clean: "Mergeable and passing commit status.",
  unstable: "Mergeable with non-passing commit status.",
  behind: "The head ref is out of date.",
  blocked: "The merge is blocked.",
  dirty: "The merge commit cannot be cleanly created.",
  draft: "The merge is blocked due to the pull request being a draft.",
  has_hooks: "Mergeable with passing commit status and pre-receive hooks.",
  unknown: "The state cannot currently be determined."
};

// Threshold for showing large graph warning
const LARGE_GRAPH_THRESHOLD = 1000;

// { Done, In PR, Awaiting PR, Awaiting parents, Not solvable, Bot error }
// The third value is a boolean representing the default display state on load
// 'true' means hidden, 'false' means visible
const ORDERED = [
  ["done", "Done", true],
  ["in-pr", "In PR", false],
  ["awaiting-pr", "Awaiting PR", false],
  ["awaiting-parents", "Awaiting parents", false],
  ["not-solvable", "Not solvable", false],
  ["bot-error", "Bot error", false],
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

// Mapping of GitHub PR status to UI display properties
const STATUS_DISPLAY_MAP = {
  clean: { text: "Passing", badgeClass: "success" },
  unstable: { text: "Failing", badgeClass: "danger" },
  dirty: { text: "Conflicts", badgeClass: "warning" },
  blocked: { text: "Blocked", badgeClass: "danger" },
  behind: { text: "Passing*", badgeClass: "success" },
  draft: { text: "Draft", badgeClass: "secondary" },
  has_hooks: { text: "Unknown*", badgeClass: "secondary" },
  unknown: { text: "Unknown", badgeClass: "secondary" },
};

function getStatusBadgeClass(prStatus) {
  if (!STATUS_DISPLAY_MAP[prStatus]) {
    console.warn(`Unknown PR status: "${prStatus}". Expected one of: ${Object.keys(STATUS_DISPLAY_MAP).join(", ")}`);
    return "secondary";
  }
  return STATUS_DISPLAY_MAP[prStatus].badgeClass;
}

function getStatusDisplayText(prStatus) {
  if (!STATUS_DISPLAY_MAP[prStatus]) {
    console.warn(`Unknown PR status: "${prStatus}". Expected one of: ${Object.keys(STATUS_DISPLAY_MAP).join(", ")}`);
    return prStatus;
  }
  return STATUS_DISPLAY_MAP[prStatus].text;
}

function formatRelativeTime(timestamp) {
  if (!timestamp) return null;
  return moment(timestamp).fromNow();
}

function formatExactDateTime(timestamp) {
  if (!timestamp) return null;
  return moment(timestamp).format('LLLL');
}

export default function MigrationDetails() {
  const location = useLocation();
  const { siteConfig } = useDocusaurusContext();
  const [state, setState] = useState({
    name: new URLSearchParams(location.search).get("name"),
    details: null,
    redirect: false,
    view: "table",
  });
  const [showDoneNodes, setShowDoneNodes] = useState(false);
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
        details.paused_or_closed = await checkPausedOrClosed(name);
        setState((prev) => ({ ...prev, details, view: view || prev.view }));
      } catch (error) {
        console.warn(`error loading migration: ${state.name}`, error);
        setState((prev) => ({ ...prev, redirect: true }));
      }
    })();
  }, []);
  if (state.redirect) return <Redirect to="/status" replace />;
  const { details, name, view } = state;

  const graphDataStructure = React.useMemo(() => {
    if (!details) return { nodeMap: {}, edgeMap: {}, allNodeIds: [] };
    const feedstock = showDoneNodes ? details._feedstock_status : getPrunedFeedstockStatus(details._feedstock_status, details);
    return buildGraphDataStructure(feedstock, details);
  }, [details, showDoneNodes]);

  return (
    <Layout
      title={siteConfig.title}
      description="Status dashboard for conda-forge"
    >
      <main className={`container ${styles.migration_details}`}>
        <div className={`card margin-top--xs`}>
          <div className="card__header">
            <div className={styles.migration_details_toggle}>
              <div class="tabs-container">
                <ul role="tablist" aria-orientation="horizontal" class="tabs">
                  <li
                    key="table"
                    role="tab"
                    class={["tabs__item", (view == "table" ? "tabs__item--active" : null)].join(" ")}
                    onClick={() => toggle("table")}
                  >
                    Table
                  </li>
                  <li
                    key="graph"
                    role="tab"
                    class={["tabs__item", (view == "graph" ? "tabs__item--active" : null)].join(" ")}
                    onClick={() => toggle("graph")}
                  >
                    Graph
                  </li>
                  <li
                    key="dependencies"
                    role="tab"
                    class={["tabs__item", (view == "dependencies" ? "tabs__item--active" : null)].join(" ")}
                    onClick={() => toggle("dependencies")}
                  >
                    Dependencies
                  </li>
                  {name &&
                    <a href={urls.migrations.details.replace("<NAME>", name)} target="_blank">
                      <li
                        key="raw"
                        role="tab"
                        class="tabs__item"
                      >
                        <span>Raw <i className="fa fa-fw fa-arrow-up-right-from-square"></i></span>
                      </li>
                    </a>
                  }
                </ul>
              </div>
            </div>
            <Breadcrumbs>{name}</Breadcrumbs>
            <div style={{ clear: "both" }}></div>
          </div>
          <div className="card__body" style={{ overflow: "auto" }}>
            {(details && details.paused_or_closed === "paused") ?
              <Admonition type="note">This migration is currently paused.</Admonition> : null}
            {(details && details.paused_or_closed === "closed") ?
              <Admonition type="note">This migration has been closed recently.</Admonition> : null}
            {details && <Bar details={details} /> || null}
            {view === "graph" ?
              <Graph>{name}</Graph> :
              view === "dependencies" ?
                (details && <DependencyGraph graphDataStructure={graphDataStructure} details={details} showDoneNodes={showDoneNodes} setShowDoneNodes={setShowDoneNodes} />) :
                (details && <Table details={details} />)
            }
          </div>
        </div>
        {view === "table" && (
          <div className={`card margin-top--md`}>
            <div className="card__header">
              <h3>CI Status Legend</h3>
            </div>
            <div className="card__body">
              <CIStatusLegend />
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
}

function Bar({ details }) {
  const prefix = "migration_details_filter_";
  return (
    <>
      <h4>PRs made {details.progress.percentage.toFixed(0)}%</h4>
      <div className={styles.migration_details_bar}>
        {ORDERED.filter(([key]) => details[key]?.length).map(([key], index) => (
          <>
            <a
              id={`migration-bar-element-${key}`}
              className={styles[`${prefix}${key.replace("-", "_")}`]}
              style={{ flex: details[key].length }}
              key={`migration-bar-element-href-${key}`}
              alt={
                TITLES[key]
                + " "
                + parseFloat(details[key].length*100/measureProgress(details).total).toFixed(1)
                + "% (" + details[key].length
                + " PRs over "
                + measureProgress(details).total
                + ")"
              }
            ></a>
            <Tooltip
              anchorSelect={`#migration-bar-element-${key}`}
              place="top"
              key={`migration-bar-element-tooltip-${key}`}
              className={styles.migration_details_bar_tooltip}
            >
              <div>{TITLES[key]}</div>
            </Tooltip>
          </>
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
  return (
    <div className={styles.migration_details_filter}>
      {ORDERED.map(([key, title], index) => {
        const prefix = "migration_details_filter_";
        const base = `${prefix}${key.replace("-", "_")}`;
        return (
        <div
          className={[
            "button",
            styles.migration_details_filter_button,
            filters[key] ? "button--secondary" : "button--primary"
            ].join(" ")}
          key={index}
          onClick={() => onFilter(key)}>
          {filters[key] ?
            <span className={[
              styles[`${base}_hidden`],
              styles.migration_details_filter_dot,
              styles[`${base}_dot`],
            ].join(" ")}></span>
            :
            <span className={[
              styles[base],
              styles.migration_details_filter_dot,
              styles[`${base}_dot`],
            ].join(" ")}>
            </span>
          }
          <div className={styles.migration_details_filter_title_container}>
            {title} ({counts[key]})
          </div>
        </div>);
      })}
    </div>
  );
}

function Graph(props) {
  const [error, setState] = useState("");
  const containerRef = React.useRef(null);
  const url = urls.migrations.graph.replace("<NAME>", props.children);
  const onError = (error) => setState(error);

  // This effect allows zooming and panning in the SVG container;
  // The target div must use the provided `containerRef` reference
  useEffect(() => {
    if (!containerRef.current || error) return;

    const container = d3.select(containerRef.current);
    let timer = null;

    const setupZoom = () => {
      const svgElement = container.select('svg').node();
      if (!svgElement) {
        // Wait a bit for SVG to load
        timer = setTimeout(setupZoom, 100);
        return;
      }

      const svg = d3.select(svgElement);

      // Check if group already exists
      let svgGroup = svg.select('g.zoom-group');
      if (svgGroup.empty()) {
        svgGroup = svg.append('g').attr('class', 'zoom-group');

        // Move all existing children into the group (except the group itself)
        svg.selectAll('*').each(function() {
          const node = this;
          if (node !== svgGroup.node() && node.parentNode === svgElement) {
            svgGroup.node().appendChild(node);
          }
        });
      }

      // Get SVG dimensions (use viewBox if available, otherwise use bounding rect)
      const viewBox = svgElement.viewBox?.baseVal;
      const svgWidth = viewBox ? viewBox.width : (svgElement.getBoundingClientRect().width || containerRef.current.clientWidth);
      const svgHeight = viewBox ? viewBox.height : (svgElement.getBoundingClientRect().height || containerRef.current.clientHeight || 600);

      const bbox = svgElement.getBBox();

      const initialScale = Math.min(
        svgWidth / bbox.width,
        svgHeight / bbox.height,
        1
      ) * 0.9;

      const centerX = svgWidth / 2;
      const centerY = svgHeight / 2;

      const bboxCenterX = bbox.x + bbox.width / 2;
      const bboxCenterY = bbox.y + bbox.height / 2;

      const initialTranslate = [
        centerX - bboxCenterX * initialScale,
        centerY - bboxCenterY * initialScale,
      ];

      // Store initial transform for reset
      const initialTransform = d3.zoomIdentity
        .translate(initialTranslate[0], initialTranslate[1])
        .scale(initialScale);

      // Set up zoom behavior - apply to SVG element for proper drag sensitivity
      const zoom = d3.zoom()
        .scaleExtent([0.1, 4])
        .on("zoom", (event) => {
          svgGroup.attr("transform", event.transform);
        });

      svg.call(zoom);

      if (!svgGroup.attr("transform")) {
        svg.call(zoom.transform, initialTransform);
      }

      // Double-click to reset zoom/pan to initial state
      svg.on("dblclick.zoom", null); // Remove default double-click zoom
      svg.on("dblclick", function() {
        svg.transition()
          .duration(750)
          .call(zoom.transform, initialTransform);
      });
    };

    setupZoom();

    return () => {
      if (timer) clearTimeout(timer);
      const svgElement = container.select('svg').node();
      if (svgElement) {
        const svg = d3.select(svgElement);
        svg.on(".zoom", null);
        svg.on("dblclick", null);
      }
    };
  }, [error, url]);

  return (
    <div>
      <p style={{textAlign: "center"}}>
        <a href={url} target="blank" rel="noopener noreferrer">
          <code>{props.children}.svg</code>
        </a>
      </p>
      {
        error ?
        <p style={{textAlign: "center"}}>
          Graph is unavailable.
        </p> :
        <div
          ref={containerRef}
          style={{
            width: "100%",
            height: "600px",
            overflow: "hidden",
            cursor: "move"
          }}
        >
          <SVG
            onError={onError}
            src={url}
            title={props.children}
            description={`Migration graph for ${props.children}`}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      }
    </div>
  );
}

function Table({ details }) {
  const defaultFilters = ORDERED.reduce((filters, [status, _, toggled]) => ({ ...filters, [status]: toggled }), {});
  const [filters, setState] = useState(defaultFilters);
  const { sort, previousSort, resort } = useSorting("num_descendants", "descending");
  const feedstock = details._feedstock_status;

  const CI_STATUS_ORDER = { clean: 0, behind: 1, has_hooks: 2, unknown: 3, unstable: 4, blocked: 5, dirty: 6, draft: 7, "": 999 };

  // Transform data to match expected structure for compare function
  const rows = ORDERED.reduce((rows, [status]) => (
    filters[status] ? rows :
      rows.concat((details[status]).map(name => {
        const feedstockData = feedstock[name];
        return {
          name,
          status,
          migration_status_order: ORDERED.findIndex(x => x[0] == status),
          ci_status_order: CI_STATUS_ORDER[feedstockData["pr_status"] || ""] ?? 8,
          num_descendants: feedstockData["num_descendants"] ?? 0,
          updated_at_timestamp: feedstockData["updated_at"] ? new Date(feedstockData["updated_at"]).getTime() : 0,
        };
      }))
  ), []).sort(compare(sort.by, sort.order, previousSort));

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
            <SortableHeader sortKey="name" currentSort={sort} onSort={resort} styles={styles} style={{ width: 200 }}>
              Name
            </SortableHeader>
            <SortableHeader sortKey="migration_status" currentSort={sort} onSort={resort} styles={styles} style={{ width: 115 }}>
              Migration Status
            </SortableHeader>
            <SortableHeader sortKey="ci_status" currentSort={sort} onSort={resort} styles={styles} style={{ width: 115 }}>
              CI Status
            </SortableHeader>
            <SortableHeader sortKey="updated_at" currentSort={sort} onSort={resort} styles={styles} style={{ width: 115 }}>
              Last Updated
            </SortableHeader>
            <SortableHeader sortKey="num_descendants" currentSort={sort} onSort={resort} styles={styles} style={{ width: 115 }}>
              Total number of children
            </SortableHeader>
            <th style={{ flex: 1 }}>Immediate children</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) =>
            <Row key={i}>{{ feedstock: feedstock[row.name], name: row.name, status: row.status }}</Row>
          )}
        </tbody>
      </table>}
    </>
  );
}

function Row({ children }) {
  const [collapsed, setState] = useState(true);
  const { feedstock, name, status } = children;
  const immediate_children = feedstock["immediate_children"] || [];
  const total_children = feedstock["num_descendants"];
  const href = feedstock["pr_url"];
  const details = feedstock["pre_pr_migrator_status"];
  const pr_status = feedstock["pr_status"];


  return (<>
    <tr>
      <td>
      {href ? (
        <a href={href}>{name}</a>
      ) : (
        details ? (
          <span className={`${collapsed ? styles.collapsed : styles.expanded}`}
            onClick={() => setState(!collapsed)}>
            {name}
          </span>) : (
          <span>{name}</span>)
      )}
      </td>
      <td style={{ textAlign: "center" }}>{TITLES[status]}</td>
      <td style={{ textAlign: "center" }}>
        {pr_status ? (
          <span
            className={`badge badge--${getStatusBadgeClass(pr_status)}`}
            title={CI_STATUS_DESCRIPTIONS[pr_status] || pr_status}
          >
            {getStatusDisplayText(pr_status)}
          </span>
        ) : (
          <span>—</span>
        )}
      </td>
      <td style={{ textAlign: "center" }}>
        <span title={formatExactDateTime(feedstock["updated_at"])}>
          {formatRelativeTime(feedstock["updated_at"]) || "—"}
        </span>
      </td>
      <td style={{ textAlign: "center" }}>{total_children || null}</td>
      <td>
        {immediate_children.map((name, index) => (<React.Fragment key={index}>
          <span
            style={{ marginBottom: 1 }}
            className="badge badge--secondary">{name}</span>
          {immediate_children.length - 1 === index ? "" : " "}
        </React.Fragment>))}
      </td>
    </tr>
    {details && !collapsed && (<tr>
      <td colSpan={6}><pre dangerouslySetInnerHTML={{ __html: details}} /></td>
    </tr>)}
  </>);
}

function CIStatusLegend() {
  const colorOrder = { danger: 0, success: 1, secondary: 2 };
  const sortedStatuses = Object.entries(CI_STATUS_DESCRIPTIONS).sort(
    ([statusA], [statusB]) => {
      const classA = getStatusBadgeClass(statusA);
      const classB = getStatusBadgeClass(statusB);
      return (colorOrder[classA] ?? 3) - (colorOrder[classB] ?? 3);
    }
  );

  return (
    <div className={styles.ci_status_legend}>
      {sortedStatuses.map(([status, description]) => (
        <div key={status} className={styles.ci_status_item}>
          <span className={`badge badge--${getStatusBadgeClass(status)}`}>{getStatusDisplayText(status)}</span>
          <span>{description}</span>
        </div>
      ))}
      <a href="https://docs.github.com/en/graphql/reference/enums#mergestatestatus" target="_blank" rel="noopener noreferrer">See GitHub Docs</a>
    </div>
  );
}

async function checkPausedOrClosed(name) {
  for (const status of ["paused", "closed"]) {
    try {
      const response = await fetch(urls.migrations.status[status]);
      const data = await response.json();
      if (name in data) return status;
    } catch (error) {
      console.warn(`error checking status for ${name}:`, error);
    }
  }
}

function DependencyGraph({ graphDataStructure, details, showDoneNodes, setShowDoneNodes }) {
  const [graph, setGraph] = useState(null);
  const svgRef = React.useRef();
  const [selectedNodeId, setSelectedNodeId] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);
  const [graphDirection, setGraphDirection] = React.useState("TB");
  const [graphRanker, setGraphRanker] = React.useState("network-simplex");
  const [graphAlign, setGraphAlign] = React.useState("");
  const [userConfirmedLargeGraph, setUserConfirmedLargeGraph] = React.useState(false);

  const zoomedGraphData = React.useMemo(() => {
    return createZoomedGraphData(selectedNodeId, graphDataStructure);
  }, [selectedNodeId, graphDataStructure]);

  const { nodeMap, edgeMap, allNodeIds } = zoomedGraphData;

  const nodeCount = allNodeIds.length;
  const isLargeGraph = nodeCount > LARGE_GRAPH_THRESHOLD;
  const shouldShowWarning = isLargeGraph && !userConfirmedLargeGraph;

  useEffect(() => {
    setUserConfirmedLargeGraph(false);
  }, [graphDataStructure, showDoneNodes]);

  useEffect(() => {
    if (shouldShowWarning) return;
    const g = buildInitialGraph(zoomedGraphData, graphDirection, graphRanker, graphAlign || undefined);
    setGraph(g);
  }, [zoomedGraphData, graphDirection, graphRanker, graphAlign, shouldShowWarning]);

  const searchableNodeIds = React.useMemo(() => {
    return graphDataStructure.allNodeIds.filter(nodeId => {
      const node = graphDataStructure.nodeMap[nodeId];
      if (!node) return false;
      const hasChildren = node.outgoing && node.outgoing.length > 0;
      const hasParents = node.incoming && node.incoming.length > 0;
      return hasChildren || hasParents;
    });
  }, [graphDataStructure]);

  const filteredNodes = React.useMemo(() => {
    return filterNodesBySearchTerm(searchableNodeIds, searchTerm);
  }, [searchTerm, searchableNodeIds]);

  const awaitingParentsNoParent = React.useMemo(() => {
    return getAwaitingParentsWithNoParent(nodeMap, details);
  }, [nodeMap, details]);

  useEffect(() => {
    if (!graph || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const svgGroup = svg.append("g");

    const render = new dagreD3.render();
    render(svgGroup, graph);

    svgGroup.selectAll("g.node").each(function () {
      const nodeId = getNodeIdFromSvgElement(this);
      d3.select(this).attr("data-node-id", nodeId);
      const graphNode = graph.node(nodeId);

      if (selectedNodeId === nodeId) {
        d3.select(this).selectAll("rect")
          .style("stroke", "var(--ifm-color-primary)")
          .style("stroke-width", "4px");

        if (graphNode?.prUrl) {
          const prMatch = graphNode.prUrl.match(/\/pull\/(\d+)/);
          if (prMatch) {
            const prNumber = prMatch[1];
            const textElement = d3.select(this).select("text");

            if (!textElement.attr("data-original-text")) {
              textElement.attr("data-original-text", textElement.text());
            }

            textElement.text("");

            textElement.append("tspan")
              .attr("x", 0)
              .attr("dy", 0)
              .text(nodeId);

            textElement.append("tspan")
              .attr("class", "pr-number")
              .attr("x", 0)
              .attr("dy", "1.2em")
              .attr("fill", "var(--ifm-color-info)")
              .attr("font-size", "11px")
              .style("text-decoration", "underline")
              .style("cursor", "pointer")
              .text(`#${prNumber}`)
              .on("click", function(event) {
                event.stopPropagation();
                window.open(graphNode.prUrl, '_blank');
              });
          }
        }
      } else {
        const textElement = d3.select(this).select("text");
        const originalText = textElement.attr("data-original-text");
        if (originalText && textElement.selectAll("tspan").size() > 0) {
          textElement.selectAll("tspan").remove();
          textElement.text(originalText);
          textElement.attr("data-original-text", null);
        }
      }

      if (awaitingParentsNoParent.has(nodeId)) {
        d3.select(this).selectAll("rect")
          .style("fill", "var(--ifm-color-danger-contrast-background)")
          .style("stroke-dasharray", "5,5")
          .style("stroke-width", "2px");
      }
    });

    svgGroup.selectAll("g.edgePath").each(function () {
      const edgeElement = d3.select(this);
      const edges = graph.edges();
      const edgeIndex = Array.from(svgGroup.selectAll("g.edgePath").nodes()).indexOf(this);

      if (edgeIndex >= 0 && edgeIndex < edges.length) {
        const edge = edges[edgeIndex];
        const edgeData = graph.edge(edge);

        if (edgeData && edgeData.edgeId) {
          edgeElement.attr("data-edge-id", edgeData.edgeId);
        }
      }
    });

    svgGroup.selectAll("g.node").style("cursor", "pointer");

    svgGroup.selectAll("g.node").on("mouseenter", function () {
      const nodeId = d3.select(this).attr("data-node-id");
      applyHighlight(svgGroup, nodeId, zoomedGraphData);
    });

    svgGroup.selectAll("g.node").on("mouseleave", function () {
      applyHighlight(svgGroup, null, zoomedGraphData);
    });

    svgGroup.selectAll("g.node").on("click", function () {
      const nodeId = d3.select(this).attr("data-node-id");

      if (selectedNodeId === nodeId) {
        setSelectedNodeId(null);
        return;
      }

      setSelectedNodeId(nodeId);
    });

    svg.on("click", function (event) {
      if (event.target === this) {
        setSelectedNodeId(null);
        applyHighlight(svgGroup, null, zoomedGraphData);
      }
    });

    const zoom = d3.zoom().on("zoom", (event) => {
      svgGroup.attr("transform", event.transform);
    });

    svg.call(zoom);

    const graphWidth = graph.graph().width;
    const graphHeight = graph.graph().height;
    const svgWidth = svgRef.current.clientWidth;
    const svgHeight = svgRef.current.clientHeight;

    const initialScale = Math.min(
      svgWidth / graphWidth,
      svgHeight / graphHeight,
      1
    ) * 0.85;

    const initialTranslate = [
      (svgWidth - graphWidth * initialScale) / 2,
      (svgHeight - graphHeight * initialScale) / 2,
    ];

    svg.call(
      zoom.transform,
      d3.zoomIdentity
        .translate(initialTranslate[0], initialTranslate[1])
        .scale(initialScale)
    );
  }, [graph, selectedNodeId, awaitingParentsNoParent, zoomedGraphData]);

  const handleSelectNode = (nodeName) => {
    setSelectedNodeId(nodeName);
    setSearchTerm("");
    setShowDropdown(false);
  };

  return (
    <div className={styles.dependencyGraphContainer}>
      <div className={styles.graphHeader}>
        <div className={styles.headerContainer}>
          {showSettings && (
            <div className={styles.settingsPanel}>
              <div className={styles.toggleContainer}>
                <label className={styles.toggleLabel}>
                  <span>Include completed packages</span>
                  <input
                    type="checkbox"
                    className={styles.toggleInput}
                    checked={showDoneNodes}
                    onChange={(e) => setShowDoneNodes(e.target.checked)}
                  />
                  <span className={styles.toggleSlider}></span>
                </label>
              </div>
              <div className={styles.settingsGrid}>
                <div>
                  <label className={styles.settingLabel}>Direction</label>
                  <select
                    id="graph-direction"
                    className={styles.settingSelect}
                    value={graphDirection}
                    onChange={(e) => setGraphDirection(e.target.value)}
                  >
                    <option value="TB">Top to Bottom</option>
                    <option value="BT">Bottom to Top</option>
                    <option value="LR">Left to Right</option>
                    <option value="RL">Right to Left</option>
                  </select>
                </div>
                <div>
                  <label className={styles.settingLabel}>Ranker</label>
                  <select
                    id="graph-ranker"
                    className={styles.settingSelect}
                    value={graphRanker}
                    onChange={(e) => setGraphRanker(e.target.value)}
                  >
                    <option value="network-simplex">Network Simplex</option>
                    <option value="tight-tree">Tight Tree</option>
                    <option value="longest-path">Longest Path</option>
                  </select>
                </div>
                <div>
                  <label className={styles.settingLabel}>Alignment</label>
                  <select
                    id="graph-align"
                    className={styles.settingSelect}
                    value={graphAlign}
                    onChange={(e) => setGraphAlign(e.target.value)}
                  >
                    <option value="">Center (default)</option>
                    <option value="UL">Upper Left</option>
                    <option value="UR">Upper Right</option>
                    <option value="DL">Down Left</option>
                    <option value="DR">Down Right</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          <div className={styles.headerControls}>
            <div className={styles.searchContainer}>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search for package..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              />
              {showDropdown && filteredNodes.length > 0 && (
                <ul className={styles.searchDropdown}>
                  {filteredNodes.slice(0, 10).map((nodeName) => (
                    <li
                      key={nodeName}
                      className={styles.searchDropdownItem}
                      onClick={() => handleSelectNode(nodeName)}
                    >
                      {nodeName}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`button button--secondary ${styles.settingsButton}`}
              title="Graph Settings"
            >
              <i className="fa fa-cog"></i>
            </button>
          </div>
        </div>
      </div>
      {shouldShowWarning ? (
        <div className={`${styles.graphContainer} ${styles.warningContainer}`}>
          <div className={styles.warningContent}>
            <div className={styles.warningIcon}>⚠️</div>
            <h3>Large Graph Warning</h3>
            <p className={styles.warningText}>
              This graph contains <strong>{nodeCount.toLocaleString()} nodes</strong>.
              Rendering more than {LARGE_GRAPH_THRESHOLD.toLocaleString()} nodes may slow down your browser and affect performance.
            </p>
            <div className={styles.warningButtons}>
              <button
                onClick={() => setUserConfirmedLargeGraph(true)}
                className="button button--primary"
              >
                Continue Anyway
              </button>
              {showDoneNodes && (
                <button
                  onClick={() => setShowDoneNodes(false)}
                  className="button button--secondary"
                >
                  Hide Completed Nodes
                </button>
              )}
              {!showDoneNodes && (
                <button
                  disabled
                  className="button button--secondary"
                >
                  Completed Nodes Already Hidden
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.graphContainer}>
          <svg ref={svgRef}></svg>
        </div>
      )}
      <span className={styles.instructions}>
        Arrows point from package to its immediate children (dependents).
        Use mouse wheel to zoom, drag to pan, click on a node to zoom to its subgraph, or click on the background to reset the view.
      </span>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import * as dagreD3 from "dagre-d3-es";
import * as d3 from "d3";
import { useHistory, useLocation } from "@docusaurus/router";
import graphStyles from "./graphStyles.module.css";
import {
  getPrunedFeedstockStatus,
  buildGraphDataStructure,
  buildInitialGraph,
  filterNodesBySearchTerm,
  getAwaitingParentsWithNoParent,
  applyHighlight,
  createZoomedGraphData,
  getNodeIdFromSvgElement
} from "@site/src/utils/migrationGraphUtils";

const LARGE_GRAPH_THRESHOLD = 1000;

export default function DependencyGraph({ details, initialSelectedNode = null }) {
  const history = useHistory();
  const location = useLocation();
  const [showDoneNodes, setShowDoneNodes] = useState(false);

  const graphDataStructure = React.useMemo(() => {
    if (!details) return { nodeMap: {}, edgeMap: {}, allNodeIds: [] };
    const feedstock = showDoneNodes ? details._feedstock_status : getPrunedFeedstockStatus(details._feedstock_status, details);
    return buildGraphDataStructure(feedstock, details);
  }, [details, showDoneNodes]);
  const [graph, setGraph] = useState(null);
  const svgRef = React.useRef();
  const [selectedNodeId, setSelectedNodeId] = React.useState(null);
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);
  const [graphDirection, setGraphDirection] = React.useState("TB");
  const [graphRanker, setGraphRanker] = React.useState("network-simplex");
  const [graphAlign, setGraphAlign] = React.useState("");
  const [userConfirmedLargeGraph, setUserConfirmedLargeGraph] = React.useState(false);

  useEffect(() => {
    if (initialSelectedNode && graphDataStructure.nodeMap[initialSelectedNode]) {
      setSelectedNodeId(initialSelectedNode);
    }
    setIsInitialized(true);
  }, [initialSelectedNode, graphDataStructure]);

  useEffect(() => {
    if (!isInitialized) return;

    const searchParams = new URLSearchParams(location.search);

    if (selectedNodeId) {
      searchParams.set("dependency", selectedNodeId);
    } else {
      searchParams.delete("dependency");
    }

    const newSearch = searchParams.toString();
    const newUrl = `${location.pathname}${newSearch ? `?${newSearch}` : ""}`;

    if (newUrl !== `${location.pathname}${location.search}`) {
      history.replace(newUrl);
    }
  }, [selectedNodeId, history, location.pathname, isInitialized]);

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
        d3.select(this).classed("nodeSelected", true);

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
              .attr("fill", "#ffffff")
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
        d3.select(this)
          .classed("nodeAwaitingParentsNoParent", true)
          .selectAll("rect")
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

    svg.on("dblclick.zoom", null);
    svg.on("dblclick", function (event) {
      if (event.target === this) {
        svg.transition().duration(750).call(
          zoom.transform,
          d3.zoomIdentity
            .translate(initialTranslate[0], initialTranslate[1])
            .scale(initialScale)
        );
      }
    });
  }, [graph, selectedNodeId, awaitingParentsNoParent, zoomedGraphData]);

  const handleSelectNode = (nodeName) => {
    setSelectedNodeId(nodeName);
    setSearchTerm("");
    setShowDropdown(false);
  };

  return (
    <div className={graphStyles.dependencyGraphContainer}>
      <div className={graphStyles.graphHeader}>
        <div className={graphStyles.headerContainer}>
          {showSettings && (
            <div className={graphStyles.settingsPanel}>
              <div className={graphStyles.toggleContainer}>
                <label className={graphStyles.toggleLabel}>
                  <span>Include completed packages</span>
                  <input
                    type="checkbox"
                    className={graphStyles.toggleInput}
                    checked={showDoneNodes}
                    onChange={(e) => setShowDoneNodes(e.target.checked)}
                  />
                  <span className={graphStyles.toggleSlider}></span>
                </label>
              </div>
              <div className={graphStyles.settingsGrid}>
                <div>
                  <label className={graphStyles.settingLabel}>Direction</label>
                  <select
                    id="graph-direction"
                    className={graphStyles.settingSelect}
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
                  <label className={graphStyles.settingLabel}>Ranker</label>
                  <select
                    id="graph-ranker"
                    className={graphStyles.settingSelect}
                    value={graphRanker}
                    onChange={(e) => setGraphRanker(e.target.value)}
                  >
                    <option value="network-simplex">Network Simplex</option>
                    <option value="tight-tree">Tight Tree</option>
                    <option value="longest-path">Longest Path</option>
                  </select>
                </div>
                <div>
                  <label className={graphStyles.settingLabel}>Alignment</label>
                  <select
                    id="graph-align"
                    className={graphStyles.settingSelect}
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
          <div className={graphStyles.headerControls}>
            <div className={graphStyles.searchContainer}>
              <input
                type="text"
                className={graphStyles.searchInput}
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
                <ul className={graphStyles.searchDropdown}>
                  {filteredNodes.slice(0, 10).map((nodeName) => (
                    <li
                      key={nodeName}
                      className={graphStyles.searchDropdownItem}
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
              className={`button button--secondary ${graphStyles.settingsButton}`}
              title="Graph Settings"
            >
              <i className="fa fa-cog"></i>
            </button>
          </div>
        </div>
      </div>
      {shouldShowWarning ? (
        <div className={`${graphStyles.graphContainer} ${graphStyles.warningContainer}`}>
          <div className={graphStyles.warningContent}>
            <div className={graphStyles.warningIcon}>⚠️</div>
            <h3>Large Graph Warning</h3>
            <p className={graphStyles.warningText}>
              This graph contains <strong>{nodeCount.toLocaleString()} nodes</strong>.
              Rendering more than {LARGE_GRAPH_THRESHOLD.toLocaleString()} nodes may slow down your browser and affect performance.
            </p>
            <div className={graphStyles.warningButtons}>
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
        <div className={graphStyles.graphContainer}>
          <svg ref={svgRef}></svg>
        </div>
      )}
      <div className={graphStyles.legend}>
        <div className={graphStyles.legendItems}>
          <div className={graphStyles.legendItem}>
            <span className={`${graphStyles.legendCircle} ${graphStyles.legendSuccess}`}></span>
            <span className={graphStyles.legendLabel}>CI Passing</span>
          </div>
          <div className={graphStyles.legendItem}>
            <span className={`${graphStyles.legendCircle} ${graphStyles.legendDanger}`}></span>
            <span className={graphStyles.legendLabel}>CI Failing</span>
          </div>
          <div className={graphStyles.legendItem}>
            <span className={`${graphStyles.legendCircle} ${graphStyles.legendWarning}`}></span>
            <span className={graphStyles.legendLabel}>Bot/Solver Error or Status Unknown</span>
          </div>
          <div className={graphStyles.legendItem}>
            <span className={`${graphStyles.legendCircle} ${graphStyles.legendAwaitingPr}`}></span>
            <span className={graphStyles.legendLabel}>Awaiting PR</span>
          </div>
          <div className={graphStyles.legendItem}>
            <span className={`${graphStyles.legendCircle} ${graphStyles.legendAwaitingParents}`}></span>
            <span className={graphStyles.legendLabel}>Awaiting Parents</span>
          </div>
          <div className={graphStyles.legendItem}>
            <span className={`${graphStyles.legendCircle} ${graphStyles.legendDashed}`}></span>
            <span className={graphStyles.legendLabel}>Awaiting Parent in Another Migration</span>
          </div>
        </div>
      </div>
      <span className={graphStyles.instructions}>
        Arrows point from package to its immediate children (dependents).
        Use mouse wheel to zoom, drag to pan, click on a node to zoom to its subgraph, or click on the background to reset the view.
      </span>
    </div>
  );
}

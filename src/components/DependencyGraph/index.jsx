import React, { useEffect, useState } from "react";
import * as dagreD3 from "dagre-d3-es";
import * as d3 from "d3";
import { useHistory, useLocation } from "@docusaurus/router";
import graphStyles from "./index.module.css";
import SearchFilter from "./SearchFilter";
import GraphTooLargeWarning from "./GraphTooLargeWarning";
import Legend from "./Legend";
import Toggle from "./Toggle";
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

  if (!details) return null;

  const graphDataStructure = React.useMemo(() => {
    const feedstock = showDoneNodes ? details._feedstock_status : getPrunedFeedstockStatus(details._feedstock_status, details);
    return buildGraphDataStructure(feedstock, details);
  }, [details, showDoneNodes]);
  const [graph, setGraph] = useState(null);
  const svgRef = React.useRef();
  const [selectedNodeId, setSelectedNodeId] = React.useState(null);
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [userConfirmedLargeGraph, setUserConfirmedLargeGraph] = React.useState(false);

  // Graph layout settings - possible values:
  // graphDirection: "TB" (top-to-bottom), "BT" (bottom-to-top), "LR" (left-to-right), "RL" (right-to-left)
  // graphRanker: "network-simplex", "tight-tree", "longest-path"
  // graphAlign: "" (center/default), "UL" (upper-left), "UR" (upper-right), "DL" (down-left), "DR" (down-right)
  const graphDirection = "TB";
  const graphRanker = "network-simplex";
  const graphAlign = "";

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
    const validSelectedNodeId = selectedNodeId && graphDataStructure.nodeMap[selectedNodeId] ? selectedNodeId : null;
    return createZoomedGraphData(validSelectedNodeId, graphDataStructure);
  }, [selectedNodeId, graphDataStructure]);

  const { nodeMap, edgeMap, allNodeIds } = zoomedGraphData;

  const nodeCount = allNodeIds.length;
  const isLargeGraph = nodeCount > LARGE_GRAPH_THRESHOLD;
  const shouldShowWarning = isLargeGraph && !userConfirmedLargeGraph;

  useEffect(() => {
    setUserConfirmedLargeGraph(false);
  }, [graphDataStructure, showDoneNodes]);

  useEffect(() => {
    if (selectedNodeId && !graphDataStructure.nodeMap[selectedNodeId]) {
      setSelectedNodeId(null);
      setSearchTerm("");
    }
  }, [graphDataStructure, selectedNodeId]);

  useEffect(() => {
    if (shouldShowWarning) return;
    const g = buildInitialGraph(zoomedGraphData, graphDirection, graphRanker, graphAlign || undefined);
    setGraph(g);
  }, [zoomedGraphData, shouldShowWarning]);

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

    // WORKAROUND-PR-2670: Add marker definitions for arrowheads BEFORE rendering
    // dagre-d3 doesn't automatically create SVG marker defs for arrowheads,
    // so we need to manually define them before render. This is referenced in
    // migrationGraphUtils.js:26
    const defs = svgGroup.append("defs");
    defs
      .append("marker")
      .attr("id", "arrowhead")
      .attr("markerWidth", 10)
      .attr("markerHeight", 10)
      .attr("refX", 8)
      .attr("refY", 3)
      .attr("orient", "auto")
      .append("polygon")
      .attr("points", "0 0, 10 3, 0 6")
      .style("fill", "var(--ifm-color-emphasis-800)");

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
      if (nodeId && zoomedGraphData.nodeMap[nodeId]) {
        applyHighlight(svgGroup, nodeId, zoomedGraphData);
      }
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
      setSearchTerm(nodeId);
    });

    svg.on("click", function (event) {
      if (event.target === this) {
        setSelectedNodeId(null);
        setSearchTerm("");
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
    setSearchTerm(nodeName);
  };

  return (
    <div className={graphStyles.dependencyGraphContainer}>
      <div className={graphStyles.graphHeader}>
        <div className={graphStyles.headerContainer}>
          <div className={graphStyles.headerControls}>
            <SearchFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              filteredNodes={filteredNodes}
              onSelectNode={handleSelectNode}
            />
            <Toggle
              label="Include completed packages"
              checked={showDoneNodes}
              onChange={setShowDoneNodes}
            />
          </div>
        </div>
      </div>
      {shouldShowWarning ? (
        <GraphTooLargeWarning
          nodeCount={nodeCount}
          onConfirm={() => setUserConfirmedLargeGraph(true)}
          showDoneNodes={showDoneNodes}
          onHideDoneNodes={() => setShowDoneNodes(false)}
        />
      ) : (
        <div className={graphStyles.graphContainer}>
          <svg ref={svgRef}></svg>
        </div>
      )}
      <Legend />
      <span className={graphStyles.instructions}>
        Arrows point from package to its immediate children (dependents).
        Use mouse wheel to zoom, drag to pan, click on a node to zoom to its subgraph, or click on the background to reset the view.
      </span>
    </div>
  );
}

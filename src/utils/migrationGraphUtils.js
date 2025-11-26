/**
 * Utility functions for graph operations in the migration status page
 */

import * as dagreD3 from "dagre-d3-es";
import * as d3 from "d3";

const DEFAULT_GRAPH_SETTINGS = {
  nodesep: 50,
  ranksep: 100,
  rankdir: "TB",
};

export const getGraphSettings = (
  rankdir = "TB",
  ranker = "network-simplex",
  align = undefined,
) => ({
  nodesep: 50,
  ranksep: 100,
  rankdir: rankdir,
  ranker: ranker,
  align: align,
});

const EDGE_STYLE = {
  arrowheadStyle: "fill: var(--ifm-color-emphasis-800);",
  style: "stroke: var(--ifm-color-emphasis-800); stroke-width: 2px;",
};

export const getNodeIdFromSvgElement = (element) => {
  const fullText = d3.select(element).select("text").text().split("\n")[0];
  return fullText.split("(")[0].trim();
};

export const getPrunedFeedstockStatus = (feedstockStatus, details) => {
  if (!feedstockStatus || !details?.done) return feedstockStatus;

  const mergedPackages = new Set(details.done);
  const pruned = {};

  Object.entries(feedstockStatus).forEach(([name, data]) => {
    if (!mergedPackages.has(name)) {
      pruned[name] = data;
    }
  });

  return pruned;
};

export const getStatusClass = (prStatus) => {
  switch (prStatus) {
    case "clean":
      return "nodeClean";
    case "unstable":
      return "nodeUnstable";
    case "bot-error":
      return "nodeBotError";
    case "not-solvable":
      return "nodeNotSolvable";
    case "done":
      return "nodeDone";
    case "in-pr":
      return "nodeInPr";
    case "awaiting-pr":
      return "nodeAwaitingPr";
    case "awaiting-parents":
      return "nodeAwaitingParents";
    case "unknown":
      return "nodeUnknown";
    default:
      return "nodeDefault";
  }
};

export const filterNodesBySearchTerm = (nodeNames, searchTerm) => {
  if (!searchTerm) return [];
  return nodeNames.filter((name) =>
    name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
};

export const getAwaitingParentsWithNoParent = (nodeMap, details) => {
  const noParents = new Set();
  const allChildren = new Set();

  Object.values(nodeMap).forEach((nodeInfo) => {
    const children = nodeInfo.data?.immediate_children || [];
    children.forEach((childId) => {
      allChildren.add(childId);
    });
  });

  const awaitingParents = details?.["awaiting-parents"] || [];
  awaitingParents.forEach((name) => {
    if (!allChildren.has(name)) {
      noParents.add(name);
    }
  });

  return noParents;
};

export const findAllAncestors = (nodeId, graphDataStructure) => {
  const { nodeMap, edgeMap } = graphDataStructure;
  const ancestors = new Set();
  const queue = [nodeId];
  const visited = new Set([nodeId]);

  while (queue.length > 0) {
    const current = queue.shift();
    const incomingEdges = nodeMap[current]?.incoming || [];

    incomingEdges.forEach((eid) => {
      const parentId = edgeMap[eid].source;
      if (!visited.has(parentId)) {
        visited.add(parentId);
        ancestors.add(parentId);
        queue.push(parentId);
      }
    });
  }

  return ancestors;
};

export const findAllDescendants = (nodeId, graphDataStructure) => {
  const { nodeMap, edgeMap } = graphDataStructure;
  const descendants = new Set();
  const queue = [nodeId];
  const visited = new Set([nodeId]);

  while (queue.length > 0) {
    const current = queue.shift();
    const outgoingEdges = nodeMap[current]?.outgoing || [];

    outgoingEdges.forEach((eid) => {
      const childId = edgeMap[eid].target;
      if (!visited.has(childId)) {
        visited.add(childId);
        descendants.add(childId);
        queue.push(childId);
      }
    });
  }

  return descendants;
};

export const findConnectedComponents = (
  graphDataStructure,
  nodesWithChildren,
) => {
  const { nodeMap } = graphDataStructure;
  const visited = new Set();
  const components = [];

  // Build parent map for efficient parent lookup
  const parentMap = {}; // childId -> [parentId1, parentId2, ...]
  Object.entries(nodeMap).forEach(([nodeId, nodeInfo]) => {
    const children = nodeInfo.data?.immediate_children || [];
    children.forEach((childId) => {
      if (!parentMap[childId]) {
        parentMap[childId] = [];
      }
      parentMap[childId].push(nodeId);
    });
  });

  const dfs = (nodeId, component, visited) => {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);
    component.add(nodeId);

    const nodeInfo = nodeMap[nodeId];
    if (nodeInfo) {
      // Follow children
      const children = nodeInfo.data?.immediate_children || [];
      children.forEach((childId) => {
        if (nodeMap[childId]) {
          dfs(childId, component, visited);
        }
      });

      // Follow parents using the parent map
      const parents = parentMap[nodeId] || [];
      parents.forEach((parentId) => {
        dfs(parentId, component, visited);
      });
    }
  };

  nodesWithChildren.forEach((name) => {
    if (!visited.has(name)) {
      const component = new Set();
      dfs(name, component, visited);
      if (component.size > 0) {
        components.push(component);
      }
    }
  });

  return components;
};

export const buildGraphDataStructure = (feedstockStatus, details = null) => {
  if (!feedstockStatus || Object.keys(feedstockStatus).length === 0) {
    return { nodeMap: {}, edgeMap: {}, allNodeIds: [] };
  }

  const nodeMap = {};
  const edgeMap = {};

  // Build category map from details for quick lookup
  const nodeCategoryMap = {};
  if (details) {
    [
      "done",
      "in-pr",
      "awaiting-pr",
      "awaiting-parents",
      "not-solvable",
      "bot-error",
    ].forEach((category) => {
      if (details[category]) {
        details[category].forEach((nodeName) => {
          nodeCategoryMap[nodeName] = category;
        });
      }
    });
  }

  // Initialize all nodes
  Object.keys(feedstockStatus).forEach((nodeId) => {
    nodeMap[nodeId] = {
      data: {
        ...feedstockStatus[nodeId],
        category: nodeCategoryMap[nodeId] || "unknown", // Add category to data
      },
      incoming: [],
      outgoing: [],
    };
  });

  // Build edges from immediate_children
  Object.entries(feedstockStatus).forEach(([nodeId, data]) => {
    if (data.immediate_children && Array.isArray(data.immediate_children)) {
      data.immediate_children.forEach((childId) => {
        if (feedstockStatus[childId]) {
          const edgeId = `${nodeId}->${childId}`;
          edgeMap[edgeId] = {
            source: nodeId,
            target: childId,
          };
          nodeMap[nodeId].outgoing.push(edgeId);
          nodeMap[childId].incoming.push(edgeId);
        }
      });
    }
  });

  return {
    nodeMap,
    edgeMap,
    allNodeIds: Object.keys(nodeMap),
  };
};

export const buildInitialGraph = (
  graphDataStructure,
  rankdir = "TB",
  ranker = "network-simplex",
  align = undefined,
) => {
  const { nodeMap, edgeMap, allNodeIds } = graphDataStructure;

  // Identify nodes that have direct children using nodeMap
  const nodesWithChildren = new Set();
  allNodeIds.forEach((nodeId) => {
    if (nodeMap[nodeId].outgoing && nodeMap[nodeId].outgoing.length > 0) {
      nodesWithChildren.add(nodeId);
    }
  });

  // Find connected components using the data structure
  const components = findConnectedComponents(
    graphDataStructure,
    nodesWithChildren,
  );

  // Build and return the graph using the data structure
  return buildGraph(
    nodeMap,
    edgeMap,
    components,
    nodesWithChildren,
    rankdir,
    ranker,
    align,
  );
};

export const applyHighlight = (svgGroup, nodeId, graphDataStructure) => {
  const { nodeMap, edgeMap } = graphDataStructure;

  if (!nodeId) {
    // Clear all highlights
    svgGroup.selectAll("g.node").style("opacity", 1);
    svgGroup.selectAll("g.edgePath").style("opacity", 1);
    svgGroup
      .selectAll("g.edgePath path")
      .style("stroke", "var(--ifm-color-emphasis-800)")
      .style("stroke-width", "2px");
    return;
  }

  // Get related nodes and edges from our data structure
  const outgoingEdgeIds = nodeMap[nodeId]?.outgoing || [];
  const incomingEdgeIds = nodeMap[nodeId]?.incoming || [];
  const allRelatedEdgeIds = new Set([...outgoingEdgeIds, ...incomingEdgeIds]);

  const childNodeIds = outgoingEdgeIds.map((eid) => edgeMap[eid].target);
  const parentNodeIds = incomingEdgeIds.map((eid) => edgeMap[eid].source);
  const highlightNodeIds = new Set([nodeId, ...childNodeIds, ...parentNodeIds]);

  // Dim all nodes
  svgGroup.selectAll("g.node").style("opacity", function () {
    const nid = d3.select(this).attr("data-node-id");
    return highlightNodeIds.has(nid) ? 1 : 0.2;
  });

  // Dim all edges
  svgGroup.selectAll("g.edgePath").style("opacity", 0.05);

  // Highlight related edges (both incoming and outgoing)
  svgGroup.selectAll("g.edgePath").each(function () {
    const eid = d3.select(this).attr("data-edge-id");
    if (allRelatedEdgeIds.has(eid)) {
      // Move to front
      this.parentNode.appendChild(this);

      d3.select(this)
        .style("opacity", 1)
        .selectAll("path")
        .style("stroke", "var(--ifm-color-warning)")
        .style("stroke-width", "4px");
    }
  });
};

export const createZoomedGraphData = (nodeIdToZoom, graphDataStructure) => {
  if (!nodeIdToZoom) {
    // No zoom - return the full graph data structure
    return graphDataStructure;
  }

  const { nodeMap: nodeMapData, edgeMap: edgeMapData } = graphDataStructure;

  // Find all ancestors and descendants using utility functions
  const ancestors = findAllAncestors(nodeIdToZoom, graphDataStructure);
  const descendants = findAllDescendants(nodeIdToZoom, graphDataStructure);
  const visibleNodes = new Set([nodeIdToZoom, ...ancestors, ...descendants]);

  // Create filtered edgeMap with only edges between visible nodes
  const filteredEdgeMap = {};
  const filteredEdgeIds = new Set();
  Object.entries(edgeMapData).forEach(([edgeId, edge]) => {
    if (visibleNodes.has(edge.source) && visibleNodes.has(edge.target)) {
      filteredEdgeMap[edgeId] = edge;
      filteredEdgeIds.add(edgeId);
    }
  });

  // Create filtered nodeMap with only visible nodes and filtered edge references
  const filteredNodeMap = {};
  visibleNodes.forEach((nodeId) => {
    if (nodeMapData[nodeId]) {
      const originalNode = nodeMapData[nodeId];
      filteredNodeMap[nodeId] = {
        ...originalNode,
        incoming: originalNode.incoming.filter((edgeId) =>
          filteredEdgeIds.has(edgeId),
        ),
        outgoing: originalNode.outgoing.filter((edgeId) =>
          filteredEdgeIds.has(edgeId),
        ),
      };
    }
  });

  return {
    nodeMap: filteredNodeMap,
    edgeMap: filteredEdgeMap,
    allNodeIds: Array.from(visibleNodes),
  };
};

// Helper function to add a node to the graph
const addNodeToGraph = (g, nodeId, nodeMap, nodeToComponent, addedNodes) => {
  if (addedNodes.has(nodeId)) return;

  const nodeInfo = nodeMap[nodeId];
  if (!nodeInfo) return;

  const category = nodeInfo.data.category || "unknown";
  const prStatus = nodeInfo.data.pr_status || "unknown";
  const componentId = nodeToComponent[nodeId];

  // Determine color based on category first, then PR status
  let colorStatus = category;
  if (category === "in-pr" && prStatus !== "unknown") {
    // For in-PR nodes, use the PR status for color
    colorStatus = prStatus;
  }

  g.setNode(nodeId, {
    label: nodeId,
    prUrl: nodeInfo.data.pr_url, // Store PR URL for later use
    rx: 5,
    ry: 5,
    padding: 15,
    class: getStatusClass(colorStatus),
  });

  if (componentId) {
    g.setParent(nodeId, componentId);
  }

  addedNodes.add(nodeId);
};

export const buildGraph = (
  nodeMap,
  edgeMap,
  components,
  nodesWithChildren,
  rankdir = "TB",
  ranker = "network-simplex",
  align = undefined,
) => {
  const g = new dagreD3.graphlib.Graph({ compound: true, directed: true })
    .setGraph(getGraphSettings(rankdir, ranker, align))
    .setDefaultEdgeLabel(() => ({}));

  // Add compound nodes (subgraphs) for each component
  components.forEach((component, componentIndex) => {
    const componentId = `component-${componentIndex}`;
    g.setNode(componentId, {
      label: "",
      clusterLabelPos: "top",
      style:
        "fill: none; stroke: var(--ifm-color-emphasis-300); stroke-width: 1px; stroke-dasharray: 5,5;",
    });
  });

  // Add nodes to their components
  const nodeToComponent = {};
  components.forEach((component, componentIndex) => {
    component.forEach((nodeId) => {
      nodeToComponent[nodeId] = `component-${componentIndex}`;
    });
  });

  // Add all nodes and edges in a single pass
  const addedNodes = new Set();

  // Process all nodes with children
  nodesWithChildren.forEach((name) => {
    // Add the parent node
    addNodeToGraph(g, name, nodeMap, nodeToComponent, addedNodes);

    const nodeInfo = nodeMap[name];
    if (!nodeInfo) return;

    // Process all outgoing edges and add child nodes
    nodeInfo.outgoing.forEach((edgeId) => {
      const childId = edgeMap[edgeId].target;

      // Add the child node (leaf node)
      addNodeToGraph(g, childId, nodeMap, nodeToComponent, addedNodes);

      // Add edge with edge ID
      g.setEdge(name, childId, { ...EDGE_STYLE, edgeId });
    });
  });

  return g;
};

import React, { useState, useEffect } from "react";
import styles from "./SearchFilter.module.css";

/**
 * SearchFilter component provides a native datalist-based selector for package search.
 * Features:
 * - Real-time filtering as the user types
 * - Native HTML datalist autocomplete
 * - Browser-native suggestion UI
 * - Selection updates the graph selection via selectedNodeId
 *
 * Props:
 * - selectedNodeId: The currently selected node (used for display value)
 * - onSelectNode: Called when user selects from datalist (updates selectedNodeId)
 * - onFilterChange: Called when user types to update filter term
 * - filteredNodes: List of nodes matching the current filter
 */
export default function SearchFilter({
  selectedNodeId,
  onSelectNode,
  onFilterChange,
  filteredNodes,
}) {
  // Local filterTerm state for current input value during typing
  const [filterTerm, setFilterTerm] = useState("");
  const dataListId = "package-suggestions";

  // Sync local filterTerm to selectedNodeId when it changes
  // This keeps the input displaying the selected node
  useEffect(() => {
    if (selectedNodeId) {
      setFilterTerm(selectedNodeId);
    } else {
      setFilterTerm("");
    }
  }, [selectedNodeId]);

  const handleChange = (e) => {
    const value = e.target.value;
    // Update both local state and parent state for filtering
    setFilterTerm(value);
    onFilterChange(value);
  };

  const handleInput = (e) => {
    // Detect when user selects an option from datalist
    const value = e.target.value;
    // If the input value exactly matches one of our filtered nodes, it was selected from datalist
    if ((filteredNodes.includes(value) && value !== filterTerm) || (value === "")) {
      onSelectNode(value);
      // Keep filter term - don't clear it so user sees the selected node in the input
    }
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchInputWrapper}>
        {/* Search input with native datalist */}
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search for package..."
          value={filterTerm}
          onChange={handleChange}
          onInput={handleInput}
          list={dataListId}
          autoComplete="off"
        />
        {/* Datalist provides native browser autocomplete suggestions */}
        <datalist id={dataListId} className={styles.datalist}>
          {filteredNodes.slice(0, 10).map((nodeName) => (
            <option key={nodeName} value={nodeName} />
          ))}
        </datalist>
      </div>
    </div>
  );
}

import React from "react";
import styles from "./SearchFilter.module.css";

/**
 * SearchFilter component provides a native datalist-based selector for package search.
 * Features:
 * - Real-time filtering as the user types
 * - Native HTML datalist autocomplete
 * - Browser-native suggestion UI
 * - Selection updates the input field with the selected package name
 */
export default function SearchFilter({
  searchTerm,
  onSearchChange,
  filteredNodes,
  onSelectNode,
}) {
  const dataListId = "package-suggestions";

  const handleChange = (e) => {
    const value = e.target.value;
    onSearchChange(value);
  };

  const handleInput = (e) => {
    // Detect when user selects an option from datalist
    const value = e.target.value;
    // If the input value exactly matches one of our filtered nodes, it was selected from datalist
    if (filteredNodes.includes(value) && value !== searchTerm) {
      onSelectNode(value);
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
          value={searchTerm}
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

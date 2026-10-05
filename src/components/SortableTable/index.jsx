import React from "react";
import { useState } from "react";

/**
 * Custom hook for managing table sorting state with secondary sort support
 * @param {string} initialSortBy - Initial sort column
 * @param {string} initialOrder - Initial sort order ("ascending" or "descending")
 * @returns {{ sort: object, previousSort: object, resort: function }} - Sort state, previous sort state, and resort function
 */
export function useSorting(initialSortBy, initialOrder = "ascending") {
  const [sort, setSort] = useState({ by: initialSortBy, order: initialOrder });
  const [previousSort, setPreviousSort] = useState(null);

  const resort = (by) => {
    setSort((prev) => {
      let order = "ascending";
      order = by === prev.by && order === prev.order ? "descending" : order;
      // Save previous sort state (but only if it's a different column)
      if (by !== prev.by) {
        setPreviousSort(prev);
      }
      return { by, order };
    });
  };

  return { sort, previousSort, resort };
}

/**
 * Sortable table header component
 * @param {string} sortKey - The key to sort by when clicked
 * @param {object} currentSort - Current sort state { by, order }
 * @param {function} onSort - Callback function when header is clicked
 * @param {object} styles - CSS module styles object
 * @param {object} style - Inline styles for the header
 * @param {React.ReactNode} children - Header content
 */
export function SortableHeader({ sortKey, currentSort, onSort, styles, style, children }) {
  const isActive = currentSort.by === sortKey;
  const className = isActive ? styles[currentSort.order] : undefined;

  return (
    <th
      style={{ cursor: "pointer", userSelect: "none", ...style }}
      className={className}
      onClick={() => onSort(sortKey)}
    >
      {children}
    </th>
  );
}

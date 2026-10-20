import React from "react";
import styles from "./Legend.module.css";

/**
 * LegendItem component that displays a single legend entry with a colored circle and label.
 */
function LegendItem({ colorClass, label }) {
  return (
    <div className={styles.legendItem}>
      <span className={`${styles.legendCircle} ${colorClass}`}></span>
      <span className={styles.legendLabel}>{label}</span>
    </div>
  );
}

/**
 * Legend component that displays the color coding for different node statuses
 * in the migration dependency graph.
 */
export default function Legend() {
  const items = [
    { colorClass: styles.legendSuccess, label: "CI Passing" },
    { colorClass: styles.legendDanger, label: "CI Failing" },
    { colorClass: styles.legendWarning, label: "Bot/Solver Error, Conflicts, or Status Unknown" },
    { colorClass: styles.legendAwaitingPr, label: "Awaiting PR" },
    { colorClass: styles.legendAwaitingParents, label: "Awaiting Parents" },
    { colorClass: styles.legendDashed, label: "Awaiting Parent in Another Migration" },
  ];

  return (
    <div className={`${styles.legend} ${styles.legendItems}`}>
      {items.map((item) => (
        <LegendItem key={item.label} colorClass={item.colorClass} label={item.label} />
      ))}
    </div>
  );
}

import React from "react";
import styles from "./GraphTooLargeWarning.module.css";

const LARGE_GRAPH_THRESHOLD = 1000;

/**
 * GraphTooLargeWarning component that warns users when the graph has too many nodes
 * to render efficiently. Provides options to continue anyway or hide completed nodes.
 */
export default function GraphTooLargeWarning({
  nodeCount,
  onConfirm,
  showDoneNodes,
  onHideDoneNodes,
}) {
  return (
    <div className={styles.warningContainer}>
      <div className={styles.warningContent}>
        <div className={styles.warningIcon}>⚠️</div>

        <h3>Large Graph Warning</h3>

        <p className={styles.warningText}>
          This graph contains <strong>{nodeCount.toLocaleString()} nodes</strong>.
          Rendering more than {LARGE_GRAPH_THRESHOLD.toLocaleString()} nodes may slow down your browser and affect performance.
        </p>

        <div className={styles.warningButtons}>
          <button
            onClick={onConfirm}
            className="button button--primary"
          >
            Continue Anyway
          </button>

          {showDoneNodes && (
            <button
              onClick={onHideDoneNodes}
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
  );
}

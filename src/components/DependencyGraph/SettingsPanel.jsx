import React from "react";
import styles from "./SettingsPanel.module.css";

/**
 * Dropdown component for selecting from a list of options.
 * Used for graph layout configuration (direction, ranker, alignment).
 */
function Dropdown({ id, label, value, onChange, options }) {
  return (
    <div>
      <label className={styles.settingLabel}>{label}</label>
      <select
        id={id}
        className={styles.settingSelect}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/**
 * SettingsPanel component provides controls for customizing the graph visualization.
 * Includes toggles for showing completed packages and options for graph layout settings.
 */
export default function SettingsPanel({
  showDoneNodes,
  onShowDoneNodesChange,
  graphDirection,
  onGraphDirectionChange,
  graphRanker,
  onGraphRankerChange,
  graphAlign,
  onGraphAlignChange,
}) {
  const directionOptions = [
    { value: "TB", label: "Top to Bottom" },
    { value: "BT", label: "Bottom to Top" },
    { value: "LR", label: "Left to Right" },
    { value: "RL", label: "Right to Left" },
  ];

  const rankerOptions = [
    { value: "network-simplex", label: "Network Simplex" },
    { value: "tight-tree", label: "Tight Tree" },
    { value: "longest-path", label: "Longest Path" },
  ];

  const alignOptions = [
    { value: "", label: "Center (default)" },
    { value: "UL", label: "Upper Left" },
    { value: "UR", label: "Upper Right" },
    { value: "DL", label: "Down Left" },
    { value: "DR", label: "Down Right" },
  ];

  return (
    <div className={styles.settingsPanel}>
      {/* Beginning of top-right settings panel */}

      {/* Toggle for showing completed packages */}
      <div className={styles.toggleContainer}>
        <label className={styles.toggleLabel}>
          <span>Include completed packages</span>
          <input
            type="checkbox"
            className={styles.toggleInput}
            checked={showDoneNodes}
            onChange={(e) => onShowDoneNodesChange(e.target.checked)}
          />
          <span className={styles.toggleSlider}></span>
        </label>
      </div>

      {/* Graph layout configuration grid */}
      <div className={styles.settingsGrid}>
        <Dropdown
          id="graph-direction"
          label="Direction"
          value={graphDirection}
          onChange={onGraphDirectionChange}
          options={directionOptions}
        />

        <Dropdown
          id="graph-ranker"
          label="Ranker"
          value={graphRanker}
          onChange={onGraphRankerChange}
          options={rankerOptions}
        />

        <Dropdown
          id="graph-align"
          label="Alignment"
          value={graphAlign}
          onChange={onGraphAlignChange}
          options={alignOptions}
        />
      </div>

      {/* End of top-right settings panel */}
    </div>
  );
}

import React from "react";
import styles from "./Toggle.module.css";

/**
 * iOS-style toggle switch component.
 */
export default function Toggle({ label, checked, onChange }) {
  return (
    <label className={styles.toggleLabel}>
      <span>{label}</span>
      <input
        type="checkbox"
        className={styles.toggleInput}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className={styles.toggleSlider}></span>
    </label>
  );
}

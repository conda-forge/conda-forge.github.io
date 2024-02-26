import React from "react";
import styles from "./styles.module.css";

export default function TOC() {
  return (
    <aside className={styles.status_dashboard_toc}>
      <ul>
        <li className="menu__list-item">
          <a className="menu__link" href="#repos">Repos and Bots</a>
        </li>
        <li className="menu__list-item">
          <a className="menu__link" href="#cloud">Cloud Services</a>
        </li>
        <li className="menu__list-item">
          <a className="menu__link" href="#migrations">Current Migrations</a>
        </li>
        <li className="menu__list-item">
          <a className="menu__link" href="#azure">Azure Pipelines Usage</a>
        </li>
        <li className="menu__list-item">
          <a className="menu__link" href="#github">GitHub Actions Usage</a>
        </li>
        <li className="menu__list-item">
          <a className="menu__link" href="#travis">Travis CI Usage</a>
        </li>
        <li className="menu__list-item">
          <a className="menu__link" href="#incidents">Incidents</a>
        </li>
        <li className="menu__list-item">
          <a className="menu__link" href="#version">Version Updates</a>
        </li>
      </ul>
    </aside>
  );
}

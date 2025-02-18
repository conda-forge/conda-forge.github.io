import React, { useEffect, useState } from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";
import { urls } from "../../constants";

export default function Stats() {
    const [stats, setStats] = useState(null);
    useEffect(() => {
        void (async () => {
          try {
            const now = new Date();
            const ts = `${now.getYear()}${now.getMonth()}${now.getDay()}${now.getHours()}`;
            const response = await fetch(`${urls.stats}?timestamp=${ts}`);
            const data = await response.json();
            setStats(data);
          } catch (error) {
            console.warn(`error loading about page stats`, error);
          }
        })();
      }, []);

    const stats1 = [
        {
            number: stats ? `${(stats.downloads.month / 1e9).toFixed(2)}B` : "",
            content: "Monthly downloads",
        },
        {
            number: stats ? `${(stats.downloads.all / 1e9).toFixed(1)}B` : "",
            content: "Overall Downloads",
        },
        {
            number: stats ? `${(stats.n_repos / 1e3).toFixed(1)}K` : "",
            content: "Feedstocks",
        },
        {
            number: stats ? `${(stats.n_packages / 1e3).toFixed(1)}K` : "",
            content: "Packages",
        },
    ];

    const stats2 = [
        {
            number: stats ? stats.n_members_core : "",
            content: "Core Developers",
        },
        {
            number: stats ? `${(stats.n_artifacts / 1e6).toFixed(1)}M` : "",
            content: "Artifacts",
        },
        {
            number: stats ? `${(stats.n_members / 1e3).toFixed(1)}K` : "",
            content: "Feedstock Maintainers",
        },
        {
            number: stats
                ? `${((stats.n_prs + stats.n_issues) / 1e3).toFixed(1)}K`
                : "",
            content: "Issues + PRs",
        },
    ];

    return (
        <div className={[styles.about, styles.section_padding].join(" ")}>
            <div className={styles.about_description}>
                <h1>About conda-forge</h1>
                <p>
                    <Link to="https://github.com/conda-forge">conda-forge</Link>{" "}
                    is a GitHub organization containing repositories of conda
                    recipes.
                </p>
            </div>
            <div className={styles.stats_container}>
                <div className={styles.stats1_card}>
                    {stats1.map(({ number, content }, index) => (
                        <Link key={index}
                            to="https://github.com/conda-forge/by-the-numbers">
                            <div className={styles.card}>
                                <h1 className="gradient_text">{number}</h1>
                                <h3>{content}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className={styles.stats2_card}>
                    {stats2.map(({ number, content }, index) => (
                        <Link key={index}
                            to="https://github.com/conda-forge/by-the-numbers">
                            <div className={styles.card}>
                                <h1 className="gradient_text">{number}</h1>
                                <h3>{content}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

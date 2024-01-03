import React, { useEffect, useState } from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

export default function Stats() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "https://raw.githubusercontent.com/conda-forge/by-the-numbers/main/data/live_counts.json"
                );
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const stats1 = [
        {
            number: stats ? `${(stats.downloads.month / 1e6).toFixed(0)}M` : "",
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
                        <Link to="https://github.com/conda-forge/by-the-numbers">
                            <div className={styles.card} key={index}>
                                <h1 className="gradient_text">{number}</h1>
                                <h3>{content}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className={styles.stats2_card}>
                    {stats2.map(({ number, content }, index) => (
                        <Link to="https://github.com/conda-forge/by-the-numbers">
                            <div className={styles.card} key={index}>
                                <h1 className="gradient_text">{number}</h1>
                                <h3>{content}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className={styles.about_video_description}>
                <p>
                    Learn more about conda-forge by reading our{" "}
                    <Link to="/docs">docs</Link> or watching the following
                    episode of{" "}
                    <Link to="https://www.quansight.com/open-source-directions">
                        Open Source Directions
                    </Link>
                    .
                </p>
            </div>
            <div className={styles.conda_forge_video}>
                <iframe
                    src="https://www.youtube.com/embed/EWh-BtdYE7M"
                    title="Episode 23: conda-forge - Open Source Directions hosted By Quansight"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                ></iframe>
            </div>
        </div>
    );
}

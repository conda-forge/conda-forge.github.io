import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Download from "@site/src/components/Download";

export default function Home() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            title={siteConfig.title}
            description="Download page for the conda-forge installer"
        >
            <main>
                <h1 style={{
                    marginTop: 10, textAlign: "center"
                }}>
                    Download the conda-forge Installer
                </h1>
                <Download />
            </main>
        </Layout>
    );
}

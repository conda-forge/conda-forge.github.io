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
            <div className="container margin-vert--lg" >
                <main>
                    <h1>
                        Download the conda-forge Installer
                    </h1>
                    <p>
                        Miniforge is a minimal installer for a conda-forge-based distribution, including conda, mamba, and their dependencies.
                    </p>
                    <p>
                        If more packages are needed, use the <code>conda install</code> or <code>mamba install</code> command to install from the thousands of packages available in the conda-forge distribution.
                    </p>
                <Download />
                </main>
            </div>
        </Layout>
    );
}

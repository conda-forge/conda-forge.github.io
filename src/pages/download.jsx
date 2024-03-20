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
                        If more packages are needed, use the <code>conda install</code> or <code>mamba install</code> command to install from the thousands of packages available in the conda-forge distribution. Isolated environments can be created with <code>conda create</code> or <code>mamba create</code>.
                    </p>
                    <Download />
                    <h1>
                        Installation
                    </h1>
                    <p>Basic installation instructions are available below. More detailed instructions are available <a href="https://github.com/conda-forge/miniforge/?tab=readme-ov-file#install">here</a>.</p>
                    <h2>
                        Unix-like platforms (Mac OS & Linux)
                    </h2>
                    <p>
                        Download the installer and run <code>bash Miniforge3-$(uname)-$(uname -m).sh</code>
                    </p>
                    <h2>
                        Windows
                    </h2>
                    <p>
                        Download and execute the Windows installer.
                    </p>
                </main>
            </div>
        </Layout>
    );
}

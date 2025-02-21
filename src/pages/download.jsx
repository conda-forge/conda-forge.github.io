import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Download from "@site/src/components/Download";

export default function Home() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            title={siteConfig.title}
            description="Download page for conda-forge installers"
        >
            <div className="container margin-vert--lg" >
                <main>
                    <h1>
                        Download the conda-forge Installer
                    </h1>
                    <p>
                       There are several conda-forge installers.
                    </p>
                    <h2>
                        Miniforge
                    </h2>
                    <p>
                        Miniforge is the preferred conda-forge installer.
                        It is used by the recommended scripts used for managing projects admitted into conda-forge.
                        Miniforge includes python, conda, mamba, micromamba, pip, and their dependencies.
                        It also configures the primary shell to be conda aware.
                        At present miniforge does not include pixi.
                    </p>
                    <p>
                        If more packages are needed, use the <code>conda install</code> or <code>mamba install</code> command
                        to install from the thousands of packages available in the conda-forge distribution.
                        Isolated environments can be created with <code>conda create</code> or <code>mamba create</code>.
                    </p>
                    <Download />
                    <h3>
                        Installation
                    </h3>
                    <p>Basic installation instructions are available below. 
                        More detailed instructions are available at 
                        <a href="https://github.com/conda-forge/miniforge" target="_blank">conda-forge/miniforge</a>.
                    </p>
                    <h4>
                        Unix-like platforms (Mac OS & Linux)
                    </h4>
                    <p>
                        Download the installer and run <code>bash Miniforge3-$(uname)-$(uname -m).sh</code>
                    </p>
                    <h4>
                        Windows
                    </h4>
                    <p>
                        Download and execute the Windows installer.
                    </p>
                    
                    <h2>
                        Pixi
                    </h2>
                    <p>
                        Pixi is also a conda-forge installer.
                        It is used by the recommended scripts used for managing projects admitted into conda-forge.
                        Pixi replaces conda, mamba, micromamba, pip, and their dependencies, and does not require python.
                        It also configures the primary shell to be conda aware.
                        At present miniforge does not include pixi.
                    </p>
                    <p>
                        Pixi-build is still under active development including its use as a conda-forge installer.
                        The conda-forge project will have a pixi.toml file which will describe all the depencencies.
                        The pixi.toml file may be updated manually or via pixi commands, like <code>pixi add</code>.
                        The pixi.toml also defines the targets for publication,
                        conda-forge is one candidate target.
                        Thousands of packages available in the conda-forge distribution and thousands more from pypi.
                        Isolated managed project environments can be created with <code>pixi init</code>.
                    </p>
                    <Download />
                    <h3>
                        Installation
                    </h3>
                    <p>Basic installation instructions are available below. 
                        More detailed instructions are available at 
                        <a href="https://pixi.sh/latest/#installation" target="_blank">pixi.sh</a>.
                    </p>
                    <h4>
                        Unix-like platforms (Mac OS & Linux)
                    </h4>
                    <p>
                        Download the installer and run <code>curl -fsSL https://pixi.sh/install.sh | bash</code>
                    </p>
                    <h4>
                        Windows
                    </h4>
                    <p>
                        Download the Windows installer and run <code>powershell -ExecutionPolicy ByPass -c "irm -useb https://pixi.sh/install.ps1 | iex"</code>.
                    </p>
                </main>
            </div>
        </Layout>
    );
}

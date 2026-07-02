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
                        Pixi replaces conda, mamba, micromamba, pip, and their dependencies, and does not require python.
                        It also configures the primary shell to be conda aware.
                        At present miniforge does not include pixi.
                    </p>
                    <p>
                        Pixi remains under active development.
                        As a conda-forge installer pixi is feature complete.
                        Thousands of packages available in the conda-forge distribution and thousands more from pypi.
                    </p>
                    <p>
                        A pixi project has a pixi.toml file in which its package dependencies are specified.
                        These packages are available from repositories of which conda-forge is one.
                        An isolated managed project environment is created with <code>pixi init</code>.
                        The pixi.toml file may be updated manually.
                        It may also be upded via pixi commands, using commands like <code>pixi add</code>.
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
                    <h3>
                        Publishing (under development)
                    </h3>
                    <p>
                        When developing a conda derived project it is likely that it will need to be published.
                        The pixi.toml can define targets for publication,
                        conda-forge is one such target.
                        When properly configured the package can be published with <code>pixi build</code>.
                    </p>
                </main>
            </div>
        </Layout>
    );
}

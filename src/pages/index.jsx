import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Header from "@site/src/components/Header";
import About from "@site/src/components/About";
import Contributing from "@site/src/components/Contributing";
import Supporters from "@site/src/components/Supporters";

export default function Home() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            title={siteConfig.title}
            description="Documentation for conda-forge infrastructure"
        >
            <main>
                <Header />
                <About />
                <Contributing />
                <Supporters />
            </main>
        </Layout>
    );
}

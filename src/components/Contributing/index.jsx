import React from "react";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";

const contributing = [
    {
        Svg: require("@site/static/img/contributing/edit.svg").default,
        alt: "GitHub edit pen tool icon",
        title: "Update A Package",
        href: "/docs",
        content:
            "Edit the recipe as desired. You may even consider adding yourself as a recipe maintainer.",
        width: 50,
    },
    {
        Svg: require("@site/static/img/contributing/issue.svg").default,
        alt: "GitHub issue icon",
        title: "Report An Issue",
        href: "https://github.com/conda-forge/conda-forge.github.io/issues",
        content:
            "Take a look to see if the issue has already been raised on the issue tracker.",
        width: 50,
    },
    {
        Svg: require("@site/static/img/contributing/pr.svg").default,
        alt: "GitHub pull request icon",
        title: "Add A Recipe",
        href: "https://github.com/conda-forge/staged-recipes",
        content:
            'Contribute a new conda recipe in a "recipes/[your-package-name]" directory in staged-recipes.',
        width: 50,
    },
    {
        Svg: require("@site/static/img/contributing/help.svg").default,
        alt: "Question mark icon",
        title: "Ask For Help",
        href: "https://app.element.io/#/room/#conda-forge:matrix.org",
        content: (
            <>
                Join the{" "}
                <a
                    href="https://app.element.io/#/room/#conda-forge:matrix.org"
                    target="_blank"
                    rel="noreferrer"
                >
                    {" "}
                    conda-forge community{" "}
                </a>{" "}
                on Element and reach out for assistance whenever needed.
            </>
        ),
        width: 50,
    },
];

export default function Contributing() {
    return (
        <div
            className={[styles.contributing, styles.section_padding].join(" ")}
        >
            <div className={styles.contributing_conda_forge}>
                <h1>Contributing to conda-forge</h1>
                <p>For a package on conda-forge, I want to ...</p>
            </div>
            {contributing.map(({ Svg, alt, title, href, content, width }, index) => (
                <Link to={href} className={styles.linked_card}>
                    <div
                        className={styles.contributing_conda_forge_card}
                        key={index}
                        >
                        <Svg width={width} alt={alt} role="img" />
                        <h3>{title}</h3>
                        <p>{content}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

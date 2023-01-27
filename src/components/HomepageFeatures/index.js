import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "Open",
    Svg: require("@site/static/img/logo.svg").default,
    description: <>conda-forge is built in the open.</>,
  },
  {
    title: "Transparent",
    Svg: require("@site/static/img/logo.svg").default,
    description: <>All the logs and processes are publicly available.</>,
  },
  {
    title: "Reproducible",
    Svg: require("@site/static/img/logo.svg").default,
    description: <>Packages are never deleted.</>,
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className="{styles.featureSvg}" role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

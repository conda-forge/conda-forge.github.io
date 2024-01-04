import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import ThemedImage from "@theme/ThemedImage";
import styles from "./styles.module.css";

/* data of supporters */
const financial = [
  {
    name: "Nvidia",
    link: "https://www.nvidia.com/",
    light: "img/supporters/nvidia_light.svg",
    dark: "img/supporters/nvidia_dark.svg",
    width: 250,
  },
];

const infrastructure = [
  {
    name: "Anaconda",
    link: "https://www.anaconda.com/",
    light: "img/supporters/anaconda_light.svg",
    dark: "img/supporters/anaconda_dark.svg",
    width: 250,
  },
  {
    name: "Azure Pipelines",
    link: "https://azure.microsoft.com/products/devops/",
    light: "img/supporters/azure.png",
    dark: "img/supporters/azure.png",
    width: 250,
  },
  {
    name: "Cirun",
    link: "https://cirun.io",
    light: "img/supporters/cirun_light.svg",
    dark: "img/supporters/cirun_dark.svg",
    width: 200,
  },
  {
    name: "Digital Ocean",
    link: "https://www.digitalocean.com/",
    light: "img/supporters/do_light.svg",
    dark: "img/supporters/do_dark.svg",
    width: 250,
  },
  {
    name: "Github",
    link: "https://github.com",
    light: "img/supporters/github_light.png",
    dark: "img/supporters/github_dark.png",
    width: 150,
  },
  {
    name: "Oracle Cloud",
    link: "https://www.oracle.com/cloud/",
    light: "img/supporters/oracle_light.svg",
    dark: "img/supporters/oracle_dark.svg",
    width: 180,
  },
  {
    name: "Open Source Lab",
    link: "https://osuosl.org/",
    light: "img/supporters/osl_light.svg",
    dark: "img/supporters/osl_dark.svg",
    width: 150,
  },
  {
    name: "OVHcloud",
    link: "https://www.ovhcloud.com/",
    light: "img/supporters/ovh_light.svg",
    dark: "img/supporters/ovh_dark.svg",
    width: 220,
  },
  {
    name: "Quansight",
    link: "https://www.quansight.com/",
    light: "img/supporters/quansight_light.svg",
    dark: "img/supporters/quansight_dark.svg",
    width: 80,
  },
  {
    name: "Travis CI",
    link: "https://www.travis-ci.com/",
    light: "img/supporters/travis_light.png",
    dark: "img/supporters/travis_dark.png",
    width: 200,
  },
];

const developer = [
  {
    name: "Anaconda",
    link: "https://www.anaconda.com/",
    light: "img/supporters/anaconda_light.svg",
    dark: "img/supporters/anaconda_dark.svg",
    width: 250,
  },
  {
    name: "IOOS Integrated Ocean Observing System",
    link: "https://ioos.noaa.gov/",
    light: "img/supporters/ioos.png",
    dark: "img/supporters/ioos.png",
    width: 150,
  },
  {
    name: "Nvidia",
    link: "https://www.nvidia.com/",
    light: "img/supporters/nvidia_light.svg",
    dark: "img/supporters/nvidia_dark.svg",
    width: 250,
  },
  {
    name: "Voltron Data",
    link: "https://voltrondata.com/",
    light: "img/supporters/voltron_light.svg",
    dark: "img/supporters/voltron_dark.svg",
    width: 250,
  },
  {
    name: "Quansight Labs",
    link: "https://labs.quansight.org/",
    light: "img/supporters/quansightlabs_light.svg",
    dark: "img/supporters/quansightlabs_dark.svg",
    width: 250,
  },
  {
    name: "QuantStack",
    link: "https://quantstack.net/",
    light: "img/supporters/quantstack_light.svg",
    dark: "img/supporters/quantstack_dark.svg",
    width: 250,
  },
];

export default function Supporters() {
  return (
    <div className={[styles.supporters, styles.section_padding].join(" ")}>
      <div className={styles.supporters_conda_forge}>
        <h1>Supporters</h1>
        <p>
          If you like conda-forge and want to support our mission, please
          consider making a{" "}
          <Link to="https://opencollective.com/conda-forge">donation</Link> to
          support our efforts.
        </p>
      </div>
      <div className={styles.fiscal_sponsor}>
        <Link to="https://numfocus.org/">
          <div className={styles.numfocus_card}>
            <ThemedImage
              className={styles.image}
              alt="NumFOCUS Logo"
              sources={{
                light: useBaseUrl("/img/supporters/numfocus.svg"),
                dark: useBaseUrl("/img/supporters/numfocus.svg"),
              }}
              width="100%"
            />
          </div>
        </Link>
        <div className={styles.about_numfocus}>
          <h3>
            conda-forge is a{" "}
            <span className="gradient_text">fiscally sponsored</span> project of
            NumFOCUS.
          </h3>
          <p>
            A nonprofit dedicated to supporting the open source scientific
            computing community.
          </p>
        </div>
      </div>
      <div className={styles.other_supporters}>
        <div className={styles.supporters_card}>
          <div className={styles.supporters_conda_forge}>
            <h2>
              <span className="gradient_text">Financial</span> Support
            </h2>
          </div>
          <div className={styles.card}>
            {financial.map(({ name, link, light, dark, width }, index) => (
              <Link to={link}>
                <div className={styles.cardWrapper} key={index}>
                  <ThemedImage
                    className={styles.image}
                    alt={`${name} logo`}
                    title={`Go to ${name}'s website`}
                    sources={{
                      light: useBaseUrl(`${light}`),
                      dark: useBaseUrl(`${dark}`),
                    }}
                    width={width}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.supporters_card}>
          <div className={styles.supporters_conda_forge}>
            <h2>
              <span className="gradient_text">Infrastructure</span> Support
            </h2>
          </div>
          <div className={styles.card}>
            {infrastructure.map(({ name, link, light, dark, width }, index) => (
              <Link to={link}>
                <div className={styles.cardWrapper} key={index}>
                  <ThemedImage
                    className={styles.image}
                    alt={`${name} logo`}
                    title={`Go to ${name}'s website`}
                    sources={{
                      light: useBaseUrl(`${light}`),
                      dark: useBaseUrl(`${dark}`),
                    }}
                    width={width}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.supporters_card}>
          <div className={styles.supporters_conda_forge}>
            <h2>
              <span className="gradient_text">Developer</span> Support
            </h2>
          </div>
          <div className={styles.card}>
            {developer.map(({ name, link, light, dark, width }, index) => (
              <Link to={link}>
                <div className={styles.cardWrapper} key={index}>
                  <ThemedImage
                    className={styles.image}
                    alt={`${name} logo`}
                    title={`Go to ${name}'s website`}
                    sources={{
                      light: useBaseUrl(`${light}`),
                      dark: useBaseUrl(`${dark}`),
                    }}
                    width={width}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

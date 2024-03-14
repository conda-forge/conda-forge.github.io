import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";
import ThemedImage from "@theme/ThemedImage";
import React from "react";
import styles from "./styles.module.css";

export default function Download() {
  const downloads = [
      {
          arch: "arm64 (Apple Silicon)",
          dark: "img/download/apple.svg",
          href: "https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-MacOSX-arm64.sh",
          light: "img/download/apple.svg",
          os: "macOS",
      },
      {
          arch: "x86_64 (Intel)",
          dark: "img/download/apple.svg",
          href: "https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-MacOSX-x86_64.sh",
          light: "img/download/apple.svg",
          os: "macOS",
      },
      {
          arch: "x86_64 (amd64)",
          dark: "img/download/linux.svg",
          href: "https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Linux-x86_64.sh",
          light: "img/download/linux.svg",
          os: "Linux",
      },
      {
          arch: "aarch64 (arm64)",
          dark: "img/download/linux.svg",
          href: "https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Linux-aarch64.sh",
          light: "img/download/linux.svg",
          os: "Linux",
      },
      {
          arch: "ppc64le (POWER8/9)",
          dark: "img/download/linux.svg",
          href: "https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Linux-ppc64le.sh",
          light: "img/download/linux.svg",
          os: "Linux",
      },
      {
          arch: "x86_64",
          dark: "img/download/windows.svg",
          href: "https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Windows-x86_64.exe",
          light: "img/download/windows.svg",
          os: "Windows",
      }
  ];
  return (
    <div className={[styles.header, styles.section_padding].join(" ")}>
        <div className={styles.header_image}>
            <ThemedImage
                alt="3D-Anvil illustration for conda-forge"
                sources={{
                  light: useBaseUrl("/img/anvil-light.svg"),
                  dark: useBaseUrl("/img/anvil-dark.svg"),
                }}
            />
        </div>
        <div className={styles.header_content}>
          {downloads.map(({ arch, dark, href, light, os }, index) => (
            <Link to={href} key={index}>
                <div className={styles.cardWrapper}>
                  <div className={styles.card}>
                    <ThemedImage
                      className={styles.os_image}
                      alt={`${os} logo`}
                      title={`Download miniforge installer for ${os} ${arch}`}
                      sources={{
                        dark: useBaseUrl(`${dark}`),
                        light: useBaseUrl(`${light}`),
                      }}
                      height={75}
                      style={{ paddingRight: 20 }}
                  />
                  <div>
                      <p className={styles.os}>{os}</p>
                      <code className={styles.arch}>{arch}</code>
                  </div>
                  </div>
                </div>
            </Link>
          ))}
        </div>
    </div>
  );
}

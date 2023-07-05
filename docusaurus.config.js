// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const editUrl = {
  editUrl: "https://github.com/quansight-labs/cf-infra-docs/tree/main/",
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "🚧 cf-infra-docs 🚧",
  tagline: "Draft documentation for conda-forge infrastructure",
  url: "https://cf-infra-docs.netlify.app/",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  // Temporarily using Twitter's emoji for construction
  // Copyright 2020 Twitter, Inc and other contributors, CC-BY 4.0
  favicon: "img/construction.png",
  trailingSlash: true,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "Quansight-Labs", // Usually your GitHub org/user name.
  projectName: "cf-infra-docs", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  // Mermaid configuration
  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          breadcrumbs: true,
          ...editUrl,
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  plugins: [
    [
      "content-docs",
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: "community",
        path: "community",
        routeBasePath: "/community",
        breadcrumbs: false,
      }),
    ],
    [
      "content-blog",
      /** @type {import('@docusaurus/plugin-content-blog').Options} */
      ({
        id: "news",
        path: "news",
        routeBasePath: "/news",
        showReadingTime: false,
        blogSidebarTitle: "Latest news",
        blogSidebarCount: 20,
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "cf-infra-docs (WIP)",
        logo: {
          alt: "Under construction",
          src: "img/construction.png",
        },
        items: [
          {
            type: "doc",
            docId: "index",
            position: "left",
            label: "Docs",
          },
          {
            type: "doc",
            docsPluginId: "community",
            docId: "index",
            position: "left",
            label: "Community",
          },
          {
            to: "/blog",
            label: "Blog",
            position: "left",
          },
          {
            to: "/news",
            label: "News",
            position: "left",
          },
          {
            href: "https://conda-forge.org/status",
            label: "Status",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Getting started",
                to: "/docs/getting-started",
              },
              {
                label: "How-to guides",
                to: "/docs/howto",
              },
              {
                label: "Reference",
                to: "/docs/reference",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "About conda-forge",
                to: "/community",
              },
              {
                label: "Code of conduct",
                to: "/community/code-of-conduct",
              },
              {
                label: "Meeting minutes",
                to: "/community/meeting-minutes",
              },
              {
                label: "Get in touch",
                to: "/community/get-in-touch",
              },
            ],
          },
          {
            title: "Stay up-to-date",
            items: [
              {
                label: "News",
                to: "/news",
              },
              {
                label: "Blog",
                to: "/blog",
              },
              {
                label: "Status",
                href: "https://conda-forge.org/status",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/condaforge",
              },
            ],
          },
          {
            title: "Resources",
            items: [
              {
                label: "Dashboard",
                to: "/dashboard",
              },
              {
                label: "GitHub",
                href: "https://github.com/conda-forge",
              },
              {
                label: "Element",
                href: "https://app.element.io/#/room/#conda-forge:matrix.org",
              },
              {
                label: "Discourse",
                href: "https://conda.discourse.group/c/pkg-building/conda-forge/25",
              },
              {
                label: "Stack Overflow",
                href: "https://stackoverflow.com/questions/tagged/conda-forge",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} conda-forge · Built with Docusaurus · Powered by <a href='https://www.netlify.com/' target='_blank' class='footer__link-item'>Netlify</a>`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
          hideable: true,
        },
      },
    }),
};

module.exports = config;

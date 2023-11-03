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
  favicon: "img/favicon.ico",
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

  stylesheets: [
    //Add Font Awesome stylesheets
    "/fonts/font-awesome/fontawesome.css",
    "/fonts/font-awesome/solid.css",
    "/fonts/font-awesome/regular.css",
    "/fonts/font-awesome/brands.css",
  ],

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
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            from: "/blog/posts/2019-12-06-cfep09/",
            to: "/blog/2019/12/06/cfep09/",
          },
          {
            from: "/blog/posts/2020-02-04-gsoc/",
            to: "/blog/2020/02/04/gsoc/",
          },
          {
            from: "/blog/posts/2020-03-05-grayskull/",
            to: "/blog/2020/03/05/grayskull/",
          },
          {
            from: "/blog/posts/2020-03-10-pypy/",
            to: "/blog/2020/03/10/pypy/",
          },
          {
            from: "/blog/posts/2020-07-02-op-risk/",
            to: "/blog/2020/07/02/op-risk/",
          },
          {
            from: "/blog/posts/2020-07-06-scipy-bof/",
            to: "/blog/2020/07/06/scipy-bof/",
          },
          {
            from: "/blog/posts/2020-07-11-r-4/",
            to: "/blog/2020/07/11/r-4/",
          },
          {
            from: "/blog/posts/2020-10-02-versions/",
            to: "/blog/2020/10/02/versions/",
          },
          {
            from: "/blog/posts/2020-10-29-macos-arm64/",
            to: "/blog/2020/10/29/macos-arm64/",
          },
          {
            from: "/blog/posts/2020-11-20-anaconda-tos/",
            to: "/blog/2020/11/20/anaconda-tos/",
          },
          {
            from: "/blog/posts/2020-12-26-year-in-review/",
            to: "/blog/2020/12/26/year-in-review/",
          },
          {
            from: "/blog/posts/2021-02-02-outreachy/",
            to: "/blog/2021/02/02/outreachy/",
          },
          {
            from: "/blog/posts/2021-06-16-graykull-step-by-step/",
            to: "/blog/2021/06/16/graykull-step-by-step/",
          },
          {
            from: "/blog/posts/2021-09-24-travis-security/",
            to: "/blog/2021/09/24/travis-security/",
          },
          {
            from: "/blog/posts/2021-11-03-tensorflow-gpu/",
            to: "/blog/2021/11/03/tensorflow-gpu/",
          },
          {
            from: [
              "/blog/posts/2022-08-19-outreachy-wrap-up-blog-2022/",
              "/blog/2022/08/19/outreachy-wrap-up-blog-2022/",
            ],
            to: "/blog/2022/08/26/outreachy-wrap-up-blog-2022/",
          },
          {
            from: "/blog/posts/2023-03-12-circle-ci-security-breach/",
            to: "/blog/2023/03/12/circle-ci-security-breach/",
          },
          {
            from: "/blog/posts/2023-07-13-installer-security-fixes/",
            to: "/blog/2023/07/13/installer-security-fixes/",
          },
        ],
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        logo: {
          alt: "conda-forge anvil logo without text",
          src: "img/logo.png",
        },
        items: [
          {
            href: "https://conda-forge.org/status",
            label: "Status",
            position: "left",
          },
          {
            href: "https://conda-forge.org/feedstock-outputs",
            label: "Packages",
            position: "left",
          },
          {
            to: "/news",
            label: "News",
            position: "left",
          },
          {
            type: "doc",
            docId: "index",
            position: "left",
            label: "Docs",
          },
          {
            to: "/blog",
            label: "Blog",
            position: "left",
          },
          {
            type: "doc",
            docsPluginId: "community",
            docId: "index",
            position: "left",
            label: "Community",
          },
          {
            href: "https://opencollective.com/conda-forge",
            label: "Donate",
            position: "right",
          },
          {
            to: "https://github.com/conda-forge",
            title: "GitHub",
            position: "right",
            target: "_blank",
            className: "fab fa-lg fa-github",
          },
          {
            to: "https://twitter.com/condaforge",
            title: "Twitter",
            position: "right",
            target: "_blank",
            className: "fab fa-lg fa-twitter",
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
                label: "Style guide",
                to: "/style-guide",
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

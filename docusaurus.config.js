// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const path = require("path");
const prism = require("prism-react-renderer");

const _repo = process.env.GHREPO || "conda-forge/conda-forge.github.io";
const _branch = process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF || "main";
const editUrl = {
  editUrl: `https://github.com/${_repo}/tree/${_branch}/`,
};

var copyright = `Copyright © ${new Date().getFullYear()} conda-forge · Built with Docusaurus`;
if (process.env.NETLIFY) {
  copyright += ` · Deployed on <a href="https://www.netlify.com/" target="_blank">Netlify</a>`;
}

const goatcounter = {
  // see stats at https://conda-forge.goatcounter.com/
  src: "/js/count.js",
  defer: true,
  "data-goatcounter": "https://conda-forge.goatcounter.com/count",
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "conda-forge | community-driven packaging for conda",
  url: "https://conda-forge.org/",
  baseUrl: "/",
  onBrokenLinks: process.env.GITHUB_ACTIONS ? "throw" : "warn",
  onBrokenMarkdownLinks: process.env.GITHUB_ACTIONS ? "throw" : "warn",
  onBrokenAnchors: process.env.GITHUB_ACTIONS ? "throw" : "warn",
  favicon: "img/favicon.ico",
  trailingSlash: true,
  staticDirectories: ["static"],

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "conda-forge", // Usually your GitHub org/user name.
  projectName: "conda-forge.github.io", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  stylesheets: [
    {
      href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css",
      type: "text/css",
    },
  ],

  scripts: [
    // Only deploy stats on production site, not locally or on Netlify
    ...(process.env.GITHUB_ACTIONS ? [goatcounter] : []),
  ],

  // Mermaid configuration
  markdown: {
    mermaid: true,
    format: "detect",
  },
  themes: ["@docusaurus/theme-mermaid"],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          breadcrumbs: true,
          showLastUpdateTime: true,
          sidebarPath: "./docs/_sidebar.js",
          ...editUrl,
        },
        blog: {
          showReadingTime: true,
          blogSidebarCount: 10,
          onInlineAuthors: "ignore",
          ...editUrl,
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
        showLastUpdateTime: true,
        sidebarPath: "./community/_sidebar.js",
        async sidebarItemsGenerator({ defaultSidebarItemsGenerator, ...args }) {
          // This function takes the contents of sidebarPath, and will return
          // only the entries that had to be autogenerated (i.e. meeting minutes)
          // We reverse them and return them
          var sidebarItems = await defaultSidebarItemsGenerator(args);
          return sidebarItems.reverse();
        },
        ...editUrl,
      }),
    ],
    [
      "content-blog",
      /** @type {import('@docusaurus/plugin-content-blog').Options} */
      {
        id: "news",
        path: "./news",
        routeBasePath: "news",
        showReadingTime: false,
        blogSidebarTitle: "Latest announcements",
        blogSidebarCount: 10 /* This can be set to 'ALL' if needed */,
        postsPerPage: 10 /* This can be set to 'ALL' if needed */,
        onUntruncatedBlogPosts: "ignore",
      },
    ],
    [
      "@docusaurus/plugin-client-redirects",
      {
        fromExtensions: ["html", "htm"],
        createRedirects(existingPath) {
          var redirects = [];
          if (existingPath.startsWith("/blog/tags/")) {
            redirects.push(`/blog/blog/tag/${existingPath.slice(11)}`);
          }
          if (existingPath === "/blog/archive/") {
            redirects.push("/blog/2023/");
            redirects.push("/blog/2022/");
            redirects.push("/blog/2021/");
            redirects.push("/blog/2020/");
            redirects.push("/blog/2019/");
          }
          if (
            existingPath.startsWith("/community/minutes/") &&
            existingPath.length > 19
          ) {
            redirects.push(`/docs/orga/minutes/${existingPath.slice(19)}`);
            redirects.push(
              `/docs/orga/minutes/${existingPath.slice(19, -1)}.html`,
            );
          }
          if (
            ["/docs/", "/docs/user/", "/docs/maintainer/"].includes(
              existingPath,
            )
          ) {
            redirects.push(`${existingPath}00_intro.html`);
          }
          return redirects;
        },
        redirects: [
          {
            from: "/feedstock-outputs",
            to: "/packages/",
          },
          /* Blog redirects */
          {
            from: "/blog/blog/",
            to: "/blog/",
          },
          {
            from: "/blog/posts/2019-12-06-cfep09/",
            to: "/blog/2019/12/06/cfep09/",
          },
          {
            from: "/blog/posts/2020-02-04-GSoC/",
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
            from: "/blog/posts/2020-07-11-R-4/",
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
            // case sensitive only on Linux!
            from: [
              "/blog/posts/2021-02-02-outreachy/",
              ...(process.platform === "linux"
                ? ["/blog/posts/2021-02-02-Outreachy/"]
                : []),
            ],
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
          {
            from: "/news/2024/04/09/clang-everywhere/",
            to: "/news/2024/04/30/clang-everywhere/",
          },
          {
            from: "/news/2025/05/16/new-ubuntu-base-for-miniforge-docker-images/",
            to: "/news/2025/04/17/new-ubuntu-base-for-miniforge-docker-images/",
          },
          /* Docs redirects */
          {
            from: "/docs/user/announcements.html",
            to: "/announcements/",
          },
          {
            from: "/docs/misc/",
            to: "/docs/glossary/",
          },
          /* Orga to community redirects */
          {
            from: ["/docs/orga/", "/docs/orga/00_intro.html"],
            to: "/community/",
          },
          {
            from: [
              "/docs/orga/guidelines.html",
              "/docs/orga/guidelines/00_intro.html",
            ],
            to: "/docs/maintainer/guidelines/",
          },
          {
            from: [
              "/docs/orga/governance.html",
              "/docs/orga/governance/00_intro.html",
            ],
            to: "/community/governance/",
          },
          {
            from: [
              "/docs/orga/subteams.html",
              "/docs/orga/subteams/00_intro.html",
            ],
            to: "/community/subteams/",
          },
          {
            from: [
              "/docs/orga/joining-the-team.html",
              "/docs/orga/joining-the-team/00_intro.html",
            ],
            to: "/community/joining-the-team/",
          },
          {
            from: [
              "/docs/orga/cfep-index.html",
              "/docs/orga/cfep-index/00_intro.html",
            ],
            to: "/community/cfep/",
          },
          {
            from: [
              "/docs/orga/getting-in-touch.html",
              "/docs/orga/getting-in-touch/00_intro.html",
            ],
            to: "/community/getting-in-touch/",
          },
          {
            from: ["/docs/contracting.html", "/docs/contracting/00_intro.html"],
            to: "/community/contracting/",
          },
          {
            from: ["/docs/orga/funding/", "/docs/orga/funding/00_intro.html"],
            to: "/community/funding/",
          },
          {
            from: ["/docs/orga/minutes/", "/docs/orga/minutes/00_intro.html"],
            to: "/community/minutes/",
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
            to: "/docs/",
            label: "Docs",
            position: "left",
          },
          {
            to: "/community/",
            label: "Community",
            position: "left",
          },
          {
            to: "/news/",
            label: "News",
            position: "left",
          },
          {
            to: "/blog/",
            label: "Blog",
            position: "left",
          },
          {
            href: "/status/",
            label: "Status",
            position: "left",
          },
          {
            to: "/packages/",
            label: "Packages",
            position: "left",
          },
          {
            href: "/download",
            label: "Download",
            position: "left",
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
            to: "https://conda-forge.zulipchat.com",
            title: "Zulip",
            position: "right",
            target: "_blank",
            className: "fa-solid fa-comments",
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
                to: "/docs/",
              },
              {
                label: "User docs",
                to: "/docs/user/",
              },
              {
                label: "Maintainer docs",
                to: "/docs/maintainer/",
              },
              {
                label: "CFEPs",
                to: "/community/cfep/",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "About conda-forge",
                to: "/community/",
              },
              {
                label: "Governance",
                to: "/community/governance/",
              },
              {
                label: "Meeting minutes",
                to: "/community/minutes/",
              },
              {
                label: "Get in touch",
                to: "/community/getting-in-touch/",
              },
            ],
          },
          {
            title: "Stay up-to-date",
            items: [
              {
                label: "News",
                to: "/news/archive/",
              },
              {
                label: "Blog",
                to: "/blog/archive/",
              },
              {
                label: "Status",
                href: "/status/",
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
                label: "Status",
                to: "/status/",
              },
              {
                label: "Style guide",
                to: "/style-guide/",
              },
              {
                label: "GitHub",
                href: "https://github.com/conda-forge",
              },
              {
                label: "Zulip",
                href: "https://conda-forge.zulipchat.com",
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
        copyright: copyright,
      },
      prism: {
        theme: prism.themes.github,
        darkTheme: prism.themes.dracula,
        additionalLanguages: [
          "bash",
          "diff",
          "json",
          "batch",
          "yaml",
          "python",
          "markdown",
          "shell-session",
        ],
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
          hideable: true,
        },
      },
      // search bar engine
      algolia: {
        appId: "KB43FQOB7U",
        apiKey: "344261a16fe108b599568222ae1b2e64",
        indexName: "conda-forge",
        insights: false,
        contextualSearch: true,
      },
      mermaid: {
        theme: { light: "base", dark: "base" },
        options: {
          themeVariables: {
            // Here, we set mermaid theme variables, mostly for color and fonts.
            // Due to the way that mermaid derives colors from other colors,
            // currently not all variables can be used with the infima variables.
            // Those that cannot be set in this way are commented out and marked with !!.
            // A good reference for the available infima variables (in lieu of documentation) is
            // https://github.com/facebookincubator/infima/blob/main/packages/core/styles/common/variables.pcss
            // General variables
            // darkMode: set by docusaurus
            // !! background: "var(--ifm-background-color)",
            fontFamily: "var(--ifm-font-content-family)",
            // fontSize
            // !! primaryColor: "var(--ifm-color-primary-contrast-background)",
            // !! primaryTextColor: "var(--ifm-color-primary-contrast-background)",
            // secondaryColor
            primaryBorderColor: "var(--ifm-color-primary-contrast-foreground)",
            secondaryBorderColor:
              "var(--ifm-color-secondary-contrast-foreground)",
            secondaryTextColor: "var(--ifm-color-content)",
            // tertiaryColor
            // tertiaryBorderColor
            // tertiaryTextColor
            // From the following three lines about notes, the first (bkg), does not work.
            // Consequently, we also leave the second alone because it would lead to poor contrast.
            // !! noteBkgColor: "var(--ifm-color-primary-contrast-background)",
            // noteTextColor: "var(--ifm-color-content)",
            noteBorderColor: "var(--ifm-color-secondary-contrast-foreground)",
            // !! lineColor: "var(--ifm-color-primary-contrast-foreground)",
            textColor: "var(--ifm-color-content)",
            // !! mainBkg: "var(--ifm-color-primary-contrast-background)",
            errorBkgColor: "var(--ifm-color-danger-contrast-background)",
            // errorTextColor
            //primaryColor: "#b2dfdb",
            // Sequence diagram variables
            actorBkg: "var(--ifm-color-primary-contrast-background)",
            actorTextColor: "var(--ifm-color-content)",
            // The following will work only with the next mermaid release,
            // c.f. https://github.com/mermaid-js/mermaid/pull/5338
            actorLineColor: "var(--ifm-color-content)",
            labelBoxBkgColor: "var(--ifm-color-primary-contrast-background)",
          },
        },
      },
    }),
};

module.exports = config;

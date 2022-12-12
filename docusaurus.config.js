// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const editUrl = {
  editUrl:
    'https://github.com/quansight-labs/czi-cf-docs/tree/main/',
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'czi-cf-docs',
  tagline: 'Supporting docs for the CZI EOSS5 grant for conda-forge',
  url: 'https://czi-cf-docs.netlify.app/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/logo.png',
  trailingSlash: true,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'conda-forge', // Usually your GitHub org/user name.
  projectName: 'conda-forge.github.io', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          ...editUrl,
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  plugins: [
    [
      'content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: 'community',
        path: 'community',
        routeBasePath: '/community',
      }),
    ],
    [
      'content-blog',
      /** @type {import('@docusaurus/plugin-content-blog').Options} */
      ({
        id: 'news',
        path: 'news',
        routeBasePath: '/news',
        showReadingTime: false,
        blogSidebarTitle: 'Latest news',
        blogSidebarCount: 20,
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'conda-forge',
        logo: {
          alt: 'The conda-forge anvil',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'doc',
            docsPluginId: 'community',
            docId: 'index',
            position: 'left',
            label: 'Community',
          },
          {
            type: 'doc',
            docId: 'index',
            position: 'left',
            label: 'Docs',
          },
          {
            to: '/blog', 
            label: 'Blog', 
            position: 'right',
          },
          {
            to: '/news', 
            label: 'News', 
            position: 'right',
          },
          {
            href: 'https://github.com/quansight-labs/czi-cf-docs',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting started',
                to: '/docs/user',
              },
              {
                label: 'Maintainers',
                to: '/docs/maintainer',
              },
              {
                label: 'Organisation',
                to: '/docs/organisation',
              },
              {
                label: 'Infrastructure',
                to: '/docs/infra',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'About conda-forge',
                to: '/community',
              },
              {
                label: 'Code of conduct',
                to: '/community/code-of-conduct',
              },
              {
                label: 'Meeting minutes',
                to: '/community/meeting-minutes',
              },
              {
                label: 'Get in touch',
                to: '/community/get-in-touch',
              },
            ],
          },
          {
            title: 'Stay updated',
            items: [
              {
                label: 'News',
                to: '/news',
              },
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'Dashboard',
                to: '/dashboard',
              },
              {
                label: 'Status Panel',
                href: 'https://conda-forge.org/status',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Gitter',
                href: 'https://gitter.im/conda-forge/conda-forge.github.io',
              },
              {
                label: 'Discourse',
                href: 'https://conda.discourse.group/c/pkg-building/conda-forge/25',
              },
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/conda-forge',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/condaforge',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/conda-forge',
              },
              {
                label: 'Anaconda.org',
                href: 'https://anaconda.org/conda-forge',
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
    }),
};

module.exports = config;

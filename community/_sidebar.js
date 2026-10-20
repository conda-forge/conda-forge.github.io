// See https://docusaurus.io/docs/sidebar
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const fs = require("fs");
const sidebars = {
  community: JSON.parse(fs.readFileSync(`${__dirname}/_sidebar.json`)),
};

export default sidebars;

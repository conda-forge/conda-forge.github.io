// See https://docusaurus.io/docs/sidebar
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const fs = require("fs");
const sidebars = {
  docs: JSON.parse(fs.readFileSync(`${__dirname}/_sidebar.json`)),
  diataxis: JSON.parse(fs.readFileSync(`${__dirname}/_sidebar_diataxis.json`)),
};

export default sidebars;

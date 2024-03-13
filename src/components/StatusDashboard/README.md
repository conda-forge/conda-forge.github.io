# Status Dashboard Overview

The conda-forge status dashboard is integrated into the Docusaurus application that hosts conda-forge's documentation. Its main entry point is [`/src/pages/status/index.jsx`](/src/pages/status/index.jsx), which is a very thin wrapper that loads the root-level `<StatusDashboard>` React component (which is defined in [`index.jsx`](index.jsx)) from the same directory that holds this `README`.

## Top-level `<StatusDashboard>` components

There are 8 informational top-level components in the status dashboard and 1 navigational (table of contents) top-level component:

### Informational components
- `<ReposAndBots>` – [`repos_and_bots.jsx`](repos_and_bots.jsx)
- `<CloudServices>` – [`cloud_services.jsx`](cloud_services.jsx)
- `<CurrentMigrations>` – [`current_migrations.jsx`](current_migrations.jsx)
- `<UsageChart>` – [`usage_chart.jsx`](usage_chart.jsx), used to render:
  - Azure Pipelines chart
  - GitHub Actions chart
  - Travis CI chart
- `<Incidents>` – [`incidents.jsx`](incidents.jsx)
- `<VersionUpdates>` – [`version_updates.jsx`](version_updates.jsx)

### Navigational component
- `<TOC>` – [`toc.jsx`](toc.jsx)

## Status Dashboard conventions

*All* of the API endpoints (whether they are images/badges or REST endpoints serving JSON) are defined in the `urls` dictionary in the [`contants.js`](/src/constants.js) file in the `src` directory.

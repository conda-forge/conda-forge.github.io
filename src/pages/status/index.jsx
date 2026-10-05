import React from "react";
import Layout from "@theme/Layout";
import StatusDashboard from "@site/src/components/StatusDashboard";

export default function Home() {
  return (
    <Layout
      title="Status dashboard"
      description="Status dashboard for conda-forge"
    >
      <StatusDashboard/>
    </Layout>
  );
}

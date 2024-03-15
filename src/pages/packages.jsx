import React from "react";
import Layout from "@theme/Layout";
import Packages from "@site/src/components/Packages";

export default function Home() {
  return (
    <Layout
      title="Packages"
      description="Search conda-forge for packages and their feedstocks"
    >
      <Packages />
    </Layout>
  );
}

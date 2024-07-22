/*
We swizzle-wrap the original 404 component to provide a helpful message for migration 404s
after merging this PR: https://github.com/conda-forge/conda-forge.github.io/pull/2235
We can probably remove this at some point when enough migrations have been closed and
they are not as relevant.
*/
import React from "react";
import NotFound from "@theme-original/NotFound";
import { useLocation } from "@docusaurus/router";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

export default function NotFoundWrapper(props) {
  const location = useLocation().pathname;
  if (location.match("/status/migration/[a-zA-Z0-9-_+]+")) {
    const parts = location.split("/");
    const target = "/status/migration/?name=" + parts[parts.indexOf("migration") + 1];
    return (
      <Layout title="Page has moved">
        <main className="container margin-vert--xl">
          <div className="row">
            <div className="col col--6 col--offset-3">
              <Heading as="h1" className="hero__title">
                <h1>This page has moved</h1>
              </Heading>
              <p>
                Please visit the new location at{" "}
                <a href={target}>
                  <code>{target}</code>
                </a>
              </p>
            </div>
          </div>
        </main>
      </Layout>
    );
  }
  // Regular 404 component
  return (
    <>
      <NotFound {...props} />
    </>
  );
}

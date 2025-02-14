import React from "react";
import Layout from "@theme/Layout";
import MaintainerDashboard from "@site/src/components/MaintainerDashboard";
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function Home() {
  return (
    <Layout
      title="Maintainer dashboard"
      description="Maintainer dashboard for conda-forge"
    >
      <ApolloProvider client={client}>
        <MaintainerDashboard/>
      </ApolloProvider>
    </Layout>
  );
}

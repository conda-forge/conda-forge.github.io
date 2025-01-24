import { useLocation } from "@docusaurus/router";
import { useColorMode } from '@docusaurus/theme-common';
import { urls } from "@site/src/constants";
import { React, useEffect, useState } from "react";
import { gql, useQuery, useApolloClient } from '@apollo/client';

const GET_USER = gql`
  query {
    viewer {
      login
    }
  }
`;

const GET_TEAMS = gql`
  query GetTeams($login: String!) {
    organization(login: "conda-forge") {
      teams(first: 100, userLogins: [$login]) {
        totalCount
        nodes {
          name
          repositories {
            edges {
              node {
                name
                url
                isArchived
                issues(states: OPEN) {
                  totalCount
                }
                pullRequests(states: OPEN) {
                  totalCount
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default function MaintainerDashboard() {
  // const {loading, error, data} = useQuery(GET_USER);
  // if (loading) return 'Loading...';
  // if (error) return `Error! ${error.message}`;

  // const login = data.viewer.login;

  const login = "zklaus";

  const {loading, error, data} = useQuery(GET_TEAMS, {variables: { login } });
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const all_teams = data.organization.teams.nodes;
  const empty_teams = all_teams.filter(team => team.repositories.edges.length === 0);
  const overfull_teams = all_teams.filter(team => team.repositories.edges.length > 1);
  const regular_teams = all_teams.filter(team => (
    team.repositories.edges.length === 1 && !team.repositories.edges[0].node.isArchived
  ));

  const teams = regular_teams.map((team, index) => {
    const repository = team.repositories.edges[0].node;
    const name = repository.name;
    const url = repository.url;
    const openIssues = repository.issues.totalCount;
    const openPullRequests = repository.pullRequests.totalCount;
    return { index, name, url, openPullRequests, openIssues };
  }).sort((a, b) => {
    const prOrder = b.openPullRequests - a.openPullRequests;
    if (prOrder !== 0) {
      return prOrder;
    } else {
      return b.openIssues - a.openIssues;
    }
  });

  return (
    <main className="container" style={{ paddingBottom: "1em" }}>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Open pull requests</th>
            <th>Open issues</th>
          </tr>
        </thead>
        <tbody>
          {teams.map(({ index, name, url, openPullRequests, openIssues }) =>
            (<tr key={index}>
              <td><a href={url}>{name}</a></td>
              <td><a href={`${url}/pulls`}>{openPullRequests}</a></td>
              <td><a href={`${url}/issues`}>{openIssues}</a></td>
            </tr>))}
        </tbody>
      </table>
    </main>
  );
}

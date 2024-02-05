import React, { useState, useEffect } from "react";
import Admonition from "@docusaurus/theme-classic/lib/theme/Admonition";

// Function to calculate the Levenshtein distance between two strings
function levenshteinDistance(a, b) {
  const m = a.length;
  const n = b.length;
  const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }

  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j - 1] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j] + 1
        );
      }
    }
  }

  const maxLen = Math.max(m, n);
  return dp[m][n] / maxLen;
}

function highlightSubstring(str, substr) {
  const substrLower = substr.toLowerCase();
  const substrIndex = str.toLowerCase().indexOf(substrLower);
  if (substrIndex === -1) {
    return str;
  }
  const substrEndIndex = substrIndex + substr.length;
  return (
    <span>
      {str.substring(0, substrIndex)}
      <strong>{str.substring(substrIndex, substrEndIndex)}</strong>
      {str.substring(substrEndIndex)}
    </span>
  );
}

const Packages = () => {
  const [allPackages, setAllPackages] = useState({});
  const [latestPackages, setLatestPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/conda-forge/feedstock-outputs/single-file/feedstock-outputs.json"
        );
        const data = await response.json();

        if (typeof data === "object" && data !== null) {
          setAllPackages(
            Object.fromEntries(
              Object.entries(data).map(([key, value]) => [
                key.toLowerCase(),
                value,
              ])
            )
          );
        } else {
          console.error("Invalid data format. Expected an object.");
        }
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    const fetchLatestData = async () => {
      try {
        const response = await fetch(
          "https://conda.anaconda.org/conda-forge/rss.xml"
        );
        // parse the RSS feed into an XML document
        const xml = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(xml, "text/xml");
        const titles = doc.querySelectorAll("title");
        const dates = doc.querySelectorAll("pubDate");
        // Convert the object into an array of { name, date } objects
        var latestPackagesArray = [];
        // The first 'title' element is the feed title, so we skip it
        titles.forEach(
          (title, index) =>
            index &&
            latestPackagesArray.push({
              name: title.textContent.split(" ")[0],
              date: dates[index - 1].textContent,
            })
        );
        setLatestPackages(latestPackagesArray);
      } catch (error) {
        console.error("Error fetching latest packages:", error);
      }
    };
    fetchLatestData();
    fetchAllData();
  }, []);

  const searchTermLower = searchTerm.toLowerCase();
  var filteredPackages = [];
  var inclusionCriteria;
  if (searchTerm.length > 0) {
    if (searchTerm.length >= 3) {
      inclusionCriteria = (name) => name.includes(searchTermLower);
    } else {
      inclusionCriteria = (name) => name.startsWith(searchTermLower);
    }
    for (const name in allPackages) {
      if (inclusionCriteria(name)) {
        filteredPackages.push(name);
      }
    }
  }

  // Sort the filtered packages in place by their Levenshtein distance
  filteredPackages.sort((a, b) => {
    const aDistance = levenshteinDistance(a, searchTermLower);
    const bDistance = levenshteinDistance(b, searchTermLower);
    return aDistance - bDistance;
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  var renderResultsBlock;
  var resultsPill;
  if (searchTerm.length) {
    // This is the results table, displayed when the user enters a search term
    renderResultsBlock = (
      <table>
        <thead>
          <tr>
            <th>Package</th>
            <th>Feedstock(s)</th>
          </tr>
        </thead>
        <tbody>
          {(filteredPackages.length &&
            filteredPackages.map((pkg) => (
              <tr key={pkg}>
                <td>
                  <a
                    href={`https://anaconda.org/conda-forge/${pkg}`}
                    target="_blank"
                    title={`View ${pkg} on anaconda.org`}
                  >
                    {highlightSubstring(pkg, searchTermLower)}
                  </a>
                </td>
                <td>
                  {allPackages[pkg].map((repo) => (
                    <span key={`${pkg}-${repo}`}>
                      <a
                        href={`https://github.com/conda-forge/${repo}-feedstock`}
                        target="_blank"
                        title={`View ${repo}-feedstock on GitHub`}
                      >
                        {repo}-feedstock
                      </a>

                      <br />
                    </span>
                  ))}
                </td>
              </tr>
            ))) || (
            <tr>
              <td colSpan="2">No packages found</td>
            </tr>
          )}
        </tbody>
      </table>
    );
    resultsPill = (
      <span className="badge badge--info margin-left--sm">
        {filteredPackages.length} package(s) found
      </span>
    );
  } else {
    // Without a search term, display the most recently updated feedstocks
    renderResultsBlock = (
      <div>
        <Admonition type="tip" coll>
          <p>
            The following packages have recently received updates in{" "}
            <a
              href="https://anaconda.org/conda-forge"
              target="_blank"
              rel="noopener noreferrer"
            >
              Anaconda.org
            </a>
            . Check{" "}
            <a
              href="https://github.com/conda-forge/feedstocks/commits"
              target="_blank"
              rel="noopener noreferrer"
            >
              conda-forge/feedstocks
            </a>{" "}
            for an overview of the latest commits in our feedstocks.
          </p>
        </Admonition>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Package</th>
              <th>Feedstock(s)</th>
              <th>Last updated</th>
            </tr>
          </thead>
          <tbody>
            {latestPackages.map((item, index) => (
              <tr key={item.name}>
                <td>{index + 1}</td>
                <td>
                  <a
                    href={`https://anaconda.org/conda-forge/${item.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.name}
                  </a>
                </td>
                <td>
                  {(allPackages[item.name.toLowerCase()] || []).map((repo) => (
                    <span key={`${item.name}-${index}-${repo}`}>
                      <a
                        href={`https://github.com/conda-forge/${repo}-feedstock`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`View ${repo}-feedstock on GitHub`}
                      >
                        {repo}-feedstock
                      </a>
                      <br />
                    </span>
                  ))}
                </td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    resultsPill = (
      <span className="badge badge--success margin-left--sm">
        {Object.keys(allPackages).length} packages loaded
      </span>
    );
  }

  return (
    <div className={["container", "margin-vert--lg"].join(" ")}>
      <div className="row">
        <main className="col col--12">
          <h1>Packages in conda-forge</h1>
          <form id="filterPackages" className="margin-vert--md">
            <div className="navbar__search">
              <label htmlFor="filterPackages">
                <input
                  type="text"
                  placeholder="Filter items..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="navbar__search-input"
                />
                {resultsPill}
              </label>
            </div>
          </form>
          {renderResultsBlock}
        </main>
      </div>
    </div>
  );
};

export default Packages;

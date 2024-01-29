import React, { useState, useEffect } from "react";

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

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // TODO: Update URL to production JSON payload
        const response = await fetch("/test-feedstock-outputs.json");
        const data = await response.json();

        if (typeof data === "object" && data !== null) {
          // Convert the object into an array of { pkg_name, repositories } objects
          const packagesArray = Object.entries(data).map(([name, repos]) => ({
            name,
            repos,
          }));

          setPackages(packagesArray);
        } else {
          console.error("Invalid data format. Expected an object.");
        }
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchData();
  }, []);

  const searchTermLower = searchTerm.toLowerCase();
  var filteredPackages = [];
  if (searchTerm.length > 3) {
    // For queries with three or more characters, search the entire string for a match
    filteredPackages = packages.filter((pkg) =>
      pkg.name.toLowerCase().includes(searchTermLower)
    );
  } else if (searchTerm.length > 0) {
    // For queries with less than three characters,
    // only search if the package name starts with the query for performance reasons
    filteredPackages = packages.filter((pkg) =>
      pkg.name.toLowerCase().startsWith(searchTermLower)
    );
  }
  // Sort the filtered packages in place by their Levenshtein distance
  filteredPackages.sort((a, b) => {
    const aDistance = levenshteinDistance(
      a.name.toLowerCase(),
      searchTermLower
    );
    const bDistance = levenshteinDistance(
      b.name.toLowerCase(),
      searchTermLower
    );
    return aDistance - bDistance;
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div
      className={["container", "margin-vert--lg"].join(" ")}
    >
      <div className="row">
        <main className="col col--12">
          <h1>Packages in conda-forge</h1>
          <form className="margin-vert--md">
            <div className="navbar__search">
              <label htmlFor="search">
                <input
                  type="text"
                  placeholder="Filter items..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="navbar__search-input"
                />
                {(searchTerm.length && (
                  <span class="badge badge--info margin-left--sm">
                    {filteredPackages.length} package(s) found
                  </span>
                )) || (
                  <span class="badge badge--success margin-left--sm">
                    {packages.length} packages loaded
                  </span>
                )}
              </label>
            </div>
          </form>
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
                  <tr key={pkg.name}>
                    <td>
                      <strong>
                        <a
                          href={`https://anaconda.org/conda-forge/${pkg.name}`}
                          target="_blank"
                          title={`View ${pkg.name} on anaconda.org`}
                        >
                          {pkg.name}
                        </a>
                      </strong>
                    </td>
                    <td>
                      {pkg.repos.map((repo) => (
                        <span>
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
                  <td colSpan="2">Use the search bar to find packages</td>
                </tr>
              )}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
};

export default Packages;

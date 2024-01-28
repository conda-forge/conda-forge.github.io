import React, { useState, useEffect } from "react";

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
          // Convert the object into an array of { name, repositories } objects
          const packagesArray = Object.entries(data).map(
            ([repo, packages]) => ({ repo, packages })
          );

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

  const filteredPackages = searchTerm.length
    ? packages.filter(
        (pkg) =>
          pkg.repo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pkg.packages.some((pkgName) =>
            pkgName.toLowerCase().includes(searchTerm.toLowerCase())
          )
      )
    : [];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <main className={["container", "margin-vert--lg", "margin-horiz--lg"].join(" ")}>
      <div className="row">
        <div className="col col--12">
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
                    {filteredPackages.length} feedstock(s) found  
                  </span>
                )) ||
                <span class="badge badge--success margin-left--sm">
                {packages.length} feedstocks loaded
              </span>}
              </label>
            </div>
          </form>
          <table>
            <thead>
              <tr>
                <th>Feedstock</th>
                <th>Package(s)</th>
              </tr>
            </thead>
            <tbody>
              {(filteredPackages.length &&
                filteredPackages.map((item) => (
                  <tr key={item.repo}>
                    <td>
                      <strong>
                        <a
                          href={`https://github.com/conda-forge/${item.repo}-feedstock`}
                          target="_blank"
                          title={`View ${item.repo}-feedstock on GitHub`}
                        >
                          {item.repo}-feedstock
                        </a>
                      </strong>
                    </td>
                    <td>
                      {item.packages.map((pkgName) => (
                        <span>
                          <a
                            href={`https://anaconda.org/conda-forge/${pkgName}`}
                            target="_blank"
                            title={`View ${pkgName} on anaconda.org`}
                          >
                            {pkgName}
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
        </div>
      </div>
    </main>
  );
};

export default Packages;

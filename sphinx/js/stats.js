function loadStatsJSON (url, callback) {
  var xobj = new XMLHttpRequest()
  xobj.overrideMimeType('application/json')
  xobj.open('GET', url, true)
  xobj.onreadystatechange = function () {
    if (xobj.readyState === 4 && xobj.status === 200) {
      // Required use of an anonymous callback as .open will NOT return a value
      // but simply returns undefined in asynchronous mode
      callback(xobj.responseText)
    }
  }
  xobj.send(null)
}

function displayStatsJSON (reportText) {
  var stats = JSON.parse(reportText)

  var div = document.getElementById('stats-downloads')
  var mlns = stats.downloads.month / 1e6
  var blns = stats.downloads.all / 1e9
  div.innerHTML = (
    mlns.toFixed(0) + ' million monthly downloads<br>' +
    blns.toFixed(1) + ' billion all-time downloads'
  )

  div = document.getElementById('stats-members')
  div.innerHTML = (
    stats.n_members_core + ' core devs<br>' +
    stats.n_members_staged_recipes + ' staged-recipes maintainers<br>' +
    (stats.n_members / 1e3).toFixed(1) + 'k feedstock maintainers'
  )

  div = document.getElementById('stats-data')
  div.innerHTML = (
    (stats.n_repos / 1e3).toFixed(1) + 'k feedstocks<br>' +
    (stats.n_packages / 1e3).toFixed(1) + 'k packages<br>' +
    (stats.n_artifacts / 1e6).toFixed(1) + 'M artifacts'
  )

  div = document.getElementById('stats-issues-prs')
  div.innerHTML = (
    ((stats.n_prs + stats.n_issues) / 1e3).toFixed(1) + 'k issues+PRs<br>' +
    ((stats.n_open_prs + stats.n_open_issues) / 1e3).toFixed(1) + 'k/' +
    ((stats.n_closed_prs + stats.n_closed_issues) / 1e3).toFixed(1) + 'k open/closed'
  )

  div = document.getElementById('stats1')
  div.style.display = ''
  div = document.getElementById('stats2')
  div.style.display = ''
}

var url = 'https://raw.githubusercontent.com/conda-forge/by-the-numbers/main/data/live_counts.json'
loadStatsJSON(url, displayStatsJSON)

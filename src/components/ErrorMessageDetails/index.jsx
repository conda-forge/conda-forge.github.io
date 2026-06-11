function unescapeHTML(html) {
  console.log(html);
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return doc.documentElement.textContent.replace("&#x27;", "'");
}

export default function ErrorMessageDetails({ details }) {
  console.log(details);
  let children = [];
  if (details.messages) {
    if (details.kind || details.url) {
      let header = []
      if (details.kind) {
        header.push(<span className="badge badge--warning">
        {(details.kind && details.kind != "plain") && details.kind || "error"}
        {details.base_branch && ` @ ${details.base_branch}` || null}
        {details.attempts && ` after ${details.attempts.toFixed(1)} attempts` || null}
      </span>)
      }
      if (details.url) {
        header.push(
          <a href={details.url} target="_blank" title="View CI job" style={{ marginLeft: "1em"}}>
            View CI job{" "}
            <small className="fa fa-fw">
              <i className="fa fa-fw fa-arrow-up-right-from-square"></i>
            </small>
          </a>
        )
      }
      children.push(<div style={{ display: "inline-flex"}}>{header}</div>)
    }
    details.messages.map((message, index) => (
      children.push(<pre key={`message-${index}`}>{unescapeHTML(message)}</pre>)
    ))
  /* Legacy: string only values */
  } else {
    children.push(<pre>{unescapeHTML(details.toString())}</pre>)
  }
  return <>{children}</>
}

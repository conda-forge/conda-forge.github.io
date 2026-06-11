function unescapeHTML(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return doc.documentElement.textContent.replaceAll("&#x27;", "'");
}

function isSafeUrl(urlString) {
  try {
    const parsed = new URL(urlString);
    // Explicitly allow only http: and https: protocols
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch (e) {
    // If the URL constructor throws an error, the URL is invalid
    return false;
  }
};

/*
  This component deals with untrusted inputs. These details may come from externally-controlled
  data (tracebacks in bot logic and other types of unhandled errors, branch names, etc). We
  need to be careful not to render those inputs as arbitrary elements!

  Thankfully, React escapes children strings before rendering, so that should take care of it.
*/
export default function ErrorMessageDetails({ details }) {
  let children = [];
  /* Structured error metadata was introduced in 2026-06... */
  if (details.messages) {
    if (details.kind || details.url) {
      let header = []
      if (details.kind) {
        header.push(
          <span className="badge badge--warning">
            {(details.kind && details.kind != "plain") ? details.kind : "error"}
            {details.base_branch ? ` @ ${details.base_branch}` : null}
            {details.attempts ? ` after ${details.attempts.toFixed(1)} attempts` : null}
          </span>
        )
      }
      if (details.url && isSafeUrl(details.url)) {
        header.push(
          <a 
            href={details.url} 
            target="_blank" 
            rel="noopener noreferrer"
            title="View CI job" 
            style={{ marginLeft: "1em" }}
          >
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
      children.push(<pre key={`message-${index}`}>{unescapeHTML(message.toString())}</pre>)
    ))
  /* ... but bot data may still contain legacy, string only values */
  } else {
    children.push(<pre>{unescapeHTML(details.toString())}</pre>)
  }
  return <>{children}</>
}

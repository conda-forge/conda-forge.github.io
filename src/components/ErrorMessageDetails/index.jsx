export default function ErrorMessageDetails({ details }) {
  console.log(details);
  let children = [];
  if (details.messages) {
    if (details.kind) {
      children.push(<span className="badge badge--warning">
        {details.kind && details.kind || "error"}
        {details.base_branch && ` @ ${details.base_branch}` || null}
        {details.attempts && ` after ${details.attempts.toFixed(1)} attempts` || null}
      </span>)
    }
    if (details.url) {
      children.push(
        <a href={details.url} target="_blank" title="View CI job" style={{ marginLeft: "1em"}}>
          View CI job{" "}
          <small className="fa fa-fw">
            <i className="fa fa-fw fa-arrow-up-right-from-square"></i>
          </small>
        </a>
      )
    }
    for (const message of details.messages) {
      children.push(<pre>{message}</pre>)
    }
  /* Legacy: string only values */
  } else {
    children.push(<pre>{details.toString()}</pre>)
  }
  return <>{children}</>
}

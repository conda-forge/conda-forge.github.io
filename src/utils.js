export function isSafeUrl(urlString) {
  try {
    const parsed = new URL(urlString);
    // Explicitly allow only http: and https: protocols
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch (e) {
    // If the URL constructor throws an error, the URL is invalid
    return false;
  }
}

export function unescapeHTML(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return doc.documentElement.textContent.replaceAll("&#x27;", "'");
}

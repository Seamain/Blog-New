/**
 * Internal page URL with the trailing slash the static host serves.
 * Cloudflare Pages answers "/posts/foo" with a 308 to "/posts/foo/",
 * so linking the final URL directly saves a redirect round trip per click.
 * Paths with a file extension (feed.xml, og images) are left as they are.
 */
export default function pagePath(path: string): string {
  const [base, suffix = ""] = path.split(/(?=[?#])/, 2);
  let url = base.startsWith("/") ? base : `/${base}`;
  const lastSegment = url.split("/").pop() ?? "";
  if (!url.endsWith("/") && !lastSegment.includes(".")) url += "/";
  return url + suffix;
}

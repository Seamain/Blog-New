/**
 * Fetches an avatar image at build time using Cloudflare Access credentials,
 * returning it as a base64 data URL for embedding directly in HTML.
 * Falls back to null on any error so the initial-letter placeholder is shown.
 */
export async function fetchAvatarAsDataUrl(
  rawUrl: string | null | undefined
): Promise<string | null> {
  if (!rawUrl) return null;

  const apiUrl = import.meta.env.API_URL ?? "";
  const fullUrl = rawUrl.startsWith("http") ? rawUrl : `${apiUrl}${rawUrl}`;

  try {
    const res = await fetch(fullUrl, {
      headers: {
        Authorization: "Bearer " + import.meta.env.API_TOKEN,
        "CF-Access-Client-Id": import.meta.env.CF_ACCESS_ID ?? "",
        "CF-Access-Client-Secret": import.meta.env.CF_ACCESS_SECRET ?? "",
      },
    });

    if (!res.ok) {
      console.warn(`[fetchAvatar] Failed to fetch ${fullUrl}: ${res.status} ${res.statusText}`);
      return null;
    }

    const buf = await res.arrayBuffer();
    const mime = res.headers.get("content-type") || "image/jpeg";
    const base64 = Buffer.from(buf).toString("base64");
    return `data:${mime};base64,${base64}`;
  } catch (err) {
    console.warn(`[fetchAvatar] Error fetching ${fullUrl}:`, err instanceof Error ? err.message : String(err));
    return null;
  }
}

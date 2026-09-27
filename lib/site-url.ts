/** Apex is production primary; www → apex 308 on Vercel (matches heyberkshire-com). */
export const SITE_APEX_HOST = "vegasvalleyhomesforsale.com";

export const SITE_TITLE =
  "Boulder City Homes for Sale | Blue Diamond & Kyle Canyon";

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/$/, "");
  }
  return `https://${SITE_APEX_HOST}`;
}

export function getSiteHost(): string {
  return getSiteUrl().replace(/^https?:\/\//, "").replace(/\/$/, "");
}

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SITE_APEX_HOST } from "@/lib/site-url";

/** Vercel preview hosts show this site's content (not heyberkshire default). */
function resolveContentDomain(hostname: string): string {
  const host = (hostname || "").split(":")[0].toLowerCase().replace(/^www\./, "");
  if (host === SITE_APEX_HOST || host.endsWith(".vercel.app")) {
    return SITE_APEX_HOST;
  }
  return host || SITE_APEX_HOST;
}

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const response = NextResponse.next();
  response.headers.set("x-domain", resolveContentDomain(hostname));
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon|images|videos|robots|sitemap).*)"],
};

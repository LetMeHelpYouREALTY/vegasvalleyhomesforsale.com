import type { Metadata } from "next";
import { siteConfig, agentInfo } from "@/lib/site-config";

export type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
};

function toCanonicalUrl(path: string): string {
  if (path === "/") {
    return siteConfig.url;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const trimmed =
    normalized.length > 1 && normalized.endsWith("/")
      ? normalized.slice(0, -1)
      : normalized;
  return `${siteConfig.url}${trimmed}`;
}

/** Self-referencing canonical + og:url per route (apex host from NEXT_PUBLIC_SITE_URL). */
export function buildPageMetadata(options: PageMetadataOptions): Metadata {
  const canonical = toCanonicalUrl(options.path);

  return {
    title: options.title,
    description: options.description,
    keywords: options.keywords,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical,
    },
    openGraph: {
      title: options.title,
      description: options.description,
      url: canonical,
      type: options.type ?? "website",
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary",
      title: options.title,
      description: options.description,
    },
    authors: [{ name: agentInfo.name }],
    creator: agentInfo.name,
  };
}

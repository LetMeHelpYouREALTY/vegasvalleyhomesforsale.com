/**
 * Single-site configuration for vegasvalleyhomesforsale.com
 * (angles_v2 — buyer intent, Boulder City / Blue Diamond / Kyle Canyon).
 */

import { SITE_APEX_HOST, SITE_TITLE } from "./site-url";

export interface DomainConfig {
  domain: string;
  neighborhood: string;
  tagline: string;
  description: string;
  heroHeadline: string;
  heroSubheadline: string;
  keywords: string[];
  pageType: "community" | "search" | "lifestyle" | "investment" | "55plus" | "luxury";
  realscoutAgentId: string;
  ctaBadge: string;
  ctaHeadline: string;
  ctaSubheadline: string;
}

const REALSCOUT_AGENT_ID = "QWdlbnQtMjI1MDUw";

export const SITE_DOMAIN_CONFIG: DomainConfig = {
  domain: SITE_APEX_HOST,
  neighborhood: "Boulder City & Kyle Canyon",
  tagline: SITE_TITLE,
  description:
    "Search Boulder City, Blue Diamond, and Kyle Canyon (Mt. Charleston) homes for sale with Dr. Jan Duffy, REALTOR®. Listings and guidance for 89005, 89004, and 89124 — outside the Las Vegas core.",
  heroHeadline: "Boulder City, Blue Diamond & Kyle Canyon Homes for Sale",
  heroSubheadline:
    "Small-town and mountain markets around the valley — Boulder City 89005, Blue Diamond 89004, and Kyle Canyon 89124 — with MLS search and local guidance from Dr. Jan Duffy.",
  keywords: [
    "Boulder City homes for sale",
    "Blue Diamond NV homes for sale",
    "Kyle Canyon homes for sale",
    "Mt. Charleston cabins for sale",
    "Boulder City real estate 89005",
  ],
  pageType: "search",
  realscoutAgentId: REALSCOUT_AGENT_ID,
  ctaBadge: "Boulder City & Mountain Markets",
  ctaHeadline: "Search Boulder City, Blue Diamond & Kyle Canyon Listings",
  ctaSubheadline:
    "Call or text (702) 222-1964 — MLS access and showings for homes outside the Las Vegas core.",
};

export const SISTER_SITES = [
  {
    href: "https://searchforhomeslasvegas.com",
    anchor: "Las Vegas homes with pools for sale",
  },
  {
    href: "https://mesquiteestates.com",
    anchor: "Mesquite Nevada homes for sale",
  },
] as const;

/** @deprecated Multi-domain map retired — kept for type compatibility. */
export const DOMAIN_CONFIGS: Record<string, DomainConfig> = {
  [SITE_APEX_HOST]: SITE_DOMAIN_CONFIG,
};

export const DEFAULT_CONFIG: DomainConfig = SITE_DOMAIN_CONFIG;

export function getDomainConfig(_hostname: string): DomainConfig {
  return SITE_DOMAIN_CONFIG;
}

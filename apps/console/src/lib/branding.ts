export interface BrandingConfig {
  appName: string;
  logoUrl?: string;
  logoDarkUrl?: string;
  faviconUrl?: string;
  primaryColor?: string; // hex color e.g. "#4f46e5"
  hidePlatformBadges?: boolean;
  supportEmail?: string;
  docsUrl?: string;
  customDomain?: string;
  footerText?: string;
}

export const DEFAULT_BRANDING: BrandingConfig = {
  appName: process.env.NEXT_PUBLIC_APP_NAME || "QuickVoice",
  logoUrl: process.env.NEXT_PUBLIC_BRAND_LOGO || "",
  logoDarkUrl: process.env.NEXT_PUBLIC_BRAND_LOGO_DARK || "",
  faviconUrl: process.env.NEXT_PUBLIC_BRAND_FAVICON || "/favicon.ico",
  primaryColor: process.env.NEXT_PUBLIC_BRAND_COLOR || "",
  hidePlatformBadges: process.env.NEXT_PUBLIC_HIDE_POWERED_BY === "true",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@quickvoice.co",
  docsUrl: process.env.NEXT_PUBLIC_DOCS_URL || "https://docs.quickvoice.co",
  footerText: process.env.NEXT_PUBLIC_FOOTER_TEXT || "",
};

/**
 * Parses organization metadata to extract custom white-label branding
 */
export function getOrgBranding(orgMetadata?: string | null): BrandingConfig {
  if (!orgMetadata) {
    return DEFAULT_BRANDING;
  }

  try {
    const parsed = typeof orgMetadata === "string" ? JSON.parse(orgMetadata) : orgMetadata;
    const orgBranding = parsed?.branding || {};

    return {
      appName: orgBranding.appName?.trim() || DEFAULT_BRANDING.appName,
      logoUrl: orgBranding.logoUrl?.trim() || DEFAULT_BRANDING.logoUrl,
      logoDarkUrl: orgBranding.logoDarkUrl?.trim() || DEFAULT_BRANDING.logoDarkUrl,
      faviconUrl: orgBranding.faviconUrl?.trim() || DEFAULT_BRANDING.faviconUrl,
      primaryColor: orgBranding.primaryColor?.trim() || DEFAULT_BRANDING.primaryColor,
      hidePlatformBadges:
        typeof orgBranding.hidePlatformBadges === "boolean"
          ? orgBranding.hidePlatformBadges
          : DEFAULT_BRANDING.hidePlatformBadges,
      supportEmail: orgBranding.supportEmail?.trim() || DEFAULT_BRANDING.supportEmail,
      docsUrl: orgBranding.docsUrl?.trim() || DEFAULT_BRANDING.docsUrl,
      customDomain: orgBranding.customDomain?.trim() || "",
      footerText: orgBranding.footerText?.trim() || DEFAULT_BRANDING.footerText,
    };
  } catch {
    return DEFAULT_BRANDING;
  }
}

/**
 * Converts a Hex color (#4f46e5 or #fff) to HSL format compatible with Tailwind CSS variables:
 * e.g. "243 75% 59%"
 */
export function hexToHsl(hex: string): string | null {
  const sanitized = hex.replace("#", "").trim();
  if (![3, 6].includes(sanitized.length)) return null;

  let r = 0, g = 0, b = 0;
  if (sanitized.length === 3) {
    r = parseInt(sanitized[0] + sanitized[0], 16);
    g = parseInt(sanitized[1] + sanitized[1], 16);
    b = parseInt(sanitized[2] + sanitized[2], 16);
  } else {
    r = parseInt(sanitized.substring(0, 2), 16);
    g = parseInt(sanitized.substring(2, 4), 16);
    b = parseInt(sanitized.substring(4, 6), 16);
  }

  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  const hDeg = Math.round(h * 360);
  const sPct = Math.round(s * 100);
  const lPct = Math.round(l * 100);

  return `${hDeg} ${sPct}% ${lPct}%`;
}

"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authClient } from "@/src/lib/auth-client";
import { BrandingConfig, DEFAULT_BRANDING, getOrgBranding, hexToHsl } from "@/src/lib/branding";

interface BrandingContextType {
  branding: BrandingConfig;
  updateBrandingLocally: (newConfig: Partial<BrandingConfig>) => void;
}

const BrandingContext = createContext<BrandingContextType>({
  branding: DEFAULT_BRANDING,
  updateBrandingLocally: () => {},
});

export function useBranding() {
  return useContext(BrandingContext);
}

export function BrandingProvider({ children }: { children: React.ReactNode }) {
  const { data: activeOrg } = authClient.useActiveOrganization();
  const [localOverrides, setLocalOverrides] = useState<Partial<BrandingConfig>>({});

  const branding = useMemo<BrandingConfig>(() => {
    const orgBranding = getOrgBranding(activeOrg?.metadata);
    return {
      ...orgBranding,
      ...localOverrides,
    };
  }, [activeOrg?.metadata, localOverrides]);

  const updateBrandingLocally = (newConfig: Partial<BrandingConfig>) => {
    setLocalOverrides((prev) => ({ ...prev, ...newConfig }));
  };

  // Dynamically inject custom primary color CSS variable if specified
  useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;

    if (branding.primaryColor) {
      const hsl = hexToHsl(branding.primaryColor);
      if (hsl) {
        root.style.setProperty("--primary", hsl);
        root.style.setProperty("--ring", hsl);
      }
    } else {
      root.style.removeProperty("--primary");
      root.style.removeProperty("--ring");
    }

    // Update dynamic favicon if custom favicon is provided
    if (branding.faviconUrl && branding.faviconUrl !== "/favicon.ico") {
      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.getElementsByTagName("head")[0].appendChild(link);
      }
      link.href = branding.faviconUrl;
    }
  }, [branding.primaryColor, branding.faviconUrl]);

  return (
    <BrandingContext.Provider value={{ branding, updateBrandingLocally }}>
      {children}
    </BrandingContext.Provider>
  );
}

"use client";

import Image from "next/image";
import { useBranding } from "@/src/providers/branding-provider";

export default function Logo() {
  const { branding } = useBranding();

  if (branding.logoUrl) {
    return (
      <div className="flex items-center gap-2">
        <div className="relative h-8 max-w-[180px]">
          <Image
            src={branding.logoUrl}
            alt={branding.appName}
            width={160}
            height={32}
            className="h-8 w-auto object-contain"
            priority
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2.5 text-foreground">
      {/* Icon */}
      <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <svg
          width="22"
          height="22"
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="geometricPrecision"
          className="text-primary"
        >
          <g transform="rotate(-12 32 32)">
            <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="none" />
            <rect x="18" y="26" width="6" height="12" rx="3" fill="currentColor" />
            <rect x="26" y="20" width="6" height="24" rx="3" fill="currentColor" />
            <rect x="34" y="20" width="6" height="24" rx="3" fill="currentColor" />
            <rect x="42" y="26" width="6" height="12" rx="3" fill="currentColor" />
          </g>
        </svg>
      </div>

      {/* Text Brand Name */}
      <span className="font-bold text-lg tracking-tight font-sans">
        {branding.appName}
      </span>
    </div>
  );
}
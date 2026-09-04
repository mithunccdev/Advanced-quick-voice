"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Palette,
  Upload,
  Globe,
  Mail,
  Check,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Eye,
  Loader2,
} from "lucide-react";
import Image from "next/image";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Switch } from "@/src/components/ui/switch";
import { Badge } from "@/src/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { authClient } from "@/src/lib/auth-client";
import { useBranding } from "@/src/providers/branding-provider";
import { BrandingConfig, DEFAULT_BRANDING } from "@/src/lib/branding";

const PRESET_COLORS = [
  { name: "Indigo (Default)", hex: "#4f46e5" },
  { name: "Ocean Blue", hex: "#0284c7" },
  { name: "Emerald", hex: "#059669" },
  { name: "Violet", hex: "#7c3aed" },
  { name: "Rose", hex: "#e11d48" },
  { name: "Amber", hex: "#d97706" },
  { name: "Slate", hex: "#475569" },
];

export default function BrandingSettingsPage() {
  const { data: activeOrg, refetch } = authClient.useActiveOrganization();
  const { branding, updateBrandingLocally } = useBranding();

  const [form, setForm] = useState<BrandingConfig>({ ...branding });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm({ ...branding });
  }, [branding]);

  const handleColorChange = (hex: string) => {
    setForm((prev) => ({ ...prev, primaryColor: hex }));
    updateBrandingLocally({ primaryColor: hex });
  };

  const handleSave = async () => {
    if (!activeOrg?.id) {
      toast.error("No active organization found.");
      return;
    }

    setSaving(true);
    try {
      // Parse existing organization metadata
      let meta: Record<string, any> = {};
      if (activeOrg.metadata) {
        try {
          meta = typeof activeOrg.metadata === "string" ? JSON.parse(activeOrg.metadata) : activeOrg.metadata;
        } catch {
          meta = {};
        }
      }

      meta.branding = {
        appName: form.appName.trim(),
        logoUrl: form.logoUrl?.trim() || "",
        logoDarkUrl: form.logoDarkUrl?.trim() || "",
        faviconUrl: form.faviconUrl?.trim() || "",
        primaryColor: form.primaryColor?.trim() || "",
        hidePlatformBadges: form.hidePlatformBadges,
        supportEmail: form.supportEmail?.trim() || "",
        docsUrl: form.docsUrl?.trim() || "",
        customDomain: form.customDomain?.trim() || "",
        footerText: form.footerText?.trim() || "",
      };

      const { error } = await authClient.organization.update({
        organizationId: activeOrg.id,
        data: {
          metadata: meta,
        },
      });

      if (error) {
        toast.error(error.message || "Failed to update branding.");
        return;
      }

      updateBrandingLocally(meta.branding);
      await refetch();
      toast.success("Branding and white-label settings saved successfully!");
    } catch (err: any) {
      toast.error(err?.message || "An unexpected error occurred.");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setForm({ ...DEFAULT_BRANDING });
    updateBrandingLocally(DEFAULT_BRANDING);
    toast.info("Reset to default branding settings.");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">White-Label & Branding</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Customize the visual identity of your console, web widgets, and customer-facing interfaces.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left 2 Cols: Form Controls */}
        <div className="md:col-span-2 space-y-6">
          {/* General Brand Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Palette className="size-4 text-primary" /> Brand Identity
              </CardTitle>
              <CardDescription>
                Set your product name and logo displayed across navigation and auth screens.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="appName">Platform / App Name</Label>
                <Input
                  id="appName"
                  placeholder="e.g. ApexVoice, MyAgency AI"
                  value={form.appName}
                  onChange={(e) => {
                    const val = e.target.value;
                    setForm((p) => ({ ...p, appName: val }));
                    updateBrandingLocally({ appName: val });
                  }}
                />
                <p className="text-xs text-muted-foreground">
                  Replaces all occurrences of default branding in headers, notifications, and tabs.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="logoUrl">Custom Logo Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="logoUrl"
                    placeholder="https://example.com/logo.png"
                    value={form.logoUrl || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      setForm((p) => ({ ...p, logoUrl: val }));
                      updateBrandingLocally({ logoUrl: val });
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Direct HTTPS URL to your PNG, SVG, or WebP logo (recommended height: 32px – 48px).
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="faviconUrl">Custom Favicon URL</Label>
                <Input
                  id="faviconUrl"
                  placeholder="https://example.com/favicon.ico"
                  value={form.faviconUrl || ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    setForm((p) => ({ ...p, faviconUrl: val }));
                    updateBrandingLocally({ faviconUrl: val });
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Theme Accent Color */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="size-4 text-primary" /> Accent Color
              </CardTitle>
              <CardDescription>
                Select or enter a custom hex color to re-theme buttons, badges, and active tabs.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {PRESET_COLORS.map((color) => {
                  const isSelected = form.primaryColor?.toLowerCase() === color.hex.toLowerCase();
                  return (
                    <button
                      key={color.hex}
                      type="button"
                      onClick={() => handleColorChange(color.hex)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                        isSelected
                          ? "border-primary ring-2 ring-primary/30"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <span
                        className="size-3 rounded-full"
                        style={{ backgroundColor: color.hex }}
                      />
                      {color.name}
                      {isSelected && <Check className="size-3 text-primary ml-1" />}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Label htmlFor="customColor" className="text-xs whitespace-nowrap">
                  Custom Hex Code:
                </Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    id="colorPicker"
                    value={form.primaryColor || "#4f46e5"}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="size-8 rounded border cursor-pointer bg-transparent"
                  />
                  <Input
                    id="customColor"
                    placeholder="#4f46e5"
                    className="font-mono text-xs w-28 uppercase"
                    value={form.primaryColor || ""}
                    onChange={(e) => handleColorChange(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* White-Label Badges & Domain */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <ShieldCheck className="size-4 text-primary" /> White-Label Controls
              </CardTitle>
              <CardDescription>
                Suppress default vendor watermarks and provide custom support channels.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">Remove "Powered By" Watermarks</Label>
                  <p className="text-xs text-muted-foreground">
                    Hides platform attribution on embedded website widgets, call reports, and email headers.
                  </p>
                </div>
                <Switch
                  checked={form.hidePlatformBadges ?? false}
                  onCheckedChange={(checked) =>
                    setForm((p) => ({ ...p, hidePlatformBadges: checked }))
                  }
                />
              </div>

              <div className="space-y-2 pt-2 border-t">
                <Label htmlFor="customDomain" className="flex items-center gap-1.5">
                  <Globe className="size-3.5 text-muted-foreground" /> Custom Subdomain / Host
                </Label>
                <Input
                  id="customDomain"
                  placeholder="voice.youragency.com"
                  value={form.customDomain || ""}
                  onChange={(e) => setForm((p) => ({ ...p, customDomain: e.target.value }))}
                />
                <p className="text-xs text-muted-foreground">
                  Point your CNAME record to your deployment IP or domain.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="supportEmail" className="flex items-center gap-1.5">
                  <Mail className="size-3.5 text-muted-foreground" /> Customer Support Email
                </Label>
                <Input
                  id="supportEmail"
                  placeholder="support@youragency.com"
                  value={form.supportEmail || ""}
                  onChange={(e) => setForm((p) => ({ ...p, supportEmail: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="gap-1.5 text-xs text-muted-foreground"
            >
              <RotateCcw className="size-3.5" /> Reset to Default
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="gap-2"
            >
              {saving ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
              {saving ? "Saving Changes..." : "Save Branding"}
            </Button>
          </div>
        </div>

        {/* Right Col: Live Preview Card */}
        <div className="space-y-4">
          <Card className="sticky top-6 border-dashed">
            <CardHeader className="pb-3">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Eye className="size-3.5 text-primary" /> Live Brand Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Header preview */}
              <div className="border rounded-lg p-3 bg-card shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-2">
                    {form.logoUrl ? (
                      <div className="relative h-6 w-24">
                        <Image
                          src={form.logoUrl}
                          alt="Preview"
                          fill
                          className="object-contain"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="size-6 rounded bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">
                          {form.appName?.[0] || "V"}
                        </div>
                        <span className="font-bold text-sm">{form.appName || "Platform"}</span>
                      </div>
                    )}
                  </div>
                  <Badge variant="outline" className="text-[10px] scale-90">
                    Pro
                  </Badge>
                </div>

                {/* Simulated UI element */}
                <div className="space-y-2 pt-1">
                  <div className="h-3 w-28 bg-muted rounded animate-pulse" />
                  <div className="h-7 w-full bg-primary/10 border border-primary/20 rounded flex items-center justify-center text-xs font-medium text-primary">
                    Interactive Accent Button
                  </div>
                </div>
              </div>

              {/* Widget Preview Badge */}
              <div className="border rounded-lg p-3 bg-muted/30 text-xs space-y-2">
                <p className="font-medium text-foreground">Widget Attribution:</p>
                <div className="p-2 border bg-card rounded flex items-center justify-between text-[11px]">
                  <span>Voice Chat Widget</span>
                  {form.hidePlatformBadges ? (
                    <Badge variant="secondary" className="text-[10px] bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                      100% White-Labeled
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground text-[10px]">
                      Powered by {form.appName}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

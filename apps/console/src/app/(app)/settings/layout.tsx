"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
 AlertTriangle,
 CreditCard,
 KeyRound,
 Shield,
 User,
 Building2,
 Palette,
 Cpu,
} from "lucide-react";
import { cn } from "@/src/lib/utils";

import { isBuiltInNumberManager } from "@/src/lib/numbers/permissions";
import { authClient } from "@/src/lib/auth-client";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  adminOnly?: boolean;
}

const NAV: NavItem[] = [
  { href: "/settings/profile", label: "Profile", icon: User },
  { href: "/settings/organization", label: "Organization", icon: Building2 },
  { href: "/settings/branding", label: "Branding", icon: Palette },
  { href: "/settings/providers", label: "AI & Telephony APIs", icon: Cpu, adminOnly: true },
  { href: "/settings/billing", label: "Billing", icon: CreditCard },
  { href: "/settings/api-keys", label: "API keys", icon: KeyRound },
  { href: "/settings/roles", label: "Roles", icon: Shield, adminOnly: true },
  { href: "/settings/danger", label: "Danger zone", icon: AlertTriangle },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const { data: activeMemberRole } = authClient.useActiveMemberRole();

  const isAdmin = isBuiltInNumberManager(activeMemberRole?.role) || (session?.user as { role?: string })?.role === "admin";

  const visibleNav = NAV.filter((item) => !item.adminOnly || isAdmin);

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-1 border-b pb-5">
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account, organization, billing, and access control.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[220px_1fr]">
        <nav className="flex flex-row gap-1 overflow-x-auto md:flex-col">
          {visibleNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex items-center gap-2 px-3 py-2 text-sm transition-colors rounded-md",
                  active
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="size-4" />
                <span className="flex-1">{item.label}</span>
                {item.adminOnly && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded">
                    Admin
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        <div>{children}</div>
      </div>
    </div>
  );
}

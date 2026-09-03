"use client";

import { Gauge } from "lucide-react";
import { EmptyState } from "@/src/components/common/EmptyState";

export function LimitsTab() {
  return (
    <EmptyState
      icon={Gauge}
      title="Limits are managed by your plan"
      description="Concurrency, daily minutes, and max call duration follow your subscription. Fine-grained per-agent limits are on the roadmap."
    />
  );
}

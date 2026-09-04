"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  PhoneForwarded,
  ShieldAlert,
  Save,
  Loader2,
  Check,
  Info,
  PhoneCall,
  MessageSquare,
  Sparkles,
} from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { Switch } from "@/src/components/ui/switch";
import { Badge } from "@/src/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { useAgentConfig, useSaveAgentConfig } from "@/src/hooks/queries/agents";
import { mergeConfig } from "@/src/lib/agents/config-defaults";
import { Skeleton } from "@/src/components/ui/skeleton";

interface CallTransferConfig {
  enabled: boolean;
  destinationType: "pstn" | "sip";
  destination: string;
  announcementSpeech: string;
  fallbackSpeech: string;
  triggerPhrases: string;
  forwardTranscript: boolean;
}

const DEFAULT_TRANSFER_CONFIG: CallTransferConfig = {
  enabled: false,
  destinationType: "pstn",
  destination: "",
  announcementSpeech: "Please hold while I transfer you to a specialist who can help further.",
  fallbackSpeech: "I apologize, but all our human specialists are currently occupied. Let me continue helping you or take a message.",
  triggerPhrases: "speak to human, representative, manager, supervisor, transfer me, real person",
  forwardTranscript: true,
};

export function CallTransferTab({ agentId }: { agentId: string }) {
  const { data: config, isLoading } = useAgentConfig(agentId);
  const save = useSaveAgentConfig(agentId);

  const [form, setForm] = useState<CallTransferConfig>(DEFAULT_TRANSFER_CONFIG);

  useEffect(() => {
    if (!config?.variables) return;
    try {
      const vars = typeof config.variables === "string" ? JSON.parse(config.variables) : config.variables;
      if (vars?.call_transfer) {
        setForm({
          ...DEFAULT_TRANSFER_CONFIG,
          ...vars.call_transfer,
        });
      }
    } catch {
      // ignore
    }
  }, [config?.variables]);

  const handleSave = async () => {
    if (form.enabled && !form.destination.trim()) {
      toast.error("Please provide a valid phone number or SIP URI destination for call transfer.");
      return;
    }

    try {
      let existingVars: Record<string, any> = {};
      if (config?.variables) {
        try {
          existingVars = typeof config.variables === "string" ? JSON.parse(config.variables) : config.variables;
        } catch {
          existingVars = {};
        }
      }

      const updatedVariables = {
        firstMessage: existingVars.firstMessage || [],
        systemPrompt: existingVars.systemPrompt || [],
        ...existingVars,
        call_transfer: form,
      };

      // Also append or update transfer rules into system prompt so the AI knows to execute transfer_call
      let newPrompt = config?.systemPrompt || "";
      const transferMarker = "### Human Escalation & Call Transfer Rules";

      if (form.enabled) {
        const transferInstruction = `\n\n${transferMarker}\n` +
          `You have the ability to transfer this call to a human specialist.\n` +
          `- Destination: ${form.destination} (${form.destinationType.toUpperCase()})\n` +
          `- Trigger conditions: If user asks for: "${form.triggerPhrases}" or becomes repeatedly frustrated.\n` +
          `- What to say before transfer: "${form.announcementSpeech}"\n` +
          `- Fallback response if unavailable: "${form.fallbackSpeech}"\n` +
          `- Action: Call the tool 'transfer_call' with reason and conversation summary.`;

        if (newPrompt.includes(transferMarker)) {
          const parts = newPrompt.split(transferMarker);
          newPrompt = `${parts[0].trim()}${transferInstruction}`;
        } else {
          newPrompt = `${newPrompt.trim()}${transferInstruction}`;
        }
      }

      await save.mutateAsync(
        mergeConfig(config, {
          variables: updatedVariables,
          systemPrompt: newPrompt,
        }),
      );

      toast.success("Call transfer and escalation settings updated successfully!");
    } catch (err: any) {
      toast.error(err?.message || "Failed to save call transfer settings.");
    }
  };

  if (isLoading) {
    return (
      <div className="border bg-card p-6 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2">
            <PhoneForwarded className="size-5 text-rose-500" /> Human-in-the-Loop Call Transfer
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Allow the voice agent to perform warm SIP REFER or PSTN transfers to human operators.
          </p>
        </div>

        <Button
          onClick={handleSave}
          disabled={save.isPending}
          className="gap-2 text-xs"
        >
          {save.isPending ? <Loader2 className="size-3.5 animate-spin" /> : <Save className="size-3.5" />}
          {save.isPending ? "Saving..." : "Save Transfer Settings"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-base">Enable Live Call Transfer</CardTitle>
              <CardDescription>
                When active, the agent can dial an external number to hand off the caller.
              </CardDescription>
            </div>
            <Switch
              checked={form.enabled}
              onCheckedChange={(checked) => setForm((p) => ({ ...p, enabled: checked }))}
            />
          </div>
        </CardHeader>

        {form.enabled && (
          <CardContent className="space-y-5 pt-2 border-t">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="destType">Destination Protocol</Label>
                <Select
                  value={form.destinationType}
                  onValueChange={(val: "pstn" | "sip") =>
                    setForm((p) => ({ ...p, destinationType: val }))
                  }
                >
                  <SelectTrigger id="destType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pstn">Phone Number (PSTN / E.164)</SelectItem>
                    <SelectItem value="sip">SIP URI / PBX Trunk</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <Label htmlFor="destination">
                  {form.destinationType === "pstn"
                    ? "Phone Number (E.164 format)"
                    : "SIP Endpoint URI"}
                </Label>
                <Input
                  id="destination"
                  placeholder={
                    form.destinationType === "pstn"
                      ? "+18005550199"
                      : "sip:support@carrier.pbx.com"
                  }
                  value={form.destination}
                  onChange={(e) => setForm((p) => ({ ...p, destination: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="speech">Pre-Transfer Announcement</Label>
              <Textarea
                id="speech"
                rows={2}
                placeholder="Message spoken to caller right before handoff..."
                value={form.announcementSpeech}
                onChange={(e) => setForm((p) => ({ ...p, announcementSpeech: e.target.value }))}
              />
              <p className="text-[11px] text-muted-foreground">
                Spoken aloud while the outbound transfer connection is being established.
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="fallback">Fallback Speech (if line is busy)</Label>
              <Textarea
                id="fallback"
                rows={2}
                placeholder="Spoken if the human destination does not answer..."
                value={form.fallbackSpeech}
                onChange={(e) => setForm((p) => ({ ...p, fallbackSpeech: e.target.value }))}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="triggers">Escalation Trigger Phrases (Comma-separated)</Label>
              <Input
                id="triggers"
                placeholder="representative, manager, human agent, talk to someone"
                value={form.triggerPhrases}
                onChange={(e) => setForm((p) => ({ ...p, triggerPhrases: e.target.value }))}
              />
              <p className="text-[11px] text-muted-foreground">
                Phrases or intents that cause the agent to offer or initiate transfer.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t">
              <div className="space-y-0.5">
                <Label className="text-sm">Forward Conversation Context</Label>
                <p className="text-xs text-muted-foreground">
                  Send call summary and caller sentiment as SIP header / webhook data to the destination PBX.
                </p>
              </div>
              <Switch
                checked={form.forwardTranscript}
                onCheckedChange={(checked) => setForm((p) => ({ ...p, forwardTranscript: checked }))}
              />
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}

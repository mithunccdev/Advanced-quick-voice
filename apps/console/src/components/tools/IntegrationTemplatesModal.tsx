"use client";

import React, { useState } from "react";
import {
  Calendar,
  Layers,
  Sparkles,
  Check,
  Plus,
  ArrowRight,
  ExternalLink,
  Loader2,
  Database,
  MessageSquare,
  Building,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { useCreateTool } from "@/src/hooks/queries/tools";
import type { CreateToolInput } from "@/src/lib/api/resources/tools";

interface ToolTemplate {
  id: string;
  name: string;
  category: "Calendar" | "CRM" | "Helpdesk" | "Messaging";
  description: string;
  icon: React.ElementType;
  color: string;
  badge: string;
  defaultConfig: CreateToolInput;
  apiKeyHelp: string;
  defaultEndpointPlaceholder: string;
}

const TEMPLATES: ToolTemplate[] = [
  {
    id: "cal_com",
    name: "Cal.com Appointment Booking",
    category: "Calendar",
    description: "Check booking availability and schedule appointments directly into Cal.com.",
    icon: Calendar,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
    badge: "Most Popular",
    apiKeyHelp: "Enter your Cal.com API key from account settings",
    defaultEndpointPlaceholder: "https://api.cal.com/v1/bookings",
    defaultConfig: {
      name: "cal_com_book_slot",
      description: "Checks availability and books an appointment slot on Cal.com using caller name and preferred time.",
      api_url: "https://api.cal.com/v1/bookings",
      api_method: "POST",
      api_headers: [
        { key: "Content-Type", value: "application/json" },
        { key: "Authorization", value: "Bearer YOUR_CAL_COM_API_KEY" },
      ],
      api_body: [
        { name: "eventTypeId", type: "number", description: "Cal.com Event Type ID", required: true },
        { name: "start", type: "string", description: "ISO 8601 formatted start time", required: true },
        { name: "name", type: "string", description: "Caller full name", required: true },
        { name: "email", type: "string", description: "Caller email address", required: true },
      ],
      disable_interruptions: true,
      force_pre_tool_speech: true,
      response_timeout_secs: 10,
    },
  },
  {
    id: "gohighlevel",
    name: "GoHighLevel (GHL) Contact & Tag Sync",
    category: "CRM",
    description: "Create or update CRM leads, assign tags, and log phone call outcomes in GoHighLevel.",
    icon: Building,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    badge: "Agency Favorite",
    apiKeyHelp: "Enter your GoHighLevel Location API Key or V2 Bearer Token",
    defaultEndpointPlaceholder: "https://services.leadconnectorhq.com/contacts/",
    defaultConfig: {
      name: "ghl_sync_lead",
      description: "Creates or updates a contact record in GoHighLevel CRM and applies campaign tags.",
      api_url: "https://services.leadconnectorhq.com/contacts/",
      api_method: "POST",
      api_headers: [
        { key: "Content-Type", value: "application/json" },
        { key: "Authorization", value: "Bearer YOUR_GHL_API_KEY" },
        { key: "Version", value: "2021-07-28" },
      ],
      api_body: [
        { name: "phone", type: "string", description: "Caller phone number", required: true },
        { name: "name", type: "string", description: "Caller full name", required: true },
        { name: "email", type: "string", description: "Caller email address", required: false },
        { name: "tags", type: "array", description: "Tags e.g. ['phone-lead', 'qualified']", required: false },
      ],
      disable_interruptions: true,
      force_pre_tool_speech: true,
      response_timeout_secs: 8,
    },
  },
  {
    id: "hubspot_crm",
    name: "HubSpot CRM Contact Creation",
    category: "CRM",
    description: "Synchronize new inbound callers directly as qualified leads in HubSpot CRM.",
    icon: Database,
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
    badge: "Enterprise",
    apiKeyHelp: "HubSpot Private App Access Token",
    defaultEndpointPlaceholder: "https://api.hubapi.com/crm/v3/objects/contacts",
    defaultConfig: {
      name: "hubspot_create_contact",
      description: "Registers the caller as a new contact lead in HubSpot CRM.",
      api_url: "https://api.hubapi.com/crm/v3/objects/contacts",
      api_method: "POST",
      api_headers: [
        { key: "Content-Type", value: "application/json" },
        { key: "Authorization", value: "Bearer YOUR_HUBSPOT_TOKEN" },
      ],
      api_body: [
        { name: "properties", type: "object", description: "Contact properties { firstname, lastname, phone, email }", required: true },
      ],
      disable_interruptions: true,
      force_pre_tool_speech: true,
      response_timeout_secs: 10,
    },
  },
  {
    id: "zendesk_ticket",
    name: "Zendesk Support Ticket Creator",
    category: "Helpdesk",
    description: "Automatically file a support ticket with call transcript summary and priority.",
    icon: Zap,
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
    badge: "Customer Support",
    apiKeyHelp: "Your Zendesk Subdomain and API Token (Basic Auth)",
    defaultEndpointPlaceholder: "https://yourcompany.zendesk.com/api/v2/tickets.json",
    defaultConfig: {
      name: "zendesk_create_ticket",
      description: "Creates an incident ticket in Zendesk Support from the voice agent conversation.",
      api_url: "https://yourcompany.zendesk.com/api/v2/tickets.json",
      api_method: "POST",
      api_headers: [
        { key: "Content-Type", value: "application/json" },
        { key: "Authorization", value: "Basic YOUR_ZENDESK_AUTH" },
      ],
      api_body: [
        { name: "ticket", type: "object", description: "Ticket payload including subject, comment body, priority", required: true },
      ],
      disable_interruptions: true,
      force_pre_tool_speech: true,
      response_timeout_secs: 8,
    },
  },
  {
    id: "sms_followup",
    name: "Instant SMS Confirmation (Twilio / Webhook)",
    category: "Messaging",
    description: "Send a follow-up text message or booking confirmation link to the caller's phone.",
    icon: MessageSquare,
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
    badge: "High Engagement",
    apiKeyHelp: "Endpoint URL to your SMS dispatcher or Twilio Messages API",
    defaultEndpointPlaceholder: "https://api.twilio.com/2010-04-01/Accounts/YOUR_SID/Messages.json",
    defaultConfig: {
      name: "send_sms_confirmation",
      description: "Sends an immediate SMS confirmation text message to the caller's mobile number.",
      api_url: "https://api.twilio.com/2010-04-01/Accounts/YOUR_SID/Messages.json",
      api_method: "POST",
      api_headers: [
        { key: "Content-Type", value: "application/x-www-form-urlencoded" },
      ],
      api_body: [
        { name: "To", type: "string", description: "Caller mobile phone number (E.164)", required: true },
        { name: "From", type: "string", description: "Twilio verified phone number", required: true },
        { name: "Body", type: "string", description: "Text content of the SMS", required: true },
      ],
      disable_interruptions: false,
      force_pre_tool_speech: true,
      response_timeout_secs: 6,
    },
  },
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function IntegrationTemplatesModal({ open, onOpenChange }: Props) {
  const [selectedTemplate, setSelectedTemplate] = useState<ToolTemplate | null>(null);
  const [endpointUrl, setEndpointUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const createTool = useCreateTool();

  const handleSelectTemplate = (template: ToolTemplate) => {
    setSelectedTemplate(template);
    setEndpointUrl(template.defaultConfig.api_url);
    setApiKey("");
  };

  const handleInstall = async () => {
    if (!selectedTemplate) return;

    try {
      const payload: CreateToolInput = {
        ...selectedTemplate.defaultConfig,
        api_url: endpointUrl.trim() || selectedTemplate.defaultConfig.api_url,
      };

      // If user supplied an API key, replace placeholder in headers
      if (apiKey.trim() && payload.api_headers) {
        payload.api_headers = payload.api_headers.map((h) => {
          if (h.value.includes("YOUR_") || h.key.toLowerCase() === "authorization") {
            if (h.value.startsWith("Bearer")) {
              return { ...h, value: `Bearer ${apiKey.trim()}` };
            }
            return { ...h, value: apiKey.trim() };
          }
          return h;
        });
      }

      await createTool.mutateAsync(payload);
      toast.success(`${selectedTemplate.name} tool installed successfully!`);
      onOpenChange(false);
      setSelectedTemplate(null);
    } catch (err: any) {
      toast.error(err?.message || "Failed to install integration template.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
              <Sparkles className="size-3 mr-1" /> 1-Click Library
            </Badge>
          </div>
          <DialogTitle className="text-lg mt-1">Integration Templates</DialogTitle>
          <DialogDescription className="text-xs">
            Quickly connect enterprise calendars, CRMs, and messaging tools without writing custom API payloads.
          </DialogDescription>
        </DialogHeader>

        {!selectedTemplate ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2">
            {TEMPLATES.map((tmpl) => {
              const Icon = tmpl.icon;
              return (
                <div
                  key={tmpl.id}
                  onClick={() => handleSelectTemplate(tmpl)}
                  className="flex flex-col justify-between p-4 rounded-xl border bg-card hover:border-primary/50 hover:shadow-sm cursor-pointer transition-all text-left"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className={`p-2 rounded-lg border ${tmpl.color}`}>
                        <Icon className="size-4" />
                      </div>
                      <Badge variant="secondary" className="text-[10px]">
                        {tmpl.badge}
                      </Badge>
                    </div>
                    <h4 className="font-semibold text-sm text-foreground">{tmpl.name}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {tmpl.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-2 border-t flex items-center justify-between text-xs font-medium text-primary">
                    <span>Use Template</span>
                    <ArrowRight className="size-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4 py-2">
            <button
              type="button"
              onClick={() => setSelectedTemplate(null)}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 font-medium"
            >
              ← Back to templates catalog
            </button>

            <div className="p-3.5 border rounded-xl bg-muted/30 flex items-start gap-3">
              <div className={`p-2 rounded-lg border shrink-0 ${selectedTemplate.color}`}>
                <selectedTemplate.icon className="size-4" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-foreground">{selectedTemplate.name}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{selectedTemplate.description}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="endpointUrl" className="text-xs">
                  API Endpoint URL
                </Label>
                <Input
                  id="endpointUrl"
                  value={endpointUrl}
                  onChange={(e) => setEndpointUrl(e.target.value)}
                  placeholder={selectedTemplate.defaultEndpointPlaceholder}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="apiKey" className="text-xs">
                  API Key / Token
                </Label>
                <Input
                  id="apiKey"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Paste your API key here..."
                />
                <p className="text-[11px] text-muted-foreground">{selectedTemplate.apiKeyHelp}</p>
              </div>

              <div className="p-3 bg-card border rounded-lg space-y-1 text-xs">
                <p className="font-medium text-foreground">Configured Parameters:</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedTemplate.defaultConfig.api_body?.map((param) => (
                    <Badge key={param.name} variant="outline" className="text-[10px] font-mono">
                      {param.name} ({param.type})
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="flex items-center justify-between sm:justify-between pt-3 border-t">
          <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          {selectedTemplate && (
            <Button
              size="sm"
              onClick={handleInstall}
              disabled={createTool.isPending}
              className="gap-1.5"
            >
              {createTool.isPending ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <Plus className="size-3.5" />
              )}
              {createTool.isPending ? "Installing..." : "Install Tool"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";
import { Badge } from "@/src/components/ui/badge";
import { Card, CardContent } from "@/src/components/ui/card";
import {
  FileJson,
  Upload,
  Sparkles,
  Ticket,
  Search,
  Check,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import type { ToolParam, KVPair } from "@/src/lib/api/types";

export interface ParsedToolImport {
  name: string;
  description: string;
  api_url: string;
  api_method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  api_headers: KVPair[];
  api_query_params: ToolParam[];
  api_path_params: ToolParam[];
  api_body: ToolParam[];
}

interface JsonApiImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (toolData: ParsedToolImport) => void;
}

const CRM_TICKET_GEN_TEMPLATE: ParsedToolImport = {
  name: "CRM Generate Ticket",
  description: "Collects caller issue details and creates a new support ticket in customer CRM",
  api_url: "https://api.mycrm.com/v1/tickets",
  api_method: "POST",
  api_headers: [
    { key: "Content-Type", value: "application/json", type: "Value" },
    { key: "Authorization", value: "Bearer YOUR_CRM_API_KEY", type: "Secret" },
  ],
  api_query_params: [],
  api_path_params: [],
  api_body: [
    {
      name: "customer_name",
      type: "String",
      valueType: "LLM Prompt",
      description: "Full name of the caller",
      required: true,
      allowedValues: [],
      value: null,
    },
    {
      name: "customer_email",
      type: "String",
      valueType: "LLM Prompt",
      description: "Email address of the caller for ticket notifications",
      required: true,
      allowedValues: [],
      value: null,
    },
    {
      name: "customer_phone",
      type: "String",
      valueType: "Dynamic Variable",
      description: "Inbound caller phone number",
      required: true,
      allowedValues: [],
      value: "call.caller_number",
    },
    {
      name: "subject",
      type: "String",
      valueType: "LLM Prompt",
      description: "Brief summary of the issue",
      required: true,
      allowedValues: [],
      value: null,
    },
    {
      name: "description",
      type: "String",
      valueType: "LLM Prompt",
      description: "Detailed description of customer problem",
      required: true,
      allowedValues: [],
      value: null,
    },
    {
      name: "priority",
      type: "String",
      valueType: "Static Value",
      description: "Default ticket priority level",
      required: false,
      allowedValues: ["LOW", "MEDIUM", "HIGH", "URGENT"],
      value: "MEDIUM",
    },
  ],
};

const CRM_TICKET_LOOKUP_TEMPLATE: ParsedToolImport = {
  name: "CRM Get Ticket Status",
  description: "Fetches existing customer support ticket status and resolution notes from CRM",
  api_url: "https://api.mycrm.com/v1/tickets/{ticket_id}",
  api_method: "GET",
  api_headers: [
    { key: "Authorization", value: "Bearer YOUR_CRM_API_KEY", type: "Secret" },
  ],
  api_query_params: [],
  api_path_params: [
    {
      name: "ticket_id",
      type: "String",
      valueType: "LLM Prompt",
      description: "The support ticket number provided by the customer (e.g. TC-9281)",
      required: true,
      allowedValues: [],
      value: null,
    },
  ],
  api_body: [],
};

export function JsonApiImportDialog({
  open,
  onOpenChange,
  onImport,
}: JsonApiImportDialogProps) {
  const [jsonText, setJsonText] = useState("");
  const [parseError, setParseError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setJsonText(content);
      validateAndPreview(content);
    };
    reader.readAsText(file);
  };

  const validateAndPreview = (text: string): ParsedToolImport | null => {
    if (!text.trim()) {
      setParseError(null);
      return null;
    }

    try {
      const raw = JSON.parse(text);
      setParseError(null);

      // Support QuickVoice format, Postman, or generic schema
      const name = raw.name || raw.title || "Custom API Tool";
      const description =
        raw.description || raw.summary || "External API integration";
      const api_url =
        raw.api_url || raw.url || raw.request?.url?.raw || raw.endpoint || "";
      const rawMethod = (
        raw.api_method ||
        raw.method ||
        raw.request?.method ||
        "POST"
      ).toUpperCase();
      const api_method = ["GET", "POST", "PUT", "PATCH", "DELETE"].includes(
        rawMethod
      )
        ? (rawMethod as any)
        : "POST";

      // Parse headers
      const api_headers: KVPair[] = [];
      const rawHeaders = raw.api_headers || raw.headers || raw.request?.header;
      if (Array.isArray(rawHeaders)) {
        for (const h of rawHeaders) {
          if (h.key || h.name) {
            api_headers.push({
              key: h.key || h.name,
              value: String(h.value ?? ""),
              type:
                (h.key || h.name).toLowerCase().includes("auth") ||
                (h.key || h.name).toLowerCase().includes("key")
                  ? "Secret"
                  : "Value",
            });
          }
        }
      } else if (rawHeaders && typeof rawHeaders === "object") {
        for (const [k, v] of Object.entries(rawHeaders)) {
          api_headers.push({
            key: k,
            value: String(v ?? ""),
            type:
              k.toLowerCase().includes("auth") || k.toLowerCase().includes("key")
                ? "Secret"
                : "Value",
          });
        }
      }

      // Parse body parameters
      const api_body: ToolParam[] = [];
      const rawBody = raw.api_body || raw.body || raw.parameters;
      if (Array.isArray(rawBody)) {
        for (const p of rawBody) {
          if (p.name) {
            api_body.push({
              name: p.name,
              type: p.type || "String",
              valueType: p.valueType || "LLM Prompt",
              description: p.description || `Parameter ${p.name}`,
              required: Boolean(p.required),
              allowedValues: Array.isArray(p.allowedValues)
                ? p.allowedValues
                : [],
              value: p.value ?? null,
            });
          }
        }
      } else if (rawBody && typeof rawBody === "object") {
        const bodyObj = rawBody.raw ? JSON.parse(rawBody.raw) : rawBody;
        for (const [k, v] of Object.entries(bodyObj)) {
          api_body.push({
            name: k,
            type: typeof v === "number" ? "Number" : typeof v === "boolean" ? "Boolean" : "String",
            valueType: "LLM Prompt",
            description: `Customer parameter: ${k}`,
            required: true,
            allowedValues: [],
            value: null,
          });
        }
      }

      // Parse path params
      const api_path_params: ToolParam[] = [];
      const rawPath = raw.api_path_params;
      if (Array.isArray(rawPath)) {
        for (const p of rawPath) {
          if (p.name) {
            api_path_params.push({
              name: p.name,
              type: p.type || "String",
              valueType: p.valueType || "LLM Prompt",
              description: p.description || `Path parameter ${p.name}`,
              required: true,
              allowedValues: [],
              value: p.value ?? null,
            });
          }
        }
      }

      // Detect {param} in URL if path params empty
      if (api_path_params.length === 0 && api_url.includes("{")) {
        const matches = api_url.match(/\{([a-zA-Z0-9_]+)\}/g);
        if (matches) {
          for (const match of matches) {
            const pName = match.replace(/[{}]/g, "");
            api_path_params.push({
              name: pName,
              type: "String",
              valueType: "LLM Prompt",
              description: `Path parameter ${pName}`,
              required: true,
              allowedValues: [],
              value: null,
            });
          }
        }
      }

      // Parse query params
      const api_query_params: ToolParam[] = [];
      const rawQuery = raw.api_query_params;
      if (Array.isArray(rawQuery)) {
        for (const p of rawQuery) {
          if (p.name) {
            api_query_params.push({
              name: p.name,
              type: p.type || "String",
              valueType: p.valueType || "LLM Prompt",
              description: p.description || `Query parameter ${p.name}`,
              required: Boolean(p.required),
              allowedValues: [],
              value: p.value ?? null,
            });
          }
        }
      }

      return {
        name,
        description,
        api_url,
        api_method,
        api_headers,
        api_query_params,
        api_path_params,
        api_body,
      };
    } catch (err: any) {
      setParseError(err.message || "Invalid JSON syntax");
      return null;
    }
  };

  const handleApply = () => {
    const parsed = validateAndPreview(jsonText);
    if (!parsed) {
      toast.error("Please enter a valid JSON API definition");
      return;
    }
    if (!parsed.api_url) {
      toast.error("JSON specification must include an 'api_url' or 'url'");
      return;
    }

    onImport(parsed);
    toast.success(`Successfully imported "${parsed.name}" API configuration!`);
    onOpenChange(false);
  };

  const handleApplyTemplate = (template: ParsedToolImport) => {
    setJsonText(JSON.stringify(template, null, 2));
    setParseError(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col gap-4">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <FileJson className="size-5 text-primary" />
            <DialogTitle>Import API Definition in JSON Format</DialogTitle>
          </div>
          <DialogDescription>
            Upload a <code>.json</code> file or paste an API specification (REST, OpenAPI, or CRM webhook). QuickVoice will automatically generate the function-calling parameters for your voice agent.
          </DialogDescription>
        </DialogHeader>

        {/* 1-Click Templates */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="size-3.5 text-primary" />
            Pre-built CRM API Templates
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Card
              onClick={() => handleApplyTemplate(CRM_TICKET_GEN_TEMPLATE)}
              className="cursor-pointer hover:border-primary/50 transition-colors p-3 border shadow-none bg-muted/20"
            >
              <div className="flex items-start gap-2.5">
                <Ticket className="size-4 text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-semibold">CRM Generate Ticket (POST)</div>
                  <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                    Collects customer name, email, phone, issue, and pushes to CRM.
                  </p>
                </div>
              </div>
            </Card>

            <Card
              onClick={() => handleApplyTemplate(CRM_TICKET_LOOKUP_TEMPLATE)}
              className="cursor-pointer hover:border-primary/50 transition-colors p-3 border shadow-none bg-muted/20"
            >
              <div className="flex items-start gap-2.5">
                <Search className="size-4 text-blue-500 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-semibold">CRM Ticket Lookup (GET)</div>
                  <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                    Asks customer for ticket ID and queries status and notes from CRM.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Upload Button & JSON Textarea */}
        <div className="space-y-2 flex-1 flex flex-col min-h-0">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-semibold">Paste JSON Specification</Label>
            <label className="cursor-pointer inline-flex items-center gap-1.5 text-xs text-primary hover:underline">
              <Upload className="size-3.5" />
              <span>Upload .json file</span>
              <input
                type="file"
                accept=".json,application/json"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>

          <Textarea
            value={jsonText}
            onChange={(e) => {
              setJsonText(e.target.value);
              validateAndPreview(e.target.value);
            }}
            placeholder={`{\n  "name": "Create Support Ticket",\n  "api_url": "https://crm.mycompany.com/api/tickets",\n  "api_method": "POST",\n  "api_headers": [\n    { "key": "Authorization", "value": "Bearer YOUR_KEY" }\n  ],\n  "api_body": [\n    { "name": "email", "type": "String", "valueType": "LLM Prompt", "required": true },\n    { "name": "issue_description", "type": "String", "valueType": "LLM Prompt", "required": true }\n  ]\n}`}
            className="font-mono text-xs flex-1 min-h-[180px] bg-muted/10 resize-none"
          />

          {parseError && (
            <div className="flex items-center gap-1.5 text-xs text-destructive">
              <AlertCircle className="size-3.5 shrink-0" />
              <span>{parseError}</span>
            </div>
          )}
        </div>

        <DialogFooter className="flex items-center justify-between sm:justify-between border-t pt-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={handleApply}
            disabled={!jsonText.trim() || !!parseError}
            className="gap-1.5"
          >
            <Check className="size-3.5" />
            Apply to Tool Form
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

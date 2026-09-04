"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Badge } from "@/src/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import {
  Play,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Clock,
  Copy,
  Sparkles,
  Bot,
  Send,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import { toolsApi, type TestToolResponse } from "@/src/lib/api/resources/tools";
import type { Tool, ToolParam, KVPair } from "@/src/lib/api/types";

interface ToolTestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tool: {
    name: string;
    api_url: string;
    api_method: string;
    api_headers?: KVPair[] | null;
    api_body?: ToolParam[] | null;
    api_query_params?: ToolParam[] | null;
    api_path_params?: ToolParam[] | null;
  };
}

export function ToolTestModal({
  open,
  onOpenChange,
  tool,
}: ToolTestModalProps) {
  const [pathParamValues, setPathParamValues] = useState<Record<string, string>>({});
  const [queryParamValues, setQueryParamValues] = useState<Record<string, string>>({});
  const [bodyParamValues, setBodyParamValues] = useState<Record<string, any>>({});
  const [executing, setExecuting] = useState(false);
  const [result, setResult] = useState<TestToolResponse | null>(null);

  // Initialize or reset test values when tool opens
  useEffect(() => {
    if (!open) return;
    setResult(null);

    const initialPath: Record<string, string> = {};
    for (const p of tool.api_path_params || []) {
      initialPath[p.name] = (p.value as string) || "TC-10492";
    }
    setPathParamValues(initialPath);

    const initialQuery: Record<string, string> = {};
    for (const p of tool.api_query_params || []) {
      initialQuery[p.name] = (p.value as string) || (p.name.includes("email") ? "customer@example.com" : "test-query");
    }
    setQueryParamValues(initialQuery);

    const initialBody: Record<string, any> = {};
    for (const p of tool.api_body || []) {
      if (p.name.includes("email")) {
        initialBody[p.name] = "sarah.connor@example.com";
      } else if (p.name.includes("name")) {
        initialBody[p.name] = "Sarah Connor";
      } else if (p.name.includes("phone")) {
        initialBody[p.name] = "+919876543210";
      } else if (p.name.includes("subject") || p.name.includes("title")) {
        initialBody[p.name] = "Urgent: Payment received but order unconfirmed";
      } else if (p.name.includes("description") || p.name.includes("issue")) {
        initialBody[p.name] = "Customer called stating credit card was charged $120 but invoice was not emailed.";
      } else if (p.name.includes("priority")) {
        initialBody[p.name] = "HIGH";
      } else {
        initialBody[p.name] = p.value !== null && p.value !== undefined ? p.value : "sample-value";
      }
    }
    setBodyParamValues(initialBody);
  }, [open, tool]);

  const handleFillSampleData = () => {
    const updatedBody = { ...bodyParamValues };
    for (const p of tool.api_body || []) {
      if (p.type === "Number") {
        updatedBody[p.name] = 42;
      } else if (p.type === "Boolean") {
        updatedBody[p.name] = true;
      } else {
        updatedBody[p.name] = p.name.includes("id") ? "TICK-9082" : `Sample ${p.name} input`;
      }
    }
    setBodyParamValues(updatedBody);
    toast.success("Filled sample test parameters!");
  };

  const handleExecuteTest = async () => {
    if (!tool.api_url) {
      toast.error("Tool has no valid URL configured");
      return;
    }

    setExecuting(true);
    setResult(null);

    try {
      const response = await toolsApi.test({
        api_url: tool.api_url,
        api_method: tool.api_method,
        api_headers: (tool.api_headers || []).map((h) => ({
          key: h.key,
          value: h.value || "",
        })),
        api_path_params: pathParamValues,
        api_query_params: queryParamValues,
        api_body: bodyParamValues,
      });

      setResult(response);
      if (response.ok) {
        toast.success(`API responded with ${response.status} ${response.statusText} (${response.latencyMs}ms)`);
      } else {
        toast.error(`API returned error ${response.status} ${response.statusText}`);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to execute tool test");
    } finally {
      setExecuting(false);
    }
  };

  const copyResponseJson = () => {
    if (!result) return;
    navigator.clipboard.writeText(
      typeof result.data === "object"
        ? JSON.stringify(result.data, null, 2)
        : String(result.data || result.error || "")
    );
    toast.success("Copied response payload to clipboard");
  };

  const methodColor =
    tool.api_method === "GET"
      ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
      : tool.api_method === "POST"
      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
      : tool.api_method === "PUT" || tool.api_method === "PATCH"
      ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
      : "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[92vh] flex flex-col gap-4">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Play className="size-5 text-primary fill-primary/20" />
              <DialogTitle>Test API Tool &amp; Inspect CRM Response</DialogTitle>
            </div>
            <Badge variant="outline" className={`font-mono text-xs ${methodColor}`}>
              {tool.api_method}
            </Badge>
          </div>
          <DialogDescription>
            Simulate a customer call invocation. Send sample values to verify your CRM endpoint and see the exact response your voice agent receives.
          </DialogDescription>
        </DialogHeader>

        {/* URL preview */}
        <div className="p-2.5 rounded-md bg-muted/40 border font-mono text-xs break-all flex items-center gap-2">
          <span className="font-bold text-muted-foreground">{tool.api_method}</span>
          <span className="text-foreground">{tool.api_url}</span>
        </div>

        {/* Main interactive test area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0 overflow-y-auto">
          {/* Left Column: Test Inputs */}
          <div className="space-y-4 border rounded-lg p-3.5 bg-card flex flex-col">
            <div className="flex items-center justify-between pb-2 border-b">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Simulated Caller Inputs
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleFillSampleData}
                className="h-6 text-[11px] gap-1 px-2 text-primary"
              >
                <Sparkles className="size-3" />
                Sample Data
              </Button>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto pr-1">
              {/* Path Params */}
              {(tool.api_path_params?.length ?? 0) > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold text-blue-500">Path Parameters:</span>
                  {tool.api_path_params!.map((param) => (
                    <div key={param.name} className="space-y-1">
                      <Label className="text-xs font-medium flex items-center justify-between">
                        <span>{param.name}</span>
                        <span className="text-[10px] text-muted-foreground">{param.type}</span>
                      </Label>
                      <Input
                        value={pathParamValues[param.name] ?? ""}
                        onChange={(e) =>
                          setPathParamValues((prev) => ({
                            ...prev,
                            [param.name]: e.target.value,
                          }))
                        }
                        className="h-8 text-xs font-mono"
                        placeholder={`Value for {${param.name}}`}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Query Params */}
              {(tool.api_query_params?.length ?? 0) > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold text-emerald-500">Query Parameters:</span>
                  {tool.api_query_params!.map((param) => (
                    <div key={param.name} className="space-y-1">
                      <Label className="text-xs font-medium flex items-center justify-between">
                        <span>{param.name}</span>
                        <span className="text-[10px] text-muted-foreground">{param.type}</span>
                      </Label>
                      <Input
                        value={queryParamValues[param.name] ?? ""}
                        onChange={(e) =>
                          setQueryParamValues((prev) => ({
                            ...prev,
                            [param.name]: e.target.value,
                          }))
                        }
                        className="h-8 text-xs font-mono"
                        placeholder={`Query value for ${param.name}`}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Body Params */}
              {(tool.api_body?.length ?? 0) > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold text-purple-500">Request Body Fields:</span>
                  {tool.api_body!.map((param) => (
                    <div key={param.name} className="space-y-1">
                      <Label className="text-xs font-medium flex items-center justify-between">
                        <span>{param.name}</span>
                        <span className="text-[10px] text-muted-foreground">{param.valueType} ({param.type})</span>
                      </Label>
                      <Input
                        value={bodyParamValues[param.name] ?? ""}
                        onChange={(e) =>
                          setBodyParamValues((prev) => ({
                            ...prev,
                            [param.name]: e.target.value,
                          }))
                        }
                        className="h-8 text-xs"
                        placeholder={param.description || `Enter ${param.name}`}
                      />
                    </div>
                  ))}
                </div>
              )}

              {(!tool.api_body?.length && !tool.api_path_params?.length && !tool.api_query_params?.length) && (
                <p className="text-xs text-muted-foreground italic py-4 text-center">
                  This tool does not require dynamic arguments. Click "Send Test Request" below to test the direct HTTP call.
                </p>
              )}
            </div>

            <Button
              type="button"
              onClick={handleExecuteTest}
              disabled={executing}
              className="w-full gap-2 text-xs"
            >
              {executing ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  Connecting to API Server...
                </>
              ) : (
                <>
                  <Send className="size-3.5" />
                  Send Test Request
                </>
              )}
            </Button>
          </div>

          {/* Right Column: Live Response Viewer */}
          <div className="space-y-3 border rounded-lg p-3.5 bg-card flex flex-col">
            <div className="flex items-center justify-between pb-2 border-b">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Server Response &amp; Agent View
              </span>
              {result && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={copyResponseJson}
                  className="h-6 text-[11px] gap-1 px-2"
                >
                  <Copy className="size-3" />
                  Copy JSON
                </Button>
              )}
            </div>

            {/* Results status banner */}
            {result ? (
              <div className="space-y-3 flex-1 flex flex-col min-h-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge
                    variant="outline"
                    className={`font-semibold gap-1 text-xs ${
                      result.ok
                        ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                        : "bg-destructive/10 text-destructive border-destructive/20"
                    }`}
                  >
                    {result.ok ? <CheckCircle2 className="size-3" /> : <AlertCircle className="size-3" />}
                    {result.status} {result.statusText}
                  </Badge>

                  <Badge variant="secondary" className="gap-1 font-mono text-[11px]">
                    <Clock className="size-3" />
                    {result.latencyMs} ms
                  </Badge>
                </div>

                {/* JSON Response Body */}
                <div className="flex-1 min-h-[160px] max-h-[260px] overflow-auto rounded-md bg-zinc-950 p-3 text-zinc-100 font-mono text-[11px] leading-relaxed border">
                  <pre className="whitespace-pre-wrap break-all">
                    {typeof result.data === "object"
                      ? JSON.stringify(result.data, null, 2)
                      : String(result.data || result.error || "No response body")}
                  </pre>
                </div>

                {/* Agent Voice Interpretation Preview */}
                <div className="p-2.5 rounded-md bg-purple-500/5 border border-purple-500/20 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold text-purple-700 dark:text-purple-300">
                    <Bot className="size-3.5" />
                    How Your Voice Agent Uses This:
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-normal">
                    {result.ok ? (
                      <>
                        The agent receives the JSON response payload above. During the call, the LLM parses keys (like{" "}
                        <code className="bg-purple-500/10 px-1 py-0.5 rounded text-purple-600 dark:text-purple-400">
                          {typeof result.data === "object" && result.data ? Object.keys(result.data).slice(0, 3).join(", ") : "status"}
                        </code>
                        ) and naturally confirms the ticket or query details to the caller in real-time.
                      </>
                    ) : (
                      <>
                        The API returned an error ({result.status}). The voice agent will gracefully inform the caller: <em>"I encountered a momentary issue accessing the support system, but I have noted your details."</em>
                      </>
                    )}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-muted-foreground space-y-2">
                <Play className="size-8 text-muted-foreground/30" />
                <div className="text-xs font-medium">Ready to Test</div>
                <p className="text-[11px] max-w-xs">
                  Fill in the test parameters on the left and click <strong>"Send Test Request"</strong> to view real HTTP status and payload.
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

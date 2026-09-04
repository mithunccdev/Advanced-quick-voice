"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  PhoneCall,
  Mic,
  Volume2,
  Cpu,
  Key,
  ShieldCheck,
  Save,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Sparkles,
  Layers,
  Lock,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Badge } from "@/src/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { authClient } from "@/src/lib/auth-client";
import { Skeleton } from "@/src/components/ui/skeleton";
import { isBuiltInNumberManager } from "@/src/lib/numbers/permissions";

export default function AdminProvidersSettingsPage() {
  const { data: session, isPending: isSessionPending } = authClient.useSession();
  const { data: activeMemberRole, isPending: isRolePending } = authClient.useActiveMemberRole();
  const { data: activeOrg, isPending: isOrgPending, refetch } = authClient.useActiveOrganization();
  const [saving, setSaving] = useState(false);

  const isAdmin = isBuiltInNumberManager(activeMemberRole?.role) || (session?.user as { role?: string })?.role === "admin";

  // State for all 4 segregated provider domains
  const [telephony, setTelephony] = useState({
    twilioAccountSid: "",
    twilioAuthToken: "",
    twilioTrunkSid: "",
    telnyxApiKey: "",
    telnyxConnectionId: "",
    vobizApiKey: "",
    vobizAuthToken: "",
    vobizSipDomain: "sip.vobiz.ai",
    vobizTrunkId: "",
    livekitSipInboundTrunkId: "",
    livekitSipOutboundTrunkId: "",
  });

  const [stt, setStt] = useState({
    deepgramApiKey: "",
    deepgramDefaultModel: "nova-3",
    sarvamApiKey: "",
    sarvamSttModel: "saaras:v3",
  });

  const [tts, setTts] = useState({
    elevenlabsApiKey: "",
    elevenlabsModel: "eleven_flash_v2_5",
    cartesiaApiKey: "",
    sarvamTtsSpeaker: "shubh",
    deepgramTtsEnabled: true,
  });

  const [llm, setLlm] = useState({
    openrouterApiKey: "",
    deepseekApiKey: "",
    openaiApiKey: "",
    anthropicApiKey: "",
    geminiApiKey: "",
    awsAccessKeyId: "",
    awsSecretAccessKey: "",
    awsRegion: "us-east-1",
  });

  // Load saved provider credentials from org metadata if present
  useEffect(() => {
    if (!activeOrg?.metadata) return;
    try {
      const meta = typeof activeOrg.metadata === "string" ? JSON.parse(activeOrg.metadata) : activeOrg.metadata;
      if (meta?.providers) {
        const p = meta.providers;
        if (p.telephony) setTelephony((prev) => ({ ...prev, ...p.telephony }));
        if (p.stt) setStt((prev) => ({ ...prev, ...p.stt }));
        if (p.tts) setTts((prev) => ({ ...prev, ...p.tts }));
        if (p.llm) setLlm((prev) => ({ ...prev, ...p.llm }));
      }
    } catch {
      // ignore
    }
  }, [activeOrg?.metadata]);

  const handleSaveAll = async () => {
    if (!activeOrg?.id) {
      toast.error("No active organization found.");
      return;
    }

    setSaving(true);
    try {
      let existingMeta: Record<string, any> = {};
      if (activeOrg.metadata) {
        try {
          existingMeta = typeof activeOrg.metadata === "string" ? JSON.parse(activeOrg.metadata) : activeOrg.metadata;
        } catch {
          existingMeta = {};
        }
      }

      const updatedMetadata = {
        ...existingMeta,
        providers: {
          telephony,
          stt,
          tts,
          llm,
        },
      };

      const { error } = await authClient.organization.update({
        organizationId: activeOrg.id,
        data: {
          metadata: updatedMetadata,
        },
      });

      if (error) {
        toast.error(error.message || "Failed to update provider settings.");
        return;
      }

      await refetch();
      toast.success("Admin API and Provider settings saved successfully!");
    } catch (err: any) {
      toast.error(err?.message || "Failed to save provider settings.");
    } finally {
      setSaving(false);
    }
  };

  if (isSessionPending || isRolePending || isOrgPending || !activeOrg) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <Card className="border-destructive/30 bg-destructive/5 max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="size-5 text-destructive" />
            <CardTitle className="text-destructive">Admin Account Only</CardTitle>
          </div>
          <CardDescription>
            Access to AI & Telephony Provider settings (Vobiz SIP, Sarvam AI, Deepgram, ElevenLabs, OpenRouter, and Cloud LLMs) is strictly restricted to Organization Administrators and Owners.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xs text-muted-foreground">
            To view or update external API credentials, carrier SIP trunks, or speech engine settings, please log in with an administrator account (e.g. <code>admin@quickvoice.ai</code>) or contact your organization owner.
          </p>
          <Button variant="outline" size="sm" asChild>
            <a href="/settings/profile">Return to Profile Settings</a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight">AI &amp; Telephony Provider APIs</h2>
            <Badge variant="secondary" className="bg-purple-500/10 text-purple-600 dark:text-purple-400 gap-1 font-semibold text-[11px]">
              <Lock className="size-3" /> Admin Account Only
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Manage carrier SIP trunks, Speech-to-Text, Voice Synthesis, and Cloud LLM API credentials from one central console.
          </p>
        </div>

        <Button
          onClick={handleSaveAll}
          disabled={saving}
          className="gap-2 text-xs"
        >
          <Save className="size-3.5" />
          {saving ? "Saving APIs..." : "Save All Provider APIs"}
        </Button>
      </div>

      {/* Segregated Provider Tabs */}
      <Tabs defaultValue="telephony" className="space-y-6">
        <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full">
          <TabsTrigger value="telephony" className="gap-2 text-xs">
            <PhoneCall className="size-3.5 text-blue-500" />
            <span>Telephony &amp; SIP</span>
          </TabsTrigger>
          <TabsTrigger value="stt" className="gap-2 text-xs">
            <Mic className="size-3.5 text-emerald-500" />
            <span>Speech-to-Text</span>
          </TabsTrigger>
          <TabsTrigger value="tts" className="gap-2 text-xs">
            <Volume2 className="size-3.5 text-amber-500" />
            <span>Voice &amp; TTS</span>
          </TabsTrigger>
          <TabsTrigger value="llm" className="gap-2 text-xs">
            <Cpu className="size-3.5 text-purple-500" />
            <span>Cloud LLMs</span>
          </TabsTrigger>
        </TabsList>

        {/* 1. TELEPHONY & SIP TRUNKS */}
        <TabsContent value="telephony" className="space-y-5">
          {/* VOBIZ */}
          <Card className="border-blue-500/20 shadow-xs">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-xs">
                    VOBIZ
                  </div>
                  <div>
                    <CardTitle className="text-sm font-semibold">Vobiz Cloud Telephony &amp; Indian / Global DIDs</CardTitle>
                    <CardDescription className="text-xs">
                      Developer-first SIP trunking optimized for AI voice agents with compliant Indian 140/92/800 numbers.
                    </CardDescription>
                  </div>
                </div>
                {telephony.vobizApiKey ? (
                  <Badge variant="outline" className="text-emerald-600 border-emerald-500/30 bg-emerald-500/10 text-[10px] gap-1">
                    <CheckCircle2 className="size-3" /> Connected
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-muted-foreground text-[10px]">Not Configured</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <Label htmlFor="vobizKey">Vobiz API Key</Label>
                <Input
                  id="vobizKey"
                  type="password"
                  placeholder="vb_live_xxxxxxxxxxxxxxxxxxxx"
                  value={telephony.vobizApiKey}
                  onChange={(e) => setTelephony((p) => ({ ...p, vobizApiKey: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="vobizToken">Vobiz Auth Secret / Token</Label>
                <Input
                  id="vobizToken"
                  type="password"
                  placeholder="Auth Token for webhook signing"
                  value={telephony.vobizAuthToken}
                  onChange={(e) => setTelephony((p) => ({ ...p, vobizAuthToken: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="vobizDomain">Vobiz SIP Trunk Domain</Label>
                <Input
                  id="vobizDomain"
                  placeholder="sip.vobiz.ai"
                  value={telephony.vobizSipDomain}
                  onChange={(e) => setTelephony((p) => ({ ...p, vobizSipDomain: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="vobizTrunk">LiveKit Outbound Trunk ID for Vobiz</Label>
                <Input
                  id="vobizTrunk"
                  placeholder="ST_outbound_vobiz_xxxx"
                  value={telephony.vobizTrunkId}
                  onChange={(e) => setTelephony((p) => ({ ...p, vobizTrunkId: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* TWILIO */}
          <Card className="shadow-xs">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-semibold">Twilio Programmable Voice &amp; SIP Trunking</CardTitle>
                  <CardDescription className="text-xs">
                    Global PSTN numbers and Elastic SIP trunking for inbound/outbound calls.
                  </CardDescription>
                </div>
                {telephony.twilioAccountSid ? (
                  <Badge variant="outline" className="text-emerald-600 border-emerald-500/30 bg-emerald-500/10 text-[10px] gap-1">
                    <CheckCircle2 className="size-3" /> Configured
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-muted-foreground text-[10px]">Not Configured</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1.5">
                <Label htmlFor="twSid">Twilio Account SID</Label>
                <Input
                  id="twSid"
                  placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  value={telephony.twilioAccountSid}
                  onChange={(e) => setTelephony((p) => ({ ...p, twilioAccountSid: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="twAuth">Twilio Auth Token</Label>
                <Input
                  id="twAuth"
                  type="password"
                  placeholder="Auth Token"
                  value={telephony.twilioAuthToken}
                  onChange={(e) => setTelephony((p) => ({ ...p, twilioAuthToken: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="twTrunk">Twilio Trunk SID</Label>
                <Input
                  id="twTrunk"
                  placeholder="TKxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  value={telephony.twilioTrunkSid}
                  onChange={(e) => setTelephony((p) => ({ ...p, twilioTrunkSid: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* TELNYX */}
          <Card className="shadow-xs">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-semibold">Telnyx Voice &amp; SIP Interconnect</CardTitle>
                  <CardDescription className="text-xs">
                    Wholesale SIP termination and high-concurrency telephony routing.
                  </CardDescription>
                </div>
                {telephony.telnyxApiKey ? (
                  <Badge variant="outline" className="text-emerald-600 border-emerald-500/30 bg-emerald-500/10 text-[10px] gap-1">
                    <CheckCircle2 className="size-3" /> Configured
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-muted-foreground text-[10px]">Not Configured</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <Label htmlFor="telnyxKey">Telnyx API V2 Key</Label>
                <Input
                  id="telnyxKey"
                  type="password"
                  placeholder="KEYxxxxxxxxxxxxxxxxxxxxxxxx"
                  value={telephony.telnyxApiKey}
                  onChange={(e) => setTelephony((p) => ({ ...p, telnyxApiKey: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="telnyxConn">Telnyx SIP Connection ID</Label>
                <Input
                  id="telnyxConn"
                  placeholder="SIP Connection ID / FQDN"
                  value={telephony.telnyxConnectionId}
                  onChange={(e) => setTelephony((p) => ({ ...p, telnyxConnectionId: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 2. SPEECH-TO-TEXT (STT) */}
        <TabsContent value="stt" className="space-y-5">
          {/* DEEPGRAM */}
          <Card className="shadow-xs">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-semibold">Deepgram Speech Recognition (Nova-3 &amp; Nova-2)</CardTitle>
                  <CardDescription className="text-xs">
                    Ultra-low latency streaming transcription (&lt;180ms) with interim results and Smart Formatting.
                  </CardDescription>
                </div>
                {stt.deepgramApiKey ? (
                  <Badge variant="outline" className="text-emerald-600 border-emerald-500/30 bg-emerald-500/10 text-[10px] gap-1">
                    <CheckCircle2 className="size-3" /> Active
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-muted-foreground text-[10px]">Not Configured</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <Label htmlFor="dgKey">Deepgram API Key</Label>
                <Input
                  id="dgKey"
                  type="password"
                  placeholder="dg_sec_xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  value={stt.deepgramApiKey}
                  onChange={(e) => setStt((p) => ({ ...p, deepgramApiKey: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="dgModel">Default STT Model</Label>
                <Input
                  id="dgModel"
                  placeholder="nova-3"
                  value={stt.deepgramDefaultModel}
                  onChange={(e) => setStt((p) => ({ ...p, deepgramDefaultModel: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* SARVAM AI */}
          <Card className="border-emerald-500/20 shadow-xs">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <span>Sarvam AI Saaras v3</span>
                    <Badge variant="secondary" className="text-[10px] bg-emerald-500/10 text-emerald-600">Indian Languages &amp; Hinglish</Badge>
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Specialized Indian speech recognition supporting Hindi, Bengali, Tamil, Telugu, Kannada, Marathi, Gujarati, and Hinglish.
                  </CardDescription>
                </div>
                {stt.sarvamApiKey ? (
                  <Badge variant="outline" className="text-emerald-600 border-emerald-500/30 bg-emerald-500/10 text-[10px] gap-1">
                    <CheckCircle2 className="size-3" /> Active
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-muted-foreground text-[10px]">Not Configured</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <Label htmlFor="sarvamKey">Sarvam AI API Subscription Key</Label>
                <Input
                  id="sarvamKey"
                  type="password"
                  placeholder="sarvam_api_key_xxxxxxxxxxxxxxxx"
                  value={stt.sarvamApiKey}
                  onChange={(e) => setStt((p) => ({ ...p, sarvamApiKey: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="sarvamStt">Default Model ID</Label>
                <Input
                  id="sarvamStt"
                  placeholder="saaras:v3"
                  value={stt.sarvamSttModel}
                  onChange={(e) => setStt((p) => ({ ...p, sarvamSttModel: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 3. VOICE & TTS */}
        <TabsContent value="tts" className="space-y-5">
          {/* SARVAM AI BULBUL */}
          <Card className="border-amber-500/20 shadow-xs">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-semibold">Sarvam AI Bulbul v3 Speech Synthesis</CardTitle>
                  <CardDescription className="text-xs">
                    Natural vernacular TTS with regional pitch and conversational styles.
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="text-[10px]">Voices: Shubh, Meera, Dhruv, Ananya, Aditya</Badge>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <Label>Default Speaker Voice</Label>
                <Input
                  placeholder="shubh"
                  value={tts.sarvamTtsSpeaker}
                  onChange={(e) => setTts((p) => ({ ...p, sarvamTtsSpeaker: e.target.value }))}
                />
                <p className="text-[10px] text-muted-foreground">Uses the same Sarvam API key configured in the STT tab.</p>
              </div>
            </CardContent>
          </Card>

          {/* ELEVENLABS */}
          <Card className="shadow-xs">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-semibold">ElevenLabs Flash v2.5 &amp; Voice Clones</CardTitle>
                  <CardDescription className="text-xs">
                    Ultra-expressive human speech and custom brand voice clones.
                  </CardDescription>
                </div>
                {tts.elevenlabsApiKey ? (
                  <Badge variant="outline" className="text-emerald-600 border-emerald-500/30 bg-emerald-500/10 text-[10px] gap-1">
                    <CheckCircle2 className="size-3" /> Active
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-muted-foreground text-[10px]">Not Configured</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <Label htmlFor="elKey">ElevenLabs API Key</Label>
                <Input
                  id="elKey"
                  type="password"
                  placeholder="xi-api-key-xxxxxxxxxxxxxxxxxxxx"
                  value={tts.elevenlabsApiKey}
                  onChange={(e) => setTts((p) => ({ ...p, elevenlabsApiKey: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="elModel">Default Model</Label>
                <Input
                  id="elModel"
                  placeholder="eleven_flash_v2_5"
                  value={tts.elevenlabsModel}
                  onChange={(e) => setTts((p) => ({ ...p, elevenlabsModel: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* CARTESIA */}
          <Card className="shadow-xs">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-semibold">Cartesia Sonic Streaming TTS</CardTitle>
                  <CardDescription className="text-xs">
                    State-of-the-art 90ms latency audio synthesis engine.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <Label htmlFor="cartesiaKey">Cartesia API Key</Label>
                <Input
                  id="cartesiaKey"
                  type="password"
                  placeholder="cartesia-api-key-xxxxxxxxxxxx"
                  value={tts.cartesiaApiKey}
                  onChange={(e) => setTts((p) => ({ ...p, cartesiaApiKey: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 4. CLOUD LLMs */}
        <TabsContent value="llm" className="space-y-5">
          {/* OPENROUTER */}
          <Card className="border-purple-500/20 shadow-xs">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <span>OpenRouter Universal Gateway</span>
                    <Badge variant="secondary" className="text-[10px] bg-purple-500/10 text-purple-600">All Top Models</Badge>
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Single API key accessing DeepSeek V3/R1, LLaMA 3.3 70B, Qwen 2.5, Claude, and OpenAI with fallback routing.
                  </CardDescription>
                </div>
                {llm.openrouterApiKey ? (
                  <Badge variant="outline" className="text-emerald-600 border-emerald-500/30 bg-emerald-500/10 text-[10px] gap-1">
                    <CheckCircle2 className="size-3" /> Active
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-muted-foreground text-[10px]">Not Configured</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="text-xs space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="orKey">OpenRouter API Key</Label>
                <Input
                  id="orKey"
                  type="password"
                  placeholder="sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  value={llm.openrouterApiKey}
                  onChange={(e) => setLlm((p) => ({ ...p, openrouterApiKey: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* DEEPSEEK DIRECT */}
          <Card className="shadow-xs">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-semibold">DeepSeek Direct API (DeepSeek-V3 &amp; DeepSeek-R1)</CardTitle>
                  <CardDescription className="text-xs">
                    Direct low-cost inference for complex reasoning and customer service dialogue.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="text-xs space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="dsKey">DeepSeek API Key</Label>
                <Input
                  id="dsKey"
                  type="password"
                  placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  value={llm.deepseekApiKey}
                  onChange={(e) => setLlm((p) => ({ ...p, deepseekApiKey: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* OPENAI & ANTHROPIC */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="shadow-xs">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">OpenAI (GPT-4o, GPT-4o Mini, o3-mini)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                <Label htmlFor="oaiKey">OpenAI API Key</Label>
                <Input
                  id="oaiKey"
                  type="password"
                  placeholder="sk-proj-xxxxxxxxxxxxxxxxxxxx"
                  value={llm.openaiApiKey}
                  onChange={(e) => setLlm((p) => ({ ...p, openaiApiKey: e.target.value }))}
                />
              </CardContent>
            </Card>

            <Card className="shadow-xs">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">Anthropic Claude (Claude 3.7 &amp; 3.5 Sonnet / Haiku)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                <Label htmlFor="antKey">Anthropic API Key</Label>
                <Input
                  id="antKey"
                  type="password"
                  placeholder="sk-ant-xxxxxxxxxxxxxxxxxxxx"
                  value={llm.anthropicApiKey}
                  onChange={(e) => setLlm((p) => ({ ...p, anthropicApiKey: e.target.value }))}
                />
              </CardContent>
            </Card>
          </div>

          {/* GOOGLE GEMINI & BEDROCK */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="shadow-xs">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">Google Gemini (Gemini 2.0 Flash &amp; 1.5 Pro)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                <Label htmlFor="geminiKey">Gemini API Key</Label>
                <Input
                  id="geminiKey"
                  type="password"
                  placeholder="AIzaxxxxxxxxxxxxxxxxxxxxxxxx"
                  value={llm.geminiApiKey}
                  onChange={(e) => setLlm((p) => ({ ...p, geminiApiKey: e.target.value }))}
                />
              </CardContent>
            </Card>

            <Card className="shadow-xs">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">Amazon Bedrock (Claude &amp; Nova)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                <Label htmlFor="awsKey">AWS Access Key ID</Label>
                <Input
                  id="awsKey"
                  placeholder="AKIAxxxxxxxxxxxxxxxx"
                  value={llm.awsAccessKeyId}
                  onChange={(e) => setLlm((p) => ({ ...p, awsAccessKeyId: e.target.value }))}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Building2,
  ClipboardList,
  Headphones,
  HeartPulse,
  Loader2,
  Plus,
  Sparkles,
  Mic,
  Volume2,
  Globe,
  KeyRound,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/src/lib/auth-client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Switch } from "@/src/components/ui/switch";
import { Label } from "@/src/components/ui/label";
import { Badge } from "@/src/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { useCreateAgent, useVoiceCatalog } from "@/src/hooks/queries/agents";
import {
  buildVoiceOptionsFromCatalog,
  getSttModelsForLanguage,
  getTtsModelsForLanguage,
  getVoicesForTtsModel,
  LANGUAGES,
} from "@/src/lib/data/voices";
import {
  useConfiguredProviders,
  filterSttModels,
  filterTtsModels,
  filterVoices,
  isSttModelConfigured,
  isTtsModelConfigured,
  isVoiceConfigured,
} from "@/src/lib/providers/configured-providers";
import { cn } from "@/src/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Agent name must be at least 2 characters"),
  isActive: z.boolean(),
  agent_language: z.string().min(2),
  sttModel: z.string().min(1, "STT model is required"),
  ttsModel: z.string().min(1, "TTS model is required"),
  voiceId: z.string().min(1, "Voice is required"),
});

type FormValues = z.infer<typeof schema>;

const templates = [
  {
    id: "business",
    title: "Business Agent",
    description: "General purpose calls, lead qualification, and follow-ups.",
    icon: Building2,
  },
  {
    id: "medical",
    title: "Medical Agent",
    description:
      "Patient intake, appointment reminders, and front-desk workflows.",
    icon: HeartPulse,
  },
  {
    id: "questionnaire",
    title: "Questionnaire Agent",
    description: "Outbound CSV questionnaires with structured answer capture.",
    icon: ClipboardList,
  },
  {
    id: "blank",
    title: "Blank Agent",
    description: "Start from an empty configuration and customize everything.",
    icon: Sparkles,
  },
  {
    id: "support",
    title: "Support Agent",
    description: "Customer questions, ticket triage, and post-call summaries.",
    icon: Headphones,
  },
] as const;

type TemplateId = (typeof templates)[number]["id"];

export function NewAgentDialog() {
  const [open, setOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>("blank");
  const router = useRouter();
  const createAgent = useCreateAgent();
  const { data: session } = authClient.useSession();
  const { data: voiceCatalog } = useVoiceCatalog();
  const configured = useConfiguredProviders();

  const isMasterAdmin = (session?.user as { role?: string })?.role === "admin";
  const hasAllocatedEngines = configured.hasAnySttConfigured || configured.hasAnyTtsConfigured;

  const voiceOptions = useMemo(
    () => (voiceCatalog ? buildVoiceOptionsFromCatalog(voiceCatalog) : null),
    [voiceCatalog]
  );
  const languages = voiceOptions?.languages ?? LANGUAGES;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      isActive: true,
      agent_language: "en",
      sttModel: configured.defaultSttModelId ?? "deepgram/nova-3",
      ttsModel: configured.defaultTtsModelId ?? "deepgram/aura-2",
      voiceId: configured.defaultVoiceId ?? "aura-2-asteria-en",
    },
  });

  const selectedLanguage = useWatch({
    control: form.control,
    name: "agent_language",
  });
  const selectedSttModel = useWatch({
    control: form.control,
    name: "sttModel",
  });
  const selectedTtsModel = useWatch({
    control: form.control,
    name: "ttsModel",
  });
  const selectedVoiceId = useWatch({
    control: form.control,
    name: "voiceId",
  });

  // Calculate STT models filtered by language and allocated providers
  const availableSttModels = useMemo(() => {
    const forLang = getSttModelsForLanguage(selectedLanguage, voiceOptions ?? undefined);
    if (!isMasterAdmin && configured.hasAnySttConfigured) {
      return forLang.filter((m) => isSttModelConfigured(m, configured));
    }
    return filterSttModels(forLang, configured);
  }, [selectedLanguage, voiceOptions, configured, isMasterAdmin]);

  // Calculate TTS models filtered by language and allocated providers
  const availableTtsModels = useMemo(() => {
    const forLang = getTtsModelsForLanguage(selectedLanguage, voiceOptions ?? undefined);
    if (!isMasterAdmin && configured.hasAnyTtsConfigured) {
      return forLang.filter((m) => isTtsModelConfigured(m, configured));
    }
    return filterTtsModels(forLang, configured);
  }, [selectedLanguage, voiceOptions, configured, isMasterAdmin]);

  // Calculate Voices filtered by TTS model, language, and allocated providers
  const availableVoices = useMemo(() => {
    const forTts = getVoicesForTtsModel(
      selectedTtsModel,
      selectedLanguage,
      voiceOptions ?? undefined
    );
    if (!isMasterAdmin && configured.hasAnyTtsConfigured) {
      return forTts.filter((v) => isVoiceConfigured(v, configured));
    }
    return filterVoices(forTts, configured);
  }, [selectedTtsModel, selectedLanguage, voiceOptions, configured, isMasterAdmin]);

  // Keep form selections valid whenever language, configured providers, or TTS model changes
  useEffect(() => {
    if (availableSttModels.length > 0 && !availableSttModels.some((m) => m.id === selectedSttModel)) {
      const preferred = configured.defaultSttModelId && availableSttModels.some((m) => m.id === configured.defaultSttModelId)
        ? configured.defaultSttModelId
        : availableSttModels[0].id;
      form.setValue("sttModel", preferred);
    }
  }, [availableSttModels, selectedSttModel, configured.defaultSttModelId, form]);

  useEffect(() => {
    if (availableTtsModels.length > 0 && !availableTtsModels.some((m) => m.id === selectedTtsModel)) {
      const preferred = configured.defaultTtsModelId && availableTtsModels.some((m) => m.id === configured.defaultTtsModelId)
        ? configured.defaultTtsModelId
        : availableTtsModels[0].id;
      form.setValue("ttsModel", preferred);
    }
  }, [availableTtsModels, selectedTtsModel, configured.defaultTtsModelId, form]);

  useEffect(() => {
    if (availableVoices.length > 0 && !availableVoices.some((v) => v.id === selectedVoiceId)) {
      const preferred = configured.defaultVoiceId && availableVoices.some((v) => v.id === configured.defaultVoiceId)
        ? configured.defaultVoiceId
        : availableVoices[0].id;
      form.setValue("voiceId", preferred);
    }
  }, [availableVoices, selectedVoiceId, configured.defaultVoiceId, form]);

  async function onSubmit(values: FormValues) {
    const agent = await createAgent.mutateAsync({
      name: values.name,
      isActive: values.isActive,
      templateId: selectedTemplate,
      agent_language: values.agent_language,
      sttModel: values.sttModel,
      ttsModel: values.ttsModel,
      voiceId: values.voiceId,
    });
    toast.success(`Agent "${agent.name}" created`);
    setOpen(false);
    setSelectedTemplate("blank");
    form.reset({
      name: "",
      isActive: true,
      agent_language: "en",
      sttModel: configured.defaultSttModelId ?? "deepgram/nova-3",
      ttsModel: configured.defaultTtsModelId ?? "deepgram/aura-2",
      voiceId: configured.defaultVoiceId ?? "aura-2-asteria-en",
    });
    router.push(`/agents/${agent.agentId}?tab=behavior`);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus /> New agent
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create agent</DialogTitle>
          <DialogDescription>
            Configure your agent identity, speech models, and prompt template.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Sales Qualifier"
                        autoFocus
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Voice & Speech Engine Section */}
              <div className="rounded-lg border bg-muted/20 p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-4 text-primary" />
                    <span className="text-sm font-semibold">Voice & Speech Engines</span>
                  </div>
                  {hasAllocatedEngines ? (
                    <Badge variant="outline" className="gap-1 border-primary/40 text-primary bg-primary/5 text-[11px]">
                      <CheckCircle2 className="size-3" />
                      {isMasterAdmin ? "Configured providers active" : "Allocated by Master Admin"}
                    </Badge>
                  ) : isMasterAdmin ? (
                    <Link
                      href="/settings/providers"
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      <KeyRound className="size-3" />
                      Configure API keys in Settings
                    </Link>
                  ) : (
                    <Badge variant="outline" className="gap-1 border-amber-500/40 text-amber-600 bg-amber-500/5 text-[11px]">
                      <AlertCircle className="size-3" />
                      Pending Allocation
                    </Badge>
                  )}
                </div>

                {!isMasterAdmin && !hasAllocatedEngines && (
                  <div className="rounded-md border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-400 flex items-start gap-2">
                    <AlertCircle className="size-4 shrink-0 mt-0.5" />
                    <span>
                      Voice engines have not been allocated to your organization yet. Please contact the Master Administrator to assign speech and language models before creating agents.
                    </span>
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Language */}
                  <FormField
                    control={form.control}
                    name="agent_language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Globe className="size-3.5" /> Language
                        </FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {languages.map((language) => (
                              <SelectItem key={language.code} value={language.code}>
                                {language.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* STT Model */}
                  <FormField
                    control={form.control}
                    name="sttModel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Mic className="size-3.5" /> Speech-to-Text (STT)
                        </FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select STT model" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availableSttModels.map((model) => (
                              <SelectItem key={model.id} value={model.id}>
                                <div className="flex items-center justify-between gap-2">
                                  <span>{model.label}</span>
                                  <span className="text-[11px] text-muted-foreground">
                                    {model.provider}
                                  </span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* TTS Model */}
                  <FormField
                    control={form.control}
                    name="ttsModel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Volume2 className="size-3.5" /> Text-to-Speech (TTS)
                        </FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={(val) => {
                            field.onChange(val);
                            const voices = getVoicesForTtsModel(val, selectedLanguage, voiceOptions ?? undefined);
                            const filtered = filterVoices(voices, configured);
                            if (filtered[0]) {
                              form.setValue("voiceId", filtered[0].id);
                            }
                          }}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select TTS model" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availableTtsModels.map((model) => (
                              <SelectItem key={model.id} value={model.id}>
                                <div className="flex items-center justify-between gap-2">
                                  <span>{model.label}</span>
                                  <span className="text-[11px] text-muted-foreground">
                                    {model.provider}
                                  </span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Voice Choice */}
                  <FormField
                    control={form.control}
                    name="voiceId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Sparkles className="size-3.5" /> Voice Choice
                        </FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select voice" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availableVoices.map((voice) => (
                              <SelectItem key={voice.id} value={voice.id}>
                                <div className="flex items-center justify-between gap-2">
                                  <span>{voice.name}</span>
                                  <span className="text-[11px] text-muted-foreground capitalize">
                                    {voice.gender} • {voice.provider}
                                  </span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Template selection */}
              <Label className="mt-2 block">Choose a template</Label>
              <div className="grid gap-3 sm:grid-cols-2">
                {templates.map((template) => {
                  const Icon = template.icon;
                  const isSelected = selectedTemplate === template.id;

                  return (
                    <div
                      key={template.id}
                      role="button"
                      tabIndex={0}
                      aria-pressed={isSelected}
                      onClick={() => setSelectedTemplate(template.id)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setSelectedTemplate(template.id);
                        }
                      }}
                      className={cn(
                        "cursor-pointer rounded-lg border bg-card p-3 text-left transition-colors hover:border-primary/60 hover:bg-accent/40 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none",
                        isSelected &&
                          "border-primary bg-accent/60 shadow-[0_0_0_1px_rgba(var(--primary-rgb),0.18)]",
                      )}
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <span
                          className={cn(
                            "flex size-8 items-center justify-center rounded-lg border text-muted-foreground",
                            isSelected &&
                              "border-primary bg-primary text-primary-foreground",
                          )}
                        >
                          <Icon className="size-4" />
                        </span>
                        <p className="text-sm font-medium text-foreground">
                          {template.title}
                        </p>
                      </div>
                      <p className="text-xs leading-5 text-muted-foreground">
                        {template.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label>{field.value ? "Active" : "Paused"}</Label>
                    <p className="text-xs text-muted-foreground">
                      Toggle whether this agent can handle calls immediately.
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={createAgent.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createAgent.isPending || (!isMasterAdmin && !hasAllocatedEngines)}
              >
                {createAgent.isPending ? (
                  <>
                    <Loader2 className="animate-spin" /> Creating…
                  </>
                ) : (
                  "Create agent"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

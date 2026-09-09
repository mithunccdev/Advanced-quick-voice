"use client";

import { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle, CheckCircle2, Loader2, Save } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { VoiceProfilePanel } from "@/src/components/agents/VoiceProfilePanel";
import {
    useConfiguredProviders,
    isSttModelConfigured,
    isTtsModelConfigured,
    isVoiceConfigured,
} from "@/src/lib/providers/configured-providers";
import { authClient } from "@/src/lib/auth-client";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/src/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/src/components/ui/select";
import {
    useAgentConfig,
    useSaveAgentConfig,
    useVoiceCatalog,
} from "@/src/hooks/queries/agents";
import {
    COMMON_TIMEZONES,
    buildVoiceOptionsFromCatalog,
    getSttModelsForLanguage,
    getTtsModelsForLanguage,
    getVoicesForTtsModel,
    LANGUAGES,
    LLM_MODELS,
    normalizeLanguageCode,
    type LanguageAwareModelOption,
    type ModelOption,
    type Voice,
} from "@/src/lib/data/voices";
import { mergeConfig } from "@/src/lib/agents/config-defaults";

const schema = z.object({
    voiceId: z.string().min(1),
    agent_language: z.string().min(2),
    llmModel: z.string().min(2),
    sttModel: z.string().min(1),
    ttsModel: z.string().min(1),
    timezone: z.string().min(1),
});

type FormValues = z.infer<typeof schema>;

type UnknownModelKind = "STT" | "LLM" | "TTS";

function trimProviderPrefix(value: string) {
    return value.includes("/") ? value.split("/").at(-1) ?? value : value;
}

function humanizeModelId(value: string) {
    return trimProviderPrefix(value)
        .replace(/[:_.-]+/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatEstimatedMicros(value: number | string) {
    const micros = Number(value);
    if (!Number.isFinite(micros)) return null;
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 4,
    }).format(micros / 1_000_000);
}

function findModelOption<T extends ModelOption>(options: T[], value?: string) {
    if (!value) return undefined;
    return options.find(
        (option) =>
            option.id === value ||
            trimProviderPrefix(option.id) === value ||
            option.id.endsWith(`/${value}`)
    );
}

function ensureSelectedModelOption<T extends ModelOption>(
    options: T[],
    value: string | undefined,
    kind: UnknownModelKind
): T[] {
    if (!value || options.some((option) => option.id === value)) return options;

    const matched = findModelOption(options, value);
    const fallback = {
        ...(matched ?? {
            label: `Configured ${kind}: ${humanizeModelId(value)}`,
            provider: "Configured",
        }),
        id: value,
    } as T;

    return [fallback, ...options];
}

function ensureSelectedLanguageModelOption(
    options: LanguageAwareModelOption[],
    value: string | undefined,
    kind: Exclude<UnknownModelKind, "LLM">
) {
    if (!value || options.some((option) => option.id === value)) return options;

    const matched = findModelOption(options, value);
    const fallback: LanguageAwareModelOption = {
        ...(matched ?? {
            label: `Configured ${kind}: ${humanizeModelId(value)}`,
            provider: "Configured",
            languages: [],
        }),
        id: value,
        languages: matched?.languages ?? [],
    };

    return [fallback, ...options];
}

function ensureSelectedVoiceOption(options: Voice[], value: string | undefined) {
    if (!value || options.some((voice) => voice.id === value)) return options;

    const fallback: Voice = {
        id: value,
        name: `Configured voice: ${humanizeModelId(value)}`,
        provider: "Configured",
        gender: "neutral",
        locale: "",
        accent: "",
        languages: [],
        ttsModels: [],
        styles: ["Saved configuration"],
        useCases: [],
    };

    return [fallback, ...options];
}

export function VoiceTab({ agentId }: { agentId: string }) {
    const { data: session } = authClient.useSession();
    const isMasterAdmin = (session?.user as { role?: string })?.role === "admin";
    const { data: config, isLoading } = useAgentConfig(agentId);
    const { data: voiceCatalog } = useVoiceCatalog();
    const configured = useConfiguredProviders();
    const save = useSaveAgentConfig(agentId);
    const voiceOptions = useMemo(
        () => (voiceCatalog ? buildVoiceOptionsFromCatalog(voiceCatalog) : null),
        [voiceCatalog]
    );
    const languages = voiceOptions?.languages ?? LANGUAGES;
    const timezones = voiceOptions?.timezones ?? COMMON_TIMEZONES;
    const llmModels = voiceOptions?.llmModels ?? LLM_MODELS;

    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            voiceId: "aura-2-asteria-en",
            agent_language: "en",
            llmModel: "bedrock/us.anthropic.claude-haiku-4-5-20251001-v1:0",
            sttModel: "deepgram/nova-3",
            ttsModel: "deepgram/aura-2",
            timezone: "UTC",
        },
    });

    useEffect(() => {
        if (!config) return;
        form.reset({
            voiceId: config.voiceId,
            agent_language: normalizeLanguageCode(config.agent_language),
            llmModel: config.llmModel,
            sttModel: config.sttModel ?? "deepgram/nova-3",
            ttsModel: config.ttsModel ?? "deepgram/aura-2",
            timezone: config.timezone,
        });
    }, [config, form]);

    const selectedLanguage = useWatch({
        control: form.control,
        name: "agent_language",
    });
    const selectedSttModel = useWatch({
        control: form.control,
        name: "sttModel",
    });
    const selectedLlmModel = useWatch({
        control: form.control,
        name: "llmModel",
    });
    const selectedTtsModel = useWatch({
        control: form.control,
        name: "ttsModel",
    });
    const selectedVoiceId = useWatch({
        control: form.control,
        name: "voiceId",
    });

    const availableSttModels = useMemo(() => {
        const forLang = getSttModelsForLanguage(selectedLanguage, voiceOptions ?? undefined);
        if (!isMasterAdmin && configured.hasAnySttConfigured) {
            return forLang.filter((m) => isSttModelConfigured(m, configured));
        }
        return forLang;
    }, [selectedLanguage, voiceOptions, configured, isMasterAdmin]);

    const availableTtsModels = useMemo(() => {
        const forLang = getTtsModelsForLanguage(selectedLanguage, voiceOptions ?? undefined);
        if (!isMasterAdmin && configured.hasAnyTtsConfigured) {
            return forLang.filter((m) => isTtsModelConfigured(m, configured));
        }
        return forLang;
    }, [selectedLanguage, voiceOptions, configured, isMasterAdmin]);

    const availableVoices = useMemo(() => {
        const forTts = getVoicesForTtsModel(selectedTtsModel, selectedLanguage, voiceOptions ?? undefined);
        if (!isMasterAdmin && configured.hasAnyTtsConfigured) {
            return forTts.filter((v) => isVoiceConfigured(v, configured));
        }
        return forTts;
    }, [selectedLanguage, selectedTtsModel, voiceOptions, configured, isMasterAdmin]);
    const sttModelsWithConfiguredValue = useMemo(
        () => ensureSelectedLanguageModelOption(availableSttModels, selectedSttModel, "STT"),
        [availableSttModels, selectedSttModel]
    );
    const llmModelsWithConfiguredValue = useMemo(
        () => ensureSelectedModelOption(llmModels, selectedLlmModel, "LLM"),
        [llmModels, selectedLlmModel]
    );
    const ttsModelsWithConfiguredValue = useMemo(
        () => ensureSelectedLanguageModelOption(availableTtsModels, selectedTtsModel, "TTS"),
        [availableTtsModels, selectedTtsModel]
    );
    const voicesWithConfiguredValue = useMemo(
        () => ensureSelectedVoiceOption(availableVoices, selectedVoiceId),
        [availableVoices, selectedVoiceId]
    );
    const selectedVoice = useMemo(
        () => voicesWithConfiguredValue.find((voice) => voice.id === selectedVoiceId),
        [selectedVoiceId, voicesWithConfiguredValue]
    );
    const selectedLanguageLabel =
        languages.find((language) => language.code === selectedLanguage)?.label ?? selectedLanguage;
    const selectedTtsModelLabel =
        ttsModelsWithConfiguredValue.find((model) => model.id === selectedTtsModel)?.label ?? selectedTtsModel;
    const estimatedModelPrice =
        config?.estimatedPricePerMinuteMicros === null ||
        config?.estimatedPricePerMinuteMicros === undefined
            ? null
            : formatEstimatedMicros(config.estimatedPricePerMinuteMicros);
    const estimateMatchesSelection = Boolean(
        config &&
        config.sttModel === selectedSttModel &&
        config.llmModel === selectedLlmModel &&
        config.ttsModel === selectedTtsModel
    );

    const isSelectedSttConfigured = isSttModelConfigured(
        { id: selectedSttModel, provider: selectedSttModel.split("/")[0], label: "", languages: [] },
        configured
    );
    const isSelectedTtsConfigured = isTtsModelConfigured(
        { id: selectedTtsModel, provider: selectedTtsModel.split("/")[0], label: "", languages: [] },
        configured
    );

    async function onSubmit(values: FormValues) {
        await save.mutateAsync(mergeConfig(config, values));
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <section className="border bg-card p-6">
                    <div className="mb-5 space-y-1">
                        <h2 className="text-base font-semibold">Locale</h2>
                        <p className="text-sm text-muted-foreground">
                            Choose the caller language before selecting speech models.
                        </p>
                    </div>
                    <div className="grid min-w-0 gap-5 sm:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="agent_language"
                            render={({ field }) => (
                                <FormItem className="min-w-0">
                                    <FormLabel>Language</FormLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger className="w-full min-w-0">
                                                <SelectValue />
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
                        <FormField
                            control={form.control}
                            name="timezone"
                            render={({ field }) => (
                                <FormItem className="min-w-0">
                                    <FormLabel>Timezone</FormLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger className="w-full min-w-0">
                                                <SelectValue />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {timezones.map((timezone) => (
                                                <SelectItem key={timezone} value={timezone}>
                                                    {timezone}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </section>

                <section className="border bg-card p-6">
                    <div className="mb-5 flex items-center justify-between">
                        <div className="space-y-1">
                            <h2 className="text-base font-semibold">Conversation models</h2>
                            <p className="text-sm text-muted-foreground">
                                Pick transcription and reasoning models for the selected language.
                            </p>
                        </div>
                        {configured.hasAnySttConfigured && (
                            <Badge variant="outline" className="gap-1 border-primary/40 text-primary bg-primary/5 text-[11px]">
                                <CheckCircle2 className="size-3" /> {isMasterAdmin ? "Configured STT Active" : "Allocated STT Active"}
                            </Badge>
                        )}
                    </div>
                    <div className="grid min-w-0 gap-5 sm:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="sttModel"
                            render={({ field }) => (
                                <FormItem className="min-w-0">
                                    <FormLabel>STT</FormLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger className="w-full min-w-0">
                                                <SelectValue />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {sttModelsWithConfiguredValue.map((model) => {
                                                const isConf = isSttModelConfigured(model, configured);
                                                return (
                                                    <SelectItem key={model.id} value={model.id}>
                                                        <div className="flex items-center justify-between gap-3 w-full">
                                                            <span>{model.label}</span>
                                                            {configured.hasAnySttConfigured && (
                                                                <span className={cn(
                                                                    "text-[10px] px-1.5 py-0.5 rounded font-normal",
                                                                    isConf ? "bg-primary/10 text-primary" : "text-muted-foreground/60"
                                                                )}>
                                                                    {isConf ? "Configured" : "No API key"}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectContent>
                                    </Select>
                                    {!isSelectedSttConfigured && configured.hasAnySttConfigured && (
                                        <p className="text-xs text-amber-500 flex items-center gap-1 mt-1.5">
                                            <AlertCircle className="size-3 shrink-0" />
                                            No API key configured for this provider in Settings &gt; Providers.
                                        </p>
                                    )}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="llmModel"
                            render={({ field }) => (
                                <FormItem className="min-w-0">
                                    <FormLabel>LLM</FormLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger className="w-full min-w-0">
                                                <SelectValue />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {llmModelsWithConfiguredValue.map((model) => (
                                                <SelectItem key={model.id} value={model.id}>
                                                    {model.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {estimatedModelPrice ? (
                        <div className="mt-5 border bg-muted/20 p-4">
                            {estimateMatchesSelection ? (
                                <p className="text-sm font-medium">
                                    Estimated AI + platform spend: {estimatedModelPrice} / connected minute
                                </p>
                            ) : (
                                <p className="text-sm font-medium">
                                    Save these model choices to refresh the cost estimate.
                                </p>
                            )}
                            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                                This estimate includes configured STT, TTS, and LLM usage plus the $0.01-per-connected-minute QuickVoice platform fee. Telephony is charged separately at the provider rate plus markup; actual spend varies with measured usage.
                            </p>
                        </div>
                    ) : null}
                </section>

                <section className="border bg-card p-6">
                    <div className="mb-5 flex items-center justify-between">
                        <div className="space-y-1">
                            <h2 className="text-base font-semibold">Speech output</h2>
                            <p className="text-sm text-muted-foreground">
                                Select a text-to-speech model and a compatible voice.
                            </p>
                        </div>
                        {configured.hasAnyTtsConfigured && (
                            <Badge variant="outline" className="gap-1 border-primary/40 text-primary bg-primary/5 text-[11px]">
                                <CheckCircle2 className="size-3" /> {isMasterAdmin ? "Configured TTS Active" : "Allocated TTS Active"}
                            </Badge>
                        )}
                    </div>
                    <div className="grid min-w-0 gap-5 sm:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="ttsModel"
                            render={({ field }) => (
                                <FormItem className="min-w-0">
                                    <FormLabel>TTS</FormLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger className="w-full min-w-0">
                                                <SelectValue />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {ttsModelsWithConfiguredValue.map((model) => {
                                                const isConf = isTtsModelConfigured(model, configured);
                                                return (
                                                    <SelectItem key={model.id} value={model.id}>
                                                        <div className="flex items-center justify-between gap-3 w-full">
                                                            <span>{model.label}</span>
                                                            {configured.hasAnyTtsConfigured && (
                                                                <span className={cn(
                                                                    "text-[10px] px-1.5 py-0.5 rounded font-normal",
                                                                    isConf ? "bg-primary/10 text-primary" : "text-muted-foreground/60"
                                                                )}>
                                                                    {isConf ? "Configured" : "No API key"}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectContent>
                                    </Select>
                                    {!isSelectedTtsConfigured && configured.hasAnyTtsConfigured && (
                                        <p className="text-xs text-amber-500 flex items-center gap-1 mt-1.5">
                                            <AlertCircle className="size-3 shrink-0" />
                                            No API key configured for this provider in Settings &gt; Providers.
                                        </p>
                                    )}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="voiceId"
                            render={({ field }) => (
                                <FormItem className="min-w-0">
                                    <FormLabel>Voice</FormLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger className="w-full min-w-0">
                                                <SelectValue placeholder="Select a voice" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {voicesWithConfiguredValue.map((voice) => (
                                                <SelectItem key={voice.id} value={voice.id}>
                                                    {voice.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="mt-5">
                        <VoiceProfilePanel
                            voice={selectedVoice}
                            languageLabel={selectedLanguageLabel}
                            ttsModelLabel={selectedTtsModelLabel}
                        />
                    </div>
                </section>

                <div className="flex items-center justify-end gap-3">
                    <Button
                        type="submit"
                        disabled={save.isPending || isLoading || !form.formState.isDirty}
                    >
                        {save.isPending ? (
                            <>
                                <Loader2 className="animate-spin" /> Saving...
                            </>
                        ) : (
                            <>
                                <Save /> Save changes
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}

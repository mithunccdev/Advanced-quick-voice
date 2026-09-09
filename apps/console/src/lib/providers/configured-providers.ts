import { useMemo } from "react";
import { authClient } from "@/src/lib/auth-client";
import type {
  LanguageAwareModelOption,
  Voice,
} from "@/src/lib/data/voices";

export interface SttProviderSettings {
  deepgramApiKey?: string;
  deepgramDefaultModel?: string;
  sarvamApiKey?: string;
  sarvamSttModel?: string;
}

export interface TtsProviderSettings {
  elevenlabsApiKey?: string;
  elevenlabsModel?: string;
  cartesiaApiKey?: string;
  sarvamApiKey?: string;
  sarvamTtsSpeaker?: string;
  deepgramTtsEnabled?: boolean;
}

export interface LlmProviderSettings {
  openrouterApiKey?: string;
  deepseekApiKey?: string;
  openaiApiKey?: string;
  anthropicApiKey?: string;
  geminiApiKey?: string;
  awsAccessKeyId?: string;
  awsSecretAccessKey?: string;
  awsRegion?: string;
}

export interface OrgProvidersMetadata {
  telephony?: Record<string, unknown>;
  stt?: SttProviderSettings;
  tts?: TtsProviderSettings;
  llm?: LlmProviderSettings;
}

export interface ConfiguredProviders {
  raw: OrgProvidersMetadata | null;
  // Provider configured flags
  configuredSttProviders: Set<string>;
  configuredTtsProviders: Set<string>;
  configuredLlmProviders: Set<string>;
  hasAnySttConfigured: boolean;
  hasAnyTtsConfigured: boolean;
  hasAnyLlmConfigured: boolean;
  // Specific provider status
  hasDeepgramStt: boolean;
  hasSarvamStt: boolean;
  hasElevenLabsTts: boolean;
  hasCartesiaTts: boolean;
  hasSarvamTts: boolean;
  hasDeepgramTts: boolean;
  // Suggested defaults
  defaultSttModelId?: string;
  defaultTtsModelId?: string;
  defaultVoiceId?: string;
}

function normalizeProviderName(provider: string): string {
  const p = provider.trim().toLowerCase();
  if (p.includes("deepgram")) return "deepgram";
  if (p.includes("eleven")) return "elevenlabs";
  if (p.includes("cartesia")) return "cartesia";
  if (p.includes("sarvam")) return "sarvam";
  if (p.includes("openai") || p.includes("whisper")) return "openai";
  if (p.includes("anthropic") || p.includes("claude")) return "anthropic";
  if (p.includes("deepseek")) return "deepseek";
  if (p.includes("openrouter")) return "openrouter";
  if (p.includes("bedrock") || p.includes("amazon")) return "bedrock";
  if (p.includes("gemini") || p.includes("google")) return "google";
  return p;
}

export function parseOrgProviders(metadata: unknown): OrgProvidersMetadata | null {
  if (!metadata) return null;
  try {
    const meta = typeof metadata === "string" ? JSON.parse(metadata) : metadata;
    return (meta?.providers as OrgProvidersMetadata) ?? null;
  } catch {
    return null;
  }
}

export function extractConfiguredProviders(
  providers: OrgProvidersMetadata | null
): ConfiguredProviders {
  const configuredSttProviders = new Set<string>();
  const configuredTtsProviders = new Set<string>();
  const configuredLlmProviders = new Set<string>();

  const stt = providers?.stt;
  const tts = providers?.tts;
  const llm = providers?.llm;

  const hasDeepgramStt = Boolean(stt?.deepgramApiKey?.trim());
  const hasSarvamStt = Boolean(stt?.sarvamApiKey?.trim());

  if (hasDeepgramStt) configuredSttProviders.add("deepgram");
  if (hasSarvamStt) configuredSttProviders.add("sarvam");

  const hasElevenLabsTts = Boolean(tts?.elevenlabsApiKey?.trim());
  const hasCartesiaTts = Boolean(tts?.cartesiaApiKey?.trim());
  const hasSarvamTts = Boolean(
    tts?.sarvamApiKey?.trim() ||
      stt?.sarvamApiKey?.trim() ||
      (tts?.sarvamTtsSpeaker && tts.sarvamTtsSpeaker.trim())
  );
  const hasDeepgramTts = Boolean(tts?.deepgramTtsEnabled || hasDeepgramStt);

  if (hasElevenLabsTts) configuredTtsProviders.add("elevenlabs");
  if (hasCartesiaTts) configuredTtsProviders.add("cartesia");
  if (hasSarvamTts) configuredTtsProviders.add("sarvam");
  if (hasDeepgramTts) configuredTtsProviders.add("deepgram");

  if (llm?.openaiApiKey?.trim()) configuredLlmProviders.add("openai");
  if (llm?.anthropicApiKey?.trim()) configuredLlmProviders.add("anthropic");
  if (llm?.deepseekApiKey?.trim()) configuredLlmProviders.add("deepseek");
  if (llm?.openrouterApiKey?.trim()) configuredLlmProviders.add("openrouter");
  if (llm?.geminiApiKey?.trim()) configuredLlmProviders.add("google");
  if (llm?.awsAccessKeyId?.trim() && llm?.awsSecretAccessKey?.trim()) {
    configuredLlmProviders.add("bedrock");
  }

  // Determine intelligent default STT
  let defaultSttModelId: string | undefined;
  if (stt?.deepgramDefaultModel && hasDeepgramStt) {
    defaultSttModelId = stt.deepgramDefaultModel.includes("/")
      ? stt.deepgramDefaultModel
      : `deepgram/${stt.deepgramDefaultModel}`;
  } else if (stt?.sarvamSttModel && hasSarvamStt) {
    defaultSttModelId = stt.sarvamSttModel.includes("/")
      ? stt.sarvamSttModel
      : `sarvam/${stt.sarvamSttModel}`;
  } else if (hasDeepgramStt) {
    defaultSttModelId = "deepgram/nova-3";
  } else if (hasSarvamStt) {
    defaultSttModelId = "sarvam/saaras:v3";
  }

  // Determine intelligent default TTS
  let defaultTtsModelId: string | undefined;
  if (tts?.elevenlabsModel && hasElevenLabsTts) {
    defaultTtsModelId = tts.elevenlabsModel.includes("/")
      ? tts.elevenlabsModel
      : `elevenlabs/${tts.elevenlabsModel}`;
  } else if (hasElevenLabsTts) {
    defaultTtsModelId = "elevenlabs/eleven_flash_v2_5";
  } else if (hasCartesiaTts) {
    defaultTtsModelId = "cartesia/sonic-2";
  } else if (hasSarvamTts) {
    defaultTtsModelId = "sarvam/bulbul:v3";
  } else if (hasDeepgramTts) {
    defaultTtsModelId = "deepgram/aura-2";
  }

  // Determine intelligent default Voice
  let defaultVoiceId: string | undefined;
  if (defaultTtsModelId?.startsWith("elevenlabs")) {
    defaultVoiceId = "21m00Tcm4TlvDq8ikWAM";
  } else if (defaultTtsModelId?.startsWith("sarvam")) {
    defaultVoiceId = tts?.sarvamTtsSpeaker
      ? tts.sarvamTtsSpeaker.toLowerCase()
      : "shubh";
  } else if (defaultTtsModelId?.startsWith("deepgram")) {
    defaultVoiceId = "aura-2-asteria-en";
  }

  return {
    raw: providers,
    configuredSttProviders,
    configuredTtsProviders,
    configuredLlmProviders,
    hasAnySttConfigured: configuredSttProviders.size > 0,
    hasAnyTtsConfigured: configuredTtsProviders.size > 0,
    hasAnyLlmConfigured: configuredLlmProviders.size > 0,
    hasDeepgramStt,
    hasSarvamStt,
    hasElevenLabsTts,
    hasCartesiaTts,
    hasSarvamTts,
    hasDeepgramTts,
    defaultSttModelId,
    defaultTtsModelId,
    defaultVoiceId,
  };
}

export function isSttModelConfigured(
  model: LanguageAwareModelOption,
  configured: ConfiguredProviders
): boolean {
  if (!configured.hasAnySttConfigured) return true;
  const provider = normalizeProviderName(model.provider || model.id.split("/")[0]);
  return configured.configuredSttProviders.has(provider);
}

export function isTtsModelConfigured(
  model: LanguageAwareModelOption,
  configured: ConfiguredProviders
): boolean {
  if (!configured.hasAnyTtsConfigured) return true;
  const provider = normalizeProviderName(model.provider || model.id.split("/")[0]);
  return configured.configuredTtsProviders.has(provider);
}

export function isVoiceConfigured(
  voice: Voice,
  configured: ConfiguredProviders
): boolean {
  if (!configured.hasAnyTtsConfigured) return true;
  if (voice.provider) {
    const provider = normalizeProviderName(voice.provider);
    if (configured.configuredTtsProviders.has(provider)) return true;
  }
  if (Array.isArray(voice.ttsModels) && voice.ttsModels.length > 0) {
    return voice.ttsModels.some((m) => {
      const p = normalizeProviderName(m.split("/")[0]);
      return configured.configuredTtsProviders.has(p);
    });
  }
  const fallbackProvider = normalizeProviderName(voice.id.split("-")[0]);
  return configured.configuredTtsProviders.has(fallbackProvider);
}

export function filterSttModels(
  models: LanguageAwareModelOption[],
  configured: ConfiguredProviders
): LanguageAwareModelOption[] {
  if (!configured.hasAnySttConfigured) return models;
  const filtered = models.filter((model) => isSttModelConfigured(model, configured));
  return filtered.length > 0 ? filtered : models;
}

export function filterTtsModels(
  models: LanguageAwareModelOption[],
  configured: ConfiguredProviders
): LanguageAwareModelOption[] {
  if (!configured.hasAnyTtsConfigured) return models;
  const filtered = models.filter((model) => isTtsModelConfigured(model, configured));
  return filtered.length > 0 ? filtered : models;
}

export function filterVoices(
  voices: Voice[],
  configured: ConfiguredProviders
): Voice[] {
  if (!configured.hasAnyTtsConfigured) return voices;
  const filtered = voices.filter((voice) => isVoiceConfigured(voice, configured));
  return filtered.length > 0 ? filtered : voices;
}

export function useConfiguredProviders(): ConfiguredProviders {
  const { data: activeOrg } = authClient.useActiveOrganization();

  return useMemo(() => {
    const rawProviders = parseOrgProviders(activeOrg?.metadata);
    return extractConfiguredProviders(rawProviders);
  }, [activeOrg?.metadata]);
}

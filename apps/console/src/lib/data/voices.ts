// Fallback catalog used while the runtime voice catalog is loading or
// unavailable. These IDs mirror the values accepted by the LiveKit worker.

import type { VoiceCatalog } from "@/src/lib/api/types";

export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "Hindi" },
  { code: "en-IN", label: "English (India)" },
] as const;

const ALL_LANGUAGE_CODES = LANGUAGES.map((language) => language.code);

export type VoiceGender = "feminine" | "masculine" | "neutral";
export type LanguageCode = string;

export interface ModelOption {
  id: string;
  label: string;
  provider: string;
}

export interface LanguageAwareModelOption extends ModelOption {
  languages: LanguageCode[];
}

export interface Voice {
  id: string;
  name: string;
  provider: string;
  gender: VoiceGender;
  locale: string;
  accent: string;
  languages: LanguageCode[];
  ttsModels: string[];
  styles: string[];
  useCases: string[];
}

export interface VoiceOptions {
  languages: Array<{ code: string; label: string }>;
  timezones: string[];
  sttModels: LanguageAwareModelOption[];
  llmModels: ModelOption[];
  ttsModels: LanguageAwareModelOption[];
  voices: Voice[];
}

export const VOICES: Voice[] = [
  {
    id: "aura-2-asteria-en",
    name: "Asteria",
    provider: "Deepgram",
    gender: "feminine",
    locale: "en-US",
    accent: "American",
    languages: ["en"],
    ttsModels: ["deepgram/aura-2"],
    styles: ["Clear", "Confident", "Energetic"],
    useCases: ["Advertising", "Customer service"],
  },
  {
    id: "aura-2-apollo-en",
    name: "Apollo",
    provider: "Deepgram",
    gender: "masculine",
    locale: "en-US",
    accent: "American",
    languages: ["en"],
    ttsModels: ["deepgram/aura-2"],
    styles: ["Confident", "Comfortable"],
    useCases: ["Casual chat"],
  },
  {
    id: "aura-2-hera-en",
    name: "Hera",
    provider: "Deepgram",
    gender: "feminine",
    locale: "en-US",
    accent: "American",
    languages: ["en"],
    ttsModels: ["deepgram/aura-2"],
    styles: ["Smooth", "Warm", "Professional"],
    useCases: ["Informative"],
  },
  {
    id: "aura-2-zeus-en",
    name: "Zeus",
    provider: "Deepgram",
    gender: "masculine",
    locale: "en-US",
    accent: "American",
    languages: ["en"],
    ttsModels: ["deepgram/aura-2"],
    styles: ["Deep", "Trustworthy", "Smooth"],
    useCases: ["IVR"],
  },
  {
    id: "aura-2-luna-en",
    name: "Luna",
    provider: "Deepgram",
    gender: "feminine",
    locale: "en-US",
    accent: "American",
    languages: ["en"],
    ttsModels: ["deepgram/aura-2"],
    styles: ["Friendly", "Natural"],
    useCases: ["IVR"],
  },
  {
    id: "aura-2-draco-en",
    name: "Draco",
    provider: "Deepgram",
    gender: "masculine",
    locale: "en-GB",
    accent: "British",
    languages: ["en"],
    ttsModels: ["deepgram/aura-2"],
    styles: ["Warm", "Trustworthy", "Baritone"],
    useCases: ["Storytelling"],
  },
  {
    id: "21m00Tcm4TlvDq8ikWAM",
    name: "Rachel",
    provider: "ElevenLabs",
    gender: "feminine",
    locale: "en-US",
    accent: "American",
    languages: [...ALL_LANGUAGE_CODES],
    ttsModels: [
      "elevenlabs/eleven_flash_v2_5",
      "elevenlabs/eleven_turbo_v2_5",
    ],
    styles: ["Calm", "Narrative", "Clear"],
    useCases: ["Customer service", "Narration"],
  },
  {
    id: "ErXwobaYiN019PkySvjV",
    name: "Antoni",
    provider: "ElevenLabs",
    gender: "masculine",
    locale: "en-US",
    accent: "American",
    languages: [...ALL_LANGUAGE_CODES],
    ttsModels: [
      "elevenlabs/eleven_flash_v2_5",
      "elevenlabs/eleven_turbo_v2_5",
    ],
    styles: ["Well-rounded", "Warm"],
    useCases: ["Conversational agents", "Narration"],
  },
  {
    id: "EXAVITQu4vr4xnSDxMaL",
    name: "Bella",
    provider: "ElevenLabs",
    gender: "feminine",
    locale: "en-US",
    accent: "American",
    languages: [...ALL_LANGUAGE_CODES],
    ttsModels: [
      "elevenlabs/eleven_flash_v2_5",
      "elevenlabs/eleven_turbo_v2_5",
    ],
    styles: ["Soft", "Warm"],
    useCases: ["Customer service", "Conversational agents"],
  },
  {
    id: "pNInz6obpgDQGcFmaJgB",
    name: "Adam",
    provider: "ElevenLabs",
    gender: "masculine",
    locale: "en-US",
    accent: "American",
    languages: [...ALL_LANGUAGE_CODES],
    ttsModels: [
      "elevenlabs/eleven_flash_v2_5",
      "elevenlabs/eleven_turbo_v2_5",
    ],
    styles: ["Deep", "Narrative"],
    useCases: ["IVR", "Narration"],
  },
  {
    id: "shubh",
    name: "Shubh",
    provider: "Sarvam",
    gender: "masculine",
    locale: "hi-IN",
    accent: "Indian",
    languages: ["hi", "en-IN"],
    ttsModels: ["sarvam/bulbul:v3"],
    styles: ["Conversational"],
    useCases: ["Voice agents", "Customer service"],
  },
  {
    id: "f786b574-daa5-4673-aa0c-cbe3e8534c02",
    name: "Katie",
    provider: "Cartesia",
    gender: "feminine",
    locale: "en-US",
    accent: "American",
    languages: [...ALL_LANGUAGE_CODES],
    ttsModels: ["sonic-3.5", "sonic-3", "sonic-2", "sonic-turbo"],
    styles: ["Stable", "Realistic"],
    useCases: ["Voice agents", "Customer service"],
  },
  {
    id: "a5136bf9-224c-4d76-b823-52bd5efcffcc",
    name: "Jameson",
    provider: "Cartesia",
    gender: "masculine",
    locale: "en-US",
    accent: "American",
    languages: [...ALL_LANGUAGE_CODES],
    ttsModels: ["sonic-3.5", "sonic-3", "sonic-2", "sonic-turbo"],
    styles: ["Stable", "Realistic"],
    useCases: ["Voice agents", "Customer service"],
  },
  {
    id: "228fca29-3a0a-435c-8728-5cb483251068",
    name: "Kiefer",
    provider: "Cartesia",
    gender: "masculine",
    locale: "en-US",
    accent: "American",
    languages: [...ALL_LANGUAGE_CODES],
    ttsModels: ["sonic-3.5", "sonic-3", "sonic-2", "sonic-turbo"],
    styles: ["Stable", "Conversational"],
    useCases: ["Voice agents", "Support"],
  },
  {
    id: "6ccbfb76-1fc6-48f7-b71d-91ac6298247b",
    name: "Tessa",
    provider: "Cartesia",
    gender: "feminine",
    locale: "en-US",
    accent: "American",
    languages: [...ALL_LANGUAGE_CODES],
    ttsModels: ["sonic-3.5", "sonic-3", "sonic-2", "sonic-turbo"],
    styles: ["Expressive", "Emotive"],
    useCases: ["Companion apps", "Characters"],
  },
  {
    id: "astra",
    name: "Astra",
    provider: "Rime",
    gender: "feminine",
    locale: "en-US",
    accent: "American",
    languages: ["en"],
    ttsModels: ["rime-arcana", "rime-mist"],
    styles: ["Bright", "Expressive"],
    useCases: ["Voice agents", "Conversational agents"],
  },
  {
    id: "luna",
    name: "Luna",
    provider: "Rime",
    gender: "feminine",
    locale: "en-US",
    accent: "American",
    languages: ["en"],
    ttsModels: ["rime-arcana", "rime-mist"],
    styles: ["Bright", "Casual"],
    useCases: ["Voice agents", "Customer service"],
  },
  {
    id: "masonry",
    name: "Masonry",
    provider: "Rime",
    gender: "masculine",
    locale: "en-US",
    accent: "Southern",
    languages: ["en"],
    ttsModels: ["rime-arcana"],
    styles: ["Confident", "Low"],
    useCases: ["Professional agents", "Narration"],
  },
  {
    id: "cove",
    name: "Cove",
    provider: "Rime",
    gender: "feminine",
    locale: "en-US",
    accent: "American",
    languages: ["en"],
    ttsModels: ["rime-mist"],
    styles: ["Clear", "Natural"],
    useCases: ["Voice agents", "Customer service"],
  },
  {
    id: "sarvam-shubh",
    name: "Shubh",
    provider: "Sarvam AI",
    gender: "masculine",
    locale: "hi-IN",
    accent: "Indian",
    languages: ["hi", "en-IN", "en"],
    ttsModels: ["sarvam/bulbul:v3"],
    styles: ["Conversational", "Friendly", "Engaging"],
    useCases: ["Customer Service", "Sales", "Banking"],
  },
  {
    id: "sarvam-meera",
    name: "Meera",
    provider: "Sarvam AI",
    gender: "feminine",
    locale: "hi-IN",
    accent: "Indian",
    languages: ["hi", "en-IN", "en"],
    ttsModels: ["sarvam/bulbul:v3"],
    styles: ["Warm", "Polite", "Clear"],
    useCases: ["Support Desk", "Inbound Receptionist"],
  },
  {
    id: "sarvam-dhruv",
    name: "Dhruv",
    provider: "Sarvam AI",
    gender: "masculine",
    locale: "hi-IN",
    accent: "Indian",
    languages: ["hi", "en-IN", "en"],
    ttsModels: ["sarvam/bulbul:v3"],
    styles: ["Confident", "Professional", "Deep"],
    useCases: ["Verification", "Financial Services"],
  },
  {
    id: "sarvam-ananya",
    name: "Ananya",
    provider: "Sarvam AI",
    gender: "feminine",
    locale: "hi-IN",
    accent: "Indian",
    languages: ["hi", "en-IN", "en"],
    ttsModels: ["sarvam/bulbul:v3"],
    styles: ["Soft", "Empathetic", "Reassuring"],
    useCases: ["Healthcare", "Appointment Reminders"],
  },
  {
    id: "sarvam-aditya",
    name: "Aditya",
    provider: "Sarvam AI",
    gender: "masculine",
    locale: "hi-IN",
    accent: "Indian",
    languages: ["hi", "en-IN", "en"],
    ttsModels: ["sarvam/bulbul:v3"],
    styles: ["Deep", "Authoritative", "Executive"],
    useCases: ["Enterprise Dispatch", "Security"],
  },
];

export function normalizeLanguageCode(language: string): LanguageCode {
  const normalized = language.trim().toLowerCase();
  const baseLanguage = normalized.split("-", 1)[0];
  const matched = LANGUAGES.find(
    (option) => option.code === normalized || option.code === baseLanguage,
  );

  return matched?.code ?? "en";
}

function supportsLanguage(
  option: { languages: LanguageCode[] },
  language: string,
) {
  return option.languages.includes(normalizeLanguageCode(language));
}

export function getVoicesForTtsModel(
  ttsModel: string,
  language = "en",
  options: VoiceOptions = STATIC_VOICE_OPTIONS,
) {
  return options.voices.filter(
    (voice) =>
      voice.ttsModels.includes(ttsModel) && supportsLanguage(voice, language),
  );
}

export function getDefaultVoiceForTtsModel(
  ttsModel: string,
  language = "en",
  options: VoiceOptions = STATIC_VOICE_OPTIONS,
) {
  return (
    getVoicesForTtsModel(ttsModel, language, options)[0]?.id ??
    options.voices[0]?.id ??
    ""
  );
}

export const LLM_MODELS: ModelOption[] = [
  // OpenRouter Models
  {
    id: "openrouter/auto",
    label: "OpenRouter (Auto Best Provider)",
    provider: "OpenRouter",
  },
  {
    id: "openrouter/deepseek/deepseek-r1",
    label: "DeepSeek R1 (OpenRouter)",
    provider: "OpenRouter",
  },
  {
    id: "openrouter/deepseek/deepseek-chat",
    label: "DeepSeek V3 (OpenRouter)",
    provider: "OpenRouter",
  },
  {
    id: "openrouter/meta-llama/llama-3.3-70b-instruct",
    label: "Llama 3.3 70B Instruct (OpenRouter)",
    provider: "OpenRouter",
  },
  {
    id: "openrouter/qwen/qwen-2.5-72b-instruct",
    label: "Qwen 2.5 72B (OpenRouter)",
    provider: "OpenRouter",
  },

  // DeepSeek Direct
  {
    id: "deepseek/deepseek-chat",
    label: "DeepSeek V3 (Direct API)",
    provider: "DeepSeek",
  },
  {
    id: "deepseek/deepseek-reasoner",
    label: "DeepSeek R1 (Direct API)",
    provider: "DeepSeek",
  },

  // OpenAI
  {
    id: "openai/gpt-4o",
    label: "OpenAI GPT-4o",
    provider: "OpenAI",
  },
  {
    id: "openai/gpt-4o-mini",
    label: "OpenAI GPT-4o Mini",
    provider: "OpenAI",
  },
  {
    id: "openai/o3-mini",
    label: "OpenAI o3-mini",
    provider: "OpenAI",
  },
  {
    id: "openai/o1",
    label: "OpenAI o1 Reasoning",
    provider: "OpenAI",
  },

  // Anthropic Claude
  {
    id: "anthropic/claude-3-7-sonnet",
    label: "Claude 3.7 Sonnet (Hybrid Reasoning)",
    provider: "Anthropic",
  },
  {
    id: "anthropic/claude-3-5-sonnet-20241022",
    label: "Claude 3.5 Sonnet",
    provider: "Anthropic",
  },
  {
    id: "anthropic/claude-3-5-haiku-20241022",
    label: "Claude 3.5 Haiku",
    provider: "Anthropic",
  },

  // Google Gemini
  {
    id: "google/gemini-2.0-flash",
    label: "Google Gemini 2.0 Flash",
    provider: "Google",
  },
  {
    id: "google/gemini-1.5-flash",
    label: "Google Gemini 1.5 Flash",
    provider: "Google",
  },
  {
    id: "google/gemini-1.5-pro",
    label: "Google Gemini 1.5 Pro",
    provider: "Google",
  },

  // Amazon Bedrock
  {
    id: "bedrock/us.anthropic.claude-haiku-4-5-20251001-v1:0",
    label: "Claude Haiku 4.5 (Bedrock)",
    provider: "Amazon Bedrock",
  },
  {
    id: "bedrock/us.anthropic.claude-sonnet-4-5-20250929-v1:0",
    label: "Claude Sonnet 4.5 (Bedrock)",
    provider: "Amazon Bedrock",
  },
  {
    id: "bedrock/us.amazon.nova-micro-v1:0",
    label: "Amazon Nova Micro (Bedrock)",
    provider: "Amazon Bedrock",
  },
  {
    id: "bedrock/us.amazon.nova-lite-v1:0",
    label: "Amazon Nova Lite (Bedrock)",
    provider: "Amazon Bedrock",
  },
];

export const COMMON_TIMEZONES = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Berlin",
  "Asia/Kolkata",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Australia/Sydney",
];

export const STT_MODELS: LanguageAwareModelOption[] = [
  {
    id: "deepgram/nova-3",
    label: "Nova-3",
    provider: "Deepgram",
    languages: ["en", "en-IN"],
  },
  {
    id: "deepgram/nova-3-multilingual",
    label: "Nova-3 Multilingual",
    provider: "Deepgram",
    languages: ["en", "en-IN", "hi"],
  },
  {
    id: "deepgram/nova-2",
    label: "Nova-2",
    provider: "Deepgram",
    languages: ["en", "en-IN"],
  },
  {
    id: "sarvam/saaras:v3",
    label: "Saaras v3",
    provider: "Sarvam",
    languages: ["hi", "en-IN"],
  },
];

export const TTS_MODELS: LanguageAwareModelOption[] = [
  {
    id: "elevenlabs/eleven_flash_v2_5",
    label: "Eleven Flash v2.5",
    provider: "ElevenLabs",
    languages: [...ALL_LANGUAGE_CODES],
  },
  {
    id: "elevenlabs/eleven_turbo_v2_5",
    label: "Eleven Turbo v2.5",
    provider: "ElevenLabs",
    languages: [...ALL_LANGUAGE_CODES],
  },
  {
    id: "deepgram/aura-2",
    label: "Aura-2",
    provider: "Deepgram",
    languages: ["en"],
  },
  {
    id: "sarvam/bulbul:v3",
    label: "Bulbul v3",
    provider: "Sarvam",
    languages: ["hi", "en-IN"],
  },
];

export const STATIC_VOICE_OPTIONS: VoiceOptions = {
  languages: [...LANGUAGES],
  timezones: [...COMMON_TIMEZONES],
  sttModels: [...STT_MODELS],
  llmModels: [...LLM_MODELS],
  ttsModels: [...TTS_MODELS],
  voices: [...VOICES],
};

function providerModelId(provider: string, id: string) {
  return `${provider}/${id}`;
}

function catalogLanguages(languages: string[] | undefined) {
  return languages?.length ? languages : ["en"];
}

export function buildVoiceOptionsFromCatalog(
  catalog: VoiceCatalog,
): VoiceOptions {
  return {
    languages: catalog.languages.map((language) => ({
      code: language.id,
      label: language.label,
    })),
    timezones: catalog.timezones,
    sttModels: catalog.stt_models.map((model) => ({
      id: providerModelId(model.provider, model.id),
      label: model.label,
      provider: model.provider,
      languages: catalogLanguages(model.languages),
    })),
    llmModels: catalog.llm_models.map((model) => ({
      id: providerModelId(model.provider, model.id),
      label: model.label,
      provider: model.provider,
    })),
    ttsModels: catalog.tts_models.map((model) => ({
      id: providerModelId(model.provider, model.id),
      label: model.label,
      provider: model.provider,
      languages: catalogLanguages(model.languages),
    })),
    voices: catalog.voices.map((voice) => ({
      id: voice.id,
      name: voice.label,
      provider: voice.provider,
      gender: "neutral",
      locale: voice.languages?.[0] ?? "en",
      accent: "",
      languages: catalogLanguages(voice.languages),
      ttsModels: (voice.tts_models ?? []).map((model) =>
        providerModelId(voice.provider, model),
      ),
      styles: [],
      useCases: [],
    })),
  };
}

export function getSttModelsForLanguage(
  language: string,
  options: VoiceOptions = STATIC_VOICE_OPTIONS,
) {
  return options.sttModels.filter((model) => supportsLanguage(model, language));
}

export function getTtsModelsForLanguage(
  language: string,
  options: VoiceOptions = STATIC_VOICE_OPTIONS,
) {
  return options.ttsModels.filter((model) => supportsLanguage(model, language));
}

export function getDefaultSttModelForLanguage(
  language: string,
  options: VoiceOptions = STATIC_VOICE_OPTIONS,
) {
  return (
    getSttModelsForLanguage(language, options)[0]?.id ??
    options.sttModels[0]?.id ??
    ""
  );
}

export function getDefaultTtsModelForLanguage(
  language: string,
  options: VoiceOptions = STATIC_VOICE_OPTIONS,
) {
  return (
    getTtsModelsForLanguage(language, options)[0]?.id ??
    options.ttsModels[0]?.id ??
    ""
  );
}

import os
import warnings
from dataclasses import dataclass
from typing import Any

from livekit.plugins import deepgram, elevenlabs, sarvam

with warnings.catch_warnings():
    warnings.filterwarnings(
        "ignore",
        message="TranscribeStreamingClient is deprecated.*",
        category=DeprecationWarning,
    )
    try:
        from livekit.plugins import aws
    except Exception:
        aws = None

try:
    from livekit.plugins import openai as lk_openai
except Exception:
    lk_openai = None

try:
    from livekit.plugins import cartesia as lk_cartesia
except Exception:
    lk_cartesia = None


class ProviderAdapterError(RuntimeError):
    pass


@dataclass(frozen=True)
class VoiceProviderAdapters:
    stt: Any
    llm: Any
    tts: Any
    summary: dict[str, str]


def build_voice_provider_adapters(config: dict[str, Any]) -> VoiceProviderAdapters:
    stt = _build_stt(
        config["stt"],
        config["stt"].get("language", config["language"]),
    )
    llm = _build_llm(config["llm"])
    tts = _build_tts(config["tts"], config["language"])
    return VoiceProviderAdapters(
        stt=stt,
        llm=llm,
        tts=tts,
        summary={
            "stt_provider": config["stt"]["provider"],
            "stt_model": config["stt"]["model"],
            "llm_provider": config["llm"]["provider"],
            "llm_model": config["llm"]["model"],
            "tts_provider": config["tts"]["provider"],
            "tts_model": config["tts"]["model"],
            "tts_voice": config["tts"]["voice"],
        },
    )


def _build_stt(config: dict[str, Any], language: str):
    provider = config["provider"]
    model = config["model"]
    api_key = config.get("api_key")
    # ── Deepgram ─────────────────────────────────────────────────────────────
    if provider == "deepgram":
        return deepgram.STT(
            model=model,
            language=_deepgram_language(language),
            api_key=api_key or _required_env("DEEPGRAM_API_KEY"),
        )
    # ── Sarvam ───────────────────────────────────────────────────────────────
    if provider == "sarvam":
        return sarvam.STT(
            model=model,
            language=_sarvam_language(language),
            api_key=api_key or _required_env("SARVAM_API_KEY"),
        )
    # ── OpenAI Whisper ────────────────────────────────────────────────────────
    if provider == "openai":
        openai_plugin = _openai_plugin()
        return openai_plugin.STT(
            model=model,
            api_key=api_key or _required_env("OPENAI_API_KEY"),
        )
    raise ProviderAdapterError(f"unsupported STT provider: {provider}")


def _build_llm(config: dict[str, Any]):
    provider = config["provider"]
    model = config.get("model")
    api_key = config.get("api_key")
    # ── AWS Bedrock ───────────────────────────────────────────────────────────
    if provider == "bedrock":
        aws = _aws_plugin()
        kwargs: dict[str, Any] = {
            "model": model,
            "region": os.getenv("AWS_REGION", "us-east-1"),
        }
        access_key = config.get("aws_access_key_id") or os.getenv("AWS_ACCESS_KEY_ID")
        secret_key = config.get("aws_secret_access_key") or os.getenv("AWS_SECRET_ACCESS_KEY")
        if access_key or secret_key:
            if not access_key:
                raise ProviderAdapterError("AWS_ACCESS_KEY_ID is required when AWS_SECRET_ACCESS_KEY is set")
            if not secret_key:
                raise ProviderAdapterError("AWS_SECRET_ACCESS_KEY is required when AWS_ACCESS_KEY_ID is set")
            kwargs["api_key"] = access_key
            kwargs["api_secret"] = secret_key
        return aws.LLM(**kwargs)
    # ── OpenAI ────────────────────────────────────────────────────────────────
    if provider == "openai":
        openai_plugin = _openai_plugin()
        return openai_plugin.LLM(
            model=model,
            api_key=api_key or _required_env("OPENAI_API_KEY"),
        )
    # ── Groq (OpenAI-compatible) ─────────────────────────────────────────────
    if provider == "groq":
        openai_plugin = _openai_plugin()
        return openai_plugin.LLM(
            model=model,
            api_key=api_key or _required_env("GROQ_API_KEY"),
            base_url="https://api.groq.com/openai/v1",
        )
    # ── DeepSeek (OpenAI-compatible) ─────────────────────────────────────────
    if provider == "deepseek":
        openai_plugin = _openai_plugin()
        return openai_plugin.LLM(
            model=model,
            api_key=api_key or _required_env("DEEPSEEK_API_KEY"),
            base_url="https://api.deepseek.com/v1",
        )
    raise ProviderAdapterError(f"unsupported LLM provider: {provider}")


def _build_tts(config: dict[str, Any], language: str):
    provider = config["provider"]
    model = config["model"]
    voice = config["voice"]
    api_key = config.get("api_key")
    # ── ElevenLabs ───────────────────────────────────────────────────────────
    if provider == "elevenlabs":
        return elevenlabs.TTS(
            model=model,
            voice_id=voice,
            language=_elevenlabs_language(language),
            api_key=api_key or _required_env("ELEVENLABS_API_KEY"),
        )
    # ── Deepgram ──────────────────────────────────────────────────────────────
    if provider == "deepgram":
        return deepgram.TTS(
            model=voice or model,
            api_key=api_key or _required_env("DEEPGRAM_API_KEY"),
        )
    # ── Sarvam ───────────────────────────────────────────────────────────────
    if provider == "sarvam":
        return sarvam.TTS(
            model=model,
            speaker=voice,
            target_language_code=_sarvam_language(language),
            api_key=api_key or _required_env("SARVAM_API_KEY"),
        )
    # ── Cartesia ─────────────────────────────────────────────────────────────
    if provider == "cartesia":
        cartesia_plugin = _cartesia_plugin()
        return cartesia_plugin.TTS(
            model=model,
            voice=voice,
            api_key=api_key or _required_env("CARTESIA_API_KEY"),
            language=_cartesia_language(language),
        )
    raise ProviderAdapterError(f"unsupported TTS provider: {provider}")


# ── Plugin lazy-loaders ───────────────────────────────────────────────────────

def _aws_plugin():
    if aws is None:
        raise ProviderAdapterError("livekit-plugins-aws is not available.")
    return aws


def _openai_plugin():
    if lk_openai is None:
        raise ProviderAdapterError("livekit-plugins-openai is not installed.")
    return lk_openai


def _cartesia_plugin():
    if lk_cartesia is None:
        raise ProviderAdapterError("livekit-plugins-cartesia is not installed.")
    return lk_cartesia


def _required_env(name: str) -> str:
    value = os.getenv(name)
    if not value:
        raise ProviderAdapterError(f"{name} is required for the selected voice provider")
    return value


# ── Language normalisers ──────────────────────────────────────────────────────

def _deepgram_language(language: str) -> str:
    return {
        "en": "en-US",
        "en-IN": "en-IN",
        "hi": "hi",
        "es": "es",
        "fr": "fr",
        "de": "de",
        "pt": "pt",
        "ar": "ar",
        "ja": "ja",
        "zh": "zh",
        "ta": "ta",
        "te": "te",
        "kn": "kn",
        "ml": "ml",
    }.get(language, language)


def _elevenlabs_language(language: str) -> str:
    return {
        "en": "en",
        "en-IN": "en",
        "hi": "hi",
        "es": "es",
        "fr": "fr",
        "de": "de",
        "pt": "pt",
        "ar": "ar",
        "ja": "ja",
        "zh": "zh",
        "ta": "ta",
        "te": "te",
        "kn": "kn",
        "ml": "ml",
    }.get(language, language)


def _sarvam_language(language: str) -> str:
    return {
        "en": "en-IN",
        "en-IN": "en-IN",
        "hi": "hi-IN",
        "ta": "ta-IN",
        "te": "te-IN",
        "kn": "kn-IN",
        "ml": "ml-IN",
    }.get(language, language)


def _cartesia_language(language: str) -> str:
    """Cartesia uses IETF BCP-47 tags."""
    return {
        "en": "en",
        "en-IN": "en",
        "hi": "hi",
        "es": "es",
        "fr": "fr",
        "de": "de",
        "pt": "pt",
        "ar": "ar",
        "ja": "ja",
        "zh": "zh",
        "ta": "ta",
        "te": "te",
        "kn": "kn",
        "ml": "ml",
    }.get(language, language)

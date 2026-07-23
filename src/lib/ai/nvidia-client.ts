/* ============================================================
   Automyte AI — NVIDIA API Client (OpenAI-compatible)
   Primary LLM inference provider with fallback chain
   ============================================================ */

import OpenAI from "openai";

export type ModelProvider = "nvidia" | "openai" | "anthropic" | "google";

interface ProviderConfig {
  baseURL: string;
  apiKey: string;
  defaultModel: string;
}

const PROVIDER_CONFIGS: Record<ModelProvider, () => ProviderConfig | null> = {
  nvidia: () => ({
    baseURL: "https://integrate.api.nvidia.com/v1",
    apiKey: process.env.NVIDIA_API_KEY || "",
    defaultModel: "nvidia/llama-3.3-nemotron-super-49b-v1",
  }),
  openai: () =>
    process.env.OPENAI_API_KEY
      ? {
          baseURL: "https://api.openai.com/v1",
          apiKey: process.env.OPENAI_API_KEY,
          defaultModel: "gpt-4o",
        }
      : null,
  anthropic: () =>
    process.env.ANTHROPIC_API_KEY
      ? {
          baseURL: "https://api.anthropic.com/v1",
          apiKey: process.env.ANTHROPIC_API_KEY,
          defaultModel: "claude-sonnet-4-20250514",
        }
      : null,
  google: () =>
    process.env.GOOGLE_AI_API_KEY
      ? {
          baseURL: "https://generativelanguage.googleapis.com/v1beta/openai",
          apiKey: process.env.GOOGLE_AI_API_KEY,
          defaultModel: "gemini-2.0-flash",
        }
      : null,
};

// Fallback order: NVIDIA → OpenAI → Google → Anthropic
const FALLBACK_ORDER: ModelProvider[] = ["nvidia", "openai", "google", "anthropic"];

const _clientCache: Map<string, OpenAI> = new Map();

/**
 * Get an OpenAI-compatible client for the specified provider.
 * Falls back through the chain if the primary provider is not configured.
 */
export function getClient(provider?: ModelProvider): {
  client: OpenAI;
  model: string;
  provider: ModelProvider;
} {
  const providers = provider ? [provider, ...FALLBACK_ORDER.filter((p) => p !== provider)] : FALLBACK_ORDER;

  for (const p of providers) {
    const configFn = PROVIDER_CONFIGS[p];
    const config = configFn();

    if (config && config.apiKey) {
      const cacheKey = `${p}:${config.baseURL}`;

      if (!_clientCache.has(cacheKey)) {
        _clientCache.set(
          cacheKey,
          new OpenAI({
            baseURL: config.baseURL,
            apiKey: config.apiKey,
          })
        );
      }

      return {
        client: _clientCache.get(cacheKey)!,
        model: config.defaultModel,
        provider: p,
      };
    }
  }

  // If no provider is configured, return a mock-ready client
  // This allows the UI to function in demo mode
  console.warn("No LLM provider configured. Using demo mode.");
  return {
    client: new OpenAI({
      baseURL: "https://integrate.api.nvidia.com/v1",
      apiKey: "demo-mode-no-key",
    }),
    model: "nvidia/llama-3.3-nemotron-super-49b-v1",
    provider: "nvidia",
  };
}

/**
 * Get a client for a specific model string (e.g., "nvidia/llama-3.3-nemotron-super-49b-v1")
 */
export function getClientForModel(modelString: string): {
  client: OpenAI;
  model: string;
  provider: ModelProvider;
} {
  // Determine provider from model string prefix
  if (modelString.startsWith("nvidia/") || modelString.startsWith("meta/")) {
    return { ...getClient("nvidia"), model: modelString };
  }
  if (modelString.startsWith("gpt-") || modelString.startsWith("o1") || modelString.startsWith("o3")) {
    return { ...getClient("openai"), model: modelString };
  }
  if (modelString.startsWith("claude-")) {
    return { ...getClient("anthropic"), model: modelString };
  }
  if (modelString.startsWith("gemini-")) {
    return { ...getClient("google"), model: modelString };
  }

  // Default to primary provider
  const primary = getClient();
  return { ...primary, model: modelString };
}

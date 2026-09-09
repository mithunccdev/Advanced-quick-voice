/**
 * Vobiz REST API client helpers.
 *
 * Vobiz uses a simple X-Auth-ID / X-Auth-Token header scheme.
 * Base URL: https://api.vobiz.ai/api
 * Docs:     https://vobizai.mintlify.app/
 */

const VOBIZ_BASE_URL = process.env.VOBIZ_BASE_URL ?? "https://api.vobiz.ai/api";

export const VOBIZ_AUTH_ID = process.env.VOBIZ_AUTH_ID ?? "";
export const VOBIZ_AUTH_TOKEN = process.env.VOBIZ_AUTH_TOKEN ?? "";

/**
 * Thin fetch wrapper that attaches Vobiz auth headers and parses JSON.
 * Throws on non-2xx responses.
 */
export async function vobizFetch<T = unknown>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${VOBIZ_BASE_URL}${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-Auth-ID": VOBIZ_AUTH_ID,
      "X-Auth-Token": VOBIZ_AUTH_TOKEN,
      ...(options.headers as Record<string, string>),
    },
  });
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(
      `Vobiz API error ${response.status} ${response.statusText}: ${text}`,
    );
  }
  return response.json() as Promise<T>;
}

/** Returns the account path segment using the configured auth ID. */
export const vobizAccountPath = () =>
  `/v1/Account/${encodeURIComponent(VOBIZ_AUTH_ID)}`;

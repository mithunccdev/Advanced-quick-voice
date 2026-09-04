import { randomUUID } from "node:crypto";

import { BadRequestError } from "../../common/errors/badRequest.js";
import { NotFoundError } from "../../common/errors/notFound.js";
import { assertSafeRemoteUrl } from "../../lib/url-safety.js";
import {
  redactKeyValueSecrets,
  restoreRedactedSecretReferences,
} from "../../lib/secrets.js";
import {
  assertSecretReferencesOwnedByOrganization,
  deleteSecretReferences,
  pruneScopedSecretReferences,
  storeKeyValueSecretReferences,
} from "../secrets/secret-store.service.js";
import * as toolRepository from "./tool.repository.js";
import type { CreateToolArgs, UpdateToolInput, TestToolInput } from "./tool.schema.js";

export const listTools = async (organizationId: string) =>
  (await toolRepository.listTools(organizationId)).map(redactToolSecrets);

export const createTool = async (args: CreateToolArgs) => {
  await assertSafeRemoteUrl(args.api_url);
  const toolId = randomUUID();
  const createdSecretIds: string[] = [];
  try {
    const protectedTool = await protectToolSecrets(
      args.organizationId,
      args.userId,
      toolId,
      args,
      undefined,
      createdSecretIds,
    );
    await assertToolSecretOwnership(protectedTool, args.organizationId);
    return redactToolSecrets(
      await toolRepository.createTool({ ...protectedTool, toolId }),
    );
  } catch (error) {
    await cleanupUncommittedSecrets(args.organizationId, createdSecretIds);
    throw error;
  }
};

export const updateTool = async (
  organizationId: string,
  toolId: string,
  data: UpdateToolInput,
) => {
  const existing = await toolRepository.findTool(organizationId, toolId);
  if (!existing) throw new NotFoundError("Tool not found");
  if (data.api_url) {
    await assertSafeRemoteUrl(data.api_url);
  }
  const createdSecretIds: string[] = [];
  let persisted = false;
  try {
    const protectedTool = await protectToolSecrets(
      organizationId,
      null,
      toolId,
      data,
      existing,
      createdSecretIds,
    );
    await assertToolSecretOwnership(protectedTool, organizationId);
    const updated = await toolRepository.updateTool(
      organizationId,
      toolId,
      protectedTool,
    );
    if (!updated) throw new NotFoundError("Tool not found");
    persisted = true;
    await cleanupReplacedToolSecrets(organizationId, toolId, existing, updated);
    return redactToolSecrets(updated);
  } catch (error) {
    if (!persisted) {
      await cleanupUncommittedSecrets(organizationId, createdSecretIds);
    }
    throw error;
  }
};

export const deleteTool = async (organizationId: string, toolId: string) => {
  const existing = await toolRepository.findTool(organizationId, toolId);
  if (!existing) throw new NotFoundError("Tool not found");
  const result = await toolRepository.deleteTool(organizationId, toolId);
  if (result.count === 0) throw new NotFoundError("Tool not found");
  await cleanupReplacedToolSecrets(organizationId, toolId, existing, {
    api_headers: null,
    dynamic_variables: null,
  });
};

export const getAgentTools = async (
  organizationId: string,
  agentId: string,
) => {
  const tools = await toolRepository.getAgentTools(organizationId, agentId);
  if (tools === null) throw new NotFoundError("Agent not found");
  return tools.map(redactToolSecrets);
};

export const attachTool = async (
  organizationId: string,
  agentId: string,
  toolId: string,
) => {
  const result = await toolRepository.attachTool(
    organizationId,
    agentId,
    toolId,
  );
  if (result === null) throw new NotFoundError("Agent or tool not found");
};

export const detachTool = async (
  organizationId: string,
  agentId: string,
  toolId: string,
) => {
  const result = await toolRepository.detachTool(
    organizationId,
    agentId,
    toolId,
  );
  if (result === null) throw new NotFoundError("Agent not found");
};

async function protectToolSecrets<T extends Record<string, any>>(
  organizationId: string,
  userId: string | null,
  toolId: string,
  tool: T,
  existingTool?: Record<string, any>,
  createdSecretIds?: string[],
): Promise<T> {
  let apiHeaders: unknown;
  let dynamicVariables: unknown;
  try {
    apiHeaders = restoreRedactedSecretReferences(
      tool.api_headers,
      existingTool?.api_headers,
    );
    dynamicVariables = restoreRedactedSecretReferences(
      tool.dynamic_variables,
      existingTool?.dynamic_variables,
    );
  } catch {
    throw new BadRequestError(
      "A redacted tool secret could not be preserved; enter it again",
    );
  }

  return {
    ...tool,
    api_headers: await storeKeyValueSecretReferences(apiHeaders, {
      organizationId,
      userId,
      namePrefix: `tool:${toolId}:api_headers`,
      createdSecretIds,
    }),
    dynamic_variables: await storeKeyValueSecretReferences(dynamicVariables, {
      organizationId,
      userId,
      namePrefix: `tool:${toolId}:dynamic_variables`,
      createdSecretIds,
    }),
  };
}

async function assertToolSecretOwnership(
  tool: Record<string, any>,
  organizationId: string,
) {
  try {
    await assertSecretReferencesOwnedByOrganization(
      [tool.api_headers, tool.dynamic_variables],
      organizationId,
    );
  } catch {
    throw new BadRequestError("One or more tool secrets are unavailable");
  }
}

async function cleanupReplacedToolSecrets(
  organizationId: string,
  toolId: string,
  previousTool: Record<string, any>,
  currentTool: Record<string, any>,
) {
  try {
    await pruneScopedSecretReferences({
      organizationId,
      namePrefixes: [
        `tool:${toolId}:api_headers`,
        `tool:${toolId}:dynamic_variables`,
      ],
      previousValues: [
        previousTool.api_headers,
        previousTool.dynamic_variables,
      ],
      currentValues: [currentTool.api_headers, currentTool.dynamic_variables],
    });
  } catch (error) {
    console.warn("[secrets] failed to prune replaced tool secrets", {
      organizationId,
      toolId,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

async function cleanupUncommittedSecrets(
  organizationId: string,
  secretIds: string[],
) {
  try {
    await deleteSecretReferences(organizationId, secretIds);
  } catch (error) {
    console.warn("[secrets] failed to remove uncommitted tool secrets", {
      organizationId,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

function redactToolSecrets<T extends Record<string, any>>(tool: T): T {
  return {
    ...tool,
    api_headers: redactKeyValueSecrets(tool.api_headers),
    dynamic_variables: redactKeyValueSecrets(tool.dynamic_variables),
  };
}

export const testTool = async (
  organizationId: string,
  input: TestToolInput,
) => {
  await assertSafeRemoteUrl(input.api_url, {
    allowedProtocols: ["http:", "https:"],
  });

  let targetUrl = input.api_url;

  // Substitute path parameters: {paramName} or :paramName
  if (input.api_path_params && typeof input.api_path_params === "object") {
    for (const [key, val] of Object.entries(input.api_path_params)) {
      if (val !== undefined && val !== null) {
        targetUrl = targetUrl
          .replace(new RegExp(`\\{${key}\\}`, "g"), encodeURIComponent(String(val)))
          .replace(new RegExp(`:${key}\\b`, "g"), encodeURIComponent(String(val)));
      }
    }
  }

  const urlObj = new URL(targetUrl);

  // Append query parameters
  if (input.api_query_params && typeof input.api_query_params === "object") {
    for (const [key, val] of Object.entries(input.api_query_params)) {
      if (val !== undefined && val !== null && String(val).trim() !== "") {
        urlObj.searchParams.append(key, String(val));
      }
    }
  }

  const headers: Record<string, string> = {
    "User-Agent": "QuickVoice-Agent-Tool/1.0",
    Accept: "application/json, text/plain, */*",
  };

  if (Array.isArray(input.api_headers)) {
    for (const header of input.api_headers) {
      if (header.key && header.value) {
        headers[header.key] = header.value;
      }
    }
  }

  const timeoutMs = (input.response_timeout_secs || 15) * 1000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  let body: string | undefined = undefined;
  if (
    input.api_method !== "GET" &&
    input.api_method !== "DELETE" &&
    input.api_body &&
    typeof input.api_body === "object" &&
    Object.keys(input.api_body).length > 0
  ) {
    body = JSON.stringify(input.api_body);
    if (!headers["Content-Type"] && !headers["content-type"]) {
      headers["Content-Type"] = "application/json";
    }
  }

  const startTime = Date.now();
  try {
    const response = await fetch(urlObj.toString(), {
      method: input.api_method,
      headers,
      body,
      signal: controller.signal,
    });

    const latencyMs = Date.now() - startTime;
    clearTimeout(timer);

    const contentType = response.headers.get("content-type") || "";
    let responseData: any;
    if (contentType.includes("application/json")) {
      try {
        responseData = await response.json();
      } catch {
        responseData = await response.text();
      }
    } else {
      responseData = await response.text();
    }

    const resHeaders: Record<string, string> = {};
    response.headers.forEach((val, key) => {
      resHeaders[key] = val;
    });

    return {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      latencyMs,
      requestUrl: urlObj.toString(),
      requestMethod: input.api_method,
      headers: resHeaders,
      data: responseData,
    };
  } catch (err: any) {
    clearTimeout(timer);
    const latencyMs = Date.now() - startTime;
    return {
      status: err?.name === "AbortError" ? 408 : 500,
      statusText: err?.name === "AbortError" ? "Request Timeout" : "Request Failed",
      ok: false,
      latencyMs,
      requestUrl: urlObj.toString(),
      requestMethod: input.api_method,
      headers: {},
      error: err instanceof Error ? err.message : String(err),
    };
  }
};

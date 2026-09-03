import { AxiosError, isAxiosError } from "axios";

export class ApiError extends Error {
  status: number;
  code?: string;
  details?: unknown;

  constructor(message: string, status: number, code?: string, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export function toApiError(err: unknown): ApiError {
  if (err instanceof ApiError) return err;

  if (isAxiosError(err)) {
    const ax = err as AxiosError<{
      success?: boolean;
      message?: string;
      error?: { code?: string; message?: string; details?: unknown };
    }>;
    const status = ax.response?.status ?? 0;
    const body = ax.response?.data;
    const message =
      body?.error?.message ??
      body?.message ??
      ax.message ??
      "Request failed";
    const code = body?.error?.code;
    const details = body?.error?.details;
    return new ApiError(message, status, code, details);
  }

  if (err instanceof Error) return new ApiError(err.message, 0);
  return new ApiError("Unknown error", 0);
}

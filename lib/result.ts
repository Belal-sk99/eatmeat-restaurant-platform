// lib/result.ts
export type FieldErrors = Record<string, string[]>;

export type AppError = {
  code:
    | "VALIDATION_ERROR"
    | "UNAUTHORIZED"
    | "FORBIDDEN"
    | "NOT_FOUND"
    | "CONFLICT"
    | "RATE_LIMIT"
    | "INTERNAL";
  message: string;
  fieldErrors?: FieldErrors; // keys match form field names
};

export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: AppError };

export const ok = <T>(data: T): ActionResult<T> => ({ ok: true, data });
export const fail = (error: AppError): ActionResult<never> => ({
  ok: false,
  error,
});

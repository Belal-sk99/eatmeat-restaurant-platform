// lib/zod-error.ts
import type { ZodError } from "zod";
import type { AppError, FieldErrors } from "./result";

export function zodToFieldErrors(err: ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of err.issues) {
    const key = issue.path.join(".") || "_form";
    (out[key] ||= []).push(issue.message);
  }
  return out;
}

export function toValidationError(
  err: ZodError,
  message = "Please fix the highlighted fields."
): AppError {
  return {
    code: "VALIDATION_ERROR",
    message,
    fieldErrors: zodToFieldErrors(err),
  };
}

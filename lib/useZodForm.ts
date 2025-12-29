"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type DefaultValues } from "react-hook-form";
import { z } from "zod";
import type { ZodType } from "zod";

export function useZodForm<TSchema extends ZodType>(
  schema: TSchema,
  options?: { defaultValues?: DefaultValues<z.infer<TSchema>> }
) {
  return useForm<z.infer<TSchema>>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: options?.defaultValues,
  });
}

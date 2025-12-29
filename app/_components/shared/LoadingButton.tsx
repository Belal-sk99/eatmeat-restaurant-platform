"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

export function LoadingButton({
  loading,
  children,
  ...props
}: React.ComponentProps<typeof Button> & { loading?: boolean }) {
  return (
    <Button {...props} disabled={props.disabled || loading}>
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border border-current border-t-transparent" />
          {children}
        </span>
      ) : (
        children
      )}
    </Button>
  );
}

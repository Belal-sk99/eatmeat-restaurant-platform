import { toast } from "sonner";
import type { ActionResult } from "./result";

export const notify = {
  success: (msg: string) => toast.success(msg),
  error: (msg: string) => toast.error(msg),
};

export function toastResult<T>(res: ActionResult<T>, successMsg = "Done") {
  if (res.ok) toast.success(successMsg);
  else toast.error(res.error.message);
}

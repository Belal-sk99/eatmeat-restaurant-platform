export function FormError({ message }: { message?: string | string[] | null }) {
  if (!message || (Array.isArray(message) && message.length === 0)) return null;

  const text = Array.isArray(message) ? message.join(" ") : message;

  return (
    <p className="text-sm text-destructive mt-2" role="alert">
      {text}
    </p>
  );
}

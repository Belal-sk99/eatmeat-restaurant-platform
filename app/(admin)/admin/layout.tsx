// app/(admin)/admin/layout.tsx
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh">
      <div className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <h1 className="font-semibold">Admin</h1>
        </div>
      </div>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}

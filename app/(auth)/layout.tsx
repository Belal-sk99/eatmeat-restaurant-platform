// app/(auth)/layout.tsx
import Container from "../_components/Container";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black">
      <div className="border-b border-white/10">
        <Container>
          <div className="h-16 flex items-center justify-between">
            <Link href="/" className="font-semibold tracking-tight">
              <span className="text-white">Eat</span>
              <span className="text-red-500">Meat</span>
            </Link>
            <Link
              href="/menu"
              className="text-sm text-white/70 hover:text-white"
            >
              View menu
            </Link>
          </div>
        </Container>
      </div>

      <main className="py-10">
        <Container>
          <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            {children}
          </div>
        </Container>
      </main>
    </div>
  );
}

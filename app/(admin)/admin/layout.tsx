import Container from "../../_components/Container";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black">
      <div className="border-b border-white/10 bg-black/70 backdrop-blur">
        <Container>
          <div className="h-16 flex items-center justify-between">
            <div className="font-semibold">
              <span className="text-white">Eat</span>
              <span className="text-red-500">Meat</span>{" "}
              <span className="text-white/50 text-sm font-normal">Admin</span>
            </div>
            <div className="text-sm text-white/60">Dashboard</div>
          </div>
        </Container>
      </div>

      <main className="py-10">
        <Container>{children}</Container>
      </main>
    </div>
  );
}

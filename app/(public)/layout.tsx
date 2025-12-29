// app/(public)/layout.tsx
import Navbar from "../_components/Navbar";
import Container from "../_components/Container";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="py-10">
        <Container>{children}</Container>
      </main>
    </div>
  );
}

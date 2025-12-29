import Navbar from "../_components/Navbar";
import Container from "../_components/Container";

export default function UserLayout({
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

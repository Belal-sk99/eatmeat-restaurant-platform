// components/Navbar.tsx
import Link from "next/link";
import Container from "./Container";
import NavLink from "./NavLink";
import { NAV_PUBLIC } from "@/lib/routes";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-semibold tracking-tight">
              <span className="text-white">Eat</span>
              <span className="text-red-500">Meat</span>
            </Link>

            <nav className="hidden md:flex items-center gap-4">
              {NAV_PUBLIC.map((item) => (
                <NavLink key={item.href} href={item.href} label={item.label} />
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-md px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Sign up
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}

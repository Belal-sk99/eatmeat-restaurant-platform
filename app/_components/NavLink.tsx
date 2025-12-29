"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const pathname = usePathname();
  const active =
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={[
        "text-sm transition",
        active ? "text-red-400" : "text-white/70 hover:text-white",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { AppToaster } from "./_components/shared/AppToaster";

export const metadata: Metadata = {
  title: "EatMeat",
  description: "EatMeat Restaurant Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-black text-white antialiased">
        {children}
        <AppToaster />
      </body>
    </html>
  );
}

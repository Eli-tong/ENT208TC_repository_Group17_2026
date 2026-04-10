import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Horma-Pet",
  description: "Virtual pet wellness demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <header className="border-b border-stone-200 bg-white/90 px-4 py-3 backdrop-blur">
          <nav className="mx-auto flex max-w-lg items-center justify-between gap-4">
            <Link href="/" className="font-semibold tracking-tight text-stone-900">
              Horma-Pet
            </Link>
            <div className="flex gap-3 text-sm">
              <Link href="/" className="text-stone-600 underline-offset-4 hover:text-stone-800 hover:underline">
                Home
              </Link>
              <Link
                href="/trends"
                className="text-stone-600 underline-offset-4 hover:text-stone-800 hover:underline"
              >
                Trends
              </Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-lg px-4 py-6">{children}</main>
      </body>
    </html>
  );
}

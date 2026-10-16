import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "./refinements.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Migra — Stop guessing your way abroad",
  description: "Migra helps Africans find realistic migration routes, understand what they require, and build a clear plan for moving abroad.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={jakarta.variable}>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "조진영 | My First Site",
  description: "Next.js + TypeScript + Tailwind CSS Minimal Project with Contact Form",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="dark scroll-smooth">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-yellow-400 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}

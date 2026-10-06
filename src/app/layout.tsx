import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My First Site",
  description: "Next.js + TypeScript + Tailwind CSS Minimal Project",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-white text-emerald-300 antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}

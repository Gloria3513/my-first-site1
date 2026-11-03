import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cjy.kr"),
  title: "조진영 | My First Site",
  description: "Next.js + TypeScript + Tailwind CSS Minimal Project with Contact Form",
  openGraph: {
    title: "안녕하세요. 조진영입니다",
    description: "문의사항남기기",
    images: ["/스크린샷 2026-09-29 104902.png"],
  },
  verification: {
    google: "IVZgYAyFNKRXyByVSmt99K_D1-G7c0w1uVdjieo-Ssc",
    other: {
      "naver-site-verification": "bf44966b4e610a2fd6da039cdc4519d5b7c49536",
    },
  },
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

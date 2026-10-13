import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-start p-6 sm:p-10 md:p-16 text-center overflow-hidden">
      {/* 배경 장식 글로우 조명 */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* 프로필 카드 */}
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-slate-700">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-yellow-300 mb-6">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          준비 완료
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-yellow-300 mb-4">
          안녕하세요.<br/>조진영입니다
        </h1>

        <div className="relative mx-auto w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 my-4 group">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-yellow-400 to-emerald-400 opacity-50 blur group-hover:opacity-80 transition-opacity" />
          <img
            src="/스크린샷 2026-09-29 104902.png"
            className="relative mx-auto w-full h-full rounded-full object-cover border-2 border-slate-800 shadow-xl"
            alt="Sloth Profile"
          />
        </div>

        <p className="mt-3 text-base text-slate-300 max-w-md mx-auto leading-relaxed">
          가장 단순하고 깔끔한 Next.js 프로젝트가 성공적으로 준비되었습니다.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-slate-300">
          <span className="rounded-lg bg-slate-800/80 px-3 py-1.5 border border-slate-700/50">
            Next.js (App Router)
          </span>
          <span className="rounded-lg bg-slate-800/80 px-3 py-1.5 border border-slate-700/50">
            TypeScript
          </span>
          <span className="rounded-lg bg-slate-800/80 px-3 py-1.5 border border-slate-700/50">
            Tailwind CSS
          </span>
        </div>

        {/* 문의하기로 바로 이동하는 버튼 */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#contact-section"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 px-5 py-2.5 text-sm font-bold text-slate-950 transition-all shadow-lg shadow-yellow-500/20 active:scale-95 cursor-pointer"
          >
            <span>✉️ 문의사항 남기기</span>
            <svg className="w-4 h-4 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>

        <div className="mt-8 rounded-xl bg-slate-950/80 p-4 text-left border border-slate-800/80">
          <p className="text-xs font-medium text-slate-400">PowerShell 실행 명령어:</p>
          <code className="mt-1 block font-mono text-sm text-indigo-300 select-all">
            npm run dev
          </code>
        </div>
      </div>

      {/* 문의사항 남기는 섹션 */}
      <ContactSection />
    </main>
  );
}

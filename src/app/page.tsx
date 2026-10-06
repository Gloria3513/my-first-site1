export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12 text-center">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-slate-700">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-yellow-300 mb-6">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          준비 완료
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-yellow-300 mb-6">
          안녕하세요.<br/>조진영입니다
        </h1>
                <img src="/스크린샷 2026-09-29 104902.png" className="mx-auto w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full object-cover mt-4" alt="Sloth" />
        <p className="mt-3 text-base text-slate-400">
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

        <div className="mt-8 rounded-xl bg-slate-950/80 p-4 text-left border border-slate-800/80">
          <p className="text-xs font-medium text-slate-400">PowerShell 실행 명령어:</p>
          <code className="mt-1 block font-mono text-sm text-indigo-300 select-all">
            npm run dev
          </code>
        </div>
      </div>
    </main>
  );
}

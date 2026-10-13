"use client";

import React, { useState, useEffect } from "react";

interface InquiryRecord {
  id: string;
  name: string;
  email: string;
  category: string;
  subject: string;
  message: string;
  createdAt: string;
}

const CATEGORIES = [
  { id: "general", label: "일반 문의", icon: "💬" },
  { id: "project", label: "프로젝트/협업 제안", icon: "🤝" },
  { id: "question", label: "질문 및 피드백", icon: "💡" },
  { id: "coffee", label: "커피챗 & 네트워킹", icon: "☕" },
  { id: "other", label: "기타", icon: "✨" },
];

const TARGET_EMAIL = "pallas3526@gmail.com";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "general",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<InquiryRecord[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [submittedData, setSubmittedData] = useState<typeof formData | null>(null);

  // 로컬스토리지에서 최근 보낸 문의 목록 불러오기
  useEffect(() => {
    try {
      const saved = localStorage.getItem("my_inquiries");
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = "성함 또는 닉네임을 입력해 주세요.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "이름을 2자 이상 입력해 주세요.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "답변받으실 이메일을 입력해 주세요.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "올바른 이메일 형식을 입력해 주세요 (예: user@example.com).";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "문의 제목을 입력해 주세요.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "문의 내용을 입력해 주세요.";
    } else if (formData.message.trim().length < 5) {
      newErrors.message = "문의 내용을 최소 5자 이상 작성해 주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // 모의 전송 딜레이 (사용자 경험 개선)
    setTimeout(() => {
      const newRecord: InquiryRecord = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        email: formData.email.trim(),
        category: formData.category,
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        createdAt: new Date().toLocaleString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      const updatedHistory = [newRecord, ...history];
      setHistory(updatedHistory);
      try {
        localStorage.setItem("my_inquiries", JSON.stringify(updatedHistory));
      } catch {
        // ignore
      }

      setSubmittedData({ ...formData });
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(TARGET_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
      const textArea = document.createElement("textarea");
      textArea.value = TARGET_EMAIL;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      category: "general",
      subject: "",
      message: "",
    });
    setErrors({});
    setIsSubmitted(false);
  };

  const mailtoLink = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(
    `[문의] ${formData.subject || "홈페이지 문의사항"}`
  )}&body=${encodeURIComponent(
    `보낸 분: ${formData.name}\n이메일: ${formData.email}\n유형: ${
      CATEGORIES.find((c) => c.id === formData.category)?.label
    }\n\n[내용]\n${formData.message}`
  )}`;

  return (
    <section id="contact-section" className="relative w-full max-w-2xl mt-12 transition-all">
      {/* 배경 은은한 글로우 효과 */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-yellow-500/20 via-emerald-500/20 to-indigo-500/20 opacity-70 blur-xl pointer-events-none" />

      <div className="relative rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        {/* 상단 헤더 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6 mb-6">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-xs font-semibold text-yellow-300 mb-2">
              <span className="h-2 w-2 rounded-full bg-yellow-400 animate-ping" />
              ✉️ 문의하기
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              문의사항 남기기
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              궁금한 점이나 협업 제안 등 편하게 메시지를 남겨주세요.
            </p>
          </div>

          {/* 이메일 주소 복사 위젯 */}
          <div className="flex flex-col items-start sm:items-end gap-1.5 bg-slate-950/60 border border-slate-800/80 p-3 rounded-xl">
            <span className="text-[11px] font-medium text-slate-400">직접 이메일 연락:</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-yellow-300 font-semibold select-all">
                {TARGET_EMAIL}
              </span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1 rounded-lg bg-slate-800 hover:bg-slate-700 px-2.5 py-1 text-xs font-medium text-slate-200 transition-all active:scale-95 border border-slate-700/60"
                title="이메일 복사"
              >
                {copied ? (
                  <>
                    <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-emerald-400 font-semibold">복사됨!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>복사</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 전송 완료 상태 화면 */}
        {isSubmitted && submittedData ? (
          <div className="py-8 px-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mb-4 animate-bounce">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">
              문의사항이 성공적으로 전달되었습니다!
            </h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              소중한 문의 감사합니다. 조진영님에게 메시지가 접수되었으며, 확인 후 남겨주신 이메일(
              <span className="font-semibold text-yellow-300">{submittedData.email}</span>)로 빠르게 회신드리겠습니다.
            </p>

            {/* 접수 요약 카드 */}
            <div className="mt-6 rounded-xl bg-slate-950/70 p-4 text-left border border-slate-800 max-w-md mx-auto text-xs space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>보낸 분:</span>
                <span className="font-medium text-slate-200">{submittedData.name}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>문의 유형:</span>
                <span className="font-medium text-slate-200">
                  {CATEGORIES.find((c) => c.id === submittedData.category)?.label}
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>제목:</span>
                <span className="font-medium text-slate-200">{submittedData.subject}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 text-slate-400">
                <span className="block mb-1">내용 미리보기:</span>
                <p className="text-slate-300 bg-slate-900/90 p-2.5 rounded-lg whitespace-pre-wrap line-clamp-3">
                  {submittedData.message}
                </p>
              </div>
            </div>

            {/* 액션 버튼들 */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition-all active:scale-95 border border-slate-700"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                새로운 문의 작성하기
              </button>

              <a
                href={mailtoLink}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 px-5 py-2.5 text-sm font-bold text-slate-950 transition-all shadow-lg shadow-yellow-500/20 active:scale-95"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                메일 앱으로 직접 발송하기
              </a>
            </div>
          </div>
        ) : (
          /* 문의 작성 폼 */
          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            {/* 성함 & 이메일 (2열 반응형) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-slate-300 mb-1.5">
                  보내는 분 성함 / 닉네임 <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="예: 홍길동"
                    className={`w-full rounded-xl bg-slate-950/80 border py-2.5 pl-10 pr-3 text-sm text-slate-100 placeholder-slate-500 transition-all focus:outline-none ${
                      errors.name
                        ? "border-rose-500 ring-1 ring-rose-500/50"
                        : "border-slate-800 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                    }`}
                  />
                </div>
                {errors.name && <p className="mt-1 text-xs text-rose-400">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-slate-300 mb-1.5">
                  회신받으실 이메일 <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your-email@example.com"
                    className={`w-full rounded-xl bg-slate-950/80 border py-2.5 pl-10 pr-3 text-sm text-slate-100 placeholder-slate-500 transition-all focus:outline-none ${
                      errors.email
                        ? "border-rose-500 ring-1 ring-rose-500/50"
                        : "border-slate-800 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                    }`}
                  />
                </div>
                {errors.email && <p className="mt-1 text-xs text-rose-400">{errors.email}</p>}
              </div>
            </div>

            {/* 문의 유형 선택 칩 */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                문의 유형
              </label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => {
                  const isSelected = formData.category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: cat.id })}
                      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                        isSelected
                          ? "bg-yellow-400 text-slate-950 font-bold shadow-md shadow-yellow-400/20 scale-102"
                          : "bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 제목 */}
            <div>
              <label htmlFor="subject" className="block text-xs font-semibold text-slate-300 mb-1.5">
                문의 제목 <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="궁금하신 내용의 핵심 제목을 적어주세요"
                className={`w-full rounded-xl bg-slate-950/80 border py-2.5 px-3.5 text-sm text-slate-100 placeholder-slate-500 transition-all focus:outline-none ${
                  errors.subject
                    ? "border-rose-500 ring-1 ring-rose-500/50"
                    : "border-slate-800 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                }`}
              />
              {errors.subject && <p className="mt-1 text-xs text-rose-400">{errors.subject}</p>}
            </div>

            {/* 내용 */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="message" className="block text-xs font-semibold text-slate-300">
                  문의 내용 <span className="text-rose-400">*</span>
                </label>
                <span className="text-[11px] text-slate-500">
                  {formData.message.length}자 / 최대 500자
                </span>
              </div>
              <textarea
                id="message"
                name="message"
                rows={5}
                maxLength={500}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="궁금한 내용, 요청 사항, 전달하고 싶은 메시지를 편안하게 작성해 주세요."
                className={`w-full rounded-xl bg-slate-950/80 border p-3.5 text-sm text-slate-100 placeholder-slate-500 transition-all focus:outline-none resize-none ${
                  errors.message
                    ? "border-rose-500 ring-1 ring-rose-500/50"
                    : "border-slate-800 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                }`}
              />
              {errors.message && <p className="mt-1 text-xs text-rose-400">{errors.message}</p>}
            </div>

            {/* 하단 전송 버튼 및 부가 기능 */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <p className="text-[11px] text-slate-500">
                🔒 남겨주신 정보는 문의 답변 용도로만 안전하게 활용됩니다.
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 disabled:opacity-50 px-6 py-3 text-sm font-bold text-slate-950 transition-all shadow-lg shadow-yellow-500/20 active:scale-98 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-slate-950" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      전송 중...
                    </>
                  ) : (
                    <>
                      <span>문의사항 보내기</span>
                      <svg className="w-4 h-4 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* 최근 보낸 문의 내역 아코디언 (로컬 기록 확인) */}
        {history.length > 0 && (
          <div className="mt-8 pt-5 border-t border-slate-800/80 text-left">
            <button
              type="button"
              onClick={() => setShowHistory(!showHistory)}
              className="inline-flex items-center justify-between w-full text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                내가 보낸 문의 내역 ({history.length}건)
              </span>
              <span>{showHistory ? "접기 ▲" : "보기 ▼"}</span>
            </button>

            {showHistory && (
              <div className="mt-3 space-y-2 max-h-52 overflow-y-auto pr-1">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between text-slate-400">
                      <span className="font-semibold text-yellow-300">{item.subject}</span>
                      <span className="text-[10px] text-slate-500">{item.createdAt}</span>
                    </div>
                    <p className="text-slate-300 line-clamp-2 text-[11px]">{item.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

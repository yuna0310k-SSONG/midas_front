"use client";

import { useState } from "react";

const quickLinks = [
  {
    label: "블로그",
    href: "https://blog.naver.com/albotalbot",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <path
          fill="currentColor"
          d="M4 4h16v16H4z"
        />
        <path
          fill="#fff"
          d="M7 7h10v2H7zm0 4h10v2H7zm0 4h6v2H7z"
        />
      </svg>
    ),
  },
  {
    label: "카카오톡",
    href: "https://pf.kakao.com/_sxkrNb",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <path
          fill="currentColor"
          d="M12 3C7 3 3 6.2 3 10.5c0 2.3 1 4.4 2.7 5.8l-.4 3.8 4.5-2h.2c4.8 0 8.7-3.2 8.7-7s-3.9-8-8.7-8z"
        />
      </svg>
    ),
  },
  {
    label: "톡톡",
    href: "https://talk.naver.com/ct/w48doc?frm=mnmb&frm=nmb_detail#nafullscreen",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <path
          fill="currentColor"
          d="M7 4c-1.7 0-3 1.3-3 3v2c0 1.7 1.3 3 3 3h1v2h2v-2h2v-2H8v-1h9c1.7 0 3-1.3 3-3V7c0-1.7-1.3-3-3-3H7zm6.5 3.9l.9-.9h-1.8l.9.9zm-5.6 0l.9-.9H6l.9.9z"
        />
      </svg>
    ),
  },
];

export default function QuickLinks() {
  const scrollToTop = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const toggleMobile = () => setIsMobileOpen((prev) => !prev);

  return (
    <>
      <div className="hidden lg:flex fixed right-4 bottom-8 z-50 flex-col items-center gap-3 text-xs font-semibold">
        {quickLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 w-14 flex-col items-center justify-center rounded-xl border border-[#d4c79a] bg-gradient-to-b from-[#fffdf5] to-[#f3e9cd] text-[#1f1b16] shadow-lg transition hover:-translate-y-0.5 hover:shadow-2xl hover:bg-gradient-to-b hover:from-[#fce4a5] hover:to-[#f8d898]"
            aria-label={link.label}
          >
            {link.icon}
            <span className="text-[10px] leading-tight tracking-tighter">{link.label}</span>
          </a>
        ))}
        <button
          type="button"
          onClick={scrollToTop}
          className="flex h-14 w-14 flex-col items-center justify-center rounded-full bg-gradient-to-b from-[#d4b15a] to-[#f9e5b1] text-[#1f1406] shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl"
          aria-label="위로가기"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6">
            <path
              fill="currentColor"
              d="M12 5l-6 6h4v5h4v-5h4z"
            />
          </svg>
          <span className="text-[10px] leading-tight tracking-tighter">위로가기</span>
        </button>
      </div>

      <div className="lg:hidden fixed right-3 bottom-6 z-50 flex flex-col items-end gap-3 text-[11px] font-semibold">
        <div
          className={`flex flex-col items-center gap-3 overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-out ${
            isMobileOpen ? "max-h-[220px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-6"
          }`}
        >
          {quickLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 flex-col items-center justify-center rounded-2xl border border-[#f2e5d4] bg-white/80 text-[#2d2d2d] shadow-[0_8px_20px_rgba(0,0,0,0.15)] transition hover:-translate-y-0.5 hover:shadow-lg"
              aria-label={link.label}
              onClick={() => setIsMobileOpen(false)}
            >
              {link.icon}
              <span className="text-[10px] leading-tight tracking-tight">{link.label}</span>
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              scrollToTop();
              setIsMobileOpen(false);
            }}
            className="flex h-12 w-12 flex-col items-center justify-center rounded-full bg-[#e3b561]/80 text-[#1f1406] shadow-lg transition hover:-translate-y-0.5 hover:shadow-2xl"
            aria-label="위로가기"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6">
              <path
                fill="currentColor"
                d="M12 6l-4.5 4.5h3v6h3v-6h3z"
              />
            </svg>
          </button>
        </div>
        <button
          type="button"
          onClick={toggleMobile}
          aria-label={isMobileOpen ? "빠른 링크 닫기" : "빠른 링크 열기"}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1f1406]/80 text-[#fef6e4] shadow-lg transition hover:-translate-y-0.5 hover:shadow-2xl"
        >
          <span className="text-sm font-bold">{isMobileOpen ? "×" : "≡"}</span>
        </button>
      </div>
    </>
  );
}

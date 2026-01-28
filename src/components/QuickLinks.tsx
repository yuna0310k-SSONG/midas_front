"use client";

import { useState, useEffect } from "react";

const quickLinks = [
  {
    label: "BLOG",
    href: "https://blog.naver.com/albotalbot",
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="w-9 h-9">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
      </svg>
    ),
  },
  {
    label: "INSTA",
    href: "https://www.instagram.com/midas_haniwon?igsh=ZjZwdDNvc3U4aHdl",
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="w-9 h-9">
        <rect width="16" height="16" x="4" y="4" rx="5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.5 6.5h.01" />
      </svg>
    ),
  },
  {
    label: "KAKAO",
    href: "https://pf.kakao.com/_sxkrNb",
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="w-9 h-9">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
  },
  {
    label: "Naver TalkTalk",
    href: "https://talk.naver.com/ct/w48doc",
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="w-9 h-9">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.303.025-.607.047-.912.065a4.331 4.331 0 01-3.111-1.399L12 12.122m8.25-3.611a48.394 48.394 0 00-15.75 0m15.75 0c.384.123.746.296 1.08.514M5.25 8.511c-.884.284-1.5 1.128-1.5 2.097v4.286c0 1.136.847 2.1 1.98 2.193.303.025.607.047.912.065a4.331 4.331 0 003.111-1.399L12 12.122m-6.75-3.611a48.39 48.39 0 0115.75 0m-15.75 0c-.384.123-.746.296-1.08.514M12 12.122v8.25" />
      </svg>
    ),
  },
];

export default function QuickLinks() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 공통 컬러 테마 (연골드)
  const lightGold = "#C5A059";

  return (
    <>
      {/* --- DESKTOP --- */}
      <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-[999] flex-col items-center gap-10">
        {quickLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col items-center justify-center transition-all duration-300"
            aria-label={link.label}
          >
            <div className="text-[#C5A059] group-hover:text-[#b39359] transition-colors drop-shadow-sm">
              {link.icon}
            </div>
            {/* 텍스트는 이모지 아래에 항상 표시 (호버 시 선명하게) */}
            <span className="absolute top-full mt-2 text-[10px] tracking-[0.1em] text-[#C5A059] opacity-100 transition-all duration-300 font-medium whitespace-nowrap">
              {link.label}
            </span>
          </a>
        ))}

        {/* TOP BUTTON */}
        <button
          onClick={scrollToTop}
          className={`flex flex-col items-center justify-center text-[#C5A059] transition-all duration-500 hover:text-[#b39359]
                     ${scrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
          aria-label="맨 위로"
        >
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
          <span className="text-[8px] font-bold tracking-tighter mt-1">TOP</span>
        </button>
      </div>

      {/* --- MOBILE --- */}
      <div className="lg:hidden fixed right-6 bottom-8 z-[999] flex flex-col items-end gap-3">
        <div
          className={`flex flex-col gap-3 transition-all duration-500 
                     ${isMobileOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-95 pointer-events-none"}`}
        >
          {quickLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-2 bg-white/60 backdrop-blur-lg border border-[#C5A059]/20 rounded-full"
              onClick={() => setIsMobileOpen(false)}
            >
              <span className="text-[10px] tracking-widest text-[#C5A059]">{link.label}</span>
              <div className="text-[#C5A059]/70 w-4 h-4">{link.icon}</div>
            </a>
          ))}
          <button
            onClick={() => { scrollToTop(); setIsMobileOpen(false); }}
            className="flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-lg border border-[#C5A059]/40 rounded-full text-[#C5A059]"
          >
            <span className="text-[10px] tracking-widest font-bold">TOP</span>
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="h-3 w-3"><path d="M4.5 15.75l7.5-7.5 7.5 7.5" /></svg>
          </button>
        </div>

        {/* 모바일 메인 토글 */}
        <button
          type="button"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={`h-12 w-12 flex items-center justify-center rounded-full bg-white/50 backdrop-blur-md border border-[#C5A059]/40 text-[#C5A059] shadow-sm transition-all duration-500
                     ${isMobileOpen ? "rotate-[135deg]" : "rotate-0"}`}
        >
          <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>
    </>
  );
}
"use client";

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
          d="M12 3a9 9 0 00-8.8 8.1 4 4 0 00-.1.9 4 4 0 007 2.4A1 1 0 0110 14v1.25a3 3 0 002.68 2.97l.32.03a9 9 0 104.04-15.25A1 1 0 0016 6h-1.25a3 3 0 00-2.75-2z"
        />
      </svg>
    ),
  },
  {
    label: "네이버 톡톡",
    href: "https://talk.naver.com/ct/w48doc?frm=mnmb&frm=nmb_detail#nafullscreen",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <path
          fill="currentColor"
          d="M4 4h16v10H6.68L4 17.68z"
        />
        <circle cx="12" cy="9" r="1.5" fill="#fff" />
        <path
          fill="#fff"
          d="M8 9h8v1.5H8zM8 12h6v1.5H8z"
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

  return (
    <div className="fixed right-4 bottom-8 z-50 flex flex-col items-center gap-3 text-xs font-semibold">
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
  );
}

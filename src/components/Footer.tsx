"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-[#a0a0a0] font-serif">
      <div className="max-w-7xl mx-auto px-6 py-20">
        
        {/* 상단 섹션: 브랜드 로고 및 설명 */}
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-[#b39359] text-2xl font-light letter-spacing tracking-[0.3em] mb-6">
            MIDAS CLINIC
          </h2>
          <div className="h-[1px] w-12 bg-[#b39359] mb-8 mx-auto md:mx-0 opacity-50" />
          <p className="text-sm leading-loose opacity-80 break-keep max-w-xl">
            그리스 신화 속 미다스의 손길처럼, 당신의 본연의 아름다움을 찾아 황금빛 밸런스를 선사합니다. 
            정교한 의학적 전문성과 지고의 가치를 담은 공간에서 진정한 휴식과 변화를 경험하세요.
          </p>
        </div>

        {/* 중단 섹션: 그리드 레이아웃 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 border-t border-white/5 pt-16">
          
          {/* Information */}
          <div className="space-y-6">
            <h3 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-8">Information</h3>
            <ul className="space-y-4 text-[13px] font-light">
              <li className="flex items-center gap-4">
                <span className="text-[#b39359] w-4 text-center">📍</span>
                <span className="hover:text-white transition-colors cursor-default">
                  서울 서초구 서초대로 310 소망빌딩 4층
                </span>
              </li>
              <li className="flex items-center gap-4">
                <span className="text-[#b39359] w-4 text-center">📞</span>
                <span className="hover:text-white transition-colors">02-3472-1075</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="text-[#b39359] w-4 text-center">✉️</span>
                <span className="hover:text-white transition-colors">albotalbot@daum.net</span>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div className="space-y-6">
            <h3 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-8">Business Hours</h3>
            <div className="space-y-3 text-[13px] font-light leading-relaxed">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>월 · 화 · 목 · 금</span>
                <span className="text-white">10:30 – 20:30</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>수요일 (오후진료)</span>
                <span className="text-white">14:00 – 20:30</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>토요일</span>
                <span className="text-white">09:30 – 15:00</span>
              </div>
              <p className="text-[11px] text-[#b39359] mt-2 italic opacity-80">
                * 일요일 및 공휴일은 휴진입니다.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-8">Quick Links</h3>
            <ul className="grid grid-cols-2 gap-4 text-[13px] font-light">
              <li>
                <Link href="/director" className="hover:text-[#b39359] transition-colors flex items-center gap-2">
                  <span className="text-[8px] opacity-40">●</span> 한의사 소개
                </Link>
              </li>
              <li>
                <Link href="/specialty" className="hover:text-[#b39359] transition-colors flex items-center gap-2">
                  <span className="text-[8px] opacity-40">●</span> 공간 소개
                </Link>
              </li>
              <li>
                <Link href="/location" className="hover:text-[#b39359] transition-colors flex items-center gap-2">
                  <span className="text-[8px] opacity-40">●</span> 오시는 길
                </Link>
              </li>
              <li>
                <Link 
                  href="https://m.booking.naver.com/booking/13/bizes/670877" 
                  target="_blank"
                  className="hover:text-[#b39359] transition-colors flex items-center gap-2"
                >
                  <span className="text-[8px] opacity-40">●</span> 온라인 예약
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 섹션: 법적 고지 및 저작권 */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[11px] tracking-widest opacity-40">
            © 2026 MIDAS CLINIC. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-8 text-[11px] tracking-widest opacity-60">
            <Link href="/privacy" className="hover:text-white transition-colors">PRIVACY POLICY</Link>
            <Link href="/terms" className="hover:text-white transition-colors">TERMS OF USE</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
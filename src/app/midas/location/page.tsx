"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function LocationPage() {
  // 간단한 스크롤 애니메이션 처리를 위한 상태 (Framer Motion 없이 구현 시)
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => { setIsVisible(true); }, []);

  return (
    <div className="min-h-screen bg-[#fcfaf7] font-serif text-[#2d2d2d] overflow-x-hidden">
      
      {/* --- 히어로 섹션 --- */}
      <section className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} relative py-24 md:py-32 bg-white border-b border-gray-50 text-center px-6`}>
          <span className="text-[#b39359] text-xs tracking-[0.5em] font-bold uppercase block mb-6 italic font-sans">Location</span>
          <h1 className="text-4xl md:text-6xl font-light mb-8 leading-[1.2]">
            오시는 <span className="italic text-[#b39359]">길</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-400 text-sm md:text-base leading-relaxed break-keep font-sans">
            교대역 1번 출구에서 단 20초, <br className="hidden md:block"/>
            가장 가까운 곳에서 세심한 진료로 모시겠습니다.
          </p>
      </section>

      <main className="max-w-6xl mx-auto px-6 pb-32">
        
        {/* --- 1. 주소 및 지도 섹션 --- */}
        <div className={`transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} grid grid-cols-1 lg:grid-cols-2 gap-px bg-gray-100 border border-gray-100 rounded-[40px] overflow-hidden shadow-sm mb-16 -translate-y-12`}>
          <div className="bg-white p-10 md:p-16 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-[#b39359]/40" />
              <span className="text-[10px] font-bold tracking-[0.4em] text-[#b39359] uppercase font-sans">Address</span>
            </div>
            <h3 className="text-2xl font-light mb-4 tracking-tight leading-snug">
              서울특별시 서초구 서초대로 310 <br/>
              <span className="text-[#b39359] font-medium font-serif italic">소망빌딩 4층</span>
            </h3>
            <p className="text-gray-400 text-[14px] font-sans mb-8 break-keep">
              2, 3호선 교대역 1번 출구에서 <span className="text-[#2d2d2d] font-semibold underline underline-offset-4 decoration-[#b39359]/30">도보 20초</span> (CU 건물)
            </p>
              <div className="flex gap-4">
                <Link href="https://naver.me/FO9d7FeB" target="_blank" className="text-[10px] font-bold tracking-widest border border-gray-200 px-6 py-3 rounded-full hover:bg-[#b39359] hover:text-white transition-all font-sans uppercase">Naver Map</Link>
                <Link href="https://map.kakao.com/link/map/미다스한의원,37.49394,127.01553" target="_blank" className="text-[10px] font-bold tracking-widest border border-gray-200 px-6 py-3 rounded-full hover:bg-[#b39359] hover:text-white transition-all font-sans uppercase">Kakao Map</Link>
              </div>
          </div>
          <div className="bg-white min-h-[400px]">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.592565692983!2d127.0155322!3d37.493939999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca19285e61cad%3A0xf2839db3d4068497!2z66-464uk7Iqk7ZWc7J2Y7JuQ!5e0!3m2!1sko!2skr!4v1769146003578!5m2!1sko!2skr" 
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" className="grayscale-[0.3] hover:grayscale-0 transition-all duration-700"></iframe>
          </div>
        </div>

        {/* --- 2. 교통수단 통합 가이드 (간격 최적화) --- */}
        <div className="space-y-16 md:space-y-24">
          
          {/* 지하철 정보 */}
          <section className={`transition-all duration-1000 delay-500 transform ${isVisible ? 'opacity-100' : 'opacity-0'} flex flex-col md:flex-row gap-8 md:gap-20 items-start`}>
            <div className="w-full md:w-[280px] shrink-0">
              <div className="text-[#b39359] font-serif italic text-2xl mb-2">By Subway</div>
              <div className="h-px bg-[#b39359]/20 w-12 mb-4" />
              <p className="text-gray-400 text-xs font-sans leading-relaxed">2, 3호선 교대역 1번 출구 이용</p>
            </div>

            <div className="w-full group">
              <div className="bg-white border border-gray-100 rounded-[30px] p-8 md:p-10 shadow-sm group-hover:shadow-md transition-shadow duration-500">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-3">
                    <span className="text-[9px] font-bold text-[#b39359]/50 uppercase tracking-widest">Step 01</span>
                    <h4 className="text-[14px] font-bold text-[#2d2d2d] flex items-center gap-2 font-sans">
                      <span className="w-5 h-5 bg-[#3cb44a] text-white text-[9px] rounded-full flex items-center justify-center italic">2</span>
                      <span className="w-5 h-5 bg-[#f37321] text-white text-[9px] rounded-full flex items-center justify-center italic">3</span>
                      교대역 하차
                    </h4>
                    <p className="text-gray-400 text-[13px] leading-relaxed break-keep font-sans">1번 출구 방향으로 이동하세요.</p>
                  </div>
                  <div className="space-y-3 border-l border-gray-50 md:pl-8">
                    <span className="text-[9px] font-bold text-[#b39359]/50 uppercase tracking-widest">Step 02</span>
                    <h4 className="text-[14px] font-bold text-[#2d2d2d] font-sans italic underline decoration-[#b39359]/30">우측으로 회전</h4>
                    <p className="text-gray-400 text-[13px] leading-relaxed break-keep font-sans">출구로 나와 우측으로 즉시 몸을 돌려주세요.</p>
                  </div>
                  <div className="space-y-3 border-l border-gray-50 md:pl-8">
                    <span className="text-[9px] font-bold text-[#b39359]/50 uppercase tracking-widest">Step 03</span>
                    <h4 className="text-[14px] font-bold text-[#2d2d2d] font-sans italic underline decoration-[#b39359]/30">소망빌딩 4층</h4>
                    <p className="text-gray-400 text-[13px] leading-relaxed break-keep font-sans">CU가 있는 건물 4층으로 오시면 됩니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 버스 정보 */}
          <section className="flex flex-col md:flex-row gap-8 md:gap-20 items-start border-t border-gray-50 pt-16">
            <div className="w-full md:w-[280px] shrink-0">
              <div className="text-[#b39359] font-serif italic text-2xl mb-2">By Bus</div>
              <div className="h-px bg-[#b39359]/20 w-12 mb-4" />
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 font-sans">
              <div className="space-y-6">
                <div>
                  <h4 className="text-[#b39359] font-bold text-[11px] uppercase tracking-widest mb-3">간선 / 시외</h4>
                  <p className="text-[14px] leading-relaxed mb-1"><span className="text-[#2d2d2d] font-bold mr-2">144, 541, 740, 700번</span></p>
                  <p className="text-gray-400 text-[12px]">교대역 하차 후 CU 건물(소망빌딩)까지 도보 1분</p>
                </div>
                <div>
                  <h4 className="text-[#b39359] font-bold text-[11px] uppercase tracking-widest mb-3">마을버스</h4>
                  <div className="space-y-3 text-[13px]">
                    <p className="border-b border-gray-50 pb-2 flex justify-between"><span className="font-semibold">서초 03, 10</span> <span className="text-gray-400">5번 출구 하차 직진 1분</span></p>
                    <p className="border-b border-gray-50 pb-2 flex justify-between"><span className="font-semibold">서초 02</span> <span className="text-gray-400">4번 출구 하차 후 1번 출구 이동</span></p>
                  </div>
                </div>
              </div>
              <div className="bg-[#fcfaf7] p-6 rounded-2xl border border-gray-100">
                <h4 className="text-[#b39359] font-bold text-[11px] uppercase tracking-widest mb-3">광역 / 직행 노선</h4>
                <div className="text-[12px] text-gray-500 leading-relaxed grid grid-cols-2 gap-2">
                  <span>9100, 9200, 9201, 9300</span>
                  <span>M5443, M6405, M6410</span>
                  <span>1006, 3000, 3003, 3100</span>
                  <span>3101, 3102, 3200, 3300</span>
                  <span>3400, 6501, 8501, 9300</span>
                </div>
              </div>
            </div>
          </section>

          {/* 주차 정보 (간격 최적화) */}
          <section className="flex flex-col md:flex-row gap-8 md:gap-20 items-start border-t border-gray-50 pt-16">
            <div className="w-full md:w-[280px] shrink-0">
              <div className="text-[#b39359] font-serif italic text-2xl mb-2">By Car</div>
              <div className="h-px bg-[#b39359]/20 w-12 mb-4" />
            </div>
            <div className="w-full">
              <div className="bg-white border border-gray-100 rounded-[30px] p-8 md:p-10 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="space-y-2 text-center md:text-left">
                  <h4 className="text-lg font-medium">교대역 동측 공영주차장</h4>
                  <p className="text-[13px] text-gray-400 font-sans">건물 뒤편 공영주차장을 이용하시면 편리합니다.</p>
                </div>
                <div className="h-px md:w-12 md:h-px bg-gray-100 hidden md:block" />
                <div className="text-center">
                  <p className="text-[#b39359] font-bold text-xl font-sans mb-1 italic">1 Hour Support</p>
                  <p className="text-[11px] text-gray-400 font-sans uppercase tracking-widest">진료 시 1시간 주차 지원</p>
                </div>
              </div>
              <p className="mt-6 text-center text-[12px] text-gray-400 font-sans italic">"교대역 1번 출구 앞 CU 건물 4층 미다스 한의원 간판을 확인해주세요."</p>
            </div>
          </section>

        </div>

        {/* --- 하단 CTA --- */}
        <div className={`transition-all duration-1000 delay-700 transform ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} mt-32 bg-[#2d2d2d] rounded-[50px] p-12 md:p-20 text-center relative overflow-hidden`}>
          <div className="absolute top-[-50%] right-[-10%] w-[300px] h-[300px] bg-[#b39359]/10 rounded-full blur-[100px]" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-white text-3xl md:text-4xl font-light mb-10 leading-[1.4]">
              "가장 편안한 길로 <br/> <span className="italic text-[#b39359]">당신을 초대합니다.</span>"
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-5 font-sans uppercase">
              <Link href="https://m.booking.naver.com" className="px-10 py-4 bg-[#b39359] text-white font-bold rounded-full hover:shadow-[0_0_30px_rgba(179,147,89,0.3)] transition-all text-[11px] tracking-[0.2em]">Online Booking</Link>
              <a href="tel:02-3472-1075" className="px-10 py-4 bg-transparent border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-all text-[11px] tracking-[0.2em]">Call 02-3472-1075</a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
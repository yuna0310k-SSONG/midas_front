"use client";

import Link from "next/link";
import { useState } from "react";

export default function ParalysisPage() {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    { title: "전조 단계", desc: "귀 뒤 통증, 혀의 미각 상실, 눈 밑 떨림" },
    { title: "마비 급성기", desc: "입과 눈이 비뚤어지며 물이 새거나 눈이 안 감김" },
    { title: "회복/후유증기", desc: "안면 근육 수축, 연합운동(눈 감을 때 입이 움직임)" }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-[#2d2d2d] overflow-x-hidden">
      
      {/* --- 01. HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 bg-[#fcfaf7] overflow-hidden border-b border-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* 사진 섹션 */}
            <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div className="relative z-10 aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] bg-gray-200">
                <img 
                  src="/skin.jpg" 
                  className="w-full h-full object-cover transition-all duration-700"
                  alt="미다스 한의원 대표원장"
                />
              </div>
              
              {/* 학술적 전문성 배지 (스타일 3: 다크 글래스모피즘) */}
              <div className="absolute bottom-10 -right-8 z-20 bg-[#2d2d2d]/95 backdrop-blur-xl p-7 rounded-tr-[3rem] rounded-bl-[3rem] shadow-2xl border border-white/10">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#b39359] rounded-full"></span>
                    <span className="text-white text-[10px] font-bold tracking-[0.2em] uppercase">Specialist</span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[#b39359] text-lg font-serif italic font-light leading-none">SCI Author</h4>
                    <p className="text-white text-[13px] font-light tracking-tight opacity-90">
                      한의학박사 <span className="mx-1 opacity-30">|</span> 전문의
                    </p>
                  </div>
                  <div className="pt-2 border-t border-white/5">
                    <p className="text-gray-500 text-[9px] tracking-widest uppercase">Midas Dermatology Clinic</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 텍스트 섹션: 요청하신 디자인 적용 */}
            <div className="lg:col-span-7 space-y-10 order-1 lg:order-2">
              <div className="space-y-8">
                <div className="space-y-4">
                  <span className="text-[#b39359] text-[11px] font-bold tracking-[0.4em] uppercase">Evidence-Based Medicine</span>
                  <h1 className="text-4xl md:text-6xl font-serif font-light leading-[1.15] tracking-tighter text-balance">
                    SCI급 논문이 증명하는 <br />
                    <span className="text-[#b39359] italic font-normal">안면 신경의 자생력</span>
                  </h1>
                </div>

                <div className="space-y-6">
                  <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-serif italic border-l-2 border-[#b39359]/30 pl-6 break-keep">
                    "구안와사는 초기 골든타임이 핵심입니다. SCI급 논문 저자의 정밀한 진단으로 
                    안면 신경의 손상을 최소화하고 자연스러운 미소를 되찾아드립니다."
                  </p>
                  <p className="text-gray-400 text-sm leading-loose max-w-lg font-light break-keep">
                    국제 학술지가 인정한 학술적 근거와 수만 례의 임상 노하우를 결합하여, 
                    단순한 억제가 아닌 신경 스스로의 재생력을 재건하는 맞춤 치료를 제공합니다.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Link 
                  href="https://m.booking.naver.com/booking/13/bizes/670877" 
                  target="_blank"
                  className="px-10 py-3.5 border border-[#b39359] text-[#b39359] text-[11px] font-bold tracking-[0.2em] uppercase rounded-full hover:bg-[#b39359] hover:text-white transition-all duration-300"
                >
                  Consultation
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- 02. DIAGNOSIS & CAUSE: 안면마비 원인 분석 --- */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-serif font-light italic text-[#2d2d2d]">Analysis of Causes</h2>
                <div className="h-[1px] w-20 bg-[#b39359]"></div>
              </div>
              <p className="text-gray-500 font-light leading-relaxed break-keep text-lg">
                안면마비(구안와사)는 제7번 뇌신경인 안면신경에 염증이나 손상이 생겨 발생합니다. 
                단순히 얼굴 근육의 문제가 아닌 신경계 질환으로 접근해야 합니다.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { t: "바이러스 감염", d: "대상포진 바이러스 등 신경 침투" },
                  { t: "면역력 저하", d: "스트레스, 과로로 인한 기혈 부족" },
                  { t: "한랭 자극", d: "찬 기운에 노출되어 혈관 수축" },
                  { t: "혈액 순환 장애", d: "신경 주변 혈류 공급 차단" }
                ].map((item, i) => (
                  <div key={i} className="p-6 border border-gray-100 rounded-2xl hover:bg-[#fcfaf7] transition-colors">
                    <h5 className="font-bold text-sm mb-2 text-[#b39359]">{item.t}</h5>
                    <p className="text-xs text-gray-400 font-light">{item.d}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#2d2d2d] p-12 md:p-16 rounded-[3rem] text-white space-y-10 shadow-2xl">
              <span className="text-[#b39359] text-[10px] font-bold tracking-[0.4em] uppercase">Treatment Protocol</span>
              <h3 className="text-3xl font-serif font-light leading-tight">미다스 4단계 입체 치료</h3>
              <div className="space-y-8">
                {[
                  { t: "안면 신경 재생 한약", d: "신경의 염증을 빠르게 제거하고 부종을 가라앉힙니다." },
                  { t: "고농도 약침 요법", d: "마비된 근육과 경혈에 직접 약액을 주입해 마비를 풉니다." },
                  { t: "미세 전기침 치료", d: "신경 자극을 통해 근육의 수축과 이완 기능을 회복시킵니다." },
                  { t: "추나 & 안면 수기", d: "비뚤어진 안면 구조를 바로잡고 근육 긴장을 해소합니다." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <span className="font-serif text-[#b39359] text-xl">0{i+1}</span>
                    <div className="space-y-1">
                      <p className="font-bold text-[15px]">{item.t}</p>
                      <p className="text-xs text-gray-400 font-light leading-relaxed">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 03. STAGE GUIDE: 진행 단계별 안내 --- */}
      <section className="py-32 px-6 bg-[#fcfaf7]">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-4">
             <h2 className="text-3xl md:text-5xl font-serif font-light">치료 시기 및 골든타임</h2>
             <p className="text-gray-400 text-sm font-light uppercase tracking-widest">방치하면 평생의 후유증으로 남을 수 있습니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stages.map((stage, i) => (
              <div 
                key={i} 
                onMouseEnter={() => setActiveStage(i)}
                className={`p-12 rounded-[2.5rem] transition-all duration-500 cursor-default bg-white ${
                  activeStage === i ? "shadow-2xl scale-105 border border-[#b39359]/20" : "shadow-sm opacity-70"
                }`}
              >
                <p className="text-[#b39359] font-serif text-3xl mb-6">0{i+1}</p>
                <h4 className="font-bold text-xl mb-4">{stage.title}</h4>
                <p className="text-sm text-gray-500 leading-loose font-light break-keep">{stage.desc}</p>
                {i === 1 && (
                  <div className="mt-6 inline-block px-3 py-1 bg-red-50 text-red-400 text-[10px] font-bold rounded-full uppercase">
                    Golden Time: 72 Hours
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 04. ACADEMIC FOOTER --- */}
      <footer className="bg-[#2d2d2d] py-32 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <span className="text-[#b39359] text-[10px] font-bold tracking-[0.4em] uppercase opacity-60">Experience the difference</span>
            <h2 className="text-3xl md:text-5xl font-serif font-light leading-snug text-white italic">
              Don't lose your smile
            </h2>
            <p className="text-gray-400 text-sm font-light">미다스 한의원은 SCI급 논문과 수많은 임상 사례로 실력을 증명합니다.</p>
          </div>
          <div className="flex justify-center gap-6 pt-4">
            <Link 
              href="https://m.booking.naver.com/booking/13/bizes/670877" 
              className="px-16 py-5 bg-[#b39359] text-white text-[11px] font-bold tracking-[0.2em] uppercase rounded-full hover:shadow-[0_10px_30px_rgba(179,147,89,0.3)] transition-all"
            >
              Reserve Treatment
            </Link>
            <Link 
              href="/" 
              className="px-16 py-5 border border-white/10 text-white/70 text-[11px] font-bold tracking-[0.2em] uppercase rounded-full hover:bg-white/5 transition-all"
            >
              Home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
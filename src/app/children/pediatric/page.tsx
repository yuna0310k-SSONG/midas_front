"use client";

import Link from "next/link";

export default function PediatricPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#2d2d2d] overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 bg-[#fcfaf7]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="space-y-4">
              <span className="text-[#b39359] text-[11px] font-bold tracking-[0.4em] uppercase block">
                Pediatric & Junior Care
              </span>
              <h1 className="text-5xl md:text-7xl font-serif font-light leading-[1.1] tracking-tighter">
                아이의 건강한 성장은 <br />
                <span className="text-[#b39359] italic font-normal">올바른 기초</span>에서 시작됩니다
              </h1>
            </div>
            
            <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-2xl font-light break-keep">
              단순한 증상 완화를 넘어 아이의 체질적 약점을 보완하고, 
              평생 건강의 밑거름이 되는 균형 잡힌 발달을 돕습니다.
            </p>

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
      </section>

      <main className="max-w-7xl mx-auto px-6 py-24 space-y-40">
        
        {/* --- SECTION 1: CORE CLINIC (핵심 진료 분야) --- */}
        <section className="space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-4xl font-serif font-light leading-tight">
                아이의 성장을 방해하는 <br />
                <span className="italic text-[#b39359]">다섯 가지 핵심 고민</span>
              </h2>
              <div className="h-[1px] w-20 bg-[#b39359]/30"></div>
            </div>
            <div className="lg:col-span-6">
              <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                성장기 아이들의 문제는 서로 유기적으로 연결되어 있습니다. 
                원인을 정확히 파악하여 1:1 맞춤형 통합 솔루션을 제공합니다.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                t: "성장 클리닉", 
                d: "유전적 예상 키를 뛰어넘는 발달을 위해 골연령과 체질을 분석하여 성장판을 활성화합니다.",
                label: "Growth Support"
              },
              { 
                t: "호흡기 및 알레르기", 
                d: "반복되는 감기, 비염, 아토피의 근본 원인인 면역력을 강화하여 자생력을 높입니다.",
                label: "Immune Care"
              },
              { 
                t: "소화기 클리닉", 
                d: "식욕 부진, 잦은 복통, 설사 및 변비를 개선하여 영양 흡수가 원활하도록 돕습니다.",
                label: "Digestive Health"
              },
              { 
                t: "수면 및 정서", 
                d: "밤마다 깨서 우는 야제증, 야경증을 치료하고 자율신경을 안정시켜 숙면을 유도합니다.",
                label: "Sleep & Mental"
              },
              { 
                t: "체형 및 자세 교정", 
                d: "스마트 기기 사용으로 무너진 거북목, 척추측만증을 교정하여 성장의 길을 열어줍니다.",
                label: "Posture Correction"
              },
              { 
                t: "수험생·주니어 케어", 
                d: "학습량이 늘어나는 시기, 집중력 향상과 만성 피로 회복을 위한 총명탕 요법을 병행합니다.",
                label: "Concentration"
              }
            ].map((item, i) => (
              <div key={i} className="group p-10 border border-gray-100 rounded-[2rem] hover:bg-[#fcfaf7] hover:border-[#b39359]/20 transition-all">
                <span className="text-[9px] text-[#b39359] font-bold tracking-widest uppercase block mb-6">{item.label}</span>
                <h4 className="font-bold text-xl mb-4 text-[#2d2d2d] group-hover:text-[#b39359] transition-colors">{item.t}</h4>
                <p className="text-[13px] text-gray-500 leading-relaxed font-sans break-keep">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 2: SPECIAL TREATMENT (치료 방법) --- */}
        <section className="bg-[#2d2d2d] rounded-[3rem] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 md:p-20 flex flex-col justify-center space-y-12">
              <div className="space-y-4">
                <span className="text-[#b39359] text-[10px] font-bold tracking-[0.4em] uppercase">Treatment Method</span>
                <h3 className="text-4xl font-serif text-white leading-tight">
                  아이들이 편안하게 받는 <br />
                  <span className="italic font-light opacity-80">마이다스만의 통증 적은 치료</span>
                </h3>
              </div>
              
              <div className="space-y-10">
                {[
                  { t: "증류·무미 한약", d: "아이들도 거부감 없이 복용할 수 있도록 맛과 향을 순화시킨 맞춤형 청정 한약" },
                  { t: "부드러운 소아 추나", d: "뼈와 근육이 약한 아이들을 위해 강도를 조절한 섬세한 골격 교정 요법" },
                  { t: "무통증 침 & 뜸", d: "침에 대한 공포심 없이 혈자리를 자극하는 레이저 침 및 전자 뜸 치료" },
                  { t: "생활·식이 가이드", d: "진료실 밖에서도 건강이 유지될 수 있도록 체질별 맞춤 생활 수칙 교육" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-8">
                    <span className="text-[#b39359] font-serif italic text-3xl opacity-50">0{i+1}</span>
                    <div className="space-y-2">
                      <h5 className="font-bold text-lg text-white">{item.t}</h5>
                      <p className="text-sm text-gray-400 leading-relaxed font-light">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#b39359]/10 relative min-h-[400px] flex items-center justify-center border-l border-white/5">
                <div className="text-center space-y-6 p-12">
                    <h4 className="text-white font-serif text-2xl italic">Balanced Growth Plan</h4>
                    <div className="w-12 h-[1px] bg-[#b39359] mx-auto"></div>
                    <p className="text-[#b39359] text-xs tracking-[0.3em] leading-loose uppercase">
                        Safety / Comfort / Gentle / Effective
                    </p>
                </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 3: PHILOSOPHY (치료 특징) --- */}
        <section className="max-w-4xl mx-auto space-y-12 text-center">
          <div className="space-y-4">
            <h3 className="text-3xl font-serif font-light">마이다스 소아 진료의 원칙</h3>
            <p className="text-[#b39359] text-[10px] tracking-[0.4em] font-bold uppercase pt-2">Our Philosophy</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            <div className="p-8 border-b border-gray-100 md:border-b-0 md:border-r">
              <h5 className="font-bold text-sm uppercase tracking-widest mb-4">Integrative Care</h5>
              <p className="text-sm text-gray-500 leading-relaxed break-keep font-light">
                눈앞의 증상만 지우는 치료가 아닌, 오장육부의 불균형을 바로잡아 
                아이의 근본적인 면역 시스템을 복구합니다.
              </p>
            </div>
            <div className="p-8">
              <h5 className="font-bold text-sm uppercase tracking-widest mb-4">Stage-Based Approach</h5>
              <p className="text-sm text-gray-600 leading-relaxed break-keep font-light">
                영아기, 유아기, 학령기 등 각 발달 단계에 필요한 신체적 요구를 
                정확히 반영하여 성장 골든타임을 지킵니다.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-[#fcfaf7] py-32 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif font-light leading-snug">
              어린 시절의 건강이 <br />
              <span className="text-[#b39359] italic font-normal">평생의 자산</span>이 됩니다
            </h2>
            <p className="text-gray-400 text-sm font-light">마이다스는 우리 아이의 가장 건강한 내일을 응원합니다.</p>
          </div>
          
          <div className="flex justify-center gap-6">
            <Link 
              href="https://m.booking.naver.com/booking/13/bizes/670877" 
              target="_blank" 
              className="bg-[#b39359] text-white px-12 py-5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase hover:shadow-2xl transition-all"
            >
              Consultation
            </Link>
            <Link 
              href="/" 
              className="bg-white border border-gray-200 text-gray-400 px-12 py-5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-gray-50 transition-all"
            >
              Home
            </Link>
          </div>
          
          <div className="pt-20">
            <p className="text-[10px] text-gray-300 tracking-[0.8em] font-bold uppercase italic">
              Midas Pediatric & Growth Clinic
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
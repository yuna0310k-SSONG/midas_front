"use client";

import Link from "next/link";

export default function AnxietyInsomniaPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#2d2d2d] overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 bg-[#fcfaf7]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="space-y-4">
              <span className="text-[#b39359] text-[11px] font-bold tracking-[0.4em] uppercase block">
                Mental & Sleep Balance
              </span>
              <h1 className="text-5xl md:text-7xl font-serif font-light leading-[1.1] tracking-tighter">
                깊은 수면과 <br />
                <span className="text-[#b39359] italic font-normal">평온한 마음의 회복</span>
              </h1>
            </div>
            
            <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-2xl font-light break-keep">
              마음의 병은 신체 균형의 붕괴에서 시작됩니다. 
              자율신경계의 조절력을 회복하여 약물 의존 없는 지속 가능한 평온을 설계합니다.
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
        
        {/* --- SECTION 1: CLINIC SUBJECTS (진료 대상 및 증상) --- */}
        <section className="space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-4xl font-serif font-light leading-tight">
                당신의 일상을 무너뜨리는 <br />
                <span className="italic text-[#b39359]">심리적 불균형</span>
              </h2>
              <div className="h-[1px] w-20 bg-[#b39359]/30"></div>
            </div>
            <div className="lg:col-span-6">
              <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                단순히 기분의 문제가 아닙니다. 뇌와 몸이 보내는 신호를 정확히 읽고 
                그에 맞는 단계별 한방 치료를 시작해야 할 때입니다.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                t: "불면증 및 수면장애", 
                d: "입면 곤란, 잦은 각성, 숙면 부족으로 인해 만성 피로와 의욕 저하가 반복되는 상태",
                label: "Sleep Disorder"
              },
              { 
                t: "공황장애 및 불안장애", 
                d: "갑작스러운 가슴 두근거림, 호흡 곤란, 예기불안 등으로 일상 생활에 제약이 생기는 경우",
                label: "Panic & Anxiety"
              },
              { 
                t: "우울증 및 무기력증", 
                d: "지속적인 우울감과 흥미 저하, 에너지 고갈로 인해 심신이 지쳐있는 상태",
                label: "Depression"
              },
              { 
                t: "화병 및 스트레스", 
                d: "억눌린 감정으로 인한 상열감, 가슴 답답함, 소화 불량 등 신체화 증상이 나타나는 상태",
                label: "Stress & Hwa-Byung"
              },
              { 
                t: "강박증 및 건강염려증", 
                d: "특정 생각이나 행동에 과도하게 집착하거나 건강에 대한 불안이 통제되지 않는 상태",
                label: "Obsessive Compulsive"
              },
              { 
                t: "신경성 두통·어지럼증", 
                d: "검사상 이상은 없으나 심리적 요인으로 지속되는 신체 통증과 어지러운 증상",
                label: "Psychosomatic"
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

        {/* --- SECTION 2: MEDICAL SOLUTION (치료 방법) --- */}
        <section className="bg-[#2d2d2d] rounded-[3rem] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 md:p-20 flex flex-col justify-center space-y-12">
              <div className="space-y-4">
                <span className="text-[#b39359] text-[10px] font-bold tracking-[0.4em] uppercase">Midas Therapy</span>
                <h3 className="text-4xl font-serif text-white leading-tight">
                  뇌와 몸의 <br />
                  <span className="italic font-light opacity-80">조화를 되찾는 시간</span>
                </h3>
              </div>
              
              <div className="space-y-10">
                {[
                  { t: "안신(安神) 한약 처방", d: "심장을 안정시키고 기혈을 보충하여 자율신경계의 과민 반응을 낮춥니다." },
                  { t: "심신 이완 침구 치료", d: "긴장된 근육과 신경을 이완시켜 기혈 순환을 돕고 뇌파의 안정을 유도합니다." },
                  { t: "두경부 추나요법", d: "뇌로 가는 통로인 목과 어깨의 긴장을 해소하여 신경계 소통을 원활하게 합니다." },
                  { t: "호흡 및 명상 가이드", d: "가정에서도 스스로 불안을 조절할 수 있도록 체질별 맞춤 호흡법을 교육합니다." }
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
                    <h4 className="text-white font-serif text-2xl italic">Deep Rest & Mental Peace</h4>
                    <div className="w-12 h-[1px] bg-[#b39359] mx-auto"></div>
                    <p className="text-[#b39359] text-xs tracking-[0.3em] leading-loose uppercase">
                        Stability / Recovery / Natural / Balance
                    </p>
                </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 3: TREATMENT EFFECT (치료 효과 및 특징) --- */}
        <section className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-serif italic">Treatment Philosophy</h3>
            <p className="text-gray-400 text-[13px] tracking-wider uppercase">마이다스만의 근본 치료 원칙</p>
          </div>
          
          <div className="border-y border-gray-100">
            {[
              "중독성과 부작용 걱정 없는 자연 친화적 한방 약물 치료",
              "일시적인 억제가 아닌 스스로 조절할 수 있는 힘(자생력) 강화",
              "심리적 요인과 신체적 증상을 동시에 해결하는 신신일여(身心一如) 치료",
              "개별 상담을 통한 생활 습관 및 수면 환경 개선 솔루션 제공",
              "스트레스로 인한 2차 신체 질환(두통, 소화불량 등) 통합 관리"
            ].map((text, i) => (
              <div key={i} className="py-6 flex justify-between items-center border-b border-gray-50 last:border-0 group hover:px-4 transition-all">
                <span className="text-sm text-gray-600 font-light">{text}</span>
                <span className="text-[#b39359] text-[10px] font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-all">RECOVER WITH MIDAS</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-[#fcfaf7] py-32 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif font-light leading-snug">
              오늘 밤은 편안하게 <br />
              <span className="text-[#b39359] italic font-normal">깊은 휴식</span>을 시작하세요
            </h2>
            <p className="text-gray-400 text-sm font-light">마음의 평온이 일상의 행복을 만듭니다. 마이다스가 함께하겠습니다.</p>
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
              Midas Anxiety & Insomnia Care Clinic
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
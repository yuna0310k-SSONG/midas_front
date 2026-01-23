"use client";

import Link from "next/link";

export default function StudentClinicPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#2d2d2d] overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 bg-[#fcfaf7]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="space-y-4">
              <span className="text-[#b39359] text-[11px] font-bold tracking-[0.4em] uppercase block">
                Premium Student Health Care
              </span>
              <h1 className="text-5xl md:text-7xl font-serif font-light leading-[1.1] tracking-tighter">
                수험생의 몰입을 완성하는 <br />
                <span className="text-[#b39359] italic font-normal">신체 최적화 솔루션</span>
              </h1>
            </div>
            
            <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-2xl font-light break-keep">
              단순한 체력 증진을 넘어, 뇌 혈류 개선과 자율신경 안정을 통해 
              학습 효율이 극대화되는 최상의 컨디션을 설계합니다.
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
        
        {/* --- SECTION 1: DIAGNOSIS (유형별 진단) --- */}
        <section className="space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-4xl font-serif font-light leading-tight">
                현재 학습을 방해하는 <br />
                <span className="italic text-[#b39359]">신체적 신호</span>를 확인하세요
              </h2>
              <div className="h-[1px] w-20 bg-[#b39359]/30"></div>
            </div>
            <div className="lg:col-span-7">
              <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                개인마다 집중력이 저하되는 원인은 다릅니다. 마이다스는 사상 체질과 
                현재의 기혈 상태를 분석하여 근본적인 저하 요인을 찾아냅니다.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { 
                t: "기혈허약 (氣血虛弱)", 
                d: "지속적인 수면 부족과 무기력증으로 인해 책상 앞에서 쉽게 졸음이 쏟아지는 상태",
                label: "Energy Depletion"
              },
              { 
                t: "비위허약 (脾胃虛弱)", 
                d: "정서적 스트레스가 소화기 장애로 이어져 식욕 부진과 복부 불편감을 느끼는 상태",
                label: "Digestive Care"
              },
              { 
                t: "음혈부족 (陰血不足)", 
                d: "심리적 불안정으로 인해 오래 앉아있지 못하고 집중력이 산만하게 분산되는 상태",
                label: "Focus Disorder"
              },
              { 
                t: "심비혈허 (心脾血虛)", 
                d: "시험 및 평가에 대한 극도의 긴장으로 인해 다한증이나 신체 경직이 나타나는 상태",
                label: "Anxiety Relief"
              }
            ].map((item, i) => (
              <div key={i} className="group p-8 border border-gray-100 rounded-2xl hover:bg-[#fcfaf7] hover:border-[#b39359]/20 transition-all">
                <span className="text-[9px] text-[#b39359] font-bold tracking-widest uppercase block mb-6">{item.label}</span>
                <h4 className="font-bold text-lg mb-4 text-[#2d2d2d]">{item.t}</h4>
                <p className="text-[13px] text-gray-500 leading-relaxed font-sans break-keep">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 2: MEDICAL SOLUTION --- */}
        <section className="bg-[#2d2d2d] rounded-[3rem] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 md:p-20 flex flex-col justify-center space-y-12">
              <div className="space-y-4">
                <span className="text-[#b39359] text-[10px] font-bold tracking-[0.4em] uppercase">Midas Treatment</span>
                <h3 className="text-4xl font-serif text-white leading-tight">
                  학습 효율을 바꾸는 <br />
                  <span className="italic">세 가지 집중 치료</span>
                </h3>
              </div>
              
              <div className="space-y-10">
                {[
                  { t: "체형 교정 추나", d: "거북목과 굽은 등을 바로잡아 뇌로 가는 혈류량과 산소 공급을 원활하게 합니다." },
                  { t: "개인 맞춤 한약", d: "청뇌상태를 유지하며 부족한 기혈을 보충하고 면역력을 강화합니다." },
                  { t: "심리 안정 및 자율신경 치료", d: "스트레스 수치를 낮추고 뇌파의 안정을 유도하여 실전 실수를 줄입니다." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-8">
                    <span className="text-[#b39359] font-serif italic text-3xl">0{i+1}</span>
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
                    <h4 className="text-white font-serif text-2xl italic">Academic Performance Clinic</h4>
                    <div className="w-12 h-[1px] bg-[#b39359] mx-auto"></div>
                    <p className="text-[#b39359] text-xs tracking-widest leading-loose">
                        PHYSIQUE / CONCENTRATION / MEMORY / MENTAL STABILITY
                    </p>
                </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 3: COMMON SYMPTOMS TABLE --- */}
        <section className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-serif italic">Check List</h3>
            <p className="text-gray-400 text-[13px] tracking-wider uppercase">수험생이 흔히 겪는 증상군</p>
          </div>
          
          <div className="border-y border-gray-100">
            {[
              "장시간 좌식 생활로 인한 목, 어깨 결림 및 허리 통증",
              "집중력 저하를 유발하는 만성적인 두통 및 어지럼증",
              "긴장으로 인한 소화불량 및 과민성 장 증후군",
              "불규칙한 수면 패턴으로 인한 만성 피로",
              "심리적 압박으로 인한 여성 수험생의 생리불순 케어"
            ].map((text, i) => (
              <div key={i} className="py-6 flex justify-between items-center border-b border-gray-50 last:border-0 group hover:px-4 transition-all">
                <span className="text-sm text-gray-600 font-light">{text}</span>
                <span className="text-[#b39359] text-[10px] font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-all">MANAGED BY MIDAS</span>
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
              공부는 체력전이자 <br />
              <span className="text-[#b39359] italic font-normal">심리전</span>입니다
            </h2>
            <p className="text-gray-400 text-sm font-light">마이다스가 수험 생활의 든든한 페이스메이커가 되겠습니다.</p>
          </div>
          
          <div className="flex justify-center gap-6">
            <Link 
              href="https://m.booking.naver.com/booking/13/bizes/670877" 
              target="_blank" 
              className="bg-[#b39359] text-white px-12 py-5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase hover:shadow-2xl transition-all"
            >
              Naver Booking
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
              Midas Student Health Management Clinic
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
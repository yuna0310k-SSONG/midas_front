"use client";

import Link from "next/link";

export default function TrafficAccidentPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#2d2d2d] overflow-x-hidden">
      
      {/* --- SLIM HERO SECTION: 교통사고 후유증 --- */}
      <section className="relative pt-24 pb-12 px-6 bg-white border-b border-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* 메인 텍스트 영역: 사고 후유증 핵심 메시지 */}
            <div className="lg:col-span-7 bg-[#fcfaf7] rounded-[2.5rem] p-8 md:p-14 flex flex-col justify-center border border-[#b39359]/5">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-[#b39359]"></span>
                  <span className="text-[#b39359] text-[10px] font-bold tracking-[0.3em] uppercase">
                    TA & Pain Care Clinic
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-serif font-light leading-tight tracking-tighter">
                  사고의 충격, <br /><span className="text-[#b39359] italic font-normal">보이지 않는 어혈</span>까지 <br />다스립니다
                </h1>
                
                <p className="text-gray-500 text-sm md:text-base leading-relaxed break-keep font-sans max-w-lg font-light">
                  교통사고 후유증은 사고 직후보다 시간이 흐른 뒤 나타납니다. <br className="hidden md:block" />
                  미세한 근육 손상과 정서적 충격까지 세심하게 관리해 드립니다.
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {["자동차보험 적용", "어혈 제거", "편타성 손상"].map((tag) => (
                    <span key={tag} className="px-4 py-1.5 bg-white rounded-full text-[10px] font-bold text-gray-400 border border-gray-100 shadow-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 우측 슬림 카드: 보험 혜택 강조 */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-4">
              <div className="bg-[#2d2d2d] rounded-[2.5rem] p-8 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-[#b39359] font-serif italic text-xl mb-2">Benefit 0%</h3>
                  <p className="text-gray-400 text-[13px] leading-relaxed break-keep font-light">
                    자동차보험 적용 시, <br />
                    본인 부담금 없이 한방 집중 치료가 가능합니다. <br />
                    (침, 한약, 추나, 물리치료 포함)
                  </p>
                </div>
                <div className="text-3xl font-serif opacity-10 absolute right-8 bottom-6 text-[#b39359]">TA</div>
              </div>

              <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-gray-900 font-bold text-sm uppercase tracking-wider">Simple Process</h3>
                  <p className="text-[11px] text-gray-400 font-sans italic tracking-tight">사고접수번호 하나면 충분합니다</p>
                </div>
                <Link 
                  href="https://m.booking.naver.com/booking/13/bizes/670877" 
                  target="_blank"
                  className="px-8 py-3 bg-[#fcfaf7] border border-[#b39359]/20 text-[#b39359] text-[10px] font-bold tracking-[0.2em] uppercase rounded-full hover:bg-[#b39359] hover:text-white transition-all font-sans"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-20 space-y-28">
        
        {/* --- SECTION 1: 편타성 손상의 증상 (4열 콤팩트 그리드) --- */}
        <section className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-serif font-light tracking-tight">주요 사고 후유증상</h2>
            <p className="text-[#b39359] text-[10px] tracking-[0.4em] font-bold uppercase font-sans">Major Symptoms</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { t: "경추부 통증", d: "머리가 채찍처럼 흔들리며 발생한 목, 어깨의 만성 통증" },
              { t: "신경계 이상", d: "사고 후 동반되는 두통, 어지럼증, 메스꺼움 및 이명" },
              { t: "근골격계 저림", d: "충격으로 정렬이 틀어지며 발생하는 허리 통증과 사지 저림" },
              { t: "외상 후 스트레스", d: "심리적 불안감, 불면증, 사고 잔상으로 인한 집중력 저하" }
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 rounded-[2rem] border border-gray-50 shadow-sm hover:shadow-md transition-all text-center">
                <p className="text-[#b39359] font-serif italic text-xl mb-4">0{i+1}</p>
                <h4 className="font-bold text-[15px] mb-3">{item.t}</h4>
                <p className="text-[12px] text-gray-400 leading-relaxed font-sans break-keep">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 2: 치료 솔루션 (어혈 및 추나 중심) --- */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="bg-[#2d2d2d] p-12 md:p-16 rounded-[3rem] text-white">
            <div className="space-y-10">
              <div className="space-y-2">
                <h3 className="text-2xl font-serif italic text-[#b39359]">Midas Recovery</h3>
                <p className="text-gray-500 text-xs font-sans uppercase tracking-widest">후유증 근본 해결을 위한 한방 치료</p>
              </div>
              <div className="space-y-8">
                {[
                  { t: "어혈 제거 한약", d: "사고 충격으로 발생한 미세 혈관 손상과 독소(어혈)를 배출합니다." },
                  { t: "사고 특화 추나", d: "경추와 척추의 미세한 변형을 바로잡아 신경 압박을 해소합니다." },
                  { t: "약침 & 봉약침", d: "강력한 소염 작용으로 손상된 인대와 근육의 염증을 빠르게 치료합니다." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <span className="text-[#b39359] font-serif italic text-xl opacity-60">0{i+1}</span>
                    <div className="space-y-1">
                      <h5 className="font-bold text-[16px]">{item.t}</h5>
                      <p className="text-xs text-gray-500 leading-relaxed font-sans">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#fcfaf7] p-12 md:p-16 rounded-[3rem] border border-gray-100 flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-8 italic">Treatment Process</h3>
            <ul className="space-y-6">
              {[
                { s: "접수", c: "보험사명과 사고접수번호를 말씀해주세요." },
                { s: "확인", c: "병원에서 보험사 담당자와 연락하여 지불보증을 확인합니다." },
                { s: "진료", c: "증상에 따른 정밀 진찰 후 맞춤 치료를 진행합니다." },
                { s: "수납", c: "환자분은 비용 부담 없이 수납 후 귀가하시면 됩니다." }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-5 border-b border-gray-200/50 pb-5 last:border-0">
                  <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm shrink-0">
                    <span className="text-[#b39359] font-bold text-xs">{i+1}</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-[14px] mb-1">{item.s}</h5>
                    <p className="text-[12px] text-gray-500 font-sans break-keep">{item.c}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* --- SECTION 3: 치료의 강점 --- */}
        <section className="pt-10 space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-light">Midas TA Care</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { t: "신속한 통증 완화", d: "급성 염증 조절을 통해 사고 초기 통증을 효과적으로 제어합니다." },
              { t: "만성 후유증 예방", d: "어혈과 틀어진 골격을 바로잡아 고질적인 후유증을 방지합니다." },
              { t: "신경 및 심리 안정", d: "사고로 놀란 자율신경계를 안정시켜 전신 컨디션을 회복합니다." }
            ].map((item, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="text-[#b39359] text-[10px] font-bold uppercase tracking-[0.3em]">Strong Point</div>
                <h5 className="text-lg font-bold underline underline-offset-8 decoration-[#b39359]/20">{item.t}</h5>
                <p className="text-xs text-gray-400 leading-relaxed font-sans break-keep">{item.d}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* --- SLIM FOOTER --- */}
      <footer className="bg-white py-24 border-t border-gray-50 text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-10">
          <h2 className="text-2xl md:text-3xl font-serif font-light leading-snug">
            사고 이전의 <br />
            <span className="text-[#b39359] italic text-3xl md:text-5xl">건강한 일상</span>으로 돌아가도록
          </h2>
          <div className="flex justify-center gap-4">
            <Link href="https://m.booking.naver.com/booking/13/bizes/670877" target="_blank" className="bg-[#b39359] text-white px-8 py-4 rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-[#2d2d2d] transition-all">Consultation</Link>
            <Link href="/" className="bg-gray-50 text-gray-400 px-8 py-4 rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-gray-100 transition-all font-sans">Main Home</Link>
          </div>
          <p className="text-[10px] text-gray-200 tracking-[0.5em] font-bold pt-10 uppercase italic font-sans">Midas Oriental Medical Center TA Clinic</p>
        </div>
      </footer>
    </div>
  );
}
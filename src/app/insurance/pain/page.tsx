"use client";

import Link from "next/link";

export default function PainPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#2d2d2d] overflow-x-hidden">
      
      {/* --- SLIM HERO SECTION: 통증치료 --- */}
      <section className="relative pt-24 pb-12 px-6 bg-white border-b border-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* 메인 텍스트 영역: 통증의 근본 원인 강조 */}
            <div className="lg:col-span-7 bg-[#fcfaf7] rounded-[2.5rem] p-8 md:p-14 flex flex-col justify-center border border-[#b39359]/5">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-[#b39359]"></span>
                  <span className="text-[#b39359] text-[10px] font-bold tracking-[0.3em] uppercase">
                    Pain & Rehabilitation Clinic
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-serif font-light leading-tight tracking-tighter">
                  반복되는 통증, <br />
                  <span className="text-[#b39359] italic font-normal">구조와 기능을 함께</span> <br />다스립니다
                </h1>
                
                <p className="text-gray-500 text-sm md:text-base leading-relaxed break-keep font-sans max-w-lg font-light">
                  단순히 증상만을 억제하는 것이 아니라, 염증을 배출하고 틀어진 정렬을 바로잡아 통증의 재발을 방지하는 근본 치료를 지향합니다.
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {["디스크/협착증", "관절/근육통", "만성 염증 케어"].map((tag) => (
                    <span key={tag} className="px-4 py-1.5 bg-white rounded-full text-[10px] font-bold text-gray-400 border border-gray-100 shadow-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 우측 슬림 카드: 치료 철학 */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-4">
              <div className="bg-[#2d2d2d] rounded-[2.5rem] p-8 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-[#b39359] font-serif italic text-xl mb-2">Philosophy</h3>
                  <p className="text-gray-400 text-[13px] leading-relaxed break-keep font-light font-sans">
                    우리 몸의 자생력을 높여 <br />
                    수술 없이도 편안한 일상을 <br />
                    회복할 수 있도록 돕습니다.
                  </p>
                </div>
                <div className="text-3xl font-serif opacity-10 absolute right-8 bottom-6 text-[#b39359]">Care</div>
              </div>

              <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-gray-900 font-bold text-sm uppercase tracking-wider">Appointment</h3>
                  <p className="text-[11px] text-gray-400 font-sans italic tracking-tight">대기 없는 빠른 진료 예약</p>
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
        
        {/* --- SECTION 1: 치료 범위 (4열 콤팩트 그리드) --- */}
        <section className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-serif font-light tracking-tight">집중 치료 과목</h2>
            <p className="text-[#b39359] text-[10px] tracking-[0.4em] font-bold uppercase font-sans">Focus Areas</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { t: "척추 질환", d: "허리·목 디스크, 척추관 협착증, 만성 요통 및 좌골신경통" },
              { t: "관절 질환", d: "오십견, 회전근개 손상, 무릎 관절염, 테니스 엘보" },
              { t: "근육 및 신경", d: "섬유근육통, 근막통증증후군, 손발 저림 및 마비감" },
              { t: "기타 통증", d: "출산 후 관절통, 만성 두통, 원인 불명의 신경통 케어" }
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 rounded-[2rem] border border-gray-50 shadow-sm hover:shadow-md transition-all text-center">
                <p className="text-[#b39359] font-serif italic text-xl mb-4">0{i+1}</p>
                <h4 className="font-bold text-[15px] mb-3">{item.t}</h4>
                <p className="text-[12px] text-gray-400 leading-relaxed font-sans break-keep">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 2: 치료 솔루션 (비수술적 접근) --- */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="bg-[#2d2d2d] p-12 md:p-16 rounded-[3rem] text-white">
            <div className="space-y-10">
              <div className="space-y-2">
                <h3 className="text-2xl font-serif italic text-[#b39359]">Pain Solution</h3>
                <p className="text-gray-500 text-xs font-sans uppercase tracking-widest">미다스만의 3단계 통증 케어</p>
              </div>
              <div className="space-y-8">
                {[
                  { t: "항염 및 신경 재생", d: "약침 치료와 봉독을 통해 염증을 가라앉히고 손상된 신경 회복을 돕습니다." },
                  { t: "틀어진 관절 교정", d: "추나요법을 통해 압박받는 신경 통로를 열어주고 정렬을 맞춥니다." },
                  { t: "순환 및 강화 한약", d: "근육과 인대를 강화하고 기혈 순환을 돕는 맞춤 한약을 처방합니다." }
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
            <h3 className="text-2xl font-bold mb-8 italic">Pain Check List</h3>
            <p className="text-xs text-[#b39359] font-bold mb-6 tracking-widest uppercase">이런 경우 치료가 시급합니다</p>
            <ul className="space-y-4">
              {[
                "아침에 일어날 때 관절이 뻣뻣하고 통증이 있다",
                "특정 동작에서 뜨끔하거나 전기가 오는 듯한 통증",
                "날씨가 흐리거나 밤이 되면 통증이 심해진다",
                "충분히 쉬어도 목과 어깨의 긴장이 풀리지 않는다",
                "통증 부위뿐만 아니라 팔, 다리까지 저린 증상"
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-4 text-[13px] text-gray-600 font-sans border-b border-gray-200/50 pb-4 last:border-0">
                  <div className="w-1 h-1 bg-[#b39359] rounded-full" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* --- SECTION 3: 기대 효과 --- */}
        <section className="pt-10 space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-light">치료 기대 효과</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { t: "신속한 증상 완화", d: "급성 염증 조절을 통해 일상 생활에 지장을 주는 통증을 빠르게 제거" },
              { t: "신체 자생력 강화", d: "약해진 근육과 인대를 보강하여 외부 충격에 견디는 힘을 증대" },
              { t: "구조적 변형 방지", d: "관절 정렬을 바로잡아 디스크 돌출이나 퇴행성 변화를 사전에 차단" }
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
            무너진 신체 밸런스, <br />
            <span className="text-[#b39359] italic text-3xl md:text-5xl">근본부터 탄탄하게</span> 회복하세요
          </h2>
          <div className="flex justify-center gap-4">
            <Link href="https://m.booking.naver.com/booking/13/bizes/670877" target="_blank" className="bg-[#b39359] text-white px-8 py-4 rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-[#2d2d2d] transition-all">Consultation</Link>
            <Link href="/" className="bg-gray-50 text-gray-400 px-8 py-4 rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-gray-100 transition-all font-sans">Main Home</Link>
          </div>
          <p className="text-[10px] text-gray-200 tracking-[0.5em] font-bold pt-10 uppercase italic font-sans">Midas Oriental Medical Center Pain Clinic</p>
        </div>
      </footer>
    </div>
  );
}
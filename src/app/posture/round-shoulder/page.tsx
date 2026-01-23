"use client";

import Link from "next/link";

export default function RoundShoulderPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#2d2d2d] overflow-x-hidden">
      
      {/* --- HERO: 전문성 강조 --- */}
      <section className="pt-32 pb-20 px-6 bg-[#fcfaf7] border-b border-[#b39359]/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8 space-y-6">
              <p className="text-[#b39359] text-xs tracking-[0.4em] font-bold uppercase">Shoulder Alignment Care</p>
              <h1 className="text-4xl md:text-6xl font-serif font-light leading-tight tracking-tighter">
                말린 어깨를 펴고 <br />
                <span className="text-[#b39359] italic font-normal">당당한 라인을 되찾다</span>
              </h1>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed break-keep font-light max-w-xl">
                라운드숄더는 단순히 어깨가 말린 것을 넘어, 흉추의 후만과 경추의 변형을 동반합니다. 
                미다스는 단축된 앞 근육은 늘리고, 약해진 뒤 근육은 강화하여 바른 정렬을 완성합니다.
              </p>
            </div>
            <div className="lg:col-span-4 pb-2">
              <div className="p-6 bg-white border border-[#b39359]/10 rounded-2xl shadow-sm">
                <p className="text-[#b39359] text-[10px] font-bold uppercase tracking-widest mb-2">Focus Area</p>
                <p className="text-xs text-gray-400 font-sans leading-relaxed break-keep">
                  소흉근 단축 해소 · 견갑골 위치 정상화 · 흉추 가동성 확보 · 승모근 긴장 완화
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-6 py-24 space-y-32">
        
        {/* --- SECTION 1: 원인 (심플 인포그래픽) --- */}
        <section className="space-y-12">
          <div className="flex items-baseline gap-4">
            <h2 className="text-2xl font-serif italic">The Cause</h2>
            <div className="h-[1px] flex-1 bg-gray-100"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { t: "근육 불균형", d: "가슴 근육은 짧아지고 등 근육은 힘을 잃어 어깨를 앞으로 당김" },
              { t: "좌식 생활", d: "컴퓨터와 스마트폰 사용 시 팔을 앞으로 모으는 장시간의 자세" },
              { t: "흉추 후만", d: "등이 굽으면서 견갑골이 바깥으로 벌어져 어깨가 말려 들어감" },
              { t: "보상 작용", d: "골반이나 목의 불균형이 어깨 정렬에 연쇄적인 영향을 미침" }
            ].map((item, i) => (
              <div key={i} className="group p-8 border border-gray-50 bg-[#fcfaf7]/50 rounded-[2rem] transition-all hover:bg-white hover:shadow-xl hover:shadow-[#b39359]/5">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#b39359] font-serif italic text-sm mb-6 shadow-sm">
                  {i + 1}
                </div>
                <h5 className="font-bold mb-3">{item.t}</h5>
                <p className="text-[13px] text-gray-400 leading-relaxed break-keep font-sans">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 2: 자가진단 & 치료 (Split Layout) --- */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 자가진단 */}
          <div className="space-y-10">
            <h2 className="text-2xl font-serif italic border-l-4 border-[#b39359] pl-6">Self Diagnosis</h2>
            <div className="grid grid-cols-1 gap-3">
              {[
                "양팔을 늘어뜨렸을 때 손등이 앞을 향한다",
                "바닥에 누웠을 때 어깨가 바닥에서 떠 있다",
                "어깨 통증과 함께 팔이 자주 저린다",
                "등이 굽어 보이고 목 뒤가 불룩하게 솟았다",
                "옆에서 보았을 때 어깨선이 귀보다 앞에 있다"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-5 bg-white border border-gray-100 rounded-2xl">
                  <span className="text-[#b39359] font-serif italic text-sm">0{i+1}</span>
                  <span className="text-[13px] font-medium text-gray-600">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 치료 방법 */}
          <div className="bg-[#2d2d2d] rounded-[3rem] p-12 text-white space-y-10">
            <h2 className="text-2xl font-serif italic text-[#b39359]">Treatment</h2>
            <div className="space-y-8">
              {[
                { t: "흉추-어깨 추나", d: "굽은 등(흉추)을 펴고 견갑골의 가동 범위를 정상화합니다." },
                { t: "근막 이완침", d: "단축된 소흉근을 직접 이완시켜 어깨가 펴지도록 유도합니다." },
                { t: "약침 치료", d: "어깨 관절 주위의 염증을 제거하고 인대와 근육을 강화합니다." },
                { t: "체형 교정 운동", d: "약해진 등 근육(능형근)을 강화하는 맞춤 운동을 처방합니다." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-1 h-1 bg-[#b39359] rounded-full mt-2 shrink-0"></div>
                  <div className="space-y-1">
                    <h5 className="font-bold text-[15px]">{item.t}</h5>
                    <p className="text-xs text-gray-400 leading-relaxed font-sans">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION 3: 기대 효과 --- */}
        <section className="bg-[#fcfaf7] rounded-[3rem] p-12 md:p-20 text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-3xl font-serif font-light">Expected Effects</h2>
            <p className="text-gray-400 text-xs tracking-widest uppercase">더 당당해진 당신의 실루엣</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            <div className="space-y-4">
              <div className="h-px bg-[#b39359]/30 w-12 mx-auto"></div>
              <h5 className="font-bold text-lg">심미적 개선</h5>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">말린 어깨가 펴지며 쇄골 라인이 <br />정돈되고 목이 길어 보이는 효과</p>
            </div>
            <div className="space-y-4">
              <div className="h-px bg-[#b39359]/30 w-12 mx-auto"></div>
              <h5 className="font-bold text-lg">만성 통증 해소</h5>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">어깨 충돌 증후군 예방 및 <br />승모근, 등 근육의 뻐근함 해결</p>
            </div>
            <div className="space-y-4">
              <div className="h-px bg-[#b39359]/30 w-12 mx-auto"></div>
              <h5 className="font-bold text-lg">호흡 및 순환 개선</h5>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">눌려있던 흉곽이 확장되어 <br />폐활량 증가 및 전신 혈류 개선</p>
            </div>
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="py-32 text-center border-t border-gray-100 bg-white">
        <div className="max-w-4xl mx-auto px-6 space-y-10">
          <h2 className="text-2xl md:text-4xl font-serif font-light leading-relaxed">
            움츠러든 어깨를 펴고, <br />
            <span className="text-[#b39359] italic text-3xl md:text-5xl font-normal">일상의 자신감을 회복하세요</span>
          </h2>
          <div className="flex justify-center gap-6 pt-4">
            <Link href="https://m.booking.naver.com/booking/13/bizes/670877" target="_blank" className="bg-[#b39359] text-white px-10 py-4 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#2d2d2d] transition-all">Consultation</Link>
            <Link href="/" className="bg-gray-50 text-gray-400 px-10 py-4 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-gray-100 transition-all font-sans">Home</Link>
          </div>
          <p className="text-[10px] text-gray-200 tracking-[0.5em] font-bold pt-12 uppercase italic font-sans">Scientific Body Reformation Program</p>
        </div>
      </footer>
    </div>
  );
}
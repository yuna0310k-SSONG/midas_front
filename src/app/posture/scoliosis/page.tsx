"use client";

import Link from "next/link";

export default function ScoliosisPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#2d2d2d] overflow-x-hidden">
      
      {/* --- HERO: 척추 균형의 중요성 --- */}
      <section className="pt-32 pb-20 px-6 bg-[#fcfaf7] border-b border-[#b39359]/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8 space-y-6">
              <p className="text-[#b39359] text-xs tracking-[0.4em] font-bold uppercase">Spinal Alignment Clinic</p>
              <h1 className="text-4xl md:text-6xl font-serif font-light leading-tight tracking-tighter">
                휘어진 척추를 바로잡는 <br />
                <span className="text-[#b39359] italic font-normal">3차원 입체 교정 시스템</span>
              </h1>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed break-keep font-light max-w-xl">
                척추 측만증은 단순히 좌우로 휘는 것을 넘어 척추 마디마디가 회전되는 복합 변형입니다. 
                미다스는 정밀한 진단을 통해 척추의 회전과 기울기를 동시에 바로잡습니다.
              </p>
            </div>
            <div className="lg:col-span-4 pb-2">
              <div className="p-6 bg-white border border-[#b39359]/10 rounded-2xl shadow-sm">
                <p className="text-[#b39359] text-[10px] font-bold uppercase tracking-widest mb-2">Diagnosis Focus</p>
                <p className="text-xs text-gray-400 font-sans leading-relaxed break-keep">
                  C자/S자형 만곡 분석 · 골반 회전 비대칭 측정 · 흉곽 비대칭 교정 · 척추 유연성 확보
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-6 py-24 space-y-32">
        
        {/* --- SECTION 1: 원인 (정밀 분류) --- */}
        <section className="space-y-12">
          <div className="flex items-baseline gap-4">
            <h2 className="text-2xl font-serif italic">Classification</h2>
            <div className="h-[1px] flex-1 bg-gray-100"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { t: "특발성 측만증", d: "원인을 명확히 알 수 없으나 성장기에 급격히 진행되는 경우 (전체의 80% 이상)" },
              { t: "기능성 측만증", d: "잘못된 자세, 다리 길이 차이, 골반 틀어짐 등으로 인해 2차적으로 발생" },
              { t: "선천성/근육성", d: "척추 뼈 자체의 기형이나 근육의 비정상적인 발달로 인해 발생하는 경우" }
            ].map((item, i) => (
              <div key={i} className="p-8 border border-gray-50 bg-[#fcfaf7]/50 rounded-[2.5rem] hover:bg-white hover:shadow-lg transition-all">
                <h5 className="font-bold text-[#b39359] mb-4">Type 0{i + 1}</h5>
                <h6 className="font-bold mb-3">{item.t}</h6>
                <p className="text-[13px] text-gray-500 leading-relaxed break-keep font-sans">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 2: 자가진단 & 치료법 (다크 레이아웃) --- */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 자가진단 */}
          <div className="space-y-10">
            <h2 className="text-2xl font-serif italic border-l-4 border-[#b39359] pl-6">Self Check</h2>
            <div className="grid grid-cols-1 gap-3">
              {[
                "양쪽 어깨나 골반의 높이가 눈에 띄게 다르다",
                "몸을 앞으로 숙였을 때 한쪽 등이나 허리가 튀어나온다",
                "똑바로 섰을 때 양 팔과 몸통 사이의 간격이 다르다",
                "신발 밑창이 유독 한쪽만 빨리 닳는다",
                "가슴 뼈나 갈비뼈가 비대칭적으로 튀어나와 보인다"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-5 bg-white border border-gray-100 rounded-2xl">
                  <span className="w-1.5 h-1.5 bg-[#b39359] rounded-full"></span>
                  <span className="text-[13px] font-medium text-gray-600 font-sans">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 치료 방법 */}
          <div className="bg-[#2d2d2d] rounded-[3rem] p-12 text-white space-y-10">
            <h2 className="text-2xl font-serif italic text-[#b39359]">Correction Plan</h2>
            <div className="space-y-8">
              {[
                { t: "측만 특화 추나", d: "척추의 만곡을 줄이고 회전된 분절을 반대로 회전시켜 정렬합니다." },
                { t: "심부 근육 강화", d: "척추를 지탱하는 속근육을 강화하여 교정된 상태를 유지시킵니다." },
                { t: "골반/하지 교정", d: "척추의 기초가 되는 골반의 수평과 하지 정렬을 함께 다스립니다." },
                { t: "생활 관리 코칭", d: "성장기 아이들의 경우 주기적인 관찰과 바른 자세 습관을 교육합니다." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 border-b border-white/5 pb-6 last:border-0">
                  <span className="text-[#b39359] font-serif italic text-lg opacity-60">0{i+1}</span>
                  <div className="space-y-1">
                    <h5 className="font-bold text-[15px]">{item.t}</h5>
                    <p className="text-xs text-gray-400 leading-relaxed font-sans">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION 3: 기대 효과 (3열 인포그래픽) --- */}
        <section className="bg-[#fcfaf7] rounded-[3rem] p-12 md:p-20 text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-3xl font-serif font-light italic">Clinical Benefits</h2>
            <p className="text-gray-400 text-xs tracking-widest uppercase">척추의 균형이 가져오는 변화</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            <div className="space-y-4">
              <h5 className="font-bold text-[#b39359] text-lg">성장 저해 요인 해소</h5>
              <p className="text-xs text-gray-400 leading-relaxed font-sans italic">"측만으로 인해 눌려있던 <br />성장판의 압박을 해소하여 <br />올바른 성장을 돕습니다."</p>
            </div>
            <div className="space-y-4 md:border-x border-[#b39359]/10 px-8">
              <h5 className="font-bold text-[#b39359] text-lg">내부 장기 기능 회복</h5>
              <p className="text-xs text-gray-400 leading-relaxed font-sans italic">"흉곽의 비대칭을 교정하여 <br />심폐 기능과 소화 기능을 <br />정상화하도록 돕습니다."</p>
            </div>
            <div className="space-y-4">
              <h5 className="font-bold text-[#b39359] text-lg">신체 밸런스 완성</h5>
              <p className="text-xs text-gray-400 leading-relaxed font-sans italic">"만성적인 허리/등 통증을 <br />예방하고 균형 잡힌 <br />외형을 완성합니다."</p>
            </div>
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="py-32 text-center border-t border-gray-100 bg-white">
        <div className="max-w-4xl mx-auto px-6 space-y-10">
          <h2 className="text-2xl md:text-4xl font-serif font-light leading-relaxed">
            휘어진 시간을 바로잡는, <br />
            <span className="text-[#b39359] italic text-3xl md:text-5xl font-normal tracking-tight">미다스의 정밀한 척추 교정</span>
          </h2>
          <div className="flex justify-center gap-6 pt-4">
            <Link href="https://m.booking.naver.com/booking/13/bizes/670877" target="_blank" className="bg-[#b39359] text-white px-10 py-4 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#2d2d2d] transition-all">Reservation</Link>
            <Link href="/" className="bg-gray-50 text-gray-400 px-10 py-4 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-gray-100 transition-all font-sans">Main Home</Link>
          </div>
          <p className="text-[10px] text-gray-200 tracking-[0.5em] font-bold pt-12 uppercase italic font-sans">Holistic Spinal Correction Program</p>
        </div>
      </footer>
    </div>
  );
}
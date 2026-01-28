"use client";

import Link from "next/link";

export default function PostureGeneralPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-[#2d2d2d] overflow-x-hidden">
      
      {/* --- HERO SECTION: 컨셉 중심의 헤더 --- */}
      <section className="relative pt-40 pb-24 px-6 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto text-center space-y-8 relative z-10">
          <p className="text-[#b39359] text-xs tracking-[0.6em] font-bold uppercase font-sans">Structural Balance Philosophy</p>
          <h1 className="text-5xl md:text-7xl font-serif font-light leading-[1.1] tracking-tighter">
            무너진 균형을 <br />
            <span className="text-[#b39359] italic font-normal">다시 세우는 본질적 처방</span>
          </h1>
          <p className="text-gray-500 text-base md:text-xl leading-relaxed break-keep font-sans max-w-3xl mx-auto font-light">
            통증은 몸이 보내는 마지막 신호입니다. 미다스는 겉으로 드러난 증상을 넘어, <br className="hidden md:block" />
            통증을 유발하는 골격의 왜곡과 근육의 불균형을 추적으로 찾아내어 교정합니다.
          </p>
          <div className="flex justify-center gap-3 pt-4">
            {["추나요법", "전신정렬", "골반교정", "라운드숄더"].map((tag) => (
              <span key={tag} className="px-5 py-2 bg-[#fcfaf7] border border-[#b39359]/10 rounded-full text-[11px] font-bold text-[#b39359]">#{tag}</span>
            ))}
          </div>
        </div>
        {/* Decorative background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#fcfaf7] rounded-full -z-0 blur-3xl opacity-50"></div>
      </section>

      <main className="max-w-6xl mx-auto px-6 py-24 space-y-32">
        
        {/* --- SECTION 1: 불균형의 원인 (전문적 분석 레이아웃) --- */}
        <section className="space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 pb-10">
            <div className="space-y-4">
              <h2 className="text-4xl font-serif font-light">체형 불균형의 원인</h2>
              <p className="text-gray-400 font-sans text-sm tracking-widest uppercase">Etiology of Postural Distortion</p>
            </div>
            <p className="text-gray-500 text-[13px] leading-relaxed max-w-sm font-sans italic">
              "잘못된 습관이 뼈의 위치를 바꾸고, 바뀐 위치가 만성 통증을 만듭니다."
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { t: "자세적 요인", d: "스마트폰, PC 사용 시의 거북목 및 구정한 자세" },
              { t: "생활 습관", d: "다리 꼬기, 한쪽으로만 가방 메기 등 편측성 습관" },
              { t: "근육 약화", d: "코어 근육 부재로 인한 척추 지지력의 상실" },
              { t: "보상 작용", d: "한 부위의 변형이 전신 정렬을 무너뜨리는 연쇄 반응" }
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between h-[280px] hover:bg-[#2d2d2d] hover:text-white transition-all duration-500 group">
                <span className="text-[#b39359] font-serif italic text-3xl">0{i + 1}</span>
                <div>
                  <h4 className="font-bold text-lg mb-3 group-hover:text-[#b39359]">{item.t}</h4>
                  <p className="text-[13px] text-gray-400 leading-relaxed font-sans">{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 2: 자가진단 리스트 (인포그래픽 스타일) --- */}
        <section className="bg-white rounded-[3rem] p-10 md:p-20 border border-gray-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5 space-y-8">
              <h3 className="text-3xl font-bold italic tracking-tighter">Body Self-Check</h3>
              <p className="text-gray-500 leading-relaxed break-keep font-sans">
                아래 항목 중 3가지 이상 해당된다면, 이미 전신 불균형이 상당 부분 진행된 상태일 수 있습니다.
              </p>
              <div className="p-8 bg-[#fcfaf7] rounded-3xl border border-[#b39359]/20">
                <p className="text-[#b39359] text-[12px] font-bold uppercase tracking-widest mb-2">Notice</p>
                <p className="text-xs text-gray-400 font-sans leading-relaxed">
                  초기 불균형은 통증이 없을 수 있으나, 시간이 지남에 따라 척추 질환으로 발전합니다.
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "양 어깨 높이가 차이 난다",
                "바지가 한쪽으로 돌아간다",
                "신발 한쪽 밑창만 닳는다",
                "고개가 한쪽으로 기운다",
                "양 팔 사이 공간이 다르다",
                "팔자걸음 혹은 안짱걸음",
                "좌우 골반 높이가 다르다",
                "만성적인 어깨 결림이 있다"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-4 border border-gray-50 bg-[#fcfaf7]/50 rounded-2xl">
                  <span className="w-1.5 h-1.5 bg-[#b39359] rounded-full" />
                  <span className="text-[13px] font-medium text-gray-600 font-sans">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION 3: 치료 솔루션 (내용 중심의 다크 카드) --- */}
        <section className="space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-serif font-light">Midas Reformation Solution</h2>
            <p className="text-[#b39359] text-xs tracking-[0.5em] font-bold uppercase font-sans">치료 핵심 원리</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-[#2d2d2d] p-12 rounded-[3rem] text-white space-y-8">
              <div className="w-12 h-12 border border-[#b39359] rounded-full flex items-center justify-center text-[#b39359] font-serif italic text-xl">1</div>
              <h4 className="text-2xl font-bold italic">추나요법 <br /><span className="text-[#b39359] not-italic text-sm uppercase tracking-widest font-sans font-bold">Chuna Manual Therapy</span></h4>
              <p className="text-gray-400 text-sm leading-loose font-sans break-keep">
                한의사가 수기나 보조 기구를 사용하여 틀어진 뼈와 관절을 직접 밀고 당겨 정렬을 바로잡습니다. 비틀린 척추와 골반을 정위치로 환원시켜 신경 압박을 해소합니다.
              </p>
            </div>
            <div className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
              <div className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center text-gray-400 font-serif italic text-xl">2</div>
              <h4 className="text-2xl font-bold italic">침구 및 약침 <br /><span className="text-[#b39359] not-italic text-sm uppercase tracking-widest font-sans font-bold">Acupuncture</span></h4>
              <p className="text-gray-500 text-sm leading-loose font-sans break-keep">
                단순히 통증 부위만 침을 놓는 것이 아니라, 근육의 긴장도가 높은 부위와 약해진 길항근을 찾아 자극함으로써 근육의 좌우 밸런스를 정상화합니다.
              </p>
            </div>
            <div className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
              <div className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center text-gray-400 font-serif italic text-xl">3</div>
              <h4 className="text-2xl font-bold italic">근막 이완 처방 <br /><span className="text-[#b39359] not-italic text-sm uppercase tracking-widest font-sans font-bold">Fascia Release</span></h4>
              <p className="text-gray-500 text-sm leading-loose font-sans break-keep">
                오랜 시간 굳어진 근육 주위의 근막을 부드럽게 이완시켜 시술 후 다시 원래의 나쁜 자세로 돌아가려는 신체의 저항을 최소화하고 교정 효과를 유지시킵니다.
              </p>
            </div>
          </div>
        </section>

        {/* --- SECTION 4: 교정 효과 (핵심 정보 요약) --- */}
        <section className="pt-24 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <h2 className="text-4xl font-serif font-light leading-snug">교정으로 달라지는 <br /><span className="text-[#b39359] italic font-normal">신체의 세 가지 변화</span></h2>
            <div className="grid grid-cols-1 gap-4">
              {[
                { t: "Pain Control", d: "신경 눌림 해소로 인한 만성 통증의 근본적 제어" },
                { t: "Body Silhouette", d: "거북목, 굽은 등 개선으로 당당하고 곧은 체형 완성" },
                { t: "Metabolism Up", d: "장기 압박 해소 및 혈액 순환 개선을 통한 대사 활성화" }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center p-6 bg-white rounded-2xl border border-gray-50 shadow-sm">
                  <div className="space-y-1">
                    <p className="text-[#b39359] text-[10px] font-bold uppercase tracking-widest">{item.t}</p>
                    <p className="text-[15px] font-bold">{item.d}</p>
                  </div>
                  <span className="text-gray-200 font-serif italic text-2xl">0{i+1}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* --- FOOTER: 순수 메시지형 마무리 --- */}
      <footer className="bg-white py-32 border-t border-gray-100 text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <h2 className="text-2xl md:text-4xl font-serif font-light leading-relaxed">
            무너진 중심을 바로잡는 것, <br />
            <span className="text-[#b39359] italic text-3xl md:text-5xl">아름다움과 건강의 시작</span>입니다
          </h2>
          <div className="flex justify-center items-center gap-8">
            <Link href="https://m.booking.naver.com/booking/13/bizes/670877" target="_blank" className="bg-[#b39359] text-white px-10 py-4 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#2d2d2d] transition-all shadow-lg shadow-[#b39359]/20">Booking</Link>
            <Link href="/" className="bg-gray-50 text-gray-400 px-10 py-4 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-gray-100 transition-all font-sans">Home</Link>
          </div>
          <p className="text-[10px] text-gray-200 tracking-[0.5em] font-bold pt-12 uppercase italic font-sans">Scientific Body Reformation Program</p>
        </div>
      </footer>
    </div>
  );
}
"use client";

import Link from "next/link";

export default function TurtleNeckPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#2d2d2d] overflow-x-hidden">
      
      {/* --- HERO: 핵심 가시화 --- */}
      <section className="pt-32 pb-20 px-6 border-b border-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="space-y-6">
              <p className="text-[#b39359] text-xs tracking-[0.4em] font-bold uppercase">C-Curve Restoration</p>
              <h1 className="text-4xl md:text-6xl font-serif font-light leading-tight tracking-tighter">
                머리 무게를 견디는 <br />
                <span className="text-[#b39359] italic font-normal">경추의 바른 정렬</span>
              </h1>
            </div>
            <p className="text-gray-400 text-sm leading-loose max-w-sm font-light break-keep">
              고개가 1cm 앞으로 나올 때마다 목 뼈에는 2~3kg의 하중이 추가됩니다. 
              미다스는 비정상적인 일자 형태를 본래의 C자 커브로 회복시킵니다.
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-6 py-24 space-y-32">
        
        {/* --- SECTION 1: 거북목의 원인 (심플 그리드) --- */}
        <section className="space-y-12">
          <h2 className="text-2xl font-serif italic border-l-4 border-[#b39359] pl-6">Why It Happens</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100 border border-gray-100 rounded-3xl overflow-hidden">
            {[
              { t: "디지털 기기", d: "장시간 스마트폰 및 태블릿 사용 시 고개를 숙이는 습관" },
              { t: "VDT 증후군", d: "모니터 높이가 낮아 고개가 앞으로 빠지는 사무 환경" },
              { t: "높은 베개", d: "수면 중 목의 긴장을 유발하는 부적절한 침구 사용" },
              { t: "라운드 숄더", d: "굽은 등과 어깨로 인해 보상작용으로 고개가 돌출됨" }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 space-y-4 transition-colors hover:bg-[#fcfaf7]">
                <h4 className="font-bold text-[#b39359] text-sm">0{i + 1}</h4>
                <h5 className="font-bold">{item.t}</h5>
                <p className="text-[13px] text-gray-500 leading-relaxed break-keep">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 2: 치료 프로세스 (구조적 리스트) --- */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-8">
            <h2 className="text-2xl font-serif italic border-l-4 border-[#b39359] pl-6">Treatment System</h2>
            <p className="text-gray-500 text-[15px] leading-loose break-keep font-light">
              단순한 마사지가 아닌, 뼈의 구조와 근육의 긴장도를 동시에 다스리는 복합 교정 치료를 진행합니다.
            </p>
            <div className="space-y-4">
              {[
                { t: "경추 추나요법", d: "틀어진 목뼈 마디마디를 바로잡아 C자 커브를 복원합니다." },
                { t: "근막 이완침", d: "단축된 목 앞쪽 근육과 늘어난 뒷 근육의 밸런스를 맞춥니다." },
                { t: "공진 약침", d: "만성 통증과 염증을 빠르게 가라앉히고 조직을 강화합니다." },
                { t: "자세 교육", d: "일상에서의 목 정렬 유지법과 맞춤 스트레칭을 처방합니다." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 p-6 bg-[#fcfaf7] rounded-2xl border border-gray-50 group hover:bg-white hover:shadow-md transition-all">
                  <span className="text-[#b39359] font-bold text-sm">STEP.0{i+1}</span>
                  <div>
                    <h5 className="font-bold text-sm mb-1">{item.t}</h5>
                    <p className="text-xs text-gray-500 font-sans leading-relaxed">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 자가진단 (심플 박스) */}
          <div className="bg-[#2d2d2d] rounded-[3rem] p-12 text-white h-fit self-center">
            <h3 className="text-[#b39359] font-serif italic text-2xl mb-8">Self Diagnosis</h3>
            <ul className="space-y-5">
              {[
                "옆모습을 봤을 때 어깨보다 귀가 앞에 있다",
                "목 뒤가 불룩하게 솟은 느낌이 든다",
                "만성적인 목 어깨 결림과 두통이 잦다",
                "잠을 자도 개운하지 않고 목이 뻣뻣하다",
                "등이 굽어 보인다는 소리를 자주 듣는다"
              ].map((text, i) => (
                <li key={i} className="flex gap-4 items-start text-[13px] text-gray-400 font-sans leading-relaxed">
                  <span className="mt-1.5 w-1 h-1 bg-[#b39359] rounded-full shrink-0" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
            <div className="mt-12 pt-8 border-t border-white/10 text-center">
              <p className="text-[11px] text-[#b39359] tracking-widest uppercase font-bold">Midas Medical Group</p>
            </div>
          </div>
        </section>

        {/* --- SECTION 3: 치료 효과 (수평 배치) --- */}
        <section className="py-20 bg-[#fcfaf7] rounded-[3rem] px-10 text-center space-y-12">
          <h2 className="text-2xl font-serif italic">The Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="space-y-3">
              <p className="text-3xl font-serif text-[#b39359]">01</p>
              <h5 className="font-bold">통증의 근본 해결</h5>
              <p className="text-xs text-gray-500 leading-relaxed font-sans">신경 압박을 해소하여 만성적인 <br />목, 어깨 통증 및 두통 개선</p>
            </div>
            <div className="space-y-3">
              <p className="text-3xl font-serif text-[#b39359]">02</p>
              <h5 className="font-bold">체형의 시각적 변화</h5>
              <p className="text-xs text-gray-500 leading-relaxed font-sans">굽은 등과 어깨가 펴지며 <br />당당하고 슬림한 목선 회복</p>
            </div>
            <div className="space-y-3">
              <p className="text-3xl font-serif text-[#b39359]">03</p>
              <h5 className="font-bold">집중력 및 컨디션</h5>
              <p className="text-xs text-gray-500 leading-relaxed font-sans">뇌로 가는 혈류를 개선하여 <br />만성 피로 및 집중력 저하 해결</p>
            </div>
          </div>
        </section>

      </main>

      {/* --- FOOTER: 간결한 마무리 --- */}
      <footer className="py-24 text-center border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <h2 className="text-2xl md:text-3xl font-serif font-light leading-relaxed">
            무거운 일상을 내려놓는 <br />
            <span className="text-[#b39359] italic text-4xl">가장 가벼운 시작</span>
          </h2>
          <div className="flex justify-center gap-6">
            <Link href="https://m.booking.naver.com/booking/13/bizes/670877" target="_blank" className="bg-[#b39359] text-white px-10 py-4 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#2d2d2d] transition-all">Consultation</Link>
            <Link href="/" className="bg-gray-50 text-gray-400 px-10 py-4 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-gray-100 transition-all font-sans">Home</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
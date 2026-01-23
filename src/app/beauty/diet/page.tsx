"use client";

import Link from "next/link";

export default function DietPage() {
  const principles = [
    {
      title: "안전한 처방",
      highlight: "깨끗하게 덜어내다",
      desc: "식약처 인증 정품 약재만을 사용하여 체내 독소와 노폐물을 정화합니다. 인위적인 성분이 아닌 자연의 힘으로 몸 안을 깨끗하게 비워내는 것이 미다스 다이어트의 시작입니다.",
      tags: ["정품 약재", "독소 배출", "체질 맞춤"]
    },
    {
      title: "건강한 변화",
      highlight: "가벼워지는 몸과 마음",
      desc: "단순히 숫자를 줄이는 고통스러운 과정이 아닙니다. 부종을 다스리고 기혈 순환을 원활하게 하여, 몸과 마음이 동시에 가벼워지는 활기찬 일상을 선사합니다.",
      tags: ["부종 개선", "활력 증진", "컨디션 케어"]
    },
    {
      title: "완벽한 유지",
      highlight: "실패 없는, 요요 없는",
      desc: "감량보다 중요한 것은 유지입니다. 단계별 안정화 처방으로 기초 대사량을 보존하고 체중 조절 점(Set-point)을 낮추어 요요 현상 걱정 없는 결과를 완성합니다.",
      tags: ["대사 보존", "요요 방지", "안정화 처방"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-[#2d2d2d]">
      
      {/* --- 상단 히어로: 꽉 찬 박스 레이아웃 --- */}
      <section className="bg-white border-b border-gray-200 pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#fcfaf7] rounded-[2rem] p-10 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-3/5 space-y-6">
              <span className="inline-block bg-[#b39359] text-white text-[10px] font-bold px-4 py-1 rounded-full tracking-widest uppercase">
                Premium Diet Program
              </span>
              <h1 className="text-4xl md:text-6xl font-serif font-light leading-tight">
                몸과 마음이 가벼워지는 <br />
                <span className="text-[#b39359] italic font-normal">건강한 다이어트</span>
              </h1>
              <p className="text-gray-500 text-base leading-relaxed break-keep">
                미다스 한의원은 무리한 절식이 아닌 체질의 개선을 제안합니다. <br />
                안전한 한약재를 통해 몸 안을 정화하고 실패 없는 변화를 약속합니다.
              </p>
            </div>
            <div className="md:w-2/5 w-full bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-sm font-bold">실패 없는 감량</span>
                  <span className="text-[#b39359] font-serif italic text-lg">Focus 01</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-sm font-bold">요요 없는 유지</span>
                  <span className="text-[#b39359] font-serif italic text-lg">Focus 02</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-bold">안전한 성분</span>
                  <span className="text-[#b39359] font-serif italic text-lg">Focus 03</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-6 py-24 space-y-24">
        
        {/* --- 섹션 1: 3단 카드 그리드 (밀도 높임) --- */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {principles.map((item, i) => (
            <div key={i} className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col justify-between h-full">
              <div className="space-y-6">
                <div className="w-12 h-12 bg-[#fcfaf7] rounded-2xl flex items-center justify-center text-[#b39359] font-serif italic text-xl">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-[#b39359] text-sm font-bold mb-2 font-serif uppercase tracking-widest">{item.title}</h3>
                  <h4 className="text-2xl font-bold tracking-tight break-keep">{item.highlight}</h4>
                </div>
                <p className="text-gray-500 text-sm leading-loose break-keep">
                  {item.desc}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-8">
                {item.tags.map((tag, j) => (
                  <span key={j} className="text-[10px] bg-gray-50 text-gray-400 px-3 py-1 rounded-md">#{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* --- 섹션 2: 체크리스트 & 맞춤 처방 (2열 배치) --- */}
        <section className="bg-white rounded-[2.5rem] p-8 md:p-16 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-10">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Check-list</h3>
                <p className="text-gray-400 text-sm">이런 고민을 하고 계신가요?</p>
              </div>
              <ul className="space-y-4">
                {[
                  "식욕 조절이 힘들어 매번 다이어트에 실패하시는 분",
                  "안전한 한약재를 통해 건강하게 덜어내고 싶으신 분",
                  "감량 후 나타나는 요요 현상이 두려우신 분",
                  "출산 혹은 갱년기 후 늘어난 체중이 고민이신 분",
                  "체력 저하 없이 가볍고 활기찬 몸을 원하시는 분"
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-4 bg-[#fcfaf7] p-4 rounded-xl border border-gray-50">
                    <span className="w-2 h-2 bg-[#b39359] rounded-full" />
                    <span className="text-[13px] font-medium text-gray-700">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-[#2d2d2d] rounded-3xl p-10 text-white flex flex-col justify-between">
              <div className="space-y-6">
                <h3 className="text-2xl font-serif italic text-[#b39359]">Midas Prescription</h3>
                <p className="text-gray-400 text-sm leading-loose break-keep">
                  미다스의 맞춤 처방은 단순히 체중 수치를 줄이는 것에 그치지 않습니다. 
                  우리는 인체의 순환을 방해하는 근본적인 원인을 찾아내어, 
                  당신의 몸이 스스로 가벼움을 유지할 수 있도록 설계합니다.
                </p>
              </div>
              <div className="mt-12 grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <p className="text-[#b39359] font-bold text-xs mb-1 uppercase">Safety</p>
                  <p className="text-[11px] text-gray-300">정품 한약재 인증</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <p className="text-[#b39359] font-bold text-xs mb-1 uppercase">Care</p>
                  <p className="text-[11px] text-gray-300">1:1 사후 관리</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* --- 푸터: 깔끔한 마무리 --- */}
      <footer className="bg-white py-20 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-2xl md:text-3xl font-serif font-light">
            깨끗하게 비워낸 자리에 <br />
            <span className="text-[#b39359] italic">가장 가벼운 나</span>를 채우다
          </h2>
          <div className="flex justify-center gap-6">
            <Link href="https://m.booking.naver.com/booking/13/bizes/670877" target="_blank" className="bg-[#b39359] text-white px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#a38349] transition-colors">Booking</Link>
            <Link href="/" className="bg-gray-100 text-gray-500 px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors">Home</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
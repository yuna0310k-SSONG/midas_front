"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// --- 아이콘 컴포넌트 ---
const MethodIcon = ({ type }: { type: string }) => {
  const baseClass = "w-14 h-14 mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3";
  switch (type) {
    case "chuna": return (
      <svg className={baseClass} viewBox="0 0 24 24" fill="none" stroke="#b39359" strokeWidth="1.2">
        <path d="M8 3v18M16 3v18M4 11h16M4 15h16" strokeLinecap="round"/><rect x="3" y="7" width="18" height="10" rx="2" strokeOpacity="0.3"/>
      </svg>
    );
    case "needle": return (
      <svg className={baseClass} viewBox="0 0 24 24" fill="none" stroke="#b39359" strokeWidth="1.2">
        <path d="M19 5L5 19" strokeLinecap="round"/><circle cx="19" cy="5" r="1.5" fill="#b39359"/>
        <path d="M12 12c2-2 4-2 6 0M6 18c2-2 4-2 6 0" strokeOpacity="0.5" strokeDasharray="2 2"/>
      </svg>
    );
    case "maeseon": return (
      <svg className={baseClass} viewBox="0 0 24 24" fill="none" stroke="#b39359" strokeWidth="1.2">
        <path d="M4 19c4-2 8-12 16-12" strokeLinecap="round"/><path d="M4 15c3-1 6-7 12-9" strokeOpacity="0.4"/>
        <path d="M6 21c5-3 10-14 14-14" strokeOpacity="0.2"/>
      </svg>
    );
    case "balance": return (
      <svg className={baseClass} viewBox="0 0 24 24" fill="none" stroke="#b39359" strokeWidth="1.2">
        <path d="M3 12h18M12 3v18M7 8l-4 4 4 4M17 8l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" strokeOpacity="0.3"/>
      </svg>
    );
    default: return null;
  }
};

export default function FaceAsymmetryPage() {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const checklist = [
    "양쪽 눈썹 높이가 다르다", "양쪽 광대뼈 위치가 다르다", "양쪽 귀 높이가 다르다",
    "눈꼬리 높이가 다르다", "입꼬리 높이가 다르다", "좌우 눈 크기가 다르다",
    "코가 휘었거나 콧구멍 크기가 다르다", "한쪽 볼/광대가 더 도드라진다",
    "팔자주름이 한쪽이 더 깊다", "목이 한쪽으로 기울어져 있다",
    "어깨 높이가 좌우 다르다", "턱관절 주변 통증이 있다",
    "턱관절 잡음이 있다", "입이 크게 벌어지지 않는다",
    "한쪽으로만 씹는 습관이 있다", "한쪽 턱이 더 돌출되어 있다",
    "턱이 돌아가 있는 느낌이다", "이갈이/이악물기가 심하다",
    "치아 중심선이 맞지 않는다", "미간과 턱 중심이 어긋난다"
  ];

  const handleCheck = (index: number) => {
    setCheckedItems(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
  };

  const getResult = () => {
    const count = checkedItems.length;
    if (count <= 2) return "초기 비대칭 단계 (교정 권장)";
    if (count <= 6) return "중등도 비대칭 (치료 대상자)";
    return "심화 단계 (필수 치료 대상자)";
  };

  return (
    <div className="min-h-screen bg-[#fcfaf7] font-serif text-[#2d2d2d] overflow-x-hidden">
      
      {/* --- 히어로 섹션 --- */}
      <section className="relative py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-[#b39359] text-xs tracking-[0.4em] font-bold uppercase block mb-6 italic">Midas Aesthetics</span>
          <h1 className="text-4xl md:text-6xl font-light mb-8 leading-[1.2]">
            수술 없이 되찾는 <br />
            <span className="italic text-[#b39359]">완벽한 대칭</span>의 미학
          </h1>
          <p className="max-w-2xl mx-auto text-gray-400 text-sm md:text-base leading-relaxed break-keep">
            단순히 겉모습만 바꾸지 않습니다. 근본적인 골격의 뒤틀림부터 무너진 밸런스까지, 
            미다스의 정교한 솔루션으로 당신만의 아름다운 선을 찾아드립니다.
          </p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-6 space-y-40 pb-40">
        
        {/* --- 자가진단 섹션 (미니멀 라인 스타일) --- */}
        <section id="diagnostic" className="scroll-mt-20">
          <div className={`transition-all duration-700 ease-in-out border-b border-t ${
            isExpanded ? 'bg-white border-[#b39359]/30 shadow-sm' : 'bg-transparent border-gray-100 hover:border-[#b39359]/30'
          }`}>
            
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full py-10 px-4 flex items-center justify-between group"
            >
              <div className="text-left">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-[1px] bg-[#b39359]/40" />
                  <span className="text-[10px] font-bold tracking-[0.4em] text-[#b39359] uppercase font-sans">Self Analysis</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-light tracking-tight text-[#2d2d2d]">
                  안면비대칭 <span className="font-serif italic text-[#b39359] ml-1">체크리스트</span>
                </h2>
              </div>

              <div className="flex items-center gap-6">
                <div className="hidden sm:block text-right">
                  <p className="text-[10px] font-bold tracking-widest text-gray-300 group-hover:text-[#b39359] transition-colors">
                    {isExpanded ? 'CLOSE' : 'EXPAND'}
                  </p>
                </div>
                <div className="relative w-6 h-6 flex items-center justify-center">
                  <div className="absolute w-full h-[1px] bg-[#2d2d2d]" />
                  <div className={`absolute w-[1px] h-full bg-[#2d2d2d] transition-transform duration-500 ${isExpanded ? 'rotate-90 opacity-0' : ''}`} />
                </div>
              </div>
            </button>

            {isExpanded && (
              <div className="px-4 pb-16 animate-in fade-in slide-in-from-top-2 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mt-8 mb-16">
                  {checklist.map((item, idx) => (
                    <div 
                      key={idx}
                      onClick={() => handleCheck(idx)}
                      className="flex items-center justify-between py-4 border-b border-gray-50 cursor-pointer group/item"
                    >
                      <span className={`text-[14px] transition-colors ${checkedItems.includes(idx) ? 'text-[#b39359] font-medium' : 'text-gray-500 group-hover/item:text-[#2d2d2d]'}`}>
                        {item}
                      </span>
                      <div className={`w-4 h-4 rounded-full border transition-all ${
                        checkedItems.includes(idx) ? 'bg-[#b39359] border-[#b39359]' : 'border-gray-200'
                      }`} />
                    </div>
                  ))}
                </div>

                <div className="max-w-3xl mx-auto text-center font-sans">
                  {showResult ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 pt-16 pb-10 px-6 border-t-2 border-[#b39359]">
                      <div className="flex justify-between items-end mb-12 text-left">
                        <div>
                          <span className="text-[10px] font-bold tracking-[0.3em] text-[#b39359] block mb-2 uppercase">Analysis Report</span>
                          <h4 className="text-3xl md:text-4xl font-light tracking-tighter text-[#2d2d2d] font-serif">
                            현재 당신의 <span className="italic">균형 지수</span>
                          </h4>
                        </div>
                        <div className="text-right">
                          <div className="text-5xl font-serif italic text-[#b39359] leading-none">{checkedItems.length}<span className="text-sm text-gray-300 not-italic ml-1 font-sans">/20</span></div>
                        </div>
                      </div>

                      <div className="mb-12 relative py-12 border-y border-gray-50 flex flex-col items-center">
                        <h5 className="text-2xl font-medium text-[#2d2d2d] mb-4 tracking-tight">
                          {getResult()}
                        </h5>
                        <p className="text-sm text-gray-400 leading-loose max-w-sm text-center break-keep">
                          측정된 데이터에 따르면 골격의 틀어짐이 관찰됩니다. 외형적 변화뿐만 아니라 기능적 비대칭을 함께 교정해야 하는 단계입니다.
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
                        <Link 
                          href="https://m.booking.naver.com/booking/13/bizes/670877" 
                          className="group flex items-center gap-4 text-[13px] font-bold tracking-[0.2em] text-[#2d2d2d] hover:text-[#b39359] transition-all"
                        >
                          <span>심층 상담 및 진단 예약</span>
                          <div className="w-8 h-[1px] bg-[#2d2d2d] group-hover:bg-[#b39359] group-hover:w-12 transition-all" />
                        </Link>
                        <button 
                          onClick={() => {setShowResult(false); setCheckedItems([]);}}
                          className="text-[11px] text-gray-300 hover:text-gray-600 underline underline-offset-4 tracking-widest transition-colors"
                        >
                          RESET TEST
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setShowResult(true)}
                      className="group w-full flex flex-col items-center gap-6 py-10"
                    >
                      <div className="flex items-center gap-8">
                        <div className="h-[1px] w-12 bg-gray-100 group-hover:w-20 group-hover:bg-[#b39359] transition-all duration-700" />
                        <span className="text-[13px] font-bold tracking-[0.4em] text-gray-400 group-hover:text-[#2d2d2d] transition-colors uppercase">
                          Result Analysis <span className="font-serif italic ml-1">({checkedItems.length})</span>
                        </span>
                        <div className="h-[1px] w-12 bg-gray-100 group-hover:w-20 group-hover:bg-[#b39359] transition-all duration-700" />
                      </div>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* --- 치료 원리 --- */}
        <section className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="w-full lg:w-1/2 relative h-[500px] rounded-[48px] overflow-hidden shadow-2xl">
            <Image src="/face-asymmetry.jpg" alt="안면분석" fill className="object-cover" />
          </div>
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="inline-block px-4 py-1.5 bg-[#b39359]/10 text-[#b39359] text-[11px] font-bold rounded-full tracking-widest">01. PRINCIPLE</div>
            <h2 className="text-4xl font-light">입체적인 <span className="text-[#b39359] font-medium italic underline underline-offset-8 decoration-1">4D 통합 교정</span></h2>
            <p className="text-gray-500 leading-loose break-keep text-[15px]">얼굴 뼈 정렬부터 근육 밸런스, 처진 연부조직까지 통합적으로 분석하여 수술 없이 자연스러운 대칭을 완성합니다.</p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              {["골격 구조", "근육 밸런스", "조직 리프팅", "유지 관리"].map((item, i) => (
                <div key={i} className="border-l border-[#b39359]/40 pl-5">
                  <h4 className="font-bold text-sm mb-1">{item}</h4>
                  <p className="text-[12px] text-gray-400 font-sans">단계별 맞춤형 케어</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 치료 방법 --- */}
        <section className="bg-white rounded-[60px] p-16 md:p-24 shadow-sm border border-gray-100 text-center">
          <div className="mb-20">
            <div className="inline-block px-4 py-1.5 bg-[#b39359]/10 text-[#b39359] text-[11px] font-bold rounded-full tracking-widest mb-6 uppercase">02. Method</div>
            <h2 className="text-4xl font-light">미다스만의 독보적 기술력</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[{id: "chuna", title: "골격 추나"}, {id: "needle", title: "특수침 치료"}, {id: "maeseon", title: "매선 요법"}, {id: "balance", title: "맞춤 교정기"}].map((method, idx) => (
              <div key={idx} className="group cursor-default">
                <div className="flex justify-center"><MethodIcon type={method.id} /></div>
                <h3 className="font-bold text-[#2d2d2d] mb-3 group-hover:text-[#b39359] transition-all">{method.title}</h3>
                <p className="text-[12px] text-gray-400 break-keep leading-relaxed font-sans px-4">근본적인 원인을 해결하는 프리미엄 한방 교정 솔루션</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* --- CTA --- */}
      <footer className="bg-[#2d2d2d] py-24 text-center">
        <h2 className="text-white text-3xl font-light mb-12 tracking-widest italic">"수술 없이, 다시 태어나는 균형의 아름다움"</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-6 px-6">
          <Link href="https://m.booking.naver.com/booking/13/bizes/670877" target="_blank" className="px-16 py-6 bg-[#b39359] text-white font-bold rounded-full hover:shadow-[0_0_30px_rgba(179,147,89,0.3)] transition-all text-[13px] tracking-widest uppercase shadow-xl font-sans">Online Booking</Link>
          <Link href="/" className="px-16 py-6 bg-transparent border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-all text-[13px] tracking-widest uppercase font-sans">Main Home</Link>
        </div>
      </footer>
    </div>
  );
}
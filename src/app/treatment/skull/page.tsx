"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function SkullPage() {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const checklist = [
    "정면에서 보았을 때 이마 한쪽이 더 튀어나와 있다",
    "뒤통수 한쪽이 유난히 납작하다",
    "양쪽 귀의 위치가 앞뒤로 다르다",
    "안경을 쓰면 한쪽이 자꾸 내려가거나 틀어진다",
    "머리 모양 때문에 가르마가 한쪽으로만 타진다",
    "모자를 쓰면 한쪽으로 돌아간다",
    "뒤통수 절벽(납작 머리)이 심하다",
    "정수리 부분이 솟아 있거나 비대칭이다",
    "턱관절 통증이나 소리가 두상 변형과 함께 있다",
    "거북목이나 어깨 비대칭이 심하다"
  ];

  const handleCheck = (index: number) => {
    setCheckedItems(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
  };

  const getResult = () => {
    const count = checkedItems.length;
    if (count <= 2) return "미세 변형 단계 (관리 권장)";
    if (count <= 5) return "중등도 두상 비대칭 (교정 대상)";
    return "심화 두상 변형 (정밀 진단 필수)";
  };

  return (
    <div className="min-h-screen bg-[#fcfaf7] font-serif text-[#2d2d2d] overflow-x-hidden">
      
      {/* --- 히어로 섹션 --- */}
      <section className="relative py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-[#b39359] text-xs tracking-[0.4em] font-bold uppercase block mb-6 italic font-sans">Premium Skull Clinic</span>
          <h1 className="text-4xl md:text-6xl font-light mb-8 leading-[1.2]">
            매끈한 두상이 만드는 <br />
            <span className="italic text-[#b39359]">아름다운 안면 윤곽</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-400 text-sm md:text-base leading-relaxed break-keep font-sans">
            두상은 얼굴형의 기초 공사와 같습니다. 틀어진 두개골 정렬을 바로잡아 <br className="hidden md:block"/>
            작고 입체적인 얼굴, 완벽한 대칭을 완성합니다.
          </p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-6 space-y-40 pb-40">

        {/* --- [수정] 자가진단 섹션 (미니멀 라인 스타일) --- */}
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
                  <span className="text-[10px] font-bold tracking-[0.4em] text-[#b39359] uppercase font-sans">Skull Analysis</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-light tracking-tight text-[#2d2d2d]">
                  두상 비대칭 <span className="font-serif italic text-[#b39359] ml-1">자가진단</span>
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
                      <span className={`text-[14px] transition-colors font-sans ${checkedItems.includes(idx) ? 'text-[#b39359] font-medium' : 'text-gray-500 group-hover/item:text-[#2d2d2d]'}`}>
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
                            두상 <span className="italic">불균형 지수</span>
                          </h4>
                        </div>
                        <div className="text-right">
                          <div className="text-5xl font-serif italic text-[#b39359] leading-none">{checkedItems.length}<span className="text-sm text-gray-300 not-italic ml-1 font-sans">/10</span></div>
                        </div>
                      </div>

                      <div className="mb-12 relative py-12 border-y border-gray-50 flex flex-col items-center">
                        <h5 className="text-2xl font-medium text-[#2d2d2d] mb-4 tracking-tight">
                          {getResult()}
                        </h5>
                        <p className="text-sm text-gray-400 leading-loose max-w-sm text-center break-keep">
                          두상의 변형은 안면비대칭과 경추 불균형의 직접적인 원인이 됩니다. 손끝의 감각으로 정렬을 맞추는 정골 추나 요법이 필요합니다.
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
                          className="text-[11px] text-gray-300 hover:text-gray-600 underline underline-offset-4 tracking-widest transition-colors font-sans"
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
                        <span className="text-[13px] font-bold tracking-[0.4em] text-gray-400 group-hover:text-[#2d2d2d] transition-colors uppercase font-sans">
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

        {/* --- 3. 불균형 원인 섹션 --- */}
        <section className="space-y-20">
          <div className="text-center">
            <span className="text-[#b39359] text-[11px] font-bold tracking-widest uppercase mb-4 block font-sans">Cause Analysis</span>
            <h2 className="text-4xl font-light">왜 두상이 변형될까요?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {[
              { title: "잘못된 자세와 습관", desc: "한쪽으로만 누워 자거나 턱을 괴는 습관은 두개골의 미세한 틈을 변형시킵니다." },
              { title: "경추 및 골반 불균형", desc: "척추의 불균형은 보상 작용으로 인해 머리 뼈 정렬에 영향을 줍니다." },
              { title: "안면비대칭의 연쇄 작용", desc: "턱관절의 비대칭은 저작근의 불균형을 유도하여 두상 전체를 틀어지게 합니다." },
              { title: "외상 및 선천적 요인", desc: "과거의 충격이나 선천적인 두상 형태가 성인이 되어 고착화된 경우입니다." }
            ].map((item, i) => (
              <div key={i} className="group border-l border-gray-100 pl-8 hover:border-[#b39359]/50 transition-colors">
                <div className="text-[#b39359] text-xl mb-4 font-serif italic opacity-40 group-hover:opacity-100 transition-opacity">0{i+1}</div>
                <h4 className="text-xl font-medium mb-4 tracking-tight">{item.title}</h4>
                <p className="text-gray-400 text-[14px] leading-relaxed break-keep font-sans">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- 4. 치료 방법 섹션 --- */}
        <section className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="w-full lg:w-1/2 relative h-[500px] rounded-[48px] overflow-hidden shadow-2xl">
            <Image src="/skull.jpg" alt="두상 교정" fill className="object-cover" />
          </div>
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="inline-block px-4 py-1.5 bg-[#b39359]/10 text-[#b39359] text-[11px] font-bold rounded-full tracking-widest font-sans uppercase">The Solution</div>
            <h2 className="text-4xl font-light leading-tight">손끝에서 완성되는 <br /><span className="text-[#b39359] italic font-medium underline underline-offset-8 decoration-1">두개골 정골 추나</span></h2>
            <p className="text-gray-500 leading-loose break-keep text-[15px] font-sans">
              두개골은 22개의 뼈가 봉합선으로 연결된 구조입니다. 미다스는 강한 압박이 아닌 정교한 흐름을 유도하는 기법으로 미세한 틀어짐까지 바로잡아 드립니다.
            </p>
            <ul className="space-y-5 pt-8 border-t border-gray-50 font-sans">
              {["두개골 봉합선 미세 교정", "경추 1-2번 상부경추 정렬", "뇌척수액 순환 촉진", "근막 이완을 통한 비대칭 해소"].map((text, i) => (
                <li key={i} className="flex items-center gap-4 text-[14px] text-gray-600">
                  <div className="w-1.5 h-1.5 bg-[#b39359] rounded-full" /> {text}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      {/* --- CTA --- */}
      <footer className="bg-[#2d2d2d] py-24 text-center">
        <h2 className="text-white text-3xl font-light mb-12 tracking-widest italic font-serif">"두상의 완성, 미다스에서 시작됩니다."</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-6 px-6">
          <Link href="https://m.booking.naver.com/booking/13/bizes/670877" target="_blank" className="px-16 py-6 bg-[#b39359] text-white font-bold rounded-full hover:shadow-[0_0_30px_rgba(179,147,89,0.3)] transition-all text-[13px] tracking-widest uppercase font-sans">Online Booking</Link>
          <Link href="/" className="px-16 py-6 bg-transparent border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-all text-[13px] tracking-widest uppercase font-sans">Main Home</Link>
        </div>
      </footer>
    </div>
  );
}
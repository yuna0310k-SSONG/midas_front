"use client";

import Link from "next/link";
import { useState } from "react";

export default function SkinDiseasePage() {
  const [activeTab, setActiveTab] = useState("eczema");

  return (
    <div className="min-h-screen bg-white font-sans text-[#2d2d2d] overflow-x-hidden">
      
      {/* --- 01. HERO SECTION: ACADEMIC AUTHORITY --- */}
      <section className="relative pt-32 pb-20 px-6 bg-[#fcfaf7] overflow-hidden border-b border-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* 사진 섹션 (원장님 사진만 단독 배치) */}
            <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div className="relative z-10 aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] bg-gray-200">
                <img 
                  src="/skin.jpg" 
                  className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                  alt="미다스 한의원 대표원장"
                />
              </div>
              
              {/* 학술적 전문성 배지 */}
              <div className="absolute -top-4 -right-4 z-20 bg-[#2d2d2d] text-white p-8 rounded-2xl shadow-xl space-y-2">
                <p className="text-[#b39359] text-[10px] font-bold tracking-widest uppercase">Academic Excellence</p>
                <p className="text-sm font-light leading-tight">
                  SCI급 논문 저자 <br />
                  한의학박사 / 전문의
                </p>
                <div className="h-[1px] w-8 bg-[#b39359]/50 my-2"></div>
                <p className="text-[10px] opacity-60 tracking-tighter italic">Midas Dermatology Specialist</p>
              </div>
            </div>

            {/* 텍스트 섹션: 학술적 전문성 강조 */}
            <div className="lg:col-span-7 space-y-10 order-1 lg:order-2">
              <div className="space-y-8">
                <div className="space-y-4">
                  <span className="text-[#b39359] text-[11px] font-bold tracking-[0.4em] uppercase">Evidence-Based Medicine</span>
                  <h1 className="text-4xl md:text-6xl font-serif font-light leading-[1.15] tracking-tighter text-balance">
                    SCI급 논문이 증명하는 <br />
                    <span className="text-[#b39359] italic font-normal">피부 면역의 본질</span>
                  </h1>
                </div>

                <div className="space-y-6">
                  <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-serif italic border-l-2 border-[#b39359]/30 pl-6 break-keep">
                    "한방 피부과 전문의이자 한의학박사로서 쌓아온 오랜 치료 경험을 통해 
                    아토피와 건선의 고통을 근본적으로 해결합니다."
                  </p>
                  <p className="text-gray-400 text-sm leading-loose max-w-lg font-light break-keep">
                    국제 학술지가 인정한 학술적 근거와 수만 례의 임상 노하우를 결합하여, 
                    단순한 억제가 아닌 피부 스스로의 자생력을 재건하는 맞춤 치료를 제공합니다.
                  </p>
                </div>
              </div>

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
        </div>
      </section>

      {/* --- 02. DETAILED DISEASE GUIDE (텍스트 중심 레이아웃) --- */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif font-light tracking-tighter italic">Clinical Details</h2>
            <p className="text-gray-400 text-sm font-light uppercase tracking-[0.2em]">피부질환에 대한 심층적 분석과 진단</p>
          </div>

          {/* 탭 메뉴 */}
          <div className="flex justify-center mb-16 space-x-12 border-b border-gray-100">
            {["eczema", "psoriasis", "hives"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-6 text-[12px] font-bold tracking-[0.2em] uppercase transition-all relative ${
                  activeTab === tab ? "text-[#b39359]" : "text-gray-300 hover:text-gray-400"
                }`}
              >
                {tab === "eczema" ? "습진성 질환" : tab === "psoriasis" ? "건선 질환" : "두드러기"}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#b39359] animate-slideIn"></span>
                )}
              </button>
            ))}
          </div>

          <div className="min-h-[500px]">
            {/* 1. 습진성 질환 */}
            {activeTab === "eczema" && (
              <div className="space-y-16 animate-fadeIn">
                <div className="max-w-3xl mx-auto text-center space-y-6 mb-20">
                  <h4 className="text-xl font-bold">습진성 질환의 정의</h4>
                  <p className="text-gray-500 text-[15px] leading-loose font-light break-keep">
                    가려움, 홍반, 수포, 진물 등의 증상을 보이며 조직학적으로 표피의 해면화, 염증세포 침윤 등을 보이는 피부질환을 총칭합니다.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { t: "주요 증상", d: "가려움 발진, 홍반 부종, 소수포, 진물, 인설, 가피, 태선화, 색소침착" },
                    { t: "아토피 피부염", d: "심한 가려움과 피부 건조증이 주된 증상인 만성 염증성 질환" },
                    { t: "지루성 피부염", d: "피지 분비가 많은 부위(머리, 얼굴 등)에 발생하는 만성 염증" },
                    { t: "기타 습진류", d: "주부습진, 한포진, 접촉성 피부염, 화폐상습진 등" },
                  ].map((item, i) => (
                    <div key={i} className="p-10 border border-gray-50 rounded-[2rem] bg-[#fcfaf7]/50 hover:bg-white hover:shadow-xl transition-all duration-500">
                      <h5 className="font-bold text-[#b39359] mb-4 tracking-tighter">{item.t}</h5>
                      <p className="text-[13px] text-gray-500 leading-relaxed font-light break-keep">{item.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. 건선 질환 */}
            {activeTab === "psoriasis" && (
              <div className="space-y-16 animate-fadeIn">
                <div className="max-w-3xl mx-auto text-center space-y-6 mb-20">
                  <h4 className="text-xl font-bold">건선 질환의 특징</h4>
                  <p className="text-gray-500 text-[15px] leading-loose font-light break-keep">
                    경계가 분명한 은백색 인설로 덮여 있는 홍반성 피부 병변이 특징입니다. 주로 팔꿈치, 무릎, 두피 등 자극을 많이 받는 부위에 발생합니다.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { t: "은백색 인설", d: "피부 위에 하얀 각질이 겹겹이 쌓이는 전형적 징후" },
                    { t: "Auspitz 징후", d: "인설 제거 시 나타나는 점상 출혈 현상" },
                    { t: "Koebner 현상", d: "상처나 외상 부위에 새로운 건선이 발생하는 현상" },
                    { t: "건선 관절염", d: "손발가락 마디가 부어오르는 소시지 모양의 변형" },
                    { t: "기타 변형", d: "경계가 뚜렷한 홍반 및 손톱의 색 변화와 변형" },
                  ].map((item, i) => (
                    <div key={i} className="p-10 border border-gray-50 rounded-[2rem] bg-white shadow-sm hover:shadow-lg transition-all duration-500">
                      <div className="w-8 h-[1px] bg-[#b39359] mb-6"></div>
                      <h5 className="font-bold mb-3">{item.t}</h5>
                      <p className="text-[13px] text-gray-400 font-light leading-relaxed">{item.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. 두드러기 */}
            {activeTab === "hives" && (
              <div className="space-y-16 animate-fadeIn">
                <div className="max-w-3xl mx-auto text-center space-y-6 mb-20">
                  <h4 className="text-xl font-bold">두드러기의 기전</h4>
                  <p className="text-gray-500 text-[15px] leading-loose font-light break-keep">
                    혈관 투과성이 증가되어 혈장 성분이 피부 조직으로 빠져나와 생기는 피부 팽창과 발적 현상입니다.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-100 rounded-[2.5rem] overflow-hidden border border-gray-100">
                  {[
                    { t: "혈관부종", d: "눈과 입술 주변이 퉁퉁 부어오르는 증상" },
                    { t: "피부묘기증", d: "외부 물리적 자극이나 압박 시 붉게 부풀어 오름" },
                    { t: "한랭 두드러기", d: "찬 공기나 찬물 등 한랭 노출 시 발생하는 반응" },
                    { t: "콜린성 두드러기", d: "체온 상승이나 스트레스 상황에서 발생하는 작은 발적" },
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-12 hover:bg-[#fcfaf7] transition-all">
                      <h5 className="font-bold text-lg mb-4 tracking-tight">{item.t}</h5>
                      <p className="text-[14px] text-gray-400 leading-relaxed font-light">{item.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- 03. ACADEMIC FOOTER --- */}
      <footer className="bg-[#2d2d2d] py-32 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <span className="text-[#b39359] text-[10px] font-bold tracking-[0.4em] uppercase opacity-60">Professionalism</span>
            <h2 className="text-3xl md:text-5xl font-serif font-light leading-snug text-white italic">
              Experience the Clinical Difference
            </h2>
            <p className="text-gray-400 text-sm font-light">미다스 한의원은 SCI급 논문과 수많은 임상 사례로 실력을 증명합니다.</p>
          </div>
          <div className="flex justify-center gap-6">
            <Link 
              href="https://m.booking.naver.com/booking/13/bizes/670877" 
              className="px-16 py-5 bg-[#b39359] text-white text-[11px] font-bold tracking-[0.2em] uppercase rounded-full hover:shadow-[0_10px_30px_rgba(179,147,89,0.3)] transition-all"
            >
              Consultation
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
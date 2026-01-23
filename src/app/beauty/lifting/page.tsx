"use client";

import Link from "next/link";

export default function LiftingPage() {
  const detailedTreatments = [
    {
      title: "매선 리프팅 (Face Lifting)",
      highlight: "중력을 거스르는 자연스러운 인장력",
      desc: "단순히 당기는 것에 그치지 않습니다. 노화로 인해 느슨해진 근막층(SMAS)을 자극하고 고정하여, 피부 스스로 지지력을 가질 수 있도록 유도합니다. 시간이 지날수록 삽입된 매선 주변으로 콜라겐과 엘라스틴이 형성되어 피부 결까지 개선됩니다.",
      points: ["처진 볼살 및 이중턱 개선", "무너진 턱라인 정돈", "근막층 탄력 복원"]
    },
    {
      title: "채움 매선 (Volume Fill)",
      highlight: "필러 없이 차오르는 자가 조직 재생",
      desc: "꺼진 부위에 특수한 매선을 촘촘하게 자립시켜 내부 공간을 확보하고 조직의 증식을 유도합니다. 인위적인 이물질로 채우는 것이 아니기에 표정이 어색하지 않으며, 자연스러운 볼륨감을 장기간 유지할 수 있습니다.",
      points: ["깊은 팔자주름 채움", "꺼진 볼 및 눈가 교정", "입가 마리오네트 라인 개선"]
    },
    {
      title: "PCL 프리미엄 리프팅",
      highlight: "더 부드럽고, 더 길게 지속되는 3세대 매선",
      desc: "기존 PDO(단기) 소재의 단점을 보완한 PCL(Polycaprolactone) 소재를 사용합니다. 유지 기간이 최대 2년으로 대폭 늘어났으며, 소재가 유연하여 이물감이 거의 없고 강력한 화이트닝 및 탄력 효과를 동시에 제공합니다.",
      points: ["최대 24개월 유지력", "강력한 화이트닝 효과", "이물감 없는 부드러운 인장력"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#fcfaf7] font-serif text-[#2d2d2d] overflow-x-hidden">
      
      {/* --- 히어로 섹션 --- */}
      <section className="relative py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-[#b39359] text-xs tracking-[0.4em] font-bold uppercase block mb-6 italic font-sans">Premium Lifting Solution</span>
          <h1 className="text-4xl md:text-6xl font-light mb-8 leading-[1.2]">
            시간을 되돌리는 <br />
            <span className="italic text-[#b39359]">탄력의 미학</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-400 text-sm md:text-base leading-relaxed break-keep font-sans">
            인위적인 성분이 아닌 자가 조직 재생을 통해 <br className="hidden md:block"/>
            가장 자연스럽고 건강한 아름다움을 채워드립니다.
          </p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-6 pb-40">
        
        {/* --- 상세 설명 섹션 --- */}
        <section className="space-y-14 mt-20 ">
          {detailedTreatments.map((item, idx) => (
            <div key={idx} className="relative">
              <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className="md:w-1/3 sticky top-24">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[#b39359] text-[13px] font-serif italic">0{idx + 1}</span>
                    <div className="w-8 h-[1px] bg-[#b39359]/30" />
                  </div>
                  <h3 className="text-2xl font-medium mb-3 tracking-tight">{item.title}</h3>
                  <p className="text-[#b39359] text-[13px] font-medium leading-relaxed font-sans italic">{item.highlight}</p>
                </div>
                
                <div className="md:w-2/3">
                  <p className="text-gray-500 leading-loose break-keep font-sans text-[16px] mb-10">
                    {item.desc}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {item.points.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-3 py-3 border-b border-gray-100">
                        <div className="w-1 h-1 bg-[#b39359] rounded-full" />
                        <span className="text-[14px] text-gray-600 font-sans">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* --- 치료 특징 & 시술 후 관리 --- */}
        <section className="mt-48">
          <div className="bg-[#2d2d2d] rounded-[60px] p-12 md:p-24 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <div>
                <h4 className="text-2xl font-light mb-8 italic font-serif">Process & Speciality</h4>
                <p className="text-gray-400 leading-relaxed font-sans text-sm mb-12">
                  미다스 한의원은 단순 시술이 아닌, 얼굴의 전체적인 균형과 근육의 움직임을 고려하여 디자인합니다. 개인마다 다른 피부 두께와 처짐의 방향을 정밀하게 분석하여 시술합니다.
                </p>
                <div className="space-y-6">
                  {["정밀 디자인 상담", "국소 마취 및 위생 관리", "맞춤형 매선 시술", "진정 케어"].map((step, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-4">
                      <span className="text-[#b39359] font-serif italic">0{sIdx + 1}</span>
                      <span className="text-sm tracking-widest font-sans">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/5 rounded-3xl p-8 md:p-12">
                <h4 className="text-xl font-light mb-6">Notice</h4>
                <ul className="space-y-4 text-sm text-gray-400 font-sans break-keep leading-relaxed">
                  <li>• 시술 후 즉시 일상생활이 가능하며, 세안과 화장이 가능합니다.</li>
                  <li>• 개인에 따라 미세한 멍이나 붓기가 발생할 수 있으나 수일 내 자연스럽게 사라집니다.</li>
                  <li>• 시술 후 1~2주간은 경락 마사지나 강한 압박은 피하는 것이 좋습니다.</li>
                  <li>• 사우나, 음주, 흡연 등은 재생 속도를 위해 일주일 정도 삼가주세요.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* --- SEMI FOOTER (Lifting) --- */}
      <footer className="bg-white py-24 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-[#2d2d2d] text-xl md:text-2xl font-light mb-10 tracking-tight leading-relaxed">
            탄력을 넘어 <span className="text-[#b39359] italic font-serif">우아한 표정</span>까지 <br className="md:hidden" />
            미다스의 매선 솔루션
          </h2>
          <div className="flex justify-center items-center gap-6 mb-12">
            <Link 
              href="https://m.booking.naver.com/booking/13/bizes/670877" 
              target="_blank" 
              className="text-[12px] font-medium tracking-widest text-[#b39359] hover:opacity-70 transition-opacity font-sans"
            >
              리프팅 예약하기
            </Link>
            <div className="w-[1px] h-3 bg-gray-200" />
            <Link href="/" className="text-[12px] font-medium tracking-widest text-gray-400 hover:text-[#2d2d2d] transition-all font-sans">
              메인 홈
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
import Image from "next/image";
import Link from "next/link";

export default function SpacePage() {
  const spaces = [
    {
      category: "Waiting Area",
      title: "아늑한 환대의 시작, 대기 공간",
      description: "환자분들이 긴장을 풀고 편안하게 머무실 수 있도록 따뜻한 채광과 부드러운 톤의 가구를 배치했습니다. 차 한 잔의 여유와 함께 치유를 위한 준비를 시작하세요.",
      images: ["/space/2.jpg"], // 대기공간 2개
      features: ["호텔 라운지형 소파", "프리미엄 티 서비스", "정서적 안정을 돕는 아로마"]
    },
    {
      category: "Diagnosis Room",
      title: "정교한 분석, 진단실",
      description: "정확한 치료는 올바른 진단에서 시작됩니다. 최첨단 체형 분석 장비와 두상 교정 전문 진단 시스템을 통해 당신의 몸 상태를 객관적으로 파악합니다.",
      images: ["/space/5.jpg"], // 진단실 2개 + skull 이미지
      features: ["3D 체형 분석 시스템", "두상 교정 전문 진단", "프라이빗 1:1 상담", "심층 건강 데이터 분석"]
    },
    {
      category: "Treatment Room",
      title: "오직 당신만을 위한 진료실",
      description: "독립된 구조의 진료실에서 원장님의 세심한 수기 치료와 침구 치료가 이루어집니다. 타인의 시선에서 벗어나 온전히 회복에만 집중할 수 있는 환경을 제공합니다.",
      images: ["/space/3.jpg"], // 진료실 2개
      features: ["1인 독립 진료 공간", "철저한 위생 관리", "인체공학적 치료 베드"]
    },
    {
      category: "Powder Room",
      title: "아름다운 마무리를 위한 파우더룸",
      description: "치료 후 흐트러진 모습을 정돈하고 기분 좋게 일상으로 복귀하실 수 있도록 배려한 공간입니다. 미다스의 섬세한 배려가 담겨 있습니다.",
      images: ["/space/6.jpg"], // 파우더룸 1개
      features: ["드라이어/고데기 비치", "어메니티", "조명 최적화 대형 거울"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#fcfaf7] font-serif overflow-x-hidden">
      {/* Hero Section */}
      <header className="py-24 px-6 text-center bg-white border-b border-gray-100">
        <span className="text-[#b39359] text-xs tracking-[0.4em] font-bold uppercase block mb-4">
          Space Experience
        </span>
        <h1 className="text-4xl md:text-5xl font-light text-[#2d2d2d] mb-6 leading-tight">
          치유를 위한 <span className="italic text-[#b39359]">심미적</span> 공간
        </h1>
        <p className="max-w-2xl mx-auto text-gray-500 leading-relaxed text-sm md:text-base break-keep">
          단순한 병원이 아닌, 몸과 마음이 머무는 것만으로도 회복이 시작되는 공간을 지향합니다. 
          미다스 한의원의 모든 공간에는 환자를 향한 진심이 담겨 있습니다.
        </p>
      </header>

      {/* Space Sections */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        {spaces.map((space, index) => (
          <section key={index} className="mb-32 group">
            <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
              
              {/* Image Grid Layout */}
              <div className="w-full lg:w-3/5 grid grid-cols-2 gap-4">
                {space.images.map((img, imgIdx) => (
                  <div 
                    key={imgIdx} 
                    className={`relative overflow-hidden rounded-2xl shadow-xl transition-transform duration-700 hover:scale-[1.02] ${
                      space.images.length === 1 ? 'col-span-2 h-[400px]' : 'h-[300px] md:h-[400px]'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={space.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>

              {/* Text Content */}
              <div className="w-full lg:w-2/5 space-y-6">
                <span className="text-[#b39359] text-xs font-bold tracking-widest uppercase">
                  {space.category}
                </span>
                <h2 className="text-3xl font-light text-[#2d2d2d] border-b border-[#b39359]/20 pb-4">
                  {space.title}
                </h2>
                <p className="text-gray-600 leading-loose text-[15px] break-keep">
                  {space.description}
                </p>
                <ul className="space-y-3 pt-4">
                  {space.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                      <span className="w-1.5 h-1.5 bg-[#b39359] rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}

       
      </main>
    </div>
  );
}
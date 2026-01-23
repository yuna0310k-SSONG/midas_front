"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules"; // EffectFade 추가
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { useState } from "react";
import WhyChooseUs from "@/components/WhyChooseUs";

const slides = [
  {
    id: 1,
    title: "미다스 안면 황금 밸런스",
    subtitle: "1:1 맞춤 비대칭 교정",
    tag: "뼈, 근육, 지방, 피부를 모두 교정하다",
    extraText: "수술 없이 진짜 내 얼굴을 되찾기",
    image: "/main_page/main1.jpg",
    textPosition: "right",
  },
  {
    id: 2,
    title: "미다스 두상 교정",
    subtitle: "조금 더 반듯하고 둥글게",
    tag: "바른 두상에서 나오는 균형잡힌 얼굴",
    image: "/main_page/main2.jpg",
    textPosition: "left",
  },
  {
    id: 3,
    title: "미다스 프리미엄 리프팅",
    subtitle: "당신의 얼굴에 맞춘 최적의 V라인",
    tag: "더 오래, 더 강하게, 더 부드럽게",
    extraText: "PCL 리프팅 시스템",
    image: "/main_page/main3.jpg",
    textPosition: "right",
  },
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="bg-[#fcfcfc] relative min-h-screen font-serif">
      {/* Hero Section */}
      <section className="relative max-w-[1920px] mx-auto px-4 lg:px-6 py-6 lg:py-10">
        <div className="relative rounded-[40px] overflow-hidden h-[85vh] shadow-2xl">
          <Swiper
            modules={[Navigation, Autoplay, EffectFade]}
            effect="fade" // 부드러운 전환 효과
            speed={1500}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="h-full"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="relative w-full h-full">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[5000ms] scale-110"
                    style={{ 
                      backgroundImage: `url(${slide.image})`,
                      transform: activeIndex === slide.id - 1 ? 'scale(1)' : 'scale(1.1)'
                    }}
                  >
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>

                  <div className={`relative z-10 h-full flex items-center px-12 lg:px-32 ${
                    slide.textPosition === "right" ? "justify-end text-right" : "justify-start text-left"
                  }`}>
                    <div className="max-w-3xl">
                      <p className="text-[#e3ba75] tracking-[0.3em] text-sm lg:text-base mb-4 opacity-90">PREMIUM MEDICAL CARE</p>
                      <h1 className="text-5xl lg:text-8xl font-light text-white leading-[1.1] mb-8 break-keep">
                        {slide.title}
                      </h1>
                      <div className={`w-20 h-[1px] bg-white/50 mb-8 ${slide.textPosition === "right" ? "ml-auto" : "mr-auto"}`} />
                      <p className="text-xl lg:text-2xl text-white/90 font-light mb-2">{slide.subtitle}</p>
                      <p className="text-lg lg:text-xl text-white/70 font-light">{slide.tag}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination/Nav - Minimalist Style */}
          <div className="absolute bottom-12 left-12 z-20 flex items-center space-x-6 text-white/80">
            <div className="flex items-center space-x-4">
              <span className="text-xl font-light">0{activeIndex + 1}</span>
              <div className="w-20 h-[1px] bg-white/30 relative overflow-hidden">
                <div 
                  className="absolute inset-0 bg-white transition-all duration-[5000ms] ease-linear"
                  style={{ width: '100%', transform: `translateX(${-100 + (activeIndex + 1) * 33.3}%)` }}
                />
              </div>
              <span className="text-xl font-light opacity-40">03</span>
            </div>
          </div>
        </div>
      </section>

      {/* Background Section (Fixed Image) */}
      <div 
        className="relative"
        style={{
          backgroundImage: 'url(/wating.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px]"></div>
        
        <div className="relative z-20">
          <WhyChooseUs />
        </div>

        {/* CTA Section - 정갈한 마무리 */}
        <section className="relative z-20 py-32 text-center">
          <div className="max-w-4xl mx-auto px-6">
            <div className="w-[1px] h-20 bg-[#b39359] mx-auto mb-12 opacity-50" />
            <h2 className="text-4xl font-light mb-6 tracking-tight">당신의 아름다움이 머무는 곳</h2>
            <p className="text-gray-500 mb-12 text-lg font-light leading-relaxed">
              미다스한의원은 단순한 치료를 넘어 <br/>
              균형 잡힌 삶의 가치를 제안합니다.
            </p>
            <Link
              href="https://m.booking.naver.com/booking/13/bizes/670877"
              target="_blank"
              className="inline-block px-12 py-4 border border-[#b39359] text-[#b39359] hover:bg-[#b39359] hover:text-white transition-all duration-500 tracking-widest text-sm"
            >
              ONLINE RESERVATION
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
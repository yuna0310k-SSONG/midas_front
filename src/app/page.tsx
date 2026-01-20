"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useState } from "react";
import WhyChooseUs from "@/components/WhyChooseUs";

const quickLinks = [
  {
    label: "블로그",
    href: "https://blog.naver.com/albotalbot",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <path
          fill="currentColor"
          d="M4 4h16v16H4z"
        />
        <path
          fill="#fff"
          d="M7 7h10v2H7zm0 4h10v2H7zm0 4h6v2H7z"
        />
      </svg>
    ),
  },
  {
    label: "카카오톡",
    href: "https://pf.kakao.com/_sxkrNb",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <path
          fill="currentColor"
          d="M12 3a9 9 0 00-8.8 8.1 4 4 0 00-.1.9 4 4 0 007 2.4A1 1 0 0110 14v1.25a3 3 0 002.68 2.97l.32.03a9 9 0 104.04-15.25A1 1 0 0016 6h-1.25a3 3 0 00-2.75-2z"
        />
      </svg>
    ),
  },
  {
    label: "네이버 톡톡",
    href: "https://talk.naver.com/ct/w48doc?frm=mnmb&frm=nmb_detail#nafullscreen",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <path
          fill="currentColor"
          d="M4 4h16v10H6.68L4 17.68z"
        />
        <circle cx="12" cy="9" r="1.5" fill="#fff" />
        <path
          fill="#fff"
          d="M8 9h8v1.5H8zM8 12h6v1.5H8z"
        />
      </svg>
    ),
  },
];

// 슬라이드 데이터
const slides = [
  {
    id: 1,
    title: "미다스 안면 황금 밸런스",
    subtitle: "1:1 맞춤 비대칭 교정",
    tag: "뼈, 근육, 지방, 피부를 모두 교정하다",
    extraText: "수술 없이 진짜 내 얼굴을 되찾기",
    image: "/main_page/main1.jpg",
    textPosition: "right", // 우측
  },
  {
    id: 2,
    title: "미다스 두상 교정",
    subtitle: "조금 더 반듯하고 둥글게!",
    tag: "바른 두상에서 나오는 균형잡힌 얼굴",
    image: "/main_page/main2.jpg",
    textPosition: "left", // 좌측
  },
  {
    id: 3,
    title: "미다스 프리미엄 리프팅!",
    subtitle: "환자의 얼굴에 맞춘 최적의 V리프팅",
    tag: "더 오래, 더 강하게, 더 부드럽게",
    extraText: "PCL리프팅",
    image: "/main_page/main3.jpg",
    textPosition: "right", // 우측
  },
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gray-50 relative min-h-screen">
      {/* Hero Section */}
      <section className="relative max-w-[1920px] mx-auto px-2 sm:px-4 lg:px-6 py-8 lg:py-12">
        <div className="relative rounded-3xl overflow-hidden min-h-[80vh]">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="h-full"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="relative w-full h-[80vh]">
                  {/* 배경 이미지 */}
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${slide.image})`,
                    }}
                  >
                    {/* 어두운 오버레이 (텍스트 가독성 향상) */}
                    <div className="absolute inset-0 bg-black/30"></div>
                  </div>

                  {/* 텍스트 콘텐츠 */}
                  <div
                    className={`relative z-10 h-full flex ${
                      slide.textPosition === "right"
                        ? "items-center justify-end"
                        : "items-center justify-start"
                    }`}
                  >
                    <div
                      className={`px-12 py-4 lg:px-32 lg:py-12 w-full lg:w-2/5 ${
                        slide.textPosition === "right" ? "text-right" : "text-left"
                      }`}
                      style={{ fontFamily: 'GangwonEducationSaeum, sans-serif' }}
                    >
                      {/* 메인 타이틀 (큰 글씨) */}
                      <div className="mb-4 lg:mb-6">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                          {slide.title}
                        </h1>
                      </div>

                      {/* 구분선 (1번 슬라이드만) */}
                      {slide.id === 1 && (
                        <div className={`h-px bg-white mb-4 lg:mb-6 ${
                          slide.textPosition === "right" ? "ml-auto" : "mr-auto"
                        }`} style={{ width: '100%', maxWidth: '200px' }}></div>
                      )}

                      {/* 서브타이틀 */}
                      <div className="mb-2 lg:mb-3">
                        <p className="text-base sm:text-lg lg:text-xl text-white font-medium">
                          {slide.subtitle}
                        </p>
                      </div>

                      {/* 태그 텍스트 */}
                      <div className="mb-2 lg:mb-3">
                        <p className="text-sm sm:text-base lg:text-lg text-white leading-relaxed">
                          {slide.tag}
                        </p>
                      </div>

                      {/* 추가 텍스트 (있는 경우) */}
                      {slide.extraText && (
                        <div>
                          <p className="text-sm sm:text-base lg:text-lg text-white leading-relaxed">
                            {slide.extraText}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* 커스텀 네비게이션 버튼 및 인디케이터 - 왼쪽 하단 */}
          <div className="absolute bottom-8 left-8 z-20 flex items-center space-x-2 text-white text-sm">
            <button className="swiper-button-prev-custom hover:opacity-70 transition-opacity">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="font-semibold">{activeIndex + 1}</span>
            <div className="w-12 h-0.5 bg-white"></div>
            <span className="opacity-50">{slides.length}</span>
            <button className="swiper-button-next-custom hover:opacity-70 transition-opacity">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

        </div>
      </section>

      {/* Quick shortcut links (fixed bottom-right) */}
      <div className="fixed right-4 bottom-8 z-50 flex flex-col items-center gap-3 text-xs font-semibold">
        {quickLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 w-14 flex-col items-center justify-center rounded-xl border border-[#cfe6ed] bg-white/90 text-[#2d2d2d] shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
            aria-label={link.label}
          >
            {link.icon}
            <span className="text-[10px] leading-tight tracking-tighter">{link.label}</span>
          </a>
        ))}
        <button
          type="button"
          onClick={scrollToTop}
          className="flex h-14 w-14 flex-col items-center justify-center rounded-full bg-[#8fd7df] text-white shadow-lg transition hover:-translate-y-0.5"
          aria-label="위로가기"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6">
            <path
              fill="currentColor"
              d="M12 5l-6 6h4v5h4v-5h4z"
            />
          </svg>
          <span className="text-[10px] leading-tight tracking-tighter">위로가기</span>
        </button>
      </div>

      {/* Background Section with wating.jpg - WhyChooseUs부터 페이지 끝까지 */}
      <div 
        className="relative"
        style={{
          backgroundImage: 'url(/wating.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* 상단 그라데이션 오버레이 (Hero Section과의 자연스러운 전환) */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-50 to-transparent pointer-events-none z-10"></div>
        
        {/* Why Choose Us Section */}
        <div className="relative z-20">
          <WhyChooseUs />
        </div>

        {/* CTA Section */}
        <section className="relative z-20 bg-[#2d2d2d]/90 text-white py-16 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">지금 바로 예약하세요</h2>
          <p className="text-gray-300 mb-8">
            건강한 몸과 아름다운 얼굴을 위한 첫걸음을 시작하세요.
          </p>
          <Link
            href="https://m.booking.naver.com/booking/13/bizes/670877?theme=place&entry=pll&lang=ko&area=pll"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-[#e3ba75] text-[#2d2d2d] font-semibold rounded-md hover:bg-[#d4a865] transition-colors duration-200"
          >
            온라인 예약하기
          </Link>
        </div>
      </section>
      </div>
    </div>
  );
}

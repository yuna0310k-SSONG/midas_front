"use client";

import React, { useEffect, useRef, useState } from 'react';

export default function WhyChooseUs() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const features = [
    { title: '전문 의료진', desc: '풍부한 임상 경험을 갖춘 한방 안·이비인후·피부과 전문의가 직접 집도합니다.' },
    { title: '맞춤형 치료', desc: '체질과 생활 습관을 심도 있게 분석하여 개인별 맞춤형 솔루션을 제안합니다.' },
    { title: '지고의 가치', desc: '편안하고 정제된 공간에서 오직 당신만을 위한 수준 높은 진료를 경험하세요.' },
  ];

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <header className={`text-center mb-24 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <span className="text-[#b39359] tracking-[0.4em] text-xs font-bold">WHY MIDAS</span>
          <h2 className="text-4xl md:text-5xl font-light mt-6 text-gray-900 tracking-tight">
            특별함이 <span className="italic">일상이 되는 순간</span>
          </h2>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((item, idx) => (
            <div
              key={idx}
              className={`group relative bg-white/40 p-12 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${idx * 200}ms` }}
            >
              {/* 호버 시 나타나는 세련된 라인 장식 */}
              <div className="absolute inset-0 border border-[#b39359]/0 group-hover:border-[#b39359]/20 transition-all duration-500" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-0 bg-[#b39359] group-hover:h-10 transition-all duration-500" />
              
              <div className="relative z-10 text-center">
                <span className="text-[10px] text-[#b39359] font-bold tracking-widest block mb-6">0{idx + 1}</span>
                <h3 className="text-xl font-medium text-gray-900 mb-6 tracking-wide">
                  {item.title}
                </h3>
                <p className="text-gray-500 leading-loose text-sm font-light break-keep">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
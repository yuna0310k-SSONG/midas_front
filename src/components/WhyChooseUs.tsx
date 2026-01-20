"use client";

import React, { useEffect, useRef, useState } from 'react';

export default function WhyChooseUs() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          setIsVisible(true);
        }
      },
      { threshold: 0.6 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <h2
          className={`text-3xl md:text-4xl font-semibold text-center text-gray-900 mb-20 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          왜 <span className="text-[#8c6b3f]">MIDAS</span> 한의원인가 ?
        </h2>

        <div className="space-y-14">
          {/* Item */}
          {[
            {
              title: '전문 의료진',
              desc: '풍부한 임상 경험을 갖춘 한의사가 직접 상담부터 치료까지 책임집니다.',
            },
            {
              title: '맞춤형 치료',
              desc: '체질과 생활 습관을 고려한 개인별 맞춤 치료 계획을 제공합니다.',
            },
            {
              title: '쾌적한 진료 환경',
              desc: '전통과 현대가 조화를 이루는 공간에서 편안한 진료를 받으실 수 있습니다.',
            },
          ].map((item, idx) => (
            <div
              key={item.title}
              className={`relative bg-white rounded-xl px-8 py-10 border border-gray-100 transition-all duration-500 ${                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              {/* subtle divider */}
              <div className="absolute left-10 top-0 h-1 w-20 bg-[#e3ba75]" />

              <h3 className="text-2xl font-semibold text-[#8c6b3f] mb-4">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

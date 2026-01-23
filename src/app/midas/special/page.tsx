"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function MidasSpecialPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const texts = [
    { title: "LOCATION", content: "서울 강남 교대역, 고품격 의료 서비스를 위한 프라이빗 스테이" },
    { title: "PRIVACY", content: "완벽한 프라이버시를 보장하는 1인실과 최첨단 정밀 진단 시스템" },
    { title: "EXPERTISE", content: "한의학 박사 및 전문의가 제안하는 수준 높은 의학적 솔루션" },
    { title: "PROMISE", content: "당신의 건강과 아름다움이 머무는 곳, 미다스한의원" },
  ];

  return (
    <div style={{ backgroundColor: "#fcfcfc", color: "#1a1a1a", minHeight: "100vh", fontFamily: "serif" }}>
      
      {/* 상단 고정 헤더 */}
      <header style={{ 
        position: "fixed", top: 0, left: 0, width: "100%", height: "80px", zIndex: 100,
        backgroundColor: "rgba(252, 252, 252, 0.9)", backdropFilter: "blur(10px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
        opacity: isLoaded ? 1 : 0, transition: "all 1s ease"
      }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <h1 style={{ 
            fontSize: "1.5rem", fontWeight: "300", letterSpacing: "0.3em", color: "#b39359", 
            margin: 0, cursor: "pointer", transition: "0.3s" 
          }}
          onMouseOver={(e) => e.currentTarget.style.opacity = "0.7"}
          onMouseOut={(e) => e.currentTarget.style.opacity = "1"}
          >MIDAS</h1>
        </Link>
      </header>

      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "140px 24px 100px" }}>
        
        {/* --- BRAND STORY SECTION (새로 추가된 부분) --- */}
        <section style={{ 
          textAlign: "center", marginBottom: "120px",
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? "none" : "translateY(30px)",
          transition: "all 1.5s ease"
        }}>
          <span style={{ fontSize: "0.8rem", color: "#b39359", letterSpacing: "0.3em" }}>BRAND STORY</span>
          <h2 style={{ fontSize: "2.2rem", fontWeight: "300", marginTop: "20px", marginBottom: "40px" }}>
            손길 끝에서 피어나는 <span style={{ fontStyle: "italic", color: "#b39359" }}>지고의 가치</span>
          </h2>
          <div style={{ maxWidth: "700px", margin: "0 auto", lineHeight: "2", color: "#555", wordBreak: "keep-all" }}>
            <p style={{ fontSize: "1.1rem", marginBottom: "20px" }}>
              미다스(MIDAS)는 손길이 닿는 모든 것을 황금으로 변화시킨 그리스 신화 속 왕의 이름이자, 
              <br/>
              한자어로 <strong style={{ color: "#1a1a1a", fontWeight: "500" }}>아름다움(美)을 가득(多) 담아 선사한다(授)</strong>는 진심을 담고 있습니다.
            </p>
            <p style={{ fontSize: "1rem", color: "#888", fontWeight: "300" }}>
              신화 속의 기적이 현대의 의학적 정교함과 만나, <br/>
              당신의 건강과 아름다움이 가장 찬란하게 빛나는 순간을 약속합니다.
            </p>
          </div>
          <div style={{ width: "1px", height: "60px", backgroundColor: "#b39359", margin: "40px auto", opacity: 0.5 }}></div>
        </section>
        {/* ------------------------------------------- */}

        <div style={{ 
          display: "flex", flexDirection: "row", gap: "60px", alignItems: "flex-start", flexWrap: "wrap" 
        }}>
          {/* 왼쪽 이미지 섹션 */}
          <div style={{ 
            flex: "1 1 400px", position: "sticky", top: "120px", height: "65vh", overflow: "hidden",
            borderRadius: "150px 150px 20px 20px", boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
            opacity: isLoaded ? 1 : 0, transform: isLoaded ? "none" : "translateY(40px)",
            transition: "all 1.5s cubic-bezier(0.22, 1, 0.36, 1)"
          }}>
            <div style={{
              width: "100%", height: "100%", backgroundImage: "url('/spacial.jpg')",
              backgroundSize: "cover", backgroundPosition: "center",
            }} />
          </div>

          {/* 오른쪽 텍스트 리스트 */}
          <div style={{ flex: "1 1 500px" }}>
            <div style={{ marginBottom: "60px" }}>
              <span style={{ fontSize: "0.8rem", color: "#b39359", letterSpacing: "0.2em" }}>OUR SPECIALTY</span>
              <h2 style={{ fontSize: "2.8rem", fontWeight: "300", marginTop: "10px", lineHeight: "1.2", wordBreak: "keep-all" }}>
                공간의 철학,<br/>
                <span style={{ fontStyle: "italic", color: "#b39359" }}>특별함의 이유</span>
              </h2>
            </div>
            
            <section>
              {texts.map((item, index) => (
                <div key={index} style={{ 
                  padding: "40px 0", borderBottom: "1px solid #f0f0f0",
                  opacity: isLoaded ? 1 : 0, transform: isLoaded ? "none" : "translateY(20px)",
                  transition: `all 1s ease ${index * 0.15}s` 
                }}>
                  <div style={{ fontSize: "0.75rem", color: "#b39359", fontWeight: "bold", marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ width: "12px", height: "1px", backgroundColor: "#b39359" }}></span>
                    {item.title}
                  </div>
                  <p style={{ fontSize: "1.1rem", lineHeight: "1.8", wordBreak: "keep-all", color: "#333", fontWeight: "300" }}>
                    {item.content}
                  </p>
                </div>
              ))}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
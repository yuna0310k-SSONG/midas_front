"use client";

import React, { useEffect, useState } from 'react';
import Image from "next/image";

export default function DirectorPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // 약력 데이터 그룹화
  const profileGroups = [
    {
      title: "경력 사항",
      items: [
        "현(現) 미다스한의원 대표원장",
        "전(前) 리샘한의원 압구정점 원장",
        "전(前) 아미율한의원 진료원장",
        "전(前) 강동경희한의원 진료원장",
        "전(前) 원광대학교 전주한방병원 일반수련의",
        "전(前) 원광대학교 익산한방병원 전문수련의"
      ]
    },
    {
      title: "학력 및 학술",
      items: [
        "경희대학교 한의과대학 외래교수 (한방 안·이비인후과)",
        "원광대학교 한의과 대학 졸업",
        "원광대학교 한의과 대학원 석·박사 졸업",
        "한의학 박사 (박사논문: Regulation of skin water channel and antioxidant effect by Ethanol Extract of Poria Cocos3)"
      ]
    },
    {
      title: "연구 및 국책 사업",
      items: [
        "미래창조과학부 주관 소아/청소년 아토피 피부염에 대한 임상 관리 프로토콜 개발 참여",
        "한국보건산업진흥원 주관 알레르기 비염 한의표준임상진료지침 개발 연구 참여",
        "SCI급 논문 3편 포함, 논문 22편 저술"
      ]
    },
    {
      title: "자격 및 학회",
      items: [
        "한방 안·이비인후·피부과 전문의",
        "대한한방안이비인후피부과학회 평생회원",
        "대한동의방약학회 정회원",
        "대한두피탈모학회 정회원",
        "척추신경추나의학회 정회원"
      ]
    }
  ];

  return (
    <div style={{ backgroundColor: "#fcfcfc", color: "#1a1a1a", minHeight: "100vh", fontFamily: "serif" }}>
      
      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "120px 24px 100px" }}>
        
        {/* 상단 프로필 섹션 */}
        <section style={{ 
          display: "flex", flexDirection: "row", gap: "80px", flexWrap: "wrap", alignItems: "center", marginBottom: "120px",
          opacity: isLoaded ? 1 : 0, transform: isLoaded ? "none" : "translateY(30px)", transition: "all 1.5s ease"
        }}>
          <div style={{ flex: "1 1 350px", position: "relative" }}>
            <div style={{ 
              borderRadius: "200px 200px 20px 20px", overflow: "hidden", 
              boxShadow: "0 20px 40px rgba(0,0,0,0.08)", height: "550px", position: "relative" 
            }}>
              <Image
                src="/doc.jpg"
                alt="박승구 한의사"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
            <div style={{ 
              position: "absolute", top: "-20px", right: "-20px", width: "100px", height: "100px", 
              borderTop: "1px solid #b39359", borderRight: "1px solid #b39359", zIndex: -1 
            }} />
          </div>

          <div style={{ flex: "1 1 450px" }}>
            {/* DIRECTOR 대신 '한의사'로 변경 */}
            <span style={{ color: "#b39359", letterSpacing: "0.2em", fontSize: "0.85rem", fontWeight: "bold" }}>한의사</span>
            <h2 style={{ fontSize: "3.5rem", fontWeight: "400", marginTop: "10px", marginBottom: "15px" }}>박승구</h2>
            <div style={{ lineHeight: "1.8", color: "#b39359", marginBottom: "30px", fontSize: "1.1rem", fontWeight: "300" }}>
              한방 안 · 이비인후 · 피부과 전문의 <br/>
              한의학 박사 / 경희대학교 외래교수
            </div>
            
            <p style={{ fontSize: "1.05rem", lineHeight: "2.2", color: "#555", wordBreak: "keep-all" }}>
              풍부한 연구와 임상 결과를 바탕으로, <br/>
              미다스(MIDAS)의 이름 아래 환자 한 분 한 분의 <br/>
              아름다움과 건강이 찬란하게 빛날 수 있도록 <br/>
              최상의 의학적 가치를 선사하겠습니다.
            </p>
          </div>
        </section>

        {/* 약력 리스트 그리드 */}
        <div style={{ 
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))", gap: "60px 100px",
          opacity: isLoaded ? 1 : 0, transition: "all 1.5s ease 0.5s" 
        }}>
          {profileGroups.map((group, index) => (
            <section key={index}>
              <h3 style={{ 
                fontSize: "0.9rem", color: "#b39359", letterSpacing: "0.05em", fontWeight: "700", 
                borderBottom: "1px solid #eee", paddingBottom: "15px", marginBottom: "25px"
              }}>
                {group.title}
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {group.items.map((item, idx) => (
                  <li key={idx} style={{ 
                    fontSize: "0.95rem", color: "#444", marginBottom: "14px", 
                    display: "flex", alignItems: "flex-start", gap: "12px", lineHeight: "1.7"
                  }}>
                    <span style={{ color: "#b39359", fontSize: "0.8rem", marginTop: "2px" }}>–</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* 하단 인용구 마무리 */}
        <footer style={{ marginTop: "150px", textAlign: "center" }}>
          <div style={{ width: "40px", height: "1px", backgroundColor: "#b39359", margin: "0 auto 40px" }} />
          <blockquote style={{ fontSize: "1.5rem", fontWeight: "300", color: "#b39359", fontStyle: "italic" }}>
            “전문 지식을 바탕으로 한 지고의 가치 선사”
          </blockquote>
        </footer>
      </main>
    </div>
  );
}
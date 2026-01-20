"use client";

import Image from "next/image";
import Link from "next/link";
import { directorProfile } from "@/data/directorProfile";

const sections = [
  { title: "학력 및 연구", subtitle: "한의학 전문성과 연구 기반", items: directorProfile.education },
  { title: "수련 및 경력", subtitle: "임상 경험과 리더십", items: directorProfile.training },
  { title: "학회·소속", subtitle: "전문 학회 활동", items: directorProfile.memberships },
];

export default function DirectorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-[32px] border border-[#d4c79a]/40 p-10 shadow-2xl shadow-[#b2995d]/30">
          <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-br from-white via-[#fffdf5] to-[#f2e7cd] px-6 py-10 shadow-[0_35px_80px_rgba(18,12,5,0.18)]">
            <div className="absolute -right-24 top-8 h-48 w-48 rounded-full bg-[#f9e5c6]/70 blur-3xl" />
            <div className="absolute -left-20 bottom-10 h-40 w-40 rounded-full bg-[#f8d4a4]/70 blur-3xl" />
            <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] items-center justify-between">
              <div className="space-y-3 text-right lg:text-left">
                <p className="text-lg text-[#5c4f3a] font-medium tracking-wide uppercase">
                  {directorProfile.titles[0]}
                </p>
                <h1 className="text-4xl md:text-5xl font-bold text-[#2d2d2d]">
                  {directorProfile.name}
                </h1>
                <p className="text-base text-[#4c4334] leading-relaxed">
                  한방 안·이비인후·피부과 전문의, 한의학 박사로서 석·박사
                  과정과 다수의 연구를 통해 얻은 전문 지식을 바탕으로
                  미다스만의 통합 치료를 선보입니다.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["전문 의료진", "맞춤 치료", "건강한 미용"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#d4c79a] bg-white px-3 py-1 text-xs font-semibold text-[#5c4f3a]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center rounded-[28px] bg-[#fffdf4] p-3 shadow-[0_20px_60px_rgba(15,10,0,0.25)]">
                <Image
                  src="/dr.kang.png"
                  alt="미다스 한의원 박승구 원장"
                  width={280}
                  height={320}
                  className="h-64 w-auto object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-10">
            {directorProfile.titles.map((title) => (
              <span
                key={title}
                className="px-4 py-2 rounded-full border border-[#d4c79a] bg-[#fffdf5] text-sm text-[#5c4f3a]"
              >
                {title}
              </span>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {sections.map((section) => (
              <div key={section.title} className="space-y-3">
                <h2 className="text-xl font-semibold text-[#2d2d2d]">{section.title}</h2>
                <p className="text-sm text-[#4c4334]">{section.subtitle}</p>
                <ul className="list-disc list-inside space-y-1">
                  {section.items.map((item) => (
                    <li key={item} className="text-[#4a4032] leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-[#2d2d2d] mb-2">사회·학술 활동</h3>
              <div className="space-y-1 text-[#4a4032]">
                {directorProfile.research.map((item) => (
                  <p key={item} className="leading-relaxed">
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <Link
              href="/"
              className="inline-block px-6 py-3 bg-[#e3ba75] text-[#2d2d2d] font-semibold rounded-md hover:bg-[#d4a865] transition-colors duration-200"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

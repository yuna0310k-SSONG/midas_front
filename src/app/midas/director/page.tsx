"use client";

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
          <h1 className="text-4xl font-bold text-[#2d2d2d] mb-4">원장소개</h1>

          <p className="text-lg text-[#5c4f3a] mb-6">
            이름: <span className="font-semibold">{directorProfile.name}</span>
          </p>

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

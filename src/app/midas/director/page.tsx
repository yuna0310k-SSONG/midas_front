"use client";

import Image from "next/image";

const directorProfile = {
  name: "박승구",
  title: "한방 안·이비인후·피부과 전문의",
  subtitle: "한의학 박사",
  description:
    "한방 안·이비인후·피부과 전문의, 한의학 박사로서 석·박사 과정과 다수의 연구를 통해 얻은 전문 지식을 바탕으로 미다스만의 통합 치료를 선보입니다.",
  education: [
    "경희대학교 한의과대학 졸업",
    "경희대학교 대학원 한의학 석사",
    "경희대학교 대학원 한의학 박사",
    "한방 안·이비인후·피부과 전문의 취득",
  ],
  training: [
    "경희대학교 한방병원 안이비인후피부과 레지던트",
    "경희대학교 한방병원 안이비인후피부과 전문의",
    "미다스한의원 대표원장",
  ],
  memberships: [
    "대한한의사협회 정회원",
    "대한한방안이비인후피부과학회 정회원",
    "대한약침학회 정회원",
  ],
  research: [
    "아토피 피부염 관련 다수 논문 게재",
    "여드름 치료 임상 연구 참여",
    "피부 질환 한방 치료 학술 발표",
    "한방 미용 치료 연구 및 개발",
  ],
};

function Section({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <section className="bg-[#f5f3ef] p-10">
      <h2 className="text-2xl font-serif tracking-wide text-center mb-10">
        {title}
      </h2>
      <ul className="max-w-xl mx-auto space-y-5">
        {items.map((item) => (
          <li
            key={item}
            className="text-center text-gray-700 pb-4 border-b border-gray-200 last:border-0"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function DirectorPage() {
  return (
    <div className="min-h-screen bg-[#fdfcfa] py-24 space-y-32">

      {/* 타이틀 */}
      <header className="text-center space-y-8">
        <div className="flex justify-center items-center gap-10">
          <div>
            <h1 className="text-6xl font-serif tracking-tight mb-2">
              {directorProfile.name}
            </h1>
            <p className="text-sm tracking-wider">
              {directorProfile.title}
            </p>
            <p className="text-sm">{directorProfile.subtitle}</p>
          </div>
          <Image
            src="/doc.jpg"
            alt="박승구 원장"
            width={160}
            height={200}
            className="h-44 w-auto object-cover"
          />
        </div>
      </header>

      {/* 인트로 */}
      <p className="max-w-2xl mx-auto text-center text-lg font-serif italic leading-loose text-gray-700">
        {directorProfile.description}
      </p>

      {/* 섹션들 */}
      <Section title="Education" items={directorProfile.education} />
      <Section title="Professional Experience" items={directorProfile.training} />
      <Section title="Membership" items={directorProfile.memberships} />
      <Section title="Research" items={directorProfile.research} />

      {/* 인용 */}
      <blockquote className="text-center max-w-xl mx-auto border-t-4 border-[#d4a865] pt-8">
        <p className="text-lg font-serif italic text-gray-600">
          “전문 지식을 바탕으로 한 통합 치료”
        </p>
      </blockquote>

    </div>
  );
}

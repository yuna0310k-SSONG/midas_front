"use client";

import Link from "next/link";

export default function AnxietyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-[#2d2d2d] mb-6">불안·불면 치료</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              불안과 불면증을 한방 치료로 효과적으로 개선하여 일상 생활의 질을 향상시킵니다.
            </p>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">주요 증상</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>불안감 및 초조함</li>
                  <li>수면 장애</li>
                  <li>스트레스 과다</li>
                  <li>집중력 저하</li>
                  <li>피로감</li>
                  <li>두통 및 어지러움</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">치료 방법</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>체질 분석을 통한 맞춤 한약 처방</li>
                  <li>침구 치료로 안정화</li>
                  <li>추나요법을 통한 체형 교정</li>
                  <li>상담 및 생활 습관 개선</li>
                  <li>명상 및 호흡법 교육</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">치료 효과</h2>
                <p className="text-gray-600">
                  불안과 불면의 근본 원인을 해결함으로써 자연스러운 수면과 평온한 마음을 회복할 수 있습니다.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
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

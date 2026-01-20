"use client";

import Link from "next/link";

export default function ScoliosisPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-[#2d2d2d] mb-6">측만 교정</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              척추 측만은 척추가 옆으로 휘어지는 질환으로, 조기 발견과 치료가 중요합니다.
            </p>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">측만의 원인</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>선천적 요인</li>
                  <li>자세 불량</li>
                  <li>근육 불균형</li>
                  <li>성장기 발달 문제</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">치료 방법</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>추나요법을 통한 척추 교정</li>
                  <li>근육 균형 회복 치료</li>
                  <li>운동 처방 및 자세 교정</li>
                  <li>정기적인 모니터링</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">치료 효과</h2>
                <p className="text-gray-600">
                  측만을 교정함으로써 척추의 균형을 회복하고, 통증 완화 및 외형적 개선 효과를 얻을 수 있습니다.
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

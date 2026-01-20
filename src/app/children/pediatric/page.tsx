"use client";

import Link from "next/link";

export default function PediatricPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-[#2d2d2d] mb-6">소아 치료</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              아이들의 건강과 성장을 돕는 맞춤형 소아 한방 치료를 제공합니다.
            </p>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">주요 치료 분야</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>소아 성장 치료</li>
                  <li>소아 체형 교정</li>
                  <li>소아 알레르기 치료</li>
                  <li>소아 감기 및 호흡기 질환</li>
                  <li>소아 소화기 질환</li>
                  <li>소아 불안 및 수면 장애</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">치료 방법</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>소아 맞춤형 한약 처방</li>
                  <li>부드러운 추나요법</li>
                  <li>경근 침 치료</li>
                  <li>성장 발달 상담</li>
                  <li>식이 및 생활 습관 개선</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">치료 특징</h2>
                <p className="text-gray-600">
                  아이들의 체질과 발달 단계를 고려한 맞춤형 치료로 안전하고 효과적인 치료를 제공합니다.
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

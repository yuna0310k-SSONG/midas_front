"use client";

import Link from "next/link";

export default function DietPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-[#2d2d2d] mb-6">다이어트</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              한방 다이어트는 체질과 생활 습관을 고려한 맞춤형 치료로 건강하게 체중을 관리합니다.
            </p>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">한방 다이어트의 특징</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>체질 분석을 통한 맞춤 치료</li>
                  <li>대사 기능 개선</li>
                  <li>체내 노폐물 제거</li>
                  <li>식욕 조절</li>
                  <li>건강한 체중 감량</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">치료 방법</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>한약 처방을 통한 체질 개선</li>
                  <li>침구 치료로 대사 촉진</li>
                  <li>식이 상담 및 생활 습관 개선</li>
                  <li>운동 처방</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">예상 효과</h2>
                <p className="text-gray-600">
                  무리한 다이어트 없이 건강하게 체중을 감량하고, 요요 현상 없이 유지할 수 있습니다.
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

"use client";

import Link from "next/link";

export default function PostureGeneralPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-[#2d2d2d] mb-6">체형교정</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              올바른 체형은 건강의 기초입니다. 한방 체형교정으로 균형잡힌 몸매와 건강을 함께 찾아보세요.
            </p>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">체형 불균형의 원인</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>잘못된 자세 습관</li>
                  <li>근육 불균형</li>
                  <li>골격 구조 문제</li>
                  <li>일상 생활 패턴</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">치료 방법</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>추나요법을 통한 골격 교정</li>
                  <li>근육 균형 회복 치료</li>
                  <li>자세 교정 운동</li>
                  <li>생활 습관 개선 상담</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">치료 효과</h2>
                <p className="text-gray-600">
                  체형을 교정함으로써 통증 완화, 자세 개선, 외형적 아름다움 향상 등의 효과를 얻을 수 있습니다.
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

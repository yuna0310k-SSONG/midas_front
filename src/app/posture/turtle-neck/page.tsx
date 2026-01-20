"use client";

import Link from "next/link";

export default function TurtleNeckPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-[#2d2d2d] mb-6">거북목 교정</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              거북목은 현대인의 대표적인 자세 불량으로, 목과 어깨 통증의 주요 원인입니다.
            </p>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">거북목의 원인</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>장시간 스마트폰 사용</li>
                  <li>컴퓨터 작업 시 잘못된 자세</li>
                  <li>책상 높이 불일치</li>
                  <li>목 근육 약화</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">치료 방법</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>추나요법을 통한 경추 교정</li>
                  <li>침구 치료로 근육 이완</li>
                  <li>물리치료 및 운동 처방</li>
                  <li>자세 교정 교육</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">예상 효과</h2>
                <p className="text-gray-600">
                  거북목을 교정함으로써 목과 어깨 통증이 완화되고, 올바른 자세를 유지할 수 있게 됩니다.
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

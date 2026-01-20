"use client";

import Link from "next/link";

export default function StudentPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-[#2d2d2d] mb-6">수험생 추나 & 한약</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              수험생을 위한 맞춤형 추나요법과 한약 치료로 최상의 컨디션을 유지할 수 있도록 돕습니다.
            </p>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">주요 치료 분야</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>거북목 및 어깨 통증 개선</li>
                  <li>집중력 향상</li>
                  <li>피로 완화</li>
                  <li>수면 질 개선</li>
                  <li>스트레스 완화</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">추나요법</h2>
                <p className="text-gray-600 mb-3">
                  장시간 앉아서 공부하는 수험생들의 체형 불균형을 교정하고 통증을 완화합니다.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>경추 및 흉추 교정</li>
                  <li>어깨 균형 회복</li>
                  <li>척추 정렬 개선</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">한약 치료</h2>
                <p className="text-gray-600 mb-3">
                  수험생의 체질과 상태에 맞는 한약 처방으로 컨디션을 관리합니다.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>집중력 향상 한약</li>
                  <li>피로 회복 한약</li>
                  <li>면역력 강화 한약</li>
                  <li>수면 질 개선 한약</li>
                </ul>
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

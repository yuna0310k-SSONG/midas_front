"use client";

import Link from "next/link";

export default function RoundShoulderPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-[#2d2d2d] mb-6">라운드숄더 교정</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              라운드숄더는 어깨가 앞으로 굽어 들어가는 자세 불량으로, 어깨와 등 통증을 유발합니다.
            </p>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">라운드숄더의 원인</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>앉은 자세에서의 습관</li>
                  <li>가슴 근육의 단축</li>
                  <li>등 근육의 약화</li>
                  <li>장시간 컴퓨터 작업</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">치료 방법</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>추나요법을 통한 어깨 교정</li>
                  <li>근육 이완 및 강화 치료</li>
                  <li>스트레칭 및 운동 처방</li>
                  <li>자세 교정 교육</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">예상 효과</h2>
                <p className="text-gray-600">
                  라운드숄더를 교정함으로써 어깨와 등 통증이 완화되고, 올바른 자세로 인한 자신감 향상을 얻을 수 있습니다.
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

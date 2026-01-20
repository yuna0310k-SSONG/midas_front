"use client";

import Link from "next/link";

export default function PainPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-[#2d2d2d] mb-6">통증치료</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              다양한 통증을 한방 치료로 효과적으로 완화하고 근본적인 원인을 개선합니다.
            </p>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">치료 가능한 통증</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>목과 어깨 통증</li>
                  <li>허리 통증</li>
                  <li>무릎 통증</li>
                  <li>손목 및 관절 통증</li>
                  <li>만성 두통</li>
                  <li>전신 피로 및 근육통</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">치료 방법</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>추나요법을 통한 골격 교정</li>
                  <li>침구 치료로 통증 완화</li>
                  <li>한약 처방을 통한 체질 개선</li>
                  <li>물리치료 및 운동 처방</li>
                  <li>뜸 치료 및 부항 치료</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">치료 효과</h2>
                <p className="text-gray-600">
                  통증의 근본 원인을 파악하고 치료함으로써 장기적으로 통증이 재발하지 않도록 합니다.
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

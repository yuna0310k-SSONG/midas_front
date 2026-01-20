"use client";

import Link from "next/link";

export default function TrafficPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-[#2d2d2d] mb-6">교통사고 후유증 치료</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              교통사고 후 발생하는 각종 통증과 후유증을 한방 치료로 효과적으로 개선합니다.
            </p>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">주요 증상</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>목과 어깨 통증 (경추 염좌)</li>
                  <li>허리 통증</li>
                  <li>두통 및 어지러움</li>
                  <li>손목 및 관절 통증</li>
                  <li>전신 피로감</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">치료 방법</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>추나요법을 통한 골격 교정</li>
                  <li>침구 치료로 통증 완화</li>
                  <li>한약 처방을 통한 체질 개선</li>
                  <li>물리치료 및 재활 운동</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">보험 적용</h2>
                <p className="text-gray-600">
                  자동차보험을 통한 진료가 가능하며, 보험 처리에 대한 상세 안내를 제공합니다.
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

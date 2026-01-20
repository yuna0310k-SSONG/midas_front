"use client";

import Link from "next/link";

export default function ParalysisPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-[#2d2d2d] mb-6">안면마비 치료</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              안면마비를 한방 치료로 효과적으로 개선하여 얼굴의 기능과 미용을 회복합니다.
            </p>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">안면마비의 원인</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>안면 신경 마비</li>
                  <li>바이러스 감염</li>
                  <li>혈액 순환 장애</li>
                  <li>스트레스 및 과로</li>
                  <li>외상</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">치료 방법</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>침구 치료로 신경 기능 회복</li>
                  <li>한약 처방을 통한 혈액 순환 개선</li>
                  <li>추나요법을 통한 근육 이완</li>
                  <li>물리치료 및 재활 운동</li>
                  <li>뜸 치료 및 부항 치료</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">치료 시기</h2>
                <p className="text-gray-600 mb-3">
                  안면마비는 조기 치료가 중요합니다. 증상 발생 후 빠른 치료 시작이 회복에 도움이 됩니다.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>급성기: 발병 후 즉시 치료 시작</li>
                  <li>회복기: 지속적인 치료로 기능 회복</li>
                  <li>유지기: 재발 방지 및 기능 유지</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">예상 효과</h2>
                <p className="text-gray-600">
                  한방 치료를 통해 안면 신경 기능을 회복하고, 얼굴 근육의 움직임을 정상화하여 자연스러운 표정을 되찾을 수 있습니다.
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

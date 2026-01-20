"use client";

import Link from "next/link";

export default function FaceAsymmetryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-[#2d2d2d] mb-6">안면비대칭 교정</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              안면비대칭은 얼굴의 좌우 균형이 맞지 않는 상태로, 뼈, 근육, 지방, 피부 등 다양한 원인으로 발생할 수 있습니다.
            </p>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">치료 원리</h2>
                <p className="text-gray-600 mb-3">
                  미다스한의원의 안면비대칭 교정은 뼈, 근육, 지방, 피부를 모두 고려한 종합적인 접근 방식을 사용합니다.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>골격 구조 분석 및 교정</li>
                  <li>근육 불균형 해소</li>
                  <li>지방 분포 조절</li>
                  <li>피부 탄력 개선</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">치료 방법</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>추나요법을 통한 골격 교정</li>
                  <li>침구 치료로 근육 균형 조절</li>
                  <li>한약 처방을 통한 체질 개선</li>
                  <li>1:1 맞춤형 치료 계획</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">예상 효과</h2>
                <p className="text-gray-600">
                  수술 없이 자연스러운 얼굴 균형을 회복하여 대칭적이고 아름다운 얼굴형을 만들 수 있습니다.
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

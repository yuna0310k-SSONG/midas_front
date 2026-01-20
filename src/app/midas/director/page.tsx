"use client";

import Link from "next/link";

export default function DirectorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-[#2d2d2d] mb-6">원장소개</h1>
          
          <div className="prose max-w-none">
            <div className="mb-6">
              <p className="text-lg text-gray-700">
                미다스한의원 원장은 한의학박사이자 한방 안이비인후피부과 전문의로서, 
                풍부한 임상 경험과 전문성을 갖추고 있습니다.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">학력 및 경력</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>한의학박사</li>
                  <li>한방 안이비인후피부과 전문의</li>
                  <li>대학 및 국내외 학회 활동</li>
                  <li>한의학 관련 기관 연구 경험</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">진료 철학</h2>
                <p className="text-gray-600">
                  환자 개개인의 상태를 정확히 파악하고, 맞춤형 치료를 통해 최상의 결과를 도출하는 것을 목표로 합니다. 
                  과학적 근거에 기반한 한의학 치료로 환자의 건강과 아름다움을 함께 추구합니다.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">전문 분야</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>안면비대칭 교정</li>
                  <li>두상 교정</li>
                  <li>체형 교정</li>
                  <li>한방성형·뷰티</li>
                  <li>통증 치료</li>
                  <li>피부 질환 치료</li>
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

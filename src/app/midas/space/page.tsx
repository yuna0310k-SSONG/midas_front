"use client";

import Link from "next/link";

export default function SpacePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-[#2d2d2d] mb-6">한의원 공간 소개</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              미다스한의원은 편안함과 고급스러움을 추구하는 공간으로 설계되었습니다.
            </p>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">1인실 치료실</h2>
                <p className="text-gray-600">
                  환자의 프라이버시를 보장하는 개별 치료실에서 편안하고 안전한 진료를 받으실 수 있습니다.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">최신 의료 시설</h2>
                <p className="text-gray-600">
                  최첨단 의료기기와 쾌적한 환경을 갖춘 현대적인 시설에서 전문적인 진료를 제공합니다.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">편안한 대기 공간</h2>
                <p className="text-gray-600">
                  넓고 쾌적한 대기실에서 여유롭게 대기하실 수 있습니다.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">접근성</h2>
                <p className="text-gray-600">
                  교대역 1번 출구에서 도보 1분 거리에 위치하여 접근이 용이합니다. 
                  주차장도 인근에 있어 자가용 이용 시에도 편리합니다.
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

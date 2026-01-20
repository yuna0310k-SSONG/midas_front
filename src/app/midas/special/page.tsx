"use client";

import Link from "next/link";

export default function MidasSpecialPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-[#2d2d2d] mb-6">MIDAS의 특별함</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              미다스한의원은 서울 강남 교대역에 위치한 한의원으로 고품격 한의원을 지향하고 있습니다.
            </p>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">1인실 치료</h2>
                <p className="text-gray-600">
                  환자 프라이버시를 보장하는 1인실 치료를 통해 편안하고 안전한 진료 환경을 제공합니다.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">최첨단 의료기기</h2>
                <p className="text-gray-600">
                  과학적인 최첨단 의료기기를 도입하여 정확한 진단과 효과적인 치료를 제공합니다.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">전문 의료진</h2>
                <p className="text-gray-600">
                  한의학박사이자 한방 안이비인후피부과 전문의 원장이 직접 진료하며, 대학 및 국내외 학회, 한의학 관련 기관에서의 경험과 연구를 바탕으로 전문적이고 수준 높은 치료를 제공합니다.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">다양한 진료 분야</h2>
                <p className="text-gray-600">
                  체형교정, 안면비대칭교정, 두상교정, 피부리프팅, 다이어트 등 미용 진료 외에도 일반적인 통증 환자 치료, 자동차 보험 환자 치료, 알레르기 질환 치료, 성장 치료, 피부 질환 치료 등 다양한 분야의 진료를 진행합니다.
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

"use client";

import Link from "next/link";

export default function AcupuncturePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-[#2d2d2d] mb-6">뷰티 약침</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              한방 약침을 이용한 뷰티 치료로 피부 건강과 아름다움을 동시에 추구합니다.
            </p>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">뷰티 약침의 효과</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>피부 탄력 개선</li>
                  <li>주름 완화</li>
                  <li>색소 침착 개선</li>
                  <li>피부 톤 개선</li>
                  <li>모공 관리</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">치료 과정</h2>
                <p className="text-gray-600">
                  한방 약재로 만든 약침을 피부에 주입하여 피부 내부에서부터 건강을 회복하고 아름다움을 증진시킵니다.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">맞춤형 치료</h2>
                <p className="text-gray-600">
                  환자의 피부 상태와 체질에 맞는 약침 처방을 통해 최적의 효과를 제공합니다.
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

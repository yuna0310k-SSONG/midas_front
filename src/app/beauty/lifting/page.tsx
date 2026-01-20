"use client";

import Link from "next/link";

export default function LiftingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-[#2d2d2d] mb-6">리프팅·채움 매선</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              한방 매선을 통한 자연스러운 리프팅과 채움으로 젊고 탄력 있는 피부를 만들어드립니다.
            </p>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">매선 리프팅</h2>
                <p className="text-gray-600">
                  특수 제작된 한방 매선을 피부에 삽입하여 처진 피부를 당겨 올리고, 콜라겐 생성을 촉진하여 자연스러운 리프팅 효과를 제공합니다.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">채움 매선</h2>
                <p className="text-gray-600">
                  볼륨이 부족한 부위에 매선을 이용하여 자연스러운 채움 효과를 제공합니다.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">PCL 리프팅</h2>
                <p className="text-gray-600">
                  더 오래, 더 강하게, 더 부드럽게 지속되는 PCL 리프팅으로 최적의 V라인을 만들어드립니다.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">치료 특징</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>수술 없이 자연스러운 리프팅</li>
                  <li>개인별 맞춤 치료</li>
                  <li>부작용 최소화</li>
                  <li>자연스러운 결과</li>
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

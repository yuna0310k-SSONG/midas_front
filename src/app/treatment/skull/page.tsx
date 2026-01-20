"use client";

import Link from "next/link";

export default function SkullPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-[#2d2d2d] mb-6">두상 교정</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              바른 두상은 균형잡힌 얼굴형의 기초가 됩니다. 두상 교정을 통해 더욱 아름답고 대칭적인 얼굴을 만들 수 있습니다.
            </p>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">두상 불균형의 원인</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>유아기 자세 습관</li>
                  <li>잘못된 수면 자세</li>
                  <li>선천적 요인</li>
                  <li>외상 후 변화</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">치료 방법</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>추나요법을 통한 두개골 교정</li>
                  <li>부드러운 마사지와 압박 기법</li>
                  <li>자세 교정 및 생활 습관 개선</li>
                  <li>개인별 맞춤 치료 계획</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#8c6b3f] mb-3">치료 효과</h2>
                <p className="text-gray-600">
                  두상을 교정함으로써 얼굴의 균형이 개선되고, 더욱 대칭적이고 아름다운 얼굴형을 얻을 수 있습니다.
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

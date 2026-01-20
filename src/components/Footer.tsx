import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#2d2d2d] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold text-[#e3ba75] mb-4">
              MIDAS 한의원
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              안면교정, 체형교정, 한방성형, 통증치료 전문 한의원으로
              <br />
              환자 중심의 맞춤형 치료를 제공합니다.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-[#e3ba75] mb-4">
              빠른 링크
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="https://m.booking.naver.com/booking/13/bizes/670877?theme=place&entry=pll&lang=ko&area=pll"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-[#e3ba75] transition-colors duration-200"
                >
                  진료안내 및 예약
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-[#e3ba75] transition-colors duration-200"
                >
                  원장소개
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-[#e3ba75] transition-colors duration-200"
                >
                  한의원 공간 소개
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-[#e3ba75] transition-colors duration-200"
                >
                  오시는 길
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-[#e3ba75] mb-4">
              연락처
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start">
                <span className="mr-2">📍</span>
                <span>서울 서초구 서초대로 310 소망빌딩 4층 미다스한의원</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📞</span>
                <span>02-3472-1075</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📧</span>
                <span>info@midasclinic.com</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">🕒</span>
                <span>평일 10:30 - 22:30</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-[#3a3a3a]">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© 2026 MIDAS 한의원. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link
                href="#"
                className="hover:text-[#e3ba75] transition-colors duration-200"
              >
                개인정보처리방침
              </Link>
              <Link
                href="#"
                className="hover:text-[#e3ba75] transition-colors duration-200"
              >
                이용약관
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

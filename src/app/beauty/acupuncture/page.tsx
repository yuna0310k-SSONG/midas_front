"use client";

import Link from "next/link";

export default function AcupuncturePage() {
  return (
    <div className="min-h-screen bg-white font-serif text-[#2d2d2d] overflow-x-hidden">
      
      {/* --- HERO: 프리미엄 메인 문구 --- */}
      <section className="pt-40 pb-24 px-6 border-b border-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#b39359] text-xs tracking-[0.5em] font-bold uppercase mb-8 font-sans">Midas Aesthetic Acupuncture</p>
          <h1 className="text-4xl md:text-6xl font-light leading-[1.2] tracking-tight mb-8">
            피부의 결을 다스리는 <br />
            <span className="italic text-[#b39359]">가장 순수한 처방</span>
          </h1>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-6 py-24 space-y-40">
        
        {/* --- SECTION 1: 윤곽약침 --- */}
        <section className="space-y-12">
          <div className="border-l-4 border-[#b39359] pl-8">
            <h2 className="text-3xl font-medium mb-2">윤곽약침</h2>
            <p className="text-gray-400 font-sans italic text-sm">당신의 턱선을 다시 빛내는 방법</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* 시술 정보 카드 */}
            <div className="space-y-6 bg-[#fcfaf7] p-10 rounded-2xl border border-gray-50">
              <div className="flex items-center gap-4 text-[13px] font-sans">
                <span className="text-[#b39359]">★</span>
                <span className="font-bold w-24">시술 시간</span>
                <span className="text-gray-600">5~10분</span>
              </div>
              <div className="flex items-center gap-4 text-[13px] font-sans">
                <span className="text-[#b39359]">★</span>
                <span className="font-bold w-24">시술 횟수</span>
                <span className="text-gray-600">3~5회</span>
              </div>
              <div className="flex items-center gap-4 text-[13px] font-sans">
                <span className="text-[#b39359]">★</span>
                <span className="font-bold w-24">시술 간격</span>
                <span className="text-gray-600">1~2주</span>
              </div>
              <div className="mt-10 py-4 bg-[#d4b581] text-white text-center text-[11px] font-bold tracking-[0.2em] rounded uppercase">
                일상생활 즉시 가능
              </div>
            </div>

            {/* 체크 리스트 (도트 스타일 적용) */}
            <div className="space-y-8">
              <h4 className="font-bold text-sm font-sans flex items-center gap-2">
                <span className="w-1 h-4 bg-[#2d2d2d]" /> 윤곽약침 체크 리스트
              </h4>
              <ul className="space-y-4 text-[13px] text-gray-600 font-sans leading-relaxed">
                {[
                  "볼살이 많은 경우",
                  "턱밑살이 많고 이중턱이 심한 경우",
                  "V라인을 원하는 경우",
                  "얼굴살이 많아 팔자주름이 깊어진 경우",
                  "얼굴살이 처지면서 심술보가 생긴 경우",
                  "입안에 뭘 넣은 것처럼 볼이 빵빵하게 부풀어오른 느낌이 드는 경우"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1 h-1 bg-[#b39359] rounded-full shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-gray-100 text-[14px] text-gray-500 leading-loose font-sans break-keep">
            <p className="mb-4">윤곽약침은 일반적으로 많이 시술되는 PPC나 HPL 계열의 윤곽주사와 다릅니다.</p>
            <p>윤곽약침은 안전한 한방 성분으로 안면부의 림프 순환을 촉진하고 지방을 분해해 얼굴 윤곽을 갸름하고 또렷하게 만들어줍니다.</p>
          </div>
        </section>

        {/* --- SECTION 2: 정안침 --- */}
        <section className="space-y-12">
          <div className="border-l-4 border-[#b39359] pl-8">
            <h2 className="text-3xl font-medium mb-2">정안침</h2>
            <p className="text-gray-400 font-sans italic text-sm">보다 어리게, 보다 아름답게 정돈한다</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* 시술 정보 카드 (배치 반전) */}
            <div className="space-y-6 bg-[#fcfaf7] p-10 rounded-2xl border border-gray-50 md:order-2">
              <div className="flex items-center gap-4 text-[13px] font-sans">
                <span className="text-[#b39359]">★</span>
                <span className="font-bold w-24">시술 시간</span>
                <span className="text-gray-600">20~30분</span>
              </div>
              <div className="flex items-center gap-4 text-[13px] font-sans">
                <span className="text-[#b39359]">★</span>
                <span className="font-bold w-24">시술 횟수</span>
                <span className="text-gray-600">10~20회</span>
              </div>
              <div className="flex items-center gap-4 text-[13px] font-sans">
                <span className="text-[#b39359]">★</span>
                <span className="font-bold w-24">시술 간격</span>
                <span className="text-gray-600">주 2회</span>
              </div>
              <div className="mt-10 py-4 bg-[#d4b581] text-white text-center text-[11px] font-bold tracking-[0.2em] rounded uppercase">
                일상생활 즉시 가능
              </div>
            </div>

            {/* 정안침 핵심 효과 */}
            <div className="space-y-10 md:order-1 pt-4">
              <div className="space-y-8">
                <p className="text-[19px] font-medium tracking-tight border-b border-gray-50 pb-4">
                  얼굴 전체의 근막, SMAS층을 자극, 리프팅 효과를 만들어내다
                </p>
                <p className="text-[19px] font-medium tracking-tight border-b border-gray-50 pb-4">
                  피하 자극을 통한 미백, 탄력 증가
                </p>
                <p className="text-[19px] font-medium tracking-tight border-b border-gray-50 pb-4">
                  근육 긴장 완화를 통해 안면 윤곽 교정
                </p>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-gray-100 text-[14px] text-gray-500 leading-loose font-sans break-keep">
            <p className="mb-4">정안침은 안면 경혈에 자침을 통해 피부를 자극하고, 근육을 풀어 안면 불균형을 바로 잡고 피부의 자생력을 높여주는 치료입니다.</p>
            <p>안면축소, 안면비대칭, 턱관절장애, 구안와사 후유증, 피부톤 개선, 리프팅 효과, 붓기 개선 등에 모두 활용 가능합니다.</p>
          </div>
        </section>

      </main>

      {/* --- SEMI FOOTER --- */}
      <footer className="bg-[#fcfaf7] py-32 text-center border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-[#2d2d2d] text-2xl font-light mb-12 tracking-tight leading-relaxed">
            한 방울의 진심으로 <br className="md:hidden" />
            <span className="text-[#b39359] italic">당신의 결을 다스립니다</span>
          </h2>
          <div className="flex justify-center items-center gap-10">
            <Link href="https://m.booking.naver.com/booking/13/bizes/670877" target="_blank" className="text-[11px] font-bold tracking-[0.3em] text-[#b39359] font-sans uppercase border-b border-[#b39359]/30 pb-1">Booking Now</Link>
            <Link href="/" className="text-[11px] font-bold tracking-[0.3em] text-gray-400 font-sans uppercase">Main Home</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
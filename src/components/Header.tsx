"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { menuData } from "@/data/menu";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, logout, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    // 초기 스크롤 위치 확인
    handleScroll();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 모바일 메뉴가 열렸을 때 배경 페이지 스크롤 방지
  useEffect(() => {
    if (isMobileMenuOpen) {
      // 메뉴가 열렸을 때 body 스크롤 막기
      document.body.style.overflow = 'hidden';
    } else {
      // 메뉴가 닫혔을 때 body 스크롤 복원
      document.body.style.overflow = '';
    }

    return () => {
      // 컴포넌트 언마운트 시 스크롤 복원
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className={`${isScrolled ? 'bg-white/50 backdrop-blur-md' : 'bg-white'} text-[#2d2d2d] sticky top-0 z-50 shadow-md transition-all duration-300`}>
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-center h-20">
          {/* Logo - 왼쪽 */}
          <Link href="/" className="absolute left-4 sm:left-6 lg:left-8 flex items-center flex-shrink-0 z-10">
            <Image
              src="/logo_midas.svg"
              alt="MIDAS 한의원"
              width={1008}
              height={336}
              className="h-48 sm:h-60 md:h-72 lg:h-[336px] xl:h-96 2xl:h-72 w-auto"
              priority
            />
          </Link>

          {/* Desktop Menu - 정 중앙 */}
          <nav className="hidden 2xl:flex items-center space-x-6">
            {menuData.map((menu, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => setHoveredMenu(index)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                {menu.children ? (
                  <button className="px-3 py-2 text-sm font-medium text-[#2d2d2d] hover:text-[#e3ba75] transition-colors duration-200 whitespace-nowrap">
                    {menu.title}
                  </button>
                ) : (
                  <Link
                    href={menu.href || "#"}
                    className="px-3 py-2 text-sm font-medium text-[#2d2d2d] hover:text-[#e3ba75] transition-colors duration-200 whitespace-nowrap"
                  >
                    {menu.title}
                  </Link>
                )}
                {menu.children && hoveredMenu === index && (
                  <div 
                    className="absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-xl py-2 z-[60] animate-in fade-in slide-in-from-top-2 duration-200 border border-gray-200"
                    onMouseEnter={() => setHoveredMenu(index)}
                    onMouseLeave={() => setHoveredMenu(null)}
                  >
                    {menu.children.map((child, childIndex) => (
                      <Link
                        key={childIndex}
                        href={child.href || "#"}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#e3ba75] transition-colors duration-150 whitespace-nowrap"
                        target={child.href?.startsWith('http') ? '_blank' : undefined}
                        rel={child.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* User Icon or Login - 오른쪽 (Desktop only) */}
          <div className="absolute right-4 sm:right-6 lg:right-8 hidden 2xl:flex items-center space-x-4">
            
            {isAuthenticated && user && user.name ? (
              <Link
                href="/profile"
                className="flex flex-col items-center cursor-pointer hover:opacity-70 transition-opacity"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mb-1 text-[#2d2d2d]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="text-xs text-[#2d2d2d] font-medium whitespace-nowrap">
                  {user.name} 님
                </span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex flex-col items-center cursor-pointer hover:opacity-70 transition-opacity"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-[#2d2d2d]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button (햄버거만 표시) */}
          <div className="2xl:hidden absolute right-4 sm:right-6 z-20">
            <button
              className="p-2 rounded-md hover:bg-gray-200 transition-colors text-[#2d2d2d]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="메뉴 열기"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="2xl:hidden pb-4 animate-in slide-in-from-top duration-200 border-t border-gray-200 mt-2 pt-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
            {/* 사용자 정보 (모바일 메뉴 안에 표시) */}
            <div className="px-4 py-3 border-b border-gray-300 mb-2 flex flex-col space-y-2">
              
              {isAuthenticated && user && user.name ? (
                <Link
                  href="/profile"
                  className="flex items-center space-x-3 cursor-pointer hover:opacity-70 transition-opacity ml-auto"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-[#2d2d2d]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="text-sm text-[#2d2d2d] font-medium">
                    {user.name} 님
                  </span>
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center space-x-3 cursor-pointer hover:opacity-70 transition-opacity ml-auto"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-[#2d2d2d]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="text-sm text-[#2d2d2d] font-medium">
                    로그인
                  </span>
                </Link>
              )}
            </div>

            {/* 메뉴 항목들 */}
            {menuData.map((menu, index) => (
              <div key={index} className="border-b border-gray-300">
                {menu.children ? (
                  <>
                    <div className="px-4 py-3 font-medium text-[#e3ba75]">
                      {menu.title}
                    </div>
                    <div className="pl-6 pb-2">
                      {menu.children.map((child, childIndex) => (
                        <Link
                          key={childIndex}
                          href={child.href || "#"}
                          className="block px-4 py-2 text-sm text-gray-700 hover:text-[#e3ba75] hover:bg-gray-100 rounded-md transition-colors duration-150"
                          onClick={() => setIsMobileMenuOpen(false)}
                          target={child.href?.startsWith('http') ? '_blank' : undefined}
                          rel={child.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={menu.href || "#"}
                    className="block px-4 py-3 font-medium text-[#e3ba75] hover:bg-gray-100 rounded-md transition-colors duration-150"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {menu.title}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

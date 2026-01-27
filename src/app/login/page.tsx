"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleKakaoLogin = () => {
    window.location.href = "/api/auth/kakao";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login(email, password);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "이메일 또는 비밀번호가 올바르지 않습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfaf7] px-6">
      <div className="max-w-md w-full">
        
        {/* 로그인 카드 컨테이너 */}
        <div className="bg-white p-10 md:p-14 rounded-[2.5rem] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.08)] border border-gray-100">
          
          {/* 상단 헤더: 미니멀 로고 & 타이틀 */}
          <div className="text-center space-y-3 mb-12">
            <Link href="/" className="inline-block">
              <span className="text-xl font-serif font-light tracking-[0.3em] text-[#2d2d2d]">MIDAS</span>
            </Link>
            <h2 className="text-2xl font-serif font-light text-[#2d2d2d]">Sign In</h2>
            <div className="w-8 h-[1px] bg-[#b39359] mx-auto"></div>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-l-2 border-red-400 text-red-700 px-4 py-3 text-[11px] font-light">
                {error}
              </div>
            )}
            
            <div className="space-y-6">
              {/* Email Input */}
              <div className="group">
                <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2 block group-focus-within:text-[#b39359] transition-colors">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-3 border-b border-gray-100 focus:border-[#b39359] outline-none text-sm font-light transition-all bg-transparent placeholder:text-gray-200"
                  placeholder="이메일을 입력하세요"
                />
              </div>

              {/* Password Input */}
              <div className="group">
                <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2 block group-focus-within:text-[#b39359] transition-colors">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-3 border-b border-gray-100 focus:border-[#b39359] outline-none text-sm font-light transition-all bg-transparent placeholder:text-gray-200"
                  placeholder="비밀번호를 입력하세요"
                />
              </div>
            </div>

            {/* 유틸리티 메뉴 */}
            <div className="flex items-center justify-between text-[11px] font-light text-gray-500">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-3 h-3 border-gray-200 rounded accent-[#b39359] focus:ring-0" />
                <span>Keep me signed in</span>
              </label>
              <Link href="#" className="hover:text-[#b39359] transition-colors">
                Forgot Password?
              </Link>
            </div>

            {/* 버튼 섹션 */}
            <div className="space-y-4 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-[#2d2d2d] text-white text-[11px] font-bold tracking-[0.3em] uppercase rounded-full hover:bg-[#b39359] transition-all duration-500 shadow-lg shadow-black/5"
              >
                {isLoading ? "Signing in..." : "Login"}
              </button>
              
              <button
                type="button"
                onClick={handleKakaoLogin}
                className="w-full py-4 border border-gray-100 text-[#3c1e1e] text-[11px] font-bold tracking-[0.3em] uppercase rounded-full hover:bg-[#fee500] hover:border-[#fee500] transition-all duration-500 flex items-center justify-center gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#fee500]"></div>
                Kakao Login
              </button>
            </div>
          </form>

          {/* 하단 링크 */}
          <div className="mt-12 pt-8 border-t border-gray-50 text-center">
            <Link 
              href="/signup" 
              className="text-[10px] font-bold tracking-[0.2em] text-gray-400 hover:text-[#b39359] transition-colors border-b border-transparent hover:border-[#b39359]"
            >
              CREATE AN ACCOUNT
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
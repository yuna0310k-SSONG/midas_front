"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (name.trim()) {
      login(name, email);
      router.push("/");
    } else {
      alert("이름을 입력해주세요.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfaf7] px-6 py-20">
      <div className="max-w-lg w-full">
        
        {/* 회원가입 카드 컨테이너 */}
        <div className="bg-white p-10 md:p-14 rounded-[2.5rem] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.08)] border border-gray-100">
          
          {/* 상단 헤더 */}
          <div className="text-center space-y-3 mb-12">
            <Link href="/" className="inline-block">
              <span className="text-xl font-serif font-light tracking-[0.3em] text-[#2d2d2d]">MIDAS</span>
            </Link>
            <h2 className="text-2xl font-serif font-light text-[#2d2d2d]">Create Account</h2>
            <div className="w-8 h-[1px] bg-[#b39359] mx-auto"></div>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-6">
              
              {/* 이름 입력 */}
              <div className="group">
                <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-1 block group-focus-within:text-[#b39359] transition-colors">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full py-3 border-b border-gray-100 focus:border-[#b39359] outline-none text-sm font-light transition-all bg-transparent placeholder:text-gray-200"
                  placeholder="성함을 입력하세요"
                />
              </div>

              {/* 이메일 입력 */}
              <div className="group">
                <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-1 block group-focus-within:text-[#b39359] transition-colors">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-3 border-b border-gray-100 focus:border-[#b39359] outline-none text-sm font-light transition-all bg-transparent placeholder:text-gray-200"
                  placeholder="example@midas.com"
                />
              </div>

              {/* 전화번호 입력 */}
              <div className="group">
                <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-1 block group-focus-within:text-[#b39359] transition-colors">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full py-3 border-b border-gray-100 focus:border-[#b39359] outline-none text-sm font-light transition-all bg-transparent placeholder:text-gray-200"
                  placeholder="010-0000-0000"
                />
              </div>

              {/* 비밀번호 입력 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-1 block group-focus-within:text-[#b39359] transition-colors">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full py-3 border-b border-gray-100 focus:border-[#b39359] outline-none text-sm font-light transition-all bg-transparent placeholder:text-gray-200"
                    placeholder="8자 이상 입력"
                  />
                </div>
                <div className="group">
                  <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-1 block group-focus-within:text-[#b39359] transition-colors">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    required
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    className="w-full py-3 border-b border-gray-100 focus:border-[#b39359] outline-none text-sm font-light transition-all bg-transparent placeholder:text-gray-200"
                    placeholder="다시 입력하세요"
                  />
                </div>
              </div>
            </div>

            {/* 약관 동의 */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  required 
                  className="mt-1 w-3 h-3 border-gray-200 rounded accent-[#b39359] focus:ring-0" 
                />
                <span className="text-[11px] font-light text-gray-500 leading-relaxed break-keep">
                  <Link href="#" className="text-[#b39359] border-b border-[#b39359]/20 hover:border-[#b39359]">이용약관</Link> 및 
                  <Link href="#" className="ml-1 text-[#b39359] border-b border-[#b39359]/20 hover:border-[#b39359]">개인정보처리방침</Link>에 
                  모두 동의합니다.
                </span>
              </label>
            </div>

            {/* 회원가입 버튼 */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full py-4 bg-[#2d2d2d] text-white text-[11px] font-bold tracking-[0.3em] uppercase rounded-full hover:bg-[#b39359] transition-all duration-500 shadow-xl shadow-black/5"
              >
                Create Account
              </button>
            </div>
          </form>

          {/* 하단 로그인 링크 */}
          <div className="mt-12 pt-8 border-t border-gray-50 text-center">
            <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400">
              ALREADY HAVE AN ACCOUNT? 
              <Link href="/login" className="ml-3 text-[#b39359] underline underline-offset-4 hover:text-[#2d2d2d] transition-colors">
                SIGN IN
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
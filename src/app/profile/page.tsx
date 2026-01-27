"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/api";
import Link from "next/link";

interface ProfileData {
  name: string;
  email: string;
  phone?: string;
  [key: string]: any;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [editData, setEditData] = useState<ProfileData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    fetchProfile();
  }, [isAuthenticated, router]);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      // 로컬 데이터를 우선 기본값으로 설정
      const initialData = { 
        name: user?.name || "", 
        email: user?.email || "",
        phone: ""
      };
      setProfileData(initialData);
      setEditData(initialData);
      
      // 실제 API 호출 로직 (엔드포인트는 환경에 맞게 조절)
      const response = await api.get("/api/users/me").catch(() => null);
      if (response?.data) {
        const data = response.data;
        const fetched = {
          name: data.name || user?.name || "",
          email: data.email || user?.email || "",
          phone: data.phone || "",
        };
        setProfileData(fetched);
        setEditData(fetched);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-white text-gray-400">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50/50 py-16 px-6 font-sans text-gray-900">
      <div className="max-w-2xl mx-auto">
        
        {/* 헤더 영역 */}
        <div className="flex items-center justify-between mb-10 pb-6 border-b border-gray-200">
          <h1 className="text-2xl font-medium tracking-tight">내 정보</h1>
          <Link href="/" className="text-sm text-gray-400 hover:text-gray-900 transition-colors">
            홈으로
          </Link>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="p-8 md:p-12">
            
            {isEditing ? (
              /* --- 수정 모드 --- */
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">이름</label>
                    <input
                      type="text"
                      value={editData?.name || ""}
                      onChange={(e) => setEditData({...editData!, name: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-gray-900 outline-none transition-all text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">이메일</label>
                    <input
                      type="email"
                      value={editData?.email || ""}
                      onChange={(e) => setEditData({...editData!, email: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-gray-900 outline-none transition-all text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">연락처</label>
                    <input
                      type="tel"
                      value={editData?.phone || ""}
                      onChange={(e) => setEditData({...editData!, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-gray-900 outline-none transition-all text-sm"
                      placeholder="010-0000-0000"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => { setProfileData(editData); setIsEditing(false); }}
                    className="flex-1 py-3 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    저장하기
                  </button>
                  <button
                    onClick={() => { setEditData(profileData); setIsEditing(false); }}
                    className="flex-1 py-3 bg-white border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    취소
                  </button>
                </div>
              </div>
            ) : (
              /* --- 조회 모드 --- */
              <div className="space-y-10">
                <div className="grid grid-cols-1 gap-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-8 pb-6 border-b border-gray-50">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest w-24">이름</span>
                    <span className="text-base text-gray-900 flex-1">{profileData?.name}</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-8 pb-6 border-b border-gray-50">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest w-24">이메일</span>
                    <span className="text-base text-gray-900 flex-1">{profileData?.email}</span>
                  </div>

                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex-1 py-3 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    정보 수정
                  </button>
                  <button
                    onClick={() => { logout(); router.push("/"); }}
                    className="flex-1 py-3 border border-gray-200 text-gray-500 text-sm font-medium rounded-lg hover:text-red-500 hover:border-red-100 transition-all"
                  >
                    로그아웃
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 하단 안내 */}
        <p className="mt-8 text-center text-xs text-gray-400 font-light">
          계정 삭제를 원하시면 고객센터로 문의해 주세요.
        </p>
      </div>
    </div>
  );
}
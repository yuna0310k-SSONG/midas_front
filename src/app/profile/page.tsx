"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/api";

interface ProfileData {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  [key: string]: any; // 기타 필드들을 위해
}

// 제외할 필드 목록 (표시 및 업데이트 시)
const EXCLUDED_FIELDS = ["id", "login_type", "role", "created_at", "updated_at", "address"];

// 표시 시 추가로 제외할 필드 (기본 필드 제외)
const EXCLUDED_DISPLAY_FIELDS = [...EXCLUDED_FIELDS, "name", "email", "phone", "birth_date"];

// 서버로 보낼 때 제외할 필드 (업데이트 불가능한 필드만)
const EXCLUDED_UPDATE_FIELDS = [...EXCLUDED_FIELDS, "birth_date"];

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [editData, setEditData] = useState<ProfileData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
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
      setError("");

      // 여러 가능한 엔드포인트 시도
      const possibleEndpoints = [
        "/api/users/me",
        "/api/users/profile",
        "/api/profile",
        "/api/user/me",
        "/api/auth/me",
        "/users/me",
        "/profile",
      ];

      let response;
      let lastError: any;

      for (const endpoint of possibleEndpoints) {
        try {
          response = await api.get(endpoint);
          break;
        } catch (err: any) {
          lastError = err;
          if (err.response?.status !== 404) {
            throw err;
          }
          continue;
        }
      }

      if (!response) {
        // API 호출이 실패하면 로컬스토리지의 사용자 정보 사용
        if (user) {
          setProfileData({
            name: user.name || "",
            email: user.email || "",
          });
          setEditData({
            name: user.name || "",
            email: user.email || "",
          });
        } else {
          throw lastError || new Error("프로필 정보를 가져올 수 없습니다.");
        }
      } else {
        const data = response.data;
        // 응답 데이터 구조가 다양할 수 있으므로 유연하게 처리
        const profile: ProfileData = {
          name: data.name || data.userName || data.username || data.user?.name || user?.name || "",
          email: data.email || data.user?.email || user?.email || "",
          phone: data.phone || data.phoneNumber || data.telephone || data.user?.phone || "",
          address: data.address || data.user?.address || "",
        };

        // 생년월일 추가
        if (data.birth_date || data.birthDate || data.user?.birth_date || data.user?.birthDate) {
          profile.birth_date = data.birth_date || data.birthDate || data.user?.birth_date || data.user?.birthDate;
        }

        // 기타 필드들 추가 (제외 필드 제외)
        Object.keys(data).forEach((key) => {
          if (!profile.hasOwnProperty(key) && !EXCLUDED_DISPLAY_FIELDS.includes(key) && data[key] !== null && data[key] !== undefined) {
            profile[key] = data[key];
          }
        });

        setProfileData(profile);
        setEditData(profile);
      }
    } catch (err: any) {
      console.error("Profile fetch error:", err);
      setError(err.response?.data?.message || err.message || "프로필 정보를 가져오는데 실패했습니다.");
      
      // 에러가 있어도 로컬스토리지의 기본 정보는 표시
      if (user) {
        setProfileData({
          name: user.name || "",
          email: user.email || "",
        });
        setEditData({
          name: user.name || "",
          email: user.email || "",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError("");

      if (!editData) return;

      // 제외 필드를 제거한 데이터 생성
      const dataToSend: any = {};
      Object.keys(editData).forEach((key) => {
        if (!EXCLUDED_UPDATE_FIELDS.includes(key)) {
          dataToSend[key] = editData[key];
        }
      });

      // 여러 가능한 엔드포인트 시도
      const possibleEndpoints = [
        "/api/users/me",
        "/api/users/profile",
        "/api/profile",
        "/api/user/me",
        "/users/me",
        "/profile",
      ];

      let response;
      let lastError: any;

      for (const endpoint of possibleEndpoints) {
        try {
          response = await api.put(endpoint, dataToSend);
          break;
        } catch (err: any) {
          lastError = err;
          if (err.response?.status !== 404) {
            throw err;
          }
          continue;
        }
      }

      if (!response) {
        throw lastError || new Error("프로필 업데이트에 실패했습니다.");
      }

      // 성공하면 프로필 데이터 업데이트
      const data = response.data;
      const updatedProfile: ProfileData = {
        name: data.name || editData.name,
        email: data.email || editData.email,
        phone: data.phone || editData.phone || "",
      };

      // 생년월일 추가
      if (data.birth_date || data.birthDate || editData.birth_date || editData.birthDate) {
        updatedProfile.birth_date = data.birth_date || data.birthDate || editData.birth_date || editData.birthDate;
      }

      // 기타 필드들 추가 (제외 필드 제외)
      Object.keys(data).forEach((key) => {
        if (!updatedProfile.hasOwnProperty(key) && !EXCLUDED_DISPLAY_FIELDS.includes(key) && data[key] !== null && data[key] !== undefined) {
          updatedProfile[key] = data[key];
        }
      });

      setProfileData(updatedProfile);
      setIsEditing(false);

      // 로컬스토리지도 업데이트
      if (updatedProfile.name) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: updatedProfile.name,
            email: updatedProfile.email,
          })
        );
      }
    } catch (err: any) {
      console.error("Profile update error:", err);
      setError(err.response?.data?.message || err.message || "프로필 업데이트에 실패했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (profileData) {
      setEditData({ ...profileData });
    }
    setIsEditing(false);
    setError("");
  };

  const handleInputChange = (field: string, value: string) => {
    if (editData) {
      setEditData({
        ...editData,
        [field]: value,
      });
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#e3ba75]"></div>
          <p className="mt-4 text-gray-600">프로필 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-[#EAE4D8] px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-[#2d2d2d]">내 정보</h1>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#e3ba75] rounded-md hover:bg-[#d4a865] transition-colors duration-200"
                >
                  수정
                </button>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-8">
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            {isEditing && editData ? (
              // 편집 모드
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    이름 *
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={editData.name || ""}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#e3ba75] focus:border-[#e3ba75]"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    이메일 *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={editData.email || ""}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#e3ba75] focus:border-[#e3ba75]"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    전화번호
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={editData.phone || ""}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="010-1234-5678"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#e3ba75] focus:border-[#e3ba75]"
                  />
                </div>

                {/* 기타 필드들 표시 (readonly) */}
                {Object.keys(editData)
                  .filter((key) => !["name", "email", "phone", "address", "birth_date", "id", "login_type", "role", "created_at", "updated_at"].includes(key))
                  .map((key) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {key}
                      </label>
                      <input
                        type="text"
                        value={editData[key] || ""}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      />
                    </div>
                  ))}

                <div className="flex items-center space-x-3 pt-4">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-[#e3ba75] rounded-md hover:bg-[#d4a865] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? "저장 중..." : "저장"}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    취소
                  </button>
                </div>
              </div>
            ) : (
              // 조회 모드
              profileData && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">이름</label>
                    <p className="text-lg text-gray-900">{profileData.name}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">이메일</label>
                    <p className="text-lg text-gray-900">{profileData.email}</p>
                  </div>

                  {profileData.phone && (
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">전화번호</label>
                      <p className="text-lg text-gray-900">{profileData.phone}</p>
                    </div>
                  )}

                  {profileData.birth_date && (
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">생년월일</label>
                      <p className="text-lg text-gray-900">
                        {typeof profileData.birth_date === "string" 
                          ? profileData.birth_date.split("T")[0] 
                          : String(profileData.birth_date)}
                      </p>
                    </div>
                  )}

                  {profileData.address && (
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">주소</label>
                      <p className="text-lg text-gray-900">{profileData.address}</p>
                    </div>
                  )}

                  {/* 기타 필드들 표시 */}
                  {Object.keys(profileData)
                    .filter((key) => !["name", "email", "phone", "address", "birth_date", "id", "login_type", "role", "created_at", "updated_at"].includes(key))
                    .map((key) => (
                      <div key={key}>
                        <label className="block text-sm font-medium text-gray-500 mb-1">{key}</label>
                        <p className="text-lg text-gray-900">
                          {typeof profileData[key] === "object"
                            ? JSON.stringify(profileData[key])
                            : String(profileData[key] || "")}
                        </p>
                      </div>
                    ))}
                </div>
              )
            )}

            {/* 로그아웃 버튼 */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-[#2d2d2d] rounded-md hover:bg-[#3a3a3a] transition-colors duration-200"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

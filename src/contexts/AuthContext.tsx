"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";
import api from "@/lib/api";

interface User {
  id?: string;
  name: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // 페이지 로드 시 로컬스토리지에서 사용자 정보 확인
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // API 문서: https://midas-back.fly.dev/api#/
      // 가장 일반적인 엔드포인트만 먼저 시도 (로그인 시간 단축)
      let response;
      const primaryEndpoints = [
        "/api/auth/login",
        "/auth/login",
        "/api/users/login",
      ];

      let lastError: any;
      
      // 주요 엔드포인트만 빠르게 시도
      for (const endpoint of primaryEndpoints) {
        try {
          response = await api.post(endpoint, {
            email,
            password,
          });
          console.log(`Login successful with endpoint: ${endpoint}`);
          break; // 성공하면 반복 중단
        } catch (err: any) {
          lastError = err;
          if (err.response?.status !== 404) {
            // 404가 아니면 다른 에러이므로 바로 throw
            console.error(`Login failed at ${endpoint}:`, err.response?.status, err.response?.data);
            throw err;
          }
          // 404면 다음 엔드포인트 시도
          continue;
        }
      }

      if (!response) {
        const errorMsg = lastError?.response?.data?.message || 
                        lastError?.message || 
                        "로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.";
        throw new Error(errorMsg);
      }

      const data = response.data;
      console.log("Login response data:", data); // 디버깅용
      console.log("Response keys:", Object.keys(data)); // 응답 필드 확인
      
      // 사용자 이름 추출 (다양한 필드명 시도)
      const userName = data.name || data.userName || data.username || data.user?.name || data.user?.userName || "";
      
      if (!userName) {
        console.error("사용자 이름을 찾을 수 없습니다. 응답 데이터:", data);
        throw new Error("사용자 이름을 가져올 수 없습니다.");
      }
      
      // 사용자 ID 추출
      const userId = data.id || data.userId || data.user?.id || data.user?.userId;
      
      const userData = { 
        id: userId,
        name: userName, 
        email: data.email || data.user?.email || email 
      };
      
      console.log("User data saved:", userData); // 디버깅용
      
      // Access Token은 localStorage에 저장
      const accessToken = data.token || data.accessToken || data.user?.token || data.access_token;
      if (accessToken) {
        localStorage.setItem("token", accessToken);
        console.log("Access token saved to localStorage");
        
        // 토큰에서 ID 추출 시도 (JWT payload)
        if (!userId) {
          try {
            const payload = JSON.parse(atob(accessToken.split('.')[1]));
            userData.id = payload.sub || payload.userId || payload.id;
          } catch (e) {
            console.error("토큰에서 ID 추출 실패:", e);
          }
        }
      }
      
      // Refresh Token은 쿠키에 저장 (7일 만료)
      const refreshToken = data.refreshToken || data.refresh_token || data.user?.refreshToken || data.user?.refresh_token;
      console.log("Refresh token found:", refreshToken ? "Yes" : "No"); // 디버깅용
      
      if (refreshToken) {
        try {
          Cookies.set("refreshToken", refreshToken, {
            expires: 7, // 7일
            secure: false, // 개발 환경에서는 false
            sameSite: "lax", // strict에서 lax로 변경 (더 유연하게)
            path: "/", // 전체 경로에서 사용 가능
          });
          console.log("Refresh token saved to cookie:", Cookies.get("refreshToken") ? "Success" : "Failed");
        } catch (cookieError) {
          console.error("Cookie save error:", cookieError);
        }
      } else {
        console.warn("Refresh token not found in response. Available fields:", Object.keys(data));
      }
      
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || "로그인에 실패했습니다.";
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // 쿠키에서 리프레시 토큰 삭제
    Cookies.remove("refreshToken", { path: "/" });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

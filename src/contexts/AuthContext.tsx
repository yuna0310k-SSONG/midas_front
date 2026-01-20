"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { loginAPI, logoutAPI } from "@/lib/auth-api";
import { setAccessToken, removeAccessToken, getAccessToken } from "@/lib/token-manager";
import api from "@/lib/api";

interface User {
  id?: string;
  name: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // 페이지 로드 시 로컬스토리지에서 사용자 정보 확인
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          // Access Token이 있는지 확인
          const token = getAccessToken();
          if (token) {
            setUser(userData);
          } else {
            // 토큰이 없으면 사용자 정보도 삭제
            localStorage.removeItem("user");
          }
        } catch (error) {
          console.error("사용자 정보 파싱 실패:", error);
          localStorage.removeItem("user");
        }
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // credentials: 'include'로 로그인 요청 (HttpOnly Cookie 전송)
      const data = await loginAPI(email, password);
      
      console.log("Login response data:", data); // 디버깅용
      
      // 사용자 이름 추출 (다양한 필드명 시도)
      const userName = data.name || data.userName || data.username || data.user?.name || data.user?.userName || "";
      
      if (!userName) {
        console.error("사용자 이름을 찾을 수 없습니다. 응답 데이터:", data);
        throw new Error("사용자 이름을 가져올 수 없습니다.");
      }
      
      // 사용자 ID 추출
      const userId = data.id || data.userId || data.user?.id || data.user?.userId;
      
      // Access Token 저장
      const accessToken = data.accessToken || data.token || data.access_token || data.user?.token;
      const expiresIn = data.expiresIn || data.expires_in || data.expires;
      
      if (accessToken) {
        // Access Token을 localStorage에 저장
        setAccessToken(accessToken, expiresIn);
        console.log("Access token saved to localStorage");
        
        // JWT에서 사용자 ID 추출 시도
        if (!userId && accessToken) {
          try {
            const payload = JSON.parse(atob(accessToken.split('.')[1]));
            const extractedId = payload.sub || payload.userId || payload.id || payload.user_id;
            if (extractedId) {
              userId = extractedId;
            }
          } catch (e) {
            console.error("토큰에서 ID 추출 실패:", e);
          }
        }
      } else {
        console.warn("Access token not found in response. Available fields:", Object.keys(data));
        throw new Error("Access Token을 받지 못했습니다.");
      }
      
      // Refresh Token은 백엔드에서 HttpOnly Cookie로 자동 설정됨
      // 프론트엔드에서는 JS로 접근 불가 (보안)
      console.log("Refresh token is set by backend as HttpOnly cookie (not accessible via JS)");
      
      const userData: User = { 
        id: userId,
        name: userName, 
        email: data.email || data.user?.email || email 
      };
      
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage = error.message || "로그인에 실패했습니다.";
      throw new Error(errorMessage);
    }
  };

  const logout = async () => {
    try {
      // 백엔드 로그아웃 API 호출 (HttpOnly Cookie에서 refreshToken 삭제)
      await logoutAPI();
    } catch (error) {
      console.error("로그아웃 API 호출 실패:", error);
      // API 실패해도 로컬 상태는 정리
    } finally {
      // 로컬 상태 정리
      setUser(null);
      localStorage.removeItem("user");
      removeAccessToken();
      // HttpOnly Cookie는 백엔드에서 삭제하므로 클라이언트에서 직접 삭제 불가
    }
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

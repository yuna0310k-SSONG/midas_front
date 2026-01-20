import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getAccessToken, setAccessToken, removeAccessToken, isAccessTokenExpiringSoon } from "./token-manager";
import { refreshTokenAPI } from "./auth-api";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://midas-back.fly.dev/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000, // 5초 타임아웃
  withCredentials: true, // 쿠키 자동 전송 (refreshToken HttpOnly Cookie 포함)
});

// Refresh Token 재발급 중인지 추적 (중복 요청 방지)
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

// 요청 인터셉터
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Access Token을 Authorization 헤더에 추가
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Access Token이 곧 만료되면 미리 갱신 시도 (선택사항)
    if (token && isAccessTokenExpiringSoon() && !isRefreshing) {
      refreshTokenAPI()
        .then(({ accessToken, expiresIn }) => {
          setAccessToken(accessToken, expiresIn);
        })
        .catch((error) => {
          console.error('토큰 사전 갱신 실패:', error);
        });
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    
    // 401 Unauthorized 에러 처리 (Access Token 만료)
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // 이미 토큰 갱신 중이면 대기
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Refresh Token으로 새 Access Token 발급
        const { accessToken, expiresIn } = await refreshTokenAPI();
        
        // 새 Access Token 저장
        setAccessToken(accessToken, expiresIn);
        
        // 대기 중인 요청들 처리
        processQueue(null, accessToken);
        
        // 원래 요청 재시도
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }
        
        isRefreshing = false;
        return api(originalRequest);
      } catch (refreshError: any) {
        // Refresh Token도 만료된 경우
        isRefreshing = false;
        processQueue(refreshError, null);
        
        // 로컬 상태 정리
        removeAccessToken();
        
        // 로그인 페이지로 리다이렉트 (선택사항)
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

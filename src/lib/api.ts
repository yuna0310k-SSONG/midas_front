import axios from "axios";

const api = axios.create({
  baseURL: "https://midas-back.fly.dev/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000, // 5초 타임아웃
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    // 필요시 토큰 추가
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
  (error) => {
    if (error.response?.status === 401) {
      // 인증 오류 시 로그아웃 처리
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default api;

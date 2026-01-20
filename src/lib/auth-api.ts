/**
 * 인증 관련 API
 * - credentials: 'include' 설정으로 HttpOnly Cookie 자동 전송
 * - Refresh Token은 백엔드에서 HttpOnly Cookie로 설정됨
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://midas-back.fly.dev';

/**
 * 로그인 API
 * credentials: 'include'로 설정하여 HttpOnly Cookie(refresh token) 자동 전송
 */
export async function loginAPI(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // HttpOnly Cookie 전송 필수
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: '로그인에 실패했습니다.' }));
    throw new Error(error.message || '로그인에 실패했습니다.');
  }

  const data = await response.json();
  return data;
}

/**
 * Refresh Token API
 * credentials: 'include'로 설정하여 HttpOnly Cookie(refresh token) 자동 전송
 * 백엔드에서 새 access token과 refresh token(쿠키) 반환
 */
export async function refreshTokenAPI(): Promise<{ accessToken: string; expiresIn?: number }> {
  const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // HttpOnly Cookie 전송 필수
  });

  if (!response.ok) {
    // Refresh token도 만료된 경우
    if (response.status === 401) {
      throw new Error('SESSION_EXPIRED');
    }
    const error = await response.json().catch(() => ({ message: '토큰 갱신에 실패했습니다.' }));
    throw new Error(error.message || '토큰 갱신에 실패했습니다.');
  }

  const data = await response.json();
  return {
    accessToken: data.accessToken || data.access_token || data.token,
    expiresIn: data.expiresIn || data.expires_in || data.expires,
  };
}

/**
 * 로그아웃 API
 * credentials: 'include'로 설정하여 HttpOnly Cookie(refresh token) 삭제 요청
 */
export async function logoutAPI() {
  try {
    await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // HttpOnly Cookie 전송 필수
    });
  } catch (error) {
    console.error('로그아웃 API 호출 실패:', error);
    // API 실패해도 로컬 상태는 정리
  }
}

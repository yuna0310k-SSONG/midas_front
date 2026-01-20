/**
 * 인증 관련 API
 * - credentials: 'include' 설정으로 HttpOnly Cookie 자동 전송
 * - Refresh Token은 백엔드에서 HttpOnly Cookie로 설정됨
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://midas-back.fly.dev';

/**
 * 로그인 API
 * credentials: 'include'로 설정하여 HttpOnly Cookie(refresh token) 자동 전송
 * 여러 가능한 엔드포인트를 시도하여 백엔드와 호환성 보장
 */
export async function loginAPI(email: string, password: string) {
  // 가능한 로그인 엔드포인트 목록 (우선순위 순)
  const loginEndpoints = [
    '/api/auth/login',
    '/auth/login',
    '/api/users/login',
    '/users/login',
    '/api/login',
    '/login',
  ];

  let lastError: Error | null = null;

  // 각 엔드포인트를 순서대로 시도
  for (const endpoint of loginEndpoints) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // HttpOnly Cookie 전송 필수
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        console.log(`로그인 성공: ${endpoint}`);
        const data = await response.json();
        return data;
      }

      // 404가 아니면 다른 에러이므로 바로 throw
      if (response.status !== 404) {
        const error = await response.json().catch(() => ({ 
          message: `로그인에 실패했습니다. (${response.status})` 
        }));
        throw new Error(error.message || `로그인에 실패했습니다. (${response.status})`);
      }

      // 404면 다음 엔드포인트 시도
      console.log(`${endpoint} 엔드포인트가 존재하지 않음 (404), 다음 시도...`);
      continue;
    } catch (error: any) {
      lastError = error;
      // 네트워크 오류가 아니면 다음 엔드포인트 시도
      if (error.message && !error.message.includes('Failed to fetch')) {
        throw error;
      }
      continue;
    }
  }

  // 모든 엔드포인트 시도 실패
  throw new Error(
    lastError?.message || 
    '로그인에 실패했습니다. 백엔드 API 엔드포인트를 확인해주세요.'
  );
}

/**
 * Refresh Token API
 * credentials: 'include'로 설정하여 HttpOnly Cookie(refresh token) 자동 전송
 * 백엔드에서 새 access token과 refresh token(쿠키) 반환
 */
export async function refreshTokenAPI(): Promise<{ accessToken: string; expiresIn?: number }> {
  // 가능한 refresh 엔드포인트 목록
  const refreshEndpoints = [
    '/api/auth/refresh',
    '/auth/refresh',
    '/api/auth/token/refresh',
    '/auth/token/refresh',
    '/api/token/refresh',
    '/token/refresh',
  ];

  let lastError: Error | null = null;

  for (const endpoint of refreshEndpoints) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // HttpOnly Cookie 전송 필수
      });

      if (response.ok) {
        const data = await response.json();
        return {
          accessToken: data.accessToken || data.access_token || data.token,
          expiresIn: data.expiresIn || data.expires_in || data.expires,
        };
      }

      // Refresh token도 만료된 경우
      if (response.status === 401) {
        throw new Error('SESSION_EXPIRED');
      }

      // 404가 아니면 다른 에러
      if (response.status !== 404) {
        const error = await response.json().catch(() => ({ 
          message: '토큰 갱신에 실패했습니다.' 
        }));
        throw new Error(error.message || '토큰 갱신에 실패했습니다.');
      }

      // 404면 다음 엔드포인트 시도
      continue;
    } catch (error: any) {
      lastError = error;
      if (error.message === 'SESSION_EXPIRED') {
        throw error;
      }
      continue;
    }
  }

  // 모든 엔드포인트 시도 실패
  throw new Error(
    lastError?.message || 
    '토큰 갱신에 실패했습니다. 백엔드 API 엔드포인트를 확인해주세요.'
  );
}

/**
 * 로그아웃 API
 * credentials: 'include'로 설정하여 HttpOnly Cookie(refresh token) 삭제 요청
 */
export async function logoutAPI() {
  // 가능한 로그아웃 엔드포인트 목록
  const logoutEndpoints = [
    '/api/auth/logout',
    '/auth/logout',
    '/api/users/logout',
    '/users/logout',
    '/api/logout',
    '/logout',
  ];

  for (const endpoint of logoutEndpoints) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // HttpOnly Cookie 전송 필수
      });

      // 성공하거나 404가 아니면 완료
      if (response.ok || response.status !== 404) {
        return;
      }
    } catch (error) {
      console.error(`로그아웃 API 호출 실패 (${endpoint}):`, error);
      // 마지막 엔드포인트가 아니면 계속 시도
      if (endpoint !== logoutEndpoints[logoutEndpoints.length - 1]) {
        continue;
      }
    }
  }

  // API 실패해도 로컬 상태는 정리 (이미 호출부에서 처리)
  console.warn('모든 로그아웃 엔드포인트 시도 실패');
}

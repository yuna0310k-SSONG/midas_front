/**
 * 토큰 관리 유틸리티
 * - Access Token: localStorage 또는 메모리에 저장
 * - Refresh Token: HttpOnly Cookie (JS 접근 불가)
 */

const ACCESS_TOKEN_KEY = 'access_token';
const ACCESS_TOKEN_EXPIRY_KEY = 'access_token_expiry';

/**
 * Access Token을 localStorage에 저장
 */
export function setAccessToken(token: string, expiryInSeconds?: number) {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
  
  if (expiryInSeconds) {
    const expiryTime = Date.now() + expiryInSeconds * 1000;
    localStorage.setItem(ACCESS_TOKEN_EXPIRY_KEY, expiryTime.toString());
  }
}

/**
 * Access Token을 localStorage에서 가져오기
 */
export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  const expiry = localStorage.getItem(ACCESS_TOKEN_EXPIRY_KEY);
  
  // 토큰 만료 확인
  if (token && expiry) {
    const expiryTime = parseInt(expiry, 10);
    if (Date.now() >= expiryTime) {
      // 토큰 만료
      removeAccessToken();
      return null;
    }
  }
  
  return token;
}

/**
 * Access Token을 localStorage에서 삭제
 */
export function removeAccessToken() {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(ACCESS_TOKEN_EXPIRY_KEY);
}

/**
 * Access Token 만료 여부 확인
 */
export function isAccessTokenExpired(): boolean {
  const expiry = localStorage.getItem(ACCESS_TOKEN_EXPIRY_KEY);
  if (!expiry) return false;
  
  const expiryTime = parseInt(expiry, 10);
  return Date.now() >= expiryTime;
}

/**
 * Access Token이 곧 만료되는지 확인 (만료 5분 전)
 */
export function isAccessTokenExpiringSoon(): boolean {
  const expiry = localStorage.getItem(ACCESS_TOKEN_EXPIRY_KEY);
  if (!expiry) return false;
  
  const expiryTime = parseInt(expiry, 10);
  const fiveMinutes = 5 * 60 * 1000;
  return Date.now() >= expiryTime - fiveMinutes;
}

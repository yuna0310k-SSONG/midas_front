# 토큰 관리 구현 가이드

## 개요
- **Access Token**: localStorage 또는 메모리에 저장 (JS 접근 가능)
- **Refresh Token**: HttpOnly Cookie로만 관리 (JS 접근 불가)
- **credentials: 'include'**: 모든 인증 요청에 필수

## 구현 파일

### 1. `src/lib/token-manager.ts`
Access Token 관리 유틸리티

```typescript
// Access Token 저장
setAccessToken(token, expiryInSeconds);

// Access Token 가져오기
getAccessToken();

// Access Token 삭제
removeAccessToken();

// 만료 여부 확인
isAccessTokenExpired();
isAccessTokenExpiringSoon();
```

### 2. `src/lib/auth-api.ts`
인증 관련 API (credentials: 'include' 필수)

```typescript
// 로그인 (HttpOnly Cookie 자동 전송)
loginAPI(email, password);

// Refresh Token 갱신 (HttpOnly Cookie 자동 전송)
refreshTokenAPI();

// 로그아웃 (HttpOnly Cookie 삭제)
logoutAPI();
```

### 3. `src/lib/api.ts`
Axios 인터셉터로 자동 토큰 관리
- 요청 시 Access Token 자동 추가
- 401 에러 시 자동 Refresh Token 갱신
- 중복 Refresh 요청 방지

### 4. `src/contexts/AuthContext.tsx`
로그인/로그아웃 상태 관리

## 브라우저 동작 확인

### 1. Network 탭 확인
- **로그인 요청**:
  ```
  Request Headers:
    Content-Type: application/json
  
  Response Headers:
    Set-Cookie: refreshToken=xxx; HttpOnly; Secure; SameSite=None
  ```

- **인증 요청**:
  ```
  Request Headers:
    Authorization: Bearer <access_token>
    Cookie: refreshToken=xxx (자동 포함)
  ```

- **401 에러 후 Refresh**:
  ```
  POST /api/auth/refresh
  Request Headers:
    Cookie: refreshToken=xxx (자동 포함)
  
  Response:
    { "accessToken": "new_token", "expiresIn": 3600 }
  ```

### 2. Application 탭 확인
- **Local Storage**: `access_token` 보임 ✅
- **Cookies**: `refreshToken` 보이지 않음 ✅ (HttpOnly)
- **Network 탭에서만 Cookie 확인 가능**

## 백엔드 API 스펙 요구사항

### 1. 로그인 API (`POST /api/auth/login`)
```json
Request:
{
  "email": "user@example.com",
  "password": "password"
}

Response:
{
  "accessToken": "jwt_access_token",
  "expiresIn": 3600,
  "user": {
    "id": "user_id",
    "name": "사용자 이름",
    "email": "user@example.com"
  }
}

Response Headers:
Set-Cookie: refreshToken=<refresh_token>; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=604800
```

### 2. Refresh Token API (`POST /api/auth/refresh`)
```json
Request:
(Headers에 Cookie 자동 포함 - credentials: 'include')

Response:
{
  "accessToken": "new_jwt_access_token",
  "expiresIn": 3600
}

Response Headers (새 refresh token 발급 시):
Set-Cookie: refreshToken=<new_refresh_token>; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=604800
```

### 3. 로그아웃 API (`POST /api/auth/logout`)
```json
Request:
(Headers에 Cookie 자동 포함 - credentials: 'include')

Response:
{
  "message": "로그아웃되었습니다."
}

Response Headers:
Set-Cookie: refreshToken=; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=0
```

## SameSite 설정

### 개발 환경 (localhost)
- `SameSite=Lax` 권장
- `SameSite=None`은 `Secure` 필수 (HTTPS만)

### 프로덕션 환경
- `SameSite=None; Secure` 필수
- Cross-site 쿠키 전송 허용

## 보안 체크리스트

- [x] Access Token은 localStorage에만 저장
- [x] Refresh Token은 HttpOnly Cookie만 사용
- [x] JS에서 `document.cookie`로 refresh token 접근 안 함
- [x] 모든 인증 요청에 `credentials: 'include'` 설정
- [x] 401 에러 시 자동 Refresh Token 갱신
- [x] Refresh Token 만료 시 로그인 페이지로 리다이렉트
- [x] 중복 Refresh 요청 방지
- [x] Network 탭에서만 Cookie 확인 가능

## 테스트 시나리오

1. **로그인**
   - Network 탭에서 `Set-Cookie` 헤더 확인
   - Local Storage에 `access_token` 저장 확인
   - Application 탭 Cookies에서 `refreshToken` 보이지 않음 확인

2. **인증 요청**
   - Authorization 헤더에 Access Token 포함 확인
   - Cookie에 refreshToken 자동 포함 확인

3. **Access Token 만료**
   - 401 에러 발생
   - 자동으로 `/api/auth/refresh` 호출
   - 새 Access Token으로 원래 요청 재시도

4. **Refresh Token 만료**
   - Refresh API 호출 시 401 에러
   - 로그인 페이지로 자동 리다이렉트

5. **로그아웃**
   - 로컬 상태 정리 확인
   - Network 탭에서 `Set-Cookie`로 refreshToken 삭제 확인

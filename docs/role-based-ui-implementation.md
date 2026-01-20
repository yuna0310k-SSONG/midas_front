# Role 기반 UI 분기 구현 가이드

## 구현 완료 사항

### 1. AuthContext에 role 필드 추가
- `User` 인터페이스에 `role?: 'user' | 'admin'` 필드 추가
- JWT 토큰에서 role 추출 로직 추가
- `isAdmin` 헬퍼 함수 제공

### 2. ReviewCard 컴포넌트 개선
- `isAdmin` prop 추가
- `onApprove` 핸들러 prop 추가
- Admin에게만 승인 버튼 표시
- 미승인 리뷰에만 승인 버튼 표시
- 승인된 리뷰는 "승인됨" 배지 표시

### 3. 리뷰 승인 API 함수
- `src/lib/review-api.ts` 파일 생성
- `approveReview()`: 리뷰 승인
- `rejectReview()`: 리뷰 승인 취소
- `getPendingReviews()`: 미승인 리뷰 목록 조회
- `getAllReviews()`: 모든 리뷰 조회 (admin 전용)

### 4. Admin 전용 후기 관리 페이지
- `src/app/admin/reviews/page.tsx` 생성
- 미승인 리뷰 목록 표시
- 승인 버튼으로 즉시 승인 가능
- 권한 확인 (admin이 아니면 접근 불가)
- 승인 후 즉시 UI 업데이트

### 5. 리뷰 페이지 개선
- Admin은 모든 리뷰 조회 (승인/미승인 모두)
- 일반 사용자는 승인된 리뷰만 조회
- Admin에게는 승인 버튼 표시
- 403 에러 처리

### 6. Header에 Admin 메뉴 추가
- Desktop: 우측 상단에 "관리자" 버튼 표시 (admin만)
- Mobile: 모바일 메뉴에 "관리자 페이지" 링크 표시 (admin만)

---

## 백엔드 API 요구사항

### 1. 로그인 API 응답에 role 포함
```json
{
  "accessToken": "...",
  "id": "user-uuid",
  "name": "홍길동",
  "email": "user@example.com",
  "role": "admin" // 또는 "user"
}
```

또는 JWT 토큰 payload에 role 포함:
```json
{
  "sub": "user-uuid",
  "role": "admin",
  "exp": 1234567890
}
```

### 2. 리뷰 승인 API
```
PATCH /reviews/{review_id}/approve
Authorization: Bearer {access_token}
```

**응답:**
```json
{
  "id": "review-uuid",
  "is_approved": true,
  ...
}
```

### 3. 미승인 리뷰 조회 API
```
GET /reviews?is_approved=false
Authorization: Bearer {access_token}
```

**권한:** admin만 접근 가능 (403 Forbidden 반환)

### 4. 모든 리뷰 조회 API (admin 전용)
```
GET /reviews?all=true
Authorization: Bearer {access_token}
```

**권한:** admin만 접근 가능

---

## 사용 방법

### 1. Admin으로 로그인
- 백엔드에서 role이 "admin"인 사용자로 로그인
- JWT 토큰에 role 정보 포함

### 2. 일반 사용자
- `/review` 페이지에서 승인된 리뷰만 조회
- 리뷰 작성 가능 (승인 대기 상태로 저장)

### 3. Admin 사용자
- `/review` 페이지에서 모든 리뷰 조회 가능
- 각 리뷰 카드에 "승인" 버튼 표시 (미승인 리뷰만)
- `/admin/reviews` 페이지에서 미승인 리뷰 일괄 관리
- Header에 "관리자" 버튼 표시

---

## 주요 컴포넌트

### AuthContext
```typescript
const { user, isAdmin, isAuthenticated } = useAuth();
```

### ReviewCard
```typescript
<ReviewCard
  review={review}
  isAdmin={isAdmin}
  onApprove={handleApproveReview}
  onDelete={handleDeleteReview}
/>
```

### Admin 페이지
- 경로: `/admin/reviews`
- 권한: admin만 접근 가능
- 기능: 미승인 리뷰 목록, 승인, 삭제

---

## 에러 처리

### 403 Forbidden
- Admin이 아닌 사용자가 관리자 기능 접근 시
- 에러 메시지: "리뷰 승인 권한이 없습니다."

### 일반 에러
- API 호출 실패 시 Toast로 에러 메시지 표시
- 사용자 친화적인 에러 메시지 제공

---

## 추가 개선 사항 (선택)

1. **승인 확인 모달**
   - 현재는 `confirm()` 사용
   - 커스텀 모달 컴포넌트로 대체 가능

2. **리뷰 거부 기능**
   - `rejectReview()` API 함수는 이미 구현됨
   - UI에 거부 버튼 추가 가능

3. **일괄 승인**
   - 여러 리뷰를 선택하여 한 번에 승인

4. **승인 히스토리**
   - 승인/거부 이력 추적

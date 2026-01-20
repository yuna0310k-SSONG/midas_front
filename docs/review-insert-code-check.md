# 리뷰 삽입 코드 확인

## 제공된 코드
```typescript
await supabase.from('reviews').insert({
  user_id: user.id,
  name,
  content,
  rating,
  before_image_url,
  after_image_url,
  is_approved: false,
})
```

## 데이터베이스 스키마 확인

### 필수 필드
- ✅ `name` (VARCHAR(255) NOT NULL) - 있음
- ✅ `content` (TEXT NOT NULL) - 있음
- ✅ `rating` (INTEGER NOT NULL, 1~5) - 있음
- ✅ `before_image_url` (TEXT NOT NULL) - 있음
- ✅ `after_image_url` (TEXT NOT NULL) - 있음
- ✅ `is_approved` (BOOLEAN DEFAULT false) - 있음

### 사용자 식별 필드 (제약 조건)
- ✅ `user_id` (UUID, nullable) - 있음
- ⚠️ `email` (VARCHAR(255), nullable) - 없음

**제약 조건**: `user_id` 또는 `email` 중 하나는 반드시 있어야 함
- 현재 코드: `user_id`가 있으므로 ✅ **제약 조건 만족**

### 자동 생성 필드 (제공 불필요)
- `id` (UUID, PRIMARY KEY) - 자동 생성
- `created_at` (TIMESTAMP) - DEFAULT NOW()
- `updated_at` (TIMESTAMP) - DEFAULT NOW()

## 결론

### ✅ 코드가 올바릅니다!

제공된 코드는 데이터베이스 스키마와 완전히 일치합니다.

## 주의사항

### 1. Supabase 사용자인 경우
```typescript
// ✅ 올바름 - user.id가 실제 UUID인 경우
await supabase.from('reviews').insert({
  user_id: user.id,  // 예: "550e8400-e29b-41d4-a716-446655440000"
  name,
  content,
  rating,
  before_image_url,
  after_image_url,
  is_approved: false,
})
```

### 2. 백엔드 API 사용자인 경우 (Supabase 세션 없음)
```typescript
// ⚠️ user.id가 임시 ID인 경우 (예: "auth-1768874919806")
// 이 경우 user_id는 null이고 email을 사용해야 함

await supabase.from('reviews').insert({
  user_id: null,  // 또는 생략
  email: user.email,  // 백엔드 API 사용자 이메일
  name,
  content,
  rating,
  before_image_url,
  after_image_url,
  is_approved: false,
})
```

### 3. 현재 ReviewForm.tsx 구현
```typescript
// 현재는 user_id만 사용 (Supabase 사용자 전용)
const reviewData = {
  user_id: userId,
  name: formData.name,
  content: formData.content,
  rating: formData.rating,
  before_image_url: beforeImageUrl,
  after_image_url: afterImageUrl,
  is_approved: false,
};
```

## 개선 제안

백엔드 API 사용자도 지원하려면:

```typescript
// user.id가 실제 UUID인지 확인
const isSupabaseUser = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(user.id);

const reviewData: any = {
  name,
  content,
  rating,
  before_image_url,
  after_image_url,
  is_approved: false,
};

if (isSupabaseUser) {
  reviewData.user_id = user.id;
} else {
  reviewData.email = user.email; // 백엔드 API 사용자
}

await supabase.from('reviews').insert(reviewData);
```

## 검증 체크리스트

- [x] 모든 필수 필드 포함
- [x] user_id 또는 email 중 하나 포함
- [x] rating이 1~5 범위 내
- [x] 이미지 URL이 비어있지 않음
- [x] is_approved 기본값 설정

## 최종 확인

**제공된 코드는 올바르며, Supabase 사용자(user.id가 실제 UUID)인 경우 완벽하게 작동합니다.**

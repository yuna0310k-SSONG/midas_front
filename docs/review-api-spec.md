# 리뷰 작성 API 스펙 문서

## 개요
환자 리뷰 작성 및 수정을 위한 백엔드 API 스펙입니다.

---

## 1. 리뷰 작성 (POST)

### 엔드포인트
```
POST /api/reviews
또는
POST /reviews
```

### 요청 헤더
```
Authorization: Bearer {access_token}
Content-Type: multipart/form-data
```

### 요청 본문 (FormData)

| 필드명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| `name` | string | ✅ | 환자 이름 |
| `content` | string | ✅ | 리뷰 내용 |
| `rating` | number | ✅ | 별점 (1~5) |
| `before_image` | File | ✅ | 시술 전 이미지 파일 |
| `after_image` | File | ✅ | 시술 후 이미지 파일 |

### 요청 예시 (FormData)
```javascript
const formData = new FormData();
formData.append('name', '홍길동');
formData.append('content', '정말 만족스러운 치료였습니다.');
formData.append('rating', '5');
formData.append('before_image', beforeImageFile);
formData.append('after_image', afterImageFile);
```

### 요청 예시 (JSON - 이미지 URL 방식)
```json
{
  "name": "홍길동",
  "content": "정말 만족스러운 치료였습니다.",
  "rating": 5,
  "before_image_url": "https://example.com/images/before.jpg",
  "after_image_url": "https://example.com/images/after.jpg"
}
```

### 성공 응답 (201 Created)
```json
{
  "id": "uuid-string",
  "user_id": "user-uuid",
  "name": "홍길동",
  "content": "정말 만족스러운 치료였습니다.",
  "rating": 5,
  "before_image_url": "https://example.com/images/before.jpg",
  "after_image_url": "https://example.com/images/after.jpg",
  "is_approved": false,
  "created_at": "2024-01-20T10:30:00Z",
  "updated_at": "2024-01-20T10:30:00Z"
}
```

### 에러 응답 (400 Bad Request)
```json
{
  "error": "Validation failed",
  "message": "이름을 입력해주세요.",
  "details": {
    "field": "name",
    "reason": "required"
  }
}
```

### 에러 응답 (401 Unauthorized)
```json
{
  "error": "Unauthorized",
  "message": "로그인이 필요합니다."
}
```

---

## 2. 리뷰 수정 (PUT/PATCH)

### 엔드포인트
```
PUT /api/reviews/{review_id}
또는
PATCH /api/reviews/{review_id}
```

### 요청 헤더
```
Authorization: Bearer {access_token}
Content-Type: multipart/form-data
```

### 요청 본문 (FormData)

| 필드명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| `name` | string | ✅ | 환자 이름 |
| `content` | string | ✅ | 리뷰 내용 |
| `rating` | number | ✅ | 별점 (1~5) |
| `before_image` | File | ❌ | 시술 전 이미지 파일 (변경 시만) |
| `after_image` | File | ❌ | 시술 후 이미지 파일 (변경 시만) |
| `before_image_url` | string | ❌ | 기존 시술 전 이미지 URL (이미지 변경 안 할 경우) |
| `after_image_url` | string | ❌ | 기존 시술 후 이미지 URL (이미지 변경 안 할 경우) |

### 요청 예시
```javascript
const formData = new FormData();
formData.append('name', '홍길동');
formData.append('content', '수정된 리뷰 내용입니다.');
formData.append('rating', '4');
// 이미지 변경 시
formData.append('before_image', newBeforeImageFile);
// 이미지 변경 안 할 경우
formData.append('before_image_url', existingBeforeImageUrl);
```

### 성공 응답 (200 OK)
```json
{
  "id": "uuid-string",
  "user_id": "user-uuid",
  "name": "홍길동",
  "content": "수정된 리뷰 내용입니다.",
  "rating": 4,
  "before_image_url": "https://example.com/images/before.jpg",
  "after_image_url": "https://example.com/images/after.jpg",
  "is_approved": false,
  "created_at": "2024-01-20T10:30:00Z",
  "updated_at": "2024-01-20T11:00:00Z"
}
```

### 에러 응답 (403 Forbidden)
```json
{
  "error": "Forbidden",
  "message": "본인의 리뷰만 수정할 수 있습니다."
}
```

### 에러 응답 (404 Not Found)
```json
{
  "error": "Not Found",
  "message": "리뷰를 찾을 수 없습니다."
}
```

---

## 3. 리뷰 삭제 (DELETE)

### 엔드포인트
```
DELETE /api/reviews/{review_id}
```

### 요청 헤더
```
Authorization: Bearer {access_token}
```

### 성공 응답 (200 OK)
```json
{
  "message": "리뷰가 삭제되었습니다."
}
```

### 에러 응답 (403 Forbidden)
```json
{
  "error": "Forbidden",
  "message": "본인의 리뷰만 삭제할 수 있습니다."
}
```

---

## 4. 리뷰 목록 조회 (GET)

### 엔드포인트
```
GET /api/reviews?is_approved=true&order=created_at.desc
```

### 쿼리 파라미터

| 파라미터 | 타입 | 필수 | 기본값 | 설명 |
|----------|------|------|-------|------|
| `is_approved` | boolean | ❌ | true | 승인된 리뷰만 조회 |
| `order` | string | ❌ | created_at.desc | 정렬 순서 |
| `limit` | number | ❌ | 50 | 조회 개수 제한 |
| `offset` | number | ❌ | 0 | 페이지 오프셋 |

### 요청 헤더
```
Authorization: Bearer {access_token} (선택사항)
```

### 성공 응답 (200 OK)
```json
{
  "data": [
    {
      "id": "uuid-string",
      "user_id": "user-uuid",
      "name": "홍길동",
      "content": "정말 만족스러운 치료였습니다.",
      "rating": 5,
      "before_image_url": "https://example.com/images/before.jpg",
      "after_image_url": "https://example.com/images/after.jpg",
      "is_approved": true,
      "created_at": "2024-01-20T10:30:00Z",
      "updated_at": "2024-01-20T10:30:00Z"
    }
  ],
  "total": 100,
  "limit": 50,
  "offset": 0
}
```

---

## 5. 이미지 업로드 (선택사항)

이미지를 별도로 업로드하는 경우:

### 엔드포인트
```
POST /api/reviews/upload-image
```

### 요청 헤더
```
Authorization: Bearer {access_token}
Content-Type: multipart/form-data
```

### 요청 본문 (FormData)
```javascript
const formData = new FormData();
formData.append('image', imageFile);
formData.append('type', 'before'); // 또는 'after'
```

### 성공 응답 (200 OK)
```json
{
  "image_url": "https://example.com/images/uploaded-image.jpg",
  "path": "reviews/user-id/timestamp_before.jpg"
}
```

---

## 데이터 타입 정의

### Review 인터페이스
```typescript
interface Review {
  id: string;                    // UUID
  user_id: string;               // 사용자 UUID
  name: string;                  // 환자 이름
  content: string;               // 리뷰 내용
  rating: number;                // 별점 (1~5)
  before_image_url: string;      // 시술 전 이미지 URL
  after_image_url: string;       // 시술 후 이미지 URL
  is_approved: boolean;          // 관리자 승인 여부
  created_at: string;            // ISO 8601 형식
  updated_at: string;            // ISO 8601 형식
}
```

### ReviewFormData 인터페이스
```typescript
interface ReviewFormData {
  name: string;                  // 환자 이름
  content: string;               // 리뷰 내용
  rating: number;                // 별점 (1~5)
  before_image: File | null;     // 시술 전 이미지 파일
  after_image: File | null;      // 시술 후 이미지 파일
}
```

---

## 유효성 검사 규칙

### 필수 필드
- `name`: 비어있지 않아야 함
- `content`: 비어있지 않아야 함
- `rating`: 1~5 사이의 정수
- `before_image`: 새 리뷰 작성 시 필수
- `after_image`: 새 리뷰 작성 시 필수

### 이미지 파일 제한
- 파일 형식: `image/*` (jpg, png, gif, webp 등)
- 권장 최대 크기: 5MB
- 권장 해상도: 최소 800x600px

---

## 인증 및 권한

### 인증
- 모든 리뷰 작성/수정/삭제 작업은 인증된 사용자만 가능
- `Authorization: Bearer {access_token}` 헤더 필요

### 권한
- **리뷰 작성**: 인증된 모든 사용자
- **리뷰 수정**: 본인이 작성한 리뷰만
- **리뷰 삭제**: 본인이 작성한 리뷰만
- **리뷰 조회**: 승인된 리뷰는 모든 사용자, 미승인 리뷰는 작성자만

---

## 에러 코드

| HTTP 상태 코드 | 설명 |
|---------------|------|
| 200 | 성공 |
| 201 | 생성 성공 |
| 400 | 잘못된 요청 (유효성 검사 실패) |
| 401 | 인증 필요 |
| 403 | 권한 없음 |
| 404 | 리소스를 찾을 수 없음 |
| 413 | 파일 크기 초과 |
| 415 | 지원하지 않는 파일 형식 |
| 500 | 서버 오류 |

---

## 구현 참고사항

### 프론트엔드에서 백엔드 API 호출 예시

```typescript
// 리뷰 작성
const createReview = async (formData: ReviewFormData, userId: string) => {
  const data = new FormData();
  data.append('name', formData.name);
  data.append('content', formData.content);
  data.append('rating', formData.rating.toString());
  data.append('before_image', formData.before_image!);
  data.append('after_image', formData.after_image!);

  const response = await fetch('https://midas-back.fly.dev/api/reviews', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: data,
  });

  if (!response.ok) {
    throw new Error('리뷰 작성에 실패했습니다.');
  }

  return response.json();
};
```

### 이미지 URL 방식 사용 시

```typescript
// 1. 이미지 먼저 업로드
const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);
  
  const response = await fetch('https://midas-back.fly.dev/api/reviews/upload-image', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: formData,
  });
  
  const { image_url } = await response.json();
  return image_url;
};

// 2. 리뷰 작성 (이미지 URL 포함)
const createReview = async (formData: ReviewFormData, userId: string) => {
  const beforeImageUrl = await uploadImage(formData.before_image!);
  const afterImageUrl = await uploadImage(formData.after_image!);

  const response = await fetch('https://midas-back.fly.dev/api/reviews', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: formData.name,
      content: formData.content,
      rating: formData.rating,
      before_image_url: beforeImageUrl,
      after_image_url: afterImageUrl,
    }),
  });

  return response.json();
};
```

---

## 현재 프론트엔드 구현 상태

### 현재 동작
- Supabase를 직접 사용하여 리뷰 저장
- 이미지는 Supabase Storage에 업로드
- `review-images` 버킷 사용

### 백엔드 API로 전환 시 필요한 작업
1. `ReviewForm.tsx`의 `handleSubmit` 함수 수정
2. 이미지 업로드 로직을 백엔드 API로 변경
3. 리뷰 CRUD 작업을 백엔드 API로 변경
4. 에러 처리 로직 추가

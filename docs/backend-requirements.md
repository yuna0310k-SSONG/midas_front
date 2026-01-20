# 백엔드 API 구현 요구사항 (프롬프트)

## 개요
프론트엔드가 요구하는 백엔드 API 엔드포인트 및 구현 사항입니다.

## ⚠️ 중요: Supabase 데이터베이스 스키마 확인 필요

**현재 Supabase `reviews` 테이블 상태:**
- ✅ `id`, `user_id`, `rating`, `content`, `before_image_url`, `after_image_url`, `is_approved`, `created_at`, `updated_at` 컬럼 존재
- ❌ `name` 컬럼 **없음** (추가 필요)
- ❌ `email` 컬럼 **없음** (추가 필요)
- ⚠️ `images` (text[]) 컬럼은 있지만 프론트엔드에서 사용하지 않음

**필수 작업:**
1. Supabase Dashboard → SQL Editor에서 `add-name-column.sql` 실행
2. `email` 컬럼도 추가 필요 (백엔드 API 사용자 지원)
3. 또는 `supabase-schema.sql` 전체를 실행하여 완전한 스키마 생성

**스키마 업데이트 전에는 리뷰 작성 시 오류가 발생합니다:**
- "Could not find the 'name' column of 'reviews' in the schema cache"
- "Could not find the 'email' column of 'reviews' in the schema cache"

---

## 1. 인증 API

### 1.1 로그인 (POST)
**엔드포인트 (우선순위 순):**
- `POST /api/auth/login` (권장)
- `POST /auth/login`
- `POST /api/users/login`
- `POST /users/login`

**요청:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**응답:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 3600,
  "id": "user-uuid",
  "name": "홍길동",
  "email": "user@example.com"
}
```

**요구사항:**
- `accessToken`을 응답 본문에 포함하여 반환
- `refreshToken`을 **HttpOnly Cookie**로 설정 (JavaScript 접근 불가)
- Cookie 설정: `httpOnly: true`, `secure: true` (HTTPS), `sameSite: 'none'` 또는 `'lax'`
- 응답 헤더에 `Set-Cookie` 포함

**Cookie 설정 예시:**
```
Set-Cookie: refreshToken=<token>; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=604800
```

---

### 1.2 Refresh Token (POST)
**엔드포인트 (우선순위 순):**
- `POST /api/auth/refresh` (권장)
- `POST /auth/refresh`
- `POST /api/auth/token/refresh`

**요청:**
- Cookie에 `refreshToken` 포함 (자동 전송, credentials: 'include')

**응답:**
```json
{
  "accessToken": "new-access-token...",
  "expiresIn": 3600
}
```

**요구사항:**
- Cookie에서 `refreshToken` 읽기
- 새 `accessToken` 발급 및 반환
- 새 `refreshToken`을 HttpOnly Cookie로 갱신 (선택사항)

---

### 1.3 로그아웃 (POST)
**엔드포인트 (우선순위 순):**
- `POST /api/auth/logout` (권장)
- `POST /auth/logout`
- `POST /api/users/logout`

**요청:**
- Cookie에 `refreshToken` 포함

**응답:**
- 200 OK (성공)

**요구사항:**
- HttpOnly Cookie의 `refreshToken` 삭제
- Cookie 만료 설정: `Max-Age=0` 또는 `Expires=Thu, 01 Jan 1970 00:00:00 GMT`

---

## 2. 리뷰 API

### 2.1 리뷰 작성 (POST)
**엔드포인트:**
```
POST /reviews
```

**요청:**
- Content-Type: `multipart/form-data`
- Authorization: `Bearer {access_token}`

**FormData 필드:**
| 필드명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| `name` | string | ✅ | 환자 이름 (Supabase 테이블에 `name` 컬럼 추가 필요) |
| `content` | string | ✅ | 리뷰 내용 |
| `rating` | **number** | ✅ | 별점 (1~5 정수) |
| `before_image` | File | ✅ | 시술 전 이미지 파일 |
| `after_image` | File | ✅ | 시술 후 이미지 파일 |

**⚠️ 중요: Supabase 데이터베이스 스키마 확인**
현재 Supabase `reviews` 테이블에는 다음 컬럼이 **없습니다**:
- `name` 컬럼 (추가 필요)
- `email` 컬럼 (추가 필요)

**현재 Supabase 테이블 구조:**
- `id` (uuid, PK)
- `user_id` (uuid, nullable, FK → auth.users)
- `rating` (int4)
- `content` (text)
- `images` (text[]) - **프론트엔드에서 사용하지 않음**
- `created_at` (timestamptz)
- `updated_at` (timestamptz)
- `before_image_url` (text)
- `after_image_url` (text)
- `is_approved` (bool)

**필요한 작업:**
1. Supabase Dashboard → SQL Editor에서 `add-name-column.sql` 실행하여 `name` 컬럼 추가
2. `email` 컬럼도 추가 필요 (백엔드 API 사용자 지원)
3. 또는 `supabase-schema.sql` 전체를 실행하여 완전한 스키마 생성

**⚠️ 중요: FormData 파싱 주의사항**
- FormData는 **모든 값을 문자열로 전송**합니다
- `rating` 필드는 문자열 `"5"`로 전송되지만, 백엔드에서 **숫자로 변환**해야 합니다
- 예: `parseInt(req.body.rating, 10)` 또는 `Number(req.body.rating)`

**Python (FastAPI) 예시:**
```python
@app.post("/reviews")
async def create_review(
    name: str = Form(...),
    content: str = Form(...),
    rating: int = Form(...),  # FastAPI가 자동으로 문자열을 int로 변환
    before_image: UploadFile = File(...),
    after_image: UploadFile = File(...),
):
    # rating은 이미 int 타입으로 변환됨
    if rating < 1 or rating > 5:
        raise HTTPException(status_code=400, detail="별점은 1~5 사이여야 합니다.")
    ...
```

**Node.js (Express + multer) 예시:**
```javascript
app.post('/reviews', upload.fields([
  { name: 'before_image', maxCount: 1 },
  { name: 'after_image', maxCount: 1 }
]), (req, res) => {
  const rating = parseInt(req.body.rating, 10); // ⚠️ 문자열을 숫자로 변환 필수!
  // 또는
  // const rating = Number(req.body.rating);
  
  if (isNaN(rating) || rating < 1 || rating > 5) {
    return res.status(400).json({ 
      error: 'Validation failed',
      message: '별점은 1~5 사이의 정수여야 합니다.',
      details: ['별점은 5 이하여야 합니다.', '별점은 1 이상이어야 합니다.', '별점은 정수여야 합니다.']
    });
  }
  ...
});
```

**응답 (201 Created):**
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

**⚠️ 주의: Supabase 저장 시**
- 백엔드에서 Supabase에 저장할 때 `name`과 `email` 컬럼이 없으면 오류 발생
- `name` 컬럼이 없으면: "Could not find the 'name' column of 'reviews' in the schema cache"
- `email` 컬럼이 없으면: "Could not find the 'email' column of 'reviews' in the schema cache"
- 백엔드에서 Supabase에 저장하기 전에 해당 컬럼이 존재하는지 확인하거나, 프론트엔드에서 먼저 스키마를 업데이트하도록 안내

**에러 응답 (400 Bad Request):**
```json
{
  "error": "Validation failed",
  "message": "유효성 검사 실패",
  "details": [
    "별점은 1 이상이어야 합니다.",
    "별점은 5 이하여야 합니다.",
    "별점은 정수여야 합니다."
  ]
}
```

---

### 2.2 리뷰 수정 (PUT/PATCH)
**엔드포인트:**
```
PUT /reviews/{review_id}
```

**요청:**
- Content-Type: `multipart/form-data` (이미지 변경 시) 또는 `application/json` (텍스트만 변경 시)
- Authorization: `Bearer {access_token}`

**FormData 필드 (이미지 변경 시):**
| 필드명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| `name` | string | ✅ | 환자 이름 |
| `content` | string | ✅ | 리뷰 내용 |
| `rating` | **number** | ✅ | 별점 (1~5 정수) - **문자열을 숫자로 변환 필수** |
| `before_image` | File | ❌ | 시술 전 이미지 (변경 시만) |
| `after_image` | File | ❌ | 시술 후 이미지 (변경 시만) |
| `before_image_url` | string | ❌ | 기존 이미지 URL (변경 안 할 경우) |
| `after_image_url` | string | ❌ | 기존 이미지 URL (변경 안 할 경우) |

**또는 JSON (텍스트만 변경 시):**
```
PUT /reviews/{review_id}/with-urls
```
```json
{
  "name": "홍길동",
  "content": "수정된 리뷰 내용",
  "rating": 4,
  "before_image_url": "https://example.com/before.jpg",
  "after_image_url": "https://example.com/after.jpg"
}
```

---

### 2.3 리뷰 삭제 (DELETE)
**엔드포인트:**
```
DELETE /reviews/{review_id}
```

**요청:**
- Authorization: `Bearer {access_token}`

**응답:**
- 200 OK (성공)
```json
{
  "message": "리뷰가 삭제되었습니다."
}
```

---

### 2.4 리뷰 목록 조회 (GET)
**엔드포인트:**
```
GET /reviews?is_approved=true&order=created_at.desc&limit=50&offset=0
```

**쿼리 파라미터:**
| 파라미터 | 타입 | 필수 | 기본값 | 설명 |
|----------|------|------|-------|------|
| `is_approved` | boolean | ❌ | true | 승인된 리뷰만 조회 |
| `order` | string | ❌ | created_at.desc | 정렬 순서 |
| `limit` | number | ❌ | 50 | 조회 개수 제한 |
| `offset` | number | ❌ | 0 | 페이지 오프셋 |

**응답 (200 OK):**
```json
{
  "data": [
    {
      "id": "uuid-string",
      "user_id": "user-uuid",
      "name": "홍길동",
      "content": "리뷰 내용",
      "rating": 5,
      "before_image_url": "https://example.com/before.jpg",
      "after_image_url": "https://example.com/after.jpg",
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

**참고:**
- Supabase 테이블에 `images` (text[]) 컬럼이 있지만, 프론트엔드는 `before_image_url`과 `after_image_url`을 사용합니다.
- 백엔드에서 `images` 배열을 사용할 수도 있지만, 현재 프론트엔드와의 호환성을 위해 `before_image_url`과 `after_image_url`을 사용하는 것을 권장합니다.

---

## 3. 이미지 업로드 (선택사항)

### 3.1 이미지 업로드 (POST)
**엔드포인트:**
```
POST /api/reviews/upload-image
```

**요청:**
- Content-Type: `multipart/form-data`
- Authorization: `Bearer {access_token}`

**FormData:**
- `image`: File (이미지 파일)
- `type`: string (선택) - "before" 또는 "after"

**응답:**
```json
{
  "image_url": "https://example.com/images/uploaded-image.jpg",
  "path": "reviews/user-id/timestamp_before.jpg"
}
```

---

## 4. CORS 설정

**요구사항:**
- `Access-Control-Allow-Origin`: 프론트엔드 도메인 (예: `http://localhost:3000`, `https://yourdomain.com`)
- `Access-Control-Allow-Credentials`: `true` (HttpOnly Cookie 전송 필수)
- `Access-Control-Allow-Methods`: `GET, POST, PUT, DELETE, OPTIONS`
- `Access-Control-Allow-Headers`: `Content-Type, Authorization`

**예시:**
```javascript
// Express.js
app.use(cors({
  origin: ['http://localhost:3000', 'https://yourdomain.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
```

---

## 5. 인증 미들웨어

**요구사항:**
- Authorization 헤더에서 Bearer 토큰 추출
- Access Token 검증
- 만료된 토큰은 401 Unauthorized 반환

**예시:**
```javascript
// Express.js
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized', message: '토큰이 필요합니다.' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized', message: '유효하지 않은 토큰입니다.' });
    }
    req.user = user;
    next();
  });
}
```

---

## 6. 권한 검사

**요구사항:**
- 리뷰 작성: 인증된 사용자
- 리뷰 수정/삭제: 본인이 작성한 리뷰만
- 리뷰 조회: 승인된 리뷰는 모든 사용자, 미승인 리뷰는 작성자만

---

## 7. 에러 응답 형식

**표준 에러 응답:**
```json
{
  "error": "ErrorType",
  "message": "사용자에게 표시할 메시지",
  "details": ["상세 에러 1", "상세 에러 2"]
}
```

**HTTP 상태 코드:**
- 200: 성공
- 201: 생성 성공
- 400: 잘못된 요청 (유효성 검사 실패)
- 401: 인증 필요
- 403: 권한 없음
- 404: 리소스를 찾을 수 없음
- 500: 서버 오류

---

## 8. 중요 체크리스트

### 필수 구현 사항
- [ ] 로그인 API (`/api/auth/login` 또는 `/auth/login`)
- [ ] Refresh Token API (`/api/auth/refresh`)
- [ ] 로그아웃 API (`/api/auth/logout`)
- [ ] 리뷰 작성 API (`POST /reviews`) - **FormData의 `rating`을 숫자로 파싱 필수**
- [ ] 리뷰 수정 API (`PUT /reviews/{id}`)
- [ ] 리뷰 삭제 API (`DELETE /reviews/{id}`)
- [ ] 리뷰 조회 API (`GET /reviews`)

### Supabase 데이터베이스 스키마 확인
- [ ] `reviews` 테이블에 `name` 컬럼 추가 (VARCHAR(255) NOT NULL)
- [ ] `reviews` 테이블에 `email` 컬럼 추가 (VARCHAR(255), nullable)
- [ ] `user_id_or_email_check` 제약조건 추가 (user_id 또는 email 중 하나 필수)
- [ ] RLS (Row Level Security) 정책 설정 확인

### 보안 요구사항
- [ ] Refresh Token을 HttpOnly Cookie로 설정
- [ ] CORS 설정 (`credentials: true`)
- [ ] Access Token 검증 미들웨어
- [ ] 권한 검사 (본인 리뷰만 수정/삭제)

### 데이터 처리
- [ ] FormData에서 받은 `rating` 문자열을 숫자로 변환
- [ ] 이미지 파일 저장 및 URL 생성
- [ ] 유효성 검사 (rating 1~5, 필수 필드 확인)

---

## 9. 테스트 방법

**브라우저 개발자 도구에서 확인:**
1. Network 탭 → 로그인 요청
2. Response Headers → `Set-Cookie` 확인 (HttpOnly Cookie)
3. Application 탭 → Cookies → HttpOnly Cookie는 보이지 않음 (정상)
4. 리뷰 작성 요청 → FormData의 `rating`이 숫자로 처리되는지 확인

**Postman 테스트:**
- 로그인: Body → form-data 또는 raw (JSON)
- Cookie 확인: Response Cookies 탭
- 리뷰 작성: Body → form-data (파일 포함)

---

## 10. 참고사항

### FormData 숫자 파싱 (매우 중요!)
FormData는 모든 값을 문자열로 전송하므로, 백엔드에서 반드시 숫자로 변환해야 합니다.

**❌ 잘못된 예:**
```javascript
// 문자열 "5"를 그대로 사용 → 유효성 검사 실패
const rating = req.body.rating; // "5" (문자열)
if (rating < 1 || rating > 5) { ... } // 문자열 비교로 오류
```

**✅ 올바른 예:**
```javascript
// 문자열을 숫자로 변환
const rating = parseInt(req.body.rating, 10); // 5 (숫자)
// 또는
const rating = Number(req.body.rating);
if (isNaN(rating) || rating < 1 || rating > 5) {
  return res.status(400).json({ error: 'Invalid rating' });
}
```

---

## 문의
프론트엔드 개발자에게 문의:
- API 엔드포인트가 위와 다를 경우 알려주세요
- 추가 요구사항이 있으면 알려주세요

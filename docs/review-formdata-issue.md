# 리뷰 작성 FormData 이슈 해결 가이드

## 문제 상황
백엔드 API에 FormData로 리뷰를 전송할 때 400 Bad Request 오류 발생:
- "별점은 5 이하여야 합니다."
- "별점은 1 이상이어야 합니다."
- "별점은 정수여야 합니다."

## 원인
FormData는 **모든 값을 문자열로 변환**합니다. 
- `formData.append('rating', '5')` → 백엔드에 문자열 `"5"`로 전송
- 백엔드가 숫자 타입을 기대하지만 문자열을 받아서 유효성 검사 실패

## 해결 방법

### 방법 1: 백엔드에서 문자열을 숫자로 파싱 (권장)
백엔드에서 FormData를 파싱할 때 `rating` 필드를 숫자로 변환:

```python
# Python (FastAPI 예시)
rating = int(form_data.get('rating'))
# 또는
rating = float(form_data.get('rating'))
```

```javascript
// Node.js (Express 예시)
const rating = parseInt(req.body.rating, 10);
// 또는
const rating = Number(req.body.rating);
```

### 방법 2: 프론트엔드에서 JSON + 이미지 분리 전송
이미지는 별도로 업로드하고, 리뷰 데이터는 JSON으로 전송:

```typescript
// 1. 이미지 먼저 업로드
const beforeImageUrl = await uploadImage(formData.before_image);
const afterImageUrl = await uploadImage(formData.after_image);

// 2. 리뷰 데이터를 JSON으로 전송 (숫자 타입 유지)
await api.post('/reviews', {
  name: formData.name,
  content: formData.content,
  rating: formData.rating, // 숫자 타입 유지
  before_image_url: beforeImageUrl,
  after_image_url: afterImageUrl,
});
```

### 방법 3: 백엔드 API 수정 요청
백엔드 개발자에게 다음을 요청:

1. FormData에서 받은 문자열을 숫자로 자동 파싱
2. 또는 별도의 엔드포인트 제공 (JSON + 이미지 URL 방식)

## 현재 프론트엔드 코드
```typescript
// FormData는 모든 값을 문자열로 변환
formDataToSend.append('rating', String(formData.rating));
// → 백엔드에 문자열 "5"로 전송됨
```

## 백엔드 수정 예시

### FastAPI
```python
from fastapi import Form, File, UploadFile
from pydantic import BaseModel

class ReviewCreate(BaseModel):
    name: str
    content: str
    rating: int  # 숫자 타입
    before_image_url: str
    after_image_url: str

@app.post("/reviews")
async def create_review(
    name: str = Form(...),
    content: str = Form(...),
    rating: int = Form(...),  # Form()이 자동으로 문자열을 숫자로 변환
    before_image: UploadFile = File(...),
    after_image: UploadFile = File(...),
):
    # rating은 이미 int 타입으로 변환됨
    ...
```

### Express.js
```javascript
const multer = require('multer');
const upload = multer();

app.post('/reviews', upload.fields([
  { name: 'before_image', maxCount: 1 },
  { name: 'after_image', maxCount: 1 }
]), (req, res) => {
  const rating = parseInt(req.body.rating, 10); // 문자열을 숫자로 변환
  // 또는
  const rating = Number(req.body.rating);
  
  if (isNaN(rating) || rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Invalid rating' });
  }
  ...
});
```

## 권장 사항
**백엔드에서 FormData의 문자열을 숫자로 파싱하는 것이 가장 좋은 해결책입니다.**

FormData는 파일 업로드에 최적화되어 있으며, 모든 값을 문자열로 변환하는 것이 표준 동작입니다.

# 이미지 업로드 파일명 생성 로직

## 구현 완료

### 파일명 생성 규칙
- **폴더명(파일명)**: `user.name + phone` (예: `홍길동01012345678`)
- **이미지명**: `이름_before.jpg` 또는 `이름_after.jpg` (예: `홍길동_before.jpg`, `홍길동_after.jpg`)
- **전체 경로**: `폴더명/이미지명` (예: `홍길동01012345678/홍길동_before.jpg`)

### 구현 내용

1. **Supabase Storage 직접 업로드**
   - 프론트엔드에서 Supabase Storage에 직접 이미지 업로드
   - 업로드 후 Public URL을 받아서 백엔드 API로 전송

2. **파일명 생성 함수**
   ```typescript
   generateFileName(type: "before" | "after", originalFileName: string)
   ```
   - 사용자 이름: `formData.name` 또는 `user.name`
   - 전화번호: API에서 가져온 `phone` (하이픈, 공백 제거)
   - 파일 확장자: 원본 파일의 확장자 유지

3. **전화번호 가져오기**
   - `/users/me` API에서 `phone`, `phoneNumber`, `telephone` 필드 확인
   - 없으면 phone 없이 파일명 생성 (폴더명: `이름`만)

4. **파일명 정리**
   - 한글, 영문, 숫자만 허용
   - 특수문자 제거 (`sanitizeFileName` 함수)

### 업로드 프로세스

1. 사용자가 이미지 선택
2. 폼 제출 시:
   - 전화번호 가져오기 (이미 로드됨)
   - `generateFileName()`으로 파일명 생성
   - Supabase Storage에 업로드
   - Public URL 받기
   - 백엔드 API로 리뷰 데이터 + 이미지 URL 전송

### 예시

**사용자 정보:**
- 이름: `홍길동`
- 전화번호: `010-1234-5678`

**생성되는 파일 경로:**
- 시술 전: `홍길동01012345678/홍길동_before.jpg`
- 시술 후: `홍길동01012345678/홍길동_after.jpg`

### 주의사항

1. **전화번호가 없는 경우**
   - 폴더명: `이름`만 사용 (예: `홍길동/홍길동_before.jpg`)

2. **같은 파일명 업로드**
   - `upsert: true`로 설정하여 덮어쓰기 허용

3. **한글 파일명**
   - Supabase Storage는 한글 파일명을 지원하지만, URL 인코딩이 필요할 수 있음

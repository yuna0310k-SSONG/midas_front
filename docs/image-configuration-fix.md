# 이미지 설정 수정 완료

## 수정 사항

### 1. next.config.ts 업데이트
- Supabase 이미지 도메인을 `remotePatterns`에 추가
- `swbvcxcoatajeejuelay.supabase.co` 도메인 허용

### 2. ReviewCard 컴포넌트 개선
- Supabase 이미지의 경우 `unoptimized` 옵션 추가
- 이미지가 없을 때 fallback UI 추가

### 3. 리뷰 페이지에 Admin 기능 추가
- Admin 전용 "미승인 리뷰 관리" 버튼 추가
- Admin은 모든 리뷰 조회 가능
- 일반 사용자는 승인된 리뷰만 조회

## 개발 서버 재시작 필요

`next.config.ts` 파일을 수정했으므로 **개발 서버를 재시작**해야 합니다:

1. 현재 실행 중인 개발 서버 중지 (Ctrl+C)
2. `npm run dev` 또는 `yarn dev` 다시 실행

## 확인 사항

- ✅ 리뷰 사진이 정상적으로 표시되는지
- ✅ Admin 계정에서 "미승인 리뷰 관리" 버튼이 보이는지
- ✅ Admin이 미승인 리뷰를 승인하면 일반 사용자에게도 보이는지

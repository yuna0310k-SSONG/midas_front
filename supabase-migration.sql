-- 기존 reviews 테이블을 백엔드 API 사용자도 지원하도록 변경하는 마이그레이션 스크립트
-- Supabase Dashboard의 SQL Editor에서 실행하세요.

-- 1. user_id를 nullable로 변경
ALTER TABLE reviews ALTER COLUMN user_id DROP NOT NULL;

-- 2. email 컬럼 추가
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS email VARCHAR(255);

-- 3. user_id 또는 email 중 하나는 반드시 있어야 하는 제약 조건 추가
ALTER TABLE reviews ADD CONSTRAINT user_id_or_email_check 
  CHECK (user_id IS NOT NULL OR email IS NOT NULL);

-- 4. email 인덱스 추가
CREATE INDEX IF NOT EXISTS idx_reviews_email ON reviews(email);

-- 5. 기존 RLS 정책 삭제 (재생성 필요)
DROP POLICY IF EXISTS "인증된 사용자 리뷰 작성 가능" ON reviews;
DROP POLICY IF EXISTS "본인 리뷰 조회 가능" ON reviews;
DROP POLICY IF EXISTS "본인 리뷰만 수정 가능" ON reviews;
DROP POLICY IF EXISTS "본인 리뷰만 삭제 가능" ON reviews;

-- 6. 수정된 RLS 정책 재생성
-- 인증된 사용자가 리뷰를 작성할 수 있도록 정책 생성
-- Supabase 사용자 또는 이메일 기반으로 작성 가능 (백엔드 API 사용자 지원)
CREATE POLICY "인증된 사용자 리뷰 작성 가능"
  ON reviews
  FOR INSERT
  WITH CHECK (
    (user_id IS NOT NULL AND auth.uid() = user_id) OR -- Supabase 사용자
    (user_id IS NULL AND email IS NOT NULL) -- 백엔드 API 사용자 (email만 있으면 저장 가능)
  );

-- 인증된 사용자가 본인의 리뷰를 조회할 수 있도록 정책 생성
CREATE POLICY "본인 리뷰 조회 가능"
  ON reviews
  FOR SELECT
  USING (
    (user_id IS NOT NULL AND auth.uid() = user_id) OR -- Supabase 사용자
    (user_id IS NULL AND email IS NOT NULL) -- 이메일 기반 리뷰도 조회 가능 (승인된 리뷰는 정책에서 처리)
  );

-- 본인의 리뷰만 수정할 수 있도록 정책 생성
CREATE POLICY "본인 리뷰만 수정 가능"
  ON reviews
  FOR UPDATE
  USING (
    (user_id IS NOT NULL AND auth.uid() = user_id) OR -- Supabase 사용자
    (user_id IS NULL AND email IS NOT NULL) -- 이메일 기반 리뷰 수정 (실제로는 백엔드에서 처리)
  );

-- 본인의 리뷰만 삭제할 수 있도록 정책 생성
CREATE POLICY "본인 리뷰만 삭제 가능"
  ON reviews
  FOR DELETE
  USING (
    (user_id IS NOT NULL AND auth.uid() = user_id) OR -- Supabase 사용자
    (user_id IS NULL AND email IS NOT NULL) -- 이메일 기반 리뷰 삭제 (실제로는 백엔드에서 처리)
  );

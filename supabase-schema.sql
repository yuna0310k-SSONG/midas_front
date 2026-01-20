-- Supabase 리뷰 테이블 생성 SQL
-- Supabase Dashboard의 SQL Editor에서 실행하세요.

-- reviews 테이블 생성
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE, -- nullable로 변경 (백엔드 API 사용자 지원)
  email VARCHAR(255), -- 백엔드 API 사용자를 위한 이메일 필드 추가
  name VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  before_image_url TEXT NOT NULL,
  after_image_url TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- user_id 또는 email 중 하나는 반드시 있어야 함
  CONSTRAINT user_id_or_email_check CHECK (user_id IS NOT NULL OR email IS NOT NULL)
);

-- 인덱스 생성 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_reviews_is_approved ON reviews(is_approved);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_email ON reviews(email);

-- Row Level Security (RLS) 정책 설정
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 승인된 리뷰를 조회할 수 있도록 정책 생성
CREATE POLICY "승인된 리뷰는 모두 조회 가능"
  ON reviews
  FOR SELECT
  USING (is_approved = true);

-- 인증된 사용자가 본인의 리뷰를 조회할 수 있도록 정책 생성
-- Supabase 사용자는 user_id로, 백엔드 API 사용자는 email로 확인
CREATE POLICY "본인 리뷰 조회 가능"
  ON reviews
  FOR SELECT
  USING (
    auth.uid() = user_id OR 
    (user_id IS NULL AND email = (SELECT email FROM auth.users WHERE id = auth.uid()))
  );

-- 인증된 사용자가 리뷰를 작성할 수 있도록 정책 생성
-- Supabase 사용자 또는 이메일 기반으로 작성 가능 (백엔드 API 사용자 지원)
CREATE POLICY "인증된 사용자 리뷰 작성 가능"
  ON reviews
  FOR INSERT
  WITH CHECK (
    (user_id IS NOT NULL AND auth.uid() = user_id) OR -- Supabase 사용자
    (user_id IS NULL AND email IS NOT NULL) -- 백엔드 API 사용자 (email만 있으면 저장 가능)
  );

-- 본인의 리뷰만 수정할 수 있도록 정책 생성
CREATE POLICY "본인 리뷰만 수정 가능"
  ON reviews
  FOR UPDATE
  USING (
    auth.uid() = user_id OR 
    (user_id IS NULL AND email = (SELECT email FROM auth.users WHERE id = auth.uid()))
  );

-- 본인의 리뷰만 삭제할 수 있도록 정책 생성
CREATE POLICY "본인 리뷰만 삭제 가능"
  ON reviews
  FOR DELETE
  USING (
    auth.uid() = user_id OR 
    (user_id IS NULL AND email = (SELECT email FROM auth.users WHERE id = auth.uid()))
  );

-- Storage 버킷 생성 및 정책 설정
-- Supabase Dashboard의 Storage에서 수동으로 생성하거나 아래 명령 실행:
-- 주의: 버킷이 이미 존재하면 에러가 발생할 수 있으므로, 먼저 확인 후 실행하세요.
INSERT INTO storage.buckets (id, name, public) 
VALUES ('reviews', 'reviews', true)
ON CONFLICT (id) DO NOTHING;

-- Storage 정책: 모든 사용자가 파일 업로드 가능 (공개 버킷)
-- 보안을 위해 필요시 더 제한적인 정책으로 변경 가능
CREATE POLICY "모든 사용자 파일 업로드 가능"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'reviews');

-- Storage 정책: 본인 폴더에만 파일 업로드 가능 (더 안전한 방식)
-- 주의: 위의 "모든 사용자 파일 업로드 가능" 정책과 충돌할 수 있으므로,
-- 보안이 중요한 경우 위 정책을 삭제하고 이 정책만 사용하세요.
-- CREATE POLICY "본인 폴더에만 파일 업로드 가능"
--   ON storage.objects
--   FOR INSERT
--   WITH CHECK (
--     bucket_id = 'reviews' AND (
--       auth.uid()::text = (storage.foldername(name))[1] OR
--       -- 백엔드 API 사용자: 이메일 기반 경로 허용 (예: auth-email@example.com/...)
--       (storage.foldername(name))[1] LIKE 'auth-%'
--     )
--   );

-- Storage 정책: 모든 사용자가 파일 조회 가능 (공개 버킷)
CREATE POLICY "모든 사용자 파일 조회 가능"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'reviews');

-- Storage 정책: 모든 사용자가 파일 삭제 가능 (공개 버킷)
-- 보안이 중요한 경우 본인 파일만 삭제 가능하도록 제한 가능
CREATE POLICY "모든 사용자 파일 삭제 가능"
  ON storage.objects
  FOR DELETE
  TO public
  USING (bucket_id = 'reviews');

-- updated_at 자동 업데이트 트리거 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- updated_at 트리거 생성
CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- reviews 테이블 완전 재생성 SQL
-- Supabase Dashboard의 SQL Editor에서 실행하세요.
-- 주의: 기존 데이터가 모두 삭제됩니다!

-- 1. 기존 테이블 삭제 (데이터 손실 주의!)
DROP TABLE IF EXISTS reviews CASCADE;

-- 2. reviews 테이블 생성
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255),
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

-- 3. 인덱스 생성
CREATE INDEX idx_reviews_is_approved ON reviews(is_approved);
CREATE INDEX idx_reviews_created_at ON reviews(created_at DESC);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_email ON reviews(email);

-- 4. Row Level Security (RLS) 활성화
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- 5. RLS 정책 생성
-- 모든 사용자가 승인된 리뷰를 조회할 수 있도록 정책 생성
CREATE POLICY "승인된 리뷰는 모두 조회 가능"
  ON reviews
  FOR SELECT
  TO public
  USING (is_approved = true);

-- 인증된 사용자가 본인의 리뷰를 조회할 수 있도록 정책 생성
CREATE POLICY "본인 리뷰 조회 가능"
  ON reviews
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id OR 
    (user_id IS NULL AND email IS NOT NULL)
  );

-- 인증된 사용자가 리뷰를 작성할 수 있도록 정책 생성
CREATE POLICY "인증된 사용자 리뷰 작성 가능"
  ON reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (
    (user_id IS NOT NULL AND auth.uid() = user_id) OR
    (user_id IS NULL AND email IS NOT NULL)
  );

-- 본인의 리뷰만 수정할 수 있도록 정책 생성
CREATE POLICY "본인 리뷰만 수정 가능"
  ON reviews
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = user_id OR 
    (user_id IS NULL AND email IS NOT NULL)
  );

-- 본인의 리뷰만 삭제할 수 있도록 정책 생성
CREATE POLICY "본인 리뷰만 삭제 가능"
  ON reviews
  FOR DELETE
  TO authenticated
  USING (
    auth.uid() = user_id OR 
    (user_id IS NULL AND email IS NOT NULL)
  );

-- 6. updated_at 자동 업데이트 트리거 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 7. updated_at 트리거 생성
CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

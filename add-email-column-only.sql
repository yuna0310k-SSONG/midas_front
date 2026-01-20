-- email 컬럼만 추가하는 간단한 SQL
-- Supabase Dashboard의 SQL Editor에서 실행하세요.

-- email 컬럼 추가
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS email VARCHAR(255);

-- email 인덱스 추가 (선택사항)
CREATE INDEX IF NOT EXISTS idx_reviews_email ON reviews(email);

-- 제약 조건 추가 (user_id 또는 email 중 하나는 반드시 있어야 함)
-- 기존 제약 조건이 있으면 에러가 발생할 수 있으므로 먼저 확인
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'user_id_or_email_check'
    ) THEN
        ALTER TABLE reviews ADD CONSTRAINT user_id_or_email_check 
        CHECK (user_id IS NOT NULL OR email IS NOT NULL);
    END IF;
END $$;

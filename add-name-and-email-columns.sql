-- Supabase reviews 테이블에 name과 email 컬럼 추가
-- Supabase Dashboard의 SQL Editor에서 실행하세요.

-- name 컬럼 추가
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'reviews' 
        AND column_name = 'name'
    ) THEN
        -- name 컬럼 추가 (기존 데이터가 있으면 기본값 사용)
        ALTER TABLE reviews 
        ADD COLUMN name VARCHAR(255);
        
        -- 기존 데이터에 기본값 설정
        UPDATE reviews SET name = '익명' WHERE name IS NULL;
        
        -- NOT NULL 제약조건 추가
        ALTER TABLE reviews 
        ALTER COLUMN name SET NOT NULL;
        
        RAISE NOTICE 'name 컬럼이 추가되었습니다.';
    ELSE
        RAISE NOTICE 'name 컬럼이 이미 존재합니다.';
    END IF;
END $$;

-- email 컬럼 추가
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'reviews' 
        AND column_name = 'email'
    ) THEN
        -- email 컬럼 추가 (nullable)
        ALTER TABLE reviews 
        ADD COLUMN email VARCHAR(255);
        
        RAISE NOTICE 'email 컬럼이 추가되었습니다.';
    ELSE
        RAISE NOTICE 'email 컬럼이 이미 존재합니다.';
    END IF;
END $$;

-- user_id_or_email_check 제약조건 추가 (user_id 또는 email 중 하나는 필수)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM pg_constraint 
        WHERE conname = 'user_id_or_email_check'
    ) THEN
        ALTER TABLE reviews 
        ADD CONSTRAINT user_id_or_email_check 
        CHECK (user_id IS NOT NULL OR email IS NOT NULL);
        
        RAISE NOTICE 'user_id_or_email_check 제약조건이 추가되었습니다.';
    ELSE
        RAISE NOTICE 'user_id_or_email_check 제약조건이 이미 존재합니다.';
    END IF;
END $$;

-- email 인덱스 추가 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_reviews_email ON reviews(email);

-- 스키마 캐시 새로고침 (PostgREST)
NOTIFY pgrst, 'reload schema';

-- 완료 메시지
SELECT 'name과 email 컬럼 추가가 완료되었습니다.' AS result;

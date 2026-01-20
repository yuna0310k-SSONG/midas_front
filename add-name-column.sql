-- Supabase reviews 테이블에 name 컬럼 추가
-- Supabase Dashboard의 SQL Editor에서 실행하세요.

-- name 컬럼이 이미 존재하는지 확인 후 추가
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'reviews' 
        AND column_name = 'name'
    ) THEN
        -- name 컬럼 추가
        ALTER TABLE reviews 
        ADD COLUMN name VARCHAR(255) NOT NULL DEFAULT '익명';
        
        -- 기본값 제거 (기본값은 일시적으로만 사용)
        ALTER TABLE reviews 
        ALTER COLUMN name DROP DEFAULT;
        
        RAISE NOTICE 'name 컬럼이 추가되었습니다.';
    ELSE
        RAISE NOTICE 'name 컬럼이 이미 존재합니다.';
    END IF;
END $$;

-- 스키마 캐시 새로고침 (PostgREST)
NOTIFY pgrst, 'reload schema';

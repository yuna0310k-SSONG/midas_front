-- reviews 테이블 구조 확인 SQL
-- Supabase Dashboard의 SQL Editor에서 실행하여 테이블 상태를 확인하세요.

-- 1. reviews 테이블 존재 여부 및 컬럼 확인
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public'
AND table_name = 'reviews'
ORDER BY ordinal_position;

-- 2. reviews 테이블의 제약 조건 확인
SELECT 
    constraint_name,
    constraint_type
FROM information_schema.table_constraints
WHERE table_schema = 'public'
AND table_name = 'reviews';

-- 3. reviews 테이블의 인덱스 확인
SELECT 
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname = 'public'
AND tablename = 'reviews';

-- 4. reviews 테이블의 RLS 정책 확인
SELECT 
    policyname,
    cmd,
    roles,
    qual,
    with_check
FROM pg_policies
WHERE schemaname = 'public'
AND tablename = 'reviews';

-- 5. 테이블에 데이터가 있는지 확인
SELECT COUNT(*) as total_reviews FROM reviews;

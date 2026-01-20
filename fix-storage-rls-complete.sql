-- Storage RLS 정책 완전 해결 SQL
-- Supabase Dashboard의 SQL Editor에서 실행하세요.
-- 이 스크립트는 "new row violates row-level security policy" 오류를 완전히 해결합니다.

-- 1. review-images 버킷 생성/확인
INSERT INTO storage.buckets (id, name, public) 
VALUES ('review-images', 'review-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. 버킷의 file_size_limit과 allowed_mime_types 확인/설정 (선택사항)
UPDATE storage.buckets 
SET 
  file_size_limit = 52428800, -- 50MB
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
WHERE id = 'review-images';

-- 3. storage.objects 테이블의 모든 기존 정책 완전 삭제
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'objects' 
        AND schemaname = 'storage'
    ) 
    LOOP
        BEGIN
            EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', r.policyname);
        EXCEPTION WHEN OTHERS THEN
            -- 정책 삭제 실패 시 무시하고 계속 진행
            RAISE NOTICE 'Failed to drop policy: %', r.policyname;
        END;
    END LOOP;
END $$;

-- 4. 새로운 정책 생성 (모든 사용자 허용)
-- 업로드 정책: 모든 사용자(anon 포함)가 review-images 버킷에 업로드 가능
CREATE POLICY "review-images-insert-all"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'review-images');

-- 조회 정책: 모든 사용자가 review-images 버킷의 파일 조회 가능
CREATE POLICY "review-images-select-all"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'review-images');

-- 삭제 정책: 모든 사용자가 review-images 버킷의 파일 삭제 가능
CREATE POLICY "review-images-delete-all"
  ON storage.objects
  FOR DELETE
  TO public
  USING (bucket_id = 'review-images');

-- 5. 정책 확인 쿼리 (실행 후 확인용)
-- SELECT 
--   policyname, 
--   cmd, 
--   roles, 
--   qual, 
--   with_check
-- FROM pg_policies 
-- WHERE tablename = 'objects' 
-- AND schemaname = 'storage'
-- AND policyname LIKE '%review-images%';

-- 6. 버킷 정보 확인 (실행 후 확인용)
-- SELECT id, name, public, file_size_limit, allowed_mime_types
-- FROM storage.buckets
-- WHERE id = 'review-images';

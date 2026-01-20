-- review-images 버킷 RLS 정책 완전 수정 SQL
-- Supabase Dashboard의 SQL Editor에서 실행하세요.
-- 이 스크립트는 "new row violates row-level security policy" 오류를 해결합니다.

-- 1. 버킷이 존재하는지 확인하고 없으면 생성
INSERT INTO storage.buckets (id, name, public) 
VALUES ('review-images', 'review-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. storage.objects 테이블의 모든 기존 정책 삭제
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
        EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', r.policyname);
    END LOOP;
END $$;

-- 3. review-images 버킷을 위한 새로운 정책 생성
-- 정책 이름을 명확하게 하여 충돌 방지

-- 업로드 정책: 모든 사용자(anon 포함)가 업로드 가능
CREATE POLICY "review-images-insert-policy"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'review-images');

-- 조회 정책: 모든 사용자가 조회 가능
CREATE POLICY "review-images-select-policy"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'review-images');

-- 삭제 정책: 모든 사용자가 삭제 가능 (필요시 제한 가능)
CREATE POLICY "review-images-delete-policy"
  ON storage.objects
  FOR DELETE
  TO public
  USING (bucket_id = 'review-images');

-- 4. 정책이 제대로 생성되었는지 확인
-- 아래 쿼리를 실행하여 정책이 생성되었는지 확인하세요:
-- SELECT * FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage';

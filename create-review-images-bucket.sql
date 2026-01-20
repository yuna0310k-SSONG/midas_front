-- review-images 버킷 생성 및 RLS 정책 설정 SQL
-- Supabase Dashboard의 SQL Editor에서 실행하세요.
-- 이 스크립트는 리뷰 이미지 저장을 위한 버킷을 생성하고 RLS 정책을 설정합니다.

-- 1. review-images 버킷 생성 (공개 버킷)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('review-images', 'review-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. 기존 Storage 정책 모두 삭제 (review-images 관련)
-- 모든 정책 이름 패턴 시도
DROP POLICY IF EXISTS "인증된 사용자 파일 업로드 가능" ON storage.objects;
DROP POLICY IF EXISTS "본인 폴더에만 파일 업로드 가능" ON storage.objects;
DROP POLICY IF EXISTS "모든 사용자 파일 조회 가능" ON storage.objects;
DROP POLICY IF EXISTS "본인 파일만 삭제 가능" ON storage.objects;
DROP POLICY IF EXISTS "모든 사용자 파일 업로드 가능" ON storage.objects;
DROP POLICY IF EXISTS "모든 사용자 파일 삭제 가능" ON storage.objects;

-- review-images 버킷과 관련된 모든 정책 삭제
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

-- 3. Storage 정책 재생성
-- 모든 사용자가 파일 업로드 가능 (공개 버킷, anon 사용자 포함)
CREATE POLICY "review-images-upload-policy"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'review-images');

-- 모든 사용자가 파일 조회 가능 (공개 버킷)
CREATE POLICY "review-images-select-policy"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'review-images');

-- 모든 사용자가 파일 삭제 가능 (선택 사항 - 필요시 제한 가능)
CREATE POLICY "review-images-delete-policy"
  ON storage.objects
  FOR DELETE
  TO public
  USING (bucket_id = 'review-images');

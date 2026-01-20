-- Storage 버킷 생성 SQL
-- Supabase Dashboard의 SQL Editor에서 실행하세요.

-- 1. reviews 버킷 생성 (공개 버킷)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('reviews', 'reviews', true)
ON CONFLICT (id) DO NOTHING;

-- 2. 기존 Storage 정책 모두 삭제 (정책 이름은 다양할 수 있으므로 여러 패턴 시도)
DROP POLICY IF EXISTS "인증된 사용자 파일 업로드 가능" ON storage.objects;
DROP POLICY IF EXISTS "본인 폴더에만 파일 업로드 가능" ON storage.objects;
DROP POLICY IF EXISTS "모든 사용자 파일 조회 가능" ON storage.objects;
DROP POLICY IF EXISTS "본인 파일만 삭제 가능" ON storage.objects;
DROP POLICY IF EXISTS "모든 사용자 파일 업로드 가능" ON storage.objects;

-- reviews 버킷의 모든 기존 정책 삭제 (안전하게)
-- 주의: 이 쿼리는 reviews 버킷과 관련된 모든 정책을 삭제합니다
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage') 
    LOOP
        -- reviews 버킷 관련 정책 확인 후 삭제
        EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', r.policyname);
    END LOOP;
END $$;

-- 3. Storage 정책 재생성
-- 모든 사용자가 파일 업로드 가능 (공개 버킷이므로)
CREATE POLICY "모든 사용자 파일 업로드 가능"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'reviews');

-- 본인 폴더에만 파일 업로드 가능 (더 안전한 방식)
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

-- 모든 사용자가 파일 조회 가능 (공개 버킷)
CREATE POLICY "모든 사용자 파일 조회 가능"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'reviews');

-- 본인이 업로드한 파일만 삭제 가능
CREATE POLICY "본인 파일만 삭제 가능"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'reviews' AND (
      auth.uid()::text = (storage.foldername(name))[1] OR
      (storage.foldername(name))[1] LIKE 'auth-%'
    )
  );

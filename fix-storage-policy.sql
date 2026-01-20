-- Storage RLS 정책 수정 SQL
-- Supabase Dashboard의 SQL Editor에서 실행하세요.
-- 이 스크립트는 Storage의 RLS 정책 오류를 해결합니다.

-- 1. 기존 정책 모두 삭제
DROP POLICY IF EXISTS "인증된 사용자 파일 업로드 가능" ON storage.objects;
DROP POLICY IF EXISTS "본인 폴더에만 파일 업로드 가능" ON storage.objects;
DROP POLICY IF EXISTS "모든 사용자 파일 조회 가능" ON storage.objects;
DROP POLICY IF EXISTS "본인 파일만 삭제 가능" ON storage.objects;
DROP POLICY IF EXISTS "모든 사용자 파일 업로드 가능" ON storage.objects;

-- 2. reviews 버킷이 존재하는지 확인하고 없으면 생성
INSERT INTO storage.buckets (id, name, public) 
VALUES ('reviews', 'reviews', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 3. 모든 사용자가 파일 업로드 가능 (anon 사용자 포함)
CREATE POLICY "모든 사용자 파일 업로드 가능"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'reviews');

-- 4. 모든 사용자가 파일 조회 가능
CREATE POLICY "모든 사용자 파일 조회 가능"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'reviews');

-- 5. 모든 사용자가 파일 삭제 가능 (선택 사항 - 필요시 제한 가능)
CREATE POLICY "모든 사용자 파일 삭제 가능"
  ON storage.objects
  FOR DELETE
  TO public
  USING (bucket_id = 'reviews');

-- 참고: 보안이 중요한 경우, 위 정책들을 더 제한적으로 변경할 수 있습니다.
-- 예를 들어, 본인 파일만 삭제 가능하도록:
-- DROP POLICY IF EXISTS "모든 사용자 파일 삭제 가능" ON storage.objects;
-- CREATE POLICY "본인 파일만 삭제 가능"
--   ON storage.objects
--   FOR DELETE
--   TO authenticated
--   USING (bucket_id = 'reviews' AND owner = auth.uid());

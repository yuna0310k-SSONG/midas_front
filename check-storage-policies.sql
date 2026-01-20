-- Storage 정책 확인 SQL
-- Supabase Dashboard의 SQL Editor에서 실행하여 현재 정책 상태를 확인하세요.

-- 1. review-images 버킷 존재 여부 확인
SELECT 
  id, 
  name, 
  public, 
  file_size_limit, 
  allowed_mime_types,
  created_at
FROM storage.buckets
WHERE id = 'review-images';

-- 2. storage.objects 테이블의 모든 정책 확인
SELECT 
  policyname, 
  cmd, 
  roles, 
  qual, 
  with_check
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
ORDER BY policyname;

-- 3. review-images 버킷 관련 정책만 확인
SELECT 
  policyname, 
  cmd, 
  roles, 
  qual, 
  with_check
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
AND (
  with_check::text LIKE '%review-images%' 
  OR qual::text LIKE '%review-images%'
)
ORDER BY policyname;

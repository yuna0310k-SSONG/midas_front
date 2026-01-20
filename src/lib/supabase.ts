// Supabase 클라이언트 설정
// 환경 변수에서 Supabase 설정을 가져옵니다.
// .env.local 파일에 다음 변수들을 추가하세요:
// NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
// NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// 환경 변수가 없어도 클라이언트는 생성하되, 사용 시 에러가 발생하도록 함
// 이렇게 하면 모듈 로드 시 에러가 발생하지 않음
export const supabase: SupabaseClient = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

// 환경 변수 검증 함수 (사용 시 호출)
export function validateSupabaseConfig() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Supabase 환경 변수가 설정되지 않았습니다.\n' +
      '.env.local 파일에 다음 변수들을 추가하세요:\n' +
      'NEXT_PUBLIC_SUPABASE_URL=your_supabase_url\n' +
      'NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key'
    );
  }
}

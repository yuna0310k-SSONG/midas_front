# 미다스 한의원 (프론트엔드)
미다스 한의원 홍보 및 환자 관리 플랫폼 - Next.js 기반 프론트엔드 프로젝트

프론트엔드 전용 프로젝트: 이 프로젝트는 미다스 한의원의 웹 서비스를 위한 프론트엔드 개발을 담당합니다. Supabase 백엔드와 통신하여 사용자에게 진료 안내, 리뷰 관리, 인증 기능 등을 제공합니다.

📋 프로젝트 개요
한의원의 다양한 진료 과목(미용, 소아, 보험, 자세 교정 등)을 소개하고, 환자들이 직접 리뷰를 작성하거나 본인의 정보를 관리할 수 있는 데이터 기반 한방 의료 서비스 플랫폼의 프론트엔드입니다.

중요: 모든 데이터 저장 및 인증 로직은 Supabase 백엔드에서 수행되며, 프론트엔드는 사용자 경험(UX)과 데이터 시각화를 담당합니다.

🛠 기술 스택
핵심 프레임워크
- Next.js 16.1.2 (App Router)
- React 19.2.3
- TypeScript 5.x
스타일링
- Tailwind CSS 4.x
- PostCSS
- Framer Motion (애니메이션)
- Swiper (슬라이더)
상태 관리 및 데이터 통신
- Supabase (@supabase/supabase-js) 2.39.0
- Axios 1.13.2
- Context API (인증 상태 관리)
- js-cookie (토큰 관리)
🚀 시작하기
필수 요구사항
- Node.js 18.x 이상
- npm 또는 yarn
설치 및 실행
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 린트 실행
npm run lint
개발 서버는 http://localhost:3000에서 실행됩니다.

📁 프로젝트 구조
midas_front/
├── src/
│   ├── app/                          # Next.js App Router (페이지)
│   │   ├── beauty/                   # 미용 진료 (아큐펑쳐, 다이어트, 리프팅)
│   │   ├── children/                 # 소아 진료 (불안, 소아과, 학생)
│   │   ├── insurance/                # 보험 진료 (통증, 교통사고)
│   │   ├── login/                    # 로그인 페이지
│   │   ├── midas/                    # 미다스 소개 (원장, 위치, 공간, 특화)
│   │   ├── posture/                  # 자세 교정 (거북목, 측만증 등)
│   │   ├── profile/                  # 사용자 프로필 관리
│   │   ├── review/                   # 리뷰 목록 및 작성
│   │   ├── signup/                   # 회원가입 페이지
│   │   ├── skin/                     # 피부 진료 (질환, 마비)
│   │   └── treatment/                # 특수 치료 (안면비대칭, 두개골)
│   ├── components/                   # 재사용 가능한 UI 컴포넌트
│   │   ├── Header.tsx / Footer.tsx   # 공통 레이아웃
│   │   ├── ReviewCard.tsx            # 리뷰 표시 컴포넌트
│   │   └── ReviewForm.tsx            # 리뷰 작성 폼
│   ├── contexts/                     # React Context (AuthContext 등)
│   ├── data/                         # 정적 데이터 (메뉴 구성, 원장 프로필)
│   ├── lib/                          # API 클라이언트 및 유틸리티
│   │   ├── supabase.ts               # Supabase 설정
│   │   ├── auth-api.ts               # 인증 관련 API
│   │   └── review-api.ts             # 리뷰 관련 API
│   └── types/                        # TypeScript 타입 정의
├── public/                           # 이미지, 로고 등 정적 자산
├── docs/                             # 프로젝트 상세 문서
│   ├── review-api-spec.md            # 리뷰 API 명세
│   ├── token-management-guide.md     # 토큰 관리 가이드
│   └── role-based-ui-implementation.md # 역할 기반 UI 구현 가이드
├── SQL 스크립트들                     # Supabase 테이블 및 정책 설정 (루트 디렉토리)
├── package.json
├── tsconfig.json
└── next.config.ts
🎯 주요 기능
- 진료 과목별 상세 안내 (미용, 소아, 보험, 자세, 피부 등)
- 사용자 인증 (로그인, 회원가입, 프로필 관리)
- 리뷰 시스템 (리뷰 작성, 이미지 업로드, 목록 조회)
- 역할 기반 UI (사용자 권한에 따른 기능 제한)
- 반응형 웹 디자인 및 애니메이션 효과
📝 개발 가이드
API 호출
모든 API 호출은 src/lib/ 디렉토리의 모듈을 통해 수행됩니다. Supabase 클라이언트를 직접 호출하거나 정의된 API 함수를 사용합니다.

import { reviewApi } from "@/lib/review-api";

const reviews = await reviewApi.getReviews();
컴포넌트 구조
- src/components/: 모든 페이지에서 공용으로 사용하는 UI 요소
- src/app/[route]/: 각 경로별 전용 페이지 및 레이아웃
스타일링
Tailwind CSS 4를 사용하며, 전역 스타일은 src/app/globals.css에 정의되어 있습니다.

자세한 내용은 docs/ 폴더 내의 문서들을 참고하세요.

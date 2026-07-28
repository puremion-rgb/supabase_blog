# 📝 리뷰노트

Next.js + Supabase로 만든 자유주제 리뷰 블로그입니다. 영화, 책, 맛집, 음악, 여행, 전시, 게임 등 다양한 카테고리로 리뷰를 남기고, Google 소셜 로그인으로 나만의 리뷰를 관리할 수 있습니다.

## 주요 기능

### 리뷰 (CRUD)

- 리뷰 작성 / 조회 / 수정 / 삭제
- 카테고리 태그 (영화, 책, 맛집, 음악, 여행, 전시, 게임, 기타)
- 별점 (1~5점)
- 이미지 첨부 (업로드 시 미리보기 제공)

### 탐색

- 제목/내용 검색
- 카테고리별 필터링
- 정렬 (최신순 / 별점순)
- 리뷰가 없을 때 빈 상태(empty state) 안내

### 인증 & 권한

- Google OAuth 소셜 로그인
- 로그인한 사용자만 리뷰 작성 및 댓글 작성 가능
- 본인이 작성한 글/댓글만 수정·삭제 가능 (Supabase RLS로 서버 단에서 강제)
- 로그인하지 않은 상태로 글쓰기/수정 페이지에 URL로 직접 접근해도 자동 리다이렉트
- 닉네임 프로필 (변경 가능) + 닉네임 기반 컬러 아바타

### 커뮤니티

- 댓글 작성 / 수정 / 삭제
- 마이페이지: 내가 작성한 리뷰 모아보기

## 기술 스택

| 분류        | 기술                                 |
| ----------- | ------------------------------------ |
| 프레임워크  | Next.js 15+ (App Router)             |
| 언어        | TypeScript                           |
| 스타일링    | Tailwind CSS                         |
| 백엔드 / DB | Supabase (PostgreSQL, Auth, Storage) |
| 인증        | Supabase Auth (Google OAuth)         |
| 데이터 처리 | Server Actions (`"use server"`)      |

## 프로젝트 구조

```
app/
├── auth/
│   └── callback/route.ts       # OAuth 콜백 처리
├── mypage/page.tsx             # 마이페이지 (내 리뷰 모아보기)
├── profile/
│   ├── actions.ts              # 닉네임 변경
│   └── page.tsx
├── posts/
│   ├── _components/            # 재사용 컴포넌트
│   │   ├── auth-button.tsx     # 로그인/로그아웃 버튼
│   │   ├── comment-form.tsx
│   │   ├── comment-list.tsx
│   │   ├── delete-post-button.tsx
│   │   ├── image-input.tsx     # 이미지 업로드 + 미리보기
│   │   ├── post-form.tsx
│   │   └── user-badge.tsx      # 닉네임 컬러 뱃지
│   ├── [id]/
│   │   ├── edit/                # 리뷰 수정
│   │   ├── actions.ts           # 삭제
│   │   ├── comments-actions.ts  # 댓글 CRUD
│   │   └── page.tsx             # 상세 페이지
│   ├── new/                     # 리뷰 작성
│   ├── page.tsx                 # 목록 페이지
│   ├── types.ts                 # 폼 상태 타입
│   └── utils.ts                 # 카테고리/별점 헬퍼
├── layout.tsx                   # 전역 레이아웃 (헤더)
├── not-found.tsx                 # 커스텀 404
└── icon.tsx                      # 파비콘

lib/
└── supabase/
    ├── client.ts    # 브라우저용 클라이언트
    └── server.ts    # 서버용 클라이언트

middleware.ts         # 세션 갱신
```

## 데이터베이스 스키마

### `posts`

| 컬럼                    | 타입        | 설명                     |
| ----------------------- | ----------- | ------------------------ |
| id                      | bigint      | PK                       |
| title                   | text        | 제목                     |
| content                 | text        | 내용                     |
| category                | text        | 카테고리                 |
| rating                  | smallint    | 별점 (1~5)               |
| image_url               | text        | 첨부 이미지 URL          |
| user_id                 | uuid        | 작성자 (auth.users 참조) |
| created_at / updated_at | timestamptz | 작성/수정 시각           |

### `comments`

| 컬럼       | 타입        | 설명                     |
| ---------- | ----------- | ------------------------ |
| id         | bigint      | PK                       |
| post_id    | bigint      | 리뷰 참조                |
| author     | text        | 작성 당시 닉네임         |
| content    | text        | 댓글 내용                |
| user_id    | uuid        | 작성자 (auth.users 참조) |
| created_at | timestamptz | 작성 시각                |

### `profiles`

| 컬럼       | 타입        | 설명                 |
| ---------- | ----------- | -------------------- |
| id         | uuid        | PK (auth.users 참조) |
| nickname   | text        | 닉네임               |
| updated_at | timestamptz | 수정 시각            |

모든 테이블에 Row Level Security(RLS)가 적용되어 있으며, 작성/수정/삭제는 `auth.uid() = user_id` 조건으로 본인 소유 데이터에만 허용됩니다.

## 로컬 실행 방법

### 1. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 만들고 Supabase 프로젝트 정보를 입력합니다.

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 2. 패키지 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속 (자동으로 `/posts`로 리다이렉트됩니다).

## Supabase 설정 체크리스트

- [ ] `posts`, `comments`, `profiles` 테이블 및 RLS 정책 생성
- [ ] `post-images` Storage 버킷 생성 (public read 허용)
- [ ] Authentication → Providers에서 Google OAuth 활성화 (Client ID/Secret 등록)
- [ ] Authentication → URL Configuration에서 Site URL / Redirect URLs에 `http://localhost:3000`, `http://localhost:3000/auth/callback` 등록
- [ ] `auth.users` 신규 가입 시 `profiles`에 자동으로 닉네임을 생성하는 트리거(`handle_new_user`) 등록

## 향후 개선 아이디어

- 좋아요(하트) 기능 및 인기순 정렬
- 조회수 카운트
- 카카오/GitHub 등 추가 소셜 로그인

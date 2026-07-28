import { notFound } from "next/navigation";
import { createClient } from "./supabase/server";

// 1. post 데이터의 설계도
export type Post = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

const POST_COLUMNS = "id, title, content, created_at, updated_at";

// 글 목록 최신순으로 가져오기

export async function getPosts(): Promise<Post[]> {
  // 1. supabase Client  가져오기
  const supabase = await createClient();
  // 2. 데이터 가져오기
  // {data, error} 객체를 반환
  const { data, error } = await supabase
    .from("posts")
    .select(POST_COLUMNS)
    .order("created_at", { ascending: false });
  // 3. 실패했을 때 오류 처리
  if (error) {
    throw new Error("글 목록을 불러오지 못했습니다." + error.message);
  }
  // 4. 성공 데이터 반환
  return data as Post[];
}

// 개별 게시글 데이터 가져오기

export async function getPost(idParam: string): Promise<Post> {
  // 1. id 형태 변환
  const id = Number(idParam);
  // 2. id가 숫자가 아닐 때
  if (!Number.isInteger(id) || id <= 0) {
    notFound();
  }
  // 3. supabase client 가져오기
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select(POST_COLUMNS)
    .eq("id", id)
    .maybeSingle();
  // 결과가 0이면 null 출력
  if (error) {
    throw new Error("글 목록을 불러오지 못했습니다." + error.message);
  }

  // 데이터가 0일 때
  if (!data) {
    notFound();
  }
  return data as Post;
}

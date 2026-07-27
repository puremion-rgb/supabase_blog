import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { getCategoryIcon, renderStars, CATEGORIES } from "./utils";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getPreview(content: string, length = 80) {
  const trimmed = content.trim();
  return trimmed.length > length ? trimmed.slice(0, length) + "..." : trimmed;
}

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category, q } = await searchParams;

  const supabase = await createClient();
  let query = supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (category) {
    query = query.eq("category", category);
  }
  if (q) {
    query = query.or(`title.ilike.%${q}%,content.ilike.%${q}%`);
  }

  const { data: posts, error } = await query;

  if (error) return <p className="p-10">에러: {error.message}</p>;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">전체 리뷰</h1>
          <p className="mt-1 text-sm text-[#6b6a61]">
            영화, 책, 맛집 등 이것저것 남긴 기록들
          </p>
        </div>
        <Link
          href="/posts/new"
          className="rounded-md bg-[#2f6f62] px-3 py-1.5 text-sm font-medium text-white transition hover:bg-[#26594f]"
        >
          리뷰 쓰기
        </Link>
      </div>

      {/* 카테고리 필터 탭 */}
      <div className="mb-4 flex flex-wrap gap-2">
        <Link
          href="/posts"
          className={`rounded-full px-3 py-1 text-xs font-medium transition ${
            !category
              ? "bg-[#2f6f62] text-white"
              : "bg-[#2f6f62]/10 text-[#2f6f62] hover:bg-[#2f6f62]/20"
          }`}
        >
          전체
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c}
            href={`/posts?category=${encodeURIComponent(c)}`}
            className={`rounded-full px-3 py-1 text-xs font-medium transition ${
              category === c
                ? "bg-[#2f6f62] text-white"
                : "bg-[#2f6f62]/10 text-[#2f6f62] hover:bg-[#2f6f62]/20"
            }`}
          >
            {getCategoryIcon(c)} {c}
          </Link>
        ))}
      </div>

      {/* 검색창 */}
      <form action="/posts" method="GET" className="mb-8 flex gap-2">
        {category && <input type="hidden" name="category" value={category} />}
        <input
          type="text"
          name="q"
          defaultValue={q ?? ""}
          placeholder="제목이나 내용으로 검색"
          className="w-full rounded-md border border-[#21231f]/15 bg-white px-3 py-2 text-sm outline-none focus:border-[#2f6f62] focus:ring-1 focus:ring-[#2f6f62]"
        />
        <button
          type="submit"
          className="shrink-0 rounded-md border border-[#21231f]/15 bg-white px-4 py-2 text-sm hover:bg-[#f6f3ec]"
        >
          검색
        </button>
      </form>

      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-md border border-dashed border-[#21231f]/20 py-20 text-center">
          <p className="text-[#6b6a61]">
            {q || category
              ? "조건에 맞는 리뷰가 없어요"
              : "아직 작성된 리뷰가 없어요"}
          </p>
          <Link
            href="/posts/new"
            className="text-sm font-medium text-[#2f6f62] underline underline-offset-4"
          >
            첫 리뷰 남기기
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                href={`/posts/${post.id}`}
                className="block rounded-lg bg-[#fffdf9] p-4 shadow-sm ring-1 ring-[#21231f]/10 transition hover:ring-[#2f6f62]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2f6f62]"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="inline-block rounded border border-dashed border-[#2f6f62]/50 bg-[#2f6f62]/10 px-2 py-0.5 text-xs font-medium text-[#2f6f62]">
                    {getCategoryIcon(post.category)} {post.category}
                  </span>
                  <span className="text-xs text-amber-500">
                    {renderStars(post.rating)}
                  </span>
                </div>
                <h2 className="mb-1 font-medium">{post.title}</h2>
                <p className="mb-3 text-sm text-[#6b6a61]">
                  {getPreview(post.content)}
                </p>
                <time className="font-mono text-xs text-[#6b6a61]/70">
                  {formatDate(post.created_at)}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

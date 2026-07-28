import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getCategoryIcon, renderStars } from "../posts/utils";

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

export default async function MyPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/posts");

  const { data: profile } = await supabase
    .from("profiles")
    .select("nickname")
    .eq("id", user.id)
    .single();

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">
            {profile?.nickname ?? "내"}님의 리뷰
          </h1>
          <p className="mt-1 text-sm text-[#6b6a61]">
            총 {posts?.length ?? 0}개의 리뷰를 남겼어요
          </p>
        </div>
        <Link
          href="/profile"
          className="text-sm text-[#2f6f62] hover:underline"
        >
          프로필 설정
        </Link>
      </div>

      {!posts || posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-md border border-dashed border-[#21231f]/20 py-20 text-center">
          <p className="text-[#6b6a61]">아직 작성한 리뷰가 없어요</p>
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
                className="block overflow-hidden rounded-lg bg-[#fffdf9] shadow-sm ring-1 ring-[#21231f]/10 transition hover:ring-[#2f6f62]/50"
              >
                {post.image_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.image_url}
                    alt=""
                    className="h-40 w-full object-cover"
                  />
                )}
                <div className="p-4">
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
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

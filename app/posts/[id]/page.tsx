import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { DeletePostButton } from "../_components/delete-post-button";
import { CommentForm } from "../_components/comment-form";
import { CommentList } from "../_components/comment-list";
import { getCategoryIcon, renderStars } from "../utils";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (!post) notFound();

  const { data: comments } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", id)
    .order("created_at", { ascending: true });

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <Link
        href="/posts"
        className="mb-6 inline-block text-sm text-[#6b6a61] hover:text-[#21231f]"
      >
        ← 목록으로
      </Link>

      <div className="mb-6 rounded-lg bg-[#fffdf9] p-6 shadow-sm ring-1 ring-[#21231f]/10">
        <div className="mb-3 flex items-center justify-between">
          <span className="inline-block rounded border border-dashed border-[#2f6f62]/50 bg-[#2f6f62]/10 px-2 py-0.5 text-xs font-medium text-[#2f6f62]">
            {getCategoryIcon(post.category)} {post.category}
          </span>
          <span className="text-sm text-amber-500">
            {renderStars(post.rating)}
          </span>
        </div>

        <h1 className="mb-1 text-2xl font-bold">{post.title}</h1>
        <time className="mb-6 block font-mono text-xs text-[#6b6a61]/70">
          {formatDate(post.created_at)}
        </time>
        <p className="mb-8 whitespace-pre-wrap leading-relaxed">
          {post.content}
        </p>

        <div className="flex items-center gap-4 border-t border-[#21231f]/10 pt-4">
          <Link
            href={`/posts/${post.id}/edit`}
            className="text-sm text-[#6b6a61] hover:text-[#21231f]"
          >
            수정
          </Link>
          <DeletePostButton id={post.id} />
        </div>
      </div>

      {/* 댓글 섹션 */}
      <div>
        <h2 className="mb-3 text-sm font-semibold text-[#6b6a61]">
          댓글 {comments?.length ?? 0}
        </h2>
        <div className="mb-4">
          <CommentList comments={comments ?? []} />
        </div>
        <CommentForm postId={post.id} />
      </div>
    </div>
  );
}

import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import { PostForm } from "../../_components/post-form";
import { updatePost } from "./actions";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (!post) notFound();

  // 로그인 안 했거나 본인 글이 아니면 상세 페이지로 돌려보냄
  if (!user || user.id !== post.user_id) {
    redirect(`/posts/${id}`);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-6 text-xl font-semibold">리뷰 수정</h1>
      <PostForm
        defaultValues={{
          title: post.title,
          content: post.content,
          category: post.category,
          rating: post.rating,
        }}
        submitLabel="수정 완료"
        cancelHref={`/posts/${post.id}`}
        action={updatePost}
        hiddenId={post.id}
      />
    </div>
  );
}

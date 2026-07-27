import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { PostForm } from "../../_components/post-form";
import { updatePost } from "./actions";

export default async function EditPostPage({
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

  // id를 bind로 미리 묶어서 넘김 (formData에 title/content만 있어도 id를 알 수 있게)
  const updatePostWithId = updatePost.bind(null);

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

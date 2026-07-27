"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addComment(formData: FormData) {
  const postId = formData.get("post_id") as string;
  const author = formData.get("author") as string;
  const content = formData.get("content") as string;

  if (!author?.trim() || !content?.trim()) {
    return;
  }

  const supabase = await createClient();
  await supabase.from("comments").insert({
    post_id: postId,
    author,
    content,
  });

  revalidatePath(`/posts/${postId}`);
}

export async function deleteComment(formData: FormData) {
  const commentId = formData.get("comment_id") as string;
  const postId = formData.get("post_id") as string;

  const supabase = await createClient();
  await supabase.from("comments").delete().eq("id", commentId);

  revalidatePath(`/posts/${postId}`);
}

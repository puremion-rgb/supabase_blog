"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addComment(formData: FormData) {
  const postId = formData.get("post_id") as string;
  const content = formData.get("content") as string;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !content?.trim()) return;

  const { data: profile } = await supabase
    .from("profiles")
    .select("nickname")
    .eq("id", user.id)
    .single();

  await supabase.from("comments").insert({
    post_id: postId,
    author: profile?.nickname ?? user.email ?? "익명",
    content,
    user_id: user.id,
  });

  revalidatePath(`/posts/${postId}`);
}

export async function updateComment(formData: FormData) {
  const commentId = formData.get("comment_id") as string;
  const postId = formData.get("post_id") as string;
  const content = formData.get("content") as string;

  if (!content?.trim()) return;

  const supabase = await createClient();
  await supabase.from("comments").update({ content }).eq("id", commentId);

  revalidatePath(`/posts/${postId}`);
}

export async function deleteComment(formData: FormData) {
  const commentId = formData.get("comment_id") as string;
  const postId = formData.get("post_id") as string;

  const supabase = await createClient();
  await supabase.from("comments").delete().eq("id", commentId);

  revalidatePath(`/posts/${postId}`);
}

"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { PostFormState } from "../../types";

export async function updatePost(
  prevState: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as string;
  const rating = Number(formData.get("rating"));

  if (!title?.trim()) {
    return { errors: { title: "제목을 입력하세요" }, message: null };
  }
  if (!content?.trim()) {
    return { errors: { content: "내용을 입력하세요" }, message: null };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("posts")
    .update({
      title,
      content,
      category,
      rating,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    return { errors: {}, message: error.message };
  }

  revalidatePath(`/posts/${id}`);
  redirect(`/posts/${id}`);
}

"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { PostFormState } from "../types";

export async function createPost(
  prevState: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { errors: {}, message: "로그인이 필요해요" };
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as string;
  const rating = Number(formData.get("rating"));
  const imageFile = formData.get("image") as File | null;

  if (!title?.trim()) {
    return { errors: { title: "제목을 입력하세요" }, message: null };
  }
  if (!content?.trim()) {
    return { errors: { content: "내용을 입력하세요" }, message: null };
  }

  let imageUrl: string | null = null;

  if (imageFile && imageFile.size > 0) {
    const ext = imageFile.name.split(".").pop();
    const path = `${user.id}/${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("post-images")
      .upload(path, imageFile);

    if (uploadError) {
      return {
        errors: {},
        message: `이미지 업로드 실패: ${uploadError.message}`,
      };
    }

    const { data } = supabase.storage.from("post-images").getPublicUrl(path);
    imageUrl = data.publicUrl;
  }

  const { error } = await supabase.from("posts").insert({
    title,
    content,
    category,
    rating,
    user_id: user.id,
    image_url: imageUrl,
  });

  if (error) {
    return { errors: {}, message: error.message };
  }

  revalidatePath("/posts");
  redirect("/posts");
}

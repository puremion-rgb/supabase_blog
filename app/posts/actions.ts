// app/posts/new/actions.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  const supabase = await createClient();
  const { error } = await supabase.from("posts").insert({ title, content });

  if (error) throw new Error(error.message);

  redirect("/posts");
}

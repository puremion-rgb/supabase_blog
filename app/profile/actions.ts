"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function updateNickname(formData: FormData) {
  const nickname = formData.get("nickname") as string;
  if (!nickname?.trim()) return;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/posts");

  await supabase
    .from("profiles")
    .update({ nickname: nickname.trim(), updated_at: new Date().toISOString() })
    .eq("id", user.id);

  revalidatePath("/", "layout");
  redirect("/posts");
}

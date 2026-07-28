import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { updateNickname } from "./actions";

export default async function ProfilePage() {
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

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-6 text-xl font-semibold">프로필 설정</h1>
      <form
        action={updateNickname}
        className="flex flex-col gap-4 rounded-lg bg-[#fffdf9] p-6 shadow-sm ring-1 ring-[#21231f]/10"
      >
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium uppercase tracking-wide text-[#6b6a61]">
            이메일
          </label>
          <p className="text-sm text-[#6b6a61]">{user.email}</p>
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="nickname"
            className="text-xs font-medium uppercase tracking-wide text-[#6b6a61]"
          >
            닉네임
          </label>
          <input
            id="nickname"
            name="nickname"
            type="text"
            defaultValue={profile?.nickname ?? ""}
            maxLength={30}
            required
            className="w-full rounded-md border border-[#21231f]/15 bg-white px-3 py-2 text-sm outline-none focus:border-[#2f6f62] focus:ring-1 focus:ring-[#2f6f62]"
          />
        </div>
        <button
          type="submit"
          className="self-start rounded-md bg-[#2f6f62] px-4 py-2 text-sm font-medium text-white hover:bg-[#26594f]"
        >
          저장
        </button>
      </form>
    </div>
  );
}

"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

export function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      setUser(data.user);
      if (data.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("nickname")
          .eq("id", data.user.id)
          .single();
        setNickname(profile?.nickname ?? null);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  if (user) {
    return (
      <div className="flex items-center gap-3 text-xs">
        <Link href="/mypage" className="text-[#6b6a61] hover:text-[#21231f]">
          마이페이지
        </Link>
        <Link href="/profile" className="text-[#2f6f62] hover:underline">
          {nickname ?? user.email}
        </Link>
        <button
          onClick={handleLogout}
          className="rounded-md border border-[#21231f]/15 px-2 py-1 hover:bg-[#f6f3ec]"
        >
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleLogin}
      className="rounded-md border border-[#21231f]/15 px-2 py-1 text-xs hover:bg-[#f6f3ec]"
    >
      Google로 로그인
    </button>
  );
}

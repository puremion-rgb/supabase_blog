"use client";

import { addComment } from "../[id]/comments-actions";
import { useRef } from "react";

export function CommentForm({ postId }: { postId: number }) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await addComment(formData);
        formRef.current?.reset();
      }}
      className="flex flex-col gap-3 rounded-md border border-[#21231f]/10 bg-[#fffdf9] p-4"
    >
      <input type="hidden" name="post_id" value={postId} />
      <textarea
        name="content"
        placeholder="댓글을 남겨보세요"
        rows={2}
        maxLength={500}
        required
        className="rounded-md border border-[#21231f]/15 bg-white px-3 py-2 text-sm outline-none focus:border-[#2f6f62] focus:ring-1 focus:ring-[#2f6f62]"
      />
      <button
        type="submit"
        className="self-end rounded-md bg-[#2f6f62] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#26594f]"
      >
        댓글 등록
      </button>
    </form>
  );
}

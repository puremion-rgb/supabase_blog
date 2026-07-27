"use client";

import { deletePost } from "../[id]/actions";

export function DeletePostButton({ id }: { id: string | number }) {
  return (
    <form
      action={deletePost}
      onSubmit={(e) => {
        if (!confirm("정말 삭제하시겠어요?")) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-sm text-[#b23a2e] hover:text-[#8f2f26]"
      >
        삭제
      </button>
    </form>
  );
}

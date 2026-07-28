"use client";

import { useState } from "react";
import { deleteComment, updateComment } from "../[id]/comments-actions";
import { UserBadge } from "./user-badge";

type Comment = {
  id: number;
  post_id: number;
  author: string;
  content: string;
  created_at: string;
  user_id: string | null;
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function CommentItem({
  comment,
  isOwner,
}: {
  comment: Comment;
  isOwner: boolean;
}) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <li className="rounded-md border border-[#21231f]/10 bg-white p-3">
        <form
          action={async (formData) => {
            await updateComment(formData);
            setIsEditing(false);
          }}
          className="flex flex-col gap-2"
        >
          <input type="hidden" name="comment_id" value={comment.id} />
          <input type="hidden" name="post_id" value={comment.post_id} />
          <textarea
            name="content"
            defaultValue={comment.content}
            rows={2}
            maxLength={500}
            required
            className="rounded-md border border-[#21231f]/15 bg-white px-3 py-2 text-sm outline-none focus:border-[#2f6f62] focus:ring-1 focus:ring-[#2f6f62]"
          />
          <div className="flex gap-3 self-end">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="text-xs text-[#6b6a61] hover:text-[#21231f]"
            >
              취소
            </button>
            <button
              type="submit"
              className="rounded-md bg-[#2f6f62] px-3 py-1 text-xs font-medium text-white hover:bg-[#26594f]"
            >
              저장
            </button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className="rounded-md border border-[#21231f]/10 bg-white p-3">
      <div className="mb-1 flex items-center justify-between">
        <UserBadge nickname={comment.author} />
        <time className="font-mono text-xs text-[#6b6a61]/70">
          {formatDate(comment.created_at)}
        </time>
      </div>
      <p className="mb-2 text-sm">{comment.content}</p>
      {isOwner && (
        <div className="flex gap-3">
          <button
            onClick={() => setIsEditing(true)}
            className="text-xs text-[#6b6a61] hover:text-[#21231f]"
          >
            수정
          </button>
          <form action={deleteComment}>
            <input type="hidden" name="comment_id" value={comment.id} />
            <input type="hidden" name="post_id" value={comment.post_id} />
            <button
              type="submit"
              className="text-xs text-[#b23a2e] hover:text-[#8f2f26]"
            >
              삭제
            </button>
          </form>
        </div>
      )}
    </li>
  );
}

export function CommentList({
  comments,
  currentUserId,
}: {
  comments: Comment[];
  currentUserId: string | null;
}) {
  if (comments.length === 0) {
    return <p className="text-sm text-[#6b6a61]">첫 댓글을 남겨보세요.</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          isOwner={currentUserId === comment.user_id}
        />
      ))}
    </ul>
  );
}

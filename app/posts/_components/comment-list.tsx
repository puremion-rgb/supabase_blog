import { deleteComment } from "../[id]/comments-actions";

type Comment = {
  id: number;
  post_id: number;
  author: string;
  content: string;
  created_at: string;
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function CommentList({ comments }: { comments: Comment[] }) {
  if (comments.length === 0) {
    return <p className="text-sm text-[#6b6a61]">첫 댓글을 남겨보세요.</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {comments.map((comment) => (
        <li
          key={comment.id}
          className="rounded-md border border-[#21231f]/10 bg-white p-3"
        >
          <div className="mb-1 flex items-center justify-between">
            <span className="text-sm font-medium">{comment.author}</span>
            <time className="font-mono text-xs text-[#6b6a61]/70">
              {formatDate(comment.created_at)}
            </time>
          </div>
          <p className="mb-2 text-sm">{comment.content}</p>
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
        </li>
      ))}
    </ul>
  );
}

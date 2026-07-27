import { PostForm } from "../_components/post-form";
import { createPost } from "./actions";

export default function NewPostPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-6 text-xl font-semibold">리뷰 쓰기</h1>
      <PostForm submitLabel="등록" cancelHref="/posts" action={createPost} />
    </div>
  );
}

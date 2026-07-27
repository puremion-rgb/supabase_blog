"use client";

import Link from "next/link";
import { useActionState } from "react";
import { PostFormState } from "../types";
import { CATEGORIES } from "../utils";

const FIELD_CLASS =
  "w-full rounded-md border border-[#21231f]/15 bg-white px-3 py-2 text-sm outline-none focus:border-[#2f6f62] focus:ring-1 focus:ring-[#2f6f62]";

type PostFormAction = (
  prevState: PostFormState,
  formData: FormData,
) => Promise<PostFormState>;

export function PostForm({
  defaultValues,
  submitLabel,
  cancelHref,
  action,
  hiddenId,
}: {
  defaultValues?: {
    title: string;
    content: string;
    category?: string;
    rating?: number;
  };
  submitLabel: string;
  cancelHref: string;
  action: PostFormAction;
  hiddenId?: string | number;
}) {
  const [state, formAction] = useActionState(action, {
    errors: {},
    message: null,
  });

  return (
    <form
      action={formAction}
      className="flex flex-col gap-6 rounded-lg bg-[#fffdf9] p-6 shadow-sm ring-1 ring-[#21231f]/10"
    >
      {hiddenId !== undefined && (
        <input type="hidden" name="id" value={hiddenId} />
      )}

      <div className="flex flex-col gap-2">
        <label
          htmlFor="category"
          className="text-xs font-medium uppercase tracking-wide text-[#6b6a61]"
        >
          카테고리
        </label>
        <select
          id="category"
          name="category"
          defaultValue={defaultValues?.category ?? "기타"}
          className={FIELD_CLASS}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="rating"
          className="text-xs font-medium uppercase tracking-wide text-[#6b6a61]"
        >
          별점
        </label>
        <select
          id="rating"
          name="rating"
          defaultValue={defaultValues?.rating ?? 5}
          className={FIELD_CLASS}
        >
          <option value={1}>★☆☆☆☆ (1점)</option>
          <option value={2}>★★☆☆☆ (2점)</option>
          <option value={3}>★★★☆☆ (3점)</option>
          <option value={4}>★★★★☆ (4점)</option>
          <option value={5}>★★★★★ (5점)</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="title"
          className="text-xs font-medium uppercase tracking-wide text-[#6b6a61]"
        >
          제목
        </label>
        <input
          id="title"
          type="text"
          name="title"
          defaultValue={defaultValues?.title ?? ""}
          maxLength={100}
          placeholder="글 제목을 입력하세요"
          className={FIELD_CLASS}
        />
        {state.errors.title && (
          <p className="text-sm text-[#b23a2e]">{state.errors.title}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="content"
          className="text-xs font-medium uppercase tracking-wide text-[#6b6a61]"
        >
          내용
        </label>
        <textarea
          id="content"
          name="content"
          defaultValue={defaultValues?.content ?? ""}
          maxLength={5000}
          rows={12}
          placeholder="내용을 입력하세요"
          className={FIELD_CLASS}
        />
        {state.errors.content && (
          <p className="text-sm text-[#b23a2e]">{state.errors.content}</p>
        )}
      </div>

      {state.message && (
        <p className="text-sm text-[#b23a2e]">{state.message}</p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="rounded-md bg-[#2f6f62] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#26594f]"
        >
          {submitLabel}
        </button>
        <Link
          href={cancelHref}
          className="text-sm text-[#6b6a61] hover:text-[#21231f]"
        >
          취소
        </Link>
      </div>
    </form>
  );
}

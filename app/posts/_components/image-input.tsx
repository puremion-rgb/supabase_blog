"use client";

import { useState } from "react";

export function ImageInput({
  defaultPreview,
}: {
  defaultPreview?: string | null;
}) {
  const [preview, setPreview] = useState<string | null>(defaultPreview ?? null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="image"
        className="text-xs font-medium uppercase tracking-wide text-[#6b6a61]"
      >
        사진 (선택)
      </label>

      {preview && (
        <div className="flex h-40 w-full items-center justify-center overflow-hidden rounded-md border border-[#21231f]/10 bg-[#f0ede5]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="미리보기"
            className="h-full w-full object-contain"
          />
        </div>
      )}

      <input
        id="image"
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        className="rounded-md border border-[#21231f]/15 bg-white px-3 py-2 text-sm file:mr-3 file:rounded file:border-0 file:bg-[#2f6f62] file:px-3 file:py-1 file:text-xs file:text-white hover:file:bg-[#26594f]"
      />
    </div>
  );
}

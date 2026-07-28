import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <span className="text-4xl">📖</span>
      <h1 className="text-xl font-semibold">페이지를 찾을 수 없어요</h1>
      <p className="text-sm text-[#6b6a61]">
        요청하신 리뷰가 삭제되었거나 존재하지 않는 페이지예요.
      </p>
      <Link
        href="/posts"
        className="mt-2 rounded-md bg-[#2f6f62] px-4 py-2 text-sm font-medium text-white hover:bg-[#26594f]"
      >
        전체 리뷰로 돌아가기
      </Link>
    </div>
  );
}

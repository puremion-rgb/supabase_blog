import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_KR } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSerifKr = Noto_Serif_KR({
  variable: "--font-serif-kr",
  weight: ["700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "리뷰노트",
  description: "영화, 책, 맛집을 기록하는 리뷰 블로그",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSerifKr.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f6f3ec] text-[#21231f]">
        <header className="border-b border-[#21231f]/10 bg-[#fffdf9]">
          <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-5">
            <Link
              href="/posts"
              className="text-xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-serif-kr)" }}
            >
              📝 리뷰노트
            </Link>
            <span className="text-xs text-[#6b6a61]">
              보고 읽고 먹은 것들의 기록
            </span>
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}

export default function Loading() {
  return (
    <div className="animate-pulse rounded-lg border border-black/10 p-6 dark:border-white/15">
      <div className="h-8 w-2/3 rounded-md bg-black/10 dark:bg-white/10" />
      <div className="mt-3 h-4 w-40 rounded-md bg-black/10 dark:bg-white/10" />

      <div className="mt-8 flex flex-col gap-2">
        <div className="h-4 w-full rounded-md bg-black/10 dark:bg-white/10" />
        <div className="h-4 w-full rounded-md bg-black/10 dark:bg-white/10" />
        <div className="h-4 w-4/5 rounded-md bg-black/10 dark:bg-white/10" />
      </div>
    </div>
  );
}

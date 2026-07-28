const COLORS = [
  "#2f6f62",
  "#b23a2e",
  "#a8672a",
  "#4a5fa0",
  "#7a4fa0",
  "#3a7fa0",
  "#8a6d1f",
];

function getColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLORS[Math.abs(hash) % COLORS.length];
}

export function UserBadge({ nickname }: { nickname: string }) {
  const color = getColor(nickname);
  return (
    <span className="flex items-center gap-1.5">
      <span
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
        style={{ backgroundColor: color }}
      >
        {nickname.charAt(0).toUpperCase()}
      </span>
      <span className="font-medium text-[#21231f]">{nickname}</span>
    </span>
  );
}

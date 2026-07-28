export const CATEGORIES = [
  "영화",
  "책",
  "맛집",
  "음악",
  "여행",
  "전시",
  "게임",
  "기타",
] as const;

export function getCategoryIcon(category: string) {
  switch (category) {
    case "영화":
      return "🎬";
    case "책":
      return "📚";
    case "맛집":
      return "🍽️";
    case "음악":
      return "🎵";
    case "여행":
      return "✈️";
    case "전시":
      return "🖼️";
    case "게임":
      return "🎮";
    default:
      return "📝";
  }
}

export function renderStars(rating: number) {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
}

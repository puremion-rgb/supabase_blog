export function getCategoryIcon(category: string) {
  switch (category) {
    case "영화":
      return "🎬";
    case "책":
      return "📚";
    case "맛집":
      return "🍽️";
    default:
      return "📝";
  }
}

export function renderStars(rating: number) {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
}

export const CATEGORIES = ["영화", "책", "맛집", "기타"] as const;

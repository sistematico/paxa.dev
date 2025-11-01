// Tipos de Analytics
export type PostStatsResponse = {
  postSlug: string;
  totalViews: number;
  uniqueViews: number;
  totalLikes: number;
  wordCount: number;
  readingTime: number;
  hasLiked: boolean;
}

export type SiteStatsResponse = {
  uniqueVisitors: number;
  totalHits: number;
}

export type PopularPost = {
  postSlug: string;
  totalViews: number;
  uniqueViews: number;
  totalLikes: number;
  wordCount: number;
  readingTime: number;
}

export type ToggleLikeResponse = {
  liked: boolean;
  totalLikes: number;
}
export type ApiResponse = {
  message: string;
  success: true;
}

export type PostMetadata = {
  title: string;
  slug: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  author?: string;
}

export type Post = PostMetadata & {
  content?: string;
}

export type PostsByYear = {
  [year: string]: PostMetadata[];
}

export type PostsIndexResponse = {
  posts: PostMetadata[];
  postsByYear: PostsByYear;
  total: number;
}

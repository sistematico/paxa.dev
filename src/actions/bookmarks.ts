// src/actions/bookmarks.ts
import fs from "node:fs";
import path from "node:path";

export type Bookmark = {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  featured?: boolean;
};

type BookmarksData = {
  bookmarks: Bookmark[];
};

export function getBookmarks(): Bookmark[] {
  const filePath = path.join(process.cwd(), "src", "data", "bookmarks.json");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const data: BookmarksData = JSON.parse(fileContent);
  return data.bookmarks;
}

export function getFeaturedBookmarks(): Bookmark[] {
  return getBookmarks().filter((bookmark) => bookmark.featured);
}

export function getBookmarksByCategory(category: string): Bookmark[] {
  return getBookmarks().filter((bookmark) => bookmark.category === category);
}

export function getBookmarksByTag(tag: string): Bookmark[] {
  return getBookmarks().filter((bookmark) => bookmark.tags.includes(tag));
}

export function getAllCategories(): string[] {
  const bookmarks = getBookmarks();
  const categories = [
    ...new Set(bookmarks.map((bookmark) => bookmark.category)),
  ];
  return categories.sort();
}

export function getAllTags(): string[] {
  const bookmarks = getBookmarks();
  const allTags = bookmarks.flatMap((bookmark) => bookmark.tags);
  return [...new Set(allTags)].sort();
}

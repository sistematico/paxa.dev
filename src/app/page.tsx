import { redirect } from "next/navigation";
import { defaultLocale } from "@/i18n/config";

// Fallback — at runtime, middleware rewrites / to /[locale] before this is reached
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}

import Posts from "@/components/Posts";

export const metadata = {
  title: "Blog",
  description: "Leia meu blog"
};

export default function BlogPage() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Blog</h1>
      <Posts />
    </section>
  );
}

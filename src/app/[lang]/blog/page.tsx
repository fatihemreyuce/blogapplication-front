import { notFound } from "next/navigation";
import { hasLocale, getDictionary } from "@/app/[lang]/dictionaries";
import { PostsGrid3D } from "@/components/blog/posts-grid-3d";
import { getPublishedPosts } from "@/services/server/post-server";

export default async function BlogPage({ params }: PageProps<"/[lang]/blog">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const posts = await getPublishedPosts();

  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl space-y-8 px-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Blog</p>
          <h1 className="text-4xl font-black tracking-tight">{dict.blog.title}</h1>
          <p className="text-text-muted">{dict.blog.subtitle}</p>
        </div>

        <PostsGrid3D posts={posts} lang={lang} emptyLabel={dict.blog.no_posts} />
      </div>
    </section>
  );
}

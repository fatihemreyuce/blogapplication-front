import { notFound } from "next/navigation";
import Link from "next/link";
import { hasLocale, getDictionary } from "./dictionaries";
import { Hero } from "@/components/sections/hero";
import { HomeCategoriesStrip } from "@/components/sections/home-categories-strip";
import { PostsGrid3D } from "@/components/blog/posts-grid-3d";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { getPublishedPosts } from "@/services/server/post-server";
import { getCategories } from "@/services/server/category-server";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const [posts, categories] = await Promise.all([getPublishedPosts(3, lang), getCategories()]);

  return (
    <>
      <Hero lang={lang} />
      <HomeCategoriesStrip lang={lang} categories={categories} dict={dict.categories} />
      <section className="py-16">
        <div className="mx-auto max-w-5xl space-y-8 px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                {lang === "tr" ? "Blog" : "Blog"}
              </p>
              <h2 className="text-3xl font-black tracking-tight">{dict.home.latest_posts}</h2>
            </div>
            <ShimmerButton>
              <Link href={`/${lang}/blog`} className="text-sm font-semibold">
                {dict.home.view_all}
              </Link>
            </ShimmerButton>
          </div>

          <PostsGrid3D posts={posts} lang={lang} emptyLabel={dict.blog.no_posts} />
        </div>
      </section>
    </>
  );
}

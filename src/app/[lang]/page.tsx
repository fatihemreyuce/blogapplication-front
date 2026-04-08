import { notFound } from "next/navigation";
import Link from "next/link";
import { hasLocale, getDictionary } from "./dictionaries";
import { Hero } from "@/components/sections/hero";
import { HomeCategoriesStrip } from "@/components/sections/home-categories-strip";
import { HomeTagsStrip } from "@/components/sections/home-tags-strip";
import { PostsGrid3D } from "@/components/blog/posts-grid-3d";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { BorderBeam } from "@/components/magicui/border-beam";
import { BlurFade } from "@/components/magicui/blur-fade";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Spotlight } from "@/components/magicui/spotlight";
import { getBlogTaxonomy, getPublishedPosts } from "@/services/server/post-server";
import { getCategories } from "@/services/server/category-server";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const [posts, categories, taxonomy] = await Promise.all([
    getPublishedPosts(3, lang),
    getCategories(),
    getBlogTaxonomy(),
  ]);

  return (
    <>
      <Hero lang={lang} />
      <HomeCategoriesStrip lang={lang} categories={categories} dict={dict.categories} />
      <HomeTagsStrip lang={lang} tags={taxonomy.tags} dict={dict.tags_home} />
      <section className="relative py-14 md:py-18">
        <div className="pointer-events-none absolute -top-16 right-0 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="mx-auto max-w-5xl px-4">
          <BlurFade delay={0.05}>
            <Spotlight className="rounded-3xl">
              <Card className="relative overflow-hidden rounded-3xl border border-border/60 bg-surface/75 py-0 backdrop-blur-xl">
                <BorderBeam duration={9} size={92} />
                <GridPattern
                  squares={[
                    [1, 1],
                    [4, 2],
                    [8, 1],
                  ]}
                  className="opacity-20 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,white,transparent)]"
                />

                <CardContent className="relative z-10 space-y-7 px-6 py-6 md:px-8 md:py-8">
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="border-primary/35 bg-primary/10 text-primary">
                          {lang === "tr" ? "Blog Vitrini" : "Blog Showcase"}
                        </Badge>
                        <Badge variant="outline" className="border-emerald-500/35 bg-emerald-500/10 text-emerald-400">
                          {lang === "tr" ? "Canlı" : "Live"}
                        </Badge>
                      </div>
                      <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                        <AnimatedGradientText>{dict.home.latest_posts}</AnimatedGradientText>
                      </h2>
                      <p className="max-w-2xl text-sm text-text-muted">
                        {lang === "tr"
                          ? "Yeni yayınlanan içeriklerden özenle seçilmiş modern bir vitrin."
                          : "A polished, modern showcase of the latest published content."}
                      </p>
                    </div>
                    <ShimmerButton>
                      <Link href={`/${lang}/blog`} className="text-sm font-semibold">
                        {dict.home.view_all}
                      </Link>
                    </ShimmerButton>
                  </div>

                  <PostsGrid3D posts={posts} lang={lang} emptyLabel={dict.blog.no_posts} />
                </CardContent>
              </Card>
            </Spotlight>
          </BlurFade>
        </div>
      </section>
    </>
  );
}

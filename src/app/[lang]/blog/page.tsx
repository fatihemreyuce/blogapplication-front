import { notFound } from "next/navigation";
import { hasLocale, getDictionary } from "@/app/[lang]/dictionaries";
import { BlogFeed } from "@/components/blog/blog-feed";
import {
  attachCategoryNames,
  getBlogTaxonomy,
  getPublishedPosts,
} from "@/services/server/post-server";

export default async function BlogPage({
  params,
  searchParams,
}: PageProps<"/[lang]/blog"> & {
  searchParams?: Promise<{ categoryId?: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const sp = (await searchParams) ?? {};
  const initialCategoryId =
    typeof sp.categoryId === "string" && sp.categoryId.length > 0 ? sp.categoryId : null;

  const dict = await getDictionary(lang);
  const [posts, taxonomy] = await Promise.all([getPublishedPosts(undefined, lang), getBlogTaxonomy()]);
  const postsWithLabels = attachCategoryNames(posts, taxonomy.categories);

  return (
    <BlogFeed
      posts={postsWithLabels}
      taxonomy={taxonomy}
      lang={lang}
      dict={dict.blog}
      initialCategoryId={initialCategoryId}
    />
  );
}

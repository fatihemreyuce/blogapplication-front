export type PostStatus = "draft" | "published" | "scheduled" | string;

export type Post = {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  cover_image: string | null;
  author_id: string | null;
  category_id: string | null;
  status: PostStatus;
  published_at: string | null;
  scheduled_at: string | null;
  reading_time: number | null;
  views: number | null;
  is_featured: boolean | null;
  meta_description: string | null;
  og_image: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type PostPreview = Pick<
  Post,
  "id" | "title" | "slug" | "excerpt" | "cover_image" | "published_at" | "reading_time"
>;

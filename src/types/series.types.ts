/** `series` tablosu — Supabase şeması */
export type Series = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  cover_image: string | null;
  author_id: string | null;
  created_at: string | null;
};

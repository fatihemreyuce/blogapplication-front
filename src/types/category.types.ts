/** `categories` tablosu — Supabase şeması */
export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  cover_image: string | null;
  created_at: string | null;
};

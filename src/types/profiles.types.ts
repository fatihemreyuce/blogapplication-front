export type ProfileRole = "admin" | "editor" | "user" | string;

export type Profile = {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  website: string | null;
  role: ProfileRole | null;
  created_at: string | null;
  active: boolean | null;
};

export type ProfileUpsertInput = {
  id: string;
  username?: string | null;
  full_name?: string | null;
  avatar_url?: string | null;
  bio?: string | null;
  website?: string | null;
  role?: ProfileRole | null;
  active?: boolean | null;
};

export type AuthUserLite = {
  id: string;
  email: string | null;
};

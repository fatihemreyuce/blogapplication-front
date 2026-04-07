"use client";

import { getSupabaseClient } from "@/lib/supabase/client";
import type { AuthUserLite, Profile, ProfileUpsertInput } from "@/types/profiles.types";

type AuthResult = {
  ok: boolean;
  message: string | null;
};

export async function getCurrentUserLite(): Promise<AuthUserLite | null> {
  const supabase = getSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  return { id: user.id, email: user.email ?? null };
}

export async function signInWithPassword(
  email: string,
  password: string
): Promise<AuthResult> {
  const supabase = getSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, message: error.message };
  return { ok: true, message: null };
}

export async function signUpWithPassword(input: {
  email: string;
  password: string;
  username: string;
  full_name: string;
}): Promise<AuthResult> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
  });

  if (error) return { ok: false, message: error.message };
  if (!data.user) {
    return {
      ok: false,
      message: "User could not be created.",
    };
  }

  const { error: profileError } = await supabase.from("profiles").upsert(
    {
      id: data.user.id,
      username: input.username,
      full_name: input.full_name,
      role: "user",
      active: true,
    },
    { onConflict: "id" }
  );

  // Bazı projelerde email doğrulaması + RLS nedeniyle signup anında profile upsert 401 dönebilir.
  // Hesap oluştuysa bu hatayı signup'ı bloklamadan geçiyoruz; profil daha sonra tamamlanabilir.
  if (profileError) {
    return {
      ok: true,
      message:
        "Account created. Profile row will be completed after auth session is ready.",
    };
  }
  return { ok: true, message: null };
}

export async function signOutProfile(): Promise<void> {
  const supabase = getSupabaseClient();
  await supabase.auth.signOut();
}

export async function getMyProfile(): Promise<Profile | null> {
  const user = await getCurrentUserLite();
  if (!user) return null;

  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id,username,full_name,avatar_url,bio,website,role,created_at,active")
    .eq("id", user.id)
    .maybeSingle();

  if (error || !data) return null;
  return data as Profile;
}

export async function upsertMyProfile(
  payload: Omit<ProfileUpsertInput, "id">
): Promise<AuthResult> {
  const user = await getCurrentUserLite();
  if (!user) return { ok: false, message: "Unauthorized" };

  const supabase = getSupabaseClient();
  const { error } = await supabase.from("profiles").upsert(
    {
      id: user.id,
      ...payload,
    },
    { onConflict: "id" }
  );
  if (error) return { ok: false, message: error.message };
  return { ok: true, message: null };
}

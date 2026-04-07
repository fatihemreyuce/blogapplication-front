"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getCurrentUserLite,
  getMyProfile,
  signInWithPassword,
  signOutProfile,
  signUpWithPassword,
  upsertMyProfile,
} from "@/services/client/profile-service";
import type { AuthUserLite, Profile, ProfileUpsertInput } from "@/types/profiles.types";

export function useProfile() {
  const [user, setUser] = useState<AuthUserLite | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const authUser = await getCurrentUserLite();
      setUser(authUser);
      if (!authUser) {
        setProfile(null);
        return;
      }
      const myProfile = await getMyProfile();
      if (myProfile) {
        setProfile(myProfile);
      } else {
        await upsertMyProfile({
          username: authUser.email?.split("@")[0] ?? null,
          full_name: null,
          role: "user",
          active: true,
        });
        const createdProfile = await getMyProfile();
        setProfile(createdProfile);
      }
    } catch {
      setError("Failed to fetch profile.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const login = useCallback(async (email: string, password: string) => {
    const result = await signInWithPassword(email, password);
    if (!result.ok) {
      setError(result.message ?? "Login failed");
      return result;
    }
    await refresh();
    return result;
  }, [refresh]);

  const signup = useCallback(
    async (input: { email: string; password: string; username: string; full_name: string }) => {
      const result = await signUpWithPassword(input);
      if (!result.ok) {
        setError(result.message ?? "Sign up failed");
        return result;
      }
      await refresh();
      return result;
    },
    [refresh]
  );

  const logout = useCallback(async () => {
    await signOutProfile();
    await refresh();
  }, [refresh]);

  const saveProfile = useCallback(
    async (payload: Omit<ProfileUpsertInput, "id">) => {
      const result = await upsertMyProfile(payload);
      if (!result.ok) {
        setError(result.message ?? "Profile update failed");
        return result;
      }
      await refresh();
      return result;
    },
    [refresh]
  );

  return useMemo(
    () => ({
      user,
      profile,
      loading,
      error,
      setError,
      refresh,
      login,
      signup,
      logout,
      saveProfile,
      isAuthenticated: !!user,
    }),
    [user, profile, loading, error, refresh, login, signup, logout, saveProfile]
  );
}

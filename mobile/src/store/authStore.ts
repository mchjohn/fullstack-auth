import { create } from "zustand";

import { User } from "@/types";
import { REFRESH_TOKEN_KEY, TOKEN_KEY, USER_KEY } from "@/constants";

import { storageService } from "@/services/storage/storageService";

type AuthStore = {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User) => void;
  loadUser: () => void;
  signOut: () => void;
}

async function saveAuthData(user: User) {
  try {
    await Promise.all([
      storageService.setItem(USER_KEY, user),
      storageService.setItem(TOKEN_KEY, user.token),
      storageService.setItem(REFRESH_TOKEN_KEY, user.refreshToken),
    ]);
  } catch (error) {
    console.error("Failed to save auth data", error);
  }
}

async function cleanAuthData() {
  try {
    await Promise.all([
      storageService.removeItem(USER_KEY),
      storageService.removeItem(TOKEN_KEY),
      storageService.removeItem(REFRESH_TOKEN_KEY),
    ]);
  } catch (error) {
    console.error("Failed to clean auth data", error);
  }
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,
  setUser: async (user) => {
    set({ isLoading: true, user });
    await saveAuthData(user);
    set({ isLoading: false });
  },
  loadUser: async () => {
    set({ isLoading: true })

    try {
      const user = await storageService.getItem<User>(USER_KEY);
      if (user) { set({ user }); }
    } catch (error) {
      console.error("Failed to load user", error);
    }

    set({ isLoading: false })
  },
  signOut: async () => {
    set({ isLoading: true, user: null });
    await cleanAuthData();
    set({ isLoading: false });
  }
}));

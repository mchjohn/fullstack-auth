import { create } from "zustand";

import { User } from "@/types";
import { storageService } from "@/services/storage/storageService";

type AuthStore = {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User) => void;
  loadUser: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => {
    set({ isLoading: true })

    storageService.setItem("@app:user", user)
    set({ user })

    set({ isLoading: false })
  },
  loadUser: async () => {
    set({ isLoading: true })

    const user = await storageService.getItem<User>("@app:user")

    if (user) { set({ user }) }

    set({ isLoading: false })
  }
}));

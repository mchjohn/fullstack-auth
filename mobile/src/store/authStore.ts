import { create } from "zustand";

import { User } from "@/types";
import { storageService } from "@/services/storage/storageService";

type AuthStore = {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User) => void;
  loadUser: () => void;
  signOut: () => void;
}

async function saveAuthData(user: User) {
  storageService.setItem("@app:user", user)
  storageService.setItem("@app:token", user.token)
  storageService.setItem("@app:refreshToken", user.refreshToken)
}

async function cleanAuthData() {
  storageService.removeItem("@app:user")
  storageService.removeItem("@app:token")
  storageService.removeItem("@app:refreshToken")
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,
  setUser: async (user) => {
    set({ isLoading: true })

    set({ user })
    await saveAuthData(user)

    set({ isLoading: false })
  },
  loadUser: async () => {
    set({ isLoading: true })

    const user = await storageService.getItem<User>("@app:user")

    if (user) { set({ user }) }

    set({ isLoading: false })
  },
  signOut: async () => {
    set({ isLoading: true })

    set({ user: null })
    await cleanAuthData()

    set({ isLoading: false })
  }
}));

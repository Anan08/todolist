import { create } from "zustand";
import type { User } from "../types";

interface AuthState {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  fetchCurrentUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  isLoading: false,

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
        method: "POST",
        credentials: "include", // important to send/receive cookies
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) return false;

      await useAuthStore.getState().fetchCurrentUser();
      return true;
    } catch {
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  fetchCurrentUser: async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/me`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Unauthorized");

      const user = await res.json();
      set({ currentUser: user.data });
    } catch {
      set({ currentUser: null });
    }
  },

  logout: async () => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
      method: "GET",
      credentials: "include",
    });
    set({ currentUser: null });
  },
}));

export default useAuthStore;

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      role: "",
      isAuthenticated: false,

      login: (token, user) =>
        set({
          token,
          user,
          role: user.role,
          isAuthenticated: true,
        }),

      logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        set({
          token: null,
          user: null,
          role: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "gms-auth-store",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        role: state.role,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

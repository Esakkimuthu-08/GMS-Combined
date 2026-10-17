import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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
          role: (user.Role ?? user.role)?.toLowerCase(),
          isAuthenticated: true,
        }),

      logout: () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("role");
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
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        role: state.role,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
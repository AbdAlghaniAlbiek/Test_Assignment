import { create } from "zustand";

interface IUserAuth {
  auth?: {
    name?: string;
    email?: string;
    profileImage?: any;
    password?: string;
    isLoggedIn?: boolean;
  };
  setUserAuth: () => void;
  clearUserAuth: () => void;
  updateUserAuth: (userInfo: {
    email?: string;
    name?: string;
    profileImage?: string;
  }) => void;
}

export const useAuthStore = create<IUserAuth>((set) => ({
  auth: {
    email: "ahmad@gmail.com",
    password: "123456",
    name: "Ahmad Madani",
    isLoggedIn: false,
  },
  setUserAuth: () =>
    set((state: unknown) => ({
      auth: {
        name: "Ahmad Madani",
        email: "ahmad@gmail.com",
        password: "1234",
        profileImage: "/default-profile-image.png",
        isLoggedIn: true,
      },
    })),
  updateUserAuth: (userInfo) =>
    set((state) => ({ ...state, auth: { ...state.auth, ...userInfo } })),
  clearUserAuth: () => set((state: any) => ({ ...state, auth: {} })),
}));

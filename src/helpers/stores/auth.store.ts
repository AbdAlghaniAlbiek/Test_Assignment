import { create } from "zustand";

interface IUserAuth {
  auth?: {
    name?: string;
    email?: string;
    profileImage: any;
    password?: string;
  };
  setUserAuth: () => void;
  clearUserAuth: () => void;
}

export const useAuthStore = create<IUserAuth>((set) => ({
  auth: { email: "ahmad@gmail.com", password: "123456", name: "Ahmad Madani" },
  setUserAuth: () =>
    set((state: unknown) => ({
      auth: {
        name: "Ahmad Madani",
        email: "ahmad@gmail.com",
        password: "1234",
        profileImage: "/default-profile-image.png",
      },
    })),
  clearUserAuth: () => set((state: any) => ({ ...state, auth: {} })),
}));

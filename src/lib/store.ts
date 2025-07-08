import { create } from "zustand";

type User = {
  id: string;
  nama: string;
  email: string;
  profile_pic?:string;
};

type Store = {
  user: User | null;
  setUser: (user: User) => void;
};

export const useUserStore = create<Store>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
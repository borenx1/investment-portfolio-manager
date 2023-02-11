import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
}

interface UserState {
  user?: User;
  setUser: (user?: User) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  user: undefined,
  setUser: (user) => set({ user }),
}));

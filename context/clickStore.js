import { create } from "zustand";

const useClickStore = create((set) => ({
  clickCount: 0,
  incrementClickCount: () =>
    set((state) => ({ clickCount: state.clickCount + 1 })),
}));

export default useClickStore;

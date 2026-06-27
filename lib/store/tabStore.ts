import { create } from "zustand";

type Tab = "baby" | "mom";

interface StoreTab {
  tab: Tab;
  setTab: (value: Tab) => void;
}

export const useStoreTab = create<StoreTab>((set) => ({
  tab: "baby",
  setTab: (tab) => set({ tab }),
}));

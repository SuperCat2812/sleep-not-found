import { create } from 'zustand';

interface ConfirmationModalState {
  isOpen: boolean;

  open: () => void;
  close: () => void;
}

export const useConfirmationModal = create<ConfirmationModalState>(set => ({
  isOpen: false,

  open: () => set({ isOpen: true }),

  close: () => set({ isOpen: false }),
}));

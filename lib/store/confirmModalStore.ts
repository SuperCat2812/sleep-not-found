import { create } from 'zustand';

export type ModalType = 'logout' | 'delete' | 'logoutBurger';

interface ConfirmationModalState {
  isOpen: boolean;
  modalId: ModalType | null;
  open: (id: ModalType) => void;
  close: () => void;
}

export const useConfirmationModal = create<ConfirmationModalState>(set => ({
  isOpen: false,
  modalId: null,
  open: id => set({ isOpen: true, modalId: id }),
  close: () => set({ isOpen: false, modalId: null }),
}));

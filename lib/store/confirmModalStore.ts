import { create } from 'zustand';

export type ModalType = 'logout' | 'delete' | 'logoutBurger';

interface ConfirmationModalState {
  isOpen: boolean;
  modalId: ModalType | null;
  idDiary?: string;
  open: (id: ModalType, idDiary?: string) => void;
  close: () => void;
}

export const useConfirmationModal = create<ConfirmationModalState>(set => ({
  isOpen: false,
  modalId: null,
  idDiary: undefined,
  open: (id, idDiary) => set({ isOpen: true, modalId: id, idDiary }),
  close: () => set({ isOpen: false, modalId: null, idDiary: undefined }),
}));

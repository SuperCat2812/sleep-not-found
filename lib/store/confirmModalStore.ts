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
  open: (id, idDiary) => {
    document.body.style.overflow = 'hidden';
    set({ isOpen: true, modalId: id, idDiary });
  },
  close: () => {
    document.body.style.overflow = '';
    set({ isOpen: false, modalId: null, idDiary: undefined });
  },
}));

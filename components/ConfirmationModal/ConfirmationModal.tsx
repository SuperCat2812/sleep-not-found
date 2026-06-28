'use client';
import { createPortal } from 'react-dom';
import Icon from '../Icon/Icon';
import css from './ConfirmationModal.module.css';
import { ModalType, useConfirmationModal } from '@/lib/store/confirmModalStore';
import { useEffect } from 'react';

interface ConfirmationModalProps {
  id: ModalType;
  title: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: (idDiary?: string) => void | Promise<void>;
  onCancel: () => void;
}

const ConfirmationModal = ({
  id,
  title,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) => {
  const { isOpen, modalId, close, idDiary } = useConfirmationModal();

  const shouldRender = isOpen && modalId === id;

  useEffect(() => {
    if (!shouldRender) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        (document.activeElement as HTMLElement)?.blur();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shouldRender, close]);

  if (!shouldRender) return null;

  return createPortal(
    <div
      className={css.backdrop}
      onClick={e => {
        if (e.target !== e.currentTarget) return;
        close();
      }}
    >
      <div className={css.modal}>
        <button className={css.closeButton} type="button" onClick={close}>
          <Icon id="icon-close" className={css.closeSvg} />
        </button>
        <h2 className={css.title}>{title}</h2>
        <div className={css.buttonWrapper}>
          <button
            className={css.cancelBtn}
            type="button"
            onClick={() => {
              onCancel();
              close();
            }}
          >
            {cancelButtonText}
          </button>
          <button
            className={css.confirmBtn}
            type="button"
            onClick={async () => {
              await onConfirm(idDiary);
              close();
            }}
          >
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmationModal;

'use client';

import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import css from './AddTaskModal.module.css';

interface AddTaskModalProps {
  onClose: () => void;
}

export default function AddTaskModal({ onClose }: AddTaskModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal} role="dialog" aria-modal="true">
        <button
          className={css.closeBtn}
          onClick={onClose}
          aria-label="Закрити модальне вікно"
        >
          ✕
        </button>
        <h2 className={css.title}>Нове завдання</h2>
        <AddTaskForm onClose={onClose} />
      </div>
    </div>,
    document.body
  );
}

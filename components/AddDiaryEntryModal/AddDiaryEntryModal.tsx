"use client";

import { useEffect } from "react";
import AddDiaryEntryForm from "./AddDiaryEntryForm";
import styles from "./AddDiaryEntryModal.module.css";

interface AddDiaryEntryModalProps {
  onClose: () => void;
  onSuccess?: () => void;
  entryToEdit?: {
    _id: string;
    title: string;
    emotions: string[];
    description: string;
  };
}

export default function AddDiaryEntryModal({
  onClose,
  onSuccess,
  entryToEdit,
}: AddDiaryEntryModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>
        <h2 className={styles.title}>
          {entryToEdit ? "Редагувати запис" : "Новий запис"}
        </h2>
        <AddDiaryEntryForm
          onClose={onClose}
          onSuccess={onSuccess}
          entryToEdit={entryToEdit}
        />
      </div>
    </div>
  );
}

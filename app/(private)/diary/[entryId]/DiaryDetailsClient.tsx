'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DiaryEntryDetails from '@/components/DiaryEntryDetails/DiaryEntryDetails';
import AddDiaryEntryModal from '@/components/AddDiaryEntryModal/AddDiaryEntryModal';
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal';
import { deleteDiary } from '@/lib/api/clientApi';
import { DiaryNote } from '@/types/types';
interface DiaryDetailsClientProps {
  diary: DiaryNote;
}
export default function DiaryDetailsClient({ diary }: DiaryDetailsClientProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalEntry, setModalEntry] = useState<DiaryNote | null>(null);

  const handleSuccess = async () => {
    router.push('/diary');
  };

  const handleEdit = (entry: DiaryNote) => {
    setModalEntry(entry);
    setIsModalOpen(true);
  };

  return (
    <>
      <DiaryEntryDetails
        diary={diary}
        onSuccess={handleSuccess}
        onEdit={handleEdit}
      />

      {isModalOpen && (
        <AddDiaryEntryModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleSuccess}
          entryToEdit={
            modalEntry
              ? {
                  _id: modalEntry._id,
                  title: modalEntry.title,
                  description: modalEntry.description,
                  emotions: modalEntry.emotions.map(emotion => emotion._id),
                }
              : undefined
          }
        />
      )}

      <ConfirmationModal
        id="delete"
        title="Видалити?"
        confirmButtonText="Так"
        cancelButtonText="Ні"
        onConfirm={async id => {
          if (!id) return;

          await deleteDiary(id);
          router.push('/diary');
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      />
    </>
  );
}

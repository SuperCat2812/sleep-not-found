'use client';

import { useRouter } from 'next/navigation';
import DiaryEntryDetails from '@/components/DiaryEntryDetails/DiaryEntryDetails';
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal';
import { deleteDiary } from '@/lib/diary-api-client';
import { DiaryNote } from '@/types/diary-types';
interface DiaryDetailsClientProps {
  diary: DiaryNote;
}
export default function DiaryDetailsClient({ diary }: DiaryDetailsClientProps) {
  const router = useRouter();
  const handleSuccess = async () => {
    try {
      router.push('/dairy');
    } catch {}
  };

  return (
    <>
      <DiaryEntryDetails diary={diary} onSuccess={handleSuccess} />

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
        onCancel={() => {}}
      />
    </>
  );
}

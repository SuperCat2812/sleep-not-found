'use client';
import css from './DiaryEntryDetails.module.css';
import Icon from '../Icon/Icon';
import { useConfirmationModal } from '@/lib/store/confirmModalStore';
import AddDiaryEntryModal from '../AddDiaryEntryModal/AddDiaryEntryModal';
import { DiaryNote } from '@/types/types';

interface DiaryEntryDetailsProps {
  diary: DiaryNote;
  onSuccess: () => void;
  setIsModalOpen: (boolean: boolean) => void;
  isModalOpen: boolean;
}
const DiaryEntryDetails = ({
  diary,
  onSuccess,
  setIsModalOpen,
  isModalOpen,
}: DiaryEntryDetailsProps) => {
  const setOpen = useConfirmationModal().open;

  const handleSuccess = () => {
    setIsModalOpen(false);
    onSuccess();
  };
  function formatDate(date: string) {
    return new Intl.DateTimeFormat('uk-UA', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
      .format(new Date(date))
      .replace(' р.', '');
  }

  return (
    <>
      <div className={css.ContainerDetail}>
        <div className={css.DiaryContainer}>
          <div className={css.DiaryTitle}>
            <h3>{diary.title}</h3>
            <button
              onClick={() => setIsModalOpen(true)}
              className={css.editBtn}
            >
              <Icon id="icon-edit" className={css.IconDetail} />
            </button>
          </div>
          <div className={css.DiaryData}>
            <p>{formatDate(diary.date)}</p>
            <button
              className={css.DeleteBtn}
              onClick={() => {
                setOpen('delete', diary._id);
              }}
            >
              <Icon id="icon-delete" className={css.IconDetail} />
            </button>
          </div>
        </div>
        <div className={css.DiaryDescriptionContainer}>
          <p className={css.DiaryDescription}>{diary.description}</p>
          <ul className={css.EmotionList}>
            {diary.emotions.map(emotion => {
              return (
                <li key={emotion._id}>
                  <p className={css.DiaryEmotion}>{emotion.title}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {isModalOpen && (
        <AddDiaryEntryModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleSuccess}
          entryToEdit={{
            _id: diary._id,
            title: diary.title,
            description: diary.description,
            emotions: diary.emotions.map(emotion => emotion._id),
          }}
        />
      )}
    </>
  );
};
export default DiaryEntryDetails;

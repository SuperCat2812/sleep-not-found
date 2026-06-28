'use client';
import { DiaryNote } from '@/types/diary-types';
import css from './DiaryEntryDetails.module.css';
import Icon from '../Icon/Icon';
import { useConfirmationModal } from '@/lib/store/confirmModalStore';

interface DiaryEntryDetailsProps {
  diary: DiaryNote;
}
const DiaryEntryDetails = ({ diary }: DiaryEntryDetailsProps) => {
  const setOpen = useConfirmationModal().open;
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
    <div className={css.containerDetail}>
      <div className={css.diaryContainer}>
        <div className={css.diaryTitle}>
          <h3>{diary.title}</h3>
          <Icon id="icon-edit" className={css.iconDetail} />
        </div>
        <div className={css.diaryData}>
          <p>{formatDate(diary.date)}</p>
          <button
            className={css.deleteBtn}
            onClick={() => {
              setOpen();
            }}
          >
            <Icon id="icon-delete" className={css.iconDetail} />
          </button>
        </div>
      </div>
      <div className={css.diaryDescriptionContainer}>
        <p className={css.diaryDescription}>{diary.description}</p>
        <ul>
          {diary.emotions.map(emotion => {
            return (
              <li key={diary._id}>
                <p className={css.diaryEmotion}>{emotion.title}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default DiaryEntryDetails;

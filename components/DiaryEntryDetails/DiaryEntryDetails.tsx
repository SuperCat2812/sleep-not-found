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
    <div className={css.ContainerDetail}>
      <div className={css.DiaryContainer}>
        <div className={css.DiaryTitle}>
          <h3>{diary.title}</h3>
          <Icon id="icon-edit" className={css.IconDetail} />
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
              <li key={diary._id}>
                <p className={css.DiaryEmotion}>{emotion.title}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default DiaryEntryDetails;

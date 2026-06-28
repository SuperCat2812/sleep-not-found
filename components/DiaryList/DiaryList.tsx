import { DiaryNote } from '@/types/diary-types';
import css from './DiaryList.module.css';
import Link from 'next/link';

interface DiaryListProps {
  diarys: DiaryNote[];
  setId: (id: string) => void;
}

const DiaryList = ({ diarys, setId }: DiaryListProps) => {
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
    <ul>
      {!diarys[0] && <p>Наразі записи у щоденнику відстні</p>}
      {diarys.map(diary => (
        <li key={diary._id} className={css.diaryItem}>
          <Link
            href={`/diary/${diary._id}`}
            onClick={e => {
              if (window.innerWidth >= 1024 && setId) {
                e.preventDefault();
                setId(diary._id);
              }
            }}
          >
            <div className={css.DiaryItemContent}>
              <p className={css.DiaryTitle}>{diary.title}</p>
              <p className={css.DiaryData}>{formatDate(diary.date)}</p>
            </div>
            <div className={css.DiaryItemEmotionContent}>
              <ul className={css.EmotionList}>
                {diary.emotions.map(emotion => (
                  <li key={emotion._id}>
                    <p className={css.DiaryEmotionTitle}>{emotion.title}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default DiaryList;

import { DiaryNote } from "@/types/diary-types";
import css from "./DiaryEntryDetails.module.css";
import Icon from "../Icon/Icon";

interface DiaryEntryDetailsProps {
  diary: DiaryNote;
}
const DiaryEntryDetails = ({ diary }: DiaryEntryDetailsProps) => {
  function formatDate(date: string) {
    return new Intl.DateTimeFormat("uk-UA", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
      .format(new Date(date))
      .replace(" р.", "");
  }
  return (
    <div className={css.containerDetail}>
      <div className={css.diaryContainer}>
        <div className={css.diaryTitle}>
          <h3>{diary.title}</h3>
          <Icon
            id="icon-edit"
            className={css.iconDetail}
          />
        </div>
        <div className={css.diaryData}>
          <p>{formatDate(diary.date)}</p>
          <Icon
            id="icon-delete"
            className={css.iconDetail}
          />
        </div>
      </div>
      <div className={css.diaryDescriptionContainer}>
        <p className={css.diaryDescription}>{diary.description}</p>
        <ul>
          {diary.emotions.map((emotion) => {
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

"use client";
import DiaryList from "@/components/DiaryList/DiaryList";
import css from "./DiaryPage.module.css";
import Link from "next/link";

import { useState } from "react";
import { DiaryResponse } from "@/types/diary-types";
import DiaryEntryDetails from "@/components/DiaryEntryDetails/DiaryEntryDetails";
import Icon from "@/components/Icon/Icon";

interface DiaryClientProps {
  diarys: DiaryResponse;
}

const DiaryClient = ({ diarys }: DiaryClientProps) => {
  const [id, setId] = useState<string>(diarys.diaryNotes[0]?._id ?? "");

  const selectedDiary = diarys.diaryNotes.find((diary) => diary._id === id);

  return (
    <section className={css.sectionDiary}>
      <div className={css.diaryContainer}>
        <div className={css.title}>
          <h2>Ваші записи</h2>
          <div className={css.createContainer}>
            <Link href="#">
              <span className={css.newTask}>Новий запис</span>

              <Icon
                id="icon-plus"
                className={css.iconPlus}
              />
            </Link>
          </div>
        </div>

        <DiaryList
          diarys={diarys.diaryNotes}
          setId={setId}
        />
      </div>
      <div className={css.diaryContainerDetails}>
        {selectedDiary && <DiaryEntryDetails diary={selectedDiary} />}
      </div>
    </section>
  );
};

export default DiaryClient;

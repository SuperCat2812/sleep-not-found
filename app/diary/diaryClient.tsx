'use client';

import DiaryList from '@/components/DiaryList/DiaryList';
import css from './DiaryPage.module.css';
import { useState } from 'react';
import { DiaryNote, DiaryResponse } from '@/types/diary-types';
import DiaryEntryDetails from '@/components/DiaryEntryDetails/DiaryEntryDetails';
import { api } from '@/lib/api/api';
import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import CustomScroll from '@/components/CustomScroll/CustomScroll';
import Icon from '@/components/Icon/Icon';
import Link from 'next/link';
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal';
import { deleteDiary } from '@/lib/diary-api-client';

interface DiaryClientProps {
  diarys: DiaryResponse;
}

const DiaryClient = ({ diarys }: DiaryClientProps) => {
  const [id, setId] = useState<string>(diarys.diaryNotes[0]?._id ?? '');
  const [data, setData] = useState<DiaryNote[]>(diarys.diaryNotes);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const loaderMore = async () => {
    if (isLoading || page >= diarys.totalPages) return;
    setIsLoading(true);
    const nextPage = page + 1;
    try {
      const { data } = await api.get<DiaryResponse>('/diary', {
        params: {
          page: nextPage,
          limit: 10,
        },
      });

      setData(prev => [...prev, ...data.diaryNotes]);
      setPage(nextPage);
    } catch {
    } finally {
      setIsLoading(false);
    }
  };
  const selectedDiary = data.find(diary => diary._id === id);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;

    if (
      element.scrollTop + element.clientHeight >=
      element.scrollHeight - 100
    ) {
      loaderMore();
    }
  };
  return (
    <>
      <div className={css.greeting}>{/* <GreetingBlock /> */}</div>
      <section className={css.sectionDiary}>
        <div className={css.diaryContainer}>
          <div className={css.diaryContainer}>
            <div className={css.title}>
              <h2>Ваші записи</h2>
              <div className={css.createContainer}>
                <Link href="#">
                  <span className={css.newTask}>Новий запис</span>

                  <Icon id="icon-plus" className={css.iconPlus} />
                </Link>
              </div>
            </div>
          </div>
          <CustomScroll>
            <div className={css.diaryListScroll} onScroll={handleScroll}>
              <DiaryList diarys={data} setId={setId} />
            </div>
          </CustomScroll>
        </div>
        <div className={css.diaryContainerDetails}>
          {selectedDiary && <DiaryEntryDetails diary={selectedDiary} />}
        </div>
        <ConfirmationModal
          id="delete"
          title="Видалити?"
          confirmButtonText="так"
          cancelButtonText="ні"
          onConfirm={async id => {
            if (!id) return;
            await deleteDiary(id);
            setData(prev => prev.filter(item => item._id !== id));
          }}
          onCancel={() => {}}
        />
      </section>
    </>
  );
};

export default DiaryClient;

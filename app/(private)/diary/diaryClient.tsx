'use client';
import DiaryList from '@/components/DiaryList/DiaryList';
import css from './DiaryPage.module.css';
import { useState } from 'react';
import { DiaryNote, DiaryResponse } from '@/types/diary-types';
import DiaryEntryDetails from '@/components/DiaryEntryDetails/DiaryEntryDetails';
import Icon from '@/components/Icon/Icon';
import { api } from '@/lib/api/api';
import CustomScroll from '@/components/CustomScroll/CustomScroll';
import AddDiaryEntryModal from '@/components/AddDiaryEntryModal/AddDiaryEntryModal';
import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loaderMore = async () => {
    if (isLoading || page >= diarys.totalPages) return;
    setIsLoading(true);
    const nextPage = page + 1;
    try {
      const response = await api.get<DiaryResponse>('/diary', {
        params: { page: nextPage, limit: 10 },
      });
      setData(prev => [...prev, ...response.data.diaryNotes]);
      setPage(nextPage);
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccess = async () => {
    try {
      const response = await api.get<DiaryResponse>('/diary', {
        params: { page: 1, limit: 10 },
      });
      setData(response.data.diaryNotes);
      setPage(1);
    } catch {}
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
      <div className={css.Greeting}>
        <GreetingBlock />
      </div>
      <section className={css.sectionDiary}>
        <div className={css.diaryContainer}>
          <div className={css.title}>
            <h2>Ваші записи</h2>
            <div className={css.createContainer}>
              <button onClick={() => setIsModalOpen(true)}>
                <span className={css.newTask}>Новий запис</span>
                <Icon id="icon-plus" className={css.iconPlus} />
              </button>
            </div>
          </div>
          <div className={css.diaryContainer}>
            <CustomScroll>
              <div className={css.diaryListScroll} onScroll={handleScroll}>
                <DiaryList diarys={data} setId={setId} />
              </div>
            </CustomScroll>
          </div>
        </div>
        <div className={css.diaryContainerDetails}>
          {selectedDiary && (
            <DiaryEntryDetails
              diary={selectedDiary}
              onSuccess={handleSuccess}
            />
          )}
        </div>
        {isModalOpen && (
          <AddDiaryEntryModal
            onClose={() => setIsModalOpen(false)}
            onSuccess={handleSuccess}
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
            handleSuccess();
          }}
          onCancel={() => {}}
        />
      </section>
    </>
  );
};

export default DiaryClient;

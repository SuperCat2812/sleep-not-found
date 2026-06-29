'use client';
import css from './JourneyDetails.module.css';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useStoreTab } from '@/lib/store/tabStore';
import { getWeekBabyByNumber, getWeekMomByNumber } from '@/lib/journey-api';
import Image from 'next/image';
import Loader from '@/components/Loader/Loader';
import Icon from '@/components/Icon/Icon';
import TasksReminderCard from '../TasksReminderCard/TasksReminderCard';

function JourneyDetails({ currentWeek }: { currentWeek: number }) {
  const { tab, setTab } = useStoreTab();
  const params = useParams();
  const activeWeek = Number(params.weekNumber);

  const { data: babyData, isLoading: isBabyLoading } = useQuery({
    queryKey: ['baby', activeWeek],
    queryFn: () => getWeekBabyByNumber(activeWeek),
    refetchOnMount: false,
    enabled: tab === 'baby',
  });

  const { data: momData, isLoading: isMomLoading } = useQuery({
    queryKey: ['mom', activeWeek],
    queryFn: () => getWeekMomByNumber(activeWeek),
    refetchOnMount: false,
    enabled: tab === 'mom',
  });

  if (activeWeek > currentWeek) {
    return <h3 className={css.feelingTitle}>Ой, туди ще рано заглядати 😉</h3>;
  }

  const isLoading = tab === 'baby' ? isBabyLoading : isMomLoading;

  return (
    <div className={css.detailsWrapper}>
      <div className={css.toggle}>
        <button
          className={css.button}
          type="button"
          onClick={() => setTab('baby')}
          data-active={tab === 'baby'}
        >
          Розвиток малюка
        </button>
        <button
          className={css.button}
          type="button"
          onClick={() => setTab('mom')}
          data-active={tab === 'mom'}
        >
          Тіло мами
        </button>
      </div>

      {isLoading && <Loader />}

      {tab === 'baby' && !isBabyLoading && babyData && (
        <div className={css.detailsBaby}>
          <div className={css.imageWrapper}>
            <Image
              className={css.babyImage}
              src={babyData.image}
              alt={babyData.analogy}
              width={287}
              height={379}
            />
            <p className={css.analogy}>{babyData.analogy}</p>
          </div>
          <div>
            {babyData.description.map((text, index) => (
              <p className={css.description} key={index}>
                {text}
              </p>
            ))}
            <div className={css.factBox}>
              <div className={css.factWrapper}>
                <Icon id="icon-star" className={css.iconFact} />
                <h3 className={css.fact}>Цікавий факт тижня</h3>
              </div>
              <p className={css.factDescription}>{babyData.interestingFact}</p>
            </div>
          </div>
        </div>
      )}

      {tab === 'mom' && !isMomLoading && momData && (
        <div className={css.momDetails}>
          <div className={css.wrapper}>
            <div className={css.feeling}>
              <h3 className={css.feelingTitle}>Як ви можете почуватись</h3>
              <ul className={css.tag}>
                {momData.feelings.states.map((tag, index) => (
                  <li className={css.momTag} key={index}>
                    {tag}
                  </li>
                ))}
              </ul>
              <p className={css.momDescription}>
                {momData.feelings.sensationDescr}
              </p>
            </div>
            <div className={css.tipsBox}>
              <h3 className={css.feelingTitle}>Поради для вашого комфорту</h3>
              <ul className={css.tipsList}>
                {momData.comfortTips.map((tip, index) => {
                  let iconName = '';
                  if (tip.category === 'Харчування') iconName = 'icon-fork';
                  if (tip.category === 'Активність')
                    iconName = 'icon-dumb-bell';
                  if (tip.category === 'Відпочинок та комфорт')
                    iconName = 'icon-sofa';
                  return (
                    <li key={index} className={css.tipsItem}>
                      <Icon id={iconName} className={css.tipsIcon} />
                      <div className={css.tipsWrapper}>
                        <h4 className={css.tipsTitle}>{tip.category}</h4>
                        <p className={css.tipsText}>{tip.tip}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <TasksReminderCard onAddClick={() => {}} />
        </div>
      )}
    </div>
  );
}

export default JourneyDetails;

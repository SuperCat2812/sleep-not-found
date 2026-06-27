import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import StatusBlock from '@/components/StatusBlock/StatusBlock';
import BabyTodayCard from '@/components/BabyTodayCard/BabyTodayCard';
import MomTipCard from '@/components/MomTipCard/MomTipCard';
import DashboardClient from '@/components/DashboardClient/DashboardClient';
import { getWeekServer } from '@/lib/journey-api-server';
import styles from './page.module.css';

const DashboardPage = async () => {
  let weekData = null;

  try {
    weekData = await getWeekServer();
  } catch {
    weekData = null;
  }

  return (
    <div className={styles.page}>
      <GreetingBlock />
      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <StatusBlock
            week={weekData?.curWeekToPregnant ?? 0}
            daysLeft={weekData?.daysBeforePregnant ?? 0}
          />
          <BabyTodayCard
            imageUrl={weekData?.babyToday?.image ?? ''}
            size={weekData?.babyToday?.babySize?.toString() ?? ''}
            weight={weekData?.babyToday?.babyWeight?.toString() ?? ''}
            activity={weekData?.babyToday?.babyActivity ?? ''}
            description={weekData?.babyToday?.babyDevelopment ?? ''}
          />
          <MomTipCard tip={weekData?.momHint ?? ''} />
        </div>
        <div className={styles.rightColumn}>
          <DashboardClient />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

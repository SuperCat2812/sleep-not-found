import GreetingBlock from "@/components/GreetingBlock/GreetingBlock";
import StatusBlock from "@/components/StatusBlock/StatusBlock";
import BabyTodayCard from "@/components/BabyTodayCard/BabyTodayCard";
import MomTipCard from "@/components/MomTipCard/MomTipCard";
import DashboardClient from "@/components/DashboardClient/DashboardClient";
import styles from "./page.module.css";

const DashboardPage = () => {
  return (
    <div className={styles.page}>
      <GreetingBlock name="Ганна" />
      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <StatusBlock week={14} daysLeft={165} />
          <BabyTodayCard
            imageUrl="/images/baby-avocado.png"
            size="Приблизно 12 см"
            weight="Близько 45 грамів"
            activity="М'язи обличчя вже працюють!"
            description="У цей час тіло малюка починає вкриватися лануго..."
          />
          <MomTipCard tip="Не забувайте про зволоження шкіри живота та стегон спеціальними оліями." />
        </div>
        <div className={styles.rightColumn}>
          <DashboardClient />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

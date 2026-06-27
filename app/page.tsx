import GreetingBlock from "@/components/GreetingBlock/GreetingBlock";
import StatusBlock from "@/components/StatusBlock/StatusBlock";
import BabyTodayCard from "@/components/BabyTodayCard/BabyTodayCard";
import MomTipCard from "@/components/MomTipCard/MomTipCard";
import DashboardClient from "@/components/DashboardClient/DashboardClient";
import styles from "./page.module.css";

const DashboardPage = () => {
  // Ця частина коду взята з конспекту — дані мають приходити з бекенду
  return (
    <div className={styles.page}>
      <GreetingBlock />
      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <StatusBlock week={14} daysLeft={165} />
          <BabyTodayCard
            imageUrl="/images/baby-avocado.png"
            size="Приблизно 12 см"
            weight="Близько 45 грамів"
            activity="М'язи обличчя вже працюють! Малюк вчиться хмуритися, мружитись і навіть може зловити гикавку."
            description="У цей час тіло малюка починає вкриватися лануго — надзвичайно ніжним пушком, який зберігатиме тепло. Його шийка стає міцнішою, а рухи — все більш скоординованими. Хоч ви ще не відчуваєте цих кульбітів, знайте: всередині вас відбувається справжнє диво!"
          />
          <MomTipCard tip="Не забувайте про зволоження шкіри живота та стегон спеціальними олійками, щоб попередити появу розтяжок." />
        </div>
        <div className={styles.rightColumn}>
          <DashboardClient />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

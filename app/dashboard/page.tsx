import GreetingBlock from "@/components/GreetingBlock/GreetingBlock";
import StatusBlock from "@/components/StatusBlock/StatusBlock";
import BabyTodayCard from "@/components/BabyTodayCard/BabyTodayCard";
import MomTipCard from "@/components/MomTipCard/MomTipCard";
import DashboardClient from "@/components/DashboardClient/DashboardClient";

const DashboardPage = () => {
  return (
    <main>
      <GreetingBlock name="Ганна" />
      <StatusBlock week={14} daysLeft={165} />
      <BabyTodayCard
        imageUrl="/images/baby-avocado.png"
        size="Приблизно 12 см"
        weight="Близько 45 грамів"
        activity="М'язи обличчя вже працюють!"
        description="У цей час тіло малюка починає вкриватися лануго..."
      />
      <MomTipCard tip="Не забувайте про зволоження шкіри живота та стегон спеціальними оліями." />
      <DashboardClient />
    </main>
  );
};

export default DashboardPage;

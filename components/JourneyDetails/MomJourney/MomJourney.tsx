"use client";
import { getWeekMomByNumber } from "@/lib/journey-api";
import css from "./MomJourney.module.css";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader/Loader";
import Icon from "@/components/Icon/Icon";
import TasksReminderCard from "@/components/TasksReminderCard/TasksReminderCard";

const MomJourney = ({ week }: { week: number }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["mom", week],
    queryFn: () => getWeekMomByNumber(week),
    refetchOnMount: false,
  });
  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return null;
  }
  return (
    <div className={css.momDetails}>
      <div className={css.wrapper}>
        <div className={css.feeling}>
          <h3 className={css.feelingTitle}>Як ви можете почуватись</h3>
          <ul className={css.tag}>
            {data.feelings.states.map((tag, index) => {
              return (
                <li className={css.momTag} key={index}>
                  {tag}
                </li>
              );
            })}
          </ul>
          <p className={css.momDescription}>{data.feelings.sensationDescr}</p>
        </div>
        <div className={css.tipsBox}>
          <h3 className={css.feelingTitle}>Поради для вашого комфорту</h3>
          <ul className={css.tipsList}>
            {data.comfortTips.map((tip, index) => {
              const categories = tip.category;
              let iconName = "";
              if (categories === "Харчування") iconName = "icon-fork";
              if (categories === "Активність") iconName = "icon-dumb-bell";
              if (categories === "Відпочинок та комфорт")
                iconName = "icon-sofa";
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
    </div>
  );
};

export default MomJourney;

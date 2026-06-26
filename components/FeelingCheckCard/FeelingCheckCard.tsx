"use client";

import styles from "./FeelingCheckCard.module.css";

type FeelingCheckCardProps = {
  recommendation: string;
  isAuthorized: boolean;
  onDiaryClick: () => void;
};

const FeelingCheckCard = ({
  recommendation,
  isAuthorized,
  onDiaryClick,
}: FeelingCheckCardProps) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Як ви себе почуваєте?</h2>
      <p className={styles.recommendationLabel}>Рекомендація на сьогодні:</p>
      <p className={styles.recommendationText}>{recommendation}</p>
      <button className={styles.button} onClick={onDiaryClick}>
        Зробити запис у щоденник
      </button>
    </div>
  );
};

export default FeelingCheckCard;

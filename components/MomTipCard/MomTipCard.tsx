import styles from './MomTipCard.module.css';

type MomTipCardProps = {
  tip: string;
};

const MomTipCard = ({ tip }: MomTipCardProps) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Порада для мами</h2>
      <p className={styles.tip}>{tip}</p>
    </div>
  );
};

export default MomTipCard;

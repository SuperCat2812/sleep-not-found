import styles from "./StatusBlock.module.css";

type StatusBlockProps = {
  week: number;
  daysLeft: number;
};

const StatusBlock = ({ week, daysLeft }: StatusBlockProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <p className={styles.label}>Тиждень</p>
        <span className={styles.value}>{week}</span>
      </div>
      <div className={styles.card}>
        <p className={styles.label}>Днів до зустрічі</p>
        <span className={styles.value}>~{daysLeft}</span>
      </div>
    </div>
  );
};

export default StatusBlock;
